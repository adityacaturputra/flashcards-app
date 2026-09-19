/**
 * Web Speech API Utility for Phonemics & Pronunciation Audio Playback
 * Zero-dependency, offline-ready browser speech synthesis.
 */

import { AccentPreference, ACCENT_PREFERENCE, DEFAULT_ACCENT } from '@/types/phonemic';

interface SpeechOptions {
  text: string;
  accent?: AccentPreference;
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
 * Resolve the optimal voice based on desired English accent (UK vs US)
 */
export function resolveBestVoice(accent: AccentPreference): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  const targetLang = accent === ACCENT_PREFERENCE.UK ? 'en-GB' : 'en-US';

  // 1. Try to find natural/high-quality voices matching target lang
  const naturalMatch = voices.find(
    (v) =>
      v.lang.replace('_', '-').startsWith(targetLang) &&
      (v.name.includes('Natural') ||
        v.name.includes('Online') ||
        v.name.includes('Google') ||
        v.name.includes('Daniel') ||
        v.name.includes('Samantha') ||
        v.name.includes('Arthur'))
  );
  if (naturalMatch) return naturalMatch;

  // 2. Try exact language match
  const exactMatch = voices.find((v) =>
    v.lang.replace('_', '-').startsWith(targetLang)
  );
  if (exactMatch) return exactMatch;

  // 3. Fallback to any English voice
  const englishFallback = voices.find((v) => v.lang.startsWith('en'));
  return englishFallback || null;
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
  accent = DEFAULT_ACCENT,
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

  // Cancel any ongoing utterance to ensure instant response
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.lang = accent === ACCENT_PREFERENCE.UK ? 'en-GB' : 'en-US';

  const selectedVoice = resolveBestVoice(accent);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
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
