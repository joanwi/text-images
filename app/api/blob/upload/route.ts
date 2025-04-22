import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const type = searchParams.get('type'); // 'temp' or 'generated'

  if (!filename || !type) {
    return NextResponse.json({ error: 'Missing filename or type' }, { status: 400 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const blob = await put(`${type}/${Date.now()}-${filename}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return NextResponse.json(blob);
} 