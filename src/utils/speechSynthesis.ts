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
 * Resolve optimal voice matching a specific BCP-47 locale tag (e.g. en-AU, en-GB, en-US, en-ZA, en-IN).
 * Strictly prioritizes local OS-native offline voices (Samantha, Daniel, Karen, Tessa, Rishi)
 * over remote cloud 'Google' voices which frequently hang or play no sound on macOS Chrome.
 */
export function resolveVoiceByLocale(targetLocale: string): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  const normalized = targetLocale.toLowerCase().replace('_', '-');
  const matching = voices.filter((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(normalized)
  );

  // 1. Preferred local OS system voices (Samantha, Daniel, Karen, Tessa, Rishi)
  // Strictly excludes remote cloud 'Google' voices from this tier
  const preferredSystemVoice = matching.find(
    (v) =>
      !v.name.includes('Google') &&
      !v.name.includes('Online') &&
      (v.name.includes('Samantha') ||
        v.name.includes('Daniel') ||
        v.name.includes('Karen') ||
        v.name.includes('Tessa') ||
        v.name.includes('Rishi') ||
        v.name.includes('Enhanced') ||
        v.name.includes('Premium') ||
        v.name.includes('Natural'))
  );
  if (preferredSystemVoice) return preferredSystemVoice;

  // 2. Any local/offline system voice matching the locale (non-Google)
  const localMatch = matching.find(
    (v) => !v.name.includes('Google') && !v.name.includes('Online')
  );
  if (localMatch) return localMatch;

  // 3. Fallback to British system voice if regional accent voice is not installed
  const fallbackUk = voices.find(
    (v) =>
      !v.name.includes('Google') &&
      v.lang.toLowerCase().replace('_', '-').startsWith('en-gb')
  );
  if (fallbackUk) return fallbackUk;

  // 4. Fallback to any local English voice
  const localEnglish = voices.find(
    (v) => !v.name.includes('Google') && v.lang.toLowerCase().startsWith('en')
  );
  if (localEnglish) return localEnglish;

  // 5. Ultimate fallback: any matching voice (including Google voices if no OS voice exists)
  if (matching.length > 0) return matching[0];

  const anyEnglish = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
  return anyEnglish || voices[0] || null;
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
 * Play synthesized speech audio synchronously within user gesture stack.
 * Features garbage-collection protection, local OS voice preference,
 * queue unpause, and an automatic stall watchdog timer.
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

  // If already speaking or pending, cancel prior audio immediately
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
  }

  // Unpause if the speech synthesis queue was stalled by the browser
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

  // Safety watchdog: In case any browser speech engine ever stalls without firing onend/onerror,
  // ensure the active state is guaranteed to reset after a generous timeout so UI never freezes
  const watchdogMs = Math.max(3000, Math.ceil((cleanedText.length / 4) * 1000));
  const watchdogTimer = setTimeout(() => {
    if (activeUtterances.has(utterance)) {
      activeUtterances.delete(utterance);
      onEnd?.();
    }
  }, watchdogMs);

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    clearTimeout(watchdogTimer);
    activeUtterances.delete(utterance);
    onEnd?.();
  };

  utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
    clearTimeout(watchdogTimer);
    activeUtterances.delete(utterance);
    // 'interrupted' and 'canceled' are expected when a new utterance supersedes an active one
    if (event.error !== 'interrupted' && event.error !== 'canceled') {
      onError?.(event);
    } else {
      onEnd?.();
    }
  };

  // Synchronous execution ensures user gesture activation is never lost in Chrome
  window.speechSynthesis.speak(utterance);
}

/**
 * Stop any ongoing speech playback safely
 */
export function stopSpeech(): void {
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
