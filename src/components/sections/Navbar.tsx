'use client'
import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {
  const { logout, user } = useAuth()

  const route = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // useEffect(() => {
  //   if (localStorage) {
  //     const userLocal = localStorage.getItem('user')
  //     setUser(userLocal ? JSON.parse(userLocal) : null)
  //   }
  // }, [])

  if (route === '/chats') {
    return null
  }

  return (
    <nav className="absolute top-[30px] left-0 right-0 z-50 h-20">
      <div className="container-padding w-[100%] flex items-center justify-between">
        <div className="text-[30px] font-bold relative">
          <span className="text-primary relative top-[5px]">+Insured</span>
          <span className="bg-[#e25f57] w-[44px] h-[44px] rounded-[50%] absolute left-[-10px] z-[-1]"></span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex gap-3 items-center">
          <Link href="/chats" className="text-2xl text-primary">
            💬
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-2xl"
          >
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 text-[20px]">
          <li>
            <Link href="/">الرئيسية</Link>
          </li>
          <li>
            <Link href="/#codes">الأكواد</Link>
          </li>
          <li>
            <Link href="/about-us">من نحن</Link>
          </li>
          <li>
            <Link href="/#contact">تواصل</Link>
          </li>
        </ul>

        {/* User Actions - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 border px-6 py-2 rounded cursor-pointer"
              >
                <span>{user.name}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/chats"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                  >
                    دردشاتي
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsDropdownOpen(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="primary-theme-btn text-white rounded-full px-6 py-2 text-sm"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-md py-4 px-6">
            <ul className="flex flex-col gap-4 text-lg">
              <li>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/#codes" onClick={() => setIsMenuOpen(false)}>
                  الأكواد
                </Link>
              </li>
              <li>
                <Link href="/about-us" onClick={() => setIsMenuOpen(false)}>
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
                  تواصل{' '}
                </Link>
              </li>

              {/* Mobile User Actions */}
              {user ? (
                <>
                  <li className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span>{user.name}</span>
                      <button
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                        }}
                        className="text-sm bg-primary text-white px-3 py-1 rounded flex items-center gap-2"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <li className="pt-2 border-t">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="primary-theme-btn text-white rounded-full px-6 py-2 text-sm inline-block"
                  >
                    تسجيل الدخول
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
