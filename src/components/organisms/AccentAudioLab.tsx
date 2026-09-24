'use client';
import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaVolumeHigh,
  FaStop,
  FaPlay,
  FaHeadphones,
  FaRadio,
  FaArrowUpRightFromSquare,
  FaSliders,
  FaCodeCompare,
  FaCircleInfo,
  FaLightbulb,
} from 'react-icons/fa6';
import {
  IELTS_ACCENT_ITEMS,
  CROSS_ACCENT_COMPARISONS,
  AccentItem,
} from '@/data/ielts/accents';
import { playSpeech, stopSpeech } from '@/utils/speechSynthesis';

export const AccentAudioLab: React.FC = () => {
  const componentInstanceId = useId();
  const [selectedAccentId, setSelectedAccentId] = useState<string>('british-rp');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [selectedComparisonWord, setSelectedComparisonWord] = useState<string>('water');

  const activeAccent: AccentItem =
    IELTS_ACCENT_ITEMS.find((a) => a.id === selectedAccentId) ||
    IELTS_ACCENT_ITEMS[0];

  const activeComparison =
    CROSS_ACCENT_COMPARISONS.find((c) => c.word === selectedComparisonWord) ||
    CROSS_ACCENT_COMPARISONS[0];

  const handlePlay = (
    key: string,
    text: string,
    locale: string,
    customRate?: number
  ) => {
    if (playingKey === key) {
      stopSpeech();
      setPlayingKey(null);
      return;
    }

    setPlayingKey(key);
    playSpeech({
      text,
      lang: locale,
      rate: customRate ?? playbackSpeed,
      onStart: () => setPlayingKey(key),
      onEnd: () => setPlayingKey((curr) => (curr === key ? null : curr)),
      onError: () => setPlayingKey((curr) => (curr === key ? null : curr)),
    });
  };

  return (
    <section
      aria-label='IELTS Multi-Accent Audio Laboratory'
      className='my-6 rounded-2xl sm:rounded-3xl border p-4 sm:p-6 lg:p-7 shadow-sm transition-all space-y-6'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      {/* Header Bar: Title, Badge, and Speed Controls */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/80'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <span className='inline-flex p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400'>
              <FaHeadphones className='h-4 w-4 sm:h-5 sm:w-5' />
            </span>
            <div>
              <h3 className='text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2'>
                <span>IELTS Multi-Accent Audio Laboratory</span>
                <span className='text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'>
                  Interactive Audio
                </span>
              </h3>
              <p className='text-xs text-muted-foreground'>
                Dengarkan langsung perbedaan 5 ragam aksen resmi IELTS dengan penutur asli dan simulasi fonetik
              </p>
            </div>
          </div>
        </div>

        {/* Speed Switcher */}
        <div className='flex items-center gap-2 self-start sm:self-auto bg-muted/60 p-1 rounded-xl border border-border/60'>
          <FaSliders className='h-3 w-3 ml-2 text-muted-foreground hidden sm:block' />
          <span className='text-xs font-medium text-muted-foreground pl-1 hidden sm:inline'>
            Kecepatan:
          </span>
          <button
            type='button'
            onClick={() => setPlaybackSpeed(0.75)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              playbackSpeed === 0.75
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title='0.75x: Mode Latihan Lambat untuk Analisis Artikulasi Bunyi'
          >
            0.75x (Lambat)
          </button>
          <button
            type='button'
            onClick={() => setPlaybackSpeed(1.0)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              playbackSpeed === 1.0
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title='1.0x: Kecepatan Normal Ujian IELTS Asli'
          >
            1.0x (Normal)
          </button>
        </div>
      </div>

      {/* Accent Selector Tabs */}
      <div className='space-y-2'>
        <div className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
          Pilih Ragam Aksen yang Ingin Dipelajari:
        </div>
        <div
          role='tablist'
          aria-label='Pilihan Aksen Bahasa Inggris'
          className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2'
        >
          {IELTS_ACCENT_ITEMS.map((item) => {
            const isActive = item.id === selectedAccentId;
            return (
              <button
                key={item.id}
                role='tab'
                aria-selected={isActive}
                onClick={() => {
                  setSelectedAccentId(item.id);
                  stopSpeech();
                  setPlayingKey(null);
                }}
                className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'border-purple-500 bg-purple-500/10 shadow-sm ring-2 ring-purple-500/30'
                    : 'border-border bg-card/60 hover:bg-muted/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className='flex items-center justify-between w-full'>
                  <span className='text-lg'>{item.flag}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {item.locale}
                  </span>
                </div>
                <div className='font-bold text-xs sm:text-sm text-foreground line-clamp-1'>
                  {item.shortName}
                </div>
                <div className='text-[10px] text-muted-foreground line-clamp-1'>
                  {item.broadcaster.split('/')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Accent Detail Panel */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeAccent.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className='space-y-5 rounded-2xl border p-4 sm:p-6 bg-muted/20 border-border'
        >
          {/* Accent Meta Info */}
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-border/70'>
            <div>
              <div className='flex items-center gap-2 flex-wrap'>
                <span className='text-2xl'>{activeAccent.flag}</span>
                <h4 className='text-base sm:text-lg font-bold text-foreground'>
                  {activeAccent.name}
                </h4>
                <span className='text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300'>
                  Sumber: {activeAccent.broadcaster}
                </span>
              </div>
              <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
                {activeAccent.phoneticSummary}
              </p>
            </div>
            <div className='text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl self-start md:self-auto'>
              Frekuensi Ujian: {activeAccent.frequencyInIelts}
            </div>
          </div>

          {/* Key Phonetic Characteristics List */}
          <div className='space-y-1.5'>
            <div className='text-xs font-bold text-foreground flex items-center gap-1.5'>
              <FaCircleInfo className='h-3 w-3 text-purple-600 dark:text-purple-400' />
              <span>Ciri Khas Bunyi yang Wajib Diperhatikan Telinga Anda:</span>
            </div>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground'>
              {activeAccent.detailedKeyTraits.map((trait, idx) => (
                <li
                  key={idx}
                  className='rounded-xl border border-border/60 bg-card p-2.5 leading-relaxed'
                >
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          {/* Contrast Words Section (Interactive Buttons) */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <div className='text-xs font-bold text-foreground flex items-center gap-1.5'>
                <FaVolumeHigh className='h-3.5 w-3.5 text-purple-600 dark:text-purple-400' />
                <span>Contoh Kata Kunci (Klik untuk Mendengarkan Bunyi Aslinya):</span>
              </div>
              <span className='text-[11px] text-muted-foreground'>
                Speed: {playbackSpeed}x
              </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5'>
              {activeAccent.contrastWords.map((cw) => {
                const key = `${componentInstanceId}-word-${activeAccent.id}-${cw.word}`;
                const isPlaying = playingKey === key;
                return (
                  <div
                    key={cw.word}
                    className={`flex flex-col justify-between p-3 rounded-xl border transition-all ${
                      isPlaying
                        ? 'border-purple-500 bg-purple-500/15 shadow-sm ring-2 ring-purple-400/40'
                        : 'border-border bg-card hover:border-purple-500/40'
                    }`}
                  >
                    <div>
                      <div className='flex items-center justify-between'>
                        <span className='font-bold text-sm sm:text-base text-foreground'>
                          {cw.word}
                        </span>
                        <span className='text-xs font-mono text-purple-600 dark:text-purple-400'>
                          {cw.ipa}
                        </span>
                      </div>
                      <p className='text-[11px] text-muted-foreground mt-1 leading-snug'>
                        {cw.note}
                      </p>
                    </div>

                    <button
                      type='button'
                      onClick={() =>
                        handlePlay(key, cw.audioText || cw.word, activeAccent.locale)
                      }
                      className={`mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-secondary text-secondary-foreground hover:bg-purple-600 hover:text-white'
                      }`}
                      title={`Putar kata "${cw.word}" dalam aksen ${activeAccent.name}`}
                    >
                      {isPlaying ? (
                        <>
                          <FaStop className='h-3 w-3 animate-pulse' />
                          <span>Berhenti</span>
                        </>
                      ) : (
                        <>
                          <FaPlay className='h-2.5 w-2.5' />
                          <span>Dengarkan</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sample Real IELTS Context Sentence */}
          <div className='rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 sm:p-5 space-y-3'>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300'>
                  🎙️ Contoh Kalimat Nyata Dalam Konteks Ujian IELTS
                </span>
              </div>
              <button
                type='button'
                onClick={() => {
                  const key = `${componentInstanceId}-sentence-${activeAccent.id}`;
                  handlePlay(
                    key,
                    activeAccent.sampleSentence.audioText ||
                      activeAccent.sampleSentence.text,
                    activeAccent.locale
                  );
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  playingKey === `${componentInstanceId}-sentence-${activeAccent.id}`
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400 animate-pulse'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {playingKey === `${componentInstanceId}-sentence-${activeAccent.id}` ? (
                  <>
                    <FaStop className='h-3 w-3' />
                    <span>Hentikan Kalimat</span>
                  </>
                ) : (
                  <>
                    <FaVolumeHigh className='h-3 w-3' />
                    <span>Putar Kalimat Audio ({playbackSpeed}x)</span>
                  </>
                )}
              </button>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm sm:text-base font-semibold text-foreground italic'>
                &ldquo;{activeAccent.sampleSentence.text}&rdquo;
              </div>
              <div className='text-xs font-mono text-purple-600 dark:text-purple-400'>
                {activeAccent.sampleSentence.ipa}
              </div>
              <div className='text-xs text-muted-foreground'>
                <strong>Terjemahan:</strong> {activeAccent.sampleSentence.translation}
              </div>
            </div>

            <div className='rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-foreground flex items-start gap-2'>
              <FaLightbulb className='h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5' />
              <div>
                <strong>Tips Taktis Penguji IELTS:</strong>{' '}
                {activeAccent.sampleSentence.examTip}
              </div>
            </div>
          </div>

          {/* Official Broadcast Audio Streams Links */}
          <div className='space-y-2 pt-1'>
            <div className='text-xs font-bold text-foreground flex items-center gap-1.5'>
              <FaRadio className='h-3.5 w-3.5 text-purple-600 dark:text-purple-400' />
              <span>Sumber Siaran Asli Langsung ({activeAccent.broadcaster}):</span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
              {activeAccent.broadcastLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:bg-muted/70 hover:border-purple-500/40 transition-all group'
                >
                  <div className='space-y-0.5 pr-2'>
                    <div className='flex items-center gap-1.5'>
                      <span className='font-bold text-xs sm:text-sm text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
                        {link.name}
                      </span>
                      <span className='text-[10px] font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground'>
                        {link.badge}
                      </span>
                    </div>
                    <p className='text-[11px] text-muted-foreground leading-snug line-clamp-1'>
                      {link.description}
                    </p>
                  </div>
                  <FaArrowUpRightFromSquare className='h-3.5 w-3.5 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 shrink-0' />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Cross-Accent Direct Word Comparison Matrix */}
      <div className='rounded-2xl border border-border bg-muted/15 p-4 sm:p-5 space-y-4'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3'>
          <div className='flex items-center gap-2'>
            <FaCodeCompare className='h-4 w-4 text-purple-600 dark:text-purple-400' />
            <h4 className='text-sm sm:text-base font-bold text-foreground'>
              Bandingkan 1 Kata di Antara Semua Aksen Secara Berurutan
            </h4>
          </div>

          {/* Word Selector Chips */}
          <div className='flex items-center gap-1.5 flex-wrap'>
            <span className='text-xs text-muted-foreground'>Pilih Kata Uji:</span>
            {CROSS_ACCENT_COMPARISONS.map((comp) => (
              <button
                key={comp.word}
                type='button'
                onClick={() => {
                  setSelectedComparisonWord(comp.word);
                  stopSpeech();
                  setPlayingKey(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedComparisonWord === comp.word
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {comp.word}
              </button>
            ))}
          </div>
        </div>

        <p className='text-xs text-muted-foreground'>
          Kata <strong>&ldquo;{activeComparison.word}&rdquo;</strong> ({activeComparison.meaning}). Dengarkan perbedaan intonasi, letupan huruf, dan pergeseran vokal saat berpindah antar aksen:
        </p>

        {/* 5 Accent Audio Cards Side-by-side */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5'>
          {activeComparison.variants.map((v) => {
            const key = `${componentInstanceId}-compare-${activeComparison.word}-${v.locale}`;
            const isPlaying = playingKey === key;
            return (
              <div
                key={v.locale}
                className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  isPlaying
                    ? 'border-purple-500 bg-purple-500/15 shadow-sm ring-2 ring-purple-400/40'
                    : 'border-border bg-card'
                }`}
              >
                <div>
                  <div className='flex items-center justify-between'>
                    <span className='text-base'>{v.flag}</span>
                    <span className='text-[10px] font-mono px-1 rounded bg-muted text-muted-foreground'>
                      {v.locale}
                    </span>
                  </div>
                  <div className='font-bold text-xs text-foreground mt-1'>
                    {v.locale.includes('GB')
                      ? 'British (RP)'
                      : v.locale.includes('US')
                      ? 'US (American)'
                      : v.locale.includes('AU')
                      ? 'Australian'
                      : v.locale.includes('ZA')
                      ? 'South African'
                      : 'Indian'}
                  </div>
                  <div className='text-xs font-mono text-purple-600 dark:text-purple-400 mt-0.5'>
                    {v.ipa}
                  </div>
                  <p className='text-[10px] text-muted-foreground mt-1.5 leading-snug'>
                    {v.transcriptionNote}
                  </p>
                </div>

                <button
                  type='button'
                  onClick={() =>
                    handlePlay(key, activeComparison.word, v.locale)
                  }
                  className={`mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-purple-600 text-white'
                      : 'bg-secondary text-secondary-foreground hover:bg-purple-600 hover:text-white'
                  }`}
                  title={`Dengarkan "${activeComparison.word}" dalam aksen ${v.locale}`}
                >
                  <FaVolumeHigh className={`h-3 w-3 ${isPlaying ? 'animate-bounce' : ''}`} />
                  <span>{isPlaying ? 'Putar...' : 'Dengarkan'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccentAudioLab;
