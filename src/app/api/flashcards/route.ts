// app/api/flashcards/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import FlashcardService from '../../../services/flashcardService';
import { Flashcard } from '../../../types/flashcard';

const flashcardService = FlashcardService.getInstance();

export async function GET() {
  await dbConnect();
  try {
    const flashcards = await flashcardService.getFlashcards();
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching flashcards' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  try {
    // Check if it's a single flashcard or array of flashcards
    if (Array.isArray(body)) {
      // Bulk create flashcards
      const flashcards = await flashcardService.addFlashcards(body);
      return NextResponse.json(flashcards, { status: 201 });
    } else {
      // Single flashcard
      const flashcard = await flashcardService.addFlashcard(body);
      return NextResponse.json(flashcard, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error adding flashcard(s)' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { id, ...data } = body;
  try {
    const updatedFlashcard = await flashcardService.updateFlashcard(id, data);
    return NextResponse.json(updatedFlashcard);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error updating flashcard' },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { id } = body;
  try {
    const updatedFlashcard = await flashcardService.deleteFlashcard(id);
    return NextResponse.json(updatedFlashcard);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error updating flashcard' },
      { status: 500 },
    );
  }
}
