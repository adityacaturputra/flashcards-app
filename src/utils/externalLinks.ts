/**
 * src/utils/externalLinks.ts
 * Utility functions for opening external services (TTS, Google Search) safely without referrer leakage.
 */

/**
 * Opens Google Translate Text-to-Speech audio in a new tab without referrer.
 * @param text The text to speak.
 * @param lang The language code (default: 'en').
 */
export function openTTSInNewTab(text: string, lang: string = 'en'): void {
  if (typeof window === 'undefined' || !text.trim()) return;

  const ttsUrl = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    text.trim(),
  )}&tl=${encodeURIComponent(lang)}&client=tw-ob`;

  const link = document.createElement('a');
  link.href = ttsUrl;
  link.rel = 'noopener noreferrer';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
