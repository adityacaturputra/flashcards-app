// src/components/molecules/FlashcardForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Flashcard, Progression } from '@/types/flashcard';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import { FaTrashAlt } from 'react-icons/fa';
import newKeyGen from '@/utils/keyGenIterator';

type FlashcardFormProps = {
  addFlashcard: (flashcard: Flashcard) => Promise<void>;
  selectedFlashcard?: Flashcard | null;
  setSelectedFlashcard: (flashcard: Flashcard | null) => void;
};

const FlashcardForm: React.FC<FlashcardFormProps> = ({
  addFlashcard,
  selectedFlashcard,
  setSelectedFlashcard,
}) => {
  const [question, setQuestion] = useState(selectedFlashcard?.question || '');
  const [answer, setAnswer] = useState(selectedFlashcard?.answer || '');
  const [dynamicFields, setDynamicFields] = useState<Record<string, string>>(
    selectedFlashcard?.dynamicFields || {},
  );

  // Maintain order using an array of keys
  const [fieldKeys, setFieldKeys] = useState<string[]>(
    Object.keys(selectedFlashcard?.dynamicFields || {}),
  );

  useEffect(() => {
    if (selectedFlashcard) {
      setQuestion(selectedFlashcard.question);
      setAnswer(selectedFlashcard.answer);
      setDynamicFields(selectedFlashcard.dynamicFields || {});
      setFieldKeys(Object.keys(selectedFlashcard.dynamicFields || {}));
    } else {
      setQuestion('');
      setAnswer('');
      setDynamicFields({});
      setFieldKeys([]);
    }
  }, [selectedFlashcard]);

  const handleAddFlashcard = async () => {
    if (question && answer) {
      const formattedDynamicFields = fieldKeys.reduce(
        (acc, key) => {
          if (dynamicFields[key]) {
            acc[key] = dynamicFields[key];
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      await addFlashcard({
        question,
        answer,
        progression: Progression.New,
        nextReviewDate: new Date(),
        dynamicFields: formattedDynamicFields,
      });

      setSelectedFlashcard(null);
      setQuestion('');
      setAnswer('');
      setDynamicFields({});
      setFieldKeys([]);
    }
  };

  const handleFieldChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setDynamicFields((prevFields) => ({
        ...prevFields,
        [key]: e.target.value,
      }));
    };

  const addDynamicField = () => {
    const newKey = newKeyGen(0, dynamicFields);
    setFieldKeys((prevKeys) => [...prevKeys, newKey]);
    setDynamicFields((prevFields) => ({
      ...prevFields,
      [newKey]: '',
    }));
  };

  const deleteDynamicField = (key: string) => {
    setFieldKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    setDynamicFields((prevFields) => {
      const newFields = { ...prevFields };
      delete newFields[key];
      return newFields;
    });
  };

  return (
    <div className='mb-8'>
      <h2 className='text-xl font-bold'>Add</h2>
      <div className='mt-4'>
        <InputField
          placeholder={'Enter Question'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
          className={'mb-4 w-full'}
          value={question}
        />
        <InputField
          placeholder={'Enter Answer'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnswer(e.target.value)
          }
          className={'mb-4 w-full'}
          value={answer}
        />
      </div>
      <div className='mt-4'>
        {fieldKeys.map((key, index) => (
          <div key={index} className='mb-4 flex w-full items-center'>
            <InputField
              placeholder={`Enter Field ${key}`}
              onChange={handleFieldChange(key)}
              className='mr-4 w-full'
              value={dynamicFields[key] || ''}
            />
            <Button
              onClick={() => deleteDynamicField(key)}
              className='bg-red-500 text-white hover:bg-red-600 focus:outline-none'
            >
              <FaTrashAlt />
            </Button>
          </div>
        ))}
      </div>
      <div className='mt-4 flex items-center'>
        <div className='mr-4'>
          <Button onClick={addDynamicField}>Add Custom Field</Button>
        </div>
        <div>
          <Button onClick={handleAddFlashcard}>
            {selectedFlashcard ? 'Update Flashcard' : 'Add Flashcard'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;
