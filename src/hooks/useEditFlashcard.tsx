import { useState } from 'react';
import {
  Flashcard,
  DynamicFieldPosition,
  DYNAMIC_FIELD_POSITION,
  MoveDirection,
  MOVE_DIRECTION,
} from '@/types/flashcard';
import newKeyGen from '@/utils/keyGenIterator';

type UseEditFlashcardProps = {
  flashcard: Flashcard;
  onUpdate: (id: string, flashcard: Partial<Flashcard>) => Promise<void>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const useEditFlashcard = ({
  flashcard,
  onUpdate,
  setIsEditing,
}: UseEditFlashcardProps) => {
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    flashcard.categories || [],
  );
  const [dynamicFields, setDynamicFields] = useState<{ [key: string]: string }>(
    flashcard.dynamicFields || {},
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(flashcard._id!, {
        question,
        answer,
        categories: selectedCategories,
        dynamicFields,
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
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
    position: DynamicFieldPosition,
    referenceKey?: string,
  ) => {
    const newKey = newKeyGen(0, dynamicFields);
    const dynamicFieldEntries = Object.entries(dynamicFields);
    const newFields: { [key: string]: string } = {};

    if (position === DYNAMIC_FIELD_POSITION.START) {
      newFields[newKey] = '';
      dynamicFieldEntries.forEach(([key, value]) => {
        newFields[key] = value;
      });
    } else if (position === DYNAMIC_FIELD_POSITION.END) {
      dynamicFieldEntries.forEach(([key, value]) => {
        newFields[key] = value;
      });
      newFields[newKey] = '';
    } else if (position === DYNAMIC_FIELD_POSITION.BEFORE && referenceKey) {
      dynamicFieldEntries.forEach(([key, value]) => {
        if (key === referenceKey) {
          newFields[newKey] = '';
        }
        newFields[key] = value;
      });
    } else if (position === DYNAMIC_FIELD_POSITION.AFTER && referenceKey) {
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

  const moveDynamicField = (key: string, direction: MoveDirection) => {
    const dynamicFieldEntries = Object.entries(dynamicFields);
    const index = dynamicFieldEntries.findIndex(([k]) => k === key);

    if (index === -1) return;

    if (direction === MOVE_DIRECTION.UP && index > 0) {
      [dynamicFieldEntries[index], dynamicFieldEntries[index - 1]] = [
        dynamicFieldEntries[index - 1],
        dynamicFieldEntries[index],
      ];
    } else if (direction === MOVE_DIRECTION.DOWN && index < dynamicFieldEntries.length - 1) {
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

  return {
    question,
    setQuestion,
    answer,
    setAnswer,
    dynamicFields,
    setDynamicFields,
    handleSave,
    handleCancel,
    handleDynamicFieldChange,
    addDynamicField,
    deleteDynamicField,
    moveDynamicField,
    setSelectedCategories,
    selectedCategories,
    isSaving,
  };
};

export default useEditFlashcard;
