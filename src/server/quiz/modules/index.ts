// src/server/quiz/modules/index.ts
import { QuizServerRegistry } from '../QuizServerRegistry';

// Bagian A: Tata Bahasa & Struktur
import { svaServerModule } from './sva';
import { tensesServerModule } from './tenses';
import { passiveVoiceServerModule } from './passive-voice';
import { conditionalsServerModule } from './conditionals';
import { commaSpliceServerModule } from './comma-splice';

// Bagian B: Kosakata & Kolokasi
import { synonymsServerModule } from './synonyms';
import { collocationsServerModule } from './collocations';
import { academicWordsServerModule } from './academic-words';
import { spellingAccuracyServerModule } from './spelling-accuracy';
import { discourseMarkersServerModule } from './discourse-markers';

// Bagian C: Stamina & Konsentrasi Ujian
import { listeningStaminaServerModule } from './listening-stamina';
import { readingSpeedServerModule } from './reading-speed';
import { writingOutlineServerModule } from './writing-outline';
import { speakingFluencyServerModule } from './speaking-fluency';

export const ALL_SERVER_MODULES = [
  // Bagian A
  svaServerModule,
  tensesServerModule,
  passiveVoiceServerModule,
  conditionalsServerModule,
  commaSpliceServerModule,
  // Bagian B
  synonymsServerModule,
  collocationsServerModule,
  academicWordsServerModule,
  spellingAccuracyServerModule,
  discourseMarkersServerModule,
  // Bagian C
  listeningStaminaServerModule,
  readingSpeedServerModule,
  writingOutlineServerModule,
  speakingFluencyServerModule,
];

/**
 * Automatically registers all 14 server-side diagnostic quiz modules into the QuizServerRegistry.
 */
export function initializeServerQuizModules(): void {
  ALL_SERVER_MODULES.forEach((mod) => {
    if (!QuizServerRegistry.hasModule(mod.id)) {
      QuizServerRegistry.register(mod);
    }
  });
}

// Ensure modules are registered on initial import
initializeServerQuizModules();

export {
  QuizServerRegistry,
  svaServerModule,
  tensesServerModule,
  passiveVoiceServerModule,
  conditionalsServerModule,
  commaSpliceServerModule,
  synonymsServerModule,
  collocationsServerModule,
  academicWordsServerModule,
  spellingAccuracyServerModule,
  discourseMarkersServerModule,
  listeningStaminaServerModule,
  readingSpeedServerModule,
  writingOutlineServerModule,
  speakingFluencyServerModule,
};
