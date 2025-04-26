'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { ForgetPasswordFormData, forgetPasswordSchema } from '@/lib/validations'

export default function ForgetPasswordPage() {
  const { forgetPassword, loading, error, successReset } = useAuth()
  const [email, setEmail] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  })

  const onSubmit = async (data: ForgetPasswordFormData) => {
    setEmail(data.email)
    await forgetPassword(data.email)
  }

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col justify-center min-h-screen">
      {successReset ? (
        <>
          <h1 className="text-2xl font-bold mb-4">تم ارسال الايميل لك</h1>
          <p className="mb-4">
            تأكد من صندوق البريد في ايميلك حيث تم ارسال رسالة لاستعادة كلمة
            المرور
          </p>
          <button
            type="submit"
            onClick={() => onSubmit({ email })}
            disabled={loading}
            className="lg:w-1/3 bg-primary text-white p-2 rounded disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'جار الارسال' : 'إعادة إرسال الايميل'}
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">استعادة كلمة المرور</h1>
          <p className="mb-4">ادخل ايميلك لاستعادة كلمة المرور</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <TextField
                label="البريد الإلكتروني"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-1/3 bg-primary text-white p-2 rounded disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'جار الارسال' : 'التالي'}
            </button>
          </form>
        </>
      )}
      <Link
        href="/auth/login"
        className="block text-center bg-black hover:bg-black-500 text-white p-2 mt-10"
      >
        العودة لتسجيل الدخول
      </Link>
    </div>
  )
}
