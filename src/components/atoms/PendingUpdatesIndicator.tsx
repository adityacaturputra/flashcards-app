import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSync, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

interface PendingUpdate {
  id: string;
  flashcardId: string;
  flashcardQuestion: string;
  updates: Record<string, unknown>;
  timestamp: number;
  retryCount: number;
}

interface PendingUpdatesIndicatorProps {
  pendingCount: number;
  isProcessing: boolean;
  onRetry: () => void;
  onClear: () => void;
  pendingUpdates?: PendingUpdate[];
}

const PendingUpdatesIndicator: React.FC<PendingUpdatesIndicatorProps> = ({
  pendingCount,
  isProcessing,
  onRetry,
  onClear,
  pendingUpdates = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (pendingCount === 0) return null;

  return (
    <>
      {/* Floating Indicator Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg'
        style={{
          background: 'var(--destructive)',
          color: 'var(--destructive-foreground)',
        }}
        title={`${pendingCount} pending update${pendingCount > 1 ? 's' : ''}`}
      >
        {isProcessing ? (
          <FaSync className='h-5 w-5 animate-spin' />
        ) : (
          <FaExclamationTriangle className='h-5 w-5' />
        )}
        <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600'>
          {pendingCount}
        </span>
      </motion.button>

      {/* Modal/Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-40 bg-black/50'
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='fixed bottom-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl shadow-2xl'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              {/* Header */}
              <div className='flex items-center justify-between border-b p-4' style={{ borderColor: 'var(--border)' }}>
                <div className='flex items-center gap-2'>
                  <FaExclamationTriangle className='text-orange-500' />
                  <h3 className='font-semibold' style={{ color: 'var(--foreground)' }}>
                    Pending Updates
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className='rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className='max-h-60 overflow-y-auto p-4'>
                <p className='mb-4 text-sm' style={{ color: 'var(--muted-foreground)' }}>
                  {pendingCount} update{pendingCount > 1 ? 's' : ''} waiting to be synced.
                  {pendingUpdates.some((u) => u.retryCount > 0) && ' Some updates failed and will be retried.'}
                </p>

                <div className='space-y-2'>
                  {pendingUpdates.slice(0, 5).map((update) => (
                    <div
                      key={update.id}
                      className='flex items-center gap-2 rounded-lg border p-2 text-xs'
                      style={{
                        background: 'var(--muted)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      {update.retryCount > 0 ? (
                        <FaExclamationTriangle className='text-orange-500' />
                      ) : (
                        <FaSync className='text-gray-400' />
                      )}
                      <div className='flex-1 min-w-0'>
                        <span className='block font-medium truncate'>{update.flashcardQuestion}</span>
                        {update.retryCount > 0 && (
                          <span className='text-xs text-orange-500'>(Retry {update.retryCount})</span>
                        )}
                      </div>
                      <span className='text-gray-400'>
                        {Object.keys(update.updates).join(', ')}
                      </span>
                    </div>
                  ))}

                  {pendingUpdates.length > 5 && (
                    <p className='text-center text-xs' style={{ color: 'var(--muted-foreground)' }}>
                      +{pendingUpdates.length - 5} more...
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className='flex gap-2 border-t p-4' style={{ borderColor: 'var(--border)' }}>
                <button
                  onClick={() => {
                    onRetry();
                    if (!isProcessing) {
                      setIsOpen(false);
                    }
                  }}
                  disabled={isProcessing}
                  className='flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  <FaSync className={isProcessing ? 'animate-spin' : ''} />
                  Retry Now
                </button>
                <button
                  onClick={() => {
                    onClear();
                    setIsOpen(false);
                  }}
                  className='rounded-lg px-4 py-2 font-medium transition-all hover:scale-105'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                >
                  Clear
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PendingUpdatesIndicator;
