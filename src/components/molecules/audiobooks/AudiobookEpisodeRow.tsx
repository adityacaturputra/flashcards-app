'use client';
import React from 'react';
import { FaBookOpen, FaCircleCheck, FaPause, FaPlay } from 'react-icons/fa6';
import { AudiobookEpisode, AudiobookEpisodeProgress } from '@/types/audiobook';
import {
  getEpisodeStatusLabel,
  getProgressPercent,
} from '@/utils/audiobookFormatters';

interface AudiobookEpisodeRowProps {
  episode: AudiobookEpisode;
  progress?: AudiobookEpisodeProgress;
  isActive: boolean;
  isPlaying: boolean;
  onSelectEpisode: (episode: AudiobookEpisode) => void;
  onOpenScript: (episode: AudiobookEpisode) => void;
  onToggleCompleted: (episodeId: string) => void;
}

export const AudiobookEpisodeRow: React.FC<AudiobookEpisodeRowProps> = ({
  episode,
  progress,
  isActive,
  isPlaying,
  onSelectEpisode,
  onOpenScript,
  onToggleCompleted,
}) => {
  const statusLabel = getEpisodeStatusLabel(progress);
  const progressPct = progress?.completed
    ? 100
    : getProgressPercent(progress?.lastPlayTime ?? 0, progress?.duration ?? 0);

  return (
    <div
      className={`rounded-xl border p-3 sm:p-3.5 transition-all ${
        isActive ? 'shadow-xs ring-1 ring-emerald-500/40' : ''
      }`}
      style={{
        background: isActive ? 'var(--card)' : 'var(--secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='flex items-start gap-3'>
        <button
          type='button'
          onClick={() => onSelectEpisode(episode)}
          aria-label={`Putar Episode ${episode.episodeNumber}: ${episode.title}`}
          className={`min-h-[44px] min-w-[44px] shrink-0 inline-flex items-center justify-center rounded-xl transition-colors ${
            isActive
              ? 'bg-emerald-600 text-white'
              : 'border text-foreground hover:opacity-80'
          }`}
          style={
            isActive
              ? undefined
              : { background: 'var(--card)', borderColor: 'var(--border)' }
          }
        >
          {isActive && isPlaying ? (
            <FaPause className='h-4 w-4' />
          ) : (
            <FaPlay className='h-4 w-4 ml-0.5' />
          )}
        </button>

        <div className='min-w-0 flex-1'>
          <button
            type='button'
            onClick={() => onSelectEpisode(episode)}
            className='text-left w-full'
          >
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='text-[11px] font-bold text-muted-foreground'>
                EP {String(episode.episodeNumber).padStart(2, '0')}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  progress?.completed
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-500/10 text-muted-foreground'
                }`}
              >
                {statusLabel}
              </span>
            </div>
            <h4 className='text-sm font-bold text-foreground mt-0.5 leading-snug'>
              {episode.title}
            </h4>
            <p className='text-xs text-muted-foreground mt-0.5 leading-relaxed'>
              {episode.focus}
            </p>
          </button>

          {progressPct > 0 && (
            <div className='mt-2 h-1.5 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700'>
              <div
                className='h-full bg-emerald-500 transition-all'
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}
        </div>

        <div className='flex items-center gap-1 shrink-0'>
          <button
            type='button'
            onClick={() => onOpenScript(episode)}
            title='Baca Skrip Naskah'
            aria-label={`Baca skrip Episode ${episode.episodeNumber}`}
            className='min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg border text-muted-foreground hover:text-foreground transition-colors'
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <FaBookOpen className='h-3.5 w-3.5' />
          </button>
          <button
            type='button'
            onClick={() => onToggleCompleted(episode.id)}
            title={
              progress?.completed ? 'Tandai belum selesai' : 'Tandai selesai'
            }
            aria-label={`Ubah status selesai Episode ${episode.episodeNumber}`}
            className={`min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg border transition-colors ${
              progress?.completed
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <FaCircleCheck className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudiobookEpisodeRow;
