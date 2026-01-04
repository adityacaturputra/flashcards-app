'use client';
import { Flashcard } from '@/types/flashcard';
import InputField from '../atoms/InputField';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';
import { FaTrashAlt } from 'react-icons/fa';
import useGenerateFlashcards from '@/hooks/useGenerateFlashcards';
import { LuLoaderPinwheel } from 'react-icons/lu';
import { useState } from 'react';
import styles from './FlashcardForm.module.css'; // Import the CSS module for styles
import { motion } from 'framer-motion'; // Import framer-motion
import { CiExport, CiImport } from 'react-icons/ci';
import { useAppContext } from '@/context/appContext';
import { FiLoader } from 'react-icons/fi';
import OcrUpload from '../atoms/OcrUpload';

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
    handleDownloadXml,
    setSelectedCategories,
    selectedCategories,
  } = useGenerateFlashcards(addFlashcard);
  const { categories, loadingCategories } = useAppContext();

  // State to manage accordion open/close
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleCategoryChange = (category_id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category_id]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== category_id),
      );
    }
  };

  const onHandleOctUpload = (text: string) => {
    handleGenerateFlashcards(text);
  };

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
    <div
      className={`relative flex h-full flex-col justify-between rounded-xl shadow-lg backdrop-blur-sm ${styles.cardContainer} ${styles.glassMorphism}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className='p-4 sm:p-6'>
        {/* Header Section */}
        <div className='mb-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl'>
              Add Flashcard
            </h2>
            {flashCards.length > 0 && (
              <div
                className='rounded-full px-3 py-1.5 text-sm font-medium'
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                {selectedFlashcards.length}/{flashCards.length}
              </div>
            )}
          </div>
          {/* Import/Export Section */}
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div
              className='relative flex flex-1 items-center gap-3 rounded-lg border-2 border-dashed p-4 transition-colors hover:border-blue-400'
              style={{
                background: 'var(--input)',
                borderColor: 'var(--border)',
              }}
            >
              <CiImport
                className='flex-shrink-0 text-lg'
                style={{ color: 'var(--muted-foreground)' }}
              />
              <div className='flex-1'>
                <p
                  className='text-sm font-medium'
                  style={{ color: 'var(--foreground)' }}
                >
                  Import Flashcards
                </p>
                <p
                  className='text-xs'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Upload XML file to import existing flashcards
                </p>
              </div>
              <input
                type='file'
                accept='.xml'
                onChange={handleFileUpload}
                className='absolute inset-0 w-full cursor-pointer opacity-0'
              />
            </div>
            {/* Export saved flashcards button */}
            <Button
              onClick={handleDownloadXml}
              className={`rounded-lg px-4 py-3 transition-all hover:scale-105 ${styles.modernButton} ${styles.floatingElement} flex-shrink-0`}
            >
              <CiExport className='mr-2 text-lg' />
              <span className='text-sm font-medium'>Export</span>
            </Button>
          </div>
        </div>
        {/* Manual Add Section */}
        <div className='mb-6'>
          <div
            className={`flex cursor-pointer items-center justify-between rounded-xl p-4 transition-all hover:shadow-md ${styles.modernButton}`}
            style={{
              background: 'var(--muted)',
              border: '1px solid var(--border)',
            }}
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <div className='flex items-center gap-3'>
              <div
                className='rounded-lg p-2'
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
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
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${styles.gradientText}`}>
                  Manual Add
                </h3>
                <p
                  className='text-sm'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Create flashcards manually
                </p>
              </div>
            </div>
            <button
              className={`${styles.toggleButton} ${isAccordionOpen ? styles.open : ''} flex items-center justify-center rounded-full p-2 transition-all hover:scale-110`}
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
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
            </button>
          </div>
          {/* Accordion Content */}
          {isAccordionOpen && (
            <motion.div
              animate={isAccordionOpen ? 'open' : 'closed'}
              initial='closed'
              variants={variants}
              className='mt-4'
            >
              <div
                className={`w-full overflow-hidden rounded-xl ${styles.slideIn}`}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className='p-6'>
                  <div className='space-y-6'>
                    <div className='space-y-4'>
                      <div>
                        <label
                          className='mb-2 block text-sm font-semibold'
                          style={{ color: 'var(--foreground)' }}
                        >
                          Question
                        </label>
                        <InputField
                          placeholder={'Enter your question...'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setQuestion(e.target.value)
                          }
                          className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-base`}
                          value={question}
                        />
                      </div>
                      <div>
                        <label
                          className='mb-2 block text-sm font-semibold'
                          style={{ color: 'var(--foreground)' }}
                        >
                          Answer
                        </label>
                        <InputField
                          placeholder={'Enter your answer...'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAnswer(e.target.value)
                          }
                          className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-base`}
                          value={answer}
                        />
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <h3
                          className='text-lg font-semibold'
                          style={{ color: 'var(--foreground)' }}
                        >
                          Explanations
                        </h3>
                        <Button
                          onClick={addDynamicField}
                          className={`rounded-lg px-4 py-2 transition-all hover:scale-105 ${styles.modernButton} text-sm`}
                        >
                          + Add Explanation
                        </Button>
                      </div>
                      {fieldKeys.map((key, index) => (
                        <div key={index} className='flex items-start gap-3'>
                          <div className='flex-1'>
                            <label
                              className='mb-2 block text-sm font-semibold'
                              style={{ color: 'var(--foreground)' }}
                            >
                              {key}
                            </label>
                            <TextArea
                              placeholder={`Enter ${key}...`}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                handleFieldChange(key)(e as unknown as React.ChangeEvent<HTMLInputElement>)
                              }
                              className={`w-full border-2 px-4 py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-base`}
                              value={dynamicFields[key] || ''}
                              rows={3}
                            />
                          </div>
                          <button
                            onClick={() => deleteDynamicField(key)}
                            className='mt-8 rounded-lg p-3 transition-all hover:scale-105'
                            style={{
                              background: 'var(--destructive)',
                              color: 'var(--destructive-foreground)',
                            }}
                          >
                            <FaTrashAlt className='text-base' />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className='flex gap-3 pt-4'>
                      <Button
                        onClick={() => {
                          handleAddFlashcardToList();
                          setIsAccordionOpen(false);
                        }}
                        className={`flex-1 rounded-lg py-3 transition-all hover:scale-105 ${styles.modernButton} text-base font-semibold`}
                      >
                        Add Flashcard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        {/* Category Selection */}
        <div className='mb-6'>
          <h3 className='mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-lg font-semibold text-transparent'>
            Categories
          </h3>
          <div className='flex flex-wrap gap-3'>
            {loadingCategories && (
              <div
                className={`flex items-center gap-2 ${styles.pulseAnimation}`}
              >
                <FiLoader className='h-4 w-4 animate-spin' />
                <span
                  className='text-sm'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Loading categories...
                </span>
              </div>
            )}
            {categories.map((category) => (
              <label
                key={category._id}
                className='flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-all hover:scale-105 hover:shadow-md'
                style={{
                  background: selectedCategories.includes(category._id!)
                    ? 'var(--primary)'
                    : 'var(--muted)',
                  borderColor: 'var(--border)',
                  color: selectedCategories.includes(category._id!)
                    ? 'var(--primary-foreground)'
                    : 'var(--foreground)',
                }}
              >
                <input
                  type='checkbox'
                  id={category._id}
                  value={category._id}
                  checked={selectedCategories.includes(category._id!)}
                  onChange={(e) =>
                    handleCategoryChange(category._id!, e.target.checked)
                  }
                  className='sr-only'
                />
                <span className='text-sm font-medium'>{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        {flashCards.length > 0 && (
          <div className='mb-6'>
            <h3
              className='mb-4 text-lg font-semibold'
              style={{ color: 'var(--foreground)' }}
            >
              Generated Flashcards
            </h3>
            <div
              className={`max-h-[40vh] space-y-3 overflow-y-auto rounded-xl p-4 ${styles.slideIn}`}
              style={{
                background: 'var(--muted)',
                border: '1px solid var(--border)',
              }}
            >
              {flashCards.map((flashcard) => (
                <div
                  key={flashcard.key}
                  className={`rounded-lg border p-4 transition-all hover:scale-[1.01] hover:shadow-sm ${styles.floatingElement}`}
                  style={{
                    background: selectedFlashcards.includes(flashcard.key!)
                      ? 'var(--accent)'
                      : 'var(--card)',
                    borderColor: selectedFlashcards.includes(flashcard.key!)
                      ? 'var(--primary)'
                      : 'var(--border)',
                    zIndex: 1000,
                  }}
                >
                  <label className='flex cursor-pointer items-start gap-3'>
                    <input
                      type='checkbox'
                      checked={selectedFlashcards.includes(flashcard.key!)}
                      onChange={() =>
                        handleToggleFlashcardSelection(flashcard.key!)
                      }
                      className='mt-1 h-4 w-4 rounded border transition-colors'
                      style={{
                        accentColor: 'var(--primary)',
                      }}
                    />
                    <div className='flex-grow space-y-2'>
                      <div className='flex items-start gap-2'>
                        <span
                          className='text-sm font-semibold'
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Q:
                        </span>
                        <p
                          className='text-sm leading-relaxed font-medium'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {flashcard.question}
                        </p>
                      </div>
                      <div className='flex items-start gap-2'>
                        <span
                          className='text-sm font-semibold'
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          A:
                        </span>
                        <p
                          className='text-sm leading-relaxed'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {flashcard.answer}
                        </p>
                      </div>
                      {flashcard.dynamicFields && (
                        <div className='space-y-1'>
                          {Object.entries(flashcard.dynamicFields).map(
                            ([key, value]) => (
                              <div key={key} className='flex items-start gap-2'>
                                <span
                                  className='text-xs font-semibold'
                                  style={{ color: 'var(--muted-foreground)' }}
                                >
                                  {key}:
                                </span>
                                <p
                                  className='text-xs leading-relaxed'
                                  style={{ color: 'var(--foreground)' }}
                                >
                                  {value}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* AI Generation Section */}
        <div
          className='rounded-xl p-6'
          style={{
            background: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Display Error Message */}
          {error && (
            <div
              className='mb-4 rounded-lg border p-3'
              style={{
                background: 'var(--destructive)',
                color: 'var(--destructive-foreground)',
                borderColor: 'var(--destructive)',
              }}
            >
              <span className='text-sm'>{error}</span>
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <label
                className='mb-2 block text-sm font-semibold'
                style={{ color: 'var(--foreground)' }}
              >
                AI Prompt
              </label>
              <InputField
                placeholder={'Describe what you want to learn...'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrompt(e.target.value)
                }
                className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-base`}
                value={prompt}
              />
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-3'>
                <Button
                  onClick={() => handleGenerateFlashcards(prompt)}
                  disabled={isLoading}
                  className={`rounded-lg px-6 py-3 transition-all hover:scale-105 disabled:opacity-50 ${styles.modernButton} text-base font-semibold`}
                >
                  {isLoading ? (
                    <>
                      <LuLoaderPinwheel
                        className={`mr-2 h-5 w-5 animate-spin ${styles.pulseAnimation}`}
                      />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <LuLoaderPinwheel className='mr-2 h-5 w-5' />
                      <span>Generate</span>
                    </>
                  )}
                </Button>
                {!isLoading && <OcrUpload onHandle={onHandleOctUpload} />}
              </div>

              {flashCards.length > 0 && (
                <Button
                  onClick={handleSaveSelectedFlashcards}
                  disabled={selectedFlashcards.length === 0}
                  className={`rounded-lg px-6 py-3 transition-all hover:scale-105 disabled:opacity-50 ${styles.modernButton} text-base font-semibold`}
                >
                  Save ({selectedFlashcards.length})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;
