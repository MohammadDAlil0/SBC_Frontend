'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { TextField } from '@mui/material'
import { ResetPasswordFormData, resetPasswordSchema } from '@/lib/validations'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { resetPassword, loading, error } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const onSubmit = async (data: ResetPasswordFormData) => {
    if (token) await resetPassword(data, token)
  }
  return (
    <div className="max-w-md mx-auto p-4 flex flex-col justify-center min-h-screen">
      <>
        <h1 className="text-2xl font-bold mb-4">تعيين كلمة المرور</h1>
        <p className="mb-4">اكتب كلمة المرور الجديدة</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <TextField
              label="كلمة المرور الجديدة"
              variant="outlined"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>
          <div>
            <TextField
              label="تأكيد كلمة المرور"
              variant="outlined"
              fullWidth
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-1/3 bg-primary text-white p-2 rounded disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'جار التعيين' : 'تعيين'}
          </button>
        </form>
      </>
      <Link
        href="/auth/login"
        className="block text-center bg-black hover:bg-black-500 text-white p-2 mt-10"
      >
        العودة لتسجيل الدخول
      </Link>
    </div>
  )
}
