// src/server/quiz/modules/index.ts
import { QuizServerRegistry } from '../QuizServerRegistry';
import { svaServerModule } from './sva';

/**
 * Automatically registers all server-side quiz modules into the QuizServerRegistry.
 */
export function initializeServerQuizModules(): void {
  if (!QuizServerRegistry.hasModule(svaServerModule.id)) {
    QuizServerRegistry.register(svaServerModule);
  }
}

// Ensure modules are registered on initial import
initializeServerQuizModules();

export { QuizServerRegistry, svaServerModule };
