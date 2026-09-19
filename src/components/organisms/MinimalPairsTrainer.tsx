'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaVolumeHigh,
  FaPlay,
  FaRotateRight,
  FaCheck,
  FaXmark,
  FaTrophy,
  FaHeadphones,
  FaBookOpen,
} from 'react-icons/fa6';
import { MINIMAL_PAIRS } from '@/data/phonemics';
import {
  MinimalPairItem,
  AccentPreference,
  MINIMAL_PAIRS_MODE,
  MinimalPairsMode,
} from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface MinimalPairsTrainerProps {
  accent: AccentPreference;
}

export const MinimalPairsTrainer: React.FC<MinimalPairsTrainerProps> = ({ accent }) => {
  const [activeSubTab, setActiveSubTab] = useState<MinimalPairsMode>(MINIMAL_PAIRS_MODE.QUIZ);

  // Quiz State
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [targetWordIndex, setTargetWordIndex] = useState<1 | 2>(1); // 1 = word1, 2 = word2
  const [userSelection, setUserSelection] = useState<1 | 2 | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Active quiz item
  const currentPair: MinimalPairItem = useMemo(() => {
    return MINIMAL_PAIRS[currentPairIndex % MINIMAL_PAIRS.length];
  }, [currentPairIndex]);

  const targetWord = targetWordIndex === 1 ? currentPair.word1 : currentPair.word2;

  // Play audio for current target quiz question
  const handlePlayQuizAudio = () => {
    playSpeech({
      text: targetWord,
      accent,
      rate: 0.82,
    });
  };

  // Start new question with random target
  const handleNextQuestion = () => {
    const nextIdx = Math.floor(Math.random() * MINIMAL_PAIRS.length);
    const nextTarget = Math.random() > 0.5 ? 1 : 2;
    setCurrentPairIndex(nextIdx);
    setTargetWordIndex(nextTarget as 1 | 2);
    setUserSelection(null);

    // Auto-play next question
    const word = (nextTarget === 1 ? MINIMAL_PAIRS[nextIdx].word1 : MINIMAL_PAIRS[nextIdx].word2);
    setTimeout(() => {
      playSpeech({ text: word, accent, rate: 0.82 });
    }, 250);
  };

  const handleSelectAnswer = (selected: 1 | 2) => {
    if (userSelection !== null) return; // Prevent double clicking
    setUserSelection(selected);
    setTotalAttempts((prev) => prev + 1);

    if (selected === targetWordIndex) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleResetQuiz = () => {
    setScore(0);
    setTotalAttempts(0);
    setStreak(0);
    handleNextQuestion();
  };

  return (
    <div className='space-y-6'>
      {/* Subtab Switcher: Quiz Mode vs Study Reference */}
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div
          className='inline-flex items-center gap-1 p-1 rounded-xl border shadow-xs'
          style={{
            background: 'var(--secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <button
            onClick={() => setActiveSubTab(MINIMAL_PAIRS_MODE.QUIZ)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all ${
              activeSubTab === MINIMAL_PAIRS_MODE.QUIZ
                ? 'font-bold border shadow-xs'
                : 'font-medium opacity-65 hover:opacity-100'
            }`}
            style={
              activeSubTab === MINIMAL_PAIRS_MODE.QUIZ
                ? {
                    background: 'var(--card)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                  }
                : {
                    color: 'var(--muted-foreground)',
                  }
            }
          >
            <FaHeadphones className='h-3.5 w-3.5' />
            <span>Mode Kuis Pendengaran</span>
          </button>

          <button
            onClick={() => setActiveSubTab(MINIMAL_PAIRS_MODE.STUDY)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all ${
              activeSubTab === MINIMAL_PAIRS_MODE.STUDY
                ? 'font-bold border shadow-xs'
                : 'font-medium opacity-65 hover:opacity-100'
            }`}
            style={
              activeSubTab === MINIMAL_PAIRS_MODE.STUDY
                ? {
                    background: 'var(--card)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                  }
                : {
                    color: 'var(--muted-foreground)',
                  }
            }
          >
            <FaBookOpen className='h-3.5 w-3.5' />
            <span>Daftar 30+ Pasangan Suara</span>
          </button>
        </div>

        {activeSubTab === MINIMAL_PAIRS_MODE.QUIZ && (
          <div className='flex items-center gap-3 text-xs font-medium'>
            <div className='flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20'>
              <FaCheck className='h-3 w-3' />
              <span>
                Skor: {score} / {totalAttempts}
              </span>
            </div>
            <div className='flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20'>
              <FaTrophy className='h-3 w-3' />
              <span>Streak: {streak} (Best: {bestStreak})</span>
            </div>
            {totalAttempts > 0 && (
              <button
                onClick={handleResetQuiz}
                className='flex items-center gap-1 text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg border border-border bg-secondary hover:bg-secondary/80 transition-all text-xs'
                title='Reset skor kuis'
              >
                <FaRotateRight className='h-2.5 w-2.5' />
                <span>Reset</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* QUIZ MODE */}
      {activeSubTab === MINIMAL_PAIRS_MODE.QUIZ && (
        <div
          className='rounded-3xl border p-6 sm:p-8 space-y-6 text-center max-w-xl mx-auto shadow-sm'
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div className='space-y-1.5'>
            <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
              Tes Diskriminasi Akustik IELTS Listening
            </span>
            <h3 className='text-lg sm:text-xl font-bold text-foreground'>
              Kata manakah yang baru saja Anda dengar?
            </h3>
            <p className='text-xs text-muted-foreground'>
              Kontras: <span className='font-mono font-bold text-primary'>{currentPair.phoneme1}</span> vs{' '}
              <span className='font-mono font-bold text-primary'>{currentPair.phoneme2}</span>
            </p>
          </div>

          {/* Big Audio Trigger Button */}
          <div className='flex justify-center py-3'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayQuizAudio}
              className='flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-sm sm:text-base'
            >
              <FaVolumeHigh className='h-4 w-4' />
              <span>Putar Ulang Suara</span>
            </motion.button>
          </div>

          {/* Two Large Choice Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2'>
            {/* Option 1 */}
            <motion.button
              whileHover={userSelection === null ? { scale: 1.02 } : {}}
              whileTap={userSelection === null ? { scale: 0.98 } : {}}
              onClick={() => handleSelectAnswer(1)}
              disabled={userSelection !== null}
              className={`p-4 rounded-2xl border text-center transition-all ${
                userSelection === null
                  ? 'border-border bg-secondary/60 hover:bg-secondary hover:border-primary cursor-pointer'
                  : targetWordIndex === 1
                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                  : userSelection === 1
                  ? 'border-red-500 bg-red-500/15 text-red-700 dark:text-red-300'
                  : 'opacity-50 border-border bg-secondary/30'
              }`}
            >
              <div className='text-xl sm:text-2xl font-black text-foreground'>{currentPair.word1}</div>
              <div className='text-xs font-mono text-muted-foreground mt-0.5'>{currentPair.ipa1}</div>
              <div className='text-xs text-muted-foreground mt-1 truncate'>{currentPair.meaning1}</div>
            </motion.button>

            {/* Option 2 */}
            <motion.button
              whileHover={userSelection === null ? { scale: 1.02 } : {}}
              whileTap={userSelection === null ? { scale: 0.98 } : {}}
              onClick={() => handleSelectAnswer(2)}
              disabled={userSelection !== null}
              className={`p-4 rounded-2xl border text-center transition-all ${
                userSelection === null
                  ? 'border-border bg-secondary/60 hover:bg-secondary hover:border-primary cursor-pointer'
                  : targetWordIndex === 2
                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                  : userSelection === 2
                  ? 'border-red-500 bg-red-500/15 text-red-700 dark:text-red-300'
                  : 'opacity-50 border-border bg-secondary/30'
              }`}
            >
              <div className='text-xl sm:text-2xl font-black text-foreground'>{currentPair.word2}</div>
              <div className='text-xs font-mono text-muted-foreground mt-0.5'>{currentPair.ipa2}</div>
              <div className='text-xs text-muted-foreground mt-1 truncate'>{currentPair.meaning2}</div>
            </motion.button>
          </div>

          {/* Feedback & Next Button */}
          {userSelection !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className='space-y-4 pt-2 border-t border-border/60'
            >
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium ${
                  userSelection === targetWordIndex
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    : 'border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300'
                }`}
              >
                <div className='font-bold flex items-center justify-center gap-1.5 mb-1'>
                  {userSelection === targetWordIndex ? (
                    <>
                      <FaCheck className='h-3.5 w-3.5 text-emerald-500' />
                      <span>Luar biasa, tebakan Anda BENAR!</span>
                    </>
                  ) : (
                    <>
                      <FaXmark className='h-3.5 w-3.5 text-red-500' />
                      <span>Kurang tepat! Kata aslinya adalah &quot;{targetWord}&quot;.</span>
                    </>
                  )}
                </div>
                <p className='text-foreground/80 text-xs'>{currentPair.contrastTip}</p>
              </div>

              <div className='flex justify-center gap-3'>
                <button
                  onClick={handleNextQuestion}
                  className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:brightness-110 transition-all'
                >
                  <FaPlay className='h-3 w-3' />
                  <span>Soal Berikutnya</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* STUDY REFERENCE MODE */}
      {activeSubTab === MINIMAL_PAIRS_MODE.STUDY && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5'>
          {MINIMAL_PAIRS.map((pair) => (
            <div
              key={pair.id}
              className='rounded-2xl border p-4 space-y-3'
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              {/* Header with IPA contrast */}
              <div className='flex items-center justify-between border-b pb-2 border-border/70'>
                <div className='flex items-center gap-2'>
                  <span className='font-mono font-bold text-sm text-primary px-2 py-0.5 rounded bg-primary/10'>
                    {pair.phoneme1}
                  </span>
                  <span className='text-xs text-muted-foreground'>vs</span>
                  <span className='font-mono font-bold text-sm text-primary px-2 py-0.5 rounded bg-primary/10'>
                    {pair.phoneme2}
                  </span>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className='grid grid-cols-2 gap-2.5'>
                {/* Word 1 */}
                <div
                  className='p-3 rounded-xl border flex flex-col justify-between'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <div>
                    <div className='font-bold text-base text-foreground'>{pair.word1}</div>
                    <div className='font-mono text-xs text-muted-foreground'>{pair.ipa1}</div>
                    <div className='text-xs text-muted-foreground mt-1 line-clamp-1'>
                      {pair.meaning1}
                    </div>
                  </div>
                  <button
                    onClick={() => playSpeech({ text: pair.word1, accent })}
                    className='mt-2.5 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground text-xs font-semibold transition-all'
                  >
                    <FaVolumeHigh className='h-2.5 w-2.5' />
                    <span>Dengar</span>
                  </button>
                </div>

                {/* Word 2 */}
                <div
                  className='p-3 rounded-xl border flex flex-col justify-between'
                  style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}
                >
                  <div>
                    <div className='font-bold text-base text-foreground'>{pair.word2}</div>
                    <div className='font-mono text-xs text-muted-foreground'>{pair.ipa2}</div>
                    <div className='text-xs text-muted-foreground mt-1 line-clamp-1'>
                      {pair.meaning2}
                    </div>
                  </div>
                  <button
                    onClick={() => playSpeech({ text: pair.word2, accent })}
                    className='mt-2.5 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground text-xs font-semibold transition-all'
                  >
                    <FaVolumeHigh className='h-2.5 w-2.5' />
                    <span>Dengar</span>
                  </button>
                </div>
              </div>

              {/* Pedagogical Tip */}
              <p className='text-xs text-muted-foreground italic border-t pt-2 border-border/50'>
                💡 {pair.contrastTip}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalPairsTrainer;
