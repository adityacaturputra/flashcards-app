'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaBullseye,
} from 'react-icons/fa6';
import {
  REBUTTAL_CATEGORY,
  REBUTTAL_CATEGORY_META,
} from '@/types/rebuttal';
import { REBUTTAL_PRACTICE_ITEMS } from '@/data/rebuttal';
import RebuttalQuestionCard from '@/components/molecules/RebuttalQuestionCard';
import RebuttalSignpostCheatSheet from '@/components/molecules/RebuttalSignpostCheatSheet';

export const RebuttalDistractorTrainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return REBUTTAL_PRACTICE_ITEMS;
    return REBUTTAL_PRACTICE_ITEMS.filter((it) => it.category === selectedCategory);
  }, [selectedCategory]);

  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
  };

  const handleSelectAnswer = (option: string) => {
    if (!currentItem) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentItem.id]: option,
    }));
  };

  const handleToggleReveal = () => {
    if (!currentItem) return;
    setRevealedIds((prev) => ({
      ...prev,
      [currentItem.id]: !prev[currentItem.id],
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Stats calculation
  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = Object.entries(userAnswers).filter(([id, ans]) => {
    const it = REBUTTAL_PRACTICE_ITEMS.find((q) => q.id === id);
    return it && it.targetAnswer === ans;
  }).length;
  const accuracyPercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
      {/* Top Controls & Category Filters */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
        <div className='flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none'>
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            Semua Jebakan ({REBUTTAL_PRACTICE_ITEMS.length})
          </button>
          {Object.values(REBUTTAL_CATEGORY).map((catKey) => {
            const meta = REBUTTAL_CATEGORY_META[catKey];
            const isActive = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => handleCategorySelect(catKey)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {meta.title}
              </button>
            );
          })}
        </div>

        {/* Progress & Accuracy Pill */}
        <div className='flex items-center gap-2 text-xs font-mono text-muted-foreground shrink-0'>
          <span className='flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-lg border border-border/60'>
            <FaBullseye className='h-3 w-3 text-teal-600 dark:text-teal-400' />
            <span>Skor: {totalCorrect}/{totalAnswered} ({accuracyPercent}%)</span>
          </span>
          <span className='bg-secondary px-2.5 py-1 rounded-lg border border-border/60'>
            Soal {currentIndex + 1} / {filteredItems.length}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      {currentItem && (
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <RebuttalQuestionCard
              item={currentItem}
              selectedAnswer={userAnswers[currentItem.id] || null}
              onSelectAnswer={handleSelectAnswer}
              isRevealed={!!revealedIds[currentItem.id]}
              onToggleReveal={handleToggleReveal}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Navigation Controls */}
      <div className='flex items-center justify-between gap-3'>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className='flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs font-bold text-foreground bg-card hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-all'
        >
          <FaChevronLeft className='h-3 w-3' />
          <span>Sebelumnya</span>
        </button>

        <div className='text-xs font-medium text-muted-foreground'>
          {currentIndex + 1} dari {filteredItems.length} Soal
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredItems.length - 1}
          className='flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs'
        >
          <span>Soal Berikutnya</span>
          <FaChevronRight className='h-3 w-3' />
        </button>
      </div>

      {/* Bottom Reference Cheat Sheet Table */}
      <RebuttalSignpostCheatSheet />
    </div>
  );
};

export default RebuttalDistractorTrainer;
