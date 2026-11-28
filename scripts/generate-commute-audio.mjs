#!/usr/bin/env node
/**
 * Checksum-Aware Mac Pre-Generator for Commute Audio Neural MP3s (Manifest v2)
 * Generates 24kHz / 48kbps / Mono Microsoft Neural MP3s organized by flashcard ID:
 *   public/audio/commute/{cardId}/{word|meaning|example|collocations|tips}.mp3
 *   public/audio/commute/manifest.json  (stores 12-char SHA-256 checksum per cardId/field)
 *
 * Automatically skips clips whose checksum matches voice+rate+pitch+sanitizedText and file exists.
 * Automatically regenerates clips whenever card text or voice/pacing parameters change.
 *
 * Usage:
 *   npm run commute:generate -- --all
 *   npm run commute:generate -- --all --dry-run
 *   npm run commute:generate -- --limit=50 --filter=new
 *   npm run commute:generate -- --ids=6904a0010000000000000001,6904a0010000000000000002
 */
import crypto from 'node:crypto';
import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ROOT_DIR = process.cwd();
const FLASHCARDS_PATH = path.join(ROOT_DIR, 'src/data/flashcards/flashcards.json');
const OUTPUT_ROOT = path.join(ROOT_DIR, 'public/audio/commute');
const MANIFEST_PATH = path.join(OUTPUT_ROOT, 'manifest.json');
const CHECKPOINT_EVERY = 50;
const MAX_RETRIES = 2;

// Tuned Tri-Voice Duet parameters (PLAN-05 + other-english-materials/AUDIOBOOK_RULES.md)
const EN_VOICES = {
  us: 'en-US-BrianNeural',
  uk: 'en-GB-RyanNeural',
  au: 'en-AU-WilliamNeural',
  za: 'en-ZA-LukeNeural',
  in: 'en-IN-PrabhatNeural',
};
const EN_COHOST_VOICE = 'en-US-AvaMultilingualNeural';
const ID_VOICE = 'id-ID-ArdiNeural';

const PROSODY = {
  ID_HOST: { rate: '-12%', pitch: '+0Hz' },
  EN_HOST: { rate: '-14%', pitch: '+0Hz' },
  EN_COLLOCATIONS: { rate: '-16%', pitch: '+0Hz' },
  EN_COHOST: { rate: '-14%', pitch: '+0Hz' },
};

const COLLOCATION_PAUSE_MS = 950;
const CLAUSE_PAUSE_MS = 550;
const NATURAL_AUDIO_VERSION = 'natural-v3';
const COLLOCATION_FORMAT_VERSION = 'collocations-v3';

// FFmpeg Studio Broadcast Mastering chain (AUDIOBOOK_RULES.md Section 2B)
const BROADCAST_MASTER_FILTER = [
  'highpass=f=80',
  'equalizer=f=160:width_type=o:width=1:g=3',
  'equalizer=f=400:width_type=o:width=1:g=-1.5',
  'equalizer=f=3500:width_type=o:width=1:g=1.5',
  'equalizer=f=7000:width_type=o:width=1:g=-2.5',
  'acompressor=threshold=-20dB:ratio=3:attack=5:release=50',
  'aecho=0.8:0.88:18:0.08',
  'loudnorm=I=-16:TP=-1.5:LRA=11',
].join(',');

// MPEG-2 Layer III, 24kHz, 48kbps, Mono: 144 bytes = 24ms per frame (matches src/utils/mp3Stitcher.ts)
const MP3_FRAME_BYTES = 144;
const MP3_FRAME_DURATION_MS = 24;
const SILENT_FRAME_HEADER = [0xff, 0xf3, 0x64, 0xc4];

function isFfmpegAvailable() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function parseArgs(argv) {
  const args = {
    all: false,
    dryRun: false,
    limit: 40,
    filter: 'all', // all | new | hard
    category: 'all',
    accent: 'us',
    concurrency: 5,
    force: false,
    master: null, // null = auto-detect ffmpeg, true = require, false = disable
    ids: null,
  };
  for (const raw of argv) {
    if (raw === '--all') args.all = true;
    else if (raw === '--dry-run') args.dryRun = true;
    else if (raw === '--force') args.force = true;
    else if (raw === '--master') args.master = true;
    else if (raw === '--no-master') args.master = false;
    else if (raw.startsWith('--limit=')) args.limit = Number(raw.slice(8)) || 40;
    else if (raw.startsWith('--filter=')) args.filter = raw.slice(9);
    else if (raw.startsWith('--category=')) args.category = raw.slice(11);
    else if (raw.startsWith('--accent=')) args.accent = raw.slice(9);
    else if (raw.startsWith('--concurrency=')) args.concurrency = Number(raw.slice(14)) || 5;
    else if (raw.startsWith('--ids=')) {
      args.ids = new Set(raw.slice(6).split(',').map((s) => s.trim()).filter(Boolean));
    }
  }
  return args;
}

function stripMarkdown(text) {
  if (!text) return '';
  return String(text)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\$\$?([\s\S]*?)\$\$?/g, '$1')
    .replace(/\s*(?:->|→)\s*/g, ', ')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/^[\s*+-]+(?=\S)/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeTextForVoice(text, voice) {
  const isId = voice.toLowerCase().startsWith('id-');
  const conj = isId ? ' dan ' : ' and ';
  let safe = stripMarkdown(text)
    .slice(0, 800)
    .replace(/<break[^>]*>/gi, ' ')
    .replace(/\s*\|\s*/g, ', ')
    .replace(/&/g, conj)
    .replace(/[<>]/g, ' ');
  if (isId) {
    safe = safe
      .replace(/\bnggak\b/gi, 'tidak')
      .replace(/\bgak\b/gi, 'tidak')
      .replace(/\bmendadak\b/gi, 'tiba-tiba')
      // Avoid ellipsis right after a single short word (AUDIOBOOK_RULES.md)
      .replace(/(^|[.!?]\s+)([A-Za-zÀ-ÿ]{1,10})\.\.\./g, '$1$2,');
  }
  return safe.replace(/\s+/g, ' ').trim();
}

const VERB_TRIPLE_PATTERN =
  /V1:\s*([^|]+?)\s*\|\s*V2:\s*([^|]+?)(?:\s*\|\s*V3:\s*([^|\n]+))?/i;

function resolveTipsField(df) {
  if (df['Tips Mengingat']) return df['Tips Mengingat'];
  const key = Object.keys(df).find((k) =>
    k.toLowerCase().startsWith('tips mengingat')
  );
  return key ? df[key] : '';
}

function resolveExampleField(df) {
  if (df['Contoh Kalimat']) return df['Contoh Kalimat'];
  if (df['Contoh Kalimat Singular']) return df['Contoh Kalimat Singular'];
  const transformKey = Object.keys(df).find((k) =>
    k.toLowerCase().startsWith('transformasi kalimat')
  );
  if (transformKey) {
    const quoted = String(df[transformKey]).match(/[""]([^""]{12,220})[""]/);
    if (quoted?.[1]) return quoted[1];
  }
  return '';
}

function splitCollocationPhrases(rawText, voice) {
  if (!rawText) return [];
  return String(rawText)
    .split(/[\n•;,]+/)
    .map((chunk) =>
      chunk
        .replace(/^[\s*•\-–—]+/, '')
        .replace(/^\d+[.)]\s+/, '')
        .trim()
    )
    .map((chunk) => sanitizeTextForVoice(chunk, voice))
    .filter(Boolean)
    .map((phrase) => (/[.!?]$/.test(phrase) ? phrase : `${phrase}.`));
}

/**
 * Split long narration text (meaning, example, tips) into natural breathing clauses
 * on sentence boundaries (. ! ?), semicolons (;), or long comma/dash spans (> 8 words).
 */
function splitIntoNaturalClauses(sanitizedText) {
  if (!sanitizedText) return [];
  const sentenceParts = sanitizedText
    .split(/(?<=[.!?])\s+|\s*;\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  const clauses = [];
  for (const part of sentenceParts) {
    const words = part.split(/\s+/).filter(Boolean);
    if (words.length <= 8) {
      clauses.push(part);
      continue;
    }

    // Split long sentences (> 8 words) on commas or em-dashes when each side has >= 4 words
    const subParts = part.split(/(?<=,)\s+|\s+—\s+/).map((s) => s.trim()).filter(Boolean);
    let buffer = '';
    for (const sub of subParts) {
      const candidate = buffer ? `${buffer} ${sub}` : sub;
      const bufWords = buffer ? buffer.split(/\s+/).filter(Boolean).length : 0;
      const subWords = sub.split(/\s+/).filter(Boolean).length;
      if (buffer && bufWords >= 4 && subWords >= 4) {
        clauses.push(buffer);
        buffer = sub;
      } else {
        buffer = candidate;
      }
    }
    if (buffer) clauses.push(buffer);
  }

  return clauses.length > 0 ? clauses : [sanitizedText];
}

function applyBroadcastMastering(mp3Buf) {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      'ffmpeg',
      [
        '-hide_banner',
        '-loglevel',
        'error',
        '-f',
        'mp3',
        '-i',
        'pipe:0',
        '-af',
        BROADCAST_MASTER_FILTER,
        '-ar',
        '24000',
        '-b:a',
        '48k',
        '-ac',
        '1',
        '-c:a',
        'libmp3lame',
        '-write_xing',
        '0',
        '-id3v2_version',
        '0',
        '-f',
        'mp3',
        'pipe:1',
      ],
      { stdio: ['pipe', 'pipe', 'pipe'] }
    );

    const outChunks = [];
    const errChunks = [];
    proc.stdout.on('data', (chunk) => outChunks.push(chunk));
    proc.stderr.on('data', (chunk) => errChunks.push(chunk));
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code !== 0) {
        const stderr = Buffer.concat(errChunks).toString('utf8').trim();
        reject(new Error(`ffmpeg mastering failed (code ${code}): ${stderr}`));
        return;
      }
      const mastered = stripId3Tags(Buffer.concat(outChunks));
      if (mastered.length === 0) {
        reject(new Error('ffmpeg mastering produced empty buffer'));
        return;
      }
      resolve(mastered);
    });

    proc.stdin.end(mp3Buf);
  });
}

function createSilentMp3Buffer(durationMs) {
  const frameCount = Math.max(0, Math.round(durationMs / MP3_FRAME_DURATION_MS));
  if (frameCount === 0) return Buffer.alloc(0);

  const singleFrame = Buffer.alloc(MP3_FRAME_BYTES);
  singleFrame[0] = SILENT_FRAME_HEADER[0];
  singleFrame[1] = SILENT_FRAME_HEADER[1];
  singleFrame[2] = SILENT_FRAME_HEADER[2];
  singleFrame[3] = SILENT_FRAME_HEADER[3];

  const output = Buffer.alloc(frameCount * MP3_FRAME_BYTES);
  for (let i = 0; i < frameCount; i++) {
    singleFrame.copy(output, i * MP3_FRAME_BYTES);
  }
  return output;
}

function stripId3Tags(buf) {
  let start = 0;
  let end = buf.length;

  // ID3v2 header starts with "ID3"
  if (buf.length > 10 && buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) {
    const tagSize =
      ((buf[6] & 0x7f) << 21) |
      ((buf[7] & 0x7f) << 14) |
      ((buf[8] & 0x7f) << 7) |
      (buf[9] & 0x7f);
    start = Math.min(buf.length, 10 + tagSize);
  }

  // ID3v1 footer is last 128 bytes starting with "TAG"
  if (
    end - start > 128 &&
    buf[end - 128] === 0x54 &&
    buf[end - 127] === 0x41 &&
    buf[end - 126] === 0x47
  ) {
    end -= 128;
  }

  return buf.subarray(start, end);
}

function computeClipChecksum(voice, prosody, checksumInput, useMaster) {
  const masterTag = useMaster ? 'mastered' : 'raw';
  return crypto
    .createHash('sha256')
    .update(`${NATURAL_AUDIO_VERSION}|${masterTag}|${voice}|${prosody.rate}|${prosody.pitch}|${checksumInput}`)
    .digest('hex')
    .slice(0, 12);
}

async function synthesizeToBuffer(sanitizedText, voice, prosody) {
  let lastErr = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const tts = new MsEdgeTTS();
    try {
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(sanitizedText, prosody);
      const chunks = [];
      for await (const chunk of audioStream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const buf = Buffer.concat(chunks);
      if (buf.length === 0) throw new Error('Empty audio buffer');
      return buf;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
      }
    } finally {
      try {
        tts.close();
      } catch {
        // ignore
      }
    }
  }
  throw lastErr;
}

async function finalizeAndWriteMp3(rawBuf, useMaster, outPath) {
  const cleanBuf = stripId3Tags(rawBuf);
  const finalBuf = useMaster ? await applyBroadcastMastering(cleanBuf) : cleanBuf;
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, finalBuf);
}

async function synthesizeToFile(sanitizedText, voice, prosody, useMaster, outPath) {
  const buf = await synthesizeToBuffer(sanitizedText, voice, prosody);
  await finalizeAndWriteMp3(buf, useMaster, outPath);
}

async function synthesizeChunkedToFile(chunks, voice, prosody, pauseMs, useMaster, outPath) {
  if (chunks.length === 1) {
    await synthesizeToFile(chunks[0], voice, prosody, useMaster, outPath);
    return;
  }
  const silenceBuf = createSilentMp3Buffer(pauseMs);
  const parts = [];
  for (let i = 0; i < chunks.length; i++) {
    const rawBuf = await synthesizeToBuffer(chunks[i], voice, prosody);
    parts.push(stripId3Tags(rawBuf));
    if (i < chunks.length - 1 && silenceBuf.length > 0) {
      parts.push(silenceBuf);
    }
  }
  const merged = Buffer.concat(parts);
  if (merged.length === 0) throw new Error('Empty stitched chunked audio buffer');
  await finalizeAndWriteMp3(merged, useMaster, outPath);
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size > 0;
  } catch {
    return false;
  }
}

async function loadExistingManifest() {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const normalizedCards = {};
    if (parsed?.cards && typeof parsed.cards === 'object') {
      for (const [cardId, entry] of Object.entries(parsed.cards)) {
        if (entry && !Array.isArray(entry) && typeof entry === 'object') {
          normalizedCards[cardId] = { ...entry };
        }
      }
    }
    return normalizedCards;
  } catch {
    return {};
  }
}

async function writeManifest(cardsMap, accent) {
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  const sortedCards = {};
  for (const cardId of Object.keys(cardsMap).sort()) {
    const fields = cardsMap[cardId];
    if (fields && Object.keys(fields).length > 0) {
      sortedCards[cardId] = fields;
    }
  }
  const manifest = {
    version: 2,
    generatedAt: new Date().toISOString(),
    accent,
    cards: sortedCards,
  };
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const ffmpegDetected = isFfmpegAvailable();
  if (args.master === true && !ffmpegDetected) {
    throw new Error('--master requested, but ffmpeg is not installed or not in PATH.');
  }
  const useMaster = args.master === false ? false : ffmpegDetected;
  const enVoice = EN_VOICES[args.accent] || EN_VOICES.us;
  const raw = await fs.readFile(FLASHCARDS_PATH, 'utf8');
  const allCards = JSON.parse(raw);

  let selected = allCards;
  if (args.ids) {
    selected = allCards.filter((c) => args.ids.has(c._id));
  } else {
    if (args.category !== 'all') {
      selected = selected.filter((c) => c.categories?.includes(args.category));
    }
    if (args.filter === 'new') {
      selected = selected.filter((c) => c.progression === 'new');
    } else if (args.filter === 'hard') {
      selected = selected.filter(
        (c) => c.progression === 'hard' || c.progression === 'retry'
      );
    }
    if (!args.all) {
      selected = selected.slice(0, args.limit);
    }
  }

  const manifestCards = await loadExistingManifest();
  const tasks = [];
  let upToDate = 0;

  for (const card of selected) {
    const cardId = card._id;
    if (!cardId) continue;
    const df = card.dynamicFields ?? {};
    const rawAnswer = String(card.answer || '');
    const verbMatch = rawAnswer.match(VERB_TRIPLE_PATTERN);

    let wordRaw = card.question;
    let meaningRaw = '';
    if (verbMatch) {
      const forms = [verbMatch[1], verbMatch[2], verbMatch[3]]
        .filter(Boolean)
        .map((f) => stripMarkdown(f).trim())
        .filter(Boolean);
      wordRaw = forms.join('. ') + '.';
      meaningRaw = card.question;
    } else {
      const firstContentLine =
        rawAnswer
          .split('\n')
          .map((line) => line.trim())
          .find((line) => line.length > 0 && !line.startsWith('#')) || rawAnswer;
      meaningRaw =
        df['Arti Utama / Definisi'] ||
        df['Arti Utama'] ||
        df['Arti'] ||
        df['Penjelasan Lengkap'] ||
        firstContentLine;
    }

    const exampleVoice = args.accent === 'us' ? EN_COHOST_VOICE : enVoice;
    const exampleProsody = args.accent === 'us' ? PROSODY.EN_COHOST : PROSODY.EN_HOST;

    const fieldDefs = [
      { field: 'word', rawText: wordRaw, voice: enVoice, prosody: PROSODY.EN_HOST },
      { field: 'meaning', rawText: meaningRaw, voice: ID_VOICE, prosody: PROSODY.ID_HOST },
      { field: 'example', rawText: resolveExampleField(df), voice: exampleVoice, prosody: exampleProsody },
      { field: 'collocations', rawText: df['Common Collocations'] || df['Kolokasi Emas IELTS'] || '', voice: enVoice, prosody: PROSODY.EN_COLLOCATIONS },
      { field: 'tips', rawText: resolveTipsField(df), voice: ID_VOICE, prosody: PROSODY.ID_HOST },
    ];

    for (const def of fieldDefs) {
      let sanitized = '';
      let chunks = null;
      let pauseMs = 0;
      let checksumInput = '';

      if (def.field === 'collocations') {
        chunks = splitCollocationPhrases(def.rawText, def.voice);
        if (chunks.length === 0) continue;
        pauseMs = COLLOCATION_PAUSE_MS;
        checksumInput = `${COLLOCATION_FORMAT_VERSION}|pause=${pauseMs}|${chunks.join('||')}`;
      } else if (def.field === 'meaning' || def.field === 'example' || def.field === 'tips') {
        sanitized = sanitizeTextForVoice(def.rawText, def.voice);
        if (!sanitized) continue;
        chunks = splitIntoNaturalClauses(sanitized);
        pauseMs = CLAUSE_PAUSE_MS;
        checksumInput = `clauses|pause=${pauseMs}|${chunks.join('||')}`;
      } else {
        sanitized = sanitizeTextForVoice(def.rawText, def.voice);
        if (!sanitized) continue;
        checksumInput = sanitized;
      }

      const checksum = computeClipChecksum(def.voice, def.prosody, checksumInput, useMaster);
      const outPath = path.join(OUTPUT_ROOT, cardId, `${def.field}.mp3`);
      const existingChecksum = manifestCards[cardId]?.[def.field];

      if (!args.force && existingChecksum === checksum && (await fileExists(outPath))) {
        upToDate += 1;
        continue;
      }

      tasks.push({
        cardId,
        field: def.field,
        sanitizedText: sanitized,
        chunks,
        pauseMs,
        voice: def.voice,
        prosody: def.prosody,
        checksum,
        outPath,
      });
    }
  }

  console.log(
    `[commute:generate] Cards=${selected.length} | Up-to-date=${upToDate} | Need generate/update=${tasks.length} | Mastering=${useMaster ? 'ON (FFmpeg -16 LUFS)' : 'OFF'} (EN=${enVoice}, ID=${ID_VOICE})`
  );

  if (args.dryRun) {
    console.log('[commute:generate] --dry-run enabled; no files written.');
    return;
  }

  let cursor = 0;
  let generated = 0;
  let failed = 0;

  const worker = async () => {
    while (cursor < tasks.length) {
      const idx = cursor++;
      const task = tasks[idx];
      try {
        if (task.chunks?.length) {
          await synthesizeChunkedToFile(
            task.chunks,
            task.voice,
            task.prosody,
            task.pauseMs,
            useMaster,
            task.outPath
          );
        } else {
          await synthesizeToFile(task.sanitizedText, task.voice, task.prosody, useMaster, task.outPath);
        }
        if (!manifestCards[task.cardId]) {
          manifestCards[task.cardId] = {};
        }
        manifestCards[task.cardId][task.field] = task.checksum;
        generated += 1;

        if (generated % CHECKPOINT_EVERY === 0) {
          await writeManifest(manifestCards, args.accent);
          console.log(
            `  Checkpoint: ${generated}/${tasks.length} generated, ${failed} failed (up-to-date=${upToDate})`
          );
        }
      } catch (err) {
        failed += 1;
        console.error(`  Failed ${task.cardId}/${task.field}:`, err?.message ?? err);
      }
    }
  };

  if (tasks.length > 0) {
    await Promise.all(
      Array.from({ length: Math.min(args.concurrency, tasks.length) }, () => worker())
    );
  }

  await writeManifest(manifestCards, args.accent);
  console.log(
    `[commute:generate] Done! Generated=${generated}, UpToDate=${upToDate}, Failed=${failed}. Total cards in manifest: ${Object.keys(manifestCards).length}`
  );
}

main().catch((err) => {
  console.error('[commute:generate] Fatal error:', err);
  process.exit(1);
});
