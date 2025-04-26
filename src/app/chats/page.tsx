import Chat from '@/components/sections/ChatMain'
import Sidebar from '@/components/sections/ChatSidebar'
import ProtectedRoute from '@/context/ProtectedRoute'

export default function ChatsPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <div className="flex flex-col flex-1">
          <Chat />
        </div>
        <div className="md:block hidden">
          <Sidebar />
        </div>
      </div>
    </ProtectedRoute>
  )
}
