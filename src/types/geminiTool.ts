export interface GeminiStudyTool {
  id: string;
  number: number;
  title: string;
  category: string;
  iconName:
    | 'microphone'
    | 'stethoscope'
    | 'briefcase'
    | 'lightbulb'
    | 'headphones'
    | 'graduation'
    | 'dumbbell'
    | 'database';
  badge: string;
  tagline: string;
  description: string;
  bestPracticeTip: string;
  recommendedMode: 'Voice & Text' | 'Voice Preferred' | 'Text Preferred';
  prompt: string;
}
