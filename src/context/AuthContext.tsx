/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { authApis } from '@/apis/auth/handlers'
import axios from 'axios'
import { SignUpFormData } from '@/app/auth/signup/Form'
import { ResetPasswordFormData } from '@/lib/validations'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  successReset: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignUpFormData) => Promise<void>
  resetPassword: (data: ResetPasswordFormData, token: string) => Promise<void>
  forgetPassword: (email: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successReset, setSuccess] = useState(false)

  const router = useRouter()

  const handleLoginSuccess = () => {
    const lastPage = localStorage.getItem('lastPage') || '/'
    // console.log(lastPage)
    router.push(lastPage)
    // if (hasHistory) {
    //   router.back()
    // }
    // // Fallback to dashboard
    // else {
    //   router.push('/')
    // }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    // Perform API check for user authentication
    const checkAuth = async () => {
      try {
        const { data } = await authApis.getMe()
        const user = {
          id: data.id,
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
        }

        setUser(user)
      } catch (err) {
        console.log('Auth check failed:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    if (storedToken) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await authApis.login({ email, password })
      const user = {
        id: data.id,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
      }
      setUser(user)
      localStorage.setItem('token', data.access_token)

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.access_token}`

      handleLoginSuccess()
    } catch (err: any) {
      setError(err.response?.data?.message || 'فشل تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (body: SignUpFormData) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await authApis.signup(body)
      const user = {
        id: data.id,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
      }
      setUser(user)

      localStorage.setItem('token', data.access_token)

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.access_token}`

      handleLoginSuccess()
    } catch (err: any) {
      setError(err.response?.data?.message || 'فشل إنشاء حساب جديد')
    } finally {
      setLoading(false)
    }
  }

  const forgetPassword = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      await authApis.forgetPassword({ email })
      // router.push('/auth/login')
      setSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'فشل إعادة تعيين كلمة المرور')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (data: ResetPasswordFormData, token: string) => {
    setLoading(true)
    setError(null)
    try {
      await authApis.resetPassword({ password: data.password }, token)
      router.push('/auth/login')
      setSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'فشل إعادة تعيين كلمة المرور')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    router.push('/auth/login')
    location.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        successReset,
        login,
        signup,
        resetPassword,
        logout,
        forgetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
