/**
 * Tri-Voice Duet Microsoft Neural Voice & Relaxed Tempo Mapping (PLAN-05 + AUDIOBOOK_RULES.md)
 * - Host ID (Arti & Tips): id-ID-ArdiNeural (-12%, +0Hz)
 * - Host EN (Vocab): en-US-BrianNeural / accent-matched (-14%, +0Hz)
 * - Host EN (Collocations): en-US-BrianNeural / accent-matched (-16%, +0Hz, 950ms inter-phrase pause)
 * - Co-Host EN (Contoh Kalimat): en-US-AvaMultilingualNeural (-14%, +0Hz)
 */
import { ACCENT_PREFERENCE, AccentPreference } from '@/types/phonemic';
import {
  COMMUTE_AUDIO_FIELD,
  COMMUTE_VOICE_LANG,
  CommuteAudioField,
  CommuteVoiceLang,
} from '@/types/commute';

export const COLLOCATION_PAUSE_MS = 950;
export const CLAUSE_PAUSE_MS = 550;

export interface CommuteVoiceProfile {
  voice: string;
  rate: string;
  pitch: string;
}

export const INDONESIAN_HOST_VOICE = 'id-ID-ArdiNeural';
export const ENGLISH_COHOST_VOICE = 'en-US-AvaMultilingualNeural';

export const ENGLISH_NEURAL_VOICES: Record<AccentPreference, string> = {
  [ACCENT_PREFERENCE.US]: 'en-US-BrianNeural',
  [ACCENT_PREFERENCE.UK]: 'en-GB-RyanNeural',
  [ACCENT_PREFERENCE.AU]: 'en-AU-WilliamNeural',
  [ACCENT_PREFERENCE.ZA]: 'en-ZA-LukeNeural',
  [ACCENT_PREFERENCE.IN]: 'en-IN-PrabhatNeural',
};

export function resolveCommuteVoiceProfile(
  lang: CommuteVoiceLang,
  accent: AccentPreference,
  field?: CommuteAudioField
): CommuteVoiceProfile {
  if (lang === COMMUTE_VOICE_LANG.ID) {
    return {
      voice: INDONESIAN_HOST_VOICE,
      rate: '-12%',
      pitch: '+0Hz',
    };
  }

  // Co-Host Ava (-14%) delivers authentic US example sentences per AUDIOBOOK_RULES.md
  if (field === COMMUTE_AUDIO_FIELD.EXAMPLE && accent === ACCENT_PREFERENCE.US) {
    return {
      voice: ENGLISH_COHOST_VOICE,
      rate: '-14%',
      pitch: '+0Hz',
    };
  }

  // Collocations use a slightly slower tempo (-16%) with inter-phrase pauses for natural recall
  if (field === COMMUTE_AUDIO_FIELD.COLLOCATIONS) {
    return {
      voice: ENGLISH_NEURAL_VOICES[accent] ?? ENGLISH_NEURAL_VOICES[ACCENT_PREFERENCE.US],
      rate: '-16%',
      pitch: '+0Hz',
    };
  }

  return {
    voice: ENGLISH_NEURAL_VOICES[accent] ?? ENGLISH_NEURAL_VOICES[ACCENT_PREFERENCE.US],
    rate: '-14%',
    pitch: '+0Hz',
  };
}

export function resolveCommuteVoice(
  lang: CommuteVoiceLang,
  accent: AccentPreference,
  field?: CommuteAudioField
): string {
  return resolveCommuteVoiceProfile(lang, accent, field).voice;
}
