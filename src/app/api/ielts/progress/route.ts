import { NextRequest, NextResponse } from 'next/server';
import {
  getIeltsProgress,
  updateIeltsProgress,
  toggleChapterCompletionInDb,
} from '@/services/ieltsProgressService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default-user';

    const progress = await getIeltsProgress(userId);

    return NextResponse.json({
      success: true,
      data: {
        userId: progress.userId,
        lastReadChapterId: progress.lastReadChapterId,
        completedChapterIds: progress.completedChapterIds || [],
        lastUpdated: progress.updatedAt?.toISOString() || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in GET /api/ielts/progress:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch IELTS progress from MongoDB',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 'default-user', action, chapterId, lastReadChapterId, completedChapterIds } = body;

    let updated;

    if (action === 'toggle' && chapterId) {
      updated = await toggleChapterCompletionInDb(chapterId, userId);
    } else {
      updated = await updateIeltsProgress(
        {
          lastReadChapterId,
          completedChapterIds,
        },
        userId
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: updated.userId,
        lastReadChapterId: updated.lastReadChapterId,
        completedChapterIds: updated.completedChapterIds || [],
        lastUpdated: updated.updatedAt?.toISOString() || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in POST /api/ielts/progress:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to save IELTS progress to MongoDB',
      },
      { status: 500 }
    );
  }
}
