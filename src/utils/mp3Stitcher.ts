/**
 * Pure Client-Side MP3 Stitcher for Uniform 24kHz / 48kbps / Mono MPEG-2 Layer III Streams
 * Concatenates Edge TTS MP3 clips + silent MP3 frames into ONE continuous Blob for iOS Safari background playback.
 */
import { CommuteAudioSegment, CommuteChapterMarker } from '@/types/commute';

// MPEG-2 Layer III, 24kHz, 48kbps, Mono, No CRC, No Padding:
// Frame length = floor(72 * 48000 / 24000) = 144 bytes
// Frame duration = 576 samples / 24000 Hz = 24 ms
const MP3_FRAME_BYTES = 144;
const MP3_FRAME_DURATION_SEC = 0.024;
const SILENT_FRAME_HEADER = [0xff, 0xf3, 0x64, 0xc4] as const;

let cachedSilentFrame: Uint8Array | null = null;

function getSilentFrame(): Uint8Array {
  if (!cachedSilentFrame) {
    const frame = new Uint8Array(MP3_FRAME_BYTES);
    frame[0] = SILENT_FRAME_HEADER[0];
    frame[1] = SILENT_FRAME_HEADER[1];
    frame[2] = SILENT_FRAME_HEADER[2];
    frame[3] = SILENT_FRAME_HEADER[3];
    cachedSilentFrame = frame;
  }
  return cachedSilentFrame;
}

/**
 * Generate exact digital silence in 24kHz 48kbps mono MP3 format.
 */
export function createSilentMp3Bytes(durationMs: number): Uint8Array {
  const frameCount = Math.max(0, Math.round(durationMs / (MP3_FRAME_DURATION_SEC * 1000)));
  if (frameCount === 0) return new Uint8Array(0);

  const silentFrame = getSilentFrame();
  const output = new Uint8Array(frameCount * MP3_FRAME_BYTES);
  for (let i = 0; i < frameCount; i++) {
    output.set(silentFrame, i * MP3_FRAME_BYTES);
  }
  return output;
}

/**
 * Strip ID3v2 prefix and ID3v1 suffix tags if present so frame boundaries stay clean.
 */
export function stripId3Tags(bytes: Uint8Array): Uint8Array {
  let start = 0;
  let end = bytes.length;

  // ID3v2 header starts with "ID3"
  if (
    bytes.length > 10 &&
    bytes[0] === 0x49 &&
    bytes[1] === 0x44 &&
    bytes[2] === 0x33
  ) {
    const tagSize =
      ((bytes[6] & 0x7f) << 21) |
      ((bytes[7] & 0x7f) << 14) |
      ((bytes[8] & 0x7f) << 7) |
      (bytes[9] & 0x7f);
    start = Math.min(bytes.length, 10 + tagSize);
  }

  // ID3v1 footer is last 128 bytes starting with "TAG"
  if (
    end - start > 128 &&
    bytes[end - 128] === 0x54 &&
    bytes[end - 127] === 0x41 &&
    bytes[end - 126] === 0x47
  ) {
    end -= 128;
  }

  return bytes.subarray(start, end);
}

/**
 * Calculate duration in seconds for a 24kHz 48kbps mono CBR MP3 byte array.
 */
export function getMp3ChunkDurationSec(byteLength: number): number {
  const frames = byteLength / MP3_FRAME_BYTES;
  return frames * MP3_FRAME_DURATION_SEC;
}

export interface StitchedEpisodeResult {
  blob: Blob;
  blobUrl: string;
  totalDurationSec: number;
  chapters: CommuteChapterMarker[];
}

/**
 * Stitch ordered script segments and synthesized audio buffers into a single MP3 Blob with exact chapters.
 */
export function stitchEpisodeMp3(
  segments: CommuteAudioSegment[],
  resolveClipBytes: (segment: CommuteAudioSegment) => Uint8Array | undefined
): StitchedEpisodeResult {
  const parts: Uint8Array[] = [];
  const chapters: CommuteChapterMarker[] = [];
  let cursorSec = 0;
  let totalBytes = 0;

  for (const segment of segments) {
    const rawClip = resolveClipBytes(segment);
    if (!rawClip || rawClip.length === 0) continue;

    const cleanClip = stripId3Tags(rawClip);
    const silence = createSilentMp3Bytes(segment.pauseAfterMs);
    const segmentStartSec = cursorSec;
    const segmentDurationSec =
      getMp3ChunkDurationSec(cleanClip.length) +
      getMp3ChunkDurationSec(silence.length);

    if (segment.isChapterStart) {
      if (chapters.length > 0) {
        chapters[chapters.length - 1].endTimeSec = segmentStartSec;
      }
      chapters.push({
        index: chapters.length,
        cardId: segment.cardId,
        cardQuestion: segment.cardQuestion,
        phase: segment.phase,
        startTimeSec: segmentStartSec,
        endTimeSec: segmentStartSec + segmentDurationSec,
      });
    }

    parts.push(cleanClip);
    totalBytes += cleanClip.length;

    if (silence.length > 0) {
      parts.push(silence);
      totalBytes += silence.length;
    }

    cursorSec += segmentDurationSec;
  }

  if (chapters.length > 0) {
    chapters[chapters.length - 1].endTimeSec = cursorSec;
  }

  const merged = new Uint8Array(totalBytes);
  let offset = 0;
  for (const part of parts) {
    merged.set(part, offset);
    offset += part.length;
  }

  const blob = new Blob([merged], { type: 'audio/mpeg' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    blob,
    blobUrl,
    totalDurationSec: cursorSec,
    chapters,
  };
}
