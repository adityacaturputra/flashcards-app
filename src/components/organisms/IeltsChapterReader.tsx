'use client';
import React, { memo } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaGraduationCap,
} from 'react-icons/fa6';
import { IeltsChapter } from '@/types/ielts';
import MarkdownViewer from '@/components/atoms/MarkdownViewer';

interface IeltsChapterReaderProps {
  chapter: IeltsChapter;
  onPrevChapter?: () => void;
  onNextChapter?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const IeltsChapterReader: React.FC<IeltsChapterReaderProps> = memo(
  ({ chapter, onPrevChapter, onNextChapter, hasPrev, hasNext }) => {
    return (
      <article
        className='flex flex-col gap-5 rounded-2xl border p-4 sm:p-7 shadow-sm'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        {/* Chapter Header Card */}
        <div className='flex flex-col gap-3 pb-4 border-b' style={{ borderColor: 'var(--border)' }}>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 text-xs font-bold'>
              Modul {chapter.moduleNumber}
            </span>
            <span
              className='rounded-md px-2 py-0.5 text-xs font-semibold uppercase'
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
            >
              {chapter.itemType}
            </span>
            {chapter.duration && (
              <span
                className='rounded-md px-2 py-0.5 text-xs font-medium'
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                }}
              >
                {chapter.duration}
              </span>
            )}
            <span className='rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-xs font-bold'>
              IELTS Band 7+
            </span>
          </div>

          <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground'>
            {chapter.title}
          </h1>

          <p className='text-xs sm:text-sm text-muted-foreground'>
            {chapter.description}
          </p>

          {/* Key Takeaways Card */}
          {chapter.keyTakeaways && chapter.keyTakeaways.length > 0 && (
            <div
              className='mt-1 rounded-xl border p-3'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5'>
                <FaGraduationCap className='h-3.5 w-3.5' style={{ color: 'var(--primary)' }} />
                <span>Poin-Poin Strategis Bab Ini:</span>
              </div>
              <ul className='space-y-1 text-xs text-muted-foreground list-disc pl-4'>
                {chapter.keyTakeaways.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Markdown Content Viewer */}
        <div
          className='rounded-xl border p-3.5 sm:p-6'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <MarkdownViewer content={chapter.markdownContent} showCopyButton={true} />
        </div>

        {/* Bottom Pagination */}
        <div className='flex items-center justify-between pt-4 border-t' style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={onPrevChapter}
            disabled={!hasPrev}
            className='flex items-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm font-semibold transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed'
            style={{ borderColor: 'var(--border)' }}
          >
            <FaArrowLeft className='h-3 w-3' />
            <span>Bab Sebelumnya</span>
          </button>

          <button
            onClick={onNextChapter}
            disabled={!hasNext}
            className='flex items-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm font-semibold transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed'
            style={{
              background: hasNext ? 'var(--primary)' : 'transparent',
              color: hasNext ? 'var(--primary-foreground)' : 'inherit',
              borderColor: 'var(--border)',
            }}
          >
            <span>Bab Selanjutnya</span>
            <FaArrowRight className='h-3 w-3' />
          </button>
        </div>
      </article>
    );
  }
);

IeltsChapterReader.displayName = 'IeltsChapterReader';
export default IeltsChapterReader;
