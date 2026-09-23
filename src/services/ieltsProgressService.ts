import dbConnect from '@/lib/dbConnect';
import IeltsProgressModel, { IIeltsProgress } from '@/models/IeltsProgressModel';

export interface UpdateIeltsProgressInput {
  lastReadChapterId?: string | null;
  completedChapterIds?: string[];
}

/**
 * Get or initialize IELTS progress for a given user from MongoDB.
 */
export async function getIeltsProgress(
  userId: string = 'default-user'
): Promise<IIeltsProgress> {
  await dbConnect();

  let progress = await IeltsProgressModel.findOne({ userId });

  if (!progress) {
    progress = await IeltsProgressModel.create({
      userId,
      lastReadChapterId: null,
      completedChapterIds: [],
    });
  }

  return progress;
}

/**
 * Upsert IELTS progress (lastReadChapterId and/or completedChapterIds) in MongoDB.
 */
export async function updateIeltsProgress(
  data: UpdateIeltsProgressInput,
  userId: string = 'default-user'
): Promise<IIeltsProgress> {
  await dbConnect();

  const updateFields: Record<string, unknown> = {};

  if (data.lastReadChapterId !== undefined) {
    updateFields.lastReadChapterId = data.lastReadChapterId;
  }

  if (Array.isArray(data.completedChapterIds)) {
    // Deduplicate chapter IDs
    updateFields.completedChapterIds = Array.from(new Set(data.completedChapterIds));
  }

  const updated = await IeltsProgressModel.findOneAndUpdate(
    { userId },
    { $set: updateFields },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

  return updated;
}

/**
 * Toggle a specific chapter completion state in MongoDB.
 */
export async function toggleChapterCompletionInDb(
  chapterId: string,
  userId: string = 'default-user'
): Promise<IIeltsProgress> {
  await dbConnect();

  const current = await getIeltsProgress(userId);
  const currentSet = new Set(current.completedChapterIds || []);

  if (currentSet.has(chapterId)) {
    currentSet.delete(chapterId);
  } else {
    currentSet.add(chapterId);
  }

  current.completedChapterIds = Array.from(currentSet);
  await current.save();

  return current;
}
