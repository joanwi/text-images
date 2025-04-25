import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  
  try {
    const requestBody = await request.json();

    const { filesUrl, prompt } = requestBody;

    const response = await fetch('https://kieai.erweima.ai/api/v1/gpt4o-image/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.GPT4O_API_KEY}`,
      },
      body: JSON.stringify({
        filesUrl: filesUrl || [],
        prompt: prompt || '',
        size: '1:1',
        isEnhance: false,
        uploadCn: false,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(responseData, { status: response.status });
    }

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: 'generate image error' },
      { status: 500 }
    );
  }
} 