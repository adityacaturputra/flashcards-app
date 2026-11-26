import { NextResponse } from 'next/server';
import { TtsProviderFactory } from '@/services/tts/TtsProviderFactory';

export const runtime = 'nodejs';

const MAX_TEXT_LENGTH = 800;
const ALLOWED_VOICE_PATTERN = /^[a-z]{2,3}-[A-Z]{2}-[A-Za-z0-9]+Neural$/;

interface TtsRequestBody {
  text?: string;
  voice?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TtsRequestBody;
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const voice =
      typeof body.voice === 'string' && ALLOWED_VOICE_PATTERN.test(body.voice)
        ? body.voice
        : 'en-US-AndrewNeural';

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for TTS synthesis.' },
        { status: 400 }
      );
    }

    const safeText = text.slice(0, MAX_TEXT_LENGTH);
    const providers = TtsProviderFactory.getProviderChain();

    let lastError: unknown = null;
    for (const provider of providers) {
      try {
        const audioBytes = await provider.synthesize({ text: safeText, voice });
        return new NextResponse(new Uint8Array(audioBytes), {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': String(audioBytes.length),
            'Cache-Control': 'public, max-age=86400',
            'X-TTS-Provider': provider.name,
          },
        });
      } catch (err) {
        lastError = err;
        console.warn(`[commute/tts] Provider ${provider.name} failed, trying next...`, err);
      }
    }

    console.error('[commute/tts] All TTS providers failed:', lastError);
    return NextResponse.json(
      { error: 'Failed to synthesize speech audio.' },
      { status: 502 }
    );
  } catch (error) {
    console.error('[commute/tts] Invalid request:', error);
    return NextResponse.json(
      { error: 'Invalid TTS request payload.' },
      { status: 400 }
    );
  }
}
