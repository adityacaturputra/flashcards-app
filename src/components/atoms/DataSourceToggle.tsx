import React, { memo } from 'react';
import { FaFolder, FaDatabase, FaBolt } from 'react-icons/fa';
import { useAppContext } from '@/context/appContext';
import { DataSource } from '@/types/dataSource';

interface DataSourceToggleProps {
  className?: string;
  compact?: boolean;
}

export const DataSourceToggle: React.FC<DataSourceToggleProps> = memo(
  ({ className = '', compact = false }) => {
    const { dataSource, setDataSource, loading } = useAppContext();

    const handleSelect = (source: DataSource) => {
      if (source !== dataSource && !loading) {
        setDataSource(source);
      }
    };

    return (
      <div
        className={`inline-flex items-center rounded-xl p-1 shadow-sm border transition-all ${className}`}
        style={{
          background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
          borderColor: 'var(--border, rgba(255, 255, 255, 0.1))',
        }}
        role='group'
        aria-label='Data Source Selector'
      >
        {/* Local Repo Option */}
        <button
          type='button'
          onClick={() => handleSelect(DataSource.Local)}
          disabled={loading}
          className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
            dataSource === DataSource.Local
              ? 'text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          } ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          style={
            dataSource === DataSource.Local
              ? {
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                }
              : {}
          }
          title='Local Repository (3,428 flashcards, instant offline access)'
        >
          <FaFolder className='text-xs' />
          {!compact && <span>Local Repo</span>}
          {dataSource === DataSource.Local && (
            <span className='flex items-center text-[10px] bg-emerald-700/60 px-1 py-0.2 rounded text-emerald-100 ml-0.5'>
              <FaBolt className='text-[8px] mr-0.5 text-amber-300' />
              Fast
            </span>
          )}
        </button>

        {/* MongoDB Cloud Option */}
        <button
          type='button'
          onClick={() => handleSelect(DataSource.MongoDB)}
          disabled={loading}
          className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
            dataSource === DataSource.MongoDB
              ? 'text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          } ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          style={
            dataSource === DataSource.MongoDB
              ? {
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                }
              : {}
          }
          title='MongoDB Cloud (Remote database connection)'
        >
          <FaDatabase className='text-xs' />
          {!compact && <span>MongoDB</span>}
          {dataSource === DataSource.MongoDB && (
            <span className='text-[10px] bg-blue-700/60 px-1 py-0.2 rounded text-blue-100 ml-0.5'>
              Cloud
            </span>
          )}
        </button>
      </div>
    );
  },
);

DataSourceToggle.displayName = 'DataSourceToggle';

export default DataSourceToggle;
