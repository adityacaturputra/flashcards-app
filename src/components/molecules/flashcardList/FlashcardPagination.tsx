// src/components/molecules/flashcardList/FlashcardPagination.tsx
import React from 'react';

export interface FlashcardPaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onSelectPage: (pageNumber: number) => void;
}

export const FlashcardPagination: React.FC<FlashcardPaginationProps> = ({
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  onSelectPage,
}) => {
  if (totalPages <= 1 || totalItems === 0) return null;

  return (
    <div className='mt-6 mb-6 flex flex-col items-center gap-3'>
      {/* Page Info */}
      <div className='text-center'>
        <p
          className='text-xs font-medium sm:text-sm'
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span className='hidden sm:inline'>
            Showing {currentPage * pageSize + 1} to{' '}
            {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems}{' '}
            flashcards
          </span>
          <span className='sm:hidden'>
            {currentPage + 1} / {totalPages}
          </span>
        </p>
      </div>

      {/* Pagination Buttons */}
      <div className='flex items-center gap-1'>
        {/* First Page Button */}
        <button
          className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
          style={{
            background: currentPage === 0 ? 'var(--muted)' : 'var(--primary)',
            color:
              currentPage === 0
                ? 'var(--muted-foreground)'
                : 'var(--primary-foreground)',
          }}
          onClick={onFirstPage}
          disabled={currentPage === 0}
          title='First page'
        >
          <svg
            className='h-3 w-3 sm:h-4 sm:w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
            />
          </svg>
        </button>

        {/* Previous Page Button */}
        <button
          className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
          style={{
            background: currentPage === 0 ? 'var(--muted)' : 'var(--primary)',
            color:
              currentPage === 0
                ? 'var(--muted-foreground)'
                : 'var(--primary-foreground)',
          }}
          onClick={onPreviousPage}
          disabled={currentPage === 0}
          title='Previous page'
        >
          <svg
            className='h-3 w-3 sm:h-4 sm:w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className='flex items-center gap-0.5'>
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            let pageNumber: number;
            if (totalPages <= 3) {
              pageNumber = i;
            } else if (currentPage < 2) {
              pageNumber = i;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 3 + i;
            } else {
              pageNumber = currentPage - 1 + i;
            }

            return (
              <button
                key={pageNumber}
                className='flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-all hover:scale-105 sm:h-7 sm:w-7 sm:text-sm'
                style={{
                  background:
                    currentPage === pageNumber
                      ? 'var(--primary)'
                      : 'var(--muted)',
                  color:
                    currentPage === pageNumber
                      ? 'var(--primary-foreground)'
                      : 'var(--foreground)',
                }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectPage(pageNumber);
                }}
              >
                {pageNumber + 1}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
          style={{
            background:
              currentPage === totalPages - 1
                ? 'var(--muted)'
                : 'var(--primary)',
            color:
              currentPage === totalPages - 1
                ? 'var(--muted-foreground)'
                : 'var(--primary-foreground)',
          }}
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          title='Next page'
        >
          <svg
            className='h-3 w-3 sm:h-4 sm:w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>

        {/* Last Page Button */}
        <button
          className='flex items-center justify-center rounded-md p-1.5 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2'
          style={{
            background:
              currentPage === totalPages - 1
                ? 'var(--muted)'
                : 'var(--primary)',
            color:
              currentPage === totalPages - 1
                ? 'var(--muted-foreground)'
                : 'var(--primary-foreground)',
          }}
          onClick={onLastPage}
          disabled={currentPage === totalPages - 1}
          title='Last page'
        >
          <svg
            className='h-3 w-3 sm:h-4 sm:w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 5l7 7-7 7M5 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FlashcardPagination;
