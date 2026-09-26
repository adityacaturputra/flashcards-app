'use client';
import React, { useState } from 'react';
import { FaFilePdf, FaArrowUpRightFromSquare, FaRotate } from 'react-icons/fa6';
import { PDF_VIEWER_MODE, PdfViewerMode } from '@/types/cambridgeTests';
import { useCambridgeMediaDownloader } from '@/hooks/useCambridgeMediaDownloader';
import CambridgeDownloadProgressBar from '@/components/atoms/CambridgeDownloadProgressBar';

interface IeltsPdfViewerProps {
  pdfUrl: string;
  remotePdfUrl?: string;
  pageHint?: number;
  bookTitle: string;
  testTitle: string;
}

export const IeltsPdfViewer: React.FC<IeltsPdfViewerProps> = ({
  pdfUrl,
  remotePdfUrl,
  pageHint,
  bookTitle,
  testTitle,
}) => {
  const [viewerMode, setViewerMode] = useState<PdfViewerMode>(
    PDF_VIEWER_MODE.NATIVE
  );

  const { resolvedUrl, isDownloading, progressPercent, loadedMb, totalMb } =
    useCambridgeMediaDownloader({
      localUrl: pdfUrl,
      remoteUrl: remotePdfUrl,
      mimeType: 'application/pdf',
    });

  const nativeSrc = pageHint ? `${resolvedUrl}#page=${pageHint}` : resolvedUrl;
  const gdocsTarget = remotePdfUrl || resolvedUrl;
  const gdocsSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(
    gdocsTarget
  )}&embedded=true`;

  const currentIframeSrc =
    viewerMode === PDF_VIEWER_MODE.NATIVE ? nativeSrc : gdocsSrc;

  return (
    <div
      className='relative flex flex-col w-full rounded-2xl border border-border shadow-sm overflow-hidden bg-card'
      style={{
        height: 'calc(100vh - 210px)',
        minHeight: '520px',
      }}
    >
      {/* Top Bar Controls */}
      <div className='flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-border bg-secondary'>
        <div className='flex items-center gap-2 min-w-0'>
          <FaFilePdf className='h-4 w-4 text-red-500 shrink-0' />
          <div className='truncate text-xs font-semibold text-foreground'>
            <span>{bookTitle}</span>
            <span className='text-muted-foreground'> • {testTitle}</span>
            {pageHint && (
              <span className='ml-2 hidden sm:inline text-[11px] text-muted-foreground font-normal'>
                (Halaman ~{pageHint})
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center gap-2 shrink-0'>
          <button
            type='button'
            onClick={() =>
              setViewerMode((prev) =>
                prev === PDF_VIEWER_MODE.NATIVE
                  ? PDF_VIEWER_MODE.GOOGLE_DOCS
                  : PDF_VIEWER_MODE.NATIVE
              )
            }
            className='flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5'
            title='Ganti mode tampilan PDF'
          >
            <FaRotate className='h-3 w-3' />
            <span className='hidden sm:inline'>
              {viewerMode === PDF_VIEWER_MODE.NATIVE
                ? 'Pakai Google Docs'
                : 'Pakai Native PDF'}
            </span>
          </button>

          <a
            href={resolvedUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1.5 rounded-lg bg-card px-2.5 py-1 text-xs font-bold text-foreground border border-border shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all'
          >
            <FaArrowUpRightFromSquare className='h-3 w-3 text-purple-600 dark:text-purple-400' />
            <span>Tab Baru</span>
          </a>
        </div>
      </div>

      {/* PDF Canvas or Download Progress */}
      <div className='relative flex-1 w-full bg-slate-900/5 dark:bg-black/20 flex items-center justify-center p-4'>
        {isDownloading ? (
          <CambridgeDownloadProgressBar
            title={`${bookTitle} PDF`}
            loadedMb={loadedMb}
            totalMb={totalMb}
            progressPercent={progressPercent}
          />
        ) : (
          <iframe
            key={`${resolvedUrl}-${viewerMode}`}
            src={currentIframeSrc}
            title={`${bookTitle} ${testTitle} PDF`}
            className='w-full h-full border-none'
            allow='fullscreen'
            loading='lazy'
          />
        )}
      </div>
    </div>
  );
};

export default IeltsPdfViewer;
