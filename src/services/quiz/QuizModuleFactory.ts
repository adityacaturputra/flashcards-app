// src/services/quiz/QuizModuleFactory.ts
import { QuizModuleStrategy } from '@/types/quiz';

/**
 * Factory and Registry Pattern for Quiz & Skill Assessment modules.
 * Decouples the Quiz Runner from specific skill implementations.
 */
export class QuizModuleFactory {
  private static registry = new Map<string, QuizModuleStrategy>();

  /**
   * Registers a new quiz module strategy into the factory.
   */
  public static register(module: QuizModuleStrategy): void {
    this.registry.set(module.id.toLowerCase(), module);
  }

  /**
   * Retrieves a module by its identifier (case-insensitive).
   */
  public static getModule(id: string): QuizModuleStrategy | undefined {
    return this.registry.get(id.toLowerCase());
  }

  /**
   * Checks whether a module exists in the registry.
   */
  public static hasModule(id: string): boolean {
    return this.registry.has(id.toLowerCase());
  }

  /**
   * Returns an array of all registered quiz modules.
   */
  public static getAllModules(): QuizModuleStrategy[] {
    return Array.from(this.registry.values());
  }

  /**
   * Clears all registered modules (used in testing).
   */
  public static clear(): void {
    this.registry.clear();
  }
}

export default QuizModuleFactory;
