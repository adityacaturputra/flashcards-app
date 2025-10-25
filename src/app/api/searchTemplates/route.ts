import { NextRequest, NextResponse } from 'next/server';
import {
  getSearchTemplates,
  createSearchTemplate,
  initializeDefaultTemplates,
} from '@/services/searchTemplateService';

// GET /api/searchTemplates - Get all search templates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;

    // Initialize default templates if they don't exist
    await initializeDefaultTemplates();

    const templates = await getSearchTemplates(userId);

    return NextResponse.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    console.error('Error in GET /api/searchTemplates:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch search templates',
      },
      { status: 500 },
    );
  }
}

// POST /api/searchTemplates - Create a new search template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, template, isDefault = false, userId } = body;

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

    const newTemplate = await createSearchTemplate({
      name,
      template,
      isDefault,
      userId,
    });

    return NextResponse.json(
      {
        success: true,
        data: newTemplate,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error in POST /api/searchTemplates:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create search template',
      },
      { status: 500 },
    );
  }
}
