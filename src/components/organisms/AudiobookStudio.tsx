'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ALL_AUDIOBOOK_EPISODES,
  AUDIOBOOK_MODULES,
} from '@/data/audiobooks';
import { AudiobookEpisode } from '@/types/audiobook';
import {
  readLastEpisodeId,
  useAudiobookProgress,
  writeLastEpisodeId,
} from '@/hooks/useAudiobookProgress';
import { useAudiobookPlayer } from '@/hooks/useAudiobookPlayer';
import AudiobookPlayerCard from '@/components/molecules/audiobooks/AudiobookPlayerCard';
import AudiobookModuleList from '@/components/molecules/audiobooks/AudiobookModuleList';
import AudiobookScriptDrawer from '@/components/molecules/audiobooks/AudiobookScriptDrawer';

export const AudiobookStudio: React.FC = () => {
  const [activeEpisodeId, setActiveEpisodeId] = useState<string>(
    ALL_AUDIOBOOK_EPISODES[0].id
  );
  const [scriptEpisode, setScriptEpisode] = useState<AudiobookEpisode | null>(
    null
  );

  const { progressMap, completedCount, saveProgress, toggleCompleted } =
    useAudiobookProgress();

  // Restore last played episode on mount
  useEffect(() => {
    const lastId = readLastEpisodeId();
    if (lastId && ALL_AUDIOBOOK_EPISODES.some((ep) => ep.id === lastId)) {
      setActiveEpisodeId(lastId);
    }
  }, []);

  const activeIndex = useMemo(
    () => ALL_AUDIOBOOK_EPISODES.findIndex((ep) => ep.id === activeEpisodeId),
    [activeEpisodeId]
  );

  const activeEpisode =
    ALL_AUDIOBOOK_EPISODES[activeIndex >= 0 ? activeIndex : 0];

  const selectEpisodeById = useCallback((id: string) => {
    setActiveEpisodeId(id);
    writeLastEpisodeId(id);
  }, []);

  const handlePrevious = useCallback(() => {
    if (activeIndex > 0) {
      selectEpisodeById(ALL_AUDIOBOOK_EPISODES[activeIndex - 1].id);
    }
  }, [activeIndex, selectEpisodeById]);

  const handleNext = useCallback(() => {
    if (activeIndex < ALL_AUDIOBOOK_EPISODES.length - 1) {
      selectEpisodeById(ALL_AUDIOBOOK_EPISODES[activeIndex + 1].id);
    }
  }, [activeIndex, selectEpisodeById]);

  const player = useAudiobookPlayer({
    episode: activeEpisode,
    initialTimeSec: progressMap[activeEpisode.id]?.lastPlayTime ?? 0,
    onSaveProgress: saveProgress,
    onPreviousEpisode: handlePrevious,
    onNextEpisode: handleNext,
  });

  const handleSelectEpisode = useCallback(
    (episode: AudiobookEpisode) => {
      if (episode.id === activeEpisode.id) {
        player.togglePlay();
        return;
      }
      selectEpisodeById(episode.id);
    },
    [activeEpisode.id, player, selectEpisodeById]
  );

  return (
    <div className='space-y-6'>
      {/* Hidden native HTML5 audio element for iOS Safari background playback */}
      <audio ref={player.audioRef} playsInline preload='metadata' className='hidden' />

      <AudiobookPlayerCard
        episode={activeEpisode}
        isPlaying={player.isPlaying}
        currentTime={player.currentTime}
        duration={player.duration}
        playbackSpeed={player.playbackSpeed}
        hasPrevious={activeIndex > 0}
        hasNext={activeIndex < ALL_AUDIOBOOK_EPISODES.length - 1}
        onTogglePlay={player.togglePlay}
        onSeekTo={player.seekTo}
        onSkipBy={player.skipBy}
        onSpeedChange={player.setPlaybackSpeed}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onOpenScript={() => setScriptEpisode(activeEpisode)}
      />

      <AudiobookModuleList
        modules={AUDIOBOOK_MODULES}
        activeEpisodeId={activeEpisode.id}
        isPlaying={player.isPlaying}
        progressMap={progressMap}
        completedCount={completedCount}
        totalEpisodes={ALL_AUDIOBOOK_EPISODES.length}
        onSelectEpisode={handleSelectEpisode}
        onOpenScript={setScriptEpisode}
        onToggleCompleted={toggleCompleted}
      />

      <AudiobookScriptDrawer
        episode={scriptEpisode}
        onClose={() => setScriptEpisode(null)}
      />
    </div>
  );
};

export default AudiobookStudio;
