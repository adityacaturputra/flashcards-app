'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaRobot,
  FaGem,
  FaArrowUpRightFromSquare,
  FaMagnifyingGlass,
  FaBookOpen,
} from 'react-icons/fa6';
import { GEMINI_STUDY_TOOLS } from '@/data/geminiTools';
import GeminiToolCard from '@/components/organisms/GeminiToolCard';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import { APP_ROUTES } from '@/constants/routes';

export default function GeminiToolsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(GEMINI_STUDY_TOOLS.map((tool) => tool.category))
    );
    return ['All', ...cats];
  }, []);

  const filteredTools = useMemo(() => {
    return GEMINI_STUDY_TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <ErrorBoundary>
      <div
        className='min-h-screen pb-16'
        style={{
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        {/* Sticky Header */}
        <header
          className='backdrop-blur-glass sticky top-0 z-40 border-b'
          style={{
            borderColor: 'var(--border)',
            background: 'var(--background)',
          }}
        >
          <div className='mx-auto max-w-7xl px-3 py-2.5 sm:px-6 sm:py-4'>
            <div className='flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between'>
              {/* Left: Back & Title */}
              <div className='flex items-center gap-2.5 sm:gap-3 min-w-0'>
                <motion.button
                  className='rounded-xl border p-2 sm:p-2.5 transition-all hover:scale-105 shrink-0'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    borderColor: 'var(--border)',
                  }}
                  onClick={() => router.push(APP_ROUTES.HOME)}
                  title='Kembali ke Flashcards'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaArrowLeft className='h-4 w-4' />
                </motion.button>

                <div className='min-w-0'>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary'>
                      <FaRobot className='h-3.5 w-3.5' />
                      <span>Gemini AI Suite</span>
                    </div>
                    <span
                      className='rounded-full px-2 py-0.5 text-[10px] font-bold'
                      style={{
                        background: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                    >
                      8 Master Tools
                    </span>
                  </div>
                  <h1 className='truncate text-lg sm:text-2xl font-bold tracking-tight'>
                    AI English Study Tools
                  </h1>
                </div>
              </div>

              {/* Right: Quick Launch Navigation to Google Gemini */}
              <div className='flex items-center gap-2'>
                <button
                  onClick={() =>
                    window.open(
                      'https://gemini.google.com/app',
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  className='flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs sm:text-sm font-semibold transition-all hover:scale-102'
                  style={{
                    borderColor: 'var(--border)',
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                >
                  <span>Gemini Chat</span>
                  <FaArrowUpRightFromSquare className='h-3 w-3' />
                </button>

                <button
                  onClick={() =>
                    window.open(
                      'https://gemini.google.com/gem-labs/new',
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  className='flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all hover:scale-102 shadow-xs'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  title='Buka pembuat Gem baru di Gemini'
                >
                  <FaGem className='h-3.5 w-3.5' />
                  <span>Buat Gem Baru</span>
                  <FaArrowUpRightFromSquare className='h-3 w-3' />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className='mx-auto max-w-7xl px-3 pt-4 sm:px-6 sm:pt-6'>
          {/* Welcome / Intro Banner */}
          <div
            className='mb-6 overflow-hidden rounded-2xl border p-4 sm:p-6 shadow-sm'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='max-w-2xl'>
                <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1'>
                  <FaBookOpen className='h-3.5 w-3.5' />
                  <span>Koleksi Terkurasi & Upgraded</span>
                </div>
                <h2 className='text-base sm:text-xl font-bold'>
                  Bebas Berlatih Bahasa Inggris 24 Jam dengan Google Gemini
                </h2>
                <p
                  className='mt-1.5 text-xs sm:text-sm leading-relaxed'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Pilih salah satu tool di bawah, klik <strong>Copy Prompt MD</strong>, lalu klik tombol <strong>Buka Gemini</strong> (atau buat permanen di menu <strong>Gems</strong>). Prompt telah dioptimalkan agar tidak memonopoli bicara dan nyaman digunakan dalam <strong>Voice Mode ponsel</strong>.
                </p>
              </div>

              <div className='flex flex-wrap sm:flex-col gap-2 shrink-0'>
                <button
                  onClick={() => router.push(APP_ROUTES.MAPPING)}
                  className='flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all hover:bg-slate-100 dark:hover:bg-slate-800'
                  style={{
                    borderColor: 'var(--border)',
                    background: 'var(--muted)',
                    color: 'var(--foreground)',
                  }}
                >
                  <span>Buka Study Mapping</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Category Pills */}
            <div className='flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none'>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isActive ? 'shadow-xs' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      background: isActive
                        ? 'var(--primary)'
                        : 'var(--secondary)',
                      color: isActive
                        ? 'var(--primary-foreground)'
                        : 'var(--secondary-foreground)',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className='relative sm:w-72'>
              <FaMagnifyingGlass
                className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5'
                style={{ color: 'var(--muted-foreground)' }}
              />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Cari tool atau topik...'
                className='w-full rounded-xl border py-1.5 pl-9 pr-3 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              />
            </div>
          </div>

          {/* Tools Grid */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {filteredTools.map((tool) => (
              <GeminiToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div
              className='rounded-2xl border p-8 text-center mt-6'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--muted-foreground)',
              }}
            >
              <p className='text-sm'>Tidak ada tool yang cocok dengan pencarian Anda.</p>
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
