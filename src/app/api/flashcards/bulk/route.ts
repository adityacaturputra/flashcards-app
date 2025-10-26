import { NextRequest, NextResponse } from 'next/server';
import FlashcardService from '@/services/flashcardService';
import { Progression } from '@/types/flashcard';

interface BulkUpdateRequest {
  flashcardIds: string[];
  action: 'increase' | 'current' | 'decrease';
}

// Progression mapping based on current state and action
const getNewProgression = (
  currentProgression: Progression,
  action: 'increase' | 'current' | 'decrease',
  categoryId?: string,
): Progression => {
  const progressionOrder: Progression[] = [
    Progression.New,
    Progression.Retry,
    Progression.Hard,
    Progression.Normal,
    Progression.Good,
    Progression.Perfect,
  ];
  const currentIndex = progressionOrder.indexOf(currentProgression);

  switch (action) {
    case 'increase':
      // Move up in progression, but cap at 'good' for most categories
      const maxIndex = categoryId
        ? Math.min(progressionOrder.length - 2, currentIndex + 1)
        : currentIndex + 1;
      return progressionOrder[Math.min(maxIndex, progressionOrder.length - 1)];

    case 'current':
      // Set to normal for most categories, or keep current if already normal
      return currentProgression === Progression.Normal
        ? currentProgression
        : Progression.Normal;

    case 'decrease':
      // Move down in progression, but don't go below 'learning'
      const minIndex = Math.max(1, currentIndex - 1);
      return progressionOrder[minIndex];

    default:
      return currentProgression;
  }
};

// PUT /api/flashcards/bulk - Bulk update flashcard progressions
export async function PUT(request: NextRequest) {
  try {
    const body: BulkUpdateRequest = await request.json();
    const { flashcardIds, action } = body;

    if (
      !flashcardIds ||
      !Array.isArray(flashcardIds) ||
      flashcardIds.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Flashcard IDs array is required and must not be empty',
        },
        { status: 400 },
      );
    }

    if (!action || !['increase', 'current', 'decrease'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Valid action is required (increase, current, decrease)',
        },
        { status: 400 },
      );
    }

    // First, fetch all flashcards to get their current states
    const flashcardService = FlashcardService.getInstance();
    const allFlashcards = await flashcardService.getFlashcards();

    // Filter to only the flashcards we want to update
    const flashcardsToUpdate = allFlashcards.filter((flashcard) =>
      flashcardIds.includes(flashcard._id || ''),
    );

    // Update all flashcards with category-aware progression
    const updatePromises = flashcardsToUpdate.map(async (flashcard) => {
      try {
        const currentProgression = flashcard.progression;
        const categoryId = flashcard.categories?.[0]; // Use first category if available
        const newProgression = getNewProgression(
          currentProgression,
          action,
          categoryId,
        );

        // Only update if the progression actually changes
        if (newProgression !== currentProgression) {
          const updatedFlashcard = await flashcardService.updateFlashcard(
            flashcard._id || '',
            { progression: newProgression },
          );
          return {
            id: flashcard._id,
            success: true,
            flashcard: updatedFlashcard,
            oldProgression: currentProgression,
            newProgression: newProgression,
            categoryId: categoryId,
          };
        } else {
          return {
            id: flashcard._id,
            success: true,
            flashcard: flashcard,
            oldProgression: currentProgression,
            newProgression: newProgression,
            categoryId: categoryId,
            noChange: true,
          };
        }
      } catch (error) {
        console.error(`Failed to update flashcard ${flashcard._id}:`, error);
        return {
          id: flashcard._id,
          success: false,
          error: error instanceof Error ? error.message : 'Update failed',
        };
      }
    });

    const results = await Promise.all(updatePromises);

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);
    const changed = successful.filter((r) => !r.noChange);
    const noChange = successful.filter((r) => r.noChange);

    return NextResponse.json({
      success: true,
      data: {
        total: flashcardIds.length,
        successful: successful.length,
        failed: failed.length,
        changed: changed.length,
        noChange: noChange.length,
        action: action,
        results: results,
      },
      message: `Bulk ${action} action completed: ${changed.length} flashcards updated, ${noChange.length} unchanged, ${failed.length} failed`,
    });
  } catch (error) {
    console.error('Error in PUT /api/flashcards/bulk:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to bulk update flashcards',
      },
      { status: 500 },
    );
  }
}
