---
name: commute-audio
description: >-
  Pre-generate, broadcast-master, and maintain Natural Human-Like Tri-Voice Duet
  Microsoft Neural MP3 audio clips for /commute AND Flashcards/Anki/Quiz playback
  under public/audio/commute/{cardId}/. Use when generating commute audio, tuning
  pacing/voices/FFmpeg mastering, or debugging Neural MP3 playback across the app.
---

# Commute & App-Wide Natural Audio Skill

Follow the full operational guide in [COMMUTE_AUDIO_WORKFLOW.md](references/COMMUTE_AUDIO_WORKFLOW.md) and `other-english-materials/AUDIOBOOK_RULES.md`.

## 1. Natural Tri-Voice Duet & Pacing Contract (`natural-v3`)
- **EN Vocab (`word.mp3`)**: `en-US-BrianNeural` (`rate: -14%`, `pitch: +0Hz`)
- **EN Collocations (`collocations.mp3`)**: `en-US-BrianNeural` (`rate: -16%`, `pitch: +0Hz`), **split per frasa** + akhiran titik `.` (intonasi turun tenang) + **jeda `950ms` antar-frasa**.
- **ID Meaning & Tips (`meaning.mp3`, `tips.mp3`)**: `id-ID-ArdiNeural` (`rate: -12%`, `pitch: +0Hz`), **clause chunking** + **jeda napas `550ms`**.
- **EN Example (`example.mp3`)**: `en-US-AvaMultilingualNeural` (`rate: -14%`, `pitch: +0Hz`), **clause chunking** + **jeda napas `550ms`**.
- **Silences**: `550ms` inter-clause breathing pause, `900ms` inter-speaker turn, `950ms` inter-collocation phrase pause, `1200ms` shadowing pause, `3500–4000ms` Active Recall pause.
- **Broadcast Mastering (FFmpeg Auto-Detect)**:
  - Otomatis aktif jika `ffmpeg` tersedia (`--master` untuk wajib, `--no-master` untuk lewati): `highpass=80` → Warmth EQ (`+3dB @ 160Hz`, `-1.5dB @ 400Hz`, `+1.5dB @ 3.5kHz`) → De-Esser (`-2.5dB @ 7kHz`) → Compressor → subtle studio room `aecho=0.8:0.88:18:0.08` → `loudnorm=-16 LUFS`.
  - **Wajib Format Seragam**: `-ar 24000 -b:a 48k -ac 1 -c:a libmp3lame -write_xing 0 -id3v2_version 0` agar tetap `24kHz / 48kbps / Mono` CBR MPEG-2 Layer III (`144 bytes / 24ms` per frame, `bytes % 144 === 0`) dan 100% kompatibel dengan `src/utils/mp3Stitcher.ts`.

## 2. Authoring & Clause/Collocations Rules (Compound Engineering)
- **Collocations (`Common Collocations` / `Kolokasi Emas IELTS`)**:
  - ✅ Pisahkan antar-kolokasi dengan koma `,`, titik koma `;`, newline `\n`, atau bullet `•` (`pursue higher education, pursue a career`).
  - ❌ Jangan menaruh koma di tengah satu frasa kolokasi tunggal karena akan terpecah menjadi 2 klip terpisah.
- **Natural Clause Chunking (`meaning`, `example`, `tips`)**:
  - `scripts/generate-commute-audio.mjs` memecah teks panjang pada batas kalimat (`. ! ?`), `;`, atau koma/dash pada kalimat > 8 kata (min. 4 kata per sisi) lalu menyisipkan silent MP3 frames `550ms` sebelum Broadcast Mastering.
  - **Pronunciation-Safe Indonesian**: Sanitasi otomatis `nggak`/`gak` → `tidak`, `mendadak` → `tiba-tiba`, dan cegah `...` tepat setelah 1 kata pendek (`Tenang...` → `Tenang,`).
- **App-Wide Neural MP3-First Playback (Flashcards / Anki / Quiz / Mapping)**:
  - `src/utils/neuralAudioCache.ts` memuat `/audio/commute/manifest.json` 1x per sesi.
  - `useSpeechPlayback({ cardId })` otomatis memakai urutan: **1) Static mastered MP3** (`/audio/commute/{cardId}/{field}.mp3` untuk aksen US) → **2) Dynamic `/api/commute/tts`** (di-cache di memori) → **3) Web Speech API** (fallback offline).
  - Saat menambah komponen kartu baru yang memakai `useSpeechPlayback`, selalu teruskan `cardId` (atau `overrideCardId` di `getAudioButtonProps`) agar langsung mendapat suara Neural statis.

## 3. Checksum-Aware Mac Generation Commands
```bash
# Preview up-to-date vs stale/missing clips (no TTS calls)
npm run commute:generate -- --all --dry-run

# Staged test on 5 sample cards first (always verify audio & size before --all)
npm run commute:generate -- --ids=<id1>,<id2>,<id3>,<id4>,<id5> --force

# Generate/update ALL flashcards (SHA-256 checksum natural-v3|mastered|..., checkpoints every 50 clips)
npm run commute:generate -- --all

# Specific newly-added card IDs (auto-mastered if ffmpeg exists)
npm run commute:generate -- --ids=<cardId1>,<cardId2>

# Next 40 New cards / Hard & Retry cards
npm run commute:generate -- --limit=40 --filter=new
npm run commute:generate -- --limit=50 --filter=hard

# Opt out of FFmpeg mastering (raw Edge TTS only)
npm run commute:generate -- --ids=<cardId1> --no-master
```

## 4. Verification & Hygiene
- Always verify `Failed=0`, `Mastering=ON` (when `ffmpeg` installed), exact frame alignment (`bytes % 144 === 0`), and folder size (`du -sh public/audio/commute`, target ~180–220 MB total).
- Never auto-commit application code (`src/` or `scripts/`); generated audio assets & `manifest.json` may be committed when requested.
