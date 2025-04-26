'use client'

import { AuthProvider } from '@/context/AuthContext'
import theme from '@/lib/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useEffect, useState } from 'react'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  // Use effect to check if the component is mounted on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Render only when on the client side
  if (!isClient) {
    return <>{children}</>
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
