// src/components/molecules/quiz/ModuleTheoryView.tsx
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBookOpen,
  FaLightbulb,
  FaCheck,
  FaXmark,
  FaTriangleExclamation,
  FaAward,
} from 'react-icons/fa6';

export interface TheoryRuleItem {
  title: string;
  explanation: string;
  badExample?: string;
  goodExample: string;
  tip?: string;
}

export interface TheoryTrapItem {
  trap: string;
  solution: string;
}

export interface ModuleTheoryViewProps {
  title: string;
  subtitle: string;
  rubricTitle: string;
  cefr: string;
  accentColor: string;
  formula?: string;
  overview: string;
  rules: TheoryRuleItem[];
  commonTraps: TheoryTrapItem[];
  bandTips: string[];
}

export const ModuleTheoryView: React.FC<ModuleTheoryViewProps> = ({
  title,
  subtitle,
  rubricTitle,
  cefr,
  accentColor,
  formula,
  overview,
  rules,
  commonTraps,
  bandTips,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'traps' | 'band'>('rules');

  return (
    <div className='space-y-6 max-w-4xl mx-auto'>
      {/* Header Banner */}
      <div
        className='rounded-3xl border p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='flex items-center justify-between gap-2 flex-wrap'>
          <div className='flex items-center gap-2'>
            <div
              className='h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs'
              style={{
                background: `${accentColor}15`,
                color: accentColor,
              }}
            >
              <FaBookOpen className='h-4 w-4' />
            </div>
            <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
              Panduan Teori & Strategi
            </span>
          </div>
          <span
            className='rounded-full px-2.5 py-0.5 text-xs font-bold border'
            style={{
              borderColor: `${accentColor}40`,
              background: `${accentColor}10`,
              color: accentColor,
            }}
          >
            CEFR: {cefr}
          </span>
        </div>

        <div>
          <h2 className='text-xl sm:text-2xl font-black text-foreground'>{title}</h2>
          <p className='text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5'>
            {rubricTitle}
          </p>
          <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2'>
            {overview}
          </p>
        </div>

        {formula && (
          <div
            className='p-3.5 rounded-xl border flex items-center gap-3'
            style={{
              background: 'var(--muted)',
              borderColor: 'var(--border)',
            }}
          >
            <FaLightbulb className='h-4 w-4 text-amber-500 shrink-0' />
            <div className='text-xs font-mono font-medium text-foreground overflow-x-auto'>
              {formula}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div
        className='flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto shadow-inner scrollbar-none'
        style={{
          background: 'var(--muted)',
          borderColor: 'var(--border)',
        }}
      >
        <button
          onClick={() => setActiveTab('rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'rules'
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FaBookOpen className='h-3.5 w-3.5 text-emerald-500' />
          <span>Kaidah & Contoh ({rules.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('traps')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'traps'
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FaTriangleExclamation className='h-3.5 w-3.5 text-amber-500' />
          <span>Jebakan Sering Muncul ({commonTraps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('band')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'band'
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FaAward className='h-3.5 w-3.5 text-purple-500' />
          <span>Tips Band 7.5+ ({bandTips.length})</span>
        </button>
      </div>

      {/* Tab 1: Rules & Examples */}
      {activeTab === 'rules' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className='p-5 sm:p-6 rounded-2xl border space-y-3.5 shadow-xs'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='flex items-center gap-2'>
                <span
                  className='h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold text-white'
                  style={{ background: accentColor }}
                >
                  {idx + 1}
                </span>
                <h3 className='text-sm sm:text-base font-bold text-foreground'>{rule.title}</h3>
              </div>

              <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                {rule.explanation}
              </p>

              <div className='space-y-2 pt-1'>
                {rule.badExample && (
                  <div className='flex items-start gap-2.5 p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-foreground'>
                    <FaXmark className='h-4 w-4 text-red-500 shrink-0 mt-0.5' />
                    <div>
                      <span className='font-bold text-red-600 dark:text-red-400'>Kurang Tepat: </span>
                      <span className='line-through opacity-85'>{rule.badExample}</span>
                    </div>
                  </div>
                )}

                <div className='flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-foreground'>
                  <FaCheck className='h-4 w-4 text-emerald-500 shrink-0 mt-0.5' />
                  <div>
                    <span className='font-bold text-emerald-600 dark:text-emerald-400'>Standar Benar: </span>
                    <span className='font-medium'>{rule.goodExample}</span>
                  </div>
                </div>

                {rule.tip && (
                  <p className='text-[11px] text-muted-foreground italic pl-1'>
                    💡 <strong>Tips:</strong> {rule.tip}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tab 2: Common Traps */}
      {activeTab === 'traps' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
          {commonTraps.map((trap, idx) => (
            <div
              key={idx}
              className='p-5 rounded-2xl border space-y-2.5 shadow-xs'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <div className='flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400'>
                <FaTriangleExclamation className='h-3.5 w-3.5' />
                <span>Jebakan #{idx + 1}: {trap.trap}</span>
              </div>
              <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                <strong className='text-foreground'>Solusi Cerdas: </strong>
                {trap.solution}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tab 3: Band 7.5+ Tips */}
      {activeTab === 'band' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
          <div
            className='p-6 rounded-2xl border space-y-4 shadow-xs'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <h3 className='text-sm font-bold text-foreground flex items-center gap-2'>
              <FaAward className='h-4 w-4 text-purple-500' />
              <span>Kriteria Penguji Cambridge untuk {subtitle}</span>
            </h3>

            <div className='space-y-2.5'>
              {bandTips.map((tip, idx) => (
                <div key={idx} className='flex items-start gap-2.5 text-xs text-muted-foreground'>
                  <span className='h-5 w-5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5'>
                    {idx + 1}
                  </span>
                  <span className='leading-relaxed'>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModuleTheoryView;
