'use client';
import React, { useState, useEffect } from 'react';
import { Flashcard, Progression } from '@/types/flashcard';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import { FaTrashAlt } from 'react-icons/fa';
import newKeyGen from '@/utils/keyGenIterator';
import useGenerateFlashcards from '@/hooks/useGenerateFlashcards';

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
  const [fieldKeys, setFieldKeys] = useState<string[]>(
    Object.keys(selectedFlashcard?.dynamicFields || {}),
  );
  const [prompt, setPrompt] = useState('');
  const {
    aiGeneratedFlashcards,
    selectedAiFlashcards,
    isLoading,
    error,
    handleGenerateFlashcards,
    handleToggleAiFlashcardSelection,
    handleSaveSelectedAiFlashcards,
  } = useGenerateFlashcards(addFlashcard);

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
      setPrompt('');
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
    <div className='mb-8 flex h-full flex-col justify-between'>
      <div>
        <h2 className='text-xl font-bold'>
          {selectedFlashcard ? 'Edit Flashcard' : 'Add New Flashcard'}
        </h2>
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

      <div>
        {/* Display AI Generated Flashcards */}
        {aiGeneratedFlashcards.length > 0 && (
          <>
            <div className='max-h-[30vh] overflow-scroll'>
              <h3 className='mt-8 text-lg font-bold'>
                AI Generated Flashcards
              </h3>
              <div className=''>
                <div className='mt-4 space-y-4'>
                  {aiGeneratedFlashcards.map((flashcard) => (
                    <div
                      key={flashcard.key}
                      className='flex items-center rounded bg-gray-100 p-4 shadow-sm'
                    >
                      <label className='flex flex-grow items-center'>
                        <input
                          type='checkbox'
                          checked={selectedAiFlashcards.includes(
                            flashcard.key!,
                          )}
                          onChange={() =>
                            handleToggleAiFlashcardSelection(flashcard.key!)
                          }
                          className='mr-2'
                        />
                        <div className='flex-grow'>
                          <p className='font-semibold'>
                            Question: {flashcard.question}
                          </p>
                          <p>Answer: {flashcard.answer}</p>
                          {flashcard.dynamicFields && (
                            <div>
                              {Object.entries(flashcard.dynamicFields).map(
                                ([key, value]) => (
                                  <p key={key}>
                                    {key}: {value}
                                  </p>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </label>
                      <Button
                        onClick={() =>
                          handleToggleAiFlashcardSelection(flashcard.key!)
                        }
                        className={
                          selectedAiFlashcards.includes(flashcard.key!)
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }
                      >
                        {selectedAiFlashcards.includes(flashcard.key!)
                          ? 'Selected'
                          : 'Select'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Display Error Message */}
        {error && <div className='mt-4 text-red-500'>{error}</div>}

        <InputField
          placeholder={'Enter AI Prompt'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrompt(e.target.value)
          }
          className={'mb-4 w-full'}
          value={prompt}
        />
        <div className='mb-4 flex justify-between'>
          <Button
            onClick={() => handleGenerateFlashcards(prompt)}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Flashcards with AI'}
          </Button>

          {aiGeneratedFlashcards.length > 0 && (
            <Button
              onClick={handleSaveSelectedAiFlashcards}
              disabled={selectedAiFlashcards.length === 0}
            >
              Save Selected Flashcards
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;
