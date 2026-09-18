'use client';
import React, { useState } from 'react';
import {
  FaVolumeHigh,
  FaArrowRight,
  FaAward,
  FaWaveSquare,
} from 'react-icons/fa6';
import { CONNECTED_SPEECH_LESSONS, WEAK_FORMS_LIST } from '@/data/phonemics';
import { AccentPreference } from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface ConnectedSpeechLabProps {
  accent: AccentPreference;
}

export const ConnectedSpeechLab: React.FC<ConnectedSpeechLabProps> = ({ accent }) => {
  const [playingText, setPlayingText] = useState<string | null>(null);

  const handlePlay = (text: string, rate = 0.85) => {
    setPlayingText(text);
    playSpeech({
      text,
      accent,
      rate,
      onEnd: () => setPlayingText(null),
      onError: () => setPlayingText(null),
    });
  };

  return (
    <div className='space-y-8'>
      {/* Introduction Hero Card */}
      <div
        className='rounded-3xl border p-5 sm:p-7 space-y-3'
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className='flex items-center gap-2.5 text-primary'>
          <FaWaveSquare className='h-5 w-5' />
          <h3 className='text-base sm:text-lg font-bold'>
            Mengapa Connected Speech adalah Kunci IELTS Speaking Band 7.0–8.5?
          </h3>
        </div>
        <p className='text-xs sm:text-sm text-foreground/80 leading-relaxed'>
          Penutur asli bahasa Inggris tidak berbicara kata per kata seperti robot (*staccato*). Bahasa Inggris menganut sistem <strong>Stress-Timed Rhythm</strong>: kata-kata penting (kata isi) ditekan kuat dan jelas, sedangkan kata-kata fungsi tata bahasa dipercepat dan disusutkan menggunakan <strong>Schwa /ə/</strong> serta dihubungkan dengan jembatan suara (*linking*).
        </p>
      </div>

      {/* Section 1: Weak Forms & Schwa Interactive Reference */}
      <div
        className='rounded-3xl border p-5 sm:p-7 space-y-4'
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className='flex items-center justify-between flex-wrap gap-2 border-b pb-3 border-border/70'>
          <div className='flex items-center gap-2'>
            <span className='h-3 w-3 rounded-full bg-amber-500' />
            <h4 className='font-bold text-sm sm:text-base text-foreground'>
              Tabel 10 Weak Forms Paling Umum di IELTS
            </h4>
          </div>
          <span className='text-xs text-muted-foreground'>
            Klik tombol audio untuk mendengar kalimatnya
          </span>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {WEAK_FORMS_LIST.map((item, idx) => (
            <div
              key={idx}
              className='p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 transition-all hover:bg-secondary/40'
              style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
            >
              <div className='flex items-center justify-between'>
                <span className='font-black text-base text-foreground'>{item.word}</span>
                <div className='flex items-center gap-2 text-xs font-mono'>
                  <span className='text-muted-foreground line-through' title='Bentuk Kuat'>
                    {item.strongIpa}
                  </span>
                  <FaArrowRight className='h-2.5 w-2.5 text-muted-foreground' />
                  <span className='font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10' title='Bentuk Lemah Schwa'>
                    {item.weakIpa}
                  </span>
                </div>
              </div>

              <div className='text-xs text-foreground/80 italic font-medium'>
                &quot;{item.contextExample}&quot;
              </div>

              <button
                onClick={() => handlePlay(item.contextExample)}
                className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  playingText === item.contextExample
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground hover:bg-primary/10 border-border'
                }`}
              >
                <FaVolumeHigh className='h-3 w-3' />
                <span>Dengar Contoh</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: In-Depth Lessons (Weak Forms, Linking, Elision) */}
      <div className='space-y-6'>
        {CONNECTED_SPEECH_LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className='rounded-3xl border p-5 sm:p-7 space-y-4 shadow-xs'
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            {/* Title & Badge */}
            <div className='space-y-1'>
              <h4 className='text-base sm:text-lg font-bold text-foreground'>
                {lesson.title}
              </h4>
              <p className='text-xs sm:text-sm text-foreground/80 leading-relaxed'>
                {lesson.summary}
              </p>
            </div>

            {/* IELTS Examiner Scoring Benefit Callout */}
            <div className='flex items-start gap-3 p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-purple-900 dark:text-purple-200 text-xs sm:text-sm'>
              <FaAward className='h-4 w-4 text-purple-500 shrink-0 mt-0.5' />
              <div>
                <span className='font-bold'>Nilai Tambah Penguji IELTS: </span>
                <span>{lesson.ieltsBand7Benefit}</span>
              </div>
            </div>

            {/* Examples Comparison Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 pt-2'>
              {lesson.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className='p-4 rounded-xl border flex flex-col justify-between space-y-3'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <div className='space-y-1.5'>
                    <div className='text-xs text-muted-foreground'>
                      ❌ Kaku / Terpisah:
                    </div>
                    <div className='text-xs font-mono line-through text-muted-foreground'>
                      {ex.beforeText}
                    </div>

                    <div className='text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2'>
                      ✅ Mengalir Alami:
                    </div>
                    <div className='text-xs font-mono font-bold text-foreground'>
                      {ex.afterText}
                    </div>

                    <p className='text-[11px] text-muted-foreground mt-2 border-t pt-1.5 border-border/60'>
                      💡 {ex.phoneticNote}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlay(ex.audioPrompt)}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      playingText === ex.audioPrompt
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-foreground hover:bg-primary/10 border-border'
                    }`}
                  >
                    <FaVolumeHigh className='h-3 w-3' />
                    <span>Dengar Suara ({accent.toUpperCase()})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedSpeechLab;
