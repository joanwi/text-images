import { del, put } from '@vercel/blob';

// 上传临时图片
export async function uploadTempImage(file: File): Promise<string> {
  const { url } = await put(`temp/${Date.now()}-${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });
  return url;
}

// 上传生成的图片
export async function uploadGeneratedImage(file: File): Promise<string> {
  const { url } = await put(`generated/${Date.now()}-${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });
  return url;
}

// 删除图片
export async function deleteImage(url: string): Promise<void> {
  await del(url);
} 