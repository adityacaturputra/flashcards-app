// components/organisms/FlashcardFormEdit.tsx
import {
  FaPlusCircle,
  FaArrowDown,
  FaArrowUp,
  FaTrashAlt,
} from 'react-icons/fa';
import { Flashcard } from '@/types/flashcard';
import useEditFlashcard from '@/hooks/useEditFlashcard';
import { useAppContext } from '@/context/appContext';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import { motion } from 'framer-motion';
import styles from '../molecules/FlashcardForm.module.css';

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
    setSelectedCategories,
    selectedCategories,
  } = useEditFlashcard({
    flashcard,
    onUpdate,
    isEditing: false,
    setIsEditing: onCancel,
  });
  const { categories } = useAppContext();

  const renderDynamicFields = () => {
    const length = Object.entries(dynamicFields).length;
    return Object.entries(dynamicFields).map(([key, value], index) => (
      <div key={key} className='flex items-end gap-3'>
        <div className='flex-1'>
          <label
            className='mb-2 block text-sm font-semibold'
            style={{ color: 'var(--foreground)' }}
          >
            {key}
          </label>
          <InputField
            placeholder={`Enter ${key}...`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleDynamicFieldChange(key, e.target.value)
            }
            className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-500 ${styles.inputFocus} text-base`}
            value={value}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <button
            className='rounded-lg p-2 transition-all hover:scale-105'
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
            onClick={() => addDynamicField('before', key)}
            title='Add field before'
          >
            <FaPlusCircle className='h-3 w-3' />
          </button>
          <button
            className='rounded-lg p-2 transition-all hover:scale-105 disabled:opacity-50'
            style={{
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
            }}
            onClick={() => moveDynamicField(key, 'up')}
            disabled={index === 0}
            title='Move up'
          >
            <FaArrowUp className='h-3 w-3' />
          </button>
          <button
            className='rounded-lg p-2 transition-all hover:scale-105 disabled:opacity-50'
            style={{
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
            }}
            onClick={() => moveDynamicField(key, 'down')}
            disabled={index === length - 1}
            title='Move down'
          >
            <FaArrowDown className='h-3 w-3' />
          </button>
          <button
            className='rounded-lg p-2 transition-all hover:scale-105'
            style={{
              background: 'var(--destructive)',
              color: 'var(--destructive-foreground)',
            }}
            onClick={() => deleteDynamicField(key)}
            title='Delete field'
          >
            <FaTrashAlt className='h-3 w-3' />
          </button>
        </div>
      </div>
    ));
  };

  const handleCategoryChange = (category_id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category_id]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== category_id),
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl shadow-lg backdrop-blur-sm ${styles.cardContainer} ${styles.glassMorphism}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className='p-6'>
        {/* Header */}
        <div className='mb-6'>
          <h2 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl'>
            Edit Flashcard
          </h2>
        </div>

        {/* Question and Answer */}
        <div className='mb-6 space-y-4'>
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

        {/* Category Selection */}
        <div className='mb-6'>
          <h3 className='mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-lg font-semibold text-transparent'>
            Categories
          </h3>
          <div className='flex flex-wrap gap-3'>
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

        {/* Dynamic Fields */}
        <div className='mb-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h3
              className='text-lg font-semibold'
              style={{ color: 'var(--foreground)' }}
            >
              Custom Fields
            </h3>
            <Button
              onClick={() => addDynamicField('end')}
              className={`rounded-lg px-4 py-2 transition-all hover:scale-105 ${styles.modernButton} text-sm`}
            >
              + Add Field
            </Button>
          </div>
          <div className='space-y-4'>{renderDynamicFields()}</div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3'>
          <Button
            onClick={handleSave}
            className={`flex-1 rounded-lg py-3 transition-all hover:scale-105 ${styles.modernButton} text-base font-semibold`}
          >
            Save Changes
          </Button>
          <Button
            onClick={onCancel}
            className={`flex-1 rounded-lg py-3 transition-all hover:scale-105 ${styles.modernButton} text-base font-semibold`}
            style={{
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FlashcardFormEdit;
