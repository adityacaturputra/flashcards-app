'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMicrophone,
  FaStethoscope,
  FaBriefcase,
  FaLightbulb,
  FaHeadphones,
  FaGraduationCap,
  FaDumbbell,
  FaDatabase,
  FaCopy,
  FaCheck,
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaChevronUp,
  FaGem,
} from 'react-icons/fa6';
import { GeminiStudyTool } from '@/types/geminiTool';
import MarkdownViewer from '@/components/atoms/MarkdownViewer';

interface GeminiToolCardProps {
  tool: GeminiStudyTool;
}

const renderIcon = (iconName: GeminiStudyTool['iconName']) => {
  const props = { className: 'h-5 w-5 sm:h-6 sm:w-6' };
  switch (iconName) {
    case 'microphone':
      return <FaMicrophone {...props} />;
    case 'stethoscope':
      return <FaStethoscope {...props} />;
    case 'briefcase':
      return <FaBriefcase {...props} />;
    case 'lightbulb':
      return <FaLightbulb {...props} />;
    case 'headphones':
      return <FaHeadphones {...props} />;
    case 'graduation':
      return <FaGraduationCap {...props} />;
    case 'dumbbell':
      return <FaDumbbell {...props} />;
    case 'database':
      return <FaDatabase {...props} />;
    default:
      return <FaGem {...props} />;
  }
};

export const GeminiToolCard: React.FC<GeminiToolCardProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tool.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  const handleOpenGeminiApp = async () => {
    try {
      await navigator.clipboard.writeText(tool.prompt);
      setCopyToast('✅ Prompt otomatis disalin! Tekan Cmd+V (Paste) di chat Gemini.');
      setTimeout(() => setCopyToast(null), 4000);
    } catch (err) {
      console.error(err);
    }
    window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
  };

  const handleOpenGeminiGems = async () => {
    try {
      await navigator.clipboard.writeText(tool.prompt);
      setCopyToast('✅ Prompt otomatis disalin! Tekan Cmd+V (Paste) di kolom Instructions Gem.');
      setTimeout(() => setCopyToast(null), 4000);
    } catch (err) {
      console.error(err);
    }
    window.open('https://gemini.google.com/gem-labs/new', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className='group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div>
        {/* Top Header Row */}
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div
              className='flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 shadow-xs'
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              {renderIcon(tool.iconName)}
            </div>
            <div>
              <div className='flex flex-wrap items-center gap-1.5'>
                <span className='font-mono text-xs font-bold text-primary'>
                  Tool #{tool.number}
                </span>
                <span
                  className='rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                >
                  {tool.category}
                </span>
              </div>
              <h3 className='text-base sm:text-lg font-bold leading-tight mt-0.5'>
                {tool.title}
              </h3>
            </div>
          </div>

          <span
            className='shrink-0 rounded-md border px-2 py-1 text-[10px] sm:text-xs font-semibold'
            style={{
              borderColor: 'var(--border)',
              background: 'var(--muted)',
              color: 'var(--muted-foreground)',
            }}
          >
            {tool.recommendedMode}
          </span>
        </div>

        {/* Tagline */}
        <p className='mt-3 text-xs sm:text-sm font-medium italic text-primary/90'>
          &ldquo;{tool.tagline}&rdquo;
        </p>

        {/* Description */}
        <p
          className='mt-2 text-xs sm:text-sm leading-relaxed'
          style={{ color: 'var(--muted-foreground)' }}
        >
          {tool.description}
        </p>

        {/* Best Practice Callout */}
        <div
          className='mt-3.5 rounded-xl border p-3 text-xs leading-relaxed'
          style={{
            background: 'var(--muted)',
            borderColor: 'var(--border)',
          }}
        >
          <span className='font-bold text-foreground'>💡 Tips Praktik: </span>
          <span style={{ color: 'var(--muted-foreground)' }}>
            {tool.bestPracticeTip}
          </span>
        </div>
      </div>

      {/* Action Buttons & Prompt Preview */}
      <div className='mt-5 pt-4 border-t' style={{ borderColor: 'var(--border)' }}>
        {/* Primary Actions Row */}
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <button
            onClick={handleCopy}
            className='flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all hover:scale-102 active:scale-98 shadow-xs'
            style={{
              background: copied ? '#10b981' : 'var(--primary)',
              color: '#ffffff',
            }}
            title='Copy complete system prompt to clipboard'
          >
            {copied ? (
              <>
                <FaCheck className='h-3.5 w-3.5' />
                <span>Prompt Tersalin!</span>
              </>
            ) : (
              <>
                <FaCopy className='h-3.5 w-3.5' />
                <span>Copy Prompt MD</span>
              </>
            )}
          </button>

          <div className='flex items-center gap-1.5'>
            <button
              onClick={handleOpenGeminiApp}
              className='flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all hover:scale-102 hover:bg-slate-100 dark:hover:bg-slate-800'
              style={{
                borderColor: 'var(--border)',
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
              title='Buka Gemini Chat'
            >
              <span>Buka Gemini</span>
              <FaArrowUpRightFromSquare className='h-3 w-3' />
            </button>

            <button
              onClick={handleOpenGeminiGems}
              className='flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all hover:scale-102 hover:bg-slate-100 dark:hover:bg-slate-800'
              style={{
                borderColor: 'var(--border)',
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
              }}
              title='Buka gem-labs/new dan simpan prompt sebagai Gem baru'
            >
              <FaGem className='h-3 w-3 text-amber-500' />
              <span>Buat Gem</span>
              <FaArrowUpRightFromSquare className='h-3 w-3' />
            </button>
          </div>
        </div>

        {/* Copy Toast Banner */}
        <AnimatePresence>
          {copyToast && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className='mt-2.5 flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400'
            >
              <FaCheck className='h-3.5 w-3.5 shrink-0' />
              <span>{copyToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible Prompt Toggle */}
        <div className='mt-3'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex w-full items-center justify-between rounded-lg py-1.5 px-2 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800'
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span>{isExpanded ? 'Sembunyikan Isi Prompt' : 'Lihat Isi Prompt Lengkap'}</span>
            {isExpanded ? (
              <FaChevronUp className='h-3 w-3' />
            ) : (
              <FaChevronDown className='h-3 w-3' />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='mt-2 overflow-hidden rounded-xl border p-3'
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                }}
              >
                <MarkdownViewer content={tool.prompt} showCopyButton={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GeminiToolCard;
