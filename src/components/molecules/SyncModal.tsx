'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaRotate,
  FaCloudArrowUp,
  FaCloudArrowDown,
  FaDatabase,
  FaFolderClosed,
  FaCheck,
  FaTriangleExclamation,
  FaFilter,
} from 'react-icons/fa6';
import {
  SyncDiffReport,
  SyncCardDiff,
  SyncFilterTab,
  SYNC_FILTER_TAB,
  SYNC_DIRECTION,
} from '@/types/sync';
import SyncDiffViewer from './SyncDiffViewer';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: () => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete,
}) => {
  const [report, setReport] = useState<SyncDiffReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<SyncFilterTab>(SYNC_FILTER_TAB.ALL);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch comparison diff report from API
  const fetchDiff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/sync');
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to compare Local and Cloud datasets.');
      }
      setReport(data.report);
    } catch (err: unknown) {
      console.error('Sync diff fetch error:', err);
      const message = err instanceof Error ? err.message : 'Failed to load sync comparison report.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage(null);
      fetchDiff();
    }
  }, [isOpen, fetchDiff]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSyncing) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSyncing, onClose]);

  // Handle Push Local -> Cloud
  const handlePush = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: SYNC_DIRECTION.PUSH }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to push Local cards to Cloud.');
      }
      setSuccessMessage(data.result.message);
      await fetchDiff();
      onSyncComplete?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error pushing to Cloud.';
      setError(message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle Pull Cloud -> Local
  const handlePull = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: SYNC_DIRECTION.PULL }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to pull Cloud cards to Local.');
      }
      setSuccessMessage(data.result.message);
      await fetchDiff();
      onSyncComplete?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error pulling from Cloud.';
      setError(message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCardResolved = useCallback(() => {
    fetchDiff();
    onSyncComplete?.();
    setSuccessMessage('Conflict on card resolved and synchronized successfully!');
  }, [fetchDiff, onSyncComplete]);

  if (!isOpen || !mounted) return null;

  // Filter items based on activeTab
  const getVisibleItems = (): SyncCardDiff[] => {
    if (!report) return [];
    switch (activeTab) {
      case SYNC_FILTER_TAB.MODIFIED:
        return report.modified;
      case SYNC_FILTER_TAB.LOCAL_ONLY:
        return report.localOnly;
      case SYNC_FILTER_TAB.CLOUD_ONLY:
        return report.cloudOnly;
      case SYNC_FILTER_TAB.ALL:
      default:
        return [...report.modified, ...report.localOnly, ...report.cloudOnly];
    }
  };

  const visibleItems = getVisibleItems();
  const totalDifferences = report
    ? report.localOnly.length + report.cloudOnly.length + report.modified.length
    : 0;

  return createPortal(
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden'>
        {/* Backdrop */}
        <motion.div
          className='fixed inset-0 bg-black/60 backdrop-blur-xs'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSyncing && onClose()}
        />

        {/* Modal Window */}
        <motion.div
          className='relative flex flex-col w-full max-w-3xl max-h-[85vh] min-h-0 rounded-2xl border shadow-2xl overflow-hidden z-10'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
          }}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Modal Header */}
          <div
            className='flex items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-3.5 shrink-0'
            style={{ borderColor: 'var(--border)' }}
          >
            <div className='flex items-center gap-2.5'>
              <div
                className='flex h-9 w-9 items-center justify-center rounded-xl border shadow-xs'
                style={{
                  background: 'var(--secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <FaRotate className={`h-4 w-4 text-blue-500 ${loading || isSyncing ? 'animate-spin' : ''}`} />
              </div>
              <div className='min-w-0'>
                <h2 className='text-sm sm:text-lg font-bold truncate'>Cloud ⇋ Local Synchronization</h2>
                <p className='text-xs text-muted-foreground hidden xs:block'>
                  Sync flashcard changes and Anki SRS reviews between Local Repository and MongoDB Cloud.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isSyncing}
              className='rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50'
            >
              <FaXmark className='h-4 w-4' />
            </button>
          </div>

          {/* Modal Body */}
          <div className='flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-6 space-y-4'>
            {/* Banner Messages */}
            {error && (
              <div className='rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2'>
                <FaTriangleExclamation className='h-4 w-4 shrink-0 mt-0.5' />
                <div className='flex-1'>{error}</div>
              </div>
            )}

            {successMessage && (
              <div className='rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400 flex items-start gap-2'>
                <FaCheck className='h-4 w-4 shrink-0 mt-0.5' />
                <div className='flex-1'>{successMessage}</div>
              </div>
            )}

            {/* Summary Statistics Cards */}
            {report && (
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
                {/* Local Total */}
                <div
                  className='rounded-xl border p-3 shadow-2xs space-y-1'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <div className='flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground'>
                    <FaFolderClosed className='h-3 w-3 text-amber-500' />
                    <span>Local Repo</span>
                  </div>
                  <div className='text-lg sm:text-xl font-bold'>{report.totalLocal}</div>
                  <div className='text-[10px] text-muted-foreground'>{report.localOnly.length} local-only</div>
                </div>

                {/* Cloud Total */}
                <div
                  className='rounded-xl border p-3 shadow-2xs space-y-1'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <div className='flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground'>
                    <FaDatabase className='h-3 w-3 text-blue-500' />
                    <span>MongoDB Cloud</span>
                  </div>
                  <div className='text-lg sm:text-xl font-bold'>{report.totalCloud}</div>
                  <div className='text-[10px] text-muted-foreground'>{report.cloudOnly.length} cloud-only</div>
                </div>

                {/* Modified Cards */}
                <div
                  className='rounded-xl border p-3 shadow-2xs space-y-1'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <div className='flex items-center gap-1.5 text-[11px] font-medium text-purple-600 dark:text-purple-400'>
                    <FaFilter className='h-3 w-3' />
                    <span>Modified</span>
                  </div>
                  <div className='text-lg sm:text-xl font-bold'>{report.modified.length}</div>
                  <div className='text-[10px] text-muted-foreground'>differing fields</div>
                </div>

                {/* Identical In-Sync */}
                <div
                  className='rounded-xl border p-3 shadow-2xs space-y-1'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <div className='flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400'>
                    <FaCheck className='h-3 w-3' />
                    <span>In Sync</span>
                  </div>
                  <div className='text-lg sm:text-xl font-bold'>{report.identicalCount}</div>
                  <div className='text-[10px] text-muted-foreground'>cards 100% matched</div>
                </div>
              </div>
            )}

            {/* Category Sync Notice (if categories differ) */}
            {report?.categorySummary &&
              (report.categorySummary.localOnlyCount > 0 ||
                report.categorySummary.cloudOnlyCount > 0) && (
                <div
                  className='rounded-xl border p-2.5 sm:p-3 text-xs flex items-center justify-between gap-3'
                  style={{
                    background: 'var(--secondary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className='flex items-center gap-2 min-w-0'>
                    <FaFolderClosed className='h-3.5 w-3.5 text-amber-500 shrink-0' />
                    <div className='truncate'>
                      <span className='font-bold text-foreground'>
                        Category Master Data:
                      </span>{' '}
                      <span className='text-muted-foreground'>
                        {report.categorySummary.localOnlyCount > 0 &&
                          `${report.categorySummary.localOnlyCount} local-only (${report.categorySummary.localOnlyNames.slice(0, 2).join(', ')}${report.categorySummary.localOnlyNames.length > 2 ? '...' : ''})`}
                        {report.categorySummary.localOnlyCount > 0 &&
                          report.categorySummary.cloudOnlyCount > 0 &&
                          ' • '}
                        {report.categorySummary.cloudOnlyCount > 0 &&
                          `${report.categorySummary.cloudOnlyCount} cloud-only (${report.categorySummary.cloudOnlyNames.slice(0, 2).join(', ')}${report.categorySummary.cloudOnlyNames.length > 2 ? '...' : ''})`}
                      </span>
                    </div>
                  </div>
                  <span className='text-[10px] font-semibold text-muted-foreground shrink-0'>
                    Auto-reconciled on Push / Pull
                  </span>
                </div>
              )}

            {/* Quick Actions Bar */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1'>
              <div className='grid grid-cols-2 gap-2 w-full sm:w-auto'>
                {/* Push Local to Cloud */}
                <button
                  onClick={handlePush}
                  disabled={
                    isSyncing ||
                    !report ||
                    (report.localOnly.length === 0 &&
                      report.modified.length === 0 &&
                      (report.categorySummary?.localOnlyCount ?? 0) === 0)
                  }
                  className='flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  title='Upload local additions, modifications, and categories to MongoDB'
                >
                  <FaCloudArrowUp className={`h-3.5 w-3.5 shrink-0 ${isSyncing ? 'animate-bounce' : ''}`} />
                  <span className='truncate'>Push Local ➔ Cloud</span>
                  {report &&
                    report.localOnly.length +
                      report.modified.length +
                      (report.categorySummary?.localOnlyCount ?? 0) >
                      0 && (
                      <span className='rounded-full bg-white/20 px-1.5 py-0.2 text-[10px] font-bold shrink-0'>
                        {report.localOnly.length +
                          report.modified.length +
                          (report.categorySummary?.localOnlyCount ?? 0)}
                      </span>
                    )}
                </button>

                {/* Pull Cloud to Local */}
                <button
                  onClick={handlePull}
                  disabled={
                    isSyncing ||
                    !report ||
                    (report.cloudOnly.length === 0 &&
                      report.modified.length === 0 &&
                      (report.categorySummary?.cloudOnlyCount ?? 0) === 0)
                  }
                  className='flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all shadow-xs active:scale-95 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800'
                  style={{
                    background: 'var(--card)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                  }}
                  title='Download cloud cards, reviews, and categories into local repository'
                >
                  <FaCloudArrowDown className={`h-3.5 w-3.5 shrink-0 ${isSyncing ? 'animate-bounce' : ''}`} />
                  <span className='truncate'>Pull Cloud ➔ Local</span>
                  {report &&
                    report.cloudOnly.length +
                      report.modified.length +
                      (report.categorySummary?.cloudOnlyCount ?? 0) >
                      0 && (
                      <span className='rounded-full bg-blue-500/15 px-1.5 py-0.2 text-[10px] font-bold text-blue-600 dark:text-blue-400 shrink-0'>
                        {report.cloudOnly.length +
                          report.modified.length +
                          (report.categorySummary?.cloudOnlyCount ?? 0)}
                      </span>
                    )}
                </button>
              </div>

              {/* Refresh Diff */}
              <button
                onClick={fetchDiff}
                disabled={loading || isSyncing}
                className='flex items-center justify-end gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 self-end sm:self-auto'
              >
                <FaRotate className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Diff</span>
              </button>
            </div>

            {/* Filter Tabs & Diff Viewer Section */}
            {report && totalDifferences > 0 ? (
              <div className='space-y-3 pt-2'>
                {/* Tabs */}
                <div className='flex items-center gap-1.5 border-b pb-2 overflow-x-auto no-scrollbar whitespace-nowrap' style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => setActiveTab(SYNC_FILTER_TAB.ALL)}
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      activeTab === SYNC_FILTER_TAB.ALL
                        ? 'bg-slate-200 dark:bg-slate-700 text-foreground font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    All Differences ({totalDifferences})
                  </button>
                  <button
                    onClick={() => setActiveTab(SYNC_FILTER_TAB.MODIFIED)}
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      activeTab === SYNC_FILTER_TAB.MODIFIED
                        ? 'bg-slate-200 dark:bg-slate-700 text-foreground font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Modified ({report.modified.length})
                  </button>
                  <button
                    onClick={() => setActiveTab(SYNC_FILTER_TAB.LOCAL_ONLY)}
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      activeTab === SYNC_FILTER_TAB.LOCAL_ONLY
                        ? 'bg-slate-200 dark:bg-slate-700 text-foreground font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Local Only ({report.localOnly.length})
                  </button>
                  <button
                    onClick={() => setActiveTab(SYNC_FILTER_TAB.CLOUD_ONLY)}
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      activeTab === SYNC_FILTER_TAB.CLOUD_ONLY
                        ? 'bg-slate-200 dark:bg-slate-700 text-foreground font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Cloud Only ({report.cloudOnly.length})
                  </button>
                </div>

                {/* Diff Items List */}
                <div className='space-y-2.5'>
                  {visibleItems.length > 0 ? (
                    visibleItems.map((item) => (
                      <SyncDiffViewer
                        key={item.id}
                        item={item}
                        onResolved={handleCardResolved}
                      />
                    ))
                  ) : (
                    <div className='py-6 text-center text-xs text-muted-foreground'>
                      No cards found in this category.
                    </div>
                  )}
                </div>
              </div>
            ) : report && totalDifferences === 0 ? (
              <div className='rounded-2xl border p-8 text-center space-y-2' style={{ borderColor: 'var(--border)' }}>
                <div className='flex justify-center'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500'>
                    <FaCheck className='h-6 w-6' />
                  </div>
                </div>
                <h3 className='text-sm font-bold text-foreground'>100% Synchronized!</h3>
                <p className='text-xs text-muted-foreground max-w-sm mx-auto'>
                  All {report.identicalCount} flashcards are perfectly matched between Local Repository and MongoDB Cloud.
                </p>
              </div>
            ) : loading ? (
              <div className='py-12 text-center text-xs text-muted-foreground space-y-2'>
                <FaRotate className='h-5 w-5 animate-spin mx-auto text-blue-500' />
                <p>Comparing Local and Cloud flashcards...</p>
              </div>
            ) : null}
          </div>

          {/* Modal Footer */}
          <div
            className='flex items-center justify-between border-t px-4 py-3 sm:px-6 shrink-0'
            style={{
              borderColor: 'var(--border)',
              background: 'var(--secondary)',
            }}
          >
            <span className='text-[11px] text-muted-foreground'>
              {report?.timestamp ? `Last compared: ${new Date(report.timestamp).toLocaleTimeString()}` : ''}
            </span>
            <button
              onClick={onClose}
              disabled={isSyncing}
              className='rounded-xl border px-4 py-1.5 text-xs font-semibold transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default SyncModal;
