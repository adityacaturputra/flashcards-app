# Commute Audio Studio & Agentic Generation Workflow (COMMUTE_AUDIO_WORKFLOW.md)

This document is the **Single Source of Truth** for AI agents and engineers operating, generating, and maintaining the **Hands-Free Commute Audio Vocabulary Studio** (`/commute`).

---

## 🎯 Purpose & Architecture Overview

Designed for **~2–2.5 hour daily motorcycle round-trip commutes (~1h berangkat + ~1h pulang)** on **iOS Safari** while **Google Maps / Apple Maps** is open in the foreground:

1. **iOS Safari Background-Safe Playback**:
   - Individual MP3 clips (`24kHz / 48kbps / Mono`, 144 bytes / 24ms frame) are stitched client-side with valid silent MP3 frames (`src/utils/mp3Stitcher.ts`) into **one continuous MP3 `Blob`**.
   - Played via HTML5 `<audio>` with `navigator.audioSession.type = 'playback'` and full **Media Session API** (`navigator.mediaSession`) controls (Lock Screen / Control Center / Bluetooth helmet intercom).
2. **Mac Pre-Generated Neural MP3s by Card ID (Zero Robot, Zero 403 on Vercel)**:
   ```text
   public/audio/commute/
   ├── manifest.json                 # Auto-indexed cardIds & available fields
   └── {cardId}/                     # 24-char hex _id from flashcards.json
       ├── word.mp3                  # EN Host (en-US-BrianNeural, -12%, +0Hz)
       ├── meaning.mp3               # ID Host (id-ID-ArdiNeural, -10%, +0Hz)
       ├── example.mp3               # EN Co-Host (en-US-AvaMultilingualNeural, -14%, +0Hz)
       ├── collocations.mp3          # EN Host (en-US-BrianNeural, -16%, +0Hz, split per phrase + 950ms pause)
       └── tips.mp3                  # ID Host (id-ID-ArdiNeural, -10%, +0Hz)
   ```
3. **TTS Provider Factory (`src/services/tts/`)**:
   - Client first fetches static `/audio/commute/{cardId}/{field}.mp3` whenever listed in `manifest.json`.
   - For un-generated cards, falls back to `POST /api/commute/tts` backed by `TtsProviderFactory`:
     - Default Free Chain: `EdgeTtsProvider` → `GoogleFreeTtsProvider`.
     - Optional Cloud Chain (when `AZURE_SPEECH_KEY` & `AZURE_SPEECH_REGION` exist): `AzureSpeechProvider` → `EdgeTtsProvider` → `GoogleFreeTtsProvider`.

---

## 🎙️ Tri-Voice Duet & Pacing Standards (Aligned with `AUDIOBOOK_RULES.md`)

| Field / Role | Neural Voice | Rate | Pitch | Post-Segment Silence |
| :--- | :--- | :---: | :---: | :---: |
| **`word` (EN Vocab)** | `en-US-BrianNeural` *(or accent-matched)* | `-12%` | `+0Hz` | `650ms` (1st) / `900ms` (2nd) / `3500–4000ms` (Active Recall) |
| **`meaning` (ID Arti)** | `id-ID-ArdiNeural` | `-10%` | `+0Hz` | `900ms` (inter-speaker breathing space) |
| **`example` (EN Contoh)** | `en-US-AvaMultilingualNeural` | `-14%` | `+0Hz` | `1200ms` (shadowing pause) |
| **`collocations` (EN)** | `en-US-BrianNeural` | `-16%` | `+0Hz` | `950ms` inter-phrase + `900ms` post-segment |
| **`tips` (ID Tips)** | `id-ID-ArdiNeural` | `-10%` | `+0Hz` | `1100ms` |

### Collocations Natural-Pause Synthesis Rules (`collocations-v2`)
- **Split Before Markdown Stripping**: Always split raw `Common Collocations` / `Kolokasi Emas IELTS` on `\n`, `•`, `;`, or `,` *before* `stripMarkdown` collapses newlines; strip leading bullets/numbering (`- `, `* `, `1. `).
- **Calm Falling Intonation**: Ensure every phrase ends with `.`, `!`, or `?` (append `.` if missing) so `en-US-BrianNeural` drops pitch cleanly per collocation instead of reading a rushed comma list.
- **Frame-Accurate Stitching**: Synthesize each phrase at `rate: -16%`, strip ID3v2/ID3v1 tags, and interleave `950ms` of valid silent MPEG-2 Layer III frames (`144 bytes / 24ms`, header `0xff 0xf3 0x64 0xc4`) between phrases into a single `collocations.mp3`.
- **Checksum Versioning & Dynamic Fallback Parity**:
  - Generator checksum includes `collocations-v2|pause=950|` so pacing/format updates trigger targeted regeneration of `collocations.mp3` only.
  - Runtime fallback (`useCommuteEpisodeGenerator.ts`) fetches pre-stitched static `collocations.mp3` in 1 request when present in `manifest.json`, and falls back to per-phrase `/api/commute/tts` + client-side `950ms` silent stitching when absent.

### Mandatory Text Sanitization Rules
- **XML/SSML Safety**: Replace `&` with `dan` (ID) or `and` (EN); strip `<` and `>`; never emit raw `<break .../>` tags.
- **Pronunciation-Safe Indonesian**: Replace glottal-stop words clipped by Indonesian TTS (`nggak`/`gak` → `tidak`, `mendadak` → `tiba-tiba`).
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
