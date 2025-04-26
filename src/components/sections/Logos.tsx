import Image from 'next/image'
import React from 'react'

function Logos() {
  return (
    <section className="py-12 px-6 container-padding">
      <h2 className="text-center text-[20px] font-[300] text-[#09384D] mb-12">
        مدعومة بواسطة
      </h2>

      <div className="flex flex-wrap justify-between gap-10 items-center">
        {['microsoft', 'paypal', 'google', 'chase', 'walmart'].map((logo) => (
          <Image
            key={logo}
            src={`/logos/${logo}.png`}
            alt={logo}
            width={130}
            height={40}
          />
        ))}
      </div>
    </section>
  )
}

export default Logos
