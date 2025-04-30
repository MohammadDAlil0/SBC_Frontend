'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { codeApis } from '@/apis/code/handlers'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export type TBook = {
  id: string
  name: string
  description: string
  collectionName: string
}
function CodesCards() {
  const [books, setBooks] = useState<TBook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await codeApis.getAll()
        console.log(response)
        setBooks(response.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) {
    return <div>جار التحميل...</div>
  }

  if (error) {
    return <div>حدث خطأ: {error}</div>
  }

  console.log(books)
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
          {books.slice(0).map((item, idx) => (
            <Link
              href={`/code?codeId=${item.id}&collectionName=${item.collectionName}`}
              key={idx}
              className="group border px-10 pt-10   transition-all hover:bg-primary hover:text-white"
            >
              <h3 className="md:text-[20px] text-[16px]  font-[700] mb-2">
                {item.name}
              </h3>
              <p className="md:text-[20px] text-[16px]  mb-10  text-[#828282] group-hover:text-white">
                {item.description}
              </p>
              <div className="relative w-[100%] h-[200px]">
                <Image
                  src={`/${item.collectionName}.png`}
                  alt={item.name}
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
