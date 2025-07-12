// components/atoms/Flashcard.tsx
import React, { useState } from 'react';
import { Flashcard } from '@/types/flashcard';
import Card from './Card';
import ProgressionSelector from '../molecules/ProgressionSelector';
import calculateNextReviewDate from '@/utils/calculateNextReviewDate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatRemainingTime } from '@/utils/formatRemainingTime';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEye, FaEyeSlash, FaPenToSquare } from 'react-icons/fa6';
import useEditFlashcard from '@/hooks/useEditFlashcard';
import FlashcardFormEdit from '../organisms/FlashcardFormEdit';
import styles from './FlashcardComponent.module.css';

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

  const handleProgressionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const progression = e.target.value as Flashcard['progression'];
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

  return (
    <Card className={`relative p-4 ${className}`}>
      <button
        className='absolute top-2 right-2 text-red-500 hover:text-red-700'
        onClick={handleDelete}
      >
        <FaTrashAlt />
      </button>

      <button
        className='absolute top-2 right-10 text-blue-500 hover:text-blue-700'
        onClick={handleEdit}
      >
        <FaPenToSquare />
      </button>

      <h3 className='text-xl font-bold'>{flashcard.question}</h3>

      <button
        onClick={toggleAnswerVisibility}
        className='ml-2 text-blue-500 hover:text-blue-700'
      >
        {isAnswerHidden ? <FaEye /> : <FaEyeSlash />}
      </button>

      {!isEditing && (
        <div
          className={`${styles.content} ${isAnswerHidden ? styles.hidden : styles.visible}`}
        >
          <p className='mt-2'>{flashcard.answer}</p>

          {flashcard.dynamicFields && (
            <div className='mt-4 items-center'>
              {renderViewModeDynamicFields()}
            </div>
          )}

          <p className='mt-4'>Next Review: {remainingTime}</p>

          <div className='mt-4 flex items-center space-x-4'>
            <label className='font-medium text-gray-700'>Progression:</label>
            <ProgressionSelector
              value={flashcard.progression}
              onChange={handleProgressionChange}
              className='rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none'
            />
          </div>
        </div>
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
};

export default FlashcardComponent;
