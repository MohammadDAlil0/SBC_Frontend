'use client'

import { Suspense } from 'react'
import ResetPasswordPage from './ResetPasswordPage'

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<div>جار التحميل...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}
