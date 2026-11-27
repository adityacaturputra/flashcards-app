'use client';
import React from 'react';
import {
  AudiobookEpisode,
  AudiobookModule,
  AudiobookProgressMap,
} from '@/types/audiobook';
import AudiobookEpisodeRow from './AudiobookEpisodeRow';

interface AudiobookModuleListProps {
  modules: AudiobookModule[];
  activeEpisodeId: string;
  isPlaying: boolean;
  progressMap: AudiobookProgressMap;
  completedCount: number;
  totalEpisodes: number;
  onSelectEpisode: (episode: AudiobookEpisode) => void;
  onOpenScript: (episode: AudiobookEpisode) => void;
  onToggleCompleted: (episodeId: string) => void;
}

export const AudiobookModuleList: React.FC<AudiobookModuleListProps> = ({
  modules,
  activeEpisodeId,
  isPlaying,
  progressMap,
  completedCount,
  totalEpisodes,
  onSelectEpisode,
  onOpenScript,
  onToggleCompleted,
}) => {
  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between gap-2 px-1'>
        <h3 className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
          8 Modul · {totalEpisodes} Episode
        </h3>
        <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'>
          {completedCount} / {totalEpisodes} Selesai
        </span>
      </div>

      <div className='space-y-4'>
        {modules.map((mod) => (
          <div
            key={mod.id}
            className='rounded-2xl border p-3.5 sm:p-4 space-y-2.5'
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className='flex items-baseline gap-2'>
              <span className='text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0'>
                Modul {mod.id}
              </span>
              <h4 className='text-sm font-bold text-foreground leading-snug'>
                {mod.title}
              </h4>
            </div>

            <div className='space-y-2'>
              {mod.episodes.map((ep) => (
                <AudiobookEpisodeRow
                  key={ep.id}
                  episode={ep}
                  progress={progressMap[ep.id]}
                  isActive={ep.id === activeEpisodeId}
                  isPlaying={ep.id === activeEpisodeId && isPlaying}
                  onSelectEpisode={onSelectEpisode}
                  onOpenScript={onOpenScript}
                  onToggleCompleted={onToggleCompleted}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudiobookModuleList;
