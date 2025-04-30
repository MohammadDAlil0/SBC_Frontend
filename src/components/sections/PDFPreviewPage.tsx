'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/constants/domains'

const PDFViewer = dynamic(() => import('./PDFViewer'), { ssr: false })

export default function PDFPreviewPage() {
  const [url, setUrl] = useState('')
  const searchParams = useSearchParams()
  const collectionName = searchParams.get('collectionName')
  const codeId = searchParams.get('codeId')

  useEffect(() => {
    setUrl(`${API_BASE_URL}book/${collectionName}.pdf`)
  }, [collectionName])

  return (
    <div className="relative top-[100px]">
      <PDFViewer fileUrl={url} />

      <Link
        href={`/chats?codeId=${codeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-btn fixed bottom-1 left-4 transform -translate-y-1/2  text-white px-[20px] py-4 h-[54px] w-[192px] text-center rounded-[45px] shadow-lg  transition-all"
      >
        استفسار
      </Link>
    </div>
  )
}
