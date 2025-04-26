import PDFPreviewPage from '@/components/sections/PDFPreviewPage'
import { books } from '@/constants/books'

export const revalidate = 1

export default async function CodeDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <>
      <PDFPreviewPage
        codeId={slug}
        fileId={books.filter((item) => item.id === slug)[0].fileURL}
      />
    </>
  )
}
