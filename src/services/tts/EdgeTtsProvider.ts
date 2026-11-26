import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { ITtsProvider, TTS_PROVIDER, TtsSynthesizeRequest } from './types';

function sanitizeForEdgeSsml(text: string, voice: string): string {
  const conj = voice.toLowerCase().startsWith('id-') ? ' dan ' : ' and ';
  return text
    .replace(/&/g, conj)
    .replace(/[<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Free Microsoft Edge Neural TTS Provider (24kHz / 48kbps / Mono MP3)
 */
export class EdgeTtsProvider implements ITtsProvider {
  readonly name = TTS_PROVIDER.EDGE_TTS;

  async synthesize({ text, voice, rate, pitch }: TtsSynthesizeRequest): Promise<Uint8Array> {
    const tts = new MsEdgeTTS();
    try {
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const safeText = sanitizeForEdgeSsml(text, voice);
      const prosody = rate || pitch ? { rate: rate ?? '+0%', pitch: pitch ?? '+0Hz' } : undefined;
      const { audioStream } = tts.toStream(safeText, prosody);
      const chunks: Buffer[] = [];

      for await (const chunk of audioStream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }

      const buffer = Buffer.concat(chunks);
      if (buffer.length === 0) {
        throw new Error('EdgeTtsProvider returned empty audio');
      }
      return new Uint8Array(buffer);
    } finally {
      try {
        tts.close();
      } catch {
        // Ignore close errors
      }
    }
  }
}
