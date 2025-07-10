// models/FlashcardModel.ts
import { Flashcard, Progression } from '@/types/flashcard';
import mongoose from 'mongoose';

const FlashcardSchema = new mongoose.Schema<Flashcard>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    progression: {
      type: String,
      required: true,
      enum: Object.values(Progression), // Use Object.values(Progression)
    },
    nextReviewDate: { type: Date, required: true },
    dynamicFields: Object, // Added to store dynamic fields
  },
  { collection: 'flashcards' },
);

const FlashcardModel =
  mongoose.models?.Flashcard ||
  mongoose.model<Flashcard>('Flashcard', FlashcardSchema);

export default FlashcardModel;
