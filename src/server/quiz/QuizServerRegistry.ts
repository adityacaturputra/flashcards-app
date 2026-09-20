// src/server/quiz/QuizServerRegistry.ts
import { QuizModuleMeta } from '@/types/quiz';
import { ServerQuizModule } from './types';

/**
 * Backend Factory and Registry Pattern for Quiz & Skill Assessment modules.
 * Executes on the server side (Node.js runtime / Next.js Route Handlers).
 */
export class QuizServerRegistry {
  private static registry = new Map<string, ServerQuizModule>();

  /**
   * Registers a server-side module into the registry.
   */
  public static register(module: ServerQuizModule): void {
    this.registry.set(module.id.toLowerCase(), module);
  }

  /**
   * Retrieves a module by its identifier (case-insensitive).
   */
  public static getModule(id: string): ServerQuizModule | undefined {
    return this.registry.get(id.toLowerCase());
  }

  /**
   * Checks whether a module exists in the registry.
   */
  public static hasModule(id: string): boolean {
    return this.registry.has(id.toLowerCase());
  }

  /**
   * Returns an array of all registered server quiz modules.
   */
  public static getAllModules(): ServerQuizModule[] {
    return Array.from(this.registry.values());
  }

  /**
   * Returns serializable metadata for all registered modules.
   * Safe for direct transmission over HTTP to frontend.
   */
  public static getMetaList(): QuizModuleMeta[] {
    return this.getAllModules().map((m) => m.meta);
  }

  /**
   * Clears the registry (primarily for tests).
   */
  public static clear(): void {
    this.registry.clear();
  }
}

export default QuizServerRegistry;
