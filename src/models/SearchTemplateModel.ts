import mongoose, { Document, Schema } from 'mongoose';

export interface SearchTemplate extends Document {
  name: string;
  template: string;
  isDefault: boolean;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SearchTemplateSchema = new Schema<SearchTemplate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    template: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index for better query performance
SearchTemplateSchema.index({ userId: 1 });
SearchTemplateSchema.index({ isDefault: 1 });

export default mongoose.models.SearchTemplate ||
  mongoose.model<SearchTemplate>('SearchTemplate', SearchTemplateSchema);
