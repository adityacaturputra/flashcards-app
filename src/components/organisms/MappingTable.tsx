'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMagnifyingGlass,
  FaXmark,
  FaBookOpen,
  FaLayerGroup,
  FaCheck,
  FaGraduationCap,
} from 'react-icons/fa6';
import { MappingItem } from '@/types/mapping';
import { useMappingFilter } from '@/hooks/useMappingFilter';
import MappingDetailModal from '../molecules/MappingDetailModal';

interface MappingTableProps {
  items: MappingItem[];
  onStartFlashcardMode?: (filteredItems?: MappingItem[]) => void;
}

export const MappingTable: React.FC<MappingTableProps> = ({
  items,
  onStartFlashcardMode,
}) => {
  const {
    selectedModule,
    setSelectedModule,
    searchQuery,
    setSearchQuery,
    moduleStats,
    uniqueModules,
    filteredItems,
    activeModalItem,
    setActiveModalItem,
    handleNextModalItem,
    handlePrevModalItem,
    hasPrevModalItem,
    hasNextModalItem,
  } = useMappingFilter(items);

  return (
    <div className='space-y-4 sm:space-y-6'>
      {/* Filter and Search Bar */}
      <div className='space-y-3 sm:space-y-4'>
        {/* Module Filter Pills */}
        <div className='flex items-center gap-1.5 overflow-x-auto pb-1'>
          <button
            onClick={() => setSelectedModule(null)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all hover:scale-105 ${
              selectedModule === null
                ? 'shadow-md'
                : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              background:
                selectedModule === null
                  ? 'var(--primary)'
                  : 'var(--secondary)',
              color:
                selectedModule === null
                  ? 'var(--primary-foreground)'
                  : 'var(--secondary-foreground)',
            }}
          >
            <span>All Modules</span>
            <span className='rounded-full bg-black/15 px-1.5 py-0.2 text-[10px] dark:bg-white/20'>
              {items.length}
            </span>
          </button>

          {uniqueModules.map((mod) => {
            const isSelected = selectedModule === mod;
            return (
              <button
                key={mod}
                onClick={() => setSelectedModule(isSelected ? null : mod)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all hover:scale-105 ${
                  isSelected ? 'shadow-md' : 'opacity-80 hover:opacity-100'
                }`}
                style={{
                  background: isSelected
                    ? 'var(--primary)'
                    : 'var(--secondary)',
                  color: isSelected
                    ? 'var(--primary-foreground)'
                    : 'var(--secondary-foreground)',
                }}
              >
                <span>{mod}</span>
                <span className='rounded-full bg-black/15 px-1.5 py-0.2 text-[10px] dark:bg-white/20'>
                  {moduleStats[mod]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Action Buttons */}
        <div className='flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between'>
          <div className='relative flex-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5'>
              <FaMagnifyingGlass
                className='h-3.5 w-3.5 sm:h-4 sm:w-4'
                style={{ color: 'var(--muted-foreground)' }}
              />
            </div>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by module, title, question, correction, or rule...'
              className='w-full rounded-xl border py-2 pr-10 pl-9 sm:py-2.5 sm:pl-10 text-xs sm:text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none'
              style={{
                background: 'var(--input)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute inset-y-0 right-0 flex items-center pr-3'
                style={{ color: 'var(--muted-foreground)' }}
              >
                <FaXmark className='h-3.5 w-3.5' />
              </button>
            )}
          </div>

          {onStartFlashcardMode && (
            <button
              onClick={() => onStartFlashcardMode(filteredItems)}
              className='flex items-center justify-center gap-2 rounded-xl px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all hover:scale-105 hover:shadow-md'
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              <FaLayerGroup className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
              <span>Study as Flashcards ({filteredItems.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* MOBILE VIEW: Responsive Card List (Visible on mobile/tablet screens < md) */}
      <div className='block md:hidden space-y-3'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className='rounded-2xl border p-4 shadow-sm transition-all active:scale-[0.99] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: index * 0.03 }}
            >
              {/* Card Header: Module + Source + Index */}
              <div className='flex items-start justify-between gap-2 mb-2'>
                <div className='flex flex-wrap items-center gap-1.5'>
                  <span
                    className='rounded-md px-2 py-0.5 text-[10px] font-bold uppercase'
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--primary)',
                    }}
                  >
                    {item.module}
                  </span>
                  {item.source && (
                    <span className='flex items-center gap-1 text-[11px] font-medium text-muted-foreground'>
                      <FaGraduationCap className='h-3 w-3 text-blue-500' />
                      <span className='truncate max-w-[130px]'>{item.source}</span>
                    </span>
                  )}
                  {item.chapter && (
                    <span className='rounded bg-blue-500/10 px-1.5 py-0.2 text-[10px] font-medium text-blue-600 dark:text-blue-400'>
                      {item.chapter}
                    </span>
                  )}
                </div>
                <span
                  className='font-mono text-xs font-semibold'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  #{index + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className='font-bold text-sm text-foreground mb-2'>
                {item.title}
              </h3>

              {/* Question Box */}
              <div
                className='mb-2.5 rounded-xl border p-2.5 text-xs'
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                }}
              >
                <span
                  className='text-[10px] font-bold uppercase tracking-wider block mb-0.5'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Question:
                </span>
                <p className='font-semibold text-foreground leading-relaxed'>
                  &quot;{item.question}&quot;
                </p>
              </div>

              {/* The Things That Should Be Fix */}
              <div
                className='mb-3 rounded-xl border-l-4 p-2.5 text-xs shadow-xs'
                style={{
                  borderColor: 'var(--fix-border)',
                  background: 'var(--fix-bg)',
                }}
              >
                <div
                  className='flex items-start gap-1.5 font-mono font-bold'
                  style={{ color: 'var(--fix-text)' }}
                >
                  <FaCheck
                    className='h-3.5 w-3.5 shrink-0 mt-0.5'
                    style={{ color: 'var(--fix-icon)' }}
                  />
                  <span>{item.correction}</span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalItem(item);
                }}
                className='w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm'
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                <FaBookOpen className='h-3 w-3' />
                <span>View Remarks & Explanation</span>
              </button>
            </motion.div>
          ))
        ) : (
          <div
            className='rounded-2xl border p-8 text-center'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <p className='text-sm font-semibold text-foreground'>
              No mapping records found
            </p>
            <p className='text-xs text-muted-foreground mt-1'>
              Try adjusting your search query or module filter.
            </p>
          </div>
        )}

        {filteredItems.length > 0 && (
          <div
            className='flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs'
            style={{
              background: 'var(--muted)',
              borderColor: 'var(--border)',
              color: 'var(--muted-foreground)',
            }}
          >
            <span>
              Showing <strong>{filteredItems.length}</strong> of{' '}
              <strong>{items.length}</strong> records
            </span>
            {selectedModule && (
              <span className='font-medium'>
                Module: <strong>{selectedModule}</strong>
              </span>
            )}
          </div>
        )}
      </div>

      {/* DESKTOP VIEW: Full Spreadsheet Table (Visible on md+ screens) */}
      <div
        className='hidden md:block overflow-hidden rounded-2xl border shadow-sm'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-left'>
            <thead>
              <tr
                className='border-b text-xs font-bold uppercase tracking-wider'
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                  color: 'var(--muted-foreground)',
                }}
              >
                <th className='w-12 py-3.5 pr-2 pl-4 text-center'>#</th>
                <th className='min-w-[120px] px-4 py-3.5'>Module</th>
                <th className='min-w-[160px] px-4 py-3.5'>Title</th>
                <th className='min-w-[220px] px-4 py-3.5'>Question</th>
                <th className='min-w-[200px] px-4 py-3.5'>
                  The things that should be fix
                </th>
                <th className='min-w-[180px] px-4 py-3.5'>Source / Context</th>
                <th className='w-28 px-4 py-3.5 text-center'>Remarks</th>
              </tr>
            </thead>
            <tbody
              className='divide-y text-sm'
              style={{ borderColor: 'var(--border)' }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    className='group cursor-pointer transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
                    onClick={() => setActiveModalItem(item)}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.02 }}
                  >
                    {/* Index */}
                    <td
                      className='py-4 pr-2 pl-4 text-center font-mono text-xs font-semibold'
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {index + 1}
                    </td>

                    {/* Module */}
                    <td className='px-4 py-4 align-top'>
                      <span
                        className='inline-block rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap'
                        style={{
                          background: 'var(--secondary)',
                          color: 'var(--primary)',
                        }}
                      >
                        {item.module}
                      </span>
                    </td>

                    {/* Title */}
                    <td className='px-4 py-4 align-top'>
                      <span className='font-semibold text-foreground'>
                        {item.title}
                      </span>
                    </td>

                    {/* Question */}
                    <td className='px-4 py-4 align-top'>
                      <span className='text-foreground/90'>
                        {item.question}
                      </span>
                    </td>

                    {/* The things that should be fix */}
                    <td className='px-4 py-4 align-top'>
                      <div className='flex items-start gap-1.5'>
                        <FaCheck
                          className='mt-0.5 h-3.5 w-3.5 shrink-0'
                          style={{ color: 'var(--fix-icon)' }}
                        />
                        <span
                          className='font-mono text-xs font-bold'
                          style={{ color: 'var(--fix-text)' }}
                        >
                          {item.correction}
                        </span>
                      </div>
                    </td>

                    {/* Source / Context */}
                    <td className='px-4 py-4 align-top'>
                      {item.source ? (
                        <div className='space-y-1'>
                          <div className='flex items-center gap-1 text-xs font-semibold text-foreground'>
                            <FaGraduationCap className='h-3.5 w-3.5 shrink-0 text-blue-500' />
                            <span>{item.source}</span>
                          </div>
                          {item.chapter && (
                            <div className='text-[11px] text-muted-foreground'>
                              {item.chapter}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className='text-xs text-muted-foreground'>-</span>
                      )}
                    </td>

                    {/* Remarks Button */}
                    <td className='px-4 py-4 text-center align-top'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalItem(item);
                        }}
                        className='inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all hover:scale-105 hover:shadow-sm'
                        style={{
                          background: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                          borderColor: 'var(--primary)',
                        }}
                        title='Open full markdown explanation'
                      >
                        <FaBookOpen className='h-3 w-3' />
                        <span className='hidden sm:inline'>View MD</span>
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='py-12 text-center'>
                    <div className='mx-auto max-w-sm space-y-2'>
                      <p
                        className='text-base font-semibold'
                        style={{ color: 'var(--foreground)' }}
                      >
                        No mapping records found
                      </p>
                      <p
                        className='text-xs'
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        Try adjusting your search query or module filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Summary */}
        <div
          className='flex items-center justify-between border-t px-4 py-3 text-xs'
          style={{
            background: 'var(--muted)',
            borderColor: 'var(--border)',
            color: 'var(--muted-foreground)',
          }}
        >
          <span>
            Showing <strong>{filteredItems.length}</strong> of{' '}
            <strong>{items.length}</strong> records
          </span>
          {selectedModule && (
            <span className='font-medium'>
              Filtered by module: <strong>{selectedModule}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <MappingDetailModal
        isOpen={Boolean(activeModalItem)}
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onNext={handleNextModalItem}
        onPrev={handlePrevModalItem}
        hasNext={hasNextModalItem}
        hasPrev={hasPrevModalItem}
      />
    </div>
  );
};

export default MappingTable;
