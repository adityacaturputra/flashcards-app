// src/app/api/quiz/[module]/route.ts
import { NextResponse } from 'next/server';
import { QuizServerRegistry } from '@/server/quiz/QuizServerRegistry';
import '@/server/quiz/modules'; // Ensure modules are registered
import { QuizDifficultyLevel } from '@/types/quiz';

interface RouteParams {
  params: Promise<{ module: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { module: moduleId } = await params;
    const serverModule = QuizServerRegistry.getModule(moduleId);

    if (!serverModule) {
      return NextResponse.json(
        { message: `Quiz module '${moduleId}' not found` },
        { status: 404 },
      );
    }

    const { searchParams } = new URL(request.url);
    const countParam = searchParams.get('count');
    const levelParam = searchParams.get('level');

    const count = countParam ? Math.min(Math.max(parseInt(countParam, 10) || 10, 1), 50) : 10;
    const targetLevel = levelParam
      ? (Math.min(Math.max(parseInt(levelParam, 10) || 1, 1), 5) as QuizDifficultyLevel)
      : undefined;

    const questions = await serverModule.generateSession({
      count,
      targetLevel,
    });

    return NextResponse.json({
      module: serverModule.meta,
      questions,
    });
  } catch (error) {
    console.error('Error generating quiz session:', error);
    return NextResponse.json(
      { message: 'Error generating quiz session' },
      { status: 500 },
    );
  }
}
