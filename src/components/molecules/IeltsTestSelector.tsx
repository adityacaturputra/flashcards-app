'use client';
import React from 'react';
import { FaBookBookmark } from 'react-icons/fa6';
import { CambridgeBookItem } from '@/types/cambridgeTests';

interface IeltsTestSelectorProps {
  books: CambridgeBookItem[];
  selectedBook: CambridgeBookItem;
  selectedTestId: string;
  onSelectBook: (bookId: string) => void;
  onSelectTest: (testId: string) => void;
}

export const IeltsTestSelector: React.FC<IeltsTestSelectorProps> = ({
  books,
  selectedBook,
  selectedTestId,
  onSelectBook,
  onSelectTest,
}) => {
  return (
    <div
      className='flex flex-col gap-3 rounded-2xl border p-3 sm:p-4 shadow-xs'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Book Horizontal Selector */}
      <div className='flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none'>
        <div className='flex items-center gap-1.5 shrink-0 pr-2 border-r border-border text-xs font-bold text-muted-foreground'>
          <FaBookBookmark className='h-3.5 w-3.5 text-purple-600 dark:text-purple-400' />
          <span>Books:</span>
        </div>
        <div className='flex items-center gap-1.5 shrink-0'>
          {books.map((b) => {
            const isSelected = b.id === selectedBook.id;
            return (
              <button
                key={b.id}
                type='button'
                onClick={() => onSelectBook(b.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-xs scale-[1.02]'
                    : 'text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800'
                }`}
              >
                <span>Cam {b.bookNumber}</span>
                {isSelected && (
                  <span className='rounded bg-white/20 px-1 py-0.2 text-[9px] font-bold uppercase'>
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Test Tabs & Book Meta */}
      <div className='flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-semibold text-muted-foreground'>
            Tests:
          </span>
          <div
            className='inline-flex items-center rounded-xl p-1 border gap-1'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          >
            {selectedBook.tests.map((test) => {
              const isSelected = test.id === selectedTestId;
              return (
                <button
                  key={test.id}
                  type='button'
                  onClick={() => onSelectTest(test.id)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-card text-foreground shadow-xs font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {test.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Badge & Info */}
        <div className='flex items-center gap-2 text-xs'>
          <span className='rounded-md bg-purple-500/10 px-2 py-0.5 font-bold text-purple-600 dark:text-purple-400'>
            {selectedBook.badge}
          </span>
          <span className='text-muted-foreground hidden sm:inline'>
            {selectedBook.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IeltsTestSelector;
