'use client';
import React from 'react';
import { FaVolumeHigh, FaMagnifyingGlass, FaQuoteLeft } from 'react-icons/fa6';
import MarkdownViewer from '../atoms/MarkdownViewer';
import {
  isWordFamilyField,
  isCollocationField,
  isSentenceTransformationField,
  parseWordFamilyItems,
  parseCollocationItems,
  parseSentenceTransformation,
} from '@/utils/dynamicFieldHelpers';
import { stripMarkdownForTTS } from '@/utils/speechSynthesis';

export interface DynamicFieldRendererProps {
  fieldKey: string;
  value: string;
  cardQuestion?: string;
  onPlaySpeech: (fieldId: string, text: string, e?: React.MouseEvent) => void;
  isPlaying: (fieldId: string) => boolean;
  onSearch: (text: string) => void;
  className?: string;
}

export const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({
  fieldKey,
  value,
  cardQuestion = '',
  onPlaySpeech,
  isPlaying,
  onSearch,
  className = '',
}) => {
  if (!value || value.trim().length === 0) return null;

  const headerFieldId = `field_${fieldKey}`;
  const cleanHeaderSpeech = stripMarkdownForTTS(value);

  // Check specialized dynamic field types
  const isWordFamily = isWordFamilyField(fieldKey);
  const isCollocation = isCollocationField(fieldKey);
  const isTransformation = isSentenceTransformationField(fieldKey);

  // Render Word Family Matrix (Chips with per-word audio & search)
  if (isWordFamily) {
    const items = parseWordFamilyItems(value);
    if (items.length > 0) {
      return (
        <div
          className={`mt-3 rounded-xl border p-3.5 shadow-xs transition-all ${className}`}
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Header */}
          <div className='mb-2.5 flex items-center justify-between gap-2 border-b pb-2' style={{ borderColor: 'var(--border)' }}>
            <span
              className='text-[10px] sm:text-xs font-bold uppercase tracking-wider'
              style={{ color: 'var(--primary)' }}
            >
              {fieldKey}
            </span>
            <div className='flex items-center gap-1.5'>
              <button
                type='button'
                onClick={(e) => onPlaySpeech(headerFieldId, cleanHeaderSpeech, e)}
                className={`rounded-md p-1.5 text-xs transition-colors ${
                  isPlaying(headerFieldId)
                    ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                    : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary'
                }`}
                title={`Dengarkan semua ${fieldKey}`}
                aria-label={`Dengarkan semua ${fieldKey}`}
              >
                <FaVolumeHigh className={`h-3 w-3 ${isPlaying(headerFieldId) ? 'animate-pulse' : ''}`} />
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  onSearch(`${cardQuestion} ${fieldKey}`);
                }}
                className='rounded-md p-1.5 text-xs text-muted-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary'
                title={`Cari ${fieldKey}`}
                aria-label={`Cari ${fieldKey}`}
              >
                <FaMagnifyingGlass className='h-3 w-3' />
              </button>
            </div>
          </div>

          {/* Interactive Word Chips */}
          <div className='flex flex-wrap gap-2 pt-0.5'>
            {items.map((item, idx) => {
              const chipId = `chip_${fieldKey}_${idx}_${item.cleanWord}`;
              const playing = isPlaying(chipId);
              return (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-all ${
                    playing
                      ? 'border-primary bg-primary/10 text-primary font-semibold shadow-xs'
                      : 'border-border bg-secondary/60 hover:bg-secondary text-foreground'
                  }`}
                >
                  <span className='font-medium'>{item.raw}</span>
                  <div className='flex items-center gap-1 ml-0.5 border-l pl-1.5 border-border/80'>
                    <button
                      type='button'
                      onClick={(e) => onPlaySpeech(chipId, item.cleanWord, e)}
                      className={`p-0.5 rounded transition-colors ${
                        playing ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      }`}
                      title={`Ucapkan "${item.cleanWord}"`}
                      aria-label={`Ucapkan "${item.cleanWord}"`}
                    >
                      <FaVolumeHigh className={`h-2.5 w-2.5 ${playing ? 'animate-pulse' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        onSearch(item.cleanWord);
                      }}
                      className='p-0.5 rounded text-muted-foreground hover:text-primary transition-colors'
                      title={`Cari "${item.cleanWord}"`}
                      aria-label={`Cari "${item.cleanWord}"`}
                    >
                      <FaMagnifyingGlass className='h-2.5 w-2.5' />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  // Render IELTS Academic Collocations (Individual bullet lines with audio & search)
  if (isCollocation) {
    const collocations = parseCollocationItems(value);
    if (collocations.length > 0) {
      return (
        <div
          className={`mt-3 rounded-xl border p-3.5 shadow-xs transition-all ${className}`}
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Header */}
          <div className='mb-2 flex items-center justify-between gap-2 border-b pb-2' style={{ borderColor: 'var(--border)' }}>
            <span
              className='text-[10px] sm:text-xs font-bold uppercase tracking-wider'
              style={{ color: 'var(--primary)' }}
            >
              {fieldKey}
            </span>
            <div className='flex items-center gap-1.5'>
              <button
                type='button'
                onClick={(e) => onPlaySpeech(headerFieldId, cleanHeaderSpeech, e)}
                className={`rounded-md p-1.5 text-xs transition-colors ${
                  isPlaying(headerFieldId)
                    ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                    : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary'
                }`}
                title={`Dengarkan semua kolokasi`}
                aria-label={`Dengarkan semua kolokasi`}
              >
                <FaVolumeHigh className={`h-3 w-3 ${isPlaying(headerFieldId) ? 'animate-pulse' : ''}`} />
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  onSearch(`${cardQuestion} collocations`);
                }}
                className='rounded-md p-1.5 text-xs text-muted-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary'
                title={`Cari kolokasi`}
                aria-label={`Cari kolokasi`}
              >
                <FaMagnifyingGlass className='h-3 w-3' />
              </button>
            </div>
          </div>

          {/* List of Collocations */}
          <div className='space-y-1.5 pt-0.5'>
            {collocations.map((col, idx) => {
              const colId = `col_${fieldKey}_${idx}`;
              const playing = isPlaying(colId);
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all ${
                    playing
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/70 bg-secondary/40 hover:bg-secondary/70 text-foreground'
                  }`}
                >
                  <span className='font-medium leading-relaxed'>{col.cleanText}</span>
                  <div className='flex items-center gap-1.5 shrink-0'>
                    <button
                      type='button'
                      onClick={(e) => onPlaySpeech(colId, col.cleanText, e)}
                      className={`p-1 rounded transition-colors ${
                        playing ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      }`}
                      title={`Dengarkan "${col.cleanText}"`}
                      aria-label={`Dengarkan "${col.cleanText}"`}
                    >
                      <FaVolumeHigh className={`h-3 w-3 ${playing ? 'animate-pulse' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        onSearch(col.cleanText);
                      }}
                      className='p-1 rounded text-muted-foreground hover:text-primary transition-colors'
                      title={`Cari "${col.cleanText}"`}
                      aria-label={`Cari "${col.cleanText}"`}
                    >
                      <FaMagnifyingGlass className='h-3 w-3' />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  // Render Sentence Transformation (Band 5 vs Band 8+ Comparison)
  if (isTransformation) {
    const transformation = parseSentenceTransformation(value);
    if (transformation) {
      const band5Id = `trans_b5_${fieldKey}`;
      const band8Id = `trans_b8_${fieldKey}`;
      const playingB5 = isPlaying(band5Id);
      const playingB8 = isPlaying(band8Id);

      return (
        <div
          className={`mt-3 rounded-xl border p-3.5 shadow-xs transition-all ${className}`}
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Header */}
          <div className='mb-2.5 flex items-center justify-between gap-2 border-b pb-2' style={{ borderColor: 'var(--border)' }}>
            <span
              className='text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5'
              style={{ color: 'var(--primary)' }}
            >
              <FaQuoteLeft className='h-3 w-3' />
              <span>{fieldKey}</span>
            </span>
          </div>

          <div className='space-y-2.5 pt-0.5'>
            {/* Band 5 (Everyday) */}
            {transformation.band5 && (
              <div className='rounded-lg border border-red-500/20 bg-red-500/5 p-2.5 text-xs'>
                <div className='flex items-center justify-between gap-2 mb-1'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400'>
                    ❌ Bahasa Sehari-hari (Band 5.0–6.0)
                  </span>
                  <div className='flex items-center gap-1 shrink-0'>
                    <button
                      type='button'
                      onClick={(e) => onPlaySpeech(band5Id, transformation.band5, e)}
                      className={`p-1 rounded transition-colors ${
                        playingB5 ? 'text-red-600' : 'text-muted-foreground hover:text-red-600'
                      }`}
                      title='Dengarkan kalimat Band 5'
                      aria-label='Dengarkan kalimat Band 5'
                    >
                      <FaVolumeHigh className={`h-3 w-3 ${playingB5 ? 'animate-pulse' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        onSearch(transformation.band5);
                      }}
                      className='p-1 rounded text-muted-foreground hover:text-foreground transition-colors'
                      title='Cari kalimat Band 5'
                      aria-label='Cari kalimat Band 5'
                    >
                      <FaMagnifyingGlass className='h-3 w-3' />
                    </button>
                  </div>
                </div>
                <p className='text-muted-foreground leading-relaxed italic'>
                  &quot;{transformation.band5}&quot;
                </p>
              </div>
            )}

            {/* Band 8+ (Academic) */}
            {transformation.band8 && (
              <div className='rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-xs'>
                <div className='flex items-center justify-between gap-2 mb-1'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400'>
                    ✅ Academic IELTS Writing Task 2 (Band 8.0+)
                  </span>
                  <div className='flex items-center gap-1 shrink-0'>
                    <button
                      type='button'
                      onClick={(e) => onPlaySpeech(band8Id, transformation.band8, e)}
                      className={`p-1 rounded transition-colors ${
                        playingB8 ? 'text-emerald-600' : 'text-muted-foreground hover:text-emerald-600'
                      }`}
                      title='Dengarkan kalimat Band 8+'
                      aria-label='Dengarkan kalimat Band 8+'
                    >
                      <FaVolumeHigh className={`h-3 w-3 ${playingB8 ? 'animate-pulse' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        onSearch(transformation.band8);
                      }}
                      className='p-1 rounded text-muted-foreground hover:text-foreground transition-colors'
                      title='Cari kalimat Band 8+'
                      aria-label='Cari kalimat Band 8+'
                    >
                      <FaMagnifyingGlass className='h-3 w-3' />
                    </button>
                  </div>
                </div>
                <p className='text-foreground font-semibold leading-relaxed'>
                  &quot;{transformation.band8}&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  // Fallback for General Dynamic Fields (MarkdownViewer + Header Audio & Search)
  const isPlayingHeader = isPlaying(headerFieldId);
  return (
    <div
      className={`mt-3 rounded-xl border p-3.5 shadow-xs transition-all ${className}`}
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className='mb-1.5 flex items-center justify-between gap-2'>
        <span
          className='text-[10px] sm:text-xs font-bold uppercase tracking-wider'
          style={{ color: 'var(--primary)' }}
        >
          {fieldKey}
        </span>
        <div className='flex items-center gap-1.5'>
          <button
            type='button'
            onClick={(e) => onPlaySpeech(headerFieldId, cleanHeaderSpeech, e)}
            className={`rounded-md p-1.5 text-xs transition-colors ${
              isPlayingHeader
                ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary'
            }`}
            title={`Dengarkan ${fieldKey}`}
            aria-label={`Dengarkan ${fieldKey}`}
          >
            <FaVolumeHigh className={`h-3 w-3 ${isPlayingHeader ? 'animate-pulse' : ''}`} />
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onSearch(`${cardQuestion} ${cleanHeaderSpeech.slice(0, 60)}`);
            }}
            className='rounded-md p-1.5 text-xs text-muted-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary'
            title={`Cari ${fieldKey}`}
            aria-label={`Cari ${fieldKey}`}
          >
            <FaMagnifyingGlass className='h-3 w-3' />
          </button>
        </div>
      </div>
      <div className='text-xs sm:text-sm leading-relaxed'>
        <MarkdownViewer content={value} showCopyButton={false} />
      </div>
    </div>
  );
};

export default DynamicFieldRenderer;
