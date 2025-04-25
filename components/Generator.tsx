'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { uploadTempImage, deleteImage } from '@/utils/blob'

type GenerationType = 'text' | 'image'
type TaskStatus = 'idle' | 'generating' | 'completed' | 'error' | 'unknown'

export default function Generator() {

  const [prompt, setPrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generationType, setGenerationType] = useState<GenerationType>('text')
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('idle')
  const [taskId, setTaskId] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const url = await uploadTempImage(file)
        setUploadedImage(url)
      } catch (error) {
        console.error('upload image error:', error)
      }
    }
  }

  const handleGenerate = async () => {
    if (!prompt && !uploadedImage) return
    
    setTaskStatus('generating')
    setImageUrl(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filesUrl: uploadedImage ? [uploadedImage] : [],
          prompt,
        }),
      })

      const data = await response.json()

      if (data.code === 200 && data.msg === 'success') {
        setTaskId(data.data.taskId)
        return;
      } else {
        setTaskStatus('error')
        throw new Error(data.msg || 'generate image error')
      }
    } catch (error) {
      setTaskStatus('error')
    }
  }

  useEffect(() => {
    if (!taskId) return;

    let isActive = true
    let intervalId: NodeJS.Timeout

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/status?taskId=${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()

        // console.log('status response:', data)

        if (!isActive) return

        if (data.status === 'SUCCESS') {
          setImageUrl(data.imageUrl)
          setTaskStatus('completed')
          setTaskId(null)
          if (uploadedImage) {
            deleteImage(uploadedImage)
            setUploadedImage(null)
          }
          clearInterval(intervalId)
        } else if (data.status === 'GENERATING') {
          setTaskStatus('generating')
        } else if (data.status === 'FAILED') {
          setTaskStatus('error')
          setTaskId(null)
          clearInterval(intervalId)
        } else {
          setTaskStatus('unknown')
          setTaskId(null)
          clearInterval(intervalId)
        }
      } catch (error) {
        console.error('获取状态失败:', error)
        if (isActive) {
          setTaskStatus('error')
          setTaskId(null)
        }
        clearInterval(intervalId)
      }
    }

    intervalId = setInterval(pollStatus, 5000)

    return () => {
      isActive = false
      clearInterval(intervalId)
      setTaskId(null)
    }
  }, [taskId])

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-black text-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setGenerationType('text')}
              className={`flex-1 py-2 rounded-lg ${
                generationType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Text to Image
            </button>
            <button
              onClick={() => setGenerationType('image')}
              className={`flex-1 py-2 rounded-lg ${
                generationType === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
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
                <label htmlFor="image-upload" className="cursor-pointer block">
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
                    <div className="text-gray-400">Click to upload an image or drag and drop</div>
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
              disabled={taskStatus === 'generating' || !prompt || (generationType === 'image' && !uploadedImage)}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {taskStatus === 'generating' ? 'Generating...' : 'Generate Image'}
            </button>

            {taskStatus !== 'idle' && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                {taskStatus === 'generating' && (
                  <div className="w-full">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span>image generating...</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      ></div>
                    </div>
                    <div className="mt-1 text-sm text-gray-400 text-center">
                    </div>
                  </div>
                )}

                {taskStatus === 'error' && (
                  <div className="text-red-400 text-center">
                    <div className="text-4xl mb-2">❌</div>
                    <p>image generation failed, please try again</p>
                  </div>
                )}

                {taskStatus === 'completed' && imageUrl && (
                  <div className="relative aspect-square max-w-[800px] w-full mx-auto">
                    <Image 
                      src={imageUrl} 
                      alt="Generated image" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                )}

                {taskStatus === 'unknown' && (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">❓</div>
                    <p>unknown status, please try again</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}