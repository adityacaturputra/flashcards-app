/**
 * TTS Provider Interface & Constants
 * Single Source of Truth for Text-to-Speech synthesis backends.
 */

export const TTS_PROVIDER = {
  EDGE_TTS: 'edge-tts',
  GOOGLE_FREE: 'google-free',
  AZURE_SPEECH: 'azure-speech',
} as const;

export type TtsProviderType = (typeof TTS_PROVIDER)[keyof typeof TTS_PROVIDER];

export interface TtsSynthesizeRequest {
  text: string;
  voice: string;
}

export interface ITtsProvider {
  readonly name: TtsProviderType;
  synthesize(request: TtsSynthesizeRequest): Promise<Uint8Array>;
}
