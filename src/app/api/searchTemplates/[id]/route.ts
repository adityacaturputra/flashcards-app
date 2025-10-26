import { NextRequest, NextResponse } from 'next/server';
import {
  getSearchTemplateById,
  updateSearchTemplate,
  deleteSearchTemplate,
} from '@/services/searchTemplateService';

// GET /api/searchTemplates/[id] - Get a single search template
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;
    const { id } = await params;

    const template = await getSearchTemplateById(id, userId);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search template not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error('Error in GET /api/searchTemplates/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch search template',
      },
      { status: 500 },
    );
  }
}

// PUT /api/searchTemplates/[id] - Update a search template
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await request.json();
    const { name, template, isDefault, userId } = body;
    const { id } = await params;

    if (!name || !template) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and template are required',
        },
        { status: 400 },
      );
    }

    // Validate template contains {x} placeholder
    if (!template.includes('{x}')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template must contain {x} placeholder',
        },
        { status: 400 },
      );
    }

    const updatedTemplate = await updateSearchTemplate(
      id,
      { name, template, isDefault },
      userId,
    );

    if (!updatedTemplate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search template not found or cannot be updated',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedTemplate,
    });
  } catch (error) {
    console.error('Error in PUT /api/searchTemplates/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update search template',
      },
      { status: 500 },
    );
  }
}

// DELETE /api/searchTemplates/[id] - Delete a search template
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;
    const { id } = await params;

    const deleted = await deleteSearchTemplate(id, userId);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search template not found or cannot be deleted',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Search template deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE /api/searchTemplates/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to delete search template',
      },
      { status: 500 },
    );
  }
}
