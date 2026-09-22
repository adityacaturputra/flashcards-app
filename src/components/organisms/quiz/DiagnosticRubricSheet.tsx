// src/components/organisms/quiz/DiagnosticRubricSheet.tsx
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronDown,
  FaChevronUp,
  FaRotateRight,
  FaArrowRight,
  FaCircleCheck,
  FaAward,
} from 'react-icons/fa6';
import { QUIZ_SECTION, QuizSection } from '@/constants/quiz';

export interface DiagnosticItemDef {
  id: string;
  moduleId: string;
  section: QuizSection;
  number: number;
  label: string;
  description: string;
}

export const DIAGNOSTIC_ITEMS: DiagnosticItemDef[] = [
  // Bagian A: Tata Bahasa & Struktur
  {
    id: 'sva',
    moduleId: 'sva',
    section: QUIZ_SECTION.A,
    number: 1,
    label: 'Ketepatan penggunaan Subject-Verb Agreement pada kalimat panjang',
    description: 'Bebas dari The Proximity Trap pada kalimat kompleks bertingkat dengan frasa sisipan.',
  },
  {
    id: 'tenses',
    moduleId: 'tenses',
    section: QUIZ_SECTION.A,
    number: 2,
    label: 'Kemampuan membedakan Present Perfect dan Simple Past',
    description: 'Membedakan titik waktu masa lalu tertutup (V2) vs jendela waktu terbuka / relevansi kini.',
  },
  {
    id: 'passive-voice',
    moduleId: 'passive-voice',
    section: QUIZ_SECTION.A,
    number: 3,
    label: 'Penggunaan kalimat pasif secara tepat konteks',
    description: 'Tepat menggunakan pasif pada proses industri (Task 1) dan impersonal passive akademis.',
  },
  {
    id: 'conditionals',
    moduleId: 'conditionals',
    section: QUIZ_SECTION.A,
    number: 4,
    label: 'Penguasaan klausa pengandaian (Conditionals) tipe 2 dan 3',
    description: 'Menguasai hipotesis masa kini, penyesalan masa lalu, inversi (Had...), dan mixed conditionals.',
  },
  {
    id: 'comma-splice',
    moduleId: 'comma-splice',
    section: QUIZ_SECTION.A,
    number: 5,
    label: 'Bebas dari kesalahan tanda baca koma terputus (comma splice)',
    description: 'Memisahkan klausa independen dengan titik koma (;), konjungsi FANBOYS, atau subordinasi.',
  },

  // Bagian B: Kosakata & Kolokasi
  {
    id: 'synonyms',
    moduleId: 'synonyms',
    section: QUIZ_SECTION.B,
    number: 6,
    label: 'Kecepatan memikirkan minimal 2 sinonim untuk kata kunci soal',
    description: 'Kemampuan parafrasa spontan mengubah kata umum menjadi padanan akademis presisi.',
  },
  {
    id: 'collocations',
    moduleId: 'collocations',
    section: QUIZ_SECTION.B,
    number: 7,
    label: 'Penggunaan pasangan kata alami (collocations) tanpa terjemahan harfiah',
    description: 'Menghindari terjemahan kaku kata demi kata (take measures, shed light on, take a toll on).',
  },
  {
    id: 'academic-words',
    moduleId: 'academic-words',
    section: QUIZ_SECTION.B,
    number: 8,
    label: 'Pemahaman istilah akademis umum (Academic Word List)',
    description: 'Penguasaan 570 rumpun kata formal (exacerbate, substantiate, ubiquitous, viability).',
  },
  {
    id: 'spelling-accuracy',
    moduleId: 'spelling-accuracy',
    section: QUIZ_SECTION.B,
    number: 9,
    label: 'Kerapian ejaan kata berbahasa Inggris (spelling accuracy)',
    description: 'Bebas salah ketik fatal (accommodation, occurrence, privilege, questionnaire, environment).',
  },
  {
    id: 'discourse-markers',
    moduleId: 'discourse-markers',
    section: QUIZ_SECTION.B,
    number: 10,
    label: 'Variasi penggunaan penanda wacana (moreover, consequently, albeit)',
    description: 'Kohesi logis antar kalimat tanpa over-linking mekanis yang membosankan.',
  },

  // Bagian C: Stamina & Konsentrasi Ujian
  {
    id: 'listening-stamina',
    moduleId: 'listening-stamina',
    section: QUIZ_SECTION.C,
    number: 11,
    label: 'Mampu mempertahankan fokus mendengarkan audio selama 30 menit nonstop',
    description: 'Ketahanan memori kerja pada Section 4 monolog akademik tanpa mengalami blank out.',
  },
  {
    id: 'reading-speed',
    moduleId: 'reading-speed',
    section: QUIZ_SECTION.C,
    number: 12,
    label: 'Mampu membaca teks akademis 700 kata dalam waktu kurang dari 18 menit',
    description: 'Kecepatan membaca 220–250 WPM dengan pemahaman inti tinggi dan aturan 90 detik.',
  },
  {
    id: 'writing-outline',
    moduleId: 'writing-outline',
    section: QUIZ_SECTION.C,
    number: 13,
    label: 'Kecepatan merancang outline esai Writing Task 2 dalam 5 menit pertama',
    description: 'Dekonstruksi prompt, perumusan tesis tegas, dan model PEEL 4 paragraf emas.',
  },
  {
    id: 'speaking-fluency',
    moduleId: 'speaking-fluency',
    section: QUIZ_SECTION.C,
    number: 14,
    label: 'Kelancaran berbicara 2 menit penuh tanpa berhenti bingung di Speaking Part 2',
    description: 'Bicara 120 detik penuh menggunakan diagram kata kunci 1 menit dan reflective expansion.',
  },
];

const STORAGE_KEY = 'ielts_self_diagnostic_scores_v1';

const DEFAULT_SCORES: Record<string, number> = {
  sva: 3,
  tenses: 3,
  'passive-voice': 3,
  conditionals: 3,
  'comma-splice': 3,
  synonyms: 3,
  collocations: 3,
  'academic-words': 3,
  'spelling-accuracy': 3,
  'discourse-markers': 3,
  'listening-stamina': 3,
  'reading-speed': 3,
  'writing-outline': 3,
  'speaking-fluency': 3,
};

export const DiagnosticRubricSheet: React.FC = () => {
  const router = useRouter();
  const [scores, setScores] = useState<Record<string, number>>(DEFAULT_SCORES);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, number>;
        setScores((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse error
    }
  }, []);

  const handleSetScore = useCallback((id: string, value: number) => {
    setScores((prev) => {
      const updated = { ...prev, [id]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // LocalStorage quota safety
      }
      return updated;
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  }, []);

  const handleReset = useCallback(() => {
    setScores(DEFAULT_SCORES);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SCORES));
    } catch {
      // safe
    }
  }, []);

  // Compute Subtotals & Total
  const { totalScore, sectionAScore, sectionBScore, sectionCScore } = useMemo(() => {
    let a = 0;
    let b = 0;
    let c = 0;
    DIAGNOSTIC_ITEMS.forEach((item) => {
      const val = scores[item.id] || 1;
      if (item.section === QUIZ_SECTION.A) a += val;
      if (item.section === QUIZ_SECTION.B) b += val;
      if (item.section === QUIZ_SECTION.C) c += val;
    });
    return {
      sectionAScore: a,
      sectionBScore: b,
      sectionCScore: c,
      totalScore: a + b + c,
    };
  }, [scores]);

  // Interpretation band
  const interpretation = useMemo(() => {
    if (totalScore >= 55) {
      return {
        level: 'Tingkat Kesiapan Tinggi (Band 7.0 – 8.5+)',
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.1)',
        border: 'rgba(16, 185, 129, 0.3)',
        description:
          'Anda siap langsung melakukan simulasi latihan soal resmi Cambridge di bawah batas waktu ujian resmi.',
      };
    } else if (totalScore >= 40) {
      return {
        level: 'Tingkat Menengah / Ambang B2 (Band 5.5 – 6.5)',
        color: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.1)',
        border: 'rgba(59, 130, 246, 0.3)',
        description:
          'Luangkan 1–2 minggu pertama untuk menambal kelemahan tata bahasa dan memperkaya daftar kosakata AWL sebelum masuk ke simulasi penuh.',
      };
    } else {
      return {
        level: 'Tingkat Fondasi (Ambang B1 / Band 4.0 – 5.0)',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.1)',
        border: 'rgba(245, 158, 11, 0.3)',
        description:
          'Fokuskan 70% waktu belajar pada penguatan dasar bahasa Inggris (grammar in use, pembiasaan membaca artikel berita akademis, dan shadowing harian).',
      };
    }
  }, [totalScore]);

  return (
    <div
      className='rounded-3xl border shadow-sm transition-all overflow-hidden'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header Bar */}
      <div
        className='p-5 sm:p-6 border-b flex items-center justify-between gap-3 cursor-pointer select-none'
        style={{ borderColor: 'var(--border)' }}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs'>
            <FaAward className='h-5 w-5' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h3 className='text-sm sm:text-base font-bold text-foreground'>
                📋 1. Lembar Skor Diagnostik Mandiri (Skala 1 - 5)
              </h3>
              <span className='rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider hidden sm:inline'>
                Self-Assessment Rubric
              </span>
            </div>
            <p className='text-xs text-muted-foreground mt-0.5'>
              Instrumen Refleksi 14 Butir Kemampuan (Maksimal 70 Poin) untuk Mengidentifikasi Prioritas Belajar
            </p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='text-right hidden sm:block'>
            <div className='text-xs text-muted-foreground font-semibold'>Total Skor</div>
            <div className='text-lg font-black text-emerald-600 dark:text-emerald-400'>
              {totalScore} <span className='text-xs font-normal text-muted-foreground'>/ 70</span>
            </div>
          </div>

          <button
            aria-label='Toggle sheet'
            className='h-8 w-8 rounded-xl border flex items-center justify-center text-muted-foreground hover:text-foreground'
            style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
          >
            {isCollapsed ? <FaChevronDown className='h-3.5 w-3.5' /> : <FaChevronUp className='h-3.5 w-3.5' />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='p-5 sm:p-6 space-y-6'
          >
            {/* Live Scorecard Banner */}
            <div
              className='p-4 sm:p-5 rounded-2xl border space-y-3'
              style={{
                background: interpretation.bg,
                borderColor: interpretation.border,
              }}
            >
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
                <div>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                    Hasil Evaluasi Diri Saat Ini:
                  </span>
                  <div className='text-sm sm:text-base font-black text-foreground flex items-center gap-2'>
                    <span>{interpretation.level}</span>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='text-2xl sm:text-3xl font-black' style={{ color: interpretation.color }}>
                    {totalScore}
                    <span className='text-xs font-bold text-muted-foreground ml-1'>/ 70</span>
                  </div>
                  {savedNotice && (
                    <span className='text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md flex items-center gap-1'>
                      <FaCircleCheck className='h-3 w-3' /> Tersimpan
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className='w-full h-2 rounded-full bg-muted overflow-hidden'>
                <div
                  className='h-full rounded-full transition-all duration-300'
                  style={{
                    width: `${Math.round((totalScore / 70) * 100)}%`,
                    background: interpretation.color,
                  }}
                />
              </div>

              <p className='text-xs text-muted-foreground leading-relaxed'>
                💡 <strong>Rekomendasi: </strong> {interpretation.description}
              </p>

              {/* Subtotal Pills */}
              <div className='flex items-center gap-2 pt-1 flex-wrap text-xs font-semibold'>
                <span className='px-2.5 py-1 rounded-lg bg-card border border-border text-foreground'>
                  Bagian A (Tata Bahasa): <strong>{sectionAScore} / 25</strong>
                </span>
                <span className='px-2.5 py-1 rounded-lg bg-card border border-border text-foreground'>
                  Bagian B (Kosakata): <strong>{sectionBScore} / 25</strong>
                </span>
                <span className='px-2.5 py-1 rounded-lg bg-card border border-border text-foreground'>
                  Bagian C (Stamina Ujian): <strong>{sectionCScore} / 20</strong>
                </span>
                <button
                  onClick={handleReset}
                  className='ml-auto inline-flex items-center gap-1.5 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground underline'
                >
                  <FaRotateRight className='h-2.5 w-2.5' />
                  Reset Nilai
                </button>
              </div>
            </div>

            {/* Sections Accordion / Grouping */}
            {/* 1. BAGIAN A */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between border-b pb-2' style={{ borderColor: 'var(--border)' }}>
                <h4 className='text-xs sm:text-sm font-bold text-foreground flex items-center gap-2'>
                  <span className='h-5 w-5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-black'>
                    A
                  </span>
                  <span>Bagian A: Tata Bahasa & Struktur</span>
                </h4>
                <span className='text-xs font-bold text-muted-foreground'>Subtotal: {sectionAScore}/25</span>
              </div>

              <div className='grid grid-cols-1 gap-2.5'>
                {DIAGNOSTIC_ITEMS.filter((i) => i.section === QUIZ_SECTION.A).map((item) => (
                  <DiagnosticRow
                    key={item.id}
                    item={item}
                    value={scores[item.id] || 1}
                    onChange={(val) => handleSetScore(item.id, val)}
                    onPractice={() => router.push(`/quiz/${item.moduleId}`)}
                  />
                ))}
              </div>
            </div>

            {/* 2. BAGIAN B */}
            <div className='space-y-3 pt-2'>
              <div className='flex items-center justify-between border-b pb-2' style={{ borderColor: 'var(--border)' }}>
                <h4 className='text-xs sm:text-sm font-bold text-foreground flex items-center gap-2'>
                  <span className='h-5 w-5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-[10px] font-black'>
                    B
                  </span>
                  <span>Bagian B: Kosakata & Kolokasi</span>
                </h4>
                <span className='text-xs font-bold text-muted-foreground'>Subtotal: {sectionBScore}/25</span>
              </div>

              <div className='grid grid-cols-1 gap-2.5'>
                {DIAGNOSTIC_ITEMS.filter((i) => i.section === QUIZ_SECTION.B).map((item) => (
                  <DiagnosticRow
                    key={item.id}
                    item={item}
                    value={scores[item.id] || 1}
                    onChange={(val) => handleSetScore(item.id, val)}
                    onPractice={() => router.push(`/quiz/${item.moduleId}`)}
                  />
                ))}
              </div>
            </div>

            {/* 3. BAGIAN C */}
            <div className='space-y-3 pt-2'>
              <div className='flex items-center justify-between border-b pb-2' style={{ borderColor: 'var(--border)' }}>
                <h4 className='text-xs sm:text-sm font-bold text-foreground flex items-center gap-2'>
                  <span className='h-5 w-5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-black'>
                    C
                  </span>
                  <span>Bagian C: Stamina & Konsentrasi Ujian</span>
                </h4>
                <span className='text-xs font-bold text-muted-foreground'>Subtotal: {sectionCScore}/20</span>
              </div>

              <div className='grid grid-cols-1 gap-2.5'>
                {DIAGNOSTIC_ITEMS.filter((i) => i.section === QUIZ_SECTION.C).map((item) => (
                  <DiagnosticRow
                    key={item.id}
                    item={item}
                    value={scores[item.id] || 1}
                    onChange={(val) => handleSetScore(item.id, val)}
                    onPractice={() => router.push(`/quiz/${item.moduleId}`)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DiagnosticRowProps {
  item: DiagnosticItemDef;
  value: number;
  onChange: (val: number) => void;
  onPractice: () => void;
}

const DiagnosticRow: React.FC<DiagnosticRowProps> = ({ item, value, onChange, onPractice }) => {
  return (
    <div
      className='p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:bg-muted/30'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='space-y-1 min-w-0 flex-1'>
        <div className='flex items-baseline gap-2'>
          <span className='font-mono text-xs font-bold text-muted-foreground shrink-0'>
            {item.number}.
          </span>
          <span className='text-xs sm:text-sm font-bold text-foreground leading-snug'>
            {item.label}
          </span>
        </div>
        <p className='text-[11px] text-muted-foreground leading-relaxed pl-4'>
          {item.description}
        </p>
      </div>

      <div className='flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 pl-4 sm:pl-0 border-t sm:border-t-0 border-border'>
        {/* Rating Buttons [1 - 5] */}
        <div className='flex items-center gap-1'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onChange(star)}
              title={`Beri nilai ${star}/5`}
              className={`h-7 w-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                star <= value
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {star}
            </button>
          ))}
          <span className='text-xs font-bold text-muted-foreground ml-1'>/5</span>
        </div>

        {/* Practice Module Button */}
        <button
          onClick={onPractice}
          className='flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all hover:bg-muted shrink-0 text-foreground'
          style={{
            background: 'var(--secondary)',
            borderColor: 'var(--border)',
          }}
          title={`Uji modul ${item.moduleId}`}
        >
          <span>Latihan</span>
          <FaArrowRight className='h-2.5 w-2.5 text-muted-foreground' />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticRubricSheet;
