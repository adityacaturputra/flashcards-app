import { NextRequest, NextResponse } from 'next/server';
import { FlashcardCategory } from '@/types/flashcard';
import { DataSource } from '@/types/dataSource';
import { SOURCE_QUERY_PARAM } from '@/constants/dataSource';
import { DataProviderFactory } from '@/services/dataProviders';

export async function GET(request: NextRequest) {
  const source = (request.nextUrl.searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
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
  const source = (request.nextUrl.searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
  const provider = DataProviderFactory.getCategoryProvider(source);
  const body: FlashcardCategory = await request.json();

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
  const source = (request.nextUrl.searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
  const provider = DataProviderFactory.getCategoryProvider(source);
  const body = await request.json();
  const { id, ...data } = body;

  try {
    const updatedCategory = await provider.updateCategory(id, data);
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
  const source = (request.nextUrl.searchParams.get(SOURCE_QUERY_PARAM) as DataSource) || undefined;
  const provider = DataProviderFactory.getCategoryProvider(source);
  const body = await request.json();
  const { id } = body;

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
