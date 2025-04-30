'use client'
import Chat from '@/components/sections/ChatMain'
import Sidebar from '@/components/sections/ChatSidebar'
import ProtectedRoute from '@/context/ProtectedRoute'
import { useState } from 'react'

export default function ChatsPage() {
  const [hasNew, setHasNew] = useState(true)

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <div className="flex flex-col flex-1">
          <Chat setHasNew={() => setHasNew(!hasNew)} hasNew={hasNew} />
        </div>
        <div className="md:block hidden">
          <Sidebar hasNew={hasNew} />
        </div>
      </div>
    </ProtectedRoute>
  )
}
