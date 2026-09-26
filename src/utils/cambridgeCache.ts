/**
 * Cambridge Media Cache & Local File Availability Utilities
 * Uses browser CacheStorage for persistent offline caching of PDFs and MP3s.
 */

const CACHE_NAME = 'cambridge-media-cache-v1';

/**
 * Checks if a static file exists on the local server without downloading the full body
 */
export const isLocalFileAvailable = async (url: string): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    return res.ok;
  } catch {
    return false;
  }
};

/**
 * Retrieves a cached Blob from browser CacheStorage
 */
export const getCachedMediaBlob = async (
  key: string
): Promise<Blob | null> => {
  if (typeof window === 'undefined' || !('caches' in window)) return null;
  try {
    const cache = await window.caches.open(CACHE_NAME);
    const response = await cache.match(key);
    if (!response) return null;
    return await response.blob();
  } catch {
    return null;
  }
};

/**
 * Saves a downloaded Blob into browser CacheStorage
 */
export const setCachedMediaBlob = async (
  key: string,
  blob: Blob,
  mimeType: string
): Promise<void> => {
  if (typeof window === 'undefined' || !('caches' in window)) return;
  try {
    const cache = await window.caches.open(CACHE_NAME);
    const response = new Response(blob, {
      headers: {
        'Content-Type': mimeType,
        'Content-Length': String(blob.size),
      },
    });
    await cache.put(key, response);
  } catch (err) {
    console.warn('Failed to cache Cambridge media in CacheStorage:', err);
  }
};
