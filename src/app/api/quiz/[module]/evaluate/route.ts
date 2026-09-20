// src/app/api/quiz/[module]/evaluate/route.ts
import { NextResponse } from 'next/server';
import { QuizServerRegistry } from '@/server/quiz/QuizServerRegistry';
import '@/server/quiz/modules'; // Ensure modules are registered
import { QuestionAnswerRecord } from '@/types/quiz';

interface RouteParams {
  params: Promise<{ module: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { module: moduleId } = await params;
    const serverModule = QuizServerRegistry.getModule(moduleId);

    if (!serverModule) {
      return NextResponse.json(
        { message: `Quiz module '${moduleId}' not found` },
        { status: 404 },
      );
    }

    const body = (await request.json()) as { records?: QuestionAnswerRecord[] };
    const records = body.records ?? [];

    const rubricResult = await serverModule.calculateRubricScore(records);

    return NextResponse.json({ rubricResult });
  } catch (error) {
    console.error('Error evaluating quiz session:', error);
    return NextResponse.json(
      { message: 'Error evaluating quiz session' },
      { status: 500 },
    );
  }
}
