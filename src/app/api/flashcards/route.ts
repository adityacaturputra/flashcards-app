import { NextResponse } from 'next/server';
import { Flashcard } from '@/types/flashcard';
import { DataProviderFactory } from '@/services/dataProviders';
import { resolveDataSource } from '@/utils/resolveDataSource';

export async function GET(request: Request) {
  const source = resolveDataSource(request);
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
  const source = resolveDataSource(request);
  const provider = DataProviderFactory.getFlashcardProvider(source);
  const body = (await request.json()) as Flashcard;

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
  const body = (await request.json()) as Record<string, unknown>;
  const id = (searchParams.get('id') || body.id || body._id) as string;

  if (!id) {
    return NextResponse.json(
      { message: 'Flashcard ID is required for update' },
      { status: 400 },
    );
  }

  const source = resolveDataSource(request);
  const provider = DataProviderFactory.getFlashcardProvider(source);
  
  const updateData = { ...body };
  delete updateData.id;
  delete updateData._id;
  delete updateData.source;

  try {
    const updatedFlashcard = await provider.updateFlashcard(id, updateData as Partial<Flashcard>);
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
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    // Body might be empty on DELETE
  }

  const id = (searchParams.get('id') || body.id || body._id) as string;

  if (!id) {
    return NextResponse.json(
      { message: 'Flashcard ID is required for deletion' },
      { status: 400 },
    );
  }

  const source = resolveDataSource(request);
  const provider = DataProviderFactory.getFlashcardProvider(source);

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
