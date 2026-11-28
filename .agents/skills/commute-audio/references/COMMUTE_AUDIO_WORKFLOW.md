# Commute Audio Studio & Agentic Generation Workflow (COMMUTE_AUDIO_WORKFLOW.md)

This document is the **Single Source of Truth** for AI agents and engineers operating, generating, and maintaining the **Hands-Free Commute Audio Vocabulary Studio** (`/commute`).

---

## 🎯 Purpose & Architecture Overview

Designed for **~2–2.5 hour daily motorcycle round-trip commutes (~1h berangkat + ~1h pulang)** on **iOS Safari** while **Google Maps / Apple Maps** is open in the foreground:

1. **iOS Safari Background-Safe Playback**:
   - Individual MP3 clips (`24kHz / 48kbps / Mono`, 144 bytes / 24ms frame) are stitched client-side with valid silent MP3 frames (`src/utils/mp3Stitcher.ts`) into **one continuous MP3 `Blob`**.
   - Played via HTML5 `<audio>` with `navigator.audioSession.type = 'playback'` and full **Media Session API** (`navigator.mediaSession`) controls (Lock Screen / Control Center / Bluetooth helmet intercom).
2. **Mac Pre-Generated Broadcast-Mastered Neural MP3s by Card ID (Zero Robot, Zero 403 on Vercel)**:
   ```text
   public/audio/commute/
   ├── manifest.json                 # Auto-indexed cardIds & SHA-256 checksums (natural-v3)
   └── {cardId}/                     # 24-char hex _id from flashcards.json
       ├── word.mp3                  # EN Host (en-US-BrianNeural, -14%, +0Hz, FFmpeg -16 LUFS)
       ├── meaning.mp3               # ID Host (id-ID-ArdiNeural, -12%, +0Hz, 550ms clause pauses)
       ├── example.mp3               # EN Co-Host (en-US-AvaMultilingualNeural, -14%, +0Hz, 550ms clause pauses)
       ├── collocations.mp3          # EN Host (en-US-BrianNeural, -16%, +0Hz, 950ms inter-phrase pauses)
       └── tips.mp3                  # ID Host (id-ID-ArdiNeural, -12%, +0Hz, 550ms clause pauses)
   ```
3. **App-Wide Neural MP3-First Playback (`src/utils/neuralAudioCache.ts` + `src/hooks/useSpeechPlayback.ts`)**:
   - Flashcards (`FlashcardComponent`), Anki Review/History (`AnkiCardDetailModal`, `AnkiTodayReviewedBox`, `AnkiHistoryTimelineList`), Quiz (`QuizQuestionCard`), and Mapping share one unified playback priority chain:
     1. **Static Broadcast-Mastered MP3** (`/audio/commute/{cardId}/{field}.mp3`) via lazy singleton `manifest.json` (when `cardId` & `accent === 'us'` match).
     2. **Dynamic `/api/commute/tts`** (`TtsProviderFactory`) with LRU-bounded in-memory Blob URL cache (for non-US accents, individual chips/collocations, quiz sentences, or un-generated cards).
     3. **Offline Web Speech API (`playSpeech`)** automatic fallback if offline or API unavailable.
4. **TTS Provider Factory (`src/services/tts/`)**:
   - Client first fetches static `/audio/commute/{cardId}/{field}.mp3` whenever listed in `manifest.json`.
   - For un-generated cards, falls back to `POST /api/commute/tts` backed by `TtsProviderFactory`:
     - Default Free Chain: `EdgeTtsProvider` → `GoogleFreeTtsProvider`.
     - Optional Cloud Chain (when `AZURE_SPEECH_KEY` & `AZURE_SPEECH_REGION` exist): `AzureSpeechProvider` → `EdgeTtsProvider` → `GoogleFreeTtsProvider`.

---

## 🎙️ Tri-Voice Duet, Clause Pauses & Broadcast Mastering (`natural-v3`)

| Field / Role | Neural Voice | Rate | Pitch | Intra-Clip Pause | Post-Segment Silence |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **`word` (EN Vocab)** | `en-US-BrianNeural` *(or accent-matched)* | `-14%` | `+0Hz` | — | `650ms` (1st) / `900ms` (2nd) / `3500–4000ms` (Active Recall) |
| **`meaning` (ID Arti)** | `id-ID-ArdiNeural` | `-12%` | `+0Hz` | `550ms` per clause | `900ms` (inter-speaker breathing space) |
| **`example` (EN Contoh)** | `en-US-AvaMultilingualNeural` | `-14%` | `+0Hz` | `550ms` per clause | `1200ms` (shadowing pause) |
| **`collocations` (EN)** | `en-US-BrianNeural` | `-16%` | `+0Hz` | `950ms` per phrase | `900ms` post-segment |
| **`tips` (ID Tips)** | `id-ID-ArdiNeural` | `-12%` | `+0Hz` | `550ms` per clause | `1100ms` |

### Natural Clause Chunking & FFmpeg Studio Broadcast Mastering
- **Sentence & Clause Chunking (`meaning`, `example`, `tips`)**:
  - Split long narration on `. ! ?`, `;`, and long comma/em-dash spans (> 8 words, minimum 4 words per side).
  - Synthesize each clause, strip ID3 tags, and stitch with `550ms` silent MP3 frames before mastering so the narrator breathes naturally.
- **FFmpeg Broadcast Mastering Chain (Auto-Enabled when `ffmpeg` exists; `--master` / `--no-master`)**:
  - Applies `AUDIOBOOK_RULES.md` Section 2B: `highpass=f=80`, Warmth EQ (`+3dB @ 160Hz`, `-1.5dB @ 400Hz`, `+1.5dB @ 3.5kHz`), De-Esser (`-2.5dB @ 7kHz`), Broadcast Compressor (`threshold=-20dB:ratio=3:attack=5:release=50`), subtle studio room ambience (`aecho=0.8:0.88:18:0.08`), and `loudnorm=I=-16:TP=-1.5:LRA=11`.
  - **Strict MP3 Stitcher Compatibility**: Re-encodes with `-ar 24000 -b:a 48k -ac 1 -c:a libmp3lame -write_xing 0 -id3v2_version 0` so every file stays exact `144 bytes / 24ms` MPEG-2 Layer III CBR (`bytes % 144 === 0`, sync header `ff f3 64 c4`) with zero clicks in `mp3Stitcher.ts`.
- **Collocations Natural-Pause Synthesis Rules (`collocations-v3`)**:
  - **Split Before Markdown Stripping**: Always split raw `Common Collocations` / `Kolokasi Emas IELTS` on `\n`, `•`, `;`, or `,` *before* `stripMarkdown` collapses newlines; strip leading bullets/numbering (`- `, `* `, `1. `).
  - **Calm Falling Intonation**: Ensure every phrase ends with `.`, `!`, or `?` (append `.` if missing) so `en-US-BrianNeural` drops pitch cleanly per collocation.
  - **Checksum Versioning**: Generator checksum includes `natural-v3|mastered|...` so raw/older clips are cleanly detected for incremental upgrade without re-generating already-mastered clips.

### Mandatory Text Sanitization Rules
- **XML/SSML Safety**: Replace `&` with `dan` (ID) or `and` (EN); strip `<` and `>`; never emit raw `<break .../>` tags.
- **Pronunciation-Safe Indonesian**: Replace glottal-stop words clipped by Indonesian TTS (`nggak`/`gak` → `tidak`, `mendadak` → `tiba-tiba`) and replace `...` right after a single short word (`Tenang...` → `Tenang,`).
- **Markdown Heading Guard**: When `dynamicFields["Arti Utama / Definisi"]` is absent, skip `#` heading lines in `card.answer` and use the first real content paragraph.

---

## 🤖 Agentic Generation Protocol (Mac CLI)

When the user asks an agent to pre-generate commute audio for new/hard/category cards (or right after adding flashcards via `FLASHCARD_WORKFLOW.md`):

1. **Run the Checksum-Aware Incremental Generator** (computes 12-char SHA-256 of `voice|rate|pitch|sanitizedText` per `(cardId, field)`, skips up-to-date clips, automatically regenerates edited cards, and checkpoints `public/audio/commute/manifest.json` every 50 clips):
   ```bash
   # Preview how many clips are up-to-date vs need update (no TTS calls)
   npm run commute:generate -- --all --dry-run

   # Generate/update ALL flashcards in flashcards.json (resumable & checksum-based)
   npm run commute:generate -- --all

   # Generate next 40 New cards (default US Tri-Voice Duet)
   npm run commute:generate -- --limit=40 --filter=new

   # Generate specific card IDs just added to flashcards.json
   npm run commute:generate -- --ids=6904a0010000000000000001,6904a0010000000000000002

   # Generate Hard & Retry cards
   npm run commute:generate -- --limit=50 --filter=hard

   # Force regenerate existing cards (e.g. after updating pacing/voices)
   npm run commute:generate -- --limit=20 --filter=new --force
   ```
2. **Verify Zero Failures & Reasonable Repo Footprint**:
   - Confirm `Failed=0` in CLI output.
   - Check folder size with `du -sh public/audio/commute` (~90–140 KB per card).
3. **Commit Policy**:
   - ✅ Pure generated audio assets + `public/audio/commute/manifest.json` count as **data updates** and may be committed when requested.
   - ❌ Application code edits (`src/components/`, `src/hooks/`, `src/services/`, `src/utils/`) must NEVER be auto-committed without explicit user approval.

---

## 🧠 Evidence-Based Session Presets

1. **Pimsleur Micro-Batch (Default — Berangkat)**:
   - Splits deck into **5-card batches** → Round 1 (Intro & Context) → Round 2 (Shuffled Active Recall with 3.5s silence) → Round 3 (Interleaved Spiral Review from previous batches) → Final Consolidation Sweep.
2. **Quick Recall Quiz (Pulang — 1-Tap from History Banner)**:
   - Direct Active Recall (`EN Word → 4.0s silence → ID Meaning + EN Example`) using the exact card IDs saved in `localStorage` from the morning session.
3. **Relaxed Podcast (Heavy Traffic / Fatigue)**:
   - Continuous passive listening flow without quiz pauses.
