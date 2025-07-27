// src/models/FlashcardCategoryModel.ts
import mongoose from 'mongoose';

// Define the FlashcardCategory schema
const FlashcardCategorySchema = new mongoose.Schema<FlashcardCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
  },
  { collection: 'flashcard_categories' },
);

// Create the FlashcardCategory model
const FlashcardCategoryModel =
  mongoose.models?.FlashcardCategory ||
  mongoose.model<FlashcardCategory>(
    'FlashcardCategory',
    FlashcardCategorySchema,
  );

export type FlashcardCategory = {
  _id?: string;
  name: string;
  description?: string;
};

export default FlashcardCategoryModel;
