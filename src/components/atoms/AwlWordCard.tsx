'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaVolumeHigh,
  FaPlus,
  FaCheck,
  FaArrowUpRightFromSquare,
  FaLayerGroup,
} from 'react-icons/fa6';
import { AwlItem } from '@/types/awl';
import { AccentPreference } from '@/types/phonemic';
import { playSpeech } from '@/utils/speechSynthesis';

interface AwlWordCardProps {
  item: AwlItem;
  accent: AccentPreference;
  isInDeck: boolean;
  onAddToDeck: (item: AwlItem) => Promise<void>;
  onClick: () => void;
}

export const AwlWordCard: React.FC<AwlWordCardProps> = ({
  item,
  accent,
  isInDeck,
  onAddToDeck,
  onClick,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    playSpeech({
      text: item.headword,
      accent,
      rate: 0.88,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const handleAddClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInDeck || isAdding) return;
    setIsAdding(true);
    try {
      await onAddToDeck(item);
    } finally {
      setIsAdding(false);
    }
  };

  // Count total family members
  const familyCount =
    item.family.verbs.length +
    item.family.nouns.length +
    item.family.adjectives.length +
    item.family.adverbs.length;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className='group relative flex flex-col justify-between rounded-2xl border p-4 transition-all cursor-pointer shadow-xs hover:shadow-md'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      {/* Top Header: Sublist Badge + Audio Button */}
      <div className='flex items-center justify-between gap-2'>
        <span className='rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider'>
          Sublist {item.sublist}
        </span>

        <button
          onClick={handlePlayAudio}
          className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all ${
            isPlaying
              ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-xs'
              : 'border-border bg-secondary/80 text-muted-foreground hover:bg-primary/20 hover:text-primary'
          }`}
          title={`Dengarkan pengucapan '${item.headword}'`}
          aria-label={`Play audio for ${item.headword}`}
        >
          <FaVolumeHigh className={`h-3 w-3 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Main Headword & Definition */}
      <div className='my-3 space-y-1'>
        <div className='flex items-baseline gap-2'>
          <h3 className='text-lg font-black text-foreground group-hover:text-primary transition-colors'>
            {item.headword}
          </h3>
          <span className='text-xs font-mono text-muted-foreground'>
            {item.ipa}
          </span>
        </div>
        <p className='text-xs text-foreground/80 line-clamp-2 leading-relaxed'>
          {item.definitionId}
        </p>
      </div>

      {/* Word Family Badges */}
      <div className='space-y-2 pt-2 border-t border-border/60'>
        <div className='flex items-center justify-between text-[11px] text-muted-foreground font-medium'>
          <span className='flex items-center gap-1'>
            <FaLayerGroup className='h-2.5 w-2.5 text-primary' />
            <span>Rumpun: {familyCount} varian</span>
          </span>
          <span className='text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5'>
            <span>Detail</span>
            <FaArrowUpRightFromSquare className='h-2.5 w-2.5' />
          </span>
        </div>

        {/* 1-Click "Add to Flashcard Deck" Button */}
        <button
          onClick={handleAddClick}
          disabled={isInDeck || isAdding}
          className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all border ${
            isInDeck
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 cursor-default'
              : isAdding
              ? 'bg-secondary text-muted-foreground border-border animate-pulse'
              : 'bg-primary text-primary-foreground border-primary hover:brightness-110 shadow-xs'
          }`}
        >
          {isInDeck ? (
            <>
              <FaCheck className='h-3 w-3' />
              <span>✓ Tersimpan di Deck Utama</span>
            </>
          ) : isAdding ? (
            <span>Menyimpan...</span>
          ) : (
            <>
              <FaPlus className='h-3 w-3' />
              <span>➕ Ke Flashcard Utama</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default AwlWordCard;
