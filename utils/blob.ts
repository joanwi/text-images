import type { PutBlobResult } from '@vercel/blob';

// 上传图片
export async function uploadImage(file: File, type: 'temp' | 'generated'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `/api/blob/upload?filename=${file.name}&type=${type}`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error('上传失败');
  }

  const blob = (await response.json()) as PutBlobResult;
  return blob.url;
}

// 上传临时图片
export async function uploadTempImage(file: File): Promise<string> {
  return uploadImage(file, 'temp');
}

// 上传生成的图片
export async function uploadGeneratedImage(file: File): Promise<string> {
  return uploadImage(file, 'generated');
}

// 删除图片
export async function deleteImage(url: string): Promise<void> {
  const response = await fetch('/api/blob/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('删除失败');
  }
} 