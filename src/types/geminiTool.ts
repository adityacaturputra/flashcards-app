/**
 * Gemini Study Tools Type Definitions
 * Single source of truth for AI prompt assistant configurations and icons.
 * Adheres strictly to BESTPRACTICE.md (§13.1 Single Source of Truth Enums).
 */

export const GEMINI_TOOL_ICON = {
  MICROPHONE: 'microphone',
  STETHOSCOPE: 'stethoscope',
  BRIEFCASE: 'briefcase',
  LIGHTBULB: 'lightbulb',
  HEADPHONES: 'headphones',
  GRADUATION: 'graduation',
  DUMBBELL: 'dumbbell',
  DATABASE: 'database',
} as const;

export type GeminiToolIcon =
  (typeof GEMINI_TOOL_ICON)[keyof typeof GEMINI_TOOL_ICON];

export const GEMINI_TOOL_RECOMMENDED_MODE = {
  VOICE_AND_TEXT: 'Voice & Text',
  VOICE_PREFERRED: 'Voice Preferred',
  TEXT_PREFERRED: 'Text Preferred',
} as const;

export type GeminiToolRecommendedMode =
  (typeof GEMINI_TOOL_RECOMMENDED_MODE)[keyof typeof GEMINI_TOOL_RECOMMENDED_MODE];

export interface GeminiStudyTool {
  id: string;
  number: number;
  title: string;
  category: string;
  iconName: GeminiToolIcon;
  badge: string;
  tagline: string;
  description: string;
  bestPracticeTip: string;
  recommendedMode: GeminiToolRecommendedMode;
  prompt: string;
}
