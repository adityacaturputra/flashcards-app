'use client';
import React, { useState, useMemo, useCallback } from 'react';
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
  const { flashcards, categories, loading, updateFlashcard } = useAppContext();
  const { accent } = useAccentContext();
  const [config, setConfig] = useState<CommuteConfig>(DEFAULT_COMMUTE_CONFIG);

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
    updateFlashcard,
  });

  const matchingCards = useMemo(
    () => filterCommuteCards(flashcards, config.filter, config.categoryId),
    [flashcards, config.filter, config.categoryId]
  );

  const batchWindow = useMemo(
    () =>
      resolveCommuteBatchWindow(
        matchingCards.length,
        config.startIndex,
        config.cardCount
      ),
    [matchingCards.length, config.startIndex, config.cardCount]
  );

  const selectedCards = useMemo(
    () =>
      matchingCards.slice(
        batchWindow.startOffset,
        batchWindow.startOffset + batchWindow.effectiveCount
      ),
    [matchingCards, batchWindow.startOffset, batchWindow.effectiveCount]
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
    setConfig((prev) => {
      const resetStart =
        patch.filter !== undefined || patch.categoryId !== undefined;
      return {
        ...prev,
        ...patch,
        ...(patch.filter !== undefined && patch.syncToAnki === undefined
          ? { syncToAnki: shouldDefaultSoftSync(patch.filter) }
          : {}),
        ...(resetStart && patch.startIndex === undefined
          ? { startIndex: COMMUTE_CARD_LIMITS.MIN_START_INDEX }
          : {}),
      };
    });
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

  const handleQuickRecallSession = useCallback(
    async (record: CommuteSessionRecord) => {
      const idSet = new Set(record.cardIds);
      const matched = flashcards.filter((c) => idSet.has(c._id ?? c.question));
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
    [flashcards, config, accent, generateEpisode]
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
      {/* 1-Tap Ride-Home Quick Recall Banner */}
      {latestSession && (
        <CommuteHistoryBanner
          latestSession={latestSession}
          lastProgress={latestSessionProgress}
          isGenerating={isGenerating}
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
        matchingCount={matchingCards.length}
        batchWindow={batchWindow}
        collocationsAvailable={collocationsAvailable}
        tipsAvailable={tipsAvailable}
        estimatedMinutes={estimatedMinutes}
        isGenerating={isGenerating}
        progress={progress}
        error={error}
        onChangeConfig={handleChangeConfig}
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
