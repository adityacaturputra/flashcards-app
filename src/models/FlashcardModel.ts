// models/FlashcardModel.ts
import { Flashcard, Progression } from '@/types/flashcard';
import mongoose, { Schema } from 'mongoose';

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
    categories: [{ type: Schema.Types.ObjectId, ref: 'FlashcardCategory' }], // Many-to-many relationship
  },
  { collection: 'flashcards' },
);

const FlashcardModel =
  mongoose.models?.Flashcard ||
  mongoose.model<Flashcard>('Flashcard', FlashcardSchema);

export default FlashcardModel;
