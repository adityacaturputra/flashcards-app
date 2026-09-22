// src/quizModules/sva/index.tsx
import React from 'react';
import { QuizClientModule } from '@/types/quiz';
import { QUIZ_CATEGORY, QUIZ_SECTION } from '@/constants/quiz';
import SvaTheoryGuide from './theory';

export const SVA_MODULE_ID = 'sva';

/**
 * Client-Side Module for Subject-Verb Agreement.
 * Exclusively provides UI metadata and the Interactive Theory Guide.
 * Question generation and scoring logic are handled 100% on the server.
 */
export const svaClientModule: QuizClientModule = {
  id: SVA_MODULE_ID,
  title: 'Subject-Verb Agreement in Long Sentences',
  shortTitle: 'SVA (Long Sentences)',
  rubricTitle: 'Ketepatan penggunaan Subject-Verb Agreement pada kalimat panjang: [ /5]',
  description:
    'Latihan intensif menaklukkan "The Proximity Trap" pada kalimat kompleks bertingkat (20–35 kata). Menguji frasa preposisi, sisipan parenthetical, klausa relatif, gerund, dan inversi.',
  targetCefr: 'B1 ➔ B2 / C1',
  iconName: 'FaBolt',
  accentColor: '#10b981', // Emerald
  availableLevels: [1, 2, 3, 4, 5],
  category: QUIZ_CATEGORY.GRAMMAR,
  section: QUIZ_SECTION.A,
  renderTheoryGuide: () => <SvaTheoryGuide />,
};

export default svaClientModule;
