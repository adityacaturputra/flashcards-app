import { NextResponse } from 'next/server';
import { Flashcard } from '@/types/flashcard';
import { DataSource } from '@/types/dataSource';
import { SOURCE_QUERY_PARAM } from '@/constants/dataSource';
import { DataProviderFactory } from '@/services/dataProviders';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = (searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
  const provider = DataProviderFactory.getFlashcardProvider(source);

  try {
    const flashcards = await provider.getFlashcards();
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json(
      { message: 'Error fetching flashcards' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = (searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
  const provider = DataProviderFactory.getFlashcardProvider(source);
  const body: Flashcard = await request.json();

  try {
    const flashcard = await provider.addFlashcard(body);
    return NextResponse.json(flashcard, { status: 201 });
  } catch (error) {
    console.error('Error adding flashcard:', error);
    return NextResponse.json(
      { message: 'Error adding flashcard' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = (searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
  const provider = DataProviderFactory.getFlashcardProvider(source);
  const body = await request.json();
  const { id, ...data } = body;

  try {
    const updatedFlashcard = await provider.updateFlashcard(id, data);
    return NextResponse.json(updatedFlashcard);
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return NextResponse.json(
      { message: 'Error updating flashcard' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = (searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
  const provider = DataProviderFactory.getFlashcardProvider(source);
  const body = await request.json();
  const { id } = body;

  try {
    const deletedFlashcard = await provider.deleteFlashcard(id);
    return NextResponse.json(deletedFlashcard);
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    return NextResponse.json(
      { message: 'Error deleting flashcard' },
      { status: 500 },
    );
  }
}
