// src/app/api/quiz/route.ts
import { NextResponse } from 'next/server';
import { QuizServerRegistry } from '@/server/quiz/QuizServerRegistry';
import '@/server/quiz/modules'; // Ensure modules are registered

export async function GET() {
  try {
    const modules = QuizServerRegistry.getMetaList();
    return NextResponse.json({ modules });
  } catch (error) {
    console.error('Error fetching quiz modules:', error);
    return NextResponse.json(
      { message: 'Error fetching quiz modules' },
      { status: 500 },
    );
  }
}
