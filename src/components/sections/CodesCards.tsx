import { books } from '@/constants/books'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CodesCards() {
  return (
    <section className="bg-white py-16 " id="codes">
      <div className="container-padding px-6 md:px-[130px] ">
        <div className="md:text-[24px] text-[20px] grid lg:grid-cols-2 gap-1 space-y-4 mb-12">
          <div>
            <h2 className="font-[800]">خبراء الكود الذكي على حسب الفئات</h2>
            <p className="text-[#09384D] font-[500] mt-2">
              يتميز خبراء الكود بتخصصهم في مختلف الفئات.
            </p>
          </div>
          <div>
            <p className="text-[#09384D] font-[500]">
              حيث يضمن كل خبير تقديم حلول تقنية متكاملة تتوافق مع أعلى معايير
              الجودة والسلامة.{' '}
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3">
          {books.map((item, idx) => (
            <Link
              href={`/code/${item.id}`}
              key={idx}
              className="group border px-10 pt-10   transition-all hover:bg-primary hover:text-white"
            >
              <h3 className="md:text-[20px] text-[16px]  font-[700] mb-2">
                {item.title}
              </h3>
              <p className="md:text-[20px] text-[16px]  mb-10  text-[#828282] group-hover:text-white">
                {item.desc}
              </p>
              <div className="relative w-[100%] h-[200px]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  objectFit="contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CodesCards
