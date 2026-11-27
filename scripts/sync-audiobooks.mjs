#!/usr/bin/env node
/**
 * Sync 16 Next Level Stories audiobook MP3s and markdown scripts from
 * other-english-materials/ (gitignored personal vault) into public/ for Vercel static hosting.
 *
 * Usage: npm run sync:audiobooks
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_BASE = path.join(
  ROOT_DIR,
  'other-english-materials/englishvit/next-level-english'
);
const AUDIO_OUT_DIR = path.join(ROOT_DIR, 'public/audio/audiobooks');
const SCRIPT_OUT_DIR = path.join(ROOT_DIR, 'public/audiobooks/scripts');

const EPISODE_SOURCES = [
  {
    id: 'ep-01',
    folder: 'modul1-describing-your-career-or-study/audiobooks',
    mp3: '01-describing-your-career-or-study-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-02',
    folder: 'modul1-describing-your-career-or-study/audiobooks',
    mp3: '02-differences-between-perfect-and-perfect-continuous-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
  {
    id: 'ep-03',
    folder: 'modul2-stating-your-opinion-on-certain-issues/audiobooks',
    mp3: '01-stating-your-opinion-on-certain-issues-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-04',
    folder: 'modul2-stating-your-opinion-on-certain-issues/audiobooks',
    mp3: '02-grammar-usage-of-modal-auxiliary-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
  {
    id: 'ep-05',
    folder: 'modul3-telling-about-the-important-year-in-your-life/audiobooks',
    mp3: '01-telling-about-the-important-year-in-your-life-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-06',
    folder: 'modul3-telling-about-the-important-year-in-your-life/audiobooks',
    mp3: '02-grammar-usage-for-telling-past-story-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
  {
    id: 'ep-07',
    folder: 'modul4-trying-to-respond-the-latest-news-in-our-country/audiobooks',
    mp3: '01-trying-to-respond-the-latest-news-in-our-country-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-08',
    folder: 'modul4-trying-to-respond-the-latest-news-in-our-country/audiobooks',
    mp3: '02-grammar-usage-for-responding-to-the-news-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
  {
    id: 'ep-09',
    folder: 'modul5-presenting-your-future-dream-that-you-are-planning/audiobooks',
    mp3: '01-presenting-your-future-dream-that-you-are-planning-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-10',
    folder: 'modul5-presenting-your-future-dream-that-you-are-planning/audiobooks',
    mp3: '02-grammar-usage-for-present-continuous-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
  {
    id: 'ep-11',
    folder: 'modul6-telling-your-unforgettable-story-in-your-life/audiobooks',
    mp3: '01-telling-your-unforgettable-story-in-your-life-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-12',
    folder: 'modul6-telling-your-unforgettable-story-in-your-life/audiobooks',
    mp3: '02-grammar-usage-for-your-unforgettable-story-in-your-life-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
  {
    id: 'ep-13',
    folder: 'modul7-talking-about-plan-and-its-deadline/audiobooks',
    mp3: '01-talking-about-plan-and-its-deadline-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-14',
    folder: 'modul7-talking-about-plan-and-its-deadline/audiobooks',
    mp3: '02-talking-about-future-plan-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
  {
    id: 'ep-15',
    folder: 'modul8-describing-your-childhoods-dream-and-your-todays-dream/audiobooks',
    mp3: '01-describing-your-childhoods-dream-and-your-todays-dream-audiobook.mp3',
    script: 'audiobook-script-01.md',
  },
  {
    id: 'ep-16',
    folder: 'modul8-describing-your-childhoods-dream-and-your-todays-dream/audiobooks',
    mp3: '02-grammar-usage-for-telling-conditional-sentence-audiobook.mp3',
    script: 'audiobook-script-02.md',
  },
];

fs.mkdirSync(AUDIO_OUT_DIR, { recursive: true });
fs.mkdirSync(SCRIPT_OUT_DIR, { recursive: true });

let totalBytes = 0;
let syncedCount = 0;

for (const item of EPISODE_SOURCES) {
  const srcMp3 = path.join(SOURCE_BASE, item.folder, item.mp3);
  const srcScript = path.join(SOURCE_BASE, item.folder, item.script);
  const destMp3 = path.join(AUDIO_OUT_DIR, `${item.id}.mp3`);
  const destScript = path.join(SCRIPT_OUT_DIR, `${item.id}.md`);

  if (!fs.existsSync(srcMp3)) {
    throw new Error(`Missing MP3 source: ${srcMp3}`);
  }
  if (!fs.existsSync(srcScript)) {
    throw new Error(`Missing Script source: ${srcScript}`);
  }

  fs.copyFileSync(srcMp3, destMp3);
  fs.copyFileSync(srcScript, destScript);

  totalBytes += fs.statSync(destMp3).size;
  syncedCount += 1;
}

console.log(
  `Synced ${syncedCount} audiobook episodes (${(totalBytes / (1024 * 1024)).toFixed(2)} MB) to public/audio/audiobooks & public/audiobooks/scripts.`
);
