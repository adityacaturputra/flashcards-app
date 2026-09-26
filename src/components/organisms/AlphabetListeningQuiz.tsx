'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaVolumeHigh,
  FaRotateRight,
  FaCheck,
  FaXmark,
  FaTrophy,
  FaFire,
  FaLightbulb,
  FaEarListen,
  FaForward,
} from 'react-icons/fa6';
import { AlphabetLetter } from '@/types/alphabet';
import { ALPHABET_LETTERS, CONFUSION_PAIRS, getAlphabetLetter } from '@/data/alphabet';
import { AccentPreference } from '@/types/phonemic';
import { playAlphabetLetter } from '@/utils/alphabetAudio';

interface AlphabetListeningQuizProps {
  accent: AccentPreference;
}

type QuizMode = 'confusion' | 'all';

interface QuizQuestion {
  target: AlphabetLetter;
  options: AlphabetLetter[];
  isConfusionTrap: boolean;
  trapNote?: string;
}

export const AlphabetListeningQuiz: React.FC<AlphabetListeningQuizProps> = ({ accent }) => {
  const [quizMode, setQuizMode] = useState<QuizMode>('confusion');
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Generate a quiz question based on current mode
  const generateQuestion = useCallback((): QuizQuestion => {
    if (quizMode === 'confusion') {
      // Pick random confusion pair
      const pair = CONFUSION_PAIRS[Math.floor(Math.random() * CONFUSION_PAIRS.length)];
      const targetChar = pair.letters[Math.floor(Math.random() * pair.letters.length)];
      const target = getAlphabetLetter(targetChar) || ALPHABET_LETTERS[0];

      // Options: all letters in this confusion pair
      const pairLetters = pair.letters
        .map((c) => getAlphabetLetter(c))
        .filter((l): l is AlphabetLetter => Boolean(l));

      // If pair has only 2 letters (like G vs J), maybe add 1-2 distractors, or keep it strictly pair-focused
      let options = [...pairLetters];
      if (options.length < 4) {
        // Add random distractor to have at least 3-4 options
        const distractors = ALPHABET_LETTERS.filter(
          (l) => !options.some((o) => o.char === l.char)
        );
        const randomExtra = distractors[Math.floor(Math.random() * distractors.length)];
        if (randomExtra) options.push(randomExtra);
      }

      // Shuffle options
      options = options.sort(() => Math.random() - 0.5);

      return {
        target,
        options,
        isConfusionTrap: true,
        trapNote: pair.acousticClue,
      };
    } else {
      // Pick random from all 26 letters
      const target = ALPHABET_LETTERS[Math.floor(Math.random() * ALPHABET_LETTERS.length)];

      // Options: target + 3 random distractors (prioritizing confusion partners if available)
      const distractors: AlphabetLetter[] = [];
      target.confusionPartners.forEach((cp) => {
        const partner = getAlphabetLetter(cp);
        if (partner && partner.char !== target.char) distractors.push(partner);
      });

      while (distractors.length < 3) {
        const candidate = ALPHABET_LETTERS[Math.floor(Math.random() * ALPHABET_LETTERS.length)];
        if (
          candidate.char !== target.char &&
          !distractors.some((d) => d.char === candidate.char)
        ) {
          distractors.push(candidate);
        }
      }

      const options = [target, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5);

      return {
        target,
        options,
        isConfusionTrap: false,
        trapNote: target.tip,
      };
    }
  }, [quizMode]);

  const [hasStarted, setHasStarted] = useState(false);

  // Start question
  const startNewQuestion = useCallback(
    (autoPlay: boolean = true) => {
      const q = generateQuestion();
      setCurrentQuestion(q);
      setSelectedChar(null);

      if (autoPlay) {
        setHasStarted(true);
        // Play target letter audio after short visual render delay
        setTimeout(() => {
          setIsPlayingAudio(true);
          playAlphabetLetter({
            letter: q.target,
            accent,
            slow: false,
            onEnd: () => setIsPlayingAudio(false),
            onError: () => setIsPlayingAudio(false),
          });
        }, 280);
      }
    },
    [generateQuestion, accent]
  );

  // Initial load or mode switch: generate question without unpermitted autoplay
  useEffect(() => {
    startNewQuestion(false);
  }, [quizMode, startNewQuestion]);

  // Play audio on demand
  const handleReplayAudio = (slow: boolean = false) => {
    if (!currentQuestion) return;
    setHasStarted(true);
    setIsPlayingAudio(true);
    playAlphabetLetter({
      letter: currentQuestion.target,
      accent,
      slow,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  // Play option letter to contrast after answering
  const handlePlayOptionAudio = (letter: AlphabetLetter, e: React.MouseEvent) => {
    e.stopPropagation();
    playAlphabetLetter({
      letter,
      accent,
      slow: true,
    });
  };

  // Select an option
  const handleSelectOption = (letter: AlphabetLetter) => {
    if (selectedChar !== null || !currentQuestion) return; // Prevent double select

    setSelectedChar(letter.char);
    setTotalAttempts((prev) => prev + 1);

    const isCorrect = letter.char === currentQuestion.target.char;
    if (isCorrect) {
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

  const handleResetStats = () => {
    setScore(0);
    setTotalAttempts(0);
    setStreak(0);
    setHasStarted(false);
    startNewQuestion(false);
  };

  const accuracyPct = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
  const isAnswered = selectedChar !== null;
  const isCorrect = currentQuestion && selectedChar === currentQuestion.target.char;

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      {/* Mode Selector & Stats Bar */}
      <div
        className='rounded-2xl border p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        {/* Mode Toggle */}
        <div className='flex items-center gap-1.5 p-1 rounded-xl border bg-secondary/40' style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => setQuizMode('confusion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              quizMode === 'confusion'
                ? 'bg-teal-500 text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Jebakan Dikte (G/J, B/P/V)
          </button>
          <button
            onClick={() => setQuizMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              quizMode === 'all'
                ? 'bg-teal-500 text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Acak Semua A–Z
          </button>
        </div>

        {/* Score & Streak Counters */}
        <div className='flex items-center gap-4 text-xs font-semibold'>
          <div className='flex items-center gap-1.5'>
            <FaTrophy className='h-3.5 w-3.5 text-amber-500' />
            <span>
              {score}/{totalAttempts} ({accuracyPct}%)
            </span>
          </div>

          <div className='flex items-center gap-1.5'>
            <FaFire className='h-3.5 w-3.5 text-rose-500' />
            <span>
              Streak: {streak} (Best: {bestStreak})
            </span>
          </div>

          {totalAttempts > 0 && (
            <button
              onClick={handleResetStats}
              className='text-muted-foreground hover:text-foreground text-[11px] underline ml-1'
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Quiz Interaction Card */}
      {currentQuestion && (
        <div
          className='rounded-2xl border p-6 sm:p-8 text-center space-y-6 shadow-sm'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)',
          }}
        >
          {/* Header instructions */}
          <div>
            <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400'>
              <FaEarListen className='h-3 w-3' />
              <span>
                {hasStarted
                  ? 'Dengarkan audio, pilih huruf yang diucapkan:'
                  : 'Klik tombol di bawah untuk mendengarkan huruf:'}
              </span>
            </span>
          </div>

          {/* Big Sound Play Button */}
          <div className='flex flex-col items-center justify-center gap-3'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReplayAudio(false)}
              className={`relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl text-white shadow-lg transition-all ${
                isPlayingAudio
                  ? 'bg-teal-600 ring-8 ring-teal-500/25 animate-pulse'
                  : 'bg-teal-500 hover:bg-teal-600'
              }`}
              title='Putar ulang audio huruf'
              aria-label='Play letter audio'
            >
              <FaVolumeHigh className='h-10 w-10 sm:h-12 sm:w-12' />
              {isPlayingAudio && (
                <span className='absolute inset-0 rounded-3xl ring-4 ring-teal-400 animate-ping opacity-30' />
              )}
            </motion.button>

            {/* Replay Controls (Normal & Slow) */}
            <div className='flex items-center gap-2'>
              <button
                onClick={() => handleReplayAudio(false)}
                className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                style={{ borderColor: 'var(--border)' }}
              >
                <FaVolumeHigh className='h-3 w-3 text-teal-600 dark:text-teal-400' />
                <span>Putar Ulang</span>
              </button>
              <button
                onClick={() => handleReplayAudio(true)}
                className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                style={{ borderColor: 'var(--border)' }}
                title='Dengar dengan tempo lambat'
              >
                <FaRotateRight className='h-3 w-3 text-amber-500' />
                <span>Lambat (0.65x)</span>
              </button>
            </div>
          </div>

          {/* Options Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto'>
            {currentQuestion.options.map((option) => {
              const isSelectedThis = selectedChar === option.char;
              const isTargetLetter = option.char === currentQuestion.target.char;

              let btnStyle = 'border hover:border-teal-500/60 hover:bg-slate-100 dark:hover:bg-slate-800';
              let badgeColor = 'text-muted-foreground';

              if (isAnswered) {
                if (isTargetLetter) {
                  btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/40';
                  badgeColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
                } else if (isSelectedThis) {
                  btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-400 ring-2 ring-rose-500/40';
                  badgeColor = 'text-rose-600 dark:text-rose-400 font-bold';
                } else {
                  btnStyle = 'opacity-40 border-dashed';
                }
              }

              return (
                <motion.button
                  key={option.char}
                  whileHover={!isAnswered ? { y: -2 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all shadow-xs ${btnStyle}`}
                  style={{
                    background: isAnswered ? undefined : 'var(--card)',
                    borderColor: isAnswered ? undefined : 'var(--border)',
                  }}
                >
                  <span className='font-serif text-3xl sm:text-4xl font-extrabold'>
                    {option.char}
                  </span>
                  <span className={`text-xs mt-1 font-mono ${badgeColor}`}>
                    {option.ipa}
                  </span>
                  <span className='text-[10px] text-muted-foreground mt-0.5'>
                    ({option.name})
                  </span>

                  {/* Contrast Audio button when answered */}
                  {isAnswered && (
                    <button
                      type='button'
                      onClick={(e) => handlePlayOptionAudio(option, e)}
                      className='mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-[10px] font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors'
                      title={`Dengar pengucapan huruf ${option.char}`}
                    >
                      <FaVolumeHigh className='h-2.5 w-2.5' />
                      <span>Dengar</span>
                    </button>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`rounded-2xl border p-4 sm:p-5 text-left space-y-3 ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {isCorrect ? (
                      <div className='flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white'>
                        <FaCheck className='h-3.5 w-3.5' />
                      </div>
                    ) : (
                      <div className='flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-white'>
                        <FaXmark className='h-3.5 w-3.5' />
                      </div>
                    )}
                    <span className='font-bold text-sm'>
                      {isCorrect
                        ? 'Tepat Sekali! Jawaban Benar.'
                        : `Kurang Tepat. Huruf yang diputar adalah ${currentQuestion.target.char}.`}
                    </span>
                  </div>

                  {/* Next Question Button */}
                  <button
                    onClick={() => startNewQuestion(true)}
                    className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 shadow-xs transition-all'
                  >
                    <span>Lanjut Soal Berikutnya</span>
                    <FaForward className='h-3 w-3' />
                  </button>
                </div>

                {/* Explanation text */}
                <div className='pt-1 text-xs text-foreground/80 leading-relaxed border-t border-current/10 space-y-1.5'>
                  <p>
                    Huruf <strong>{currentQuestion.target.char}</strong> dilafalkan sebagai{' '}
                    <code className='font-mono font-bold'>{currentQuestion.target.ipa}</code>{' '}
                    (&ldquo;{currentQuestion.target.name}&rdquo;), NATO:{' '}
                    <strong>{currentQuestion.target.nato}</strong>.
                  </p>
                  {currentQuestion.trapNote && (
                    <div className='flex items-start gap-1.5 text-xs mt-1.5'>
                      <FaLightbulb className='h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5' />
                      <span>{currentQuestion.trapNote}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AlphabetListeningQuiz;
