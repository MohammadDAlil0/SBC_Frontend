/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function HeroSection() {
  return (
    <section className="container- py-20 px-6 md:px-20 relative md:h-[1000px] h-[800px]">
      <div className="md:mt-[5%] mt-[15%] absolute z-1 lg:right-70 md:right-50 md:text-center text-right space-y-6">
        <h1 className="leading-relaxed ">
          <span
            className="text-primary lg:text-[94px] md:text-[74px] text-[54px] font-[900]"
            style={{ lineHeight: '171%' }}
          >
            الـكـود السعودي
          </span>
          <br />
          <span
            className="text-primary lg:text-[64px] md:text-[44px] text-[34px] font-[500]"
            style={{ lineHeight: '171%' }}
          >
            للمنشأت الخرسانية{' '}
          </span>
        </h1>
        <Link
          href="#codes"
          className="primary-theme-btn text-white rounded-full px-6 py-2 md:text-[24px] text-[20px] cursor-pointer"
        >
          استعرض المزيد
        </Link>
      </div>
      <div className="grid md:grid-cols-2 h-[100%]">
        <div className="md:block hidden"></div>
        <div className="relative h-[100%] ">
          <Image
            src="/saudi-map-code.png"
            alt="Saudi Code Map"
            fill
            objectFit="contain"
          />
        </div>
      </div>
      <img
        src={'/Frame 7.svg'}
        style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 0 }}
        alt=""
      />
    </section>
  )
}

export default HeroSection
