import { ITtsProvider, TTS_PROVIDER, TtsSynthesizeRequest } from './types';

const MAX_CHUNK_CHARS = 180;

function extractLanguageCode(voice: string): string {
  const lower = voice.toLowerCase();
  if (lower.startsWith('id-')) return 'id';
  if (lower.startsWith('en-gb')) return 'en-GB';
  if (lower.startsWith('en-au')) return 'en-AU';
  if (lower.startsWith('en-in')) return 'en-IN';
  return 'en';
}

function splitIntoChunks(text: string): string[] {
  if (text.length <= MAX_CHUNK_CHARS) return [text];
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > MAX_CHUNK_CHARS && current) {
      chunks.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/**
 * Zero-API-Key Free HTTP TTS Fallback Provider (Vercel-safe when datacenter IPs get 403 on Edge WS)
 */
export class GoogleFreeTtsProvider implements ITtsProvider {
  readonly name = TTS_PROVIDER.GOOGLE_FREE;

  async synthesize({ text, voice }: TtsSynthesizeRequest): Promise<Uint8Array> {
    const tl = extractLanguageCode(voice);
    const chunks = splitIntoChunks(text);
    const buffers: Uint8Array[] = [];

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(chunk)}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
      });

      if (!response.ok) {
        throw new Error(`GoogleFreeTtsProvider HTTP ${response.status}`);
      }
      buffers.push(new Uint8Array(await response.arrayBuffer()));
    }

    const totalLen = buffers.reduce((sum, b) => sum + b.length, 0);
    if (totalLen === 0) {
      throw new Error('GoogleFreeTtsProvider returned empty audio');
    }

    const merged = new Uint8Array(totalLen);
    let offset = 0;
    for (const buf of buffers) {
      merged.set(buf, offset);
      offset += buf.length;
    }
    return merged;
  }
}
