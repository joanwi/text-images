import Generator from '@/components/Generator'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main>
      {/* hero section */}
      <section className='bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4'>
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Transform Your Ideas Into Images with AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create stunning images from text descriptions or transform existing images using our advanced AI technology.
          </p>
        </div>
      </section>
      
      <Generator />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  )
} 