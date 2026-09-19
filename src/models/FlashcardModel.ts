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
    // Anki Spaced Repetition (SM-2) Variables
    repetitions: { type: Number, default: 0 },
    interval: { type: Number, default: 0 },
    easeFactor: { type: Number, default: 2.5 },
    lapses: { type: Number, default: 0 },
    lastReviewedDate: { type: Date },
  },
  { collection: 'flashcards' },
);

const FlashcardModel =
  mongoose.models?.Flashcard ||
  mongoose.model<Flashcard>('Flashcard', FlashcardSchema);

export default FlashcardModel;
