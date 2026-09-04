'use client';
import React, { memo } from 'react';
import {
  FaChevronRight,
  FaGraduationCap,
  FaPlay,
  FaFileLines,
  FaClipboardQuestion,
  FaClock,
  FaXmark,
} from 'react-icons/fa6';
import { IELTS_MODULES } from '@/data/ielts';
import { IeltsChapter } from '@/types/ielts';

interface IeltsCurriculumSidebarProps {
  activeChapterId: string;
  onSelectChapter: (chapter: IeltsChapter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
}

export const IeltsCurriculumSidebar: React.FC<IeltsCurriculumSidebarProps> = memo(
  ({
    activeChapterId,
    onSelectChapter,
    searchQuery,
    onSearchChange,
    isDrawer = false,
    onCloseDrawer,
  }) => {
    return (
      <aside
        className={`flex flex-col h-full ${
          isDrawer
            ? 'p-3.5 sm:p-4'
            : 'rounded-2xl border p-3 sm:p-4 shadow-sm'
        }`}
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)',
        }}
      >
        {/* Header & Search */}
        <div className='pb-3 border-b' style={{ borderColor: 'var(--border)' }}>
          <div className='flex items-center justify-between gap-2 mb-2.5'>
            <div className='flex items-center gap-2 min-w-0'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0'>
                <FaGraduationCap className='h-4 w-4' />
              </div>
              <div className='min-w-0'>
                <h2 className='text-sm font-bold text-foreground truncate'>
                  Daftar Modul & Materi
                </h2>
                <p className='text-[11px] text-muted-foreground truncate'>
                  Silabus IELTS Band 7+ Complete Prep
                </p>
              </div>
            </div>

            {isDrawer && onCloseDrawer && (
              <button
                onClick={onCloseDrawer}
                className='flex h-8 w-8 items-center justify-center rounded-xl border transition-all shrink-0 hover:opacity-80 active:scale-95'
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                  borderColor: 'var(--border)',
                }}
                aria-label='Tutup navigasi bab'
              >
                <FaXmark className='h-4 w-4' />
              </button>
            )}
          </div>

          <input
            type='text'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder='Cari bab atau topik...'
            className='w-full rounded-xl border px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          />
        </div>

        {/* Modules List */}
        <div className='flex-1 overflow-y-auto space-y-4 pt-3 pr-1'>
          {IELTS_MODULES.map((mod) => {
            const hasChapters = mod.chapters.length > 0;
            const filteredChapters = mod.chapters.filter((c) => {
              if (!searchQuery.trim()) return true;
              const q = searchQuery.toLowerCase();
              return (
                c.title.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q) ||
                (c.keyTakeaways && c.keyTakeaways.some((t) => t.toLowerCase().includes(q)))
              );
            });

            if (searchQuery.trim() && filteredChapters.length === 0) {
              return null;
            }

            return (
              <div key={mod.moduleNumber} className='space-y-1.5'>
                <div className='flex items-center justify-between px-1 gap-2'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate'>
                    Modul {mod.moduleNumber}: {mod.title.replace(/^Bagian \d+:\s*/, '')}
                  </span>
                  {hasChapters ? (
                    <span
                      className='text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0'
                      style={{
                        background: 'var(--secondary)',
                        color: 'var(--secondary-foreground)',
                      }}
                    >
                      {mod.chapters.length} Bab
                    </span>
                  ) : (
                    <span
                      className='text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0'
                      style={{
                        background: 'var(--secondary)',
                        color: 'var(--secondary-foreground)',
                      }}
                    >
                      Segera
                    </span>
                  )}
                </div>

                {hasChapters ? (
                  <div className='space-y-1'>
                    {filteredChapters.map((ch) => {
                      const isActive = ch.id === activeChapterId;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => onSelectChapter(ch)}
                          className={`w-full rounded-xl p-2.5 sm:p-3 transition-all flex items-start gap-2.5 sm:gap-3 text-left border ${
                            isActive
                              ? 'shadow-xs font-semibold'
                              : 'hover:opacity-90'
                          }`}
                          style={
                            isActive
                              ? {
                                  background: 'rgba(59, 130, 246, 0.12)',
                                  borderColor: 'var(--primary)',
                                  color: 'var(--foreground)',
                                }
                              : {
                                  background: 'transparent',
                                  borderColor: 'transparent',
                                  color: 'var(--foreground)',
                                }
                          }
                        >
                          {/* Type Icon */}
                          <div
                            className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold mt-0.5'
                            style={
                              isActive
                                ? {
                                    background: 'var(--primary)',
                                    color: 'var(--primary-foreground)',
                                  }
                                : {
                                    background: 'var(--secondary)',
                                    color: 'var(--secondary-foreground)',
                                  }
                            }
                          >
                            {ch.itemType === 'video' ? (
                              <FaPlay className='h-2.5 w-2.5 ml-0.5' />
                            ) : ch.itemType === 'quiz' ? (
                              <FaClipboardQuestion className='h-3.5 w-3.5' />
                            ) : (
                              <FaFileLines className='h-3 w-3' />
                            )}
                          </div>

                          {/* Text Container - explicitly text-left */}
                          <div className='min-w-0 flex-1 text-left flex flex-col items-start'>
                            <p
                              className='text-xs font-semibold leading-snug line-clamp-2 text-left w-full'
                              style={{
                                color: isActive
                                  ? 'var(--primary)'
                                  : 'var(--foreground)',
                              }}
                            >
                              {ch.title}
                            </p>
                            <div className='flex items-center gap-2 text-[10px] text-muted-foreground mt-1 text-left w-full'>
                              <span className='capitalize font-medium'>{ch.itemType}</span>
                              {ch.duration && (
                                <span className='flex items-center gap-1 opacity-80'>
                                  <FaClock className='h-2.5 w-2.5' />
                                  {ch.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Arrow Right */}
                          <FaChevronRight
                            className='h-3 w-3 shrink-0 mt-1.5 transition-transform'
                            style={{
                              color: isActive
                                ? 'var(--primary)'
                                : 'var(--muted-foreground)',
                              opacity: isActive ? 1 : 0.4,
                              transform: isActive ? 'translateX(2px)' : 'none',
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className='flex items-center justify-between rounded-xl border border-dashed px-2.5 py-1.5 text-[11px]'
                    style={{
                      borderColor: 'var(--border)',
                      background: 'var(--secondary)',
                      color: 'var(--secondary-foreground)',
                    }}
                  >
                    <span className='truncate text-[10px]'>Materi sedang dipersiapkan</span>
                    <span className='text-[9px] font-semibold'>Rilis Mendatang</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    );
  }
);

IeltsCurriculumSidebar.displayName = 'IeltsCurriculumSidebar';
export default IeltsCurriculumSidebar;
