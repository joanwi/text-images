'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What type of images can I create with ImgAI?",
    answer: "You can create virtually any type of image using our text-to-image feature, from landscapes and portraits to abstract art and product visualizations. You can also transform existing images using our image-to-image feature."
  },
  {
    question: "How accurate is the AI in interpreting my prompts?",
    answer: "Our AI model has been trained on a vast dataset and can understand complex descriptions. The more detailed and specific your prompt is, the better the results will be. We recommend experimenting with different prompts to find what works best for your needs."
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "Yes, you have full rights to use the images generated through ImgAI for both personal and commercial purposes. However, please ensure you comply with our terms of service and don't generate content that violates copyright or other legal restrictions."
  },
  {
    question: "What image formats are supported?",
    answer: "We support most common image formats including PNG, JPEG, and WebP for both input and output. Generated images can be downloaded in your preferred format."
  },
  {
    question: "Is there a limit to how many images I can generate?",
    answer: "The number of images you can generate depends on your subscription plan. Free users have a monthly limit, while premium users enjoy higher or unlimited generation capabilities."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Everything you need to know about ImgAI
          </p>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mt-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left px-4 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 