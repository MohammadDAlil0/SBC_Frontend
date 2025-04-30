// components/ChatInput.tsx
'use client'

import axios from '@/apis/axios'
import { CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ChatInput({ setHasNew }: { setHasNew: () => void }) {
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const router = useRouter()

  const searchParams = useSearchParams()
  const codeId = searchParams.get('codeId')

  const handleSend = async () => {
    if (!input.trim()) return
    try {
      setIsSending(true)
      const res = await axios.post('chat/' + codeId)

      const chatId = res.data.data.id
      await axios.post('chat/' + chatId + '/ask', {
        content: input,
      })
      setHasNew()
      router.push(`/chats?id=${chatId}`)
    } catch (err) {
      setIsSending(false)
      console.error(err)
    }
    setInput('')
  }

  return (
    <>
      <div className="relative bottom-0 z-[40]  md:px-20 px-0 py-4">
        <div className="flex items-center gap-2 px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="أريد إرسال رسالة"
            className="flex-1 bg-transparent text-black focus:outline-none border px-[20px] py-4 rounded-[45px]"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-[20px] py-4 h-[54px] md:w-[192px] text-center rounded-[45px] gradient-btn cursor-pointer text-white"
          >
            {isSending ? 'جاري الإرسال...' : 'إرسال'}
          </button>
        </div>
      </div>

      {isSending && (
        <div className="fixed top-0 left-0 right-0 bg-[rgba(0,0,0,.3)] w-[100%] h-[100%] flex items-center justify-center z-50">
          <CircularProgress />
        </div>
      )}
    </>
  )
}
