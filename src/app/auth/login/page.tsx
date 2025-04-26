'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import { TextField } from '@mui/material'

export default function LoginPage() {
  const { login, loading, error } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password)
  }

  return (
    <div className="grid md:grid-cols-2 md:mt-0 mt-20 min-h-screen gap-8">
      <div className="container-padding flex flex-col justify-center">
        <div className="container-padding">
          <h1 className="text-2xl font-bold mb-4">تسجيل الدخول</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="mt-4">
              <TextField
                label="البريد الإلكتروني"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
            <div>
              <TextField
                label="كلمة المرور"
                variant="outlined"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-2 rounded disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'جار تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
          <div className="mt-4 space-y-2">
            <Link href="/auth/forgot-password" className="block text-primary">
              نسيت كلمة المرور؟
            </Link>
            <Link
              href="/auth/signup"
              className="block text-center bg-black hover:bg-black-500 text-white p-2"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          height: '100%',
          width: '100%',
          background: '#F4FFFC',
          position: 'relative',
        }}
      >
        <Image
          src="/saudi-map-code.png"
          alt="Saudi Code Map"
          fill
          objectFit="contain"
        />
      </div>
    </div>
  )
}
