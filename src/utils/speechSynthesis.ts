/**
 * Web Speech API Utility for Phonemics & Pronunciation Audio Playback
 * Zero-dependency, offline-ready browser speech synthesis.
 */

import { AccentPreference, ACCENT_PREFERENCE, DEFAULT_ACCENT } from '@/types/phonemic';

export const ACCENT_STORAGE_KEY = 'flashcards_accent_preference';

let currentGlobalAccent: AccentPreference = DEFAULT_ACCENT;

/**
 * Get current global accent preference (cached in memory, synced from localStorage)
 */
export function getGlobalAccent(): AccentPreference {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
      if (
        stored &&
        Object.values(ACCENT_PREFERENCE).includes(stored as AccentPreference)
      ) {
        currentGlobalAccent = stored as AccentPreference;
      }
    } catch {
      // ignore localStorage errors (e.g. disabled storage)
    }
  }
  return currentGlobalAccent;
}

/**
 * Set current global accent preference (persists to localStorage and notifies listeners)
 */
export function setGlobalAccent(accent: AccentPreference): void {
  currentGlobalAccent = accent;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, accent);
      window.dispatchEvent(new CustomEvent('accentchange', { detail: { accent } }));
    } catch {
      // ignore
    }
  }
}

export interface SpeechOptions {
  text: string;
  accent?: AccentPreference;
  lang?: string; // BCP-47 tag, e.g. 'en-GB', 'en-AU', 'en-US', 'en-ZA', 'en-IN'
  rate?: number; // 1.0 = normal, 0.6 = slow motion
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

/**
 * Get available browser voices safely
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  return window.speechSynthesis.getVoices() || [];
}

/**
 * Resolve optimal voice matching a specific BCP-47 locale tag (e.g. en-AU, en-GB, en-US, en-ZA, en-IN)
 */
export function resolveVoiceByLocale(targetLocale: string): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  const normalized = targetLocale.toLowerCase().replace('_', '-');

  // 1. Try to find natural/high-quality voices matching target locale
  const naturalMatch = voices.find(
    (v) =>
      v.lang.toLowerCase().replace('_', '-').startsWith(normalized) &&
      (v.name.includes('Natural') ||
        v.name.includes('Online') ||
        v.name.includes('Google') ||
        v.name.includes('Daniel') ||
        v.name.includes('Samantha') ||
        v.name.includes('Karen') ||
        v.name.includes('Tessa') ||
        v.name.includes('Rishi') ||
        v.name.includes('Enhanced') ||
        v.name.includes('Premium'))
  );
  if (naturalMatch) return naturalMatch;

  // 2. Try exact language/region match
  const exactMatch = voices.find((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(normalized)
  );
  if (exactMatch) return exactMatch;

  // 3. Fallback to British if regional accent voice is not installed
  const fallbackUk = voices.find((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith('en-gb')
  );
  if (fallbackUk) return fallbackUk;

  // 4. Fallback to any English voice
  const englishFallback = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
  return englishFallback || null;
}

/**
 * Map an AccentPreference to its standard BCP-47 locale tag
 */
export function getLocaleFromAccent(accent: AccentPreference): string {
  switch (accent) {
    case ACCENT_PREFERENCE.UK:
      return 'en-GB';
    case ACCENT_PREFERENCE.AU:
      return 'en-AU';
    case ACCENT_PREFERENCE.ZA:
      return 'en-ZA';
    case ACCENT_PREFERENCE.IN:
      return 'en-IN';
    case ACCENT_PREFERENCE.US:
    default:
      return 'en-US';
  }
}

/**
 * Resolve the optimal voice based on desired English accent (US, UK, AU, ZA, IN)
 */
export function resolveBestVoice(accent: AccentPreference): SpeechSynthesisVoice | null {
  const targetLang = getLocaleFromAccent(accent);
  return resolveVoiceByLocale(targetLang);
}

/**
 * Clean markdown and formatting artifacts so speech synthesis sounds natural
 */
export function stripMarkdownForTTS(text: string): string {
  if (!text) return '';
  return (
    text
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`([^`]+)`/g, '$1')
      // Remove KaTeX math formulas: $$formula$$ or $formula$
      .replace(/\$\$?([\s\S]*?)\$\$?/g, '$1')
      // Replace arrow symbols (-> or →) with comma for natural speech pause
      .replace(/\s*(?:->|→)\s*/g, ', ')
      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // Replace links [text](url) with just text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove headings (#, ##, etc.)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove blockquotes (> )
      .replace(/^>\s+/gm, '')
      // Remove bold/italic markers
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/~~(.*?)~~/g, '$1')
      // Remove list bullets
      .replace(/^[\s*+-]+(?=\S)/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Normalize multiple spaces and newlines to a single space
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Play synthesized speech audio for a phoneme, word, or sentence
 */
export function playSpeech({
  text,
  accent,
  lang,
  rate = 0.88,
  pitch = 1.0,
  onStart,
  onEnd,
  onError,
}: SpeechOptions): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    onError?.(new Error('Speech Synthesis not supported'));
    return;
  }

  const cleanedText = stripMarkdownForTTS(text);
  if (!cleanedText) {
    onEnd?.();
    return;
  }

  const effectiveAccent = accent ?? getGlobalAccent();
  const effectiveLang = lang || getLocaleFromAccent(effectiveAccent);

  // Cancel any ongoing utterance to ensure instant response
  window.speechSynthesis.cancel();

  // If paused (e.g. Chrome speech queue stall), resume
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.lang = effectiveLang;

  const selectedVoice = resolveVoiceByLocale(effectiveLang);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
}

/**
 * Stop any ongoing speech playback
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export interface SpeechButtonAriaProps {
  title: string;
  'aria-label': string;
}

/**
 * Generates standardized accessible title and aria-label attributes for speech playback buttons.
 * @param isPlaying Whether speech is currently playing for this target
 * @param descriptor Optional target name (e.g., 'question', 'answer', 'word')
 */
export function getSpeechButtonAriaProps(
  isPlaying: boolean,
  descriptor: string = 'text'
): SpeechButtonAriaProps {
  return {
    title: isPlaying ? 'Stop listening' : `Listen to ${descriptor}`,
    'aria-label': isPlaying ? `Stop listening to ${descriptor}` : `Listen to ${descriptor}`,
  };
}
