import mongoose, { Document, Schema } from 'mongoose';

export interface IIeltsProgress extends Document {
  userId: string;
  lastReadChapterId: string | null;
  completedChapterIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const IeltsProgressSchema = new Schema<IIeltsProgress>(
  {
    userId: {
      type: String,
      required: true,
      default: 'default-user',
      trim: true,
      index: true,
    },
    lastReadChapterId: {
      type: String,
      default: null,
      trim: true,
    },
    completedChapterIds: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'ielts_progress',
  }
);

export default mongoose.models.IeltsProgress ||
  mongoose.model<IIeltsProgress>('IeltsProgress', IeltsProgressSchema);
