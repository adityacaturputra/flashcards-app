import { NextRequest, NextResponse } from 'next/server';
import { Flashcard } from '@/types/flashcard';
import { DataProviderFactory } from '@/services/dataProviders';
import { BulkFlashcardReviewUpdate } from '@/services/dataProviders/types';
import { resolveDataSource } from '@/utils/resolveDataSource';

const MAX_BULK_REVIEW_ITEMS = 300;

interface BulkReviewRequestBody {
  updates?: unknown;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * POST /api/flashcards/bulk-review
 * Applies batched Anki SRS review patches in a single atomic/bulk operation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BulkReviewRequestBody;

    if (!Array.isArray(body?.updates) || body.updates.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'updates array is required and must not be empty',
        },
        { status: 400 },
      );
    }

    if (body.updates.length > MAX_BULK_REVIEW_ITEMS) {
      return NextResponse.json(
        {
          success: false,
          error: `updates exceeds maximum limit of ${MAX_BULK_REVIEW_ITEMS} items per request`,
        },
        { status: 400 },
      );
    }

    const sanitizedUpdates: BulkFlashcardReviewUpdate[] = [];
    for (const item of body.updates) {
      if (!isPlainObject(item)) continue;
      const id = typeof item.id === 'string' ? item.id.trim() : '';
      if (!id || !isPlainObject(item.patch)) continue;

      const patchCopy: Record<string, unknown> = { ...item.patch };
      delete patchCopy._id;
      delete patchCopy.id;
      delete patchCopy.source;

      sanitizedUpdates.push({
        id,
        patch: patchCopy as Partial<Flashcard>,
      });
    }

    if (sanitizedUpdates.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid update items provided',
        },
        { status: 400 },
      );
    }

    const source = resolveDataSource(request);
    const provider = DataProviderFactory.getFlashcardProvider(source);
    const result = await provider.bulkUpdateFlashcards(sanitizedUpdates);

    return NextResponse.json({
      success: true,
      updatedCount: result.updatedIds.length,
      updatedIds: result.updatedIds,
      notFoundIds: result.notFoundIds,
      updatedFlashcards: result.updatedFlashcards,
    });
  } catch (error) {
    console.error('Error in POST /api/flashcards/bulk-review:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to bulk update flashcard reviews',
      },
      { status: 500 },
    );
  }
}
