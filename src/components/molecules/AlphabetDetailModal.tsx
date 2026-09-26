'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaVolumeHigh,
  FaLightbulb,
  FaEarListen,
  FaArrowsSplitUpAndLeft,
  FaRotate,
} from 'react-icons/fa6';
import { AlphabetLetter } from '@/types/alphabet';
import { getAlphabetLetter, RHYME_GROUPS } from '@/data/alphabet';
import { AccentPreference } from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface AlphabetDetailModalProps {
  letter: AlphabetLetter | null;
  accent: AccentPreference;
  onClose: () => void;
  onSelectLetter: (letter: AlphabetLetter) => void;
  onPlayLetter: (letter: AlphabetLetter, slow?: boolean) => void;
  playingLetterChar: string | null;
}

export const AlphabetDetailModal: React.FC<AlphabetDetailModalProps> = ({
  letter,
  accent,
  onClose,
  onSelectLetter,
  onPlayLetter,
  playingLetterChar,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (letter) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [letter, onClose]);

  if (!letter) return null;

  const rhymeGroup = RHYME_GROUPS.find((rg) => rg.id === letter.rhymeGroup);
  const isPlayingThis = playingLetterChar === letter.char;

  const handlePlayWord = () => {
    playSpeech({
      text: letter.exampleWord,
      accent,
      rate: 0.88,
    });
  };

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4'>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='fixed inset-0 bg-black/60 backdrop-blur-xs'
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className='relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)',
          }}
        >
          {/* Header */}
          <div
            className='flex items-center justify-between border-b px-5 py-4'
            style={{ borderColor: 'var(--border)' }}
          >
            <div className='flex items-center gap-2.5'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-serif text-2xl font-bold'>
                {letter.char}
              </div>
              <div>
                <h3 className='text-base font-bold leading-tight'>
                  Letter &ldquo;{letter.char}&rdquo; ({letter.name})
                </h3>
                <p className='text-xs text-muted-foreground'>
                  NATO: <span className='font-semibold text-foreground'>{letter.nato}</span>
                  {letter.ipaUk && (
                    <span className='ml-2 text-amber-600 dark:text-amber-400'>
                      (UK: {letter.ipaUk})
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className='rounded-lg p-2 text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800 transition-colors'
              aria-label='Close letter modal'
            >
              <FaXmark className='h-4 w-4' />
            </button>
          </div>

          {/* Modal Content */}
          <div className='p-5 space-y-4 max-h-[80vh] overflow-y-auto'>
            {/* Audio Controls Box */}
            <div
              className='rounded-xl border p-4 space-y-3'
              style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-xs font-bold text-foreground'>Letter Audio Playback</div>
                  <div className='text-[11px] text-muted-foreground'>
                    IPA: <span className='font-mono font-bold text-teal-600 dark:text-teal-400'>{letter.ipa}</span>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  {/* Normal Speed */}
                  <button
                    onClick={() => onPlayLetter(letter, false)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                      isPlayingThis
                        ? 'bg-teal-600 text-white animate-pulse'
                        : 'bg-teal-500 text-white hover:bg-teal-600'
                    }`}
                  >
                    <FaVolumeHigh className='h-3 w-3' />
                    <span>Dengarkan ({letter.char})</span>
                  </button>

                  {/* Slow Motion (0.65x) */}
                  <button
                    onClick={() => onPlayLetter(letter, true)}
                    className='inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
                    style={{ borderColor: 'var(--border)' }}
                    title='Dengar dengan tempo lambat (0.65x) untuk memperhatikan artikulasi bibir & lidah'
                  >
                    <FaRotate className='h-2.5 w-2.5 opacity-60' />
                    <span>0.65x</span>
                  </button>
                </div>
              </div>

              {/* Word Example */}
              <div
                className='flex items-center justify-between pt-2 border-t'
                style={{ borderColor: 'var(--border)' }}
              >
                <div className='text-xs text-muted-foreground'>
                  Contoh Kata:{' '}
                  <span className='font-bold text-foreground'>{letter.exampleWord}</span>{' '}
                  <span className='font-mono text-[11px]'>({letter.exampleIpa})</span>
                </div>
                <button
                  onClick={handlePlayWord}
                  className='inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline'
                >
                  <FaVolumeHigh className='h-2.5 w-2.5' />
                  <span>Putar Kata</span>
                </button>
              </div>
            </div>

            {/* Articulation Tip */}
            <div
              className='rounded-xl border p-3.5 space-y-1.5'
              style={{
                borderColor: 'var(--border)',
                background: 'var(--card)',
              }}
            >
              <div className='flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400'>
                <FaLightbulb className='h-3 w-3' />
                <span>Tips Pengenalan Akustik & Artikulasi</span>
              </div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                {letter.tip}
              </p>
            </div>

            {/* Rhyme Group Family */}
            {rhymeGroup && (
              <div
                className='rounded-xl border p-3.5 space-y-2'
                style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1.5 text-xs font-bold text-foreground'>
                    <FaEarListen className='h-3 w-3 text-teal-600 dark:text-teal-400' />
                    <span>Keluarga Rima {rhymeGroup.ipa} ({rhymeGroup.name})</span>
                  </div>
                  <span className='text-[10px] text-muted-foreground'>
                    Bunyi vokal berima sama
                  </span>
                </div>

                <p className='text-[11px] text-muted-foreground leading-relaxed'>
                  {rhymeGroup.description}
                </p>

                <div className='flex flex-wrap gap-1.5 pt-1'>
                  {rhymeGroup.letters.map((c) => {
                    const lObj = getAlphabetLetter(c);
                    if (!lObj) return null;
                    const isSelected = lObj.char === letter.char;
                    return (
                      <button
                        key={c}
                        onClick={() => onSelectLetter(lObj)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-teal-500 text-white border-teal-600 shadow-xs'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{ borderColor: isSelected ? undefined : 'var(--border)' }}
                      >
                        <span>{lObj.char}</span>
                        <span className='text-[10px] opacity-75 font-normal'>
                          ({lObj.name})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* High Confusion Partners */}
            {letter.confusionPartners.length > 0 && (
              <div
                className='rounded-xl border p-3.5 space-y-2'
                style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
              >
                <div className='flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400'>
                  <FaArrowsSplitUpAndLeft className='h-3 w-3' />
                  <span>Sering Tertukar Dengan (IELTS Trap)</span>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1'>
                  {letter.confusionPartners.map((partnerChar) => {
                    const partner = getAlphabetLetter(partnerChar);
                    if (!partner) return null;
                    return (
                      <div
                        key={partnerChar}
                        className='flex items-center justify-between rounded-lg border p-2 text-xs'
                        style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
                      >
                        <div className='flex items-center gap-2'>
                          <span className='font-serif font-bold text-base text-foreground'>
                            {partner.char}
                          </span>
                          <div>
                            <div className='font-mono font-medium text-teal-600 dark:text-teal-400 text-[11px]'>
                              {partner.ipa}
                            </div>
                            <div className='text-[10px] text-muted-foreground'>
                              {partner.nato}
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center gap-1'>
                          <button
                            onClick={() => onPlayLetter(partner, false)}
                            className='p-1.5 rounded-md bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white transition-colors'
                            title={`Dengar bunyi huruf ${partner.char}`}
                          >
                            <FaVolumeHigh className='h-2.5 w-2.5' />
                          </button>
                          <button
                            onClick={() => onSelectLetter(partner)}
                            className='px-1.5 py-1 text-[10px] font-semibold rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
                          >
                            Buka
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AlphabetDetailModal;
