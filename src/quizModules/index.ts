// src/quizModules/index.ts
import { QuizModuleFactory } from '@/services/quiz/QuizModuleFactory';
import { svaModuleStrategy } from './sva';

/**
 * Initializes and registers all built-in quiz modules into the QuizModuleFactory.
 * When you add a new module in the future (e.g. collocations, tenses, inversions),
 * simply import it and call QuizModuleFactory.register() here!
 */
export function initializeQuizModules(): void {
  // Register Subject-Verb Agreement (SVA) Long Sentences module
  QuizModuleFactory.register(svaModuleStrategy);
}

// Auto-initialize default modules on import
initializeQuizModules();

export { svaModuleStrategy };
