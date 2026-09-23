/**
 * src/utils/dynamicFieldHelpers.ts
 * Pure utility functions for parsing and categorizing rich dynamic fields
 * in flashcards (Word Family Matrix, Collocations, Sentence Upgrades, etc.)
 */

import { stripMarkdownForTTS } from './speechSynthesis';
import {
  WORD_FAMILY_KEYWORDS,
  COLLOCATION_KEYWORDS,
  SENTENCE_TRANSFORMATION_KEYWORDS,
} from '@/constants/flashcard';

export {
  WORD_FAMILY_KEYWORDS,
  COLLOCATION_KEYWORDS,
  SENTENCE_TRANSFORMATION_KEYWORDS,
};

/**
 * Check if a dynamic field key represents a Word Family category
 */
export function isWordFamilyField(key: string): boolean {
  const normalized = key.toLowerCase();
  return WORD_FAMILY_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

/**
 * Check if a dynamic field key represents IELTS Collocations
 */
export function isCollocationField(key: string): boolean {
  const normalized = key.toLowerCase();
  return COLLOCATION_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

/**
 * Check if a dynamic field key represents Sentence Transformation (Everyday vs Band 8+)
 */
export function isSentenceTransformationField(key: string): boolean {
  const normalized = key.toLowerCase();
  return SENTENCE_TRANSFORMATION_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  );
}

export interface WordFamilyItem {
  raw: string;
  cleanWord: string;
}

/**
 * Parse comma-separated or newline-separated word family forms into interactive items
 */
export function parseWordFamilyItems(text: string): WordFamilyItem[] {
  if (!text || text.trim() === '—' || text.trim() === '-') return [];

  // Split by comma or bullet/newline
  const rawParts = text
    .split(/[,;\n•]+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && p !== '—' && p !== '-');

  return rawParts.map((raw) => {
    // Extract base word by removing parenthetical explanations e.g. "analyses (pl.)" -> "analyses"
    const cleanWord = raw
      .replace(/\(.*?\)/g, '')
      .replace(/[❌✅•*`_]/g, '')
      .trim();
    return {
      raw,
      cleanWord: cleanWord.length > 0 ? cleanWord : raw,
    };
  });
}

export interface CollocationItem {
  raw: string;
  cleanText: string;
}

/**
 * Parse bullet-pointed collocations into individual interactive items
 */
export function parseCollocationItems(text: string): CollocationItem[] {
  if (!text) return [];

  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return lines.map((line) => {
    // Strip leading bullets (•, -, *, 1., etc.)
    const cleanText = line
      .replace(/^[\s•*+-]+/, '')
      .replace(/^\d+\.\s*/, '')
      .replace(/[`*]/g, '')
      .trim();

    return {
      raw: line,
      cleanText: cleanText.length > 0 ? cleanText : line,
    };
  });
}

export interface SentenceTransformation {
  band5: string;
  band8: string;
}

/**
 * Parse Band 5 vs Band 8+ sentence transformation comparison
 */
export function parseSentenceTransformation(text: string): SentenceTransformation | null {
  if (!text) return null;

  const band5Match = text.match(
    /(?:❌|bahasa sehari-hari|band 5)[\s\S]*?:\s*\n*([\s\S]*?)(?=(?:✅|academic|ielts|band 8|$))/i
  );
  const band8Match = text.match(
    /(?:✅|academic|ielts|band 8)[\s\S]*?:\s*\n*([\s\S]*?)$/i
  );

  const band5 = band5Match ? stripMarkdownForTTS(band5Match[1]).trim() : '';
  const band8 = band8Match ? stripMarkdownForTTS(band8Match[1]).trim() : '';

  if (!band5 && !band8) return null;

  return { band5, band8 };
}
