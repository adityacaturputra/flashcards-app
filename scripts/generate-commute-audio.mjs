#!/usr/bin/env node
/**
 * Mac Pre-Generator for Commute Audio Neural MP3s
 * Generates 24kHz / 48kbps / Mono Microsoft Neural MP3s organized by flashcard ID:
 *   public/audio/commute/{cardId}/{word|meaning|example|collocations|tips}.mp3
 *   public/audio/commute/manifest.json
 *
 * Usage:
 *   npm run commute:generate -- --limit=40 --filter=new
 *   npm run commute:generate -- --limit=100 --filter=all --accent=us
 *   npm run commute:generate -- --ids=6904a0010000000000000001,6904a0010000000000000002
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ROOT_DIR = process.cwd();
const FLASHCARDS_PATH = path.join(ROOT_DIR, 'src/data/flashcards/flashcards.json');
const OUTPUT_ROOT = path.join(ROOT_DIR, 'public/audio/commute');
const MANIFEST_PATH = path.join(OUTPUT_ROOT, 'manifest.json');

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
    limit: 40,
    filter: 'new', // new | hard | all
    category: 'all',
    accent: 'us',
    concurrency: 4,
    force: false,
    ids: null,
  };
  for (const raw of argv) {
    if (raw === '--force') args.force = true;
    else if (raw.startsWith('--limit=')) args.limit = Number(raw.slice(8)) || 40;
    else if (raw.startsWith('--filter=')) args.filter = raw.slice(9);
    else if (raw.startsWith('--category=')) args.category = raw.slice(11);
    else if (raw.startsWith('--accent=')) args.accent = raw.slice(9);
    else if (raw.startsWith('--concurrency=')) args.concurrency = Number(raw.slice(14)) || 4;
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

async function synthesizeToFile(text, voice, prosody, outPath) {
  const tts = new MsEdgeTTS();
  try {
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const isId = voice.toLowerCase().startsWith('id-');
    const conj = isId ? ' dan ' : ' and ';
    let safeText = text
      .slice(0, 800)
      .replace(/<break[^>]*>/gi, ' ')
      .replace(/&/g, conj)
      .replace(/[<>]/g, ' ');
    if (isId) {
      safeText = safeText
        .replace(/\bnggak\b/gi, 'tidak')
        .replace(/\bgak\b/gi, 'tidak')
        .replace(/\bmendadak\b/gi, 'tiba-tiba');
    }
    safeText = safeText.replace(/\s+/g, ' ').trim();
    const { audioStream } = tts.toStream(safeText, prosody);
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const buf = Buffer.concat(chunks);
    if (buf.length === 0) throw new Error('Empty audio buffer');
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, buf);
  } finally {
    try {
      tts.close();
    } catch {
      // ignore
    }
  }
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size > 0;
  } catch {
    return false;
  }
}

async function rebuildManifest(accent) {
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  const entries = await fs.readdir(OUTPUT_ROOT, { withFileTypes: true });
  const cards = {};

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const cardDir = path.join(OUTPUT_ROOT, entry.name);
    const files = await fs.readdir(cardDir);
    const fields = files
      .filter((f) => f.endsWith('.mp3'))
      .map((f) => f.replace(/\.mp3$/, ''))
      .sort();
    if (fields.length > 0) {
      cards[entry.name] = fields;
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    accent,
    cards,
  };
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  return Object.keys(cards).length;
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
    selected = selected.slice(0, args.limit);
  }

  console.log(
    `[commute:generate] Preparing ${selected.length} cards (EN=${enVoice}, ID=${ID_VOICE})...`
  );

  const tasks = [];
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

    const fieldMap = [
      { field: 'word', text: stripMarkdown(card.question), voice: enVoice, prosody: PROSODY.EN_HOST },
      { field: 'meaning', text: stripMarkdown(rawMeaning), voice: ID_VOICE, prosody: PROSODY.ID_HOST },
      { field: 'example', text: stripMarkdown(df['Contoh Kalimat'] ?? ''), voice: exampleVoice, prosody: exampleProsody },
      { field: 'collocations', text: stripMarkdown(df['Common Collocations'] ?? ''), voice: enVoice, prosody: PROSODY.EN_HOST },
      { field: 'tips', text: stripMarkdown(df['Tips Mengingat'] ?? ''), voice: ID_VOICE, prosody: PROSODY.ID_HOST },
    ];

    for (const item of fieldMap) {
      if (!item.text) continue;
      const outPath = path.join(OUTPUT_ROOT, cardId, `${item.field}.mp3`);
      tasks.push({ cardId, ...item, outPath });
    }
  }

  let cursor = 0;
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  const worker = async () => {
    while (cursor < tasks.length) {
      const idx = cursor++;
      const task = tasks[idx];
      if (!args.force && (await fileExists(task.outPath))) {
        skipped += 1;
        continue;
      }
      try {
        await synthesizeToFile(task.text, task.voice, task.prosody, task.outPath);
        generated += 1;
        if (generated % 15 === 0 || generated === tasks.length - skipped) {
          console.log(
            `  Progress: ${generated} generated, ${skipped} skipped, ${failed} failed (total ${tasks.length})`
          );
        }
      } catch (err) {
        failed += 1;
        console.error(`  Failed ${task.cardId}/${task.field}:`, err.message);
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(args.concurrency, Math.max(tasks.length, 1)) }, () =>
      worker()
    )
  );

  const totalCardsInManifest = await rebuildManifest(args.accent);
  console.log(
    `[commute:generate] Done! Generated=${generated}, Skipped=${skipped}, Failed=${failed}. Total cards in manifest: ${totalCardsInManifest}`
  );
}

main().catch((err) => {
  console.error('[commute:generate] Fatal error:', err);
  process.exit(1);
});
