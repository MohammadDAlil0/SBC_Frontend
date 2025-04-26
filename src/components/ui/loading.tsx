'use client'

import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

export default function LoadingSpinner() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true) // Ensure this is rendered only on the client side
  }, [])

  if (!isClient) {
    return null // Return nothing during server-side rendering
  }

  return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
}
