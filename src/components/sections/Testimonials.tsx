import React from 'react'

function Testimonials() {
  return (
    <section className="bg-radial to-primary  from-secondary py-16 px-6 container-padding text-white">
      <h2 className="text-center md:text-[40px] text-[28px] font-[800] mb-12">
        اتـرك تعليقـاً
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white text-gray-800 p-4 rounded-xl shadow"
          >
            <p className="text-sm mb-2">
              Ive had the pleasure of working with this insurance company...
            </p>
            <div className="flex gap-2 items-center mt-4">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm font-bold">User Name</p>
                <p className="text-xs text-gray-500">Company</p>
              </div>
            </div>
            <div className="mt-2 text-yellow-400">★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
