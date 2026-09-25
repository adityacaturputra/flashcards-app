'use client';
import React, { useMemo } from 'react';
import { FaFolderClosed, FaCodeMerge } from 'react-icons/fa6';
import { SyncSource, SYNC_SOURCE } from '@/types/sync';
import { useAppContext } from '@/context/appContext';

export type CategoryConflictChoice = SyncSource | 'both';

interface CategoriesConflictSectionProps {
  localCategories?: string[];
  cloudCategories?: string[];
  choice: CategoryConflictChoice;
  onChoiceChange: (choice: CategoryConflictChoice) => void;
  categoryNameMap?: Map<string, string>;
}

export const CategoriesConflictSection: React.FC<CategoriesConflictSectionProps> = ({
  localCategories = [],
  cloudCategories = [],
  choice,
  onChoiceChange,
  categoryNameMap,
}) => {
  const { categories: contextCategories = [] } = useAppContext();

  const nameLookup = useMemo(() => {
    const map = new Map<string, string>(categoryNameMap || []);
    contextCategories.forEach((c) => {
      if (c._id && !map.has(c._id.toString())) {
        map.set(c._id.toString(), c.name);
      }
      if (!map.has(c.name)) {
        map.set(c.name, c.name);
      }
    });
    return map;
  }, [categoryNameMap, contextCategories]);

  const getCategoryName = (id: string) => nameLookup.get(id) || id;

  const renderBadges = (categories: string[], emptyText = '(No Categories)') => {
    if (!categories || categories.length === 0) {
      return <span className='text-muted-foreground italic'>{emptyText}</span>;
    }
    return (
      <div className='flex flex-wrap gap-1 mt-1'>
        {categories.map((catId) => (
          <span
            key={catId}
            className='inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-slate-200/70 dark:bg-slate-800 text-foreground border border-black/5 dark:border-white/5 truncate max-w-[200px]'
            title={getCategoryName(catId)}
          >
            {getCategoryName(catId)}
          </span>
        ))}
      </div>
    );
  };

  const unionCategories = useMemo(() => {
    return Array.from(new Set([...localCategories, ...cloudCategories]));
  }, [localCategories, cloudCategories]);

  return (
    <div
      className='rounded-lg border overflow-hidden'
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Header Bar */}
      <div
        className='flex items-center justify-between px-3 py-1.5 border-b'
        style={{
          background: 'var(--secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='flex items-center gap-1.5 min-w-0'>
          <FaFolderClosed className='h-3.5 w-3.5 text-amber-500 shrink-0' />
          <span className='font-bold uppercase tracking-wider text-[10px] text-muted-foreground truncate'>
            Categories
          </span>
        </div>
        <div className='flex items-center gap-1.5 shrink-0'>
          <button
            type='button'
            onClick={() => onChoiceChange(SYNC_SOURCE.LOCAL)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
              choice === SYNC_SOURCE.LOCAL
                ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {choice === SYNC_SOURCE.LOCAL ? '✓ ' : ''}Local
          </button>
          <button
            type='button'
            onClick={() => onChoiceChange(SYNC_SOURCE.CLOUD)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
              choice === SYNC_SOURCE.CLOUD
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {choice === SYNC_SOURCE.CLOUD ? '✓ ' : ''}Cloud
          </button>
          <button
            type='button'
            onClick={() => onChoiceChange('both')}
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all flex items-center gap-1 ${
              choice === 'both'
                ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/40'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
            title='Combine both Local and Cloud categories'
          >
            <FaCodeMerge className='h-2.5 w-2.5' />
            {choice === 'both' ? '✓ ' : ''}Merge Both
          </button>
        </div>
      </div>

      {/* Comparison Details */}
      <div className='p-2.5 space-y-2 font-mono text-[11px]'>
        {/* Local Option */}
        <div
          onClick={() => onChoiceChange(SYNC_SOURCE.LOCAL)}
          className={`p-2 rounded-md cursor-pointer border transition-all ${
            choice === SYNC_SOURCE.LOCAL
              ? 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-300 ring-1 ring-red-500/30'
              : 'opacity-60 hover:opacity-90 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
          }`}
        >
          <div className='flex items-center justify-between'>
            <span className='font-bold select-none text-red-500'>- Local Categories:</span>
            <span className='text-[10px] text-muted-foreground'>({localCategories.length})</span>
          </div>
          {renderBadges(localCategories)}
        </div>

        {/* Cloud Option */}
        <div
          onClick={() => onChoiceChange(SYNC_SOURCE.CLOUD)}
          className={`p-2 rounded-md cursor-pointer border transition-all ${
            choice === SYNC_SOURCE.CLOUD
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30'
              : 'opacity-60 hover:opacity-90 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
          }`}
        >
          <div className='flex items-center justify-between'>
            <span className='font-bold select-none text-emerald-500'>+ Cloud Categories:</span>
            <span className='text-[10px] text-muted-foreground'>({cloudCategories.length})</span>
          </div>
          {renderBadges(cloudCategories)}
        </div>

        {/* Merge Option Preview */}
        {choice === 'both' && (
          <div className='p-2 rounded-md border bg-purple-500/10 border-purple-500/40 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500/30'>
            <div className='flex items-center justify-between'>
              <span className='font-bold select-none text-purple-600 dark:text-purple-400 flex items-center gap-1.5'>
                <FaCodeMerge className='h-3 w-3' />
                <span>Merged Union Result:</span>
              </span>
              <span className='text-[10px] text-muted-foreground'>({unionCategories.length})</span>
            </div>
            {renderBadges(unionCategories)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesConflictSection;
