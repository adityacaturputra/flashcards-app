"use client"
import React, { useState, useEffect } from 'react';
import { Flashcard, Progression } from '@/types/flashcard';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

type FlashcardFormProps = {
  addFlashcard: (flashcard: Flashcard) => Promise<void>;
  selectedFlashcard?: Flashcard | null;
  setSelectedFlashcard: (flashcard: Flashcard | null) => void;
};

const FlashcardForm: React.FC<FlashcardFormProps> = ({ addFlashcard, selectedFlashcard, setSelectedFlashcard }) => {
  const [question, setQuestion] = useState(selectedFlashcard?.question || '');
  const [answer, setAnswer] = useState(selectedFlashcard?.answer || '');
  const [dynamicFields, setDynamicFields] = useState<Record<string, string>>(selectedFlashcard?.dynamicFields || {});
  const [fieldCount, setFieldCount] = useState(Object.keys(selectedFlashcard?.dynamicFields || {}).length);

  useEffect(() => {
    if (selectedFlashcard) {
      setQuestion(selectedFlashcard.question);
      setAnswer(selectedFlashcard.answer);
      setDynamicFields(selectedFlashcard.dynamicFields || {});
      setFieldCount(Object.keys(selectedFlashcard.dynamicFields || {}).length);
    } else {
      setQuestion('');
      setAnswer('');
      setDynamicFields({});
      setFieldCount(0);
    }
  }, [selectedFlashcard]);

  const handleAddFlashcard = async () => {
    console.log({question, answer})
    if (question && answer) {
      await addFlashcard({ question, answer, progression: Progression.New, nextReviewDate: new Date(), dynamicFields });
      setSelectedFlashcard(null);
      setQuestion('');
      setAnswer('');
      setDynamicFields({});
      setFieldCount(0);
    }
  };

  const handleFieldChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDynamicFields(prevFields => ({
      ...prevFields,
      [`v${index + 1}`]: e.target.value,
    }));
  };

  const addDynamicField = () => {
    setFieldCount(prevCount => prevCount + 1);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold">Add New Flashcard</h2>
      <div className="mt-4">
        <InputField
          placeholder={'Enter Question'}
          onChange= {(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
          className= {'w-full mb-4'}
          value= {question}
        />
        <InputField
          placeholder={'Enter Answer'}
          onChange= {(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
          className= {'w-full'}
          value= {answer}
        />
      </div>
      <div className="mt-4">
        {[...Array(fieldCount)].map((_, index) => (
          <div key={index} className="flex items-center w-full mb-4">
            <InputField
                placeholder={`Enter Field v${index + 1}`}
                onChange={handleFieldChange(index)}
                className="w-full mr-4"
                value={dynamicFields[`v${index + 1}`] || ''}
              />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <div className="mr-4">
          <Button onClick={addDynamicField}>Add Custom Field</Button>
        </div>
        <div>
            <Button onClick={handleAddFlashcard} >Add Flashcard</Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;