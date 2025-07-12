// src/app/api/generateFlashcards/route.ts
import fullPrint from '@/utils/fullPrint';
import parseAIMessage from '@/utils/parseAIMessage';
import { NextResponse } from 'next/server';

async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  if (!prompt) {
    return NextResponse.json(
      { message: 'Prompt is required' },
      { status: 400 },
    );
  }

  const extendedPrompt = `
    We have example data for return that you should format when responding, please return the following format
    \`\`\`
    [
        {
            "question": "Mengemudi",
            "answer": "Drive",
            "progression": "new",
            "nextReviewDate": "${Date.now()}",
            "dynamicFields": {
                "v1": "Drive",
                "v2": "Drove",
                "v3": "Driven",
                "-ing": "Driving",
                "-es": "Drives
            }
        }
    ]
    \`\`\`
    The points: 
        - The dynamicFields can have an unlimited number of keys, such as v1, v2, v3, v4, v5, and so on.
    We want you to generate flashcards in bulk by following the prompt, and PLEASE ONLY RESPOND TO YOUR MESSAGE IN JSON FORMAT AS ARRAY
    PLEASE ONLY RESPOND TO YOUR MESSAGE IN JSON FORMAT AS ARRAY
    PLEASE ONLY RESPOND TO YOUR MESSAGE IN JSON FORMAT AS ARRAY
    PLEASE ONLY RESPOND TO YOUR MESSAGE IN JSON FORMAT AS ARRAY
    PLEASE ONLY RESPOND TO YOUR MESSAGE IN JSON FORMAT AS ARRAY
    PLEASE ONLY RESPOND TO YOUR MESSAGE IN JSON FORMAT AS ARRAY
    the prompt:
    ${prompt}
  `;

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_LLM_MODEL,
          messages: [
            {
              role: 'user',
              content: extendedPrompt,
            },
          ],
        }),
      },
    );

    const data = await response.json();
    fullPrint(data);
    const message = data?.choices?.[0]?.message?.content;
    const flashcards = parseAIMessage(message);

    return NextResponse.json(flashcards, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error generating flashcards' },
      { status: 500 },
    );
  }
}

export { POST };
