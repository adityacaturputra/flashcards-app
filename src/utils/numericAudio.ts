/**
 * Audio helpers tailored for Numeric Precision (Numbers, -teen vs -ty, & Phone Dictation)
 */
import { AccentPreference } from '@/types/phonemic';
import { playSpeech, stopSpeech } from '@/utils/speechSynthesis';

export interface PlayNumberOptions {
  word: string;
  accent: AccentPreference;
  slow?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

/**
 * Articulate an individual number word (e.g. "Thirteen", "Thirty") clearly.
 */
export function playNumberWord({
  word,
  accent,
  slow = false,
  onStart,
  onEnd,
  onError,
}: PlayNumberOptions): void {
  const rate = slow ? 0.65 : 0.82;
  // A terminal period helps TTS engines pronounce numbers with clean finality
  const prompt = `${word.trim()}.`;

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

export interface PlayContrastOptions {
  word1: string;
  word2: string;
  accent: AccentPreference;
  onEnd?: () => void;
}

/**
 * Plays two contrasting numbers sequentially with a micro-pause
 * so the learner directly hears the stress difference (e.g. "Thirteen" vs "Thirty").
 */
export function playContrastPair({
  word1,
  word2,
  accent,
  onEnd,
}: PlayContrastOptions): void {
  playSpeech({
    text: `${word1}. ... ${word2}.`,
    accent,
    rate: 0.78,
    pitch: 1.0,
    onEnd,
  });
}

export interface PlayDictationOptions {
  script: string;
  accent: AccentPreference;
  slow?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

/**
 * Plays a spoken dictation script (e.g. "oh eight hundred, double four five")
 * with a realistic, clear conversational cadence.
 */
export function playNumericDictation({
  script,
  accent,
  slow = false,
  onStart,
  onEnd,
  onError,
}: PlayDictationOptions): void {
  const rate = slow ? 0.68 : 0.80;

  playSpeech({
    text: script,
    accent,
    rate,
    pitch: 1.0,
    onStart,
    onEnd,
    onError,
  });
}

export { stopSpeech };
