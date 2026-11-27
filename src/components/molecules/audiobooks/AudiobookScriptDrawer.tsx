'use client';
import React, { useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import MarkdownViewer from '@/components/atoms/MarkdownViewer';
import { AudiobookEpisode } from '@/types/audiobook';

interface AudiobookScriptDrawerProps {
  episode: AudiobookEpisode | null;
  onClose: () => void;
}

export const AudiobookScriptDrawer: React.FC<AudiobookScriptDrawerProps> = ({
  episode,
  onClose,
}) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!episode) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(episode.scriptUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat skrip naskah');
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setContent(text);
      })
      .catch(() => {
        if (!cancelled) setError('Naskah tidak ditemukan. Jalankan sync:audiobooks.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [episode]);

  useEffect(() => {
    if (!episode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [episode, onClose]);

  if (!episode) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs'
      onClick={onClose}
    >
      <aside
        className='w-full max-w-2xl h-full flex flex-col border-l shadow-2xl'
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='flex items-center justify-between gap-3 px-4 py-3.5 border-b shrink-0'
          style={{ borderColor: 'var(--border)' }}
        >
          <div className='min-w-0'>
            <span className='text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400'>
              Skrip Naskah · Ep {String(episode.episodeNumber).padStart(2, '0')}
            </span>
            <h3 className='text-sm sm:text-base font-bold text-foreground truncate'>
              {episode.title}
            </h3>
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='Tutup skrip naskah'
            className='min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-xl border text-foreground hover:opacity-80'
            style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
          >
            <FaXmark className='h-4 w-4' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-5'>
          {isLoading && (
            <p className='text-sm text-muted-foreground'>Memuat naskah...</p>
          )}
          {error && <p className='text-sm text-rose-500'>{error}</p>}
          {!isLoading && !error && content && <MarkdownViewer content={content} />}
        </div>
      </aside>
    </div>
  );
};

export default AudiobookScriptDrawer;
