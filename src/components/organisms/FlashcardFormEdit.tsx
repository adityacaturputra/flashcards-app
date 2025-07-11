// components/organisms/FlashcardFormEdit.tsx
import React from 'react';
import {
  FaPlusCircle,
  FaMinusCircle,
  FaArrowDown,
  FaArrowUp,
} from 'react-icons/fa';
import { Flashcard } from '@/types/flashcard';
import useEditFlashcard from '@/hooks/useEditFlashcard';

type FlashcardFormEditProps = {
  flashcard: Flashcard;
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => void;
  onCancel: () => void;
};

const FlashcardFormEdit: React.FC<FlashcardFormEditProps> = ({
  flashcard,
  onUpdate,
  onCancel,
}) => {
  const {
    question,
    setQuestion,
    answer,
    setAnswer,
    dynamicFields,
    handleSave,
    handleDynamicFieldChange,
    addDynamicField,
    deleteDynamicField,
    moveDynamicField,
  } = useEditFlashcard({
    flashcard,
    onUpdate,
    isEditing: false,
    setIsEditing: onCancel,
  });

  const renderDynamicFields = () => {
    const length = Object.entries(dynamicFields).length;
    return Object.entries(dynamicFields).map(([key, value], index) => (
      <div key={key} className='flex items-center space-x-2'>
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
          disabled={index === 0}
        >
          <FaArrowUp />
        </button>
        <button
          className='text-blue-500 hover:text-blue-700'
          onClick={() => moveDynamicField(key, 'down')}
          disabled={index === length - 1}
        >
          <FaArrowDown />
        </button>
        <button
          className='text-red-500 hover:text-red-700'
          onClick={() => deleteDynamicField(key)}
        >
          <FaMinusCircle />
        </button>
        {index < length - 1 && (
          <div className='divider mx-2 h-full w-px bg-gray-300'>|</div>
        )}
      </div>
    ));
  };

  return (
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

      <div className='mt-2 flex flex-wrap items-center'>
        {renderDynamicFields()}
        <div className='flex items-center space-x-2'>
          <button
            className='flex items-center text-green-500 hover:text-green-700'
            onClick={() => addDynamicField('end')}
          >
            <FaPlusCircle /> Add Custom Field
          </button>
        </div>
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
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FlashcardFormEdit;
