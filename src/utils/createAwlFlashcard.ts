import { AwlItem } from '@/types/awl';
import { Flashcard, Progression } from '@/types/flashcard';

export const AWL_CATEGORY_ID = '6901a0010000000000000010';

/**
 * Generate a deterministic 24-character hex ID for an AWL flashcard
 */
export function generateAwlFlashcardId(headword: string): string {
  let hash = 0;
  for (let i = 0; i < headword.length; i++) {
    hash = (hash << 5) - hash + headword.charCodeAt(i);
    hash |= 0;
  }
  const hexSuffix = Math.abs(hash).toString(16).padStart(12, '0').slice(0, 12);
  return `6903a0010000${hexSuffix}`;
}

/**
 * Transforms an AwlItem into a rich, Spaced-Repetition-compliant Flashcard
 * Automatically tagged with the dedicated 'Academic Word List (AWL)' category.
 */
export function createAwlFlashcard(item: AwlItem): Flashcard {
  const familyVerbs = item.family.verbs.length > 0 ? item.family.verbs.join(', ') : '—';
  const familyNouns = item.family.nouns.length > 0 ? item.family.nouns.join(', ') : '—';
  const familyAdjs = item.family.adjectives.length > 0 ? item.family.adjectives.join(', ') : '—';
  const familyAdvs = item.family.adverbs.length > 0 ? item.family.adverbs.join(', ') : '—';
  const familyAnts = item.family.antonyms && item.family.antonyms.length > 0 ? item.family.antonyms.join(', ') : '';

  const dynamicFields: Record<string, string> = {
    'Part of Speech': `${item.primaryPartOfSpeech.toUpperCase()} | Sublist ${item.sublist} (AWL)`,
    'Pronunciation (IPA)': item.ipa,
    'Arti Utama': item.definitionId,
    'Word Family Matrix': `• Verbs: ${familyVerbs}\n• Nouns: ${familyNouns}\n• Adjectives: ${familyAdjs}\n• Adverbs: ${familyAdvs}${familyAnts ? `\n• Antonyms/Lawan: ${familyAnts}` : ''}`,
    'Rumus & Kolokasi Emas': item.collocations.map((c) => `• ${c}`).join('\n'),
    'Contoh Kalimat (Band 8+ Academic)': item.band8Example,
    'Bahasa Sehari-hari (Band 5)': item.band5Example,
    'Tips Mengingat': `Kata AWL Sublist ${item.sublist}. Pelajari pergeseran bentuknya: Noun, Verb, dan Adjective sering mengalami pergeseran penekanan nada (stress shift). Kuasai rumpunnya untuk mendongkrak skor Lexical Resource!`,
  };

  if (item.stressShiftNote) {
    dynamicFields['Pergeseran Nada (Stress Shift)'] = item.stressShiftNote;
  }

  return {
    _id: generateAwlFlashcardId(item.headword),
    question: `${item.headword.toUpperCase()} (AWL Sublist ${item.sublist}: ${item.primaryPartOfSpeech.toUpperCase()})`,
    answer: `${item.definitionId}\n\n*English Definition: ${item.definitionEn}*`,
    progression: Progression.New,
    nextReviewDate: new Date(),
    categories: [AWL_CATEGORY_ID],
    dynamicFields,
  };
}
