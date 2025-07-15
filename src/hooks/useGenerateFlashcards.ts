import { Dispatch, SetStateAction, useState } from 'react';
import { Flashcard, Progression } from '@/types/flashcard';
import newKeyGen from '@/utils/keyGenIterator';
import convertXmlToObject from '@/utils/convertXmlToObject';
import { useAppContext } from '@/context/appContext';

interface UseGenerateFlashcardsResult {
  flashCards: Flashcard[];
  selectedFlashcards: string[];
  isLoading: boolean;
  error: string | null;
  handleGenerateFlashcards: (prompt: string) => void;
  handleToggleFlashcardSelection: (key: string) => void;
  handleSaveSelectedFlashcards: () => void;

  setQuestion: Dispatch<SetStateAction<string>>;
  question: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  answer: string;
  fieldKeys: string[];
  handleFieldChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  dynamicFields: Record<string, string>;
  deleteDynamicField: (key: string) => void;
  addDynamicField: () => void;
  handleAddFlashcardToList: () => void;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  setPrompt: Dispatch<SetStateAction<string>>;
  prompt: string;
}

const useGenerateFlashcards = (
  addFlashcard: (flashcard: Flashcard) => Promise<void>,
): UseGenerateFlashcardsResult => {
  const { flashcards: savedFlashcards } = useAppContext();
  const [flashCards, setFlashCards] = useState<Flashcard[]>([]);
  const [selectedFlashcards, setSelectedFlashcards] = useState<string[]>([]);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [fieldKeys, setFieldKeys] = useState<string[]>(Object.keys({}));
  const [dynamicFields, setDynamicFields] = useState<Record<string, string>>(
    {},
  );

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFlashcards = async (prompt: string) => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generateFlashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data: Flashcard[] = await response.json();
      const dataWithKeys = data.map((e) => ({
        ...e,
        key: crypto.randomUUID(),
      }));
      const keys = dataWithKeys.map((e) => e.key);

      setFlashCards((prev) => [...prev, ...dataWithKeys]);
      setSelectedFlashcards((prev) => [...prev, ...keys]);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error(error);
      alert('Error generating flashcards. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFlashcardSelection = (key: string) => {
    setSelectedFlashcards((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((selectedKey) => selectedKey !== key)
        : [...prevSelected, key],
    );
  };

  const handleSaveSelectedFlashcards = async () => {
    const selectedFlashcardsTemp = flashCards.filter((flashcard) =>
      selectedFlashcards.includes(flashcard.key!),
    );

    try {
      const responses = await Promise.all(
        selectedFlashcardsTemp.map(async (flashcard) => {
          await addFlashcard({
            question: flashcard.question,
            answer: flashcard.answer,
            progression: flashcard.progression || Progression.New,
            nextReviewDate: flashcard.nextReviewDate || new Date(),
            dynamicFields: flashcard.dynamicFields || {},
          });
        }),
      );

      if (responses) {
        setFlashCards([]);
        setSelectedFlashcards([]);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error(error);
      alert('Error saving flashcards. Please try again later.');
    }
  };

  const handleAddFlashcardToList = () => {
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

      const key = crypto.randomUUID();
      setFlashCards((prev) => [
        ...prev,
        {
          question,
          answer,
          progression: Progression.New,
          nextReviewDate: new Date(),
          dynamicFields: formattedDynamicFields,
          key,
        },
      ]);
      setSelectedFlashcards((prev) => [...prev, key]);

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const xmlData = e.target?.result as string;
      const processedData = convertXmlToObject(xmlData);
      const keys: string[] = [];
      const mapAlreadySavedCards = savedFlashcards.reduce(
        (map, e) => map.set(`${e.question}|${e.answer}`, true),
        new Map(),
      );
      const flashcards: Flashcard[] = [];
      const unSelectedFlashcards: Flashcard[] = [];
      processedData.forEach((e) => {
        const key = crypto.randomUUID();
        const flashcard = {
          question: e.frontMatch,
          answer: e.backMatch,
          key: key,
        } as Flashcard;
        const keyMap = `${flashcard.question}|${flashcard.answer}`;
        if (!mapAlreadySavedCards.get(keyMap)) {
          flashCards.push(flashcard);
          keys.push(key);
        } else {
          unSelectedFlashcards.push(flashcard);
        }
      });
      setFlashCards((prev) => [
        ...flashcards,
        ...prev,
        ...unSelectedFlashcards,
      ]);
      setSelectedFlashcards((prev) => [...keys, ...prev]);
    };
    reader.readAsText(file);
  };

  return {
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
  };
};

export default useGenerateFlashcards;
