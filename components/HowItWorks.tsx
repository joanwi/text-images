'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Choose Your Method',
    description: 'Select between text-to-image or image-to-image transformation.',
  },
  {
    title: 'Describe or Upload',
    description: 'Enter your text prompt or upload an image to transform.',
  },
  {
    title: 'Generate & Create',
    description: 'Click generate and watch as AI brings your vision to life.',
  },
  {
    title: 'Download & Share',
    description: 'Save your creation and share it with the world.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Create amazing images in just a few simple steps
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-black px-4"
                >
                  <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ring-8 ring-black">
                    <span className="text-white font-medium">{index + 1}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <h3 className="text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 