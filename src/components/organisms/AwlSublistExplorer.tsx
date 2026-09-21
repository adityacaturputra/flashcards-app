'use client';
import React, { useState, useMemo } from 'react';
import {
  FaMagnifyingGlass,
  FaFilter,
  FaBookOpen,
} from 'react-icons/fa6';
import { AWL_WORDS } from '@/data/awl';
import { AwlItem, AwlSublistFilter, AWL_SUBLIST_FILTER } from '@/types/awl';
import { AccentPreference } from '@/types/phonemic';
import AwlWordCard from '@/components/atoms/AwlWordCard';
import AwlFamilyModal from '@/components/molecules/AwlFamilyModal';
import { generateAwlFlashcardId } from '@/utils/createAwlFlashcard';

interface AwlSublistExplorerProps {
  accent: AccentPreference;
  deckFlashcardIds: Set<string>;
  onAddToDeck: (item: AwlItem) => Promise<void>;
}

export const AwlSublistExplorer: React.FC<AwlSublistExplorerProps> = ({
  accent,
  deckFlashcardIds,
  onAddToDeck,
}) => {
  const [selectedSublist, setSelectedSublist] = useState<AwlSublistFilter>(AWL_SUBLIST_FILTER.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<AwlItem | null>(null);

  // Filter words by Sublist & Smart Search
  const filteredWords = useMemo(() => {
    return AWL_WORDS.filter((item) => {
      // Sublist filter
      if (selectedSublist !== AWL_SUBLIST_FILTER.ALL && item.sublist !== selectedSublist) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesHeadword = item.headword.toLowerCase().includes(q);
        const matchesDefinition =
          item.definitionId.toLowerCase().includes(q) ||
          item.definitionEn.toLowerCase().includes(q);

        // Check entire family variants
        const matchesFamily =
          item.family.verbs.some((v) => v.toLowerCase().includes(q)) ||
          item.family.nouns.some((n) => n.toLowerCase().includes(q)) ||
          item.family.adjectives.some((a) => a.toLowerCase().includes(q)) ||
          item.family.adverbs.some((adv) => adv.toLowerCase().includes(q));

        if (!matchesHeadword && !matchesDefinition && !matchesFamily) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSublist, searchQuery]);

  return (
    <div className='space-y-6'>
      {/* Controls Bar: Search & Sublist Pills */}
      <div
        className='rounded-3xl border p-4 sm:p-5 space-y-4 shadow-xs'
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
          {/* Search Box */}
          <div className='relative w-full sm:w-80'>
            <FaMagnifyingGlass className='absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Cari kata, varian, atau arti (misal: analysis, economise)...'
              className='w-full rounded-xl border pl-9 pr-3.5 py-2 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary'
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          <div className='text-xs text-muted-foreground'>
            Menampilkan <strong className='text-foreground'>{filteredWords.length}</strong> rumpun kata
          </div>
        </div>

        {/* Sublist Filter Pills */}
        <div
          className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t pt-3'
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className='flex items-center gap-1.5 text-xs font-bold shrink-0'
            style={{ color: 'var(--muted-foreground)' }}
          >
            <FaFilter className='h-3 w-3' />
            <span>Sublist:</span>
          </div>

          <div
            className='inline-flex items-center gap-1 p-1 rounded-xl border shadow-xs shrink-0'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <button
              onClick={() => setSelectedSublist(AWL_SUBLIST_FILTER.ALL)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all shrink-0 ${
                selectedSublist === AWL_SUBLIST_FILTER.ALL
                  ? 'font-bold border shadow-xs'
                  : 'font-medium opacity-65 hover:opacity-100'
              }`}
              style={
                selectedSublist === AWL_SUBLIST_FILTER.ALL
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
              Semua Sublist
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSelected = selectedSublist === num;
              return (
                <button
                  key={num}
                  onClick={() => setSelectedSublist(num)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all shrink-0 ${
                    isSelected
                      ? 'font-bold border shadow-xs'
                      : 'font-medium opacity-65 hover:opacity-100'
                  }`}
                  style={
                    isSelected
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
                  Sublist {num} {num === 1 ? '(Prioritas Utama)' : ''}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of AWL Word Cards */}
      {filteredWords.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4'>
          {filteredWords.map((item) => {
            const cardId = generateAwlFlashcardId(item.headword);
            const isInDeck = deckFlashcardIds.has(cardId);

            return (
              <AwlWordCard
                key={item.id}
                item={item}
                accent={accent}
                isInDeck={isInDeck}
                onAddToDeck={onAddToDeck}
                onClick={() => setActiveModalItem(item)}
              />
            );
          })}
        </div>
      ) : (
        <div
          className='p-12 text-center rounded-3xl border space-y-2'
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <FaBookOpen className='h-8 w-8 text-muted-foreground mx-auto opacity-50' />
          <h4 className='text-sm font-bold text-foreground'>
            Tidak ditemukan kata yang cocok
          </h4>
          <p className='text-xs text-muted-foreground'>
            Coba gunakan kata kunci pencarian lain atau pilih Semua Sublist.
          </p>
        </div>
      )}

      {/* Word Family Modal */}
      <AwlFamilyModal
        item={activeModalItem}
        accent={accent}
        isInDeck={
          activeModalItem
            ? deckFlashcardIds.has(generateAwlFlashcardId(activeModalItem.headword))
            : false
        }
        onAddToDeck={onAddToDeck}
        onClose={() => setActiveModalItem(null)}
      />
    </div>
  );
};

export default AwlSublistExplorer;
