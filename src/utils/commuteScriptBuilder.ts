/**
 * Pure Script Builder for Evidence-Based Commute Audio Sessions
 * Supports Pimsleur Micro-Batch (Spiral Recall), Quick Recall Quiz, and Relaxed Podcast.
 */
import { Flashcard, Progression } from '@/types/flashcard';
import {
  COMMUTE_AUDIO_FIELD,
  COMMUTE_BATCH_SIZE,
  COMMUTE_CARD_FILTER,
  COMMUTE_MODE,
  COMMUTE_SEGMENT_PHASE,
  COMMUTE_VOICE_LANG,
  CommuteAudioField,
  CommuteAudioSegment,
  CommuteCardFilter,
  CommuteConfig,
  CommuteSegmentPhase,
} from '@/types/commute';
import { stripMarkdownForTTS } from '@/utils/speechSynthesis';
import { COLLOCATION_PAUSE_MS } from '@/utils/commuteVoices';

export interface CardNarrationFields {
  cardId: string;
  word: string;
  meaningId: string;
  exampleEn: string;
  collocationsEn: string;
  tipsId: string;
}

/**
 * Split raw collocations text into clean individual phrases with terminal punctuation
 * so Neural TTS uses a calm falling intonation per phrase instead of rushed list prosody.
 */
export function splitCollocationPhrases(rawText: string): string[] {
  if (!rawText) return [];
  return rawText
    .split(/[\n•;,]+/)
    .map((chunk) =>
      chunk
        .replace(/^[\s*•\-–—]+/, '')
        .replace(/^\d+[.)]\s+/, '')
        .trim()
    )
    .map((chunk) => stripMarkdownForTTS(chunk).trim())
    .filter(Boolean)
    .map((phrase) => (/[.!?]$/.test(phrase) ? phrase : `${phrase}.`));
}

const VERB_TRIPLE_PATTERN =
  /V1:\s*([^|]+?)\s*\|\s*V2:\s*([^|]+?)(?:\s*\|\s*V3:\s*([^|\n]+))?/i;

/**
 * Pronunciation-safe Indonesian sanitizer per AUDIOBOOK_RULES.md:
 * avoids glottal-stop words clipped by Indonesian TTS, pipe noise, and raw SSML tags.
 */
export function sanitizeIndonesianForTTS(text: string): string {
  return text
    .replace(/<break[^>]*>/gi, ' ')
    .replace(/\s*\|\s*/g, ', ')
    .replace(/\bnggak\b/gi, 'tidak')
    .replace(/\bgak\b/gi, 'tidak')
    .replace(/\bmendadak\b/gi, 'tiba-tiba')
    .replace(/\s+/g, ' ')
    .trim();
}

function resolveTipsField(df: Record<string, string>): string {
  if (df['Tips Mengingat']) return df['Tips Mengingat'];
  const key = Object.keys(df).find((k) =>
    k.toLowerCase().startsWith('tips mengingat')
  );
  return key ? df[key] : '';
}

function resolveExampleField(df: Record<string, string>): string {
  if (df['Contoh Kalimat']) return df['Contoh Kalimat'];
  if (df['Contoh Kalimat Singular']) return df['Contoh Kalimat Singular'];
  const transformKey = Object.keys(df).find((k) =>
    k.toLowerCase().startsWith('transformasi kalimat')
  );
  if (transformKey) {
    const quoted = df[transformKey].match(/[""]([^""]{12,220})[""]/);
    if (quoted?.[1]) return quoted[1];
  }
  return '';
}

/**
 * Extract clean, TTS-friendly bilingual fields from a Flashcard.
 * Automatically swaps reversed V1/V2/V3 verb cards (ID question -> EN V1/V2/V3 answer)
 * and resolves alternate dynamicFields key names.
 */
export function extractFlashcardNarrationFields(
  card: Flashcard
): CardNarrationFields {
  const df = card.dynamicFields ?? {};
  const rawAnswer = String(card.answer || '');
  const verbMatch = rawAnswer.match(VERB_TRIPLE_PATTERN);

  // Reversed-language V1/V2/V3 verb cards: question is Indonesian, answer has EN V1 | V2 | V3
  if (verbMatch) {
    const forms = [verbMatch[1], verbMatch[2], verbMatch[3]]
      .filter(Boolean)
      .map((f) => stripMarkdownForTTS(f).trim())
      .filter(Boolean);
    return {
      cardId: card._id ?? card.question,
      word: forms.join('. ') + '.',
      meaningId: sanitizeIndonesianForTTS(stripMarkdownForTTS(card.question)),
      exampleEn: stripMarkdownForTTS(resolveExampleField(df)),
      collocationsEn: splitCollocationPhrases(
        df['Common Collocations'] || df['Kolokasi Emas IELTS'] || ''
      ).join('; '),
      tipsId: sanitizeIndonesianForTTS(stripMarkdownForTTS(resolveTipsField(df))),
    };
  }

  const firstContentLine =
    rawAnswer
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.length > 0 && !line.startsWith('#')) ?? rawAnswer;
  const rawMeaning =
    df['Arti Utama / Definisi'] ||
    df['Arti Utama'] ||
    df['Arti'] ||
    df['Penjelasan Lengkap'] ||
    firstContentLine;

  return {
    cardId: card._id ?? card.question,
    word: stripMarkdownForTTS(card.question),
    meaningId: sanitizeIndonesianForTTS(stripMarkdownForTTS(rawMeaning)),
    exampleEn: stripMarkdownForTTS(resolveExampleField(df)),
    collocationsEn: splitCollocationPhrases(
      df['Common Collocations'] || df['Kolokasi Emas IELTS'] || ''
    ).join('; '),
    tipsId: sanitizeIndonesianForTTS(stripMarkdownForTTS(resolveTipsField(df))),
  };
}

/**
 * Filter flashcards based on CommuteCardFilter & optional categoryId.
 */
export function filterCommuteCards(
  flashcards: Flashcard[],
  filter: CommuteCardFilter,
  categoryId: string
): Flashcard[] {
  const now = Date.now();
  const byCategory =
    categoryId === 'all'
      ? flashcards
      : flashcards.filter((c) => c.categories?.includes(categoryId));

  switch (filter) {
    case COMMUTE_CARD_FILTER.RICH_ONLY:
      return byCategory.filter((c) => {
        const fields = extractFlashcardNarrationFields(c);
        return Boolean(
          fields.exampleEn || fields.collocationsEn || fields.tipsId
        );
      });
    case COMMUTE_CARD_FILTER.DUE_TODAY:
      return byCategory.filter((c) => {
        if (!c.nextReviewDate) return true;
        return new Date(c.nextReviewDate).getTime() <= now;
      });
    case COMMUTE_CARD_FILTER.NEW_ONLY:
      return byCategory.filter((c) => c.progression === Progression.New);
    case COMMUTE_CARD_FILTER.HARD_AND_RETRY:
      return byCategory.filter(
        (c) =>
          c.progression === Progression.Hard ||
          c.progression === Progression.Retry
      );
    case COMMUTE_CARD_FILTER.ALL:
    default:
      return byCategory;
  }
}

function deterministicShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createIntroSegments(
  fields: CardNarrationFields,
  config: CommuteConfig,
  phase: CommuteSegmentPhase,
  seqStart: number
): CommuteAudioSegment[] {
  const segments: CommuteAudioSegment[] = [];
  let seq = seqStart;

  const push = (
    field: CommuteAudioField,
    lang: CommuteAudioSegment['lang'],
    text: string,
    pauseAfterMs: number,
    isChapterStart = false
  ) => {
    if (!text.trim()) return;
    segments.push({
      id: `seg-${seq++}`,
      cardId: fields.cardId,
      cardQuestion: fields.word,
      field,
      phase,
      lang,
      text: text.trim(),
      pauseAfterMs,
      isChapterStart,
    });
  };

  // Word twice for phonological encoding + 0.9s inter-speaker silence (AUDIOBOOK_RULES.md)
  push(COMMUTE_AUDIO_FIELD.WORD, COMMUTE_VOICE_LANG.EN, fields.word, 650, true);
  push(COMMUTE_AUDIO_FIELD.WORD, COMMUTE_VOICE_LANG.EN, fields.word, 900);

  // Indonesian meaning (Host ID) -> 0.9s inter-speaker silence
  if (fields.meaningId) {
    push(COMMUTE_AUDIO_FIELD.MEANING, COMMUTE_VOICE_LANG.ID, fields.meaningId, 900);
  }

  // English example sentence (Co-Host EN) -> 1.2s shadowing pause
  if (fields.exampleEn) {
    push(COMMUTE_AUDIO_FIELD.EXAMPLE, COMMUTE_VOICE_LANG.EN, fields.exampleEn, 1200);
  }

  if (config.includeCollocations && fields.collocationsEn) {
    push(
      COMMUTE_AUDIO_FIELD.COLLOCATIONS,
      COMMUTE_VOICE_LANG.EN,
      fields.collocationsEn,
      900
    );
  }

  if (config.includeTips && fields.tipsId) {
    push(COMMUTE_AUDIO_FIELD.TIPS, COMMUTE_VOICE_LANG.ID, fields.tipsId, 1100);
  }

  return segments;
}

function createRecallSegments(
  fields: CardNarrationFields,
  pauseMs: number,
  includeExample: boolean,
  phase: CommuteSegmentPhase,
  seqStart: number
): CommuteAudioSegment[] {
  const segments: CommuteAudioSegment[] = [];
  let seq = seqStart;

  // Prompt (EN) -> Silence for Active Recall -> Verification (ID)
  segments.push({
    id: `seg-${seq++}`,
    cardId: fields.cardId,
    cardQuestion: fields.word,
    field: COMMUTE_AUDIO_FIELD.WORD,
    phase,
    lang: COMMUTE_VOICE_LANG.EN,
    text: fields.word,
    pauseAfterMs: pauseMs,
    isChapterStart: true,
  });

  if (fields.meaningId) {
    segments.push({
      id: `seg-${seq++}`,
      cardId: fields.cardId,
      cardQuestion: fields.word,
      field: COMMUTE_AUDIO_FIELD.MEANING,
      phase,
      lang: COMMUTE_VOICE_LANG.ID,
      text: fields.meaningId,
      pauseAfterMs: includeExample && fields.exampleEn ? 500 : 1000,
    });
  }

  if (includeExample && fields.exampleEn) {
    segments.push({
      id: `seg-${seq++}`,
      cardId: fields.cardId,
      cardQuestion: fields.word,
      field: COMMUTE_AUDIO_FIELD.EXAMPLE,
      phase,
      lang: COMMUTE_VOICE_LANG.EN,
      text: fields.exampleEn,
      pauseAfterMs: 1100,
    });
  }

  return segments;
}

/**
 * Build the complete ordered audio script for a commute session.
 */
export function buildCommuteScript(
  cards: Flashcard[],
  config: CommuteConfig
): CommuteAudioSegment[] {
  if (cards.length === 0) return [];
  const extracted = cards.map(extractFlashcardNarrationFields);
  const segments: CommuteAudioSegment[] = [];
  const recallPauseMs = Math.round(config.recallPauseSec * 1000);

  if (config.mode === COMMUTE_MODE.RELAXED_PODCAST) {
    extracted.forEach((fields) => {
      segments.push(
        ...createIntroSegments(
          fields,
          config,
          COMMUTE_SEGMENT_PHASE.PODCAST,
          segments.length
        )
      );
    });
    return segments;
  }

  if (config.mode === COMMUTE_MODE.QUICK_RECALL) {
    const quizPauseMs = Math.max(4000, recallPauseMs);
    extracted.forEach((fields) => {
      segments.push(
        ...createRecallSegments(
          fields,
          quizPauseMs,
          true,
          COMMUTE_SEGMENT_PHASE.ACTIVE_RECALL,
          segments.length
        )
      );
    });
    return segments;
  }

  // Default: PIMSLEUR_MICRO_BATCH (5-card batches + Active Recall + Spiral Review + Final Sweep)
  const batches: CardNarrationFields[][] = [];
  for (let i = 0; i < extracted.length; i += COMMUTE_BATCH_SIZE) {
    batches.push(extracted.slice(i, i + COMMUTE_BATCH_SIZE));
  }

  batches.forEach((batch, batchIdx) => {
    // Round 1: Introduce & Context
    batch.forEach((fields) => {
      segments.push(
        ...createIntroSegments(
          fields,
          config,
          COMMUTE_SEGMENT_PHASE.INTRO,
          segments.length
        )
      );
    });

    // Round 2: Shuffled Active Recall for current batch
    const shuffledBatch = deterministicShuffle(batch, batchIdx + 17);
    shuffledBatch.forEach((fields) => {
      segments.push(
        ...createRecallSegments(
          fields,
          recallPauseMs,
          false,
          COMMUTE_SEGMENT_PHASE.ACTIVE_RECALL,
          segments.length
        )
      );
    });

    // Round 3: Interleaved Spiral Review from previous batches
    if (batchIdx >= 1) {
      const prevBatch = batches[batchIdx - 1];
      const spiralPool: CardNarrationFields[] = [
        ...deterministicShuffle(prevBatch, batchIdx + 53).slice(0, 2),
      ];
      if (batchIdx >= 2) {
        const olderBatch = batches[batchIdx - 2];
        spiralPool.push(olderBatch[batchIdx % olderBatch.length]);
      }

      spiralPool.forEach((fields) => {
        segments.push(
          ...createRecallSegments(
            fields,
            recallPauseMs,
            false,
            COMMUTE_SEGMENT_PHASE.SPIRAL_REVIEW,
            segments.length
          )
        );
      });
    }
  });

  // Final Consolidation Sweep across the entire session (up to 5 cards)
  if (extracted.length > COMMUTE_BATCH_SIZE) {
    const finalSweepCards = deterministicShuffle(extracted, 99).slice(0, 5);
    finalSweepCards.forEach((fields) => {
      segments.push(
        ...createRecallSegments(
          fields,
          recallPauseMs,
          false,
          COMMUTE_SEGMENT_PHASE.FINAL_SWEEP,
          segments.length
        )
      );
    });
  }

  return segments;
}

/**
 * Rough duration estimate (seconds) before synthesis, based on ~13 chars/sec speech rate
 * (and inter-phrase 950ms pauses for collocations).
 */
export function estimateEpisodeDurationSec(
  segments: CommuteAudioSegment[]
): number {
  return segments.reduce((total, seg) => {
    if (seg.field === COMMUTE_AUDIO_FIELD.COLLOCATIONS) {
      const phrases = splitCollocationPhrases(seg.text);
      const speechSec = Math.max(0.8, seg.text.length / 11.5);
      const interPhrasePauseSec =
        Math.max(0, phrases.length - 1) * (COLLOCATION_PAUSE_MS / 1000);
      return total + speechSec + interPhrasePauseSec + seg.pauseAfterMs / 1000;
    }
    const speechSec = Math.max(0.8, seg.text.length / 13);
    return total + speechSec + seg.pauseAfterMs / 1000;
  }, 0);
}
