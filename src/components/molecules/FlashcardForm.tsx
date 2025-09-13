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
      className={`relative mb-4 sm:mb-8 flex h-full flex-col justify-between rounded-xl p-3 sm:p-6 shadow-lg backdrop-blur-sm ${styles.cardContainer} ${styles.glassMorphism}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <div>
        <div className='mb-4 sm:mb-6'>
          <div className='flex items-center justify-between mb-3 sm:mb-4'>
            <h2 
              className='text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            >
              <span className='hidden sm:inline'>Add New Flashcard</span>
              <span className='sm:hidden'>Add Flashcard</span>
            </h2>
            {flashCards.length > 0 && (
              <div 
                className='px-3 py-1 rounded-full text-sm font-medium'
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                {selectedFlashcards.length} / {flashCards.length} selected
              </div>
            )}
          </div>
          {/* Upload Input */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4'>
            <div 
              className='flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-dashed transition-colors hover:border-blue-400 flex-1'
              style={{
                background: 'var(--input)',
                borderColor: 'var(--border)',
              }}
            >
              <CiImport className='text-lg sm:text-xl flex-shrink-0' style={{ color: 'var(--muted-foreground)' }} />
              <input 
                type='file' 
                accept='.xml' 
                onChange={handleFileUpload}
                className='text-xs sm:text-sm min-w-0 flex-1'
                style={{ color: 'var(--foreground)' }}
              />
            </div>
            {/* Export saved flashcards button */}
            <Button 
              onClick={handleDownloadXml}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all hover:scale-105 ${styles.modernButton} ${styles.floatingElement} flex-shrink-0`}
            >
              <CiExport className='text-lg sm:text-xl' />
            </Button>
          </div>
        </div>
        {/* Accordion Header */}
        <div
          className={`mt-6 flex cursor-pointer items-center justify-between rounded-lg p-3 sm:p-4 transition-all hover:shadow-md ${styles.modernButton}`}
          style={{
            background: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <span 
            className={`font-semibold text-base sm:text-lg ${styles.gradientText}`}
          >
            Manual Add Form
          </span>
          <button
            className={`${styles.toggleButton} ${isAccordionOpen ? styles.open : ''} p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 flex items-center justify-center`}
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            <svg
              className='h-4 w-4 sm:h-5 sm:w-5'
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
              className={`absolute max-h-[80vh] w-full overflow-scroll pb-8 rounded-lg ${styles.slideIn}`}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className='p-4 sm:p-6 space-y-4 sm:space-y-6'>
                <div className='space-y-3 sm:space-y-4'>
                  <div>
                    <label 
                      className='block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2'
                      style={{ color: 'var(--foreground)' }}
                    >
                      Question
                    </label>
                    <InputField
                      placeholder={'Enter your question here...'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuestion(e.target.value)
                      }
                      className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-sm sm:text-base`}
                      value={question}
                    />
                  </div>
                  <div>
                    <label 
                      className='block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2'
                      style={{ color: 'var(--foreground)' }}
                    >
                      Answer
                    </label>
                    <InputField
                      placeholder={'Enter the answer here...'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer(e.target.value)
                      }
                      className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-sm sm:text-base`}
                      value={answer}
                    />
                  </div>
                </div>
                <div className='space-y-3 sm:space-y-4'>
                  <h3 
                    className='text-base sm:text-lg font-semibold'
                    style={{ color: 'var(--foreground)' }}
                  >
                    Custom Fields
                  </h3>
                  {fieldKeys.map((key, index) => (
                    <div key={index} className='flex items-end gap-2 sm:gap-3'>
                      <div className='flex-1'>
                        <label 
                          className='block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {key}
                        </label>
                        <InputField
                          placeholder={`Enter ${key}...`}
                          onChange={handleFieldChange(key)}
                          className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-sm sm:text-base`}
                          value={dynamicFields[key] || ''}
                        />
                      </div>
                      <button
                        onClick={() => deleteDynamicField(key)}
                        className='p-2.5 sm:p-3 rounded-lg transition-all hover:scale-105'
                        style={{
                          background: 'var(--destructive)',
                          color: 'var(--destructive-foreground)',
                        }}
                      >
                        <FaTrashAlt className='text-sm sm:text-base' />
                      </button>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4'>
                  <Button 
                    onClick={addDynamicField} 
                    className={`flex-1 py-2.5 sm:py-3 rounded-lg transition-all hover:scale-105 ${styles.modernButton} text-sm sm:text-base`}
                  >
                    Add Custom Field
                  </Button>
                  <Button
                    onClick={() => {
                      handleAddFlashcardToList();
                      setIsAccordionOpen(false);
                    }}
                    className={`flex-1 py-2.5 sm:py-3 rounded-lg transition-all hover:scale-105 ${styles.modernButton} text-sm sm:text-base`}
                  >
                    Add Flashcard
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Category Selection */}
        <div className='mt-6 sm:mt-8'>
          <h3 
            className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'
          >
            Select Categories
          </h3>
          <div className='flex flex-wrap gap-2 sm:gap-3'>
            {loadingCategories && (
              <div className={`flex items-center gap-2 ${styles.pulseAnimation}`}>
                <FiLoader className='animate-spin' />
                <span style={{ color: 'var(--muted-foreground)' }}>Loading categories...</span>
              </div>
            )}
            {categories.map((category) => (
              <label 
                key={category._id} 
                className='flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border cursor-pointer transition-all hover:shadow-md hover:scale-105'
                style={{
                  background: selectedCategories.includes(category._id!) ? 'var(--primary)' : 'var(--muted)',
                  borderColor: 'var(--border)',
                  color: selectedCategories.includes(category._id!) ? 'var(--primary-foreground)' : 'var(--foreground)',
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
                <span className='text-xs sm:text-sm font-medium'>{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        {flashCards.length > 0 && (
          <div className='mt-6'>
            <h3 
              className='text-lg font-semibold mb-4'
              style={{ color: 'var(--foreground)' }}
            >
              Generated Flashcards
            </h3>
            <div className={`h-[60vh] overflow-scroll space-y-4 pr-2 ${styles.slideIn}`}>
              {flashCards.map((flashcard) => (
                <div
                  key={flashcard.key}
                  className={`rounded-lg border p-4 transition-all hover:shadow-md hover:scale-[1.02] ${styles.floatingElement}`}
                  style={{
                    background: selectedFlashcards.includes(flashcard.key!) ? 'var(--accent)' : 'var(--card)',
                    borderColor: selectedFlashcards.includes(flashcard.key!) ? 'var(--primary)' : 'var(--border)',
                  }}
                >
                  <label className='flex items-start gap-4 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={selectedFlashcards.includes(flashcard.key!)}
                      onChange={() =>
                        handleToggleFlashcardSelection(flashcard.key!)
                      }
                      className='mt-1 w-4 h-4 rounded border-2 transition-colors'
                      style={{
                        accentColor: 'var(--primary)',
                      }}
                    />
                    <div className='flex-grow space-y-2'>
                      <div>
                        <span 
                          className='text-sm font-medium'
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Question:
                        </span>
                        <p 
                          className='font-semibold mt-1'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {flashcard.question}
                        </p>
                      </div>
                      <div>
                        <span 
                          className='text-sm font-medium'
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Answer:
                        </span>
                        <p 
                          className='mt-1'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {flashcard.answer}
                        </p>
                      </div>
                      {flashcard.dynamicFields && (
                        <div className='space-y-1'>
                          {Object.entries(flashcard.dynamicFields).map(
                            ([key, value]) => (
                              <div key={key}>
                                <span 
                                  className='text-sm font-medium'
                                  style={{ color: 'var(--muted-foreground)' }}
                                >
                                  {key}:
                                </span>
                                <p 
                                  className='mt-1'
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
          className='absolute bottom-0 w-full p-6 rounded-b-xl'
          style={{
            background: 'var(--card)',
            borderTop: '1px solid var(--border)',
          }}
        >
          {/* Display Error Message */}
          {error && (
            <div 
              className='mb-4 p-3 rounded-lg border'
              style={{
                background: 'var(--destructive)',
                color: 'var(--destructive-foreground)',
                borderColor: 'var(--destructive)',
              }}
            >
              {error}
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <label 
                className='block text-sm font-medium mb-2'
                style={{ color: 'var(--foreground)' }}
              >
                AI Prompt
              </label>
              <InputField
                placeholder={'Describe what you want to learn about...'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrompt(e.target.value)
                }
                className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-500 ${styles.inputFocus}`}
                value={prompt}
              />
            </div>
            
            <div className='flex items-center justify-between gap-4'>
              <div className='flex items-center gap-3'>
                <Button
                  onClick={() => handleGenerateFlashcards(prompt)}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50 ${styles.modernButton}`}
                >
                  {isLoading ? (
                    <>
                      <LuLoaderPinwheel className={`animate-spin mr-2 ${styles.pulseAnimation}`} />
                      Creating magics...
                    </>
                  ) : (
                    <>
                      <LuLoaderPinwheel className='mr-2' />
                      Generate by Magic
                    </>
                  )}
                </Button>
                {!isLoading && <OcrUpload onHandle={onHandleOctUpload} />}
              </div>

              {flashCards.length > 0 && (
                <Button
                  onClick={handleSaveSelectedFlashcards}
                  disabled={selectedFlashcards.length === 0}
                  className={`px-6 py-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50 ${styles.modernButton}`}
                >
                  Save Selected ({selectedFlashcards.length})
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
