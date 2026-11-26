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

export interface CardNarrationFields {
  cardId: string;
  word: string;
  meaningId: string;
  exampleEn: string;
  collocationsEn: string;
  tipsId: string;
}

/**
 * Pronunciation-safe Indonesian sanitizer per AUDIOBOOK_RULES.md:
 * avoids glottal-stop words clipped by Indonesian TTS and raw SSML tags.
 */
export function sanitizeIndonesianForTTS(text: string): string {
  return text
    .replace(/<break[^>]*>/gi, ' ')
    .replace(/\bnggak\b/gi, 'tidak')
    .replace(/\bgak\b/gi, 'tidak')
    .replace(/\bmendadak\b/gi, 'tiba-tiba')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract clean, TTS-friendly bilingual fields from a Flashcard.
 */
export function extractFlashcardNarrationFields(
  card: Flashcard
): CardNarrationFields {
  const df = card.dynamicFields ?? {};
  const firstContentLine =
    card.answer
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.length > 0 && !line.startsWith('#')) ?? card.answer;
  const rawMeaning =
    df['Arti Utama / Definisi'] || df['Arti'] || firstContentLine;

  return {
    cardId: card._id ?? card.question,
    word: stripMarkdownForTTS(card.question),
    meaningId: sanitizeIndonesianForTTS(stripMarkdownForTTS(rawMeaning)),
    exampleEn: stripMarkdownForTTS(df['Contoh Kalimat'] ?? ''),
    collocationsEn: stripMarkdownForTTS(df['Common Collocations'] ?? ''),
    tipsId: sanitizeIndonesianForTTS(stripMarkdownForTTS(df['Tips Mengingat'] ?? '')),
  };
}

/**
 * Filter flashcards based on CommuteCardFilter, optional categoryId, and optional pre-generated audio IDs.
 */
export function filterCommuteCards(
  flashcards: Flashcard[],
  filter: CommuteCardFilter,
  categoryId: string,
  pregeneratedCardIds?: Set<string>
): Flashcard[] {
  const now = Date.now();
  const byCategory =
    categoryId === 'all'
      ? flashcards
      : flashcards.filter((c) => c.categories?.includes(categoryId));

  switch (filter) {
    case COMMUTE_CARD_FILTER.PREGENERATED:
      if (!pregeneratedCardIds || pregeneratedCardIds.size === 0) {
        return [];
      }
      return byCategory.filter((c) =>
        pregeneratedCardIds.has(c._id ?? c.question)
      );
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
 * Rough duration estimate (seconds) before synthesis, based on ~13 chars/sec speech rate.
 */
export function estimateEpisodeDurationSec(
  segments: CommuteAudioSegment[]
): number {
  return segments.reduce((total, seg) => {
    const speechSec = Math.max(0.8, seg.text.length / 13);
    return total + speechSec + seg.pauseAfterMs / 1000;
  }, 0);
}
