import { ITtsProvider } from './types';
import { EdgeTtsProvider } from './EdgeTtsProvider';
import { GoogleFreeTtsProvider } from './GoogleFreeTtsProvider';
import { AzureSpeechProvider } from './AzureSpeechProvider';

/**
 * Factory resolving the ordered TTS provider chain based on environment config.
 * Default free mode: Edge Neural TTS -> Google Free HTTP TTS fallback.
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

    const azureKey = process.env.AZURE_SPEECH_KEY?.trim();
    const azureRegion = process.env.AZURE_SPEECH_REGION?.trim();

    if (azureKey && azureRegion) {
      return [
        new AzureSpeechProvider(azureKey, azureRegion),
        this.edgeProvider,
        this.googleFreeProvider,
      ];
    }

    return [this.edgeProvider, this.googleFreeProvider];
  }
}
