/**
 * Neural MP3 Audio Cache & Lifecycle-Safe HTMLAudioElement Player
 * Loads /audio/commute/manifest.json once per session, serves pre-generated static
 * Neural MP3 clips first, falls back to dynamic /api/commute/tts (cached in memory),
 * and allows callers to fall back to Web Speech API when offline or unavailable.
 */
import { API_ENDPOINTS } from '@/constants/endpoints';
import {
  COMMUTE_AUDIO_BASE_PATH,
  COMMUTE_AUDIO_FIELD,
  COMMUTE_AUDIO_MANIFEST_URL,
  COMMUTE_VOICE_LANG,
  CommuteAudioField,
  CommuteAudioManifest,
} from '@/types/commute';
import { FLASHCARD_FIELD } from '@/types/flashcard';
import { ACCENT_PREFERENCE, AccentPreference } from '@/types/phonemic';
import { resolveCommuteVoiceProfile } from '@/utils/commuteVoices';
import { stripMarkdownForTTS } from '@/utils/speechSynthesis';

const MAX_DYNAMIC_BLOB_CACHE = 40;

let manifestPromise: Promise<CommuteAudioManifest | null> | null = null;
let activeAudio: HTMLAudioElement | null = null;
let activeAbortController: AbortController | null = null;
let playbackToken = 0;

// In-memory cache for dynamic /api/commute/tts Blob URLs so repeated clicks are instant
const dynamicBlobCache = new Map<string, string>();

export interface NeuralPlayCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export interface DynamicNeuralTtsParams extends NeuralPlayCallbacks {
  text: string;
  accent: AccentPreference;
  commuteField?: CommuteAudioField | null;
}

/**
 * Lazy-load /audio/commute/manifest.json once per browser session.
 */
export function loadCommuteManifest(): Promise<CommuteAudioManifest | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (!manifestPromise) {
    manifestPromise = fetch(COMMUTE_AUDIO_MANIFEST_URL)
      .then((res) => (res.ok ? (res.json() as Promise<CommuteAudioManifest>) : null))
      .catch(() => null);
  }
  return manifestPromise;
}

/**
 * Check if a static pre-generated Neural MP3 exists for (cardId, field) in manifest.json.
 */
export function hasStaticNeuralClip(
  manifest: CommuteAudioManifest | null,
  cardId: string,
  field: CommuteAudioField
): boolean {
  const entry = manifest?.cards?.[cardId];
  if (!entry) return false;
  if (Array.isArray(entry)) {
    return entry.includes(field);
  }
  return typeof entry[field] === 'string' && entry[field].length > 0;
}

/**
 * Build the static MP3 URL for a pre-generated commute clip.
 */
export function getStaticNeuralClipUrl(
  cardId: string,
  field: CommuteAudioField
): string {
  return `${COMMUTE_AUDIO_BASE_PATH}/${cardId}/${field}.mp3`;
}

/**
 * Map UI field keys (FlashcardComponent, AnkiCardDetailModal, DynamicFieldRenderer)
 * to their corresponding pre-generated CommuteAudioField, if any.
 */
export function resolveCommuteFieldFromUiField(
  uiField: string
): CommuteAudioField | null {
  const normalized = uiField.trim().toLowerCase();

  if (normalized === FLASHCARD_FIELD.QUESTION || normalized === COMMUTE_AUDIO_FIELD.WORD) {
    return COMMUTE_AUDIO_FIELD.WORD;
  }
  if (normalized === FLASHCARD_FIELD.ANSWER || normalized === COMMUTE_AUDIO_FIELD.MEANING) {
    return COMMUTE_AUDIO_FIELD.MEANING;
  }
  if (normalized === COMMUTE_AUDIO_FIELD.EXAMPLE) {
    return COMMUTE_AUDIO_FIELD.EXAMPLE;
  }
  if (normalized === COMMUTE_AUDIO_FIELD.COLLOCATIONS) {
    return COMMUTE_AUDIO_FIELD.COLLOCATIONS;
  }
  if (normalized === COMMUTE_AUDIO_FIELD.TIPS) {
    return COMMUTE_AUDIO_FIELD.TIPS;
  }

  // Anki history rows use `today-<id>` or `YYYY-MM-DD-<id>` for card question pronunciation
  if (normalized.startsWith('today-') || /^\d{4}-\d{2}-\d{2}-/.test(normalized)) {
    return COMMUTE_AUDIO_FIELD.WORD;
  }

  // DynamicFieldRenderer header buttons use `field_<fieldKey>`
  if (normalized.startsWith('field_')) {
    const key = normalized.slice('field_'.length);
    if (
      key.startsWith('arti utama') ||
      key === 'arti' ||
      key === 'penjelasan lengkap'
    ) {
      return COMMUTE_AUDIO_FIELD.MEANING;
    }
    if (key.startsWith('contoh kalimat')) {
      return COMMUTE_AUDIO_FIELD.EXAMPLE;
    }
    if (key === 'common collocations' || key === 'kolokasi emas ielts') {
      return COMMUTE_AUDIO_FIELD.COLLOCATIONS;
    }
    if (key.startsWith('tips mengingat')) {
      return COMMUTE_AUDIO_FIELD.TIPS;
    }
  }

  return null;
}

/**
 * Stop any active Neural HTMLAudioElement playback and abort in-flight TTS requests.
 */
export function stopNeuralAudio(): void {
  playbackToken += 1;
  if (activeAbortController) {
    activeAbortController.abort();
    activeAbortController = null;
  }
  if (activeAudio) {
    activeAudio.onplay = null;
    activeAudio.onended = null;
    activeAudio.onerror = null;
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
}

export function getNeuralPlaybackToken(): number {
  return playbackToken;
}

/**
 * Play an audio URL via HTMLAudioElement. Resolves true if playback started cleanly,
 * or false if aborted/failed (allowing the caller to fall back to Web Speech API).
 */
export function playAudioUrl(
  url: string,
  expectedToken: number,
  callbacks: NeuralPlayCallbacks
): Promise<boolean> {
  if (typeof window === 'undefined' || expectedToken !== playbackToken) {
    return Promise.resolve(false);
  }

  return new Promise<boolean>((resolve) => {
    const audio = new Audio(url);
    activeAudio = audio;
    let settled = false;

    const finish = (started: boolean) => {
      if (!settled) {
        settled = true;
        resolve(started);
      }
    };

    audio.onplay = () => {
      if (expectedToken !== playbackToken) {
        audio.pause();
        finish(false);
        return;
      }
      callbacks.onStart?.();
      finish(true);
    };

    audio.onended = () => {
      if (activeAudio === audio) {
        activeAudio = null;
      }
      if (expectedToken === playbackToken) {
        callbacks.onEnd?.();
      }
      finish(true);
    };

    audio.onerror = () => {
      if (activeAudio === audio) {
        activeAudio = null;
      }
      finish(false);
    };

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        if (activeAudio === audio) {
          activeAudio = null;
        }
        finish(false);
      });
    }
  });
}

function storeDynamicBlobUrl(cacheKey: string, blobUrl: string): void {
  if (dynamicBlobCache.size >= MAX_DYNAMIC_BLOB_CACHE) {
    const oldestKey = dynamicBlobCache.keys().next().value;
    if (oldestKey) {
      const oldestUrl = dynamicBlobCache.get(oldestKey);
      if (oldestUrl) URL.revokeObjectURL(oldestUrl);
      dynamicBlobCache.delete(oldestKey);
    }
  }
  dynamicBlobCache.set(cacheKey, blobUrl);
}

/**
 * Synthesize and play Neural MP3 via /api/commute/tts with in-memory Blob URL caching.
 */
export async function playDynamicNeuralTts(
  params: DynamicNeuralTtsParams,
  expectedToken: number
): Promise<boolean> {
  if (
    typeof window === 'undefined' ||
    navigator.onLine === false ||
    expectedToken !== playbackToken
  ) {
    return false;
  }

  const cleanedText = stripMarkdownForTTS(params.text).slice(0, 500);
  if (!cleanedText) return false;

  const isIndonesian =
    params.commuteField === COMMUTE_AUDIO_FIELD.MEANING ||
    params.commuteField === COMMUTE_AUDIO_FIELD.TIPS;
  const lang = isIndonesian ? COMMUTE_VOICE_LANG.ID : COMMUTE_VOICE_LANG.EN;
  const profile = resolveCommuteVoiceProfile(
    lang,
    params.accent,
    params.commuteField ?? undefined
  );

  const cacheKey = `${profile.voice}|${profile.rate}|${profile.pitch}|${cleanedText}`;
  const cachedUrl = dynamicBlobCache.get(cacheKey);
  if (cachedUrl) {
    return playAudioUrl(cachedUrl, expectedToken, params);
  }

  const controller = new AbortController();
  activeAbortController = controller;

  try {
    const response = await fetch(API_ENDPOINTS.COMMUTE_TTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voice: profile.voice,
        rate: profile.rate,
        pitch: profile.pitch,
        text: cleanedText,
      }),
      signal: controller.signal,
    });

    if (!response.ok || expectedToken !== playbackToken) {
      return false;
    }

    const blob = await response.blob();
    if (blob.size === 0 || expectedToken !== playbackToken) {
      return false;
    }

    const blobUrl = URL.createObjectURL(blob);
    storeDynamicBlobUrl(cacheKey, blobUrl);
    return playAudioUrl(blobUrl, expectedToken, params);
  } catch {
    return false;
  } finally {
    if (activeAbortController === controller) {
      activeAbortController = null;
    }
  }
}

/**
 * Resolve and play Neural MP3 audio (static manifest clip first for US accent,
 * then dynamic /api/commute/tts). Returns true if Neural playback started,
 * or false if caller should fall back to Web Speech API.
 */
export async function tryPlayNeuralSpeech({
  cardId,
  uiField,
  text,
  accent,
  onStart,
  onEnd,
  onError,
}: {
  cardId?: string;
  uiField: string;
  text: string;
  accent: AccentPreference;
} & NeuralPlayCallbacks): Promise<boolean> {
  stopNeuralAudio();
  const token = getNeuralPlaybackToken();
  const commuteField = resolveCommuteFieldFromUiField(uiField);

  // 1. Static pre-generated Neural MP3 (instant, broadcast-mastered, zero API call)
  if (cardId && commuteField && accent === ACCENT_PREFERENCE.US) {
    const manifest = await loadCommuteManifest();
    if (token !== playbackToken) return true; // Cancelled by user; do not trigger Web Speech fallback
    if (hasStaticNeuralClip(manifest, cardId, commuteField)) {
      const staticUrl = getStaticNeuralClipUrl(cardId, commuteField);
      const started = await playAudioUrl(staticUrl, token, { onStart, onEnd, onError });
      if (started || token !== playbackToken) return true;
    }
  }

  // 2. Dynamic /api/commute/tts fallback (online, cached in memory)
  const dynamicStarted = await playDynamicNeuralTts(
    { text, accent, commuteField, onStart, onEnd, onError },
    token
  );
  if (dynamicStarted || token !== playbackToken) return true;

  return false;
}
