/**
 * Audio helpers tailored for English Alphabet Letter Articulation & Sequence Playback
 */
import { AccentPreference } from '@/types/phonemic';
import { AlphabetLetter } from '@/types/alphabet';
import { playSpeech, stopSpeech, stripMarkdownForTTS } from '@/utils/speechSynthesis';

export interface PlayLetterOptions {
  letter: AlphabetLetter;
  accent: AccentPreference;
  slow?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

/**
 * Articulate an individual alphabet letter clearly using Web Speech API.
 * Using `${char}.` prompts speech synthesis engines to articulate the letter name
 * (e.g. "ay", "bee", "see", "dee") rather than words or indefinite articles.
 */
export function playAlphabetLetter({
  letter,
  accent,
  slow = false,
  onStart,
  onEnd,
  onError,
}: PlayLetterOptions): void {
  const rate = slow ? 0.62 : 0.78;
  const prompt = `${letter.char.toUpperCase()}.`;

  playSpeech({
    text: prompt,
    accent,
    rate,
    pitch: 1.0,
    onStart,
    onEnd,
    onError,
  });
}

/**
 * Articulate a letter by raw character
 */
export function playRawLetter(
  char: string,
  accent: AccentPreference,
  slow: boolean = false,
  onEnd?: () => void
): void {
  const rate = slow ? 0.62 : 0.78;
  const prompt = `${char.toUpperCase().trim()}.`;

  playSpeech({
    text: prompt,
    accent,
    rate,
    pitch: 1.0,
    onEnd,
  });
}

/**
 * Formats text into spaced-out, period-separated uppercase letters
 * so Web Speech API articulates each letter individually (e.g. "M. A. R. C. H.").
 * Distinct words are separated with a clear pause separator.
 */
export function formatTextForSpelling(text: string): string {
  const cleaned = stripMarkdownForTTS(text);
  if (!cleaned) return '';

  const words = cleaned.split(/\s+/).filter(Boolean);
  const spelledWords = words
    .map((word) => {
      const chars = word.split('').filter((c) => /[a-zA-Z0-9]/.test(c));
      return chars.map((c) => `${c.toUpperCase()}.`).join(' ');
    })
    .filter(Boolean);

  return spelledWords.join(', ... ');
}

export interface PlaySpellingOptions {
  text: string;
  accent?: AccentPreference;
  lang?: string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

/**
 * Play letter-by-letter synthesized speech for a word or phrase.
 * Uses a slower, articulate rate (default: 0.72) for maximum auditory recognition.
 */
export function playSpellingSpeech({
  text,
  accent,
  lang,
  rate = 0.72,
  pitch = 1.0,
  onStart,
  onEnd,
  onError,
}: PlaySpellingOptions): void {
  const spelledText = formatTextForSpelling(text);
  if (!spelledText) {
    onEnd?.();
    return;
  }

  playSpeech({
    text: spelledText,
    accent,
    lang,
    rate,
    pitch,
    onStart,
    onEnd,
    onError,
  });
}

export { stopSpeech };
