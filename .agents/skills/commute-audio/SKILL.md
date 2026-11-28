---
name: commute-audio
description: >-
  Pre-generate and maintain Tri-Voice Duet Microsoft Neural MP3 audio clips for
  the Hands-Free Commute Audio Studio (/commute) organized by flashcard ID under
  public/audio/commute/{cardId}/. Use when generating commute audio, tuning
  pacing/voices, or debugging /commute playback.
---

# Commute Audio Studio Skill

Follow the full operational guide in [COMMUTE_AUDIO_WORKFLOW.md](references/COMMUTE_AUDIO_WORKFLOW.md) and `other-english-materials/AUDIOBOOK_RULES.md`.

## 1. Tri-Voice Duet & Pacing Contract
- **EN Vocab (`word.mp3`)**: `en-US-BrianNeural` (`rate: -12%`, `pitch: +0Hz`)
- **EN Collocations (`collocations.mp3`)**: `en-US-BrianNeural` (`rate: -16%`, `pitch: +0Hz`), **split per frasa** + akhiran titik `.` (intonasi turun tenang) + **jeda `950ms` antar-frasa** (stitched silent MP3 frames).
- **ID Meaning & Tips (`meaning.mp3`, `tips.mp3`)**: `id-ID-ArdiNeural` (`rate: -10%`, `pitch: +0Hz`)
- **EN Example (`example.mp3`)**: `en-US-AvaMultilingualNeural` (`rate: -14%`, `pitch: +0Hz`)
- **Silences**: `900ms` inter-speaker turn, `950ms` inter-collocation phrase pause, `1200ms` shadowing pause, `3500–4000ms` Active Recall pause.
- **Format**: Uniform `24kHz / 48kbps / Mono` MPEG-2 Layer III (`144 bytes / 24ms` frame) stitched client-side into one continuous MP3 Blob for iOS Safari background playback alongside Maps.

## 2. Collocations Audio Rules (Compound Engineering)
- **Authoring Format (`Common Collocations` / `Kolokasi Emas IELTS`)**:
  - ✅ Pisahkan antar-kolokasi dengan koma `,`, titik koma `;`, newline `\n`, atau bullet `•` (contoh: `pursue higher education, pursue a career, pursue a dream`).
  - ❌ Jangan menaruh koma di tengah satu frasa kolokasi tunggal karena akan terpecah menjadi 2 klip terpisah.
- **Synthesis & Checksum Contract**:
  - `scripts/generate-commute-audio.mjs` memecah teks mentah **sebelum** `stripMarkdown` (agar `\n` & `•` tidak hilang), menyintesis tiap frasa dengan `rate: -16%`, menghapus tag ID3, lalu menyisipkan silent MP3 frames `950ms` antar-frasa ke satu file `collocations.mp3`.
  - Checksum memakai prefix versi (`collocations-v2|pause=950|...`) sehingga `npm run commute:generate -- --all` hanya me-regenerate klip `collocations.mp3` yang berubah tanpa menyentuh klip lain.
  - Fallback dinamis (`/api/commute/tts` di `useCommuteEpisodeGenerator.ts`) otomatis menerapkan split frasa + tempo `-16%` + jeda `950ms` yang sama untuk kartu yang belum ada di `manifest.json`.

## 3. Checksum-Aware Mac Generation Commands
```bash
# Preview up-to-date vs stale/missing clips (no TTS calls)
npm run commute:generate -- --all --dry-run

# Generate/update ALL flashcards (SHA-256 checksum per cardId/field, auto-checkpoints every 50 clips)
npm run commute:generate -- --all

# Next 40 New cards (skips unchanged checksums, updates public/audio/commute/manifest.json)
npm run commute:generate -- --limit=40 --filter=new

# Specific newly-added card IDs
npm run commute:generate -- --ids=<cardId1>,<cardId2>

# Hard & Retry cards
npm run commute:generate -- --limit=50 --filter=hard

# Force regenerate after voice/pacing changes
npm run commute:generate -- --limit=20 --filter=new --force
```

## 4. Verification & Hygiene
- Always verify `Failed=0` in generator output and inspect folder size with `du -sh public/audio/commute`.
- Static Neural MP3s in `public/audio/commute/` are served first by `useCommuteEpisodeGenerator`; `/api/commute/tts` (`TtsProviderFactory`) acts as automatic fallback for un-generated cards.
- Never auto-commit application code (`src/`); generated audio assets & `manifest.json` may be committed when requested.
