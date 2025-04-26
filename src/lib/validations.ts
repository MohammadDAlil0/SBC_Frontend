import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('البريد الالكتروني غير صالح'),
  password: z.string().min(6, 'يجب أن تكون على الأقل 8 محارف'),
})

export const forgetPasswordSchema = z.object({
  email: z.string().email('البريد الالكتروني غير صالح'),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'يجب أن تكون على الأقل 8 محارف'),
    confirmPassword: z.string().min(8, 'يجب أن تكون على الأقل 8 محارف'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمة المرور غير متطابقة',
    path: ['confirmPassword'], // This will attach the error to confirmPassword field
  })

export type LoginFormData = z.infer<typeof loginSchema>
// export type SignupFormData = z.infer<typeof signupSchema>
export type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
