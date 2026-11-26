/**
 * Bilingual Microsoft Neural Voice Mapping for Commute Audio
 * Syncs English voice selection with the app's global AccentPreference.
 */
import { ACCENT_PREFERENCE, AccentPreference } from '@/types/phonemic';
import { COMMUTE_VOICE_LANG, CommuteVoiceLang } from '@/types/commute';

export const INDONESIAN_NEURAL_VOICE = 'id-ID-ArdiNeural';

export const ENGLISH_NEURAL_VOICES: Record<AccentPreference, string> = {
  [ACCENT_PREFERENCE.US]: 'en-US-AndrewNeural',
  [ACCENT_PREFERENCE.UK]: 'en-GB-RyanNeural',
  [ACCENT_PREFERENCE.AU]: 'en-AU-WilliamNeural',
  [ACCENT_PREFERENCE.ZA]: 'en-ZA-LukeNeural',
  [ACCENT_PREFERENCE.IN]: 'en-IN-PrabhatNeural',
};

/**
 * Resolve Microsoft Neural Voice ID for a given segment language and English accent.
 */
export function resolveCommuteVoice(
  lang: CommuteVoiceLang,
  accent: AccentPreference
): string {
  if (lang === COMMUTE_VOICE_LANG.ID) {
    return INDONESIAN_NEURAL_VOICE;
  }
  return ENGLISH_NEURAL_VOICES[accent] ?? ENGLISH_NEURAL_VOICES[ACCENT_PREFERENCE.US];
}
