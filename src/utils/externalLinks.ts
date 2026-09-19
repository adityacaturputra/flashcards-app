/**
 * src/utils/externalLinks.ts
 * Utility functions for opening external services (Google Search) safely without referrer leakage.
 */

/**
 * Opens Google Search in a new tab without referrer.
 * @param query The search query string.
 * @param prefix Optional prefix (e.g., 'English grammar').
 */
export function openGoogleSearchInNewTab(
  query: string,
  prefix: string = '',
): void {
  if (typeof window === 'undefined' || !query.trim()) return;

  const fullQuery = prefix.trim() ? `${prefix.trim()} ${query.trim()}` : query.trim();
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`;

  const link = document.createElement('a');
  link.href = searchUrl;
  link.rel = 'noopener noreferrer';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
