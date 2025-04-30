import PDFPreviewPage from '@/components/sections/PDFPreviewPage'
import { Suspense } from 'react'

export default async function CodeDetailsPage() {
  // if (!codeId || !collectionName) {
  //   return <div>Missing required parameters</div>
  // }

  return (
    <Suspense fallback={<div>جار التحميل...</div>}>
      <PDFPreviewPage />
    </Suspense>
  )
}
