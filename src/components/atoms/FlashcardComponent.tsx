import React, { useState } from 'react';
import { Flashcard, FlashcardCategory, Progression } from '@/types/flashcard';
import calculateNextReviewDate from '@/utils/calculateNextReviewDate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatRemainingTime } from '@/utils/formatRemainingTime';
import {
  FaEye,
  FaEyeSlash,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaVolumeHigh,
} from 'react-icons/fa6';
import useEditFlashcard from '@/hooks/useEditFlashcard';
import FlashcardFormEdit from '../organisms/FlashcardFormEdit';
import styles from './FlashcardComponent.module.css';
import { FaTrashAlt } from 'react-icons/fa';

dayjs.extend(relativeTime);

const FlashcardComponent: React.FC<FlashcardProps> = ({
  flashcard,
  onUpdate,
  onDelete,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnswerHidden, setIsAnswerHidden] = useState(true);

  const { handleCancel } = useEditFlashcard({
    flashcard,
    onUpdate,
    isEditing,
    setIsEditing,
  });

  const remainingTime = formatRemainingTime(flashcard.nextReviewDate);

  const handleProgressionChange = (progression: Flashcard['progression']) => {
    const nextReviewDate = calculateNextReviewDate(progression);
    onUpdate(flashcard._id!, { progression, nextReviewDate });
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
    return Object.entries(flashcard.dynamicFields || {}).map(([key, value]) => (
      <div key={key} className='items-center space-x-2'>
        <strong className='font-medium'>{key}:</strong>
        <span>{value}</span>
      </div>
    ));
  };

  // Function to open TTS in a new tab without referrer
  const openTTSInNewTab = (text: string) => {
    const ttsUrl = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
    const link = document.createElement('a');
    link.href = ttsUrl;
    link.rel = 'noopener noreferrer'; // Set rel attribute to avoid referrer issues
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to open Google search in a new tab
  const openGoogleSearchInNewTab = (query: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const link = document.createElement('a');
    link.href = searchUrl;
    link.rel = 'noopener noreferrer'; // Set rel attribute to avoid referrer issues
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progressionOptions = Object.values(Progression);

  return (
    <div
      className={`group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer ${className}`}
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow)',
      }}
      onClick={toggleAnswerVisibility}
    >
      {!isEditing && (
        <>
          {/* Header with time and actions */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center gap-2">
              <span 
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                }}
              >
                {remainingTime}
              </span>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswerVisibility();
                }}
                title={isAnswerHidden ? 'Show answer' : 'Hide answer'}
              >
                {isAnswerHidden ? (
                  <FaEye className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                ) : (
                  <FaEyeSlash className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                )}
              </button>
              
              <button 
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                title="Edit flashcard"
              >
                <FaPenToSquare className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              </button>
              
              <button 
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                title="Delete flashcard"
              >
                <FaTrashAlt className="w-4 h-4" style={{ color: 'var(--destructive)' }} />
              </button>
            </div>
          </div>

          {/* Question Section */}
          <div className="px-4 pb-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 
                  className="text-lg font-semibold leading-tight"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  {flashcard.question}
                </h3>
              </div>
              
              {!isAnswerHidden && (
                <div className="flex items-center gap-2 ml-2">
                  <button
                    className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openTTSInNewTab(flashcard.question);
                    }}
                    title="Listen to question"
                  >
                    <FaVolumeHigh className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                  </button>
                  <button
                    className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleSearchInNewTab(
                        'apa itu ' +
                          flashcard.question +
                          ' dan artinya serta berikan contohnya dalam percakapan bahasa inggris'
                      );
                    }}
                    title="Search question"
                  >
                    <FaMagnifyingGlass className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
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
              className="mx-4 mb-4 p-4 rounded-lg"
              style={{
                background: 'var(--muted)',
                borderLeft: '4px solid var(--primary)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p 
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {flashcard.answer}
                  </p>
                </div>
                
                {!isAnswerHidden && (
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openTTSInNewTab(flashcard.answer);
                      }}
                      title="Listen to answer"
                    >
                      <FaVolumeHigh className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                    </button>
                    <button
                      className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGoogleSearchInNewTab(
                          'apa itu ' +
                            flashcard.answer +
                            ' dan artinya serta berikan contohnya dalam percakapan bahasa inggris'
                        );
                      }}
                      title="Search answer"
                    >
                      <FaMagnifyingGlass className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Fields */}
              {flashcard.dynamicFields && (
                <div className="mt-4 space-y-2">
                  {renderViewModeDynamicFields()}
                </div>
              )}
            </div>

            {/* Progression Buttons */}
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {progressionOptions.map((progression) => {
                  const isActive = flashcard.progression === progression;
                  return (
                    <button
                      key={progression}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'shadow-sm transform scale-105'
                          : 'hover:shadow-sm hover:transform hover:scale-105'
                      }`}
                      style={{
                        background: isActive ? 'var(--primary)' : 'var(--secondary)',
                        color: isActive ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgressionChange(progression);
                      }}
                    >
                      {progression.charAt(0).toUpperCase() + progression.slice(1)}
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
    </div>
  );
};

type FlashcardProps = {
  flashcard: Flashcard;
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
  onDelete: (id: string) => Promise<void>;
  className?: string;
  categories?: FlashcardCategory[];
};

export default FlashcardComponent;
