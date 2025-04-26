import Link from 'next/link'
import PDFViewer from './PDFViewer'

export default function PDFPreviewPage({
  codeId,
  fileId,
}: {
  codeId: string
  fileId: string
}) {
  const original = `https://drive.google.com/uc?export=download&id=${fileId}`
  // 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf'
  const proxyUrl = `/api/pdf?url=${encodeURIComponent(original)}`

  return (
    <div className="relative top-[100px]">
      <PDFViewer url={proxyUrl} />

      <Link
        href={`/chats?codeId=${codeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-btn fixed bottom-1 left-4 transform -translate-y-1/2  text-white px-[20px] py-4 h-[54px] w-[192px] text-center rounded-[45px] shadow-lg  transition-all"
      >
        استفسار
      </Link>
    </div>
  )
}
