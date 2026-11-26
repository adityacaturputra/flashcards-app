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
import fs from 'node:fs/promises';
import path from 'node:path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ROOT_DIR = process.cwd();
const FLASHCARDS_PATH = path.join(ROOT_DIR, 'src/data/flashcards/flashcards.json');
const OUTPUT_ROOT = path.join(ROOT_DIR, 'public/audio/commute');
const MANIFEST_PATH = path.join(OUTPUT_ROOT, 'manifest.json');
const CHECKPOINT_EVERY = 50;
const MAX_RETRIES = 2;

// Tuned Tri-Voice Duet parameters from other-english-materials/AUDIOBOOK_RULES.md
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
  ID_HOST: { rate: '-10%', pitch: '+0Hz' },
  EN_HOST: { rate: '-12%', pitch: '+0Hz' },
  EN_COHOST: { rate: '-14%', pitch: '+0Hz' },
};

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
    ids: null,
  };
  for (const raw of argv) {
    if (raw === '--all') args.all = true;
    else if (raw === '--dry-run') args.dryRun = true;
    else if (raw === '--force') args.force = true;
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
    .replace(/&/g, conj)
    .replace(/[<>]/g, ' ');
  if (isId) {
    safe = safe
      .replace(/\bnggak\b/gi, 'tidak')
      .replace(/\bgak\b/gi, 'tidak')
      .replace(/\bmendadak\b/gi, 'tiba-tiba');
  }
  return safe.replace(/\s+/g, ' ').trim();
}

function computeClipChecksum(voice, prosody, sanitizedText) {
  return crypto
    .createHash('sha256')
    .update(`${voice}|${prosody.rate}|${prosody.pitch}|${sanitizedText}`)
    .digest('hex')
    .slice(0, 12);
}

async function synthesizeToFile(sanitizedText, voice, prosody, outPath) {
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
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, buf);
      return;
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
    const firstContentLine =
      String(card.answer || '')
        .split('\n')
        .map((line) => line.trim())
        .find((line) => line.length > 0 && !line.startsWith('#')) || card.answer;
    const rawMeaning =
      df['Arti Utama / Definisi'] || df['Arti'] || firstContentLine;

    const exampleVoice = args.accent === 'us' ? EN_COHOST_VOICE : enVoice;
    const exampleProsody = args.accent === 'us' ? PROSODY.EN_COHOST : PROSODY.EN_HOST;

    const fieldDefs = [
      { field: 'word', rawText: card.question, voice: enVoice, prosody: PROSODY.EN_HOST },
      { field: 'meaning', rawText: rawMeaning, voice: ID_VOICE, prosody: PROSODY.ID_HOST },
      { field: 'example', rawText: df['Contoh Kalimat'] ?? '', voice: exampleVoice, prosody: exampleProsody },
      { field: 'collocations', rawText: df['Common Collocations'] ?? '', voice: enVoice, prosody: PROSODY.EN_HOST },
      { field: 'tips', rawText: df['Tips Mengingat'] ?? '', voice: ID_VOICE, prosody: PROSODY.ID_HOST },
    ];

    for (const def of fieldDefs) {
      const sanitized = sanitizeTextForVoice(def.rawText, def.voice);
      if (!sanitized) continue;
      const checksum = computeClipChecksum(def.voice, def.prosody, sanitized);
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
        voice: def.voice,
        prosody: def.prosody,
        checksum,
        outPath,
      });
    }
  }

  console.log(
    `[commute:generate] Cards=${selected.length} | Up-to-date=${upToDate} | Need generate/update=${tasks.length} (EN=${enVoice}, ID=${ID_VOICE})`
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
        await synthesizeToFile(task.sanitizedText, task.voice, task.prosody, task.outPath);
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
