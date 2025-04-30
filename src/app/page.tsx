import CodesCards from '@/components/sections/CodesCards'
import Footer from '@/components/sections/Footer'
import HeroSection from '@/components/sections/HeroSection'
import Logos from '@/components/sections/Logos'
// import Newsletter from '@/components/sections/Newsletter'
import Testimonials from '@/components/sections/Testimonials'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="bg-gradient-to-br from-[#f5fef9] to-[#e7ffe0] text-gray-800">
      <HeroSection />

      {/* Input Box */}
      <section className="bg-white shadow-lg rounded-xl px-4 py-6 mx-6 md:mx-20 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="ادخل الاسم من فضلك"
            className="flex-1 border border-gray-200 px-4 py-2 rounded-md"
          />
          <input
            type="email"
            placeholder="ادخل البريد من فضلك"
            className="flex-1 border border-gray-200 px-4 py-2 rounded-md"
          />
          <input
            type="tel"
            placeholder="ادخل رقم الهاتف من فضلك"
            className="flex-1 border border-gray-200 px-4 py-2 text-right rounded-md"
          />
          <Link
            href="#codes"
            className="gradient-btn  px-[20px] py-4 h-[54px] w-[192px] text-center rounded-[45px] text-white"
          >
            استعرض الكتب
          </Link>
        </div>
      </section>

      <Logos />
      <CodesCards />
      <Testimonials />
      {/* <Newsletter /> */}
      <Footer />
    </main>
  )
}
