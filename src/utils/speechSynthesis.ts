/**
 * Web Speech API Utility for Phonemics & Pronunciation Audio Playback
 * Zero-dependency, offline-ready, browser-resilient speech synthesis.
 */

import { AccentPreference, ACCENT_PREFERENCE, DEFAULT_ACCENT } from '@/types/phonemic';

export const ACCENT_STORAGE_KEY = 'flashcards_accent_preference';

let currentGlobalAccent: AccentPreference = DEFAULT_ACCENT;

// Strong reference cache to prevent Chromium/WebKit garbage-collection drop bug
const activeUtterances = new Set<SpeechSynthesisUtterance>();

// Cached voice list populated eagerly and refreshed via 'voiceschanged'
let cachedVoices: SpeechSynthesisVoice[] = [];
let isVoiceListenerAttached = false;
let pendingSpeakTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Initialize and cache available voices with automatic 'voiceschanged' listener.
 */
export function warmVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  cachedVoices = window.speechSynthesis.getVoices() || [];
  if (!isVoiceListenerAttached) {
    isVoiceListenerAttached = true;
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    });
  }
  return cachedVoices;
}

// Auto-warm on browser script evaluation
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  warmVoices();
}

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
 * Get available browser voices safely (using cached list if available)
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  if (!cachedVoices || cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
  return cachedVoices;
}

/**
 * Resolve optimal voice matching a specific BCP-47 locale tag (e.g. en-AU, en-GB, en-US, en-ZA, en-IN)
 */
export function resolveVoiceByLocale(targetLocale: string): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  const normalized = targetLocale.toLowerCase().replace('_', '-');

  // 1. Preferred high-quality/natural voices matching locale
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

  // 2. Exact language/region match
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
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\$\$?([\s\S]*?)\$\$?/g, '$1')
      .replace(/\s*(?:->|→)\s*/g, ', ')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^>\s+/gm, '')
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/~~(.*?)~~/g, '$1')
      .replace(/^[\s*+-]+(?=\S)/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Play synthesized speech audio with garbage-collection protection,
 * async cancel flush delay, queue unpause, and voice matching.
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

  // Clear any existing pending speak timer from rapid clicks
  if (pendingSpeakTimer) {
    clearTimeout(pendingSpeakTimer);
    pendingSpeakTimer = null;
  }

  const effectiveAccent = accent ?? getGlobalAccent();
  const effectiveLang = lang || getLocaleFromAccent(effectiveAccent);

  // If already speaking or pending, cancel prior audio
  const wasActive = window.speechSynthesis.speaking || window.speechSynthesis.pending;
  if (wasActive) {
    window.speechSynthesis.cancel();
  }

  // Unpause if the speech synthesis queue was stalled by the browser
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  const executeSpeak = () => {
    // Re-verify after micro-delay
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

    // Retain strong reference in Set to prevent V8/WebKit GC destruction
    activeUtterances.add(utterance);

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      activeUtterances.delete(utterance);
      onEnd?.();
    };

    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      activeUtterances.delete(utterance);
      // 'interrupted' and 'canceled' are expected when a new utterance supersedes an active one
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        onError?.(event);
      } else {
        onEnd?.();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // If we had to cancel a running utterance, give the browser's IPC dispatcher
  // a short 35ms tick to flush the cancellation before enqueueing the new utterance.
  if (wasActive) {
    pendingSpeakTimer = setTimeout(executeSpeak, 35);
  } else {
    executeSpeak();
  }
}

/**
 * Stop any ongoing speech playback safely
 */
export function stopSpeech(): void {
  if (pendingSpeakTimer) {
    clearTimeout(pendingSpeakTimer);
    pendingSpeakTimer = null;
  }
  activeUtterances.clear();
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
