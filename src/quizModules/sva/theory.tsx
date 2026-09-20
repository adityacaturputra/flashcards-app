// src/quizModules/sva/theory.tsx
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheck,
  FaXmark,
  FaLightbulb,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
  FaArrowRight,
} from 'react-icons/fa6';

export const SvaTheoryGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'distractors' | 'bracket_demo' | 'rubric'>('concepts');
  const [showBracketMode, setShowBracketMode] = useState<boolean>(false);

  const DEMO_SENTENCES = [
    {
      fullSentence: 'The quality of these newly developed educational applications is outstanding.',
      subject: 'The quality',
      modifier: 'of these newly developed educational applications',
      verb: 'is',
      rest: 'outstanding.',
      trapReason: 'Otak kita terkecoh oleh kata benda jamak "applications" tepat sebelum kata kerja, padahal subjek aslinya adalah "The quality" (tunggal).',
    },
    {
      fullSentence: 'The lead software architect, along with four full-stack engineers, is attending the tech conference.',
      subject: 'The lead software architect',
      modifier: 'along with four full-stack engineers',
      verb: 'is',
      rest: 'attending the tech conference.',
      trapReason: 'Frasa "along with" terlihat seperti "and", tetapi secara grammar hanyalah sisipan keterangan, bukan penambah subjek jamak.',
    },
    {
      fullSentence: 'The senior researcher who analyzed the clinical laboratory results has received the prestigious award.',
      subject: 'The senior researcher',
      modifier: 'who analyzed the clinical laboratory results',
      verb: 'has',
      rest: 'received the prestigious award.',
      trapReason: 'Anak kalimat [who analyzed...] memuat kata jamak "results", namun subjek kalimat induk adalah "The senior researcher" (tunggal).',
    },
    {
      fullSentence: 'Managing large cloud databases across distributed regions requires deep technical expertise.',
      subject: 'Managing large cloud databases',
      modifier: 'across distributed regions',
      verb: 'requires',
      rest: 'deep technical expertise.',
      trapReason: 'Subjek diawali oleh gerund "Managing" (aktivitas mengelola = konsep tunggal), meskipun objeknya "databases" berbentuk jamak.',
    },
  ];

  return (
    <div className='space-y-6 max-w-4xl mx-auto'>
      {/* Tab Navigation Header */}
      <div
        className='flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto shadow-inner'
        style={{
          background: 'var(--muted)',
          borderColor: 'var(--border)',
        }}
      >
        <button
          onClick={() => setActiveTab('concepts')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'concepts'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          📖 Aturan & Rumus Inti
        </button>

        <button
          onClick={() => setActiveTab('distractors')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'distractors'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          ⚠️ 5 Pola Jebakan
        </button>

        <button
          onClick={() => setActiveTab('bracket_demo')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'bracket_demo'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          ✂️ Teknik Coret Sisipan
        </button>

        <button
          onClick={() => setActiveTab('rubric')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'rubric'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          🎯 Makna Rubrik [ /5]
        </button>
      </div>

      {/* Tab 1: Concepts & Core Formulas */}
      {activeTab === 'concepts' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-6'
        >
          {/* Card: Core Definition */}
          <div
            className='p-5 sm:p-6 rounded-2xl border shadow-sm space-y-4'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className='flex items-center gap-2 text-emerald-600 dark:text-emerald-400'>
              <FaGraduationCap className='h-5 w-5' />
              <h3 className='text-base sm:text-lg font-bold text-foreground'>
                Hukum Dasar Subject-Verb Agreement
              </h3>
            </div>

            <p className='text-sm leading-relaxed text-muted-foreground'>
              Dalam tata bahasa Inggris, bentuk kata kerja (*verb*) wajib selaras dengan jumlah dari subjek utama (*head noun*). Pada kalimat sederhana ini sangat mudah, namun menjadi sangat menantang saat kalimat memiliki 20–35 kata.
            </p>

            {/* Visual Formula Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2'>
              <div className='p-4 rounded-xl border bg-emerald-500/5 border-emerald-500/20'>
                <div className='text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1'>
                  Subjek Tunggal (Singular)
                </div>
                <div className='text-sm font-semibold text-foreground'>
                  Subjek Tunggal ➔ Verb + s/es / is / was / has
                </div>
                <div className='text-xs text-muted-foreground mt-2 italic'>
                  Contoh: The system <strong>runs</strong> smoothly. / The report <strong>has</strong> arrived.
                </div>
              </div>

              <div className='p-4 rounded-xl border bg-sky-500/5 border-sky-500/20'>
                <div className='text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1'>
                  Subjek Jamak (Plural)
                </div>
                <div className='text-sm font-semibold text-foreground'>
                  Subjek Jamak ➔ Base Verb / are / were / have
                </div>
                <div className='text-xs text-muted-foreground mt-2 italic'>
                  Contoh: The systems <strong>run</strong> smoothly. / The reports <strong>have</strong> arrived.
                </div>
              </div>
            </div>
          </div>

          {/* Card: The Proximity Trap */}
          <div
            className='p-5 sm:p-6 rounded-2xl border shadow-sm space-y-3'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className='flex items-center gap-2 text-amber-600 dark:text-amber-400'>
              <FaLightbulb className='h-5 w-5' />
              <h3 className='text-base sm:text-lg font-bold text-foreground'>
                Kenapa Kalimat Panjang Sering Menipu? (The Proximity Trap)
              </h3>
            </div>

            <p className='text-sm leading-relaxed text-muted-foreground'>
              Secara psikolinguistik, otak manusia memiliki refleks mencocokkan kata kerja dengan <strong>kata benda yang posisinya paling dekat di depannya</strong> (*Proximity Error*). 
            </p>

            <div className='p-4 rounded-xl border bg-amber-500/10 border-amber-500/20 space-y-2'>
              <div className='text-xs font-bold text-amber-700 dark:text-amber-300'>
                ⚠️ Contoh Jebakan Proximity:
              </div>
              <div className='text-sm font-mono text-foreground'>
                &quot;The quality of these mobile <span className='underline font-bold text-red-500'>applications</span> <span className='text-red-500 font-bold'>[ are / is ]</span> outstanding.&quot;
              </div>
              <p className='text-xs text-muted-foreground'>
                Karena mata kita melihat kata jamak <em>&quot;applications&quot;</em> tepat sebelum kata kerja, tangan kita refleks memilih <em>&quot;are&quot;</em>. <strong>Ini salah!</strong> Subjek aslinya adalah <strong>&quot;The quality&quot;</strong> (tunggal).
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 2: The 5 Distractor Patterns */}
      {activeTab === 'distractors' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-4'
        >
          {/* Pattern 1 */}
          <div className='p-4 sm:p-5 rounded-2xl border bg-card border-border space-y-2 shadow-xs'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400'>
                Pola 1: Frasa Preposisi (of, in, with, for, to)
              </span>
              <span className='text-xs font-medium text-muted-foreground'>Level 1</span>
            </div>
            <p className='text-xs text-muted-foreground'>
              Kata benda yang berada di dalam frasa preposisi hanyalah objek preposisi, bukan subjek kalimat.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs'>
              <div className='p-2.5 rounded-lg bg-red-500/10 text-red-700 dark:text-red-300 flex items-start gap-1.5'>
                <FaXmark className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>The <strong>cost</strong> of new computers <strong>are</strong> rising.</span>
              </div>
              <div className='p-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5'>
                <FaCheck className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>The <strong>cost</strong> [of new computers] <strong>is</strong> rising.</span>
              </div>
            </div>
          </div>

          {/* Pattern 2 */}
          <div className='p-4 sm:p-5 rounded-2xl border bg-card border-border space-y-2 shadow-xs'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400'>
                Pola 2: Frasa Sisipan (along with, as well as, together with)
              </span>
              <span className='text-xs font-medium text-muted-foreground'>Level 2</span>
            </div>
            <p className='text-xs text-muted-foreground'>
              Frasa-frasa ini bukan konjungsi setara seperti &quot;and&quot;. Kata benda di dalamnya tidak mengubah jumlah subjek utama.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs'>
              <div className='p-2.5 rounded-lg bg-red-500/10 text-red-700 dark:text-red-300 flex items-start gap-1.5'>
                <FaXmark className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>The <strong>manager</strong>, along with his assistants, <strong>have</strong> left.</span>
              </div>
              <div className='p-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5'>
                <FaCheck className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>The <strong>manager</strong>, [along with his assistants], <strong>has</strong> left.</span>
              </div>
            </div>
          </div>

          {/* Pattern 3 */}
          <div className='p-4 sm:p-5 rounded-2xl border bg-card border-border space-y-2 shadow-xs'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400'>
                Pola 3: Anak Kalimat Penjelas (who, which, that, -ing/-ed)
              </span>
              <span className='text-xs font-medium text-muted-foreground'>Level 3</span>
            </div>
            <p className='text-xs text-muted-foreground'>
              Klausa penjelas panjang sering memuat kata benda jamak yang memisahkan subjek dari kata kerja utamanya.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs'>
              <div className='p-2.5 rounded-lg bg-red-500/10 text-red-700 dark:text-red-300 flex items-start gap-1.5'>
                <FaXmark className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>The <strong>engineer</strong> who fixed the servers <strong>were</strong> promoted.</span>
              </div>
              <div className='p-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5'>
                <FaCheck className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>The <strong>engineer</strong> [who fixed the servers] <strong>was</strong> promoted.</span>
              </div>
            </div>
          </div>

          {/* Pattern 4 */}
          <div className='p-4 sm:p-5 rounded-2xl border bg-card border-border space-y-2 shadow-xs'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                Pola 4: Subjek Berupa Gerund (Verb-ing)
              </span>
              <span className='text-xs font-medium text-muted-foreground'>Level 4</span>
            </div>
            <p className='text-xs text-muted-foreground'>
              Aktivitas gerund selalu dianggap <strong>SATU KONSEP TUNGGAL (Singular)</strong>, meskipun objek di belakangnya jamak.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs'>
              <div className='p-2.5 rounded-lg bg-red-500/10 text-red-700 dark:text-red-300 flex items-start gap-1.5'>
                <FaXmark className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>Building distributed applications <strong>take</strong> patience.</span>
              </div>
              <div className='p-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5'>
                <FaCheck className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>[<strong>Building</strong> distributed applications] <strong>takes</strong> patience.</span>
              </div>
            </div>
          </div>

          {/* Pattern 5 */}
          <div className='p-4 sm:p-5 rounded-2xl border bg-card border-border space-y-2 shadow-xs'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400'>
                Pola 5: Inversi & Konjungsi Korelatif (Neither/Nor, Either/Or)
              </span>
              <span className='text-xs font-medium text-muted-foreground'>Level 5</span>
            </div>
            <p className='text-xs text-muted-foreground'>
              Pada &quot;Neither... nor...&quot;, kata kerja mengikuti subjek yang <strong>paling dekat</strong> dengan kata kerja. Pada kalimat inversi, subjek berada di <strong>belakang</strong> kata kerja.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs'>
              <div className='p-2.5 rounded-lg bg-red-500/10 text-red-700 dark:text-red-300 flex items-start gap-1.5'>
                <FaXmark className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>Neither the team nor the <strong>director</strong> <strong>were</strong> aware.</span>
              </div>
              <div className='p-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5'>
                <FaCheck className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                <span>Neither the team nor the <strong>director</strong> <strong>was</strong> aware.</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 3: Interactive Bracket Elimination Simulator */}
      {activeTab === 'bracket_demo' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-4'
        >
          <div
            className='p-5 sm:p-6 rounded-2xl border shadow-sm space-y-4'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
              <div>
                <h3 className='text-base font-bold text-foreground'>
                  Simulator Teknik Coret Sisipan (*Bracket Elimination*)
                </h3>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  Aktifkan sakelar untuk melihat bagaimana kalimat panjang &quot;dikelupas&quot; sehingga subjek asli dan kata kerjanya terlihat seketika.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => setShowBracketMode(!showBracketMode)}
                className='flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all self-start sm:self-auto hover:shadow-xs'
                style={{
                  background: showBracketMode ? 'var(--primary)' : 'var(--muted)',
                  color: showBracketMode ? 'var(--primary-foreground)' : 'var(--foreground)',
                  borderColor: 'var(--border)',
                }}
              >
                {showBracketMode ? (
                  <>
                    <FaEyeSlash className='h-3.5 w-3.5' />
                    <span>Mode Normal</span>
                  </>
                ) : (
                  <>
                    <FaEye className='h-3.5 w-3.5' />
                    <span>Aktifkan Coret Sisipan [ ]</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Demo Cards */}
            <div className='space-y-3 pt-2'>
              {DEMO_SENTENCES.map((item, idx) => (
                <div
                  key={idx}
                  className='p-4 rounded-xl border transition-all space-y-2'
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className='text-sm sm:text-base leading-relaxed'>
                    <AnimatePresence mode='wait'>
                      {showBracketMode ? (
                        <motion.div
                          key='bracketed'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='flex flex-wrap items-baseline gap-1'
                        >
                          <span className='font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md'>
                            {item.subject}
                          </span>
                          <span className='font-mono text-muted-foreground opacity-50 line-through decoration-muted-foreground'>
                            [{item.modifier}]
                          </span>
                          <span className='font-bold text-amber-600 dark:text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded-md'>
                            {item.verb}
                          </span>
                          <span className='text-muted-foreground'>{item.rest}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key='normal'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='text-foreground'
                        >
                          {item.fullSentence}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className='text-xs text-muted-foreground flex items-start gap-1.5 pt-1 border-t border-border/60'>
                    <FaArrowRight className='h-3 w-3 mt-0.5 text-primary shrink-0' />
                    <span>{item.trapReason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 4: Rubric Meaning */}
      {activeTab === 'rubric' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-4'
        >
          <div
            className='p-5 sm:p-6 rounded-2xl border shadow-sm space-y-4'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <h3 className='text-base font-bold text-foreground'>
              Pedoman Standar Nilai Rubrik [ /5]
            </h3>
            <p className='text-xs text-muted-foreground'>
              Skor ini mencerminkan sejauh mana kamu mempertahankan akurasi tata bahasa saat menulis kalimat akademik atau profesional yang kompleks.
            </p>

            <div className='space-y-2.5 pt-1'>
              <div className='p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-start gap-3'>
                <span className='text-lg font-black text-emerald-600 dark:text-emerald-400 shrink-0 w-8'>
                  5 / 5
                </span>
                <div>
                  <div className='text-xs font-bold text-foreground flex items-center gap-1.5'>
                    <span>Master of Complex Syntax</span>
                    <span className='rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 text-[9px] font-extrabold uppercase'>
                      CEFR C1 / C2 • IELTS 7.5 - 9.0
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground mt-0.5'>
                    Konsisten 100% benar bahkan pada kalimat multi-klausa bertingkat dengan inversi, subjek gerund ganda, atau frase parenthetical panjang. Tidak pernah terpengaruh *proximity trap*.
                  </p>
                </div>
              </div>

              <div className='p-3.5 rounded-xl border border-sky-500/30 bg-sky-500/5 flex items-start gap-3'>
                <span className='text-lg font-black text-sky-600 dark:text-sky-400 shrink-0 w-8'>
                  4 / 5
                </span>
                <div>
                  <div className='text-xs font-bold text-foreground flex items-center gap-1.5'>
                    <span>Advanced Clause Navigator</span>
                    <span className='rounded bg-sky-500/20 text-sky-600 dark:text-sky-400 px-1.5 py-0.2 text-[9px] font-extrabold uppercase'>
                      CEFR B2 • IELTS 6.0 - 7.0
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground mt-0.5'>
                    Sangat mahir pada kalimat panjang standar dan frasa preposisi. Sesekali ada slip kecil pada kalimat inversi yang sangat padat atau frase *as well as/together with*.
                  </p>
                </div>
              </div>

              <div className='p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-start gap-3'>
                <span className='text-lg font-black text-amber-600 dark:text-amber-400 shrink-0 w-8'>
                  3 / 5
                </span>
                <div>
                  <div className='text-xs font-bold text-foreground flex items-center gap-1.5'>
                    <span>Competent (Intermediate)</span>
                    <span className='rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.2 text-[9px] font-extrabold uppercase'>
                      CEFR B1 • IELTS 5.0 - 5.5
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground mt-0.5'>
                    Mampu menyelesaikan SVA pada kalimat berjarak pendek-sedang, namun sering terkecoh bila subjek terpisah lebih dari 6 kata atau bila ada kata benda jamak di dalam klausa penjelas.
                  </p>
                </div>
              </div>

              <div className='p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5 flex items-start gap-3'>
                <span className='text-lg font-black text-rose-600 dark:text-rose-400 shrink-0 w-8'>
                  1–2
                </span>
                <div>
                  <div className='text-xs font-bold text-foreground flex items-center gap-1.5'>
                    <span>Developing / Proximity Dependent</span>
                    <span className='rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 px-1.5 py-0.2 text-[9px] font-extrabold uppercase'>
                      CEFR A2 • IELTS 4.0 - 4.5
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground mt-0.5'>
                    Hampir selalu mencocokkan kata kerja dengan kata benda yang paling dekat di depannya. Membutuhkan latihan intensif teknik *Bracket Elimination*.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SvaTheoryGuide;
