import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { ITtsProvider, TTS_PROVIDER, TtsSynthesizeRequest } from './types';

/**
 * Free Microsoft Edge Neural TTS Provider (24kHz / 48kbps / Mono MP3)
 */
export class EdgeTtsProvider implements ITtsProvider {
  readonly name = TTS_PROVIDER.EDGE_TTS;

  async synthesize({ text, voice }: TtsSynthesizeRequest): Promise<Uint8Array> {
    const tts = new MsEdgeTTS();
    try {
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text);
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
