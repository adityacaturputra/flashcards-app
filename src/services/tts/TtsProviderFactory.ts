import { ITtsProvider } from './types';
import { EdgeTtsProvider } from './EdgeTtsProvider';
import { GoogleFreeTtsProvider } from './GoogleFreeTtsProvider';

/**
 * Factory resolving the free TTS fallback provider chain for newly created unsynced cards.
 * Primary chain: Edge Neural TTS -> Google Free HTTP TTS fallback.
 */
export class TtsProviderFactory {
  private static edgeProvider: EdgeTtsProvider | null = null;
  private static googleFreeProvider: GoogleFreeTtsProvider | null = null;

  static getProviderChain(): ITtsProvider[] {
    if (!this.edgeProvider) {
      this.edgeProvider = new EdgeTtsProvider();
    }
    if (!this.googleFreeProvider) {
      this.googleFreeProvider = new GoogleFreeTtsProvider();
    }

    return [this.edgeProvider, this.googleFreeProvider];
  }
}
