'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    content: "ImgAI has revolutionized how I create visual content. The AI's understanding of my prompts is incredible.",
    author: "Sarah Johnson",
    role: "Digital Artist"
  },
  {
    content: "The image transformation feature saved me hours of manual editing. The results are simply stunning.",
    author: "Michael Chen",
    role: "Graphic Designer"
  },
  {
    content: "As a content creator, ImgAI has become an essential tool in my creative process. It's fast, intuitive, and powerful.",
    author: "Emma Davis",
    role: "Content Creator"
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Join thousands of satisfied creators using ImgAI
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-4 h-8 w-8 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-lg text-gray-300">{testimonial.content}</p>
              </div>
              <div className="mt-6">
                <p className="font-medium text-white">{testimonial.author}</p>
                <p className="mt-1 text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 