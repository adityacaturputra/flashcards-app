import { ITtsProvider, TTS_PROVIDER, TtsSynthesizeRequest } from './types';

const AZURE_OUTPUT_FORMAT = 'audio-24khz-48kbitrate-mono-mp3';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getLangFromVoice(voice: string): string {
  const parts = voice.split('-');
  return parts.length >= 2 ? `${parts[0]}-${parts[1]}` : 'en-US';
}

/**
 * Official Azure AI Speech Neural Provider (activated only when AZURE_SPEECH_KEY & AZURE_SPEECH_REGION are set)
 */
export class AzureSpeechProvider implements ITtsProvider {
  readonly name = TTS_PROVIDER.AZURE_SPEECH;

  constructor(
    private readonly apiKey: string,
    private readonly region: string
  ) {}

  async synthesize({ text, voice }: TtsSynthesizeRequest): Promise<Uint8Array> {
    const endpoint = `https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const lang = getLangFromVoice(voice);
    const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' name='${voice}'>${escapeXml(text)}</voice></speak>`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': this.apiKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': AZURE_OUTPUT_FORMAT,
        'User-Agent': 'FlashcardsCommuteApp',
      },
      body: ssml,
    });

    if (!response.ok) {
      throw new Error(`AzureSpeechProvider HTTP ${response.status}`);
    }

    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length === 0) {
      throw new Error('AzureSpeechProvider returned empty audio');
    }
    return bytes;
  }
}
