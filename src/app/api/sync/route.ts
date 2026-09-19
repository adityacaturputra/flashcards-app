import { NextResponse } from 'next/server';
import { SyncService } from '@/services/syncService';

/**
 * GET /api/sync
 * Retrieves comparison report between Local Repository and Cloud MongoDB
 */
export async function GET() {
  try {
    const report = await SyncService.computeDiff();
    return NextResponse.json({ success: true, report });
  } catch (error: unknown) {
    console.error('Error computing sync diff:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to compare Local and Cloud datasets.';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/sync
 * Executes two-way synchronization:
 * - direction: 'push' (Local -> MongoDB)
 * - direction: 'pull' (MongoDB -> Local)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, direction, cardIds, cardId, resolvedCard, target } = body;

    // Handle individual conflict resolution
    if (action === 'resolve_conflict') {
      if (!cardId || !resolvedCard) {
        return NextResponse.json(
          {
            success: false,
            error: 'cardId and resolvedCard are required to resolve a conflict.',
          },
          { status: 400 },
        );
      }

      const result = await SyncService.resolveCardConflict(
        cardId,
        resolvedCard,
        target || 'both',
      );
      return NextResponse.json(result);
    }

    if (direction !== 'push' && direction !== 'pull') {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid sync direction. Must be either 'push' or 'pull', or action must be 'resolve_conflict'.",
        },
        { status: 400 },
      );
    }

    let result;
    if (direction === 'push') {
      result = await SyncService.pushLocalToCloud(cardIds);
    } else {
      result = await SyncService.pullCloudToLocal(cardIds);
    }

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    console.error('Error executing sync:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to execute synchronization.';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
