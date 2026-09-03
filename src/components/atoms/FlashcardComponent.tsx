import React, { useState, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import { Flashcard, FlashcardCategory, Progression } from '@/types/flashcard';
import calculateNextReviewDate from '@/utils/calculateNextReviewDate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatRemainingTime } from '@/utils/formatRemainingTime';
import { openTTSInNewTab, openGoogleSearchInNewTab } from '@/utils/externalLinks';
import {
  FaEye,
  FaEyeSlash,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaVolumeHigh,
  FaEllipsisVertical,
  FaPlus,
} from 'react-icons/fa6';
import useEditFlashcard from '@/hooks/useEditFlashcard';
import { useSearchTemplateContext } from '@/context/searchTemplateContext';
import FlashcardFormEdit from '../organisms/FlashcardFormEdit';
import styles from './FlashcardComponent.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import TextArea from './TextArea';
import MarkdownViewer from './MarkdownViewer';

dayjs.extend(relativeTime);

const FlashcardComponent: React.FC<FlashcardProps> = memo(
  ({
    flashcard,
    onUpdate,
    onDelete,
    className = '',
    isBulkMode = false,
    isSelected = false,
    onToggleSelection,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAnswerHidden, setIsAnswerHidden] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAddExplanationOpen, setIsAddExplanationOpen] = useState(false);
    const [newExplanationTitle, setNewExplanationTitle] = useState('');
    const [newExplanationContent, setNewExplanationContent] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Use the global search template context
    const { generateSearchQuery } = useSearchTemplateContext();

    const { handleCancel } = useEditFlashcard({
      flashcard,
      onUpdate,
      isEditing,
      setIsEditing,
    });

    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      };

      if (isMenuOpen) {
        setIsAnswerHidden(false);
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isMenuOpen]);

    const remainingTime = flashcard.nextReviewDate
      ? formatRemainingTime(flashcard.nextReviewDate)
      : 'Due now';

    const handleProgressionChange = async (
      progression: Flashcard['progression'],
    ) => {
      setIsUpdating(true);
      try {
        const nextReviewDate = calculateNextReviewDate(progression);
        await onUpdate(flashcard._id!, { progression, nextReviewDate });
        // Add a small delay to ensure loading indicator is visible
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error('Error updating flashcard:', error);
      } finally {
        setIsUpdating(false);
      }
    };

    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete the flashcard with question: "${flashcard.question}"?`,
        )
      ) {
        onDelete(flashcard._id!);
      }
    };

    const handleEdit = () => {
      setIsEditing(true);
    };

    const toggleAnswerVisibility = () => {
      setIsAnswerHidden(!isAnswerHidden);
    };

    const renderViewModeDynamicFields = () => {
      return Object.entries(flashcard.dynamicFields || {}).map(
        ([key, value]) => (
          <div
            key={key}
            className='mt-3 rounded-xl border p-3.5 shadow-xs'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className='mb-1.5 flex items-center justify-between'>
              <span
                className='text-[10px] sm:text-xs font-bold uppercase tracking-wider'
                style={{ color: 'var(--primary)' }}
              >
                {key}
              </span>
            </div>
            <div className='text-xs sm:text-sm leading-relaxed'>
              <MarkdownViewer content={value} showCopyButton={false} />
            </div>
          </div>
        ),
      );
    };

    const handleSearch = (text: string) => {
      const query = generateSearchQuery(text);
      openGoogleSearchInNewTab(query);
    };

    const progressionOptions = Object.values(Progression);

    // Get next available version number for explanation title
    const getNextVersionTitle = () => {
      const currentFields = flashcard.dynamicFields || {};
      const existingKeys = Object.keys(currentFields);

      // Find all existing version numbers (v1, v2, v3, etc.)
      const versionNumbers = existingKeys
        .filter((key) => /^v\d+$/i.test(key))
        .map((key) => parseInt(key.slice(1), 10));

      // Find the next available version number
      let nextVersion = 1;
      while (versionNumbers.includes(nextVersion)) {
        nextVersion++;
      }

      return `v${nextVersion}`;
    };

    // Handle opening the add explanation modal
    const handleOpenAddExplanation = () => {
      setNewExplanationTitle(getNextVersionTitle());
      setNewExplanationContent('');
      setIsAddExplanationOpen(true);
      setIsAnswerHidden(false);
    };

    // Handle quick add explanation
    const handleSaveExplanation = async () => {
      if (!newExplanationTitle.trim() || !newExplanationContent.trim()) return;

      // Close modal immediately and show loading on card
      const titleToSave = newExplanationTitle.trim();
      const contentToSave = newExplanationContent.trim();
      setNewExplanationTitle('');
      setNewExplanationContent('');
      setIsAddExplanationOpen(false);

      setIsUpdating(true);
      try {
        const currentFields = flashcard.dynamicFields || {};
        const updatedFields = {
          ...currentFields,
          [titleToSave]: contentToSave,
        };
        await onUpdate(flashcard._id!, { dynamicFields: updatedFields });
      } catch (error) {
        console.error('Error adding explanation:', error);
      } finally {
        setIsUpdating(false);
      }
    };

    const handleCancelExplanation = () => {
      setNewExplanationTitle('');
      setNewExplanationContent('');
      setIsAddExplanationOpen(false);
    };

    return (
      <div
        className={`group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 ${className}`}
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow)',
        }}
        onClick={(e) => {
          // Only toggle answer if the click is not on the menu button or dropdown
          if (
            !menuRef.current?.contains(e.target as Node) &&
            !buttonRef.current?.contains(e.target as Node)
          ) {
            toggleAnswerVisibility();
          }
        }}
      >
        {!isEditing && (
          <>
            {/* Header with time and actions */}
            <div className='flex items-center justify-between p-4 pb-2'>
              <div className='flex items-center gap-2'>
                {/* Bulk Selection Checkbox */}
                {isBulkMode && (
                  <input
                    type='checkbox'
                    checked={isSelected}
                    onChange={() => onToggleSelection?.(flashcard._id || '')}
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                <button
                  className='rounded-full px-2 py-1 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAnswerVisibility();
                  }}
                  title={isAnswerHidden ? 'Show answer' : 'Hide answer'}
                >
                  {isAnswerHidden ? (
                    <FaEye
                      className='h-3 w-3'
                      style={{ color: 'var(--primary)' }}
                    />
                  ) : (
                    <FaEyeSlash
                      className='h-3 w-3'
                      style={{ color: 'var(--primary)' }}
                    />
                  )}
                </button>
                <span
                  className='rounded-full px-2 py-1 text-xs font-medium'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                >
                  {remainingTime}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                {/* Loading Progress Indicator */}
                {isUpdating && (
                  <div className={`${styles.loadingIndicator}`}>
                    <div className={`${styles.spinner}`}></div>
                  </div>
                )}

                {/* Quick Add Explanation Button */}
                <button
                  className='rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAddExplanation();
                  }}
                  title='Add Explanation'
                >
                  <FaPlus
                    className='h-4 w-4'
                    style={{ color: 'var(--primary)' }}
                  />
                </button>

                {/* Triple Dots Menu */}
                <div ref={menuRef} className='relative'>
                  <button
                    ref={buttonRef}
                    className='rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuOpen(!isMenuOpen);
                    }}
                    title='Actions'
                  >
                    <FaEllipsisVertical
                      className='h-4 w-4'
                      style={{ color: 'var(--primary)' }}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div
                      className={`${styles.dropdownMenu}`}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: '0',
                        zIndex: 9999,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className='flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEdit();
                          setIsMenuOpen(false);
                        }}
                      >
                        <FaPenToSquare
                          className='h-4 w-4'
                          style={{ color: 'var(--primary)' }}
                        />
                        <span>Edit flashcard</span>
                      </button>

                      <button
                        className='flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-red-50 dark:hover:bg-red-900/20'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete();
                          setIsMenuOpen(false);
                        }}
                      >
                        <FaTrashAlt
                          className='h-4 w-4'
                          style={{ color: 'var(--destructive)' }}
                        />
                        <span>Delete flashcard</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Question Section */}
            <div className='px-4 pb-3'>
              <div className='flex items-start gap-3'>
                <div className='flex-1'>
                  <h3
                    className='text-lg leading-tight font-semibold'
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {flashcard.question || 'No question available'}
                  </h3>
                </div>

                {!isAnswerHidden && (
                  <div className='ml-2 flex items-center gap-2'>
                    <button
                      className='rounded-md p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                      onClick={(e) => {
                        e.stopPropagation();
                        openTTSInNewTab(flashcard.question);
                      }}
                      title='Listen to question'
                    >
                      <FaVolumeHigh
                        className='h-3.5 w-3.5'
                        style={{ color: 'var(--primary)' }}
                      />
                    </button>
                    <button
                      className='rounded-md p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch(flashcard.question);
                      }}
                      title='Search question'
                    >
                      <FaMagnifyingGlass
                        className='h-3.5 w-3.5'
                        style={{ color: 'var(--primary)' }}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Answer Section */}
            <div
              className={`${styles.content} ${isAnswerHidden ? styles.hidden : styles.visible}`}
            >
              <div
                className='mx-4 mb-4 rounded-xl border p-4 shadow-sm'
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  borderLeft: '4px solid var(--primary)',
                }}
              >
                <div className='flex items-start gap-3'>
                  <div className='flex-1'>
                    <MarkdownViewer
                      content={flashcard.answer || 'No answer available'}
                      showCopyButton={false}
                    />
                  </div>

                  {!isAnswerHidden && (
                    <div className='ml-2 flex items-center gap-2'>
                      <button
                        className='rounded-md p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                        onClick={(e) => {
                          e.stopPropagation();
                          openTTSInNewTab(flashcard.answer);
                        }}
                        title='Listen to answer'
                      >
                        <FaVolumeHigh
                          className='h-3.5 w-3.5'
                          style={{ color: 'var(--primary)' }}
                        />
                      </button>
                      <button
                        className='rounded-md p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSearch(flashcard.answer);
                        }}
                        title='Search answer'
                      >
                        <FaMagnifyingGlass
                          className='h-3.5 w-3.5'
                          style={{ color: 'var(--primary)' }}
                        />
                      </button>
                    </div>
                  )}
                </div>

                {/* Dynamic Fields */}
                {flashcard.dynamicFields && (
                  <div className='mt-4 space-y-2'>
                    {renderViewModeDynamicFields()}
                  </div>
                )}
              </div>

              {/* Progression Buttons */}
              <div className='px-4 pb-4'>
                <div className='flex flex-wrap gap-2'>
                  {progressionOptions.map((progression) => {
                    const isActive = flashcard.progression === progression;
                    return (
                      <button
                        key={progression}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'scale-105 transform shadow-sm'
                            : 'hover:scale-105 hover:transform hover:shadow-sm'
                        }`}
                        style={{
                          background: isActive
                            ? 'var(--primary)'
                            : 'var(--secondary)',
                          color: isActive
                            ? 'var(--primary-foreground)'
                            : 'var(--secondary-foreground)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProgressionChange(progression);
                        }}
                      >
                        {progression.charAt(0).toUpperCase() +
                          progression.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {isEditing ? (
          <FlashcardFormEdit
            flashcard={flashcard}
            onUpdate={onUpdate}
            onCancel={handleCancel}
          />
        ) : null}

        {/* Quick Add Explanation Modal - Rendered via Portal */}
        {isAddExplanationOpen &&
          createPortal(
            <div
              className='flex flex-col'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99999,
                background: 'var(--card)',
                padding: '1rem',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className='mb-4 text-lg font-semibold'
                style={{ color: 'var(--foreground)' }}
              >
                Add Explanation
              </h3>

              {/* Title Input */}
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-medium'
                  style={{ color: 'var(--foreground)' }}
                >
                  Title
                </label>
                <input
                  type='text'
                  value={newExplanationTitle}
                  onChange={(e) => setNewExplanationTitle(e.target.value)}
                  placeholder='e.g., Example, Note, Hint...'
                  className='w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none'
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                  }}
                />
              </div>

              {/* Content TextArea with RTE */}
              <div className='mb-4 flex flex-1 flex-col'>
                <label
                  className='mb-2 block text-sm font-medium'
                  style={{ color: 'var(--foreground)' }}
                >
                  Content
                </label>
                <TextArea
                  value={newExplanationContent}
                  onChange={(e) => setNewExplanationContent(e.target.value)}
                  placeholder='Enter explanation content...'
                  className='w-full flex-1'
                  rows={10}
                />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3'>
                <button
                  onClick={handleSaveExplanation}
                  disabled={
                    !newExplanationTitle.trim() ||
                    !newExplanationContent.trim()
                  }
                  className='flex-1 rounded-lg px-4 py-2 font-medium transition-all hover:scale-105 disabled:opacity-50'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelExplanation}
                  className='flex-1 rounded-lg px-4 py-2 font-medium transition-all hover:scale-105'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>,
            document.body,
          )}
      </div>
    );
  },
);

type FlashcardProps = {
  flashcard: Flashcard;
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  className?: string;
  categories?: FlashcardCategory[];
  // Bulk selection props
  isBulkMode?: boolean;
  isSelected?: boolean;
  onToggleSelection?: (id: string) => void;
};

FlashcardComponent.displayName = 'FlashcardComponent';

export default FlashcardComponent;
