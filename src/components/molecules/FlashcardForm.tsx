'use client';
import { Flashcard } from '@/types/flashcard';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import { FaTrashAlt } from 'react-icons/fa';
import useGenerateFlashcards from '@/hooks/useGenerateFlashcards';
import { LuLoaderPinwheel } from 'react-icons/lu';
import { useState } from 'react';
import styles from './FlashcardForm.module.css'; // Import the CSS module for styles
import { motion } from 'framer-motion'; // Import framer-motion

type FlashcardFormProps = {
  addFlashcard: (flashcard: Flashcard) => Promise<void>;
  selectedFlashcard?: Flashcard | null;
  setSelectedFlashcard: (flashcard: Flashcard | null) => void;
};

const FlashcardForm: React.FC<FlashcardFormProps> = ({ addFlashcard }) => {
  const {
    flashCards,
    selectedFlashcards,
    isLoading,
    error,
    handleGenerateFlashcards,
    handleToggleFlashcardSelection,
    handleSaveSelectedFlashcards,

    setQuestion,
    question,
    setAnswer,
    answer,
    fieldKeys,
    handleFieldChange,
    dynamicFields,
    deleteDynamicField,
    addDynamicField,
    handleAddFlashcardToList,
    setPrompt,
    prompt,
    handleFileUpload,
  } = useGenerateFlashcards(addFlashcard);

  // State to manage accordion open/close
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Animation variants
  const variants = {
    open: {
      height: 'auto',
      opacity: 1,
      translateY: 0,
      transition: { staggerChildren: 0.1 },
    },
    closed: { height: 0, opacity: 0, translateY: '-40vh' }, // Move away from screen
  };

  return (
    <div className='relative mb-8 flex h-full flex-col justify-between'>
      <div>
        <h2 className='text-xl font-bold'>Add New Flashcard</h2>
        {/* Upload Input */}
        <div className='mt-4'>
          <input
            type='file'
            accept='.xml'
            onChange={handleFileUpload}
            className='mb-4 border p-2'
          />
        </div>
        {/* Accordion Header */}
        <div
          className='mt-4 flex cursor-pointer items-center justify-between rounded bg-gray-200 p-3 hover:bg-gray-300'
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <span>Manual Add Form</span>
          <Button
            className={`${styles.toggleButton} ${isAccordionOpen ? styles.open : ''}`}
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </Button>
        </div>
        {/* Accordion Content */}
        {isAccordionOpen && (
          <motion.div
            animate={isAccordionOpen ? 'open' : 'closed'}
            initial='closed'
            variants={variants}
            className='mt-4'
          >
            <div className='absolute max-h-[80vh] w-full overflow-scroll bg-white pb-8'>
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
              <div className='mt-1 flex items-center'>
                <Button onClick={addDynamicField} className='mr-1'>
                  Add Custom Field
                </Button>
                <Button
                  onClick={() => {
                    handleAddFlashcardToList();
                    setIsAccordionOpen(false);
                  }}
                >
                  Add Flashcard
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        {flashCards.length > 0 && (
          <>
            <div className='h-[60vh] overflow-scroll'>
              <div className=''>
                <div className='mt-4 space-y-4'>
                  {flashCards.map((flashcard) => (
                    <div
                      key={flashcard.key}
                      className='flex items-center rounded bg-gray-100 p-4 shadow-sm'
                    >
                      <label className='flex flex-grow items-center'>
                        <input
                          type='checkbox'
                          checked={selectedFlashcards.includes(flashcard.key!)}
                          onChange={() =>
                            handleToggleFlashcardSelection(flashcard.key!)
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
                          handleToggleFlashcardSelection(flashcard.key!)
                        }
                        className={
                          selectedFlashcards.includes(flashcard.key!)
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }
                      >
                        {selectedFlashcards.includes(flashcard.key!)
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
        <div className='absolute bottom-0 w-full'>
          {/* Display Error Message */}
          {error && <div className='mt-4 text-red-500'>{error}</div>}

          <InputField
            placeholder={'Enter Prompt'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrompt(e.target.value)
            }
            className={'mb-4 w-full'}
            value={prompt}
          />
          <div className='mb-4 flex justify-between gap-2'>
            <Button
              onClick={() => handleGenerateFlashcards(prompt)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LuLoaderPinwheel className='animate-spin' />
                  Creating magics...
                </>
              ) : (
                <>
                  <LuLoaderPinwheel />
                  Generate by Magic
                </>
              )}
            </Button>

            {flashCards.length > 0 && (
              <Button
                onClick={handleSaveSelectedFlashcards}
                disabled={selectedFlashcards.length === 0}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;
