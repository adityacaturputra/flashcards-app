import React, { useState } from 'react';
import { Flashcard, FlashcardCategory, Progression } from '@/types/flashcard';
import Card from './Card';
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
    <Card
      className={`relative p-4 ${className}`}
      onClick={toggleAnswerVisibility}
    >
      {!isEditing && (
        <>
          <button className='absolute top-4 right-22 text-blue-500 hover:text-blue-700'>
            {isAnswerHidden ? <FaEye /> : <FaEyeSlash />}
          </button>
          <button
            className='absolute top-4 right-6 text-red-500 hover:text-red-700'
            onClick={handleDelete}
          >
            <FaTrashAlt />
          </button>

          <button
            className='absolute top-4 right-14 text-blue-500 hover:text-blue-700'
            onClick={handleEdit}
          >
            <FaPenToSquare />
          </button>

          <p className='absolute -top-1 left-6 mt-4'>{remainingTime}</p>

          <div className='flex items-center gap-2'>
            <h3 className='mt-4 text-xl font-bold'>{flashcard.question}</h3>
            {!isAnswerHidden && (
              <div className='flex items-center justify-center gap-2'>
                <button
                  className='text-blue-500 hover:text-blue-700'
                  onClick={() => openTTSInNewTab(flashcard.question)}
                >
                  <FaVolumeHigh />
                </button>
                <button
                  className='text-blue-500 hover:text-blue-700'
                  onClick={() =>
                    openGoogleSearchInNewTab(
                      'apa itu ' +
                        flashcard.question +
                        ' dan artinya serta berikan contohnya dalam percakapan bahasa inggris',
                      // +
                      //   ' ' +
                      //   flashcard.answer,
                      // +
                      // ' ' +
                      // Object.keys(flashcard.dynamicFields || {}).map(
                      //   (key) => `${key} ${flashcard.dynamicFields?.[key]} `,
                      // ),
                    )
                  }
                >
                  <FaMagnifyingGlass />
                </button>
              </div>
            )}
          </div>
          <div
            className={`${styles.content} ${isAnswerHidden ? styles.hidden : styles.visible}`}
          >
            <div className='flex items-center gap-2'>
              <p className='mt-2'>{flashcard.answer}</p>
              {!isAnswerHidden && (
                <div className='flex items-center justify-center gap-2'>
                  <button
                    className='text-blue-500 hover:text-blue-700'
                    onClick={() => openTTSInNewTab(flashcard.answer)}
                  >
                    <FaVolumeHigh />
                  </button>
                  <button
                    className='text-blue-500 hover:text-blue-700'
                    onClick={() =>
                      openGoogleSearchInNewTab(
                        'apa itu ' +
                          flashcard.answer +
                          ' dan artinya serta berikan contohnya dalam percakapan bahasa inggris',
                      )
                    }
                  >
                    <FaMagnifyingGlass />
                  </button>
                </div>
              )}
            </div>

            {flashcard.dynamicFields && (
              <div className='mt-4 items-center'>
                {renderViewModeDynamicFields()}
              </div>
            )}

            <div className='mt-4 flex items-center space-x-4 overflow-x-scroll'>
              {progressionOptions.map((progression) => (
                <button
                  key={progression}
                  className={`rounded px-2 py-1 text-white ${
                    flashcard.progression === progression
                      ? 'bg-blue-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => handleProgressionChange(progression)}
                >
                  {progression.charAt(0).toUpperCase() + progression.slice(1)}
                </button>
              ))}
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
    </Card>
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
