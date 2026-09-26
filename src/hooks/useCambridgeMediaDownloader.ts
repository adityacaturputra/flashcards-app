'use client';
import { useState, useEffect, useRef } from 'react';
import {
  isLocalFileAvailable,
  getCachedMediaBlob,
  setCachedMediaBlob,
} from '@/utils/cambridgeCache';

interface UseCambridgeMediaDownloaderOptions {
  localUrl: string;
  remoteUrl?: string;
  mimeType: 'application/pdf' | 'audio/mpeg';
}

export const useCambridgeMediaDownloader = ({
  localUrl,
  remoteUrl,
  mimeType,
}: UseCambridgeMediaDownloaderOptions) => {
  const [resolvedUrl, setResolvedUrl] = useState<string>(localUrl);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loadedMb, setLoadedMb] = useState('0.0');
  const [totalMb, setTotalMb] = useState('0.0');
  const [error, setError] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const resolveMedia = async () => {
      setError(null);

      // 1. Check if static file exists on local server (instant)
      const isLocal = await isLocalFileAvailable(localUrl);
      if (isLocal && isMounted) {
        setResolvedUrl(localUrl);
        setIsDownloading(false);
        return;
      }

      if (!remoteUrl) {
        if (isMounted) setResolvedUrl(localUrl);
        return;
      }

      // 2. Check if already in browser CacheStorage
      const cached = await getCachedMediaBlob(remoteUrl);
      if (cached && isMounted) {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const objUrl = URL.createObjectURL(cached);
        objectUrlRef.current = objUrl;
        setResolvedUrl(objUrl);
        setIsDownloading(false);
        return;
      }

      // 3. Fallback: Download from internet via server proxy with live progress
      try {
        setIsDownloading(true);
        setProgressPercent(0);
        setLoadedMb('0.0');

        const proxyUrl = `/api/cambridge/proxy?url=${encodeURIComponent(remoteUrl)}`;
        const res = await fetch(proxyUrl, { signal: abortController.signal });

        if (!res.ok || !res.body) {
          throw new Error(`Gagal mengunduh: status ${res.status}`);
        }

        const contentLength = Number(res.headers.get('content-length') || 0);
        const total = contentLength > 0 ? (contentLength / (1024 * 1024)).toFixed(1) : '??';
        if (isMounted) setTotalMb(total);

        const reader = res.body.getReader();
        const chunks: Uint8Array[] = [];
        let receivedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedBytes += value.length;

          if (isMounted) {
            setLoadedMb((receivedBytes / (1024 * 1024)).toFixed(1));
            if (contentLength > 0) {
              setProgressPercent(Math.min(100, Math.round((receivedBytes / contentLength) * 100)));
            }
          }
        }

        const fullBlob = new Blob(chunks, { type: mimeType });
        await setCachedMediaBlob(remoteUrl, fullBlob, mimeType);

        if (isMounted) {
          if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
          const objUrl = URL.createObjectURL(fullBlob);
          objectUrlRef.current = objUrl;
          setResolvedUrl(objUrl);
          setIsDownloading(false);
        }
      } catch (err: unknown) {
        if (!abortController.signal.aborted && isMounted) {
          console.warn('Fallback download failed:', err);
          setError(err instanceof Error ? err.message : 'Download gagal');
          setResolvedUrl(remoteUrl);
          setIsDownloading(false);
        }
      }
    };

    resolveMedia();

    return () => {
      isMounted = false;
      abortController.abort();
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [localUrl, remoteUrl, mimeType]);

  return {
    resolvedUrl,
    isDownloading,
    progressPercent,
    loadedMb,
    totalMb,
    error,
  };
};

export default useCambridgeMediaDownloader;
