// components/Sidebar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import axios from '@/apis/axios'
import { useAuth } from '@/context/AuthContext'

interface Chat {
  id: string
  createdAt: string
  name: string
}

export default function Sidebar({ hasNew }: { hasNew: boolean }) {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('id')
  const { user } = useAuth()
  // const codeId = searchParams.get('codeId')

  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)

  const fetchChats = async () => {
    try {
      const response = await axios.get<{
        data: Chat[]
      }>('/chat?page=1&limit=10')
      setChats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch chats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [hasNew])

  return (
    <aside
      className="md:w-94 w-64  bg-white  h-screen flex flex-col justify-between relative z-30"
      style={{ boxShadow: '0 17px 40px 4px #7090B01C' }}
    >
      <div className="md:p-4 p-2 overflow-y-auto">
        <Link
          href="/"
          className=" mt-5 mb-10 md:text-[26px] text-[22px] text-[#1B2559] font-[700] flex justify-between"
        >
          <h1>الكود السعودي الذكي</h1>
          <svg
            width={30}
            height={30}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke={'#000000'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{' '}
        </Link>

        <div className="mt-2 space-y-2">
          {loading && <>جار التحميل...</>}
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/chats?id=${chat.id}`}
              className={`block md:text-[18px] text-[16px] px-4 py-2 rounded hover:bg-primary hover:text-white ${
                chatId === chat.id ? 'bg-primary text-white' : ''
              }`}
            >
              {chat.name}
            </Link>
          ))}
        </div>
      </div>
      {user && (
        <div className="p-4 border-t border-gray-700 text-[16px] text-center">
          {user.name}
        </div>
      )}
    </aside>
  )
}
