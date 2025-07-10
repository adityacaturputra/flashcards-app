// components/atoms/Flashcard.tsx
import React from 'react';
import { Flashcard } from '@/types/flashcard';
import Card from './Card';
import ProgressionSelector from '../molecules/ProgressionSelector';
import calculateNextReviewDate from '@/utils/calculateNextReviewDate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatRemainingTime } from '@/utils/formatRemainingTime';
import {
  FaTrashAlt,
  FaPlusCircle,
  FaMinusCircle,
  FaArrowDown,
  FaArrowUp,
} from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';

dayjs.extend(relativeTime);

const FlashcardComponent: React.FC<FlashcardProps> = ({
  flashcard,
  onUpdate,
  onDelete,
  className = '',
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [question, setQuestion] = React.useState(flashcard.question);
  const [answer, setAnswer] = React.useState(flashcard.answer);
  const [dynamicFields, setDynamicFields] = React.useState<{
    [key: string]: string;
  }>(flashcard.dynamicFields || {});

  const remainingTime = formatRemainingTime(flashcard.nextReviewDate);

  const handleProgressionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const progression = e.target.value as Flashcard['progression'];
    const nextReviewDate = calculateNextReviewDate(progression);
    onUpdate(flashcard._id!, { progression: progression, nextReviewDate });
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

  const handleSave = () => {
    onUpdate(flashcard._id!, { question, answer, dynamicFields });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
    setDynamicFields(flashcard.dynamicFields || {});
    setIsEditing(false);
  };

  const handleDynamicFieldChange = (key: string, value: string) => {
    setDynamicFields({
      ...dynamicFields,
      [key]: value,
    });
  };

  const addDynamicField = (
    position: 'start' | 'end' | 'before' | 'after',
    referenceKey?: string,
  ) => {
    const newKeyGen = (i: number) => {
      const generatedKey = `v${Object.keys(dynamicFields).length + i + 1}`;
      if (dynamicFields[generatedKey]) {
        return newKeyGen(i + 1);
      }
      return generatedKey;
    };
    const newKey = newKeyGen(0);
    const dynamicFieldEntries = Object.entries(dynamicFields);
    const newFields: { [key: string]: string } = {};

    if (position === 'start') {
      newFields[newKey] = '';
      dynamicFieldEntries.forEach(([key, value]) => {
        newFields[key] = value;
      });
    } else if (position === 'end') {
      dynamicFieldEntries.forEach(([key, value]) => {
        newFields[key] = value;
      });
      newFields[newKey] = '';
    } else if (position === 'before' && referenceKey) {
      dynamicFieldEntries.forEach(([key, value]) => {
        if (key === referenceKey) {
          newFields[newKey] = '';
        }
        newFields[key] = value;
      });
    } else if (position === 'after' && referenceKey) {
      dynamicFieldEntries.forEach(([key, value]) => {
        newFields[key] = value;
        if (key === referenceKey) {
          newFields[newKey] = '';
        }
      });
    }

    setDynamicFields(newFields);
  };

  const deleteDynamicField = (key: string) => {
    const updatedFields = { ...dynamicFields };
    delete updatedFields[key];
    setDynamicFields(updatedFields);
  };

  const moveDynamicField = (key: string, direction: 'up' | 'down') => {
    const dynamicFieldEntries = Object.entries(dynamicFields);
    const index = dynamicFieldEntries.findIndex(([k]) => k === key);

    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      [dynamicFieldEntries[index], dynamicFieldEntries[index - 1]] = [
        dynamicFieldEntries[index - 1],
        dynamicFieldEntries[index],
      ];
    } else if (direction === 'down' && index < dynamicFieldEntries.length - 1) {
      [dynamicFieldEntries[index], dynamicFieldEntries[index + 1]] = [
        dynamicFieldEntries[index + 1],
        dynamicFieldEntries[index],
      ];
    }

    const newDynamicFields: { [key: string]: string } = {};
    dynamicFieldEntries.forEach(([k, v]) => {
      newDynamicFields[k] = v;
    });
    setDynamicFields(newDynamicFields);
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

      {isEditing ? (
        <div>
          <input
            type='text'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='rounded border border-gray-300 p-2 text-xl font-bold'
          />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className='mt-2 rounded border border-gray-300 p-2'
          />

          {Object.entries(dynamicFields).map(([key, value]) => (
            <div key={key} className='mt-2 flex items-center space-x-2'>
              <button
                className='text-green-500 hover:text-green-700'
                onClick={() => addDynamicField('before', key)}
              >
                <FaPlusCircle />
              </button>
              <strong className='font-medium'>{key}:</strong>
              <input
                type='text'
                value={value}
                onChange={(e) => handleDynamicFieldChange(key, e.target.value)}
                className='rounded border border-gray-300 p-2'
              />
              <button
                className='text-blue-500 hover:text-blue-700'
                onClick={() => moveDynamicField(key, 'up')}
              >
                <FaArrowUp />
              </button>
              <button
                className='text-blue-500 hover:text-blue-700'
                onClick={() => moveDynamicField(key, 'down')}
              >
                <FaArrowDown />
              </button>
              <button
                className='text-red-500 hover:text-red-700'
                onClick={() => deleteDynamicField(key)}
              >
                <FaMinusCircle />
              </button>
            </div>
          ))}

          <div className='mt-2 flex items-center space-x-2'>
            <button
              className='flex items-center text-green-500 hover:text-green-700'
              onClick={() => addDynamicField('end')}
            >
              <FaPlusCircle /> Add Custom Field
            </button>
          </div>

          <div className='mt-4 flex space-x-4'>
            <button
              className='text-green-500 hover:text-green-700'
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className='text-gray-500 hover:text-gray-700'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className='text-xl font-bold'>{flashcard.question}</h3>
          <p className='mt-2'>{flashcard.answer}</p>

          {flashcard.dynamicFields && (
            <div className='flex flex-wrap items-center space-x-4'>
              {(() => {
                const length = Object.entries(flashcard.dynamicFields).length;
                return Object.entries(flashcard.dynamicFields).map(
                  ([key, value], index) => (
                    <div key={key} className='flex items-center space-x-2'>
                      <strong className='font-medium'>{key}:</strong>
                      <span>{value}</span>
                      {index < length - 1 && (
                        <div className='divider w-2xlpx h-full bg-gray-500'>
                          |
                        </div>
                      )}
                    </div>
                  ),
                );
              })()}
            </div>
          )}
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
