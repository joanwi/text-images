'use client'

import { useState } from 'react'
import Image from 'next/image'
import { uploadTempImage, deleteImage } from '@/utils/blob'

type GenerationType = 'text' | 'image'

export default function Generator() {
  const [prompt, setPrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generationType, setGenerationType] = useState<GenerationType>('text')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const url = await uploadTempImage(file)
        setUploadedImage(url)
      } catch (error) {
        console.error('上传图片失败:', error)
      }
    }
  }

  const handleGenerate = async () => {
    if (!prompt && !uploadedImage) return
    
    setIsGenerating(true)
    try {
      // TODO: 调用生成 API
      // 成功后删除临时图片
      if (uploadedImage) {
        await deleteImage(uploadedImage)
        setUploadedImage(null)
      }
    } catch (error) {
      console.error('生成失败:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setGenerationType('text')}
              className={`flex-1 py-2 rounded-lg ${
                generationType === 'text'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Text to Image
            </button>
            <button
              onClick={() => setGenerationType('image')}
              className={`flex-1 py-2 rounded-lg ${
                generationType === 'image'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Image to Image
            </button>
          </div>

          <div className="space-y-4">
            {generationType === 'image' && (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer block"
                >
                  {uploadedImage ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={uploadedImage}
                        alt="Uploaded image"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      Click to upload an image or drag and drop
                    </div>
                  )}
                </label>
              </div>
            )}

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                generationType === 'text'
                  ? 'Describe the image you want to create...'
                  : 'Describe how you want to transform the image...'
              }
              className="w-full h-32 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerate}
              disabled={!prompt || (generationType === 'image' && !uploadedImage)}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 