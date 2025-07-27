// src/app/api/flashcardCategories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import { FlashcardCategory } from '../../../types/flashcard';
import FlashcardCategoryService from '@/services/flashcardCategoryService';

const flashcardCategoryService = FlashcardCategoryService.getInstance();

export async function GET() {
  await dbConnect();
  try {
    const categories = await flashcardCategoryService.getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body: FlashcardCategory = await request.json();
  try {
    const category = await flashcardCategoryService.addCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error adding category' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const { id, ...data } = body;
  try {
    const updatedCategory = await flashcardCategoryService.updateCategory(
      id,
      data,
    );
    if (!updatedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error updating category' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const { id } = body;
  try {
    const deletedCategory = await flashcardCategoryService.deleteCategory(id);
    if (!deletedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error deleting category' },
      { status: 500 },
    );
  }
}
