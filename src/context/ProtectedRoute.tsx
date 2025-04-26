'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/components/ui/loading'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading, user } = useAuth()
  const router = useRouter()
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      console.log(user)
      router.push('/auth/login')
      setHasRedirected(true) // Prevent multiple redirects
    }
  }, [user, loading, router, hasRedirected])

  // Show loading spinner until auth check is completed
  if (loading || !user) {
    return <LoadingSpinner /> // You can replace this with a better loading spinner
  }

  return <>{children}</>
}
