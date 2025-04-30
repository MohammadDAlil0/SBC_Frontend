'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useMemo, useState } from 'react'
import LoadingSpinner from '@/components/ui/loading'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [hasRedirected, setHasRedirected] = useState(false)
  const searchParams = useSearchParams()

  // Combine pathname and search params into full URL
  const fullPath = useMemo(() => {
    const queryString = searchParams.toString()
    return queryString ? `${pathname}?${queryString}` : pathname
  }, [pathname, searchParams])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('lastPage', fullPath)
      router.push('/auth/login')
      setHasRedirected(true) // Prevent multiple redirects
    } else {
      localStorage.setItem('lastPage', '')
    }
  }, [user, loading, router, hasRedirected, fullPath])

  // Show loading spinner until auth check is completed
  if (loading || !user) {
    return <LoadingSpinner /> // You can replace this with a better loading spinner
  }

  return <>{children}</>
}
