'use client'

import { motion } from 'framer-motion'
import { SparklesIcon, ArrowPathIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Text to Image Generation',
    description: 'Transform your text descriptions into stunning, high-quality images using advanced AI technology.',
    icon: SparklesIcon,
  },
  {
    name: 'Image Transformation',
    description: 'Upload existing images and transform them using AI-powered editing tools and style transfer.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Secure & Private',
    description: 'Your data and creations are protected with enterprise-grade security and privacy measures.',
    icon: ShieldCheckIcon,
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Why Choose ImgAI?
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Powerful features to bring your imagination to life
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-medium text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 