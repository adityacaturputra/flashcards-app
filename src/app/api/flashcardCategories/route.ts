import { NextRequest, NextResponse } from 'next/server';
import { FlashcardCategory } from '@/types/flashcard';
import { DataProviderFactory } from '@/services/dataProviders';
import { resolveDataSource } from '@/utils/resolveDataSource';

export async function GET(request: NextRequest) {
  const source = resolveDataSource(request);
  const provider = DataProviderFactory.getCategoryProvider(source);

  try {
    const categories = await provider.getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const source = resolveDataSource(request);
  const provider = DataProviderFactory.getCategoryProvider(source);
  const body = (await request.json()) as FlashcardCategory;

  try {
    const category = await provider.addCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json(
      { message: 'Error adding category' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Record<string, unknown>;
  const id = (request.nextUrl.searchParams.get('id') || body.id || body._id) as string;

  if (!id) {
    return NextResponse.json(
      { message: 'Category ID is required for update' },
      { status: 400 },
    );
  }

  const source = resolveDataSource(request);
  const provider = DataProviderFactory.getCategoryProvider(source);
  
  const updateData = { ...body };
  delete updateData.id;
  delete updateData._id;
  delete updateData.source;

  try {
    const updatedCategory = await provider.updateCategory(id, updateData as Partial<FlashcardCategory>);
    if (!updatedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { message: 'Error updating category' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    // Body might be empty
  }

  const id = (request.nextUrl.searchParams.get('id') || body.id || body._id) as string;

  if (!id) {
    return NextResponse.json(
      { message: 'Category ID is required for deletion' },
      { status: 400 },
    );
  }

  const source = resolveDataSource(request);
  const provider = DataProviderFactory.getCategoryProvider(source);

  try {
    const deletedCategory = await provider.deleteCategory(id);
    if (!deletedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { message: 'Error deleting category' },
      { status: 500 },
    );
  }
}
