'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useAppContext } from '@/context/appContext';
import { useAccentContext } from '@/context/accentContext';
import {
  COMMUTE_CARD_LIMITS,
  COMMUTE_MODE,
  COMMUTE_MODE_META,
  CommuteConfig,
  CommuteSessionRecord,
  DEFAULT_COMMUTE_CONFIG,
  shouldDefaultSoftSync,
} from '@/types/commute';
import {
  buildCommuteScript,
  estimateEpisodeDurationSec,
  extractFlashcardNarrationFields,
  filterCommuteCards,
} from '@/utils/commuteScriptBuilder';
import { resolveCommuteBatchWindow } from '@/utils/commuteBatch';
import {
  loadCommuteConfig,
  saveCommuteConfig,
} from '@/utils/commuteConfigStorage';
import {
  buildCommuteEpisodeKey,
  loadAudioProgress,
} from '@/utils/audioPlaybackProgress';
import { useCommuteHistory } from '@/hooks/useCommuteHistory';
import { useCommuteEpisodeGenerator } from '@/hooks/useCommuteEpisodeGenerator';
import { useCommuteAudioPlayer } from '@/hooks/useCommuteAudioPlayer';
import { useCommuteSoftSync } from '@/hooks/useCommuteSoftSync';
import CommuteHistoryBanner from '@/components/molecules/commute/CommuteHistoryBanner';
import CommuteEpisodePlayer from '@/components/molecules/commute/CommuteEpisodePlayer';
import CommuteSessionConfigurator from '@/components/molecules/commute/CommuteSessionConfigurator';
import CommuteTranscriptTimeline from '@/components/molecules/commute/CommuteTranscriptTimeline';

export const CommuteAudioStudio: React.FC = () => {
  const {
    flashcards,
    categories,
    loading,
    dataSource,
    applyBulkFlashcardPatches,
  } = useAppContext();
  const { accent } = useAccentContext();
  const [config, setConfig] = useState<CommuteConfig>(DEFAULT_COMMUTE_CONFIG);
  const [excludedCardIds, setExcludedCardIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setConfig(loadCommuteConfig());
  }, []);

  const { latestSession, saveSession, clearHistory } = useCommuteHistory();
  const {
    episode,
    isGenerating,
    progress,
    error,
    generateEpisode,
    cancelGeneration,
  } = useCommuteEpisodeGenerator();
  const player = useCommuteAudioPlayer(episode);
  const softSync = useCommuteSoftSync({
    episode,
    currentTime: player.currentTime,
    isPlaying: player.isPlaying,
    enabled: config.syncToAnki,
    flashcards,
    dataSource,
    onFlashcardsSynced: applyBulkFlashcardPatches,
  });

  const matchingCards = useMemo(
    () => filterCommuteCards(flashcards, config.filter, config.categoryId),
    [flashcards, config.filter, config.categoryId]
  );

  const eligibleCards = useMemo(
    () => matchingCards.filter((c) => !excludedCardIds.has(c._id ?? c.question)),
    [matchingCards, excludedCardIds]
  );

  const batchWindow = useMemo(
    () =>
      resolveCommuteBatchWindow(
        eligibleCards.length,
        config.startIndex,
        config.cardCount
      ),
    [eligibleCards.length, config.startIndex, config.cardCount]
  );

  const selectedCards = useMemo(
    () =>
      eligibleCards.slice(
        batchWindow.startOffset,
        batchWindow.startOffset + batchWindow.effectiveCount
      ),
    [eligibleCards, batchWindow.startOffset, batchWindow.effectiveCount]
  );

  const reserveCount = Math.max(
    0,
    batchWindow.availableFromStart - selectedCards.length
  );

  const { collocationsAvailable, tipsAvailable } = useMemo(() => {
    let collocations = 0;
    let tips = 0;
    for (const card of selectedCards) {
      const fields = extractFlashcardNarrationFields(card);
      if (fields.collocationsEn) collocations += 1;
      if (fields.tipsId) tips += 1;
    }
    return { collocationsAvailable: collocations, tipsAvailable: tips };
  }, [selectedCards]);

  const estimatedMinutes = useMemo(() => {
    const previewSegments = buildCommuteScript(selectedCards, config);
    const sec = estimateEpisodeDurationSec(previewSegments);
    return Math.max(1, Math.round(sec / 60));
  }, [selectedCards, config]);

  const handleChangeConfig = useCallback((patch: Partial<CommuteConfig>) => {
    const resetScope =
      patch.filter !== undefined || patch.categoryId !== undefined;
    if (resetScope) {
      setExcludedCardIds(new Set());
    }
    setConfig((prev) => {
      const next: CommuteConfig = {
        ...prev,
        ...patch,
        ...(patch.filter !== undefined && patch.syncToAnki === undefined
          ? { syncToAnki: shouldDefaultSoftSync(patch.filter) }
          : {}),
        ...(resetScope && patch.startIndex === undefined
          ? { startIndex: COMMUTE_CARD_LIMITS.MIN_START_INDEX }
          : {}),
      };
      saveCommuteConfig(next);
      return next;
    });
  }, []);

  const handleExcludeCard = useCallback((cardId: string) => {
    setExcludedCardIds((prev) => {
      const next = new Set(prev);
      next.add(cardId);
      return next;
    });
  }, []);

  const handleResetExcluded = useCallback(() => {
    setExcludedCardIds(new Set());
  }, []);

  const handleGenerate = useCallback(async () => {
    const modeTitle = COMMUTE_MODE_META[config.mode].title;
    const customTitle =
      batchWindow.safeStartIndex > 1
        ? `${modeTitle} (${selectedCards.length} kartu · #${batchWindow.safeStartIndex}–${batchWindow.endIndex})`
        : undefined;
    const created = await generateEpisode(selectedCards, config, accent, customTitle);
    if (created) {
      saveSession({
        id: created.id,
        title: created.title,
        mode: created.mode,
        cardIds: created.cardIds,
        cardCount: created.cardCount,
        createdAt: created.createdAt,
        includeCollocations: config.includeCollocations,
        includeTips: config.includeTips,
        recallPauseSec: config.recallPauseSec,
        filter: config.filter,
        startIndex: batchWindow.safeStartIndex,
      });
    }
  }, [
    selectedCards,
    config,
    accent,
    batchWindow.safeStartIndex,
    batchWindow.endIndex,
    generateEpisode,
    saveSession,
  ]);

  const resolveOrderedSessionCards = useCallback(
    (cardIds: readonly string[]) => {
      const cardMap = new Map(flashcards.map((c) => [c._id ?? c.question, c]));
      return cardIds
        .map((id) => cardMap.get(id))
        .filter((card): card is (typeof flashcards)[number] => Boolean(card));
    },
    [flashcards]
  );

  const handleContinueSession = useCallback(
    async (record: CommuteSessionRecord) => {
      const orderedCards = resolveOrderedSessionCards(record.cardIds);
      if (orderedCards.length === 0) return;

      const sessionConfig: CommuteConfig = {
        ...config,
        mode: record.mode,
        filter: record.filter ?? config.filter,
        cardCount: orderedCards.length,
        startIndex: record.startIndex ?? config.startIndex,
        includeCollocations:
          record.includeCollocations ?? config.includeCollocations,
        includeTips: record.includeTips ?? config.includeTips,
        recallPauseSec: record.recallPauseSec ?? config.recallPauseSec,
      };
      await generateEpisode(orderedCards, sessionConfig, accent, record.title);
    },
    [resolveOrderedSessionCards, config, accent, generateEpisode]
  );

  const handleQuickRecallSession = useCallback(
    async (record: CommuteSessionRecord) => {
      const matched = resolveOrderedSessionCards(record.cardIds);
      if (matched.length === 0) return;

      const recallConfig: CommuteConfig = {
        ...config,
        mode: COMMUTE_MODE.QUICK_RECALL,
        recallPauseSec: 4,
      };
      await generateEpisode(
        matched,
        recallConfig,
        accent,
        `Quick Recall Pulang (${matched.length} kartu)`
      );
    },
    [resolveOrderedSessionCards, config, accent, generateEpisode]
  );

  const latestSessionProgress = useMemo(() => {
    if (!latestSession) return null;
    const key = buildCommuteEpisodeKey(latestSession.mode, latestSession.cardIds);
    return loadAudioProgress(key);
    // Re-read when playback state or savedProgress changes so the banner stays fresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestSession, player.isPlaying, player.savedProgress]);

  if (loading) {
    return (
      <div className='rounded-2xl border p-8 text-center text-sm text-muted-foreground' style={{ borderColor: 'var(--border)' }}>
        Memuat deck flashcards...
      </div>
    );
  }

  return (
    <div className='space-y-5'>
      {/* 1-Tap Continue Session & Ride-Home Quick Recall Banner */}
      {latestSession && (
        <CommuteHistoryBanner
          latestSession={latestSession}
          lastProgress={latestSessionProgress}
          isGenerating={isGenerating}
          onContinueSession={handleContinueSession}
          onQuickRecallSession={handleQuickRecallSession}
          onClearHistory={clearHistory}
        />
      )}

      {/* Primary Action Top: Active Audio Player (mount-friendly controls) */}
      {episode && (
        <CommuteEpisodePlayer
          episode={episode}
          audioRef={player.audioRef}
          isPlaying={player.isPlaying}
          currentTime={player.currentTime}
          duration={player.duration}
          playbackSpeed={player.playbackSpeed}
          isLooping={player.isLooping}
          activeChapter={player.activeChapter}
          activeChapterIndex={player.activeChapterIndex}
          savedProgress={player.savedProgress}
          showResumePrompt={player.showResumePrompt}
          onTogglePlay={player.togglePlay}
          onSeek={player.seek}
          onSkip={player.skip}
          onJumpToChapter={player.jumpToChapter}
          onSetPlaybackSpeed={player.setPlaybackSpeed}
          onToggleLoop={player.toggleLoop}
          onDownloadMp3={player.downloadEpisodeMp3}
          softSync={softSync}
          onResume={player.resumeFromSaved}
          onRestart={player.restartFromBeginning}
        />
      )}

      {/* Session Builder / Configurator */}
      <CommuteSessionConfigurator
        config={config}
        categories={categories}
        matchingCount={eligibleCards.length}
        batchWindow={batchWindow}
        selectedCards={selectedCards}
        reserveCount={reserveCount}
        excludedCount={excludedCardIds.size}
        collocationsAvailable={collocationsAvailable}
        tipsAvailable={tipsAvailable}
        estimatedMinutes={estimatedMinutes}
        isGenerating={isGenerating}
        progress={progress}
        error={error}
        onChangeConfig={handleChangeConfig}
        onExcludeCard={handleExcludeCard}
        onResetExcluded={handleResetExcluded}
        onGenerate={handleGenerate}
        onCancel={cancelGeneration}
      />

      {/* Reference Bottom: Interactive Chapter Timeline */}
      {episode && (
        <CommuteTranscriptTimeline
          chapters={episode.chapters}
          activeChapterIndex={player.activeChapterIndex}
          onSelectChapter={player.jumpToChapter}
        />
      )}
    </div>
  );
};

export default CommuteAudioStudio;
