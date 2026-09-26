'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBookBookmark,
  FaChevronDown,
  FaChevronUp,
  FaCircleExclamation,
  FaCheck,
} from 'react-icons/fa6';
import { REBUTTAL_CATEGORY_META } from '@/types/rebuttal';

export const RebuttalSignpostCheatSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div
      className='rounded-2xl border p-4 sm:p-5 shadow-xs transition-colors'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex w-full items-center justify-between gap-3 text-left focus:outline-none'
      >
        <div className='flex items-center gap-3 min-w-0'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400'>
            <FaBookBookmark className='h-4 w-4' />
          </div>
          <div>
            <h3 className='text-sm sm:text-base font-bold text-foreground flex items-center gap-2'>
              Kamus Penanda Wacana Sanggahan
              <span className='rounded-md bg-teal-500/10 px-2 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider'>
                Pilar 3
              </span>
            </h3>
            <p className='text-xs text-muted-foreground'>
              4 Kategori kata pemicu ralat yang wajib diwaspadai di IELTS Listening Section 1
            </p>
          </div>
        </div>

        <div className='flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 text-muted-foreground hover:text-foreground'>
          {isOpen ? <FaChevronUp className='h-3.5 w-3.5' /> : <FaChevronDown className='h-3.5 w-3.5' />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden'
          >
            <div
              className='overflow-x-auto w-full mt-4 rounded-xl border border-border/60'
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <table className='w-full min-w-[580px] text-left text-xs divide-y divide-border/60'>
                <thead className='bg-secondary/60 text-muted-foreground uppercase text-[10px] font-bold tracking-wider'>
                  <tr>
                    <th className='py-2.5 px-3.5'>Kategori Penanda</th>
                    <th className='py-2.5 px-3.5'>Frasa yang Sering Digunakan</th>
                    <th className='py-2.5 px-3.5'>Efek pada Informasi Sebelumnya</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border/40'>
                  {Object.values(REBUTTAL_CATEGORY_META).map((item) => (
                    <tr
                      key={item.id}
                      className='hover:bg-secondary/40 transition-colors'
                    >
                      <td className='py-3 px-3.5 font-semibold text-foreground align-top'>
                        <div className='flex flex-col'>
                          <span className='font-bold text-teal-700 dark:text-teal-400'>
                            {item.title}
                          </span>
                          <span className='text-[10px] text-muted-foreground'>
                            {item.subtitle}
                          </span>
                        </div>
                      </td>
                      <td className='py-3 px-3.5 align-top'>
                        <div className='flex flex-wrap gap-1.5'>
                          {item.triggerPhrases.map((phrase) => (
                            <span
                              key={phrase}
                              className='rounded-md bg-secondary border border-border/80 px-2 py-0.5 font-mono text-[11px] font-medium text-foreground'
                            >
                              {phrase}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className='py-3 px-3.5 text-muted-foreground align-top leading-relaxed'>
                        <div className='flex items-start gap-1.5'>
                          <FaCircleExclamation className='h-3 w-3 text-amber-500 mt-0.5 shrink-0' />
                          <span>{item.effectOnPreviousData}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-3 flex items-center gap-2 text-[11px] text-muted-foreground bg-teal-500/5 border border-teal-500/20 rounded-xl p-2.5'>
              <FaCheck className='h-3.5 w-3.5 text-teal-600 dark:text-teal-400 shrink-0' />
              <span>
                <strong>Taktik Pensil Coret:</strong> Begitu mendengar salah satu kata penanda di atas, segera coret data pertama dan siapkan telinga mencatat kata berikutnya!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RebuttalSignpostCheatSheet;
