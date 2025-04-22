'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-black/50 backdrop-blur-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            ImgAI
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Text to Image
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Image to Image
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <Link 
                href="/dashboard" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 