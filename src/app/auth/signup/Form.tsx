'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Autocomplete, TextField } from '@mui/material'
import CountrySelect from '@/components/ui/CountrySelect'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'

const signUpSchema = z.object({
  firstName: z.string().min(2, 'يجب أن يكون الاسم على الأقل حرفين'),
  lastName: z.string().min(2, 'يجب أن يكون الاسم على الأقل حرفين'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  company: z.string().min(2, 'يجب إدخال اسم الشركة'),
  country: z.string().min(1, 'يجب اختيار البلد'),
  timezone: z.string().min(1, 'يجب اختيار المنطقة الزمنية (GTM)'),
  phone: z.string().min(10, 'رقم الهاتف يجب أن يكون على الأقل 10 أرقام'),
  password: z.string().min(8, 'يجب أن يكون الاسم على الأقل 8 حروف'),
  confirmPassword: z.string(),
})

export type SignUpFormData = z.infer<typeof signUpSchema>

const gmtTimeZones = [
  { value: 'GMT+3', label: 'توقيت السعودية (GMT+3)' },
  { value: 'GMT+4', label: 'توقيت الإمارات (GMT+4)' },
  { value: 'GMT+3', label: 'توقيت الكويت (GMT+3)' },
  { value: 'GMT+3', label: 'توقيت قطر (GMT+3)' },
  { value: 'GMT+3', label: 'توقيت البحرين (GMT+3)' },
  { value: 'GMT+2', label: 'توقيت مصر (GMT+2)' },
  { value: 'GMT+1', label: 'توقيت بريطانيا (GMT+1)' },
  { value: 'GMT+2', label: 'توقيت أوروبا (GMT+2)' },
  { value: 'GMT-4', label: 'توقيت نيويورك (GMT-4)' },
  { value: 'GMT+9', label: 'توقيت طوكيو (GMT+9)' },
]

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const { signup, loading, error } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  // const selectedCountry = watch('country')
  const selectedGtm = watch('timezone')

  const onSubmit = async (data: SignUpFormData) => {
    await signup(data)
  }

  if (!mounted) {
    return null
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid md:grid-cols-2 gap-2">
        <TextField
          label="الاسم الأول"
          variant="outlined"
          fullWidth
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="اسم الماثلة"
          variant="outlined"
          fullWidth
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </div>

      {/* Email Input */}
      <TextField
        label="البريد الإلكتروني"
        variant="outlined"
        fullWidth
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <div className="grid md:grid-cols-2 gap-2">
        {/* Company Input */}
        <TextField
          label="الشركة"
          variant="outlined"
          fullWidth
          {...register('company')}
          error={!!errors.company}
          helperText={errors.company?.message}
        />

        <Autocomplete
          options={gmtTimeZones}
          getOptionLabel={(option) => option.label}
          value={gmtTimeZones.find((tz) => tz.value === selectedGtm) || null}
          onChange={(_, newValue) =>
            setValue('timezone', newValue?.value || '')
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="المنطقة الزمنية (GTM)"
              variant="outlined"
              error={!!errors.timezone}
              helperText={errors.timezone?.message}
            />
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        {/* Phone Input */}
        <TextField
          label="الهاتف"
          variant="outlined"
          fullWidth
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        {/* Country Select */}
        <CountrySelect
          // value={selectedCountry}
          onChange={(value) => {
            console.log(value)
            setValue('country', value.label)
          }}
          error={!!errors.country}
          helperText={errors.country?.message}
        />
      </div>

      <TextField
        label="كلمة المرور"
        variant="outlined"
        fullWidth
        {...register('password')}
        onChange={(e) => setValue('confirmPassword', e.target.value)}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'يتم إنشاء الحساب...' : 'تسجيل'}
      </button>
    </form>
  )
}
