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
      className={`relative mb-1 flex h-full flex-col justify-between rounded-lg p-1.5 shadow-lg backdrop-blur-sm sm:mb-2 sm:p-3 ${styles.cardContainer} ${styles.glassMorphism}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <div>
        <div className='mb-2 sm:mb-3'>
          <div className='mb-2 flex items-center justify-between sm:mb-3'>
            <h2 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-base font-bold text-transparent sm:text-lg'>
              Add Flashcard
            </h2>
            {flashCards.length > 0 && (
              <div
                className='rounded-full px-2 py-1 text-xs font-medium'
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                {selectedFlashcards.length}/{flashCards.length}
              </div>
            )}
          </div>
          {/* Upload Input */}
          <div className='flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-2'>
            <div
              className='flex flex-1 items-center gap-1 rounded-lg border-2 border-dashed px-2 py-1.5 transition-colors hover:border-blue-400 sm:gap-2 sm:px-3 sm:py-2'
              style={{
                background: 'var(--input)',
                borderColor: 'var(--border)',
              }}
            >
              <CiImport
                className='flex-shrink-0 text-sm sm:text-base'
                style={{ color: 'var(--muted-foreground)' }}
              />
              <input
                type='file'
                accept='.xml'
                onChange={handleFileUpload}
                className='min-w-0 flex-1 text-xs'
                style={{ color: 'var(--foreground)' }}
              />
            </div>
            {/* Export saved flashcards button */}
            <Button
              onClick={handleDownloadXml}
              className={`rounded-lg px-2 py-1.5 transition-all hover:scale-105 sm:px-3 sm:py-2 ${styles.modernButton} ${styles.floatingElement} flex-shrink-0`}
            >
              <CiExport className='text-sm sm:text-base' />
            </Button>
          </div>
        </div>
        {/* Accordion Header */}
        <div
          className={`mt-3 flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all hover:shadow-md sm:p-3 ${styles.modernButton}`}
          style={{
            background: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <span
            className={`text-sm font-semibold sm:text-base ${styles.gradientText}`}
          >
            Manual Add
          </span>
          <button
            className={`${styles.toggleButton} ${isAccordionOpen ? styles.open : ''} flex items-center justify-center rounded-full p-1 transition-all hover:scale-110 sm:p-1.5`}
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            <svg
              className='h-3 w-3 sm:h-4 sm:w-4'
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
              className={`max-h-[30vh] w-full overflow-scroll rounded-lg pb-2 ${styles.slideIn}`}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className='space-y-1.5 p-1.5 sm:space-y-2 sm:p-2'>
                <div className='space-y-2 sm:space-y-3'>
                  <div>
                    <label
                      className='mb-1 block text-xs font-medium'
                      style={{ color: 'var(--foreground)' }}
                    >
                      Question
                    </label>
                    <InputField
                      placeholder={'Enter question...'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuestion(e.target.value)
                      }
                      className={`w-full rounded-lg border-2 px-2 py-1.5 transition-colors focus:border-blue-500 sm:px-3 sm:py-2 ${styles.inputFocus} text-sm`}
                      value={question}
                    />
                  </div>
                  <div>
                    <label
                      className='mb-1 block text-xs font-medium'
                      style={{ color: 'var(--foreground)' }}
                    >
                      Answer
                    </label>
                    <InputField
                      placeholder={'Enter answer...'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer(e.target.value)
                      }
                      className={`w-full rounded-lg border-2 px-2 py-1.5 transition-colors focus:border-blue-500 sm:px-3 sm:py-2 ${styles.inputFocus} text-sm`}
                      value={answer}
                    />
                  </div>
                </div>
                <div className='space-y-2 sm:space-y-3'>
                  <h3
                    className='text-sm font-semibold sm:text-base'
                    style={{ color: 'var(--foreground)' }}
                  >
                    Custom Fields
                  </h3>
                  {fieldKeys.map((key, index) => (
                    <div key={index} className='flex items-end gap-1 sm:gap-2'>
                      <div className='flex-1'>
                        <label
                          className='mb-1 block text-xs font-medium'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {key}
                        </label>
                        <InputField
                          placeholder={`Enter ${key}...`}
                          onChange={handleFieldChange(key)}
                          className={`w-full rounded-lg border-2 px-2 py-1.5 transition-colors focus:border-blue-500 sm:px-3 sm:py-2 ${styles.inputFocus} text-sm`}
                          value={dynamicFields[key] || ''}
                        />
                      </div>
                      <button
                        onClick={() => deleteDynamicField(key)}
                        className='rounded-lg p-1.5 transition-all hover:scale-105 sm:p-2'
                        style={{
                          background: 'var(--destructive)',
                          color: 'var(--destructive-foreground)',
                        }}
                      >
                        <FaTrashAlt className='text-xs sm:text-sm' />
                      </button>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-1 pt-2 sm:flex-row sm:gap-2 sm:pt-3'>
                  <Button
                    onClick={addDynamicField}
                    className={`flex-1 rounded-lg py-1.5 transition-all hover:scale-105 sm:py-2 ${styles.modernButton} text-xs sm:text-sm`}
                  >
                    Add Field
                  </Button>
                  <Button
                    onClick={() => {
                      handleAddFlashcardToList();
                      setIsAccordionOpen(false);
                    }}
                    className={`flex-1 rounded-lg py-1.5 transition-all hover:scale-105 sm:py-2 ${styles.modernButton} text-xs sm:text-sm`}
                  >
                    Add Card
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Category Selection */}
        <div className='mt-3 sm:mt-4'>
          <h3 className='mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-sm font-semibold text-transparent sm:mb-3 sm:text-base'>
            Categories
          </h3>
          <div className='flex flex-wrap gap-1 sm:gap-2'>
            {loadingCategories && (
              <div
                className={`flex items-center gap-1 ${styles.pulseAnimation}`}
              >
                <FiLoader className='h-3 w-3 animate-spin' />
                <span
                  className='text-xs'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Loading...
                </span>
              </div>
            )}
            {categories.map((category) => (
              <label
                key={category._id}
                className='flex cursor-pointer items-center gap-1 rounded-full border px-2 py-1 transition-all hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5'
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
                <span className='text-xs font-medium'>{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        {flashCards.length > 0 && (
          <div className='mt-3 sm:mt-4'>
            <h3
              className='mb-2 text-sm font-semibold sm:text-base'
              style={{ color: 'var(--foreground)' }}
            >
              Generated Flashcards
            </h3>
            <div
              className={`max-h-[25vh] space-y-1 overflow-scroll p-3 ${styles.slideIn}`}
            >
              {flashCards.map((flashcard) => (
                <div
                  key={flashcard.key}
                  className={`rounded border p-1.5 transition-all hover:scale-[1.01] hover:shadow-sm ${styles.floatingElement}`}
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
                  <label className='flex cursor-pointer items-start gap-1.5'>
                    <input
                      type='checkbox'
                      checked={selectedFlashcards.includes(flashcard.key!)}
                      onChange={() =>
                        handleToggleFlashcardSelection(flashcard.key!)
                      }
                      className='mt-0.5 h-2.5 w-2.5 rounded border transition-colors'
                      style={{
                        accentColor: 'var(--primary)',
                      }}
                    />
                    <div className='flex-grow space-y-0.5'>
                      <div className='flex items-center gap-1'>
                        <span
                          className='text-[10px] font-medium'
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Q:
                        </span>
                        <p
                          className='text-xs leading-tight font-semibold'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {flashcard.question}
                        </p>
                      </div>
                      <div className='flex items-center gap-1'>
                        <span
                          className='text-[10px] font-medium'
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          A:
                        </span>
                        <p
                          className='text-xs leading-tight'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {flashcard.answer}
                        </p>
                      </div>
                      {flashcard.dynamicFields && (
                        <div className='space-y-0.5'>
                          {Object.entries(flashcard.dynamicFields).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className='flex items-center gap-1'
                              >
                                <span
                                  className='text-[10px] font-medium'
                                  style={{ color: 'var(--muted-foreground)' }}
                                >
                                  {key}:
                                </span>
                                <p
                                  className='text-[10px] leading-tight'
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
        <div
          className='mt-2 rounded-lg p-2 sm:p-3'
          style={{
            background: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Display Error Message */}
          {error && (
            <div
              className='mb-1.5 rounded border p-1.5'
              style={{
                background: 'var(--destructive)',
                color: 'var(--destructive-foreground)',
                borderColor: 'var(--destructive)',
              }}
            >
              <span className='text-[10px]'>{error}</span>
            </div>
          )}

          <div className='space-y-1.5'>
            <div>
              <label
                className='mb-1 block text-xs font-medium'
                style={{ color: 'var(--foreground)' }}
              >
                AI Prompt
              </label>
              <InputField
                placeholder={'Describe what you want to learn...'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrompt(e.target.value)
                }
                className={`w-full rounded border px-1.5 py-1 transition-colors focus:border-blue-500 sm:px-2 sm:py-1.5 ${styles.inputFocus} text-xs`}
                value={prompt}
              />
            </div>

            <div className='flex items-center justify-between gap-1'>
              <div className='flex items-center gap-1'>
                <Button
                  onClick={() => handleGenerateFlashcards(prompt)}
                  disabled={isLoading}
                  className={`rounded px-2 py-1 transition-all hover:scale-105 disabled:opacity-50 sm:px-3 sm:py-1.5 ${styles.modernButton} text-[10px] sm:text-xs`}
                >
                  {isLoading ? (
                    <>
                      <LuLoaderPinwheel
                        className={`mr-0.5 h-2.5 w-2.5 animate-spin ${styles.pulseAnimation}`}
                      />
                      <span className='hidden sm:inline'>Creating...</span>
                      <span className='sm:hidden'>...</span>
                    </>
                  ) : (
                    <>
                      <LuLoaderPinwheel className='mr-0.5 h-2.5 w-2.5' />
                      <span className='hidden sm:inline'>Generate</span>
                      <span className='sm:hidden'>Gen</span>
                    </>
                  )}
                </Button>
                {!isLoading && <OcrUpload onHandle={onHandleOctUpload} />}
              </div>

              {flashCards.length > 0 && (
                <Button
                  onClick={handleSaveSelectedFlashcards}
                  disabled={selectedFlashcards.length === 0}
                  className={`rounded px-2 py-1 transition-all hover:scale-105 disabled:opacity-50 sm:px-3 sm:py-1.5 ${styles.modernButton} text-[10px] sm:text-xs`}
                >
                  <span className='hidden sm:inline'>
                    Save ({selectedFlashcards.length})
                  </span>
                  <span className='sm:hidden'>Save</span>
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
