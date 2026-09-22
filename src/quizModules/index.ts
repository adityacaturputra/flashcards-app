// src/quizModules/index.ts
import { QuizModuleFactory } from '@/services/quiz/QuizModuleFactory';

// Bagian A: Tata Bahasa & Struktur
import { svaClientModule } from './sva';
import { tensesClientModule } from './tenses';
import { passiveVoiceClientModule } from './passive-voice';
import { conditionalsClientModule } from './conditionals';
import { commaSpliceClientModule } from './comma-splice';

// Bagian B: Kosakata & Kolokasi
import { synonymsClientModule } from './synonyms';
import { collocationsClientModule } from './collocations';
import { academicWordsClientModule } from './academic-words';
import { spellingAccuracyClientModule } from './spelling-accuracy';
import { discourseMarkersClientModule } from './discourse-markers';

// Bagian C: Stamina & Konsentrasi Ujian
import { listeningStaminaClientModule } from './listening-stamina';
import { readingSpeedClientModule } from './reading-speed';
import { writingOutlineClientModule } from './writing-outline';
import { speakingFluencyClientModule } from './speaking-fluency';

export const ALL_CLIENT_MODULES = [
  // Bagian A
  svaClientModule,
  tensesClientModule,
  passiveVoiceClientModule,
  conditionalsClientModule,
  commaSpliceClientModule,
  // Bagian B
  synonymsClientModule,
  collocationsClientModule,
  academicWordsClientModule,
  spellingAccuracyClientModule,
  discourseMarkersClientModule,
  // Bagian C
  listeningStaminaClientModule,
  readingSpeedClientModule,
  writingOutlineClientModule,
  speakingFluencyClientModule,
];

/**
 * Initializes and registers all 14 diagnostic & skill quiz modules into the QuizModuleFactory.
 */
export function initializeQuizModules(): void {
  ALL_CLIENT_MODULES.forEach((mod) => {
    if (!QuizModuleFactory.hasModule(mod.id)) {
      QuizModuleFactory.register(mod);
    }
  });
}

// Auto-initialize default modules on import
initializeQuizModules();

export {
  svaClientModule,
  tensesClientModule,
  passiveVoiceClientModule,
  conditionalsClientModule,
  commaSpliceClientModule,
  synonymsClientModule,
  collocationsClientModule,
  academicWordsClientModule,
  spellingAccuracyClientModule,
  discourseMarkersClientModule,
  listeningStaminaClientModule,
  readingSpeedClientModule,
  writingOutlineClientModule,
  speakingFluencyClientModule,
};
