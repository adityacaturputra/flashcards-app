'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowsUpDownLeftRight,
  FaWindowMinimize,
  FaChevronUp,
} from 'react-icons/fa6';
import { CambridgeTrack } from '@/types/cambridgeTests';
import { useIeltsAudioPlayer } from '@/hooks/useIeltsAudioPlayer';
import { useCambridgeMediaDownloader } from '@/hooks/useCambridgeMediaDownloader';
import IeltsAudioSpeedToggle from '@/components/atoms/IeltsAudioSpeedToggle';
import IeltsAudioScrubber from '@/components/atoms/IeltsAudioScrubber';
import IeltsTrackPill from '@/components/atoms/IeltsTrackPill';
import IeltsAudioControlsRow from '@/components/atoms/IeltsAudioControlsRow';
import IeltsAudioMiniBar from '@/components/atoms/IeltsAudioMiniBar';

interface IeltsFloatingAudioPlayerProps {
  tracks: CambridgeTrack[];
  activeTrack: CambridgeTrack;
  onSelectTrack: (track: CambridgeTrack) => void;
}

export const IeltsFloatingAudioPlayer: React.FC<
  IeltsFloatingAudioPlayerProps
> = ({ tracks, activeTrack, onSelectTrack }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const {
    resolvedUrl: audioSrc,
    isDownloading: isAudioDownloading,
    loadedMb,
    totalMb,
    progressPercent,
  } = useCambridgeMediaDownloader({
    localUrl: activeTrack.audioUrl,
    remoteUrl: activeTrack.remoteAudioUrl,
    mimeType: 'audio/mpeg',
  });

  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    togglePlay,
    seek,
    skip,
    setPlaybackSpeed,
  } = useIeltsAudioPlayer({
    audioUrl: audioSrc,
    fallbackAudioUrl: activeTrack.remoteAudioUrl,
  });

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='fixed bottom-6 right-4 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[380px] rounded-2xl border border-border shadow-2xl backdrop-blur-md overflow-hidden bg-card'
    >
      <audio ref={audioRef} src={audioSrc} preload='metadata' />

      {/* Header Bar / Drag Handle */}
      <div className='flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing border-b border-border bg-secondary select-none'>
        <div className='flex items-center gap-2 min-w-0'>
          <FaArrowsUpDownLeftRight className='h-3.5 w-3.5 text-muted-foreground shrink-0' />
          <span className='truncate text-xs font-bold text-foreground'>
            {activeTrack.title}
          </span>
        </div>

        <button
          type='button'
          onClick={() => setIsMinimized(!isMinimized)}
          className='p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all'
          title={isMinimized ? 'Perbesar Audio Player' : 'Kecilkan Audio Player'}
        >
          {isMinimized ? (
            <FaChevronUp className='h-3 w-3' />
          ) : (
            <FaWindowMinimize className='h-3 w-3' />
          )}
        </button>
      </div>

      {/* Player Body */}
      {!isMinimized ? (
        <div className='p-3.5 flex flex-col gap-3'>
          <div className='flex items-center justify-between gap-1 overflow-x-auto pb-0.5'>
            {tracks.map((t) => (
              <IeltsTrackPill
                key={t.section}
                track={t}
                isActive={t.section === activeTrack.section}
                onSelect={onSelectTrack}
              />
            ))}
          </div>

          {isAudioDownloading && (
            <div className='flex items-center justify-between text-[11px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg'>
              <span>Unduh: {loadedMb}/{totalMb} MB</span>
              <span className='font-bold'>{progressPercent}%</span>
            </div>
          )}

          <IeltsAudioScrubber
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
            disabled={isLoading || isAudioDownloading}
          />

          <IeltsAudioControlsRow
            isPlaying={isPlaying}
            isLoading={isLoading || isAudioDownloading}
            onTogglePlay={togglePlay}
            onSkip={skip}
          />

          <div className='flex items-center justify-between pt-1 border-t border-border/60'>
            <span className='text-[11px] font-semibold text-muted-foreground'>
              Kecepatan:
            </span>
            <IeltsAudioSpeedToggle
              currentSpeed={playbackSpeed}
              onSelectSpeed={setPlaybackSpeed}
              compact
            />
          </div>
        </div>
      ) : (
        <IeltsAudioMiniBar
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onSkip={skip}
        />
      )}
    </motion.div>
  );
};

export default IeltsFloatingAudioPlayer;
