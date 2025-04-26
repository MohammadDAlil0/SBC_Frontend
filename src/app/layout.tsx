import { Tajawal } from '../../public/fonts'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/sections/Navbar'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'المهندس الذكي للكود السعودي',
  description: 'SBC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${Tajawal.variable}`}>
        {/* <main className="bg-gradient-to-br from-[#f5fef9] to-[#e7ffe0] text-gray-800"> */}
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
