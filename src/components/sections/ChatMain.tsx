/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from '@/apis/axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import ChatInput from './ChatInput'
import Sidebar from './ChatSidebar'
import { CircularProgress } from '@mui/material'

interface Message {
  id: string // Ensure it's a string to match API response
  fromUser: boolean
  content: string
}

export default function Chat({
  setHasNew,
  hasNew,
}: {
  setHasNew: () => void
  hasNew: boolean
}) {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('id')
  const codeId = searchParams.get('codeId')
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [page, setPage] = useState(0)
  const limit = 100

  const messagesEndRef = useRef<HTMLDivElement | null>(null) // Ref for auto-scrolling
  const loadingRef = useRef(false) // Ref to track loading state

  // Reset messages when chatId changes
  useEffect(() => {
    if (chatId) {
      setMessages([]) // Clear messages on chat change
      setPage(0) // Reset pagination to the first page
      // setHasMore(true) // Reset pagination state
      loadMessages() // Load messages for the new chat
    }
  }, [chatId])

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = async () => {
    if (loadingRef.current) return // Prevent duplicate requests if already loading

    loadingRef.current = true // Mark as loading

    try {
      const res = await axios.get(`/chat/${chatId}`, {
        params: { limit, page },
      })
      const newMessages: Message[] = res.data.data.reverse()

      setMessages((prev) => [...newMessages, ...prev]) // Append messages in the correct order
    } catch (err) {
      console.error('Error fetching messages:', err)
    } finally {
      loadingRef.current = false // Mark as finished loading
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isSending || !chatId) return

    setIsSending(true)
    if (chatId) {
      try {
        const tempMessage: Message = {
          // id: `temp-${Date.now()}`,
          id: '',
          fromUser: true,
          content: input,
        }

        // Optimistic update
        setMessages((prev) => [...prev, tempMessage])

        const res = await axios.post(`/chat/${chatId}/ask`, {
          content: input,
        })

        const botReply: Message = res.data.data.answer

        // Replace temp message if needed
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempMessage.id),
          tempMessage,
          botReply,
        ])

        console.log((prev: any) => [
          ...prev.filter((m: any) => m.id !== tempMessage.id),
          tempMessage,
          botReply,
        ])
      } catch (err) {
        console.error('Error sending message:', err)
      }
    } else {
      const res = await axios.post('chat/' + codeId)

      const chatId = res.data.data.id
      const resChat = await axios.post('chat/' + chatId + '/ask', {
        content: input,
      })
      router.push(`/chats?id=${chatId}`)

      console.log(resChat)
    }
    setInput('')
    setIsSending(false)
  }

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="md:hidden block ">
        <div
          className="fixed left-0 top-0 px-6 py-3 w-[100%] flex justify-between items-center  bg-white shadow "
          onClick={() => setOpen(true)}
        >
          <Link href="/" className="text-[20px] font-bold relative">
            <span className="text-primary relative top-[0px]">+Insured</span>
            <span className="bg-[#e25f57] w-[24px] h-[24px] rounded-[50%] absolute left-[-10px] z-[-1]"></span>
          </Link>
          <div className="text-black">{'☰'}</div>
        </div>
        <div
          className={`absolute z-50  w-[100%] left-0 right-0 top-0 transition-all ${
            open ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
        >
          <div
            onClick={() => setOpen(false)}
            className="absolute z-30 w-[100%] h-[100%] bg-[rgba(0,0,0,0.3)] left-0 right-0 top-0"
          ></div>
          <Sidebar hasNew={hasNew} />
        </div>
      </div>

      <div
        className="flex flex-col flex-1 overflow-y-auto md:p-20 md:pb-2 pt-20 p-6 pb-6"
        style={{ height: 'calc(100vh - 110px)' }}
      >
        {!chatId && !codeId && (
          <div className="h-[100%] w-[100%] text-center flex items-center justify-center">
            <div>
              اختر أحد الأكواد ثم اكتب رسالتك للاستفسار{' '}
              <Link href="/#codes" className="underline text-primary mx-0.5">
                (اختر كود)
              </Link>{' '}
              أو حدد محادثة سابقة
            </div>
          </div>
        )}

        {/* {hasMore && (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="mb-4 text-sm text-primary"
          >
            تحميل المزيد
          </button>
        )} */}

        <div className="flex-1 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${msg.fromUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.fromUser
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* This element ensures auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {codeId ? (
        <ChatInput setHasNew={setHasNew} />
      ) : (
        <div className=" bottom-0 z-30 relative  md:px-20 px-1 py-4 ">
          <div className="flex items-center gap-2 px-4 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="أريد إرسال رسالة"
              className="flex-1 bg-transparent text-black focus:outline-none border px-[20px] py-4 rounded-[45px]"
              disabled={isSending}
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              className="relative ml-2 px-[20px] py-4 h-[54px] md:w-[192px] text-center rounded-[45px] gradient-btn cursor-pointer text-white disabled:opacity-60"
            >
              إرسال
              {isSending ? (
                <div className="absolute top-5 left-1/2 right-1/2">
                  <CircularProgress size={20} />
                </div>
              ) : null}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
