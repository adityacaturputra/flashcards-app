'use client';
import React from 'react';
import { FaLayerGroup } from 'react-icons/fa6';
import { SyncSource, SYNC_SOURCE } from '@/types/sync';

interface DynamicFieldsConflictSectionProps {
  allDynamicKeys: string[];
  localDynamicFields?: Record<string, string>;
  cloudDynamicFields?: Record<string, string>;
  dynamicChoices: Record<string, SyncSource>;
  onSelectAllDynamic: (choice: SyncSource) => void;
  onKeyChoiceChange: (key: string, choice: SyncSource) => void;
}

export const DynamicFieldsConflictSection: React.FC<DynamicFieldsConflictSectionProps> = ({
  allDynamicKeys,
  localDynamicFields,
  cloudDynamicFields,
  dynamicChoices,
  onSelectAllDynamic,
  onKeyChoiceChange,
}) => {
  return (
    <div className='rounded-lg border overflow-hidden' style={{ borderColor: 'var(--border)' }}>
      {/* Dynamic Fields Header with Bulk Actions */}
      <div
        className='flex items-center justify-between px-3 py-1.5 border-b'
        style={{
          background: 'var(--secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='flex items-center gap-1.5'>
          <FaLayerGroup className='h-3 w-3 text-muted-foreground' />
          <span className='font-bold uppercase tracking-wider text-[10px] text-muted-foreground'>
            Dynamic Fields (Granular Key-by-Key)
          </span>
        </div>
        <div className='flex items-center gap-1.5'>
          <button
            onClick={() => onSelectAllDynamic(SYNC_SOURCE.LOCAL)}
            className='rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
            title='Select Local for all dynamic keys'
          >
            All Local
          </button>
          <button
            onClick={() => onSelectAllDynamic(SYNC_SOURCE.CLOUD)}
            className='rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
            title='Select Cloud for all dynamic keys'
          >
            All Cloud
          </button>
        </div>
      </div>

      {/* List of each individual key in dynamicFields */}
      <div className='divide-y' style={{ borderColor: 'var(--border)' }}>
        {allDynamicKeys.map((key) => {
          const currentChoice = dynamicChoices[key] || SYNC_SOURCE.LOCAL;
          const localVal = localDynamicFields?.[key];
          const cloudVal = cloudDynamicFields?.[key];
          const isKeyDiffering = (localVal || '').trim() !== (cloudVal || '').trim();

          return (
            <div key={key} className='p-2.5 space-y-1.5'>
              {/* Key Label & Row Controls */}
              <div className='flex items-center justify-between'>
                <span className='font-semibold text-foreground text-[11px]'>
                  {key}
                  {!isKeyDiffering && (
                    <span className='ml-2 text-[9px] text-muted-foreground font-normal'>
                      (Identical)
                    </span>
                  )}
                </span>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => onKeyChoiceChange(key, SYNC_SOURCE.LOCAL)}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                      currentChoice === SYNC_SOURCE.LOCAL
                        ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                        : 'text-muted-foreground hover:text-foreground border-transparent'
                    }`}
                  >
                    {currentChoice === SYNC_SOURCE.LOCAL ? '✓ ' : ''}Local
                  </button>
                  <button
                    onClick={() => onKeyChoiceChange(key, SYNC_SOURCE.CLOUD)}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                      currentChoice === SYNC_SOURCE.CLOUD
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                        : 'text-muted-foreground hover:text-foreground border-transparent'
                    }`}
                  >
                    {currentChoice === SYNC_SOURCE.CLOUD ? '✓ ' : ''}Cloud
                  </button>
                </div>
              </div>

              {/* Key Value Comparison Box */}
              <div className='font-mono text-[10px] space-y-1'>
                <div
                  onClick={() => onKeyChoiceChange(key, SYNC_SOURCE.LOCAL)}
                  className={`p-1.5 rounded cursor-pointer border transition-all flex items-start gap-1.5 ${
                    currentChoice === SYNC_SOURCE.LOCAL
                      ? 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 font-semibold'
                      : 'opacity-50 hover:opacity-80 border-transparent text-muted-foreground'
                  }`}
                >
                  <span className='text-red-500 font-bold select-none shrink-0'>- Local:</span>
                  <span className='whitespace-pre-wrap break-all'>
                    {localVal !== undefined ? localVal : '(not present)'}
                  </span>
                </div>

                <div
                  onClick={() => onKeyChoiceChange(key, SYNC_SOURCE.CLOUD)}
                  className={`p-1.5 rounded cursor-pointer border transition-all flex items-start gap-1.5 ${
                    currentChoice === SYNC_SOURCE.CLOUD
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'opacity-50 hover:opacity-80 border-transparent text-muted-foreground'
                  }`}
                >
                  <span className='text-emerald-500 font-bold select-none shrink-0'>+ Cloud:</span>
                  <span className='whitespace-pre-wrap break-all'>
                    {cloudVal !== undefined ? cloudVal : '(not present)'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicFieldsConflictSection;
