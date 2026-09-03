'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaTable,
  FaLayerGroup,
  FaRobot,
} from 'react-icons/fa6';
import { MAPPING_ITEMS, getModules } from '@/data/mappings';
import { MappingItem, MappingViewMode } from '@/types/mapping';
import MappingTable from '@/components/organisms/MappingTable';
import MappingFlashcards from '@/components/organisms/MappingFlashcards';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import { APP_ROUTES } from '@/constants/routes';

export default function MappingPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<MappingViewMode>('table');
  const [flashcardItems, setFlashcardItems] = useState<MappingItem[]>(MAPPING_ITEMS);
  const [showAgentGuide, setShowAgentGuide] = useState(false);

  const modules = getModules();

  const handleStartFlashcardMode = (filtered?: MappingItem[]) => {
    if (filtered && filtered.length > 0) {
      setFlashcardItems(filtered);
    } else {
      setFlashcardItems(MAPPING_ITEMS);
    }
    setViewMode('flashcard');
  };

  return (
    <ErrorBoundary>
      <div
        className='min-h-screen'
        style={{
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        {/* Top Sticky Header */}
        <header
          className='backdrop-blur-glass sticky top-0 z-40 border-b'
          style={{
            borderColor: 'var(--border)',
            background: 'var(--background)',
          }}
        >
          <div className='mx-auto max-w-7xl px-3 py-2.5 sm:px-6 sm:py-4'>
            <div className='flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between'>
              {/* Row 1: Back + Title + Badges */}
              <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
                <motion.button
                  className='rounded-xl border p-2 sm:p-2.5 transition-all hover:scale-105 shrink-0'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    borderColor: 'var(--border)',
                  }}
                  onClick={() => router.push(APP_ROUTES.HOME)}
                  whileTap={{ scale: 0.95 }}
                  title='Back to Main Flashcards'
                >
                  <FaArrowLeft className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
                </motion.button>

                <div className='min-w-0'>
                  <div className='flex items-center gap-1.5 sm:gap-2'>
                    <h1 className='gradient-text-accent text-base font-bold sm:text-xl lg:text-2xl truncate'>
                      English Journey
                    </h1>
                    <span
                      className='rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0 whitespace-nowrap'
                      style={{
                        background: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                    >
                      Repo
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: View Switcher Tabs & Single Agent Guide Button */}
              <div className='flex items-center gap-2'>
                <div
                  className='flex flex-1 sm:flex-initial items-center rounded-xl border p-1 shadow-inner'
                  style={{
                    background: 'var(--muted)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      viewMode === 'table'
                        ? 'shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      background:
                        viewMode === 'table'
                          ? 'var(--card)'
                          : 'transparent',
                      color:
                        viewMode === 'table'
                          ? 'var(--primary)'
                          : 'var(--foreground)',
                    }}
                  >
                    <FaTable className='h-3.5 w-3.5' />
                    <span>Table View</span>
                  </button>

                  <button
                    onClick={() => {
                      setFlashcardItems(MAPPING_ITEMS);
                      setViewMode('flashcard');
                    }}
                    className={`flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      viewMode === 'flashcard'
                        ? 'shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      background:
                        viewMode === 'flashcard'
                          ? 'var(--card)'
                          : 'transparent',
                      color:
                        viewMode === 'flashcard'
                          ? 'var(--primary)'
                          : 'var(--foreground)',
                    }}
                  >
                    <FaLayerGroup className='h-3.5 w-3.5' />
                    <span>Flashcards</span>
                  </button>
                </div>

                {/* Single Agent Guide Button */}
                <button
                  onClick={() => setShowAgentGuide(!showAgentGuide)}
                  className='flex rounded-xl border p-2 sm:p-2.5 transition-all hover:scale-105 shrink-0'
                  style={{
                    background: showAgentGuide ? 'var(--primary)' : 'var(--secondary)',
                    color: showAgentGuide ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                    borderColor: 'var(--border)',
                  }}
                  title='How to update with Antigravity Agent'
                >
                  <FaRobot className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8'>
          {/* Agent Guide Banner (Collapsible) */}
          {showAgentGuide && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='mb-6 rounded-2xl border p-4 sm:p-5 shadow-md'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <FaRobot className='h-5 w-5 text-blue-500' />
                  <h3 className='text-sm font-bold text-foreground sm:text-base'>
                    Alur Update Langsung via Antigravity Agent
                  </h3>
                </div>
                <button
                  onClick={() => setShowAgentGuide(false)}
                  className='text-xs font-medium'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Tutup
                </button>
              </div>

              <div className='mt-3 space-y-2 text-xs leading-relaxed text-foreground/90 sm:text-sm'>
                <p>
                  Anda tidak perlu lagi membuka Google Sheets atau copy-paste manual dari Gemini.
                  Cukup kirimkan screenshot atau teks soal baru ke chat <strong>Antigravity</strong>:
                </p>
                <div
                  className='rounded-lg p-3 font-mono text-xs'
                  style={{ background: 'var(--muted)' }}
                >
                  &quot;Tolong tambahkan soal ini ke mapping: [Question / Screenshot]&quot;
                </div>
                <p>
                  Agent akan langsung menganalisis kesalahan, membuat rumus LaTeX &amp; penjelasan Markdown, lalu menyimpannya ke file repositori <code className='font-mono font-semibold'>src/data/mappings/index.ts</code>.
                </p>
              </div>
            </motion.div>
          )}

          {/* Quick Stats Banner */}
          <div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
            <div
              className='rounded-xl border p-3.5 sm:p-4 shadow-sm'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <span
                className='text-[11px] font-semibold uppercase'
                style={{ color: 'var(--muted-foreground)' }}
              >
                Total Mappings
              </span>
              <p className='mt-1 text-xl font-bold text-foreground sm:text-2xl'>
                {MAPPING_ITEMS.length}
              </p>
            </div>

            <div
              className='rounded-xl border p-3.5 sm:p-4 shadow-sm'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <span
                className='text-[11px] font-semibold uppercase'
                style={{ color: 'var(--muted-foreground)' }}
              >
                Modules
              </span>
              <p className='mt-1 text-xl font-bold text-foreground sm:text-2xl'>
                {modules.length}
              </p>
            </div>

            <div
              className='rounded-xl border p-3.5 sm:p-4 shadow-sm'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <span
                className='text-[11px] font-semibold uppercase'
                style={{ color: 'var(--muted-foreground)' }}
              >
                Active View
              </span>
              <p className='mt-1 text-sm font-bold text-foreground sm:text-base capitalize'>
                {viewMode === 'table' ? 'Table Mode' : 'Flashcard Mode'}
              </p>
            </div>

            <div
              className='rounded-xl border p-3.5 sm:p-4 shadow-sm'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <span
                className='text-[11px] font-semibold uppercase'
                style={{ color: 'var(--muted-foreground)' }}
              >
                Storage
              </span>
              <p className='mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 sm:text-sm'>
                <span className='h-2 w-2 rounded-full bg-emerald-500 animate-pulse'></span>
                Local Repo
              </p>
            </div>
          </div>

          {/* Active View Component */}
          {viewMode === 'table' ? (
            <MappingTable
              items={MAPPING_ITEMS}
              onStartFlashcardMode={handleStartFlashcardMode}
            />
          ) : (
            <MappingFlashcards
              items={flashcardItems}
              onBackToTable={() => setViewMode('table')}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
