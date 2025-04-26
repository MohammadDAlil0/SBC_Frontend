import Link from 'next/link'
import Image from 'next/image'
import SignUpPage from './Form'

export default function SignupPage() {
  return (
    <div className="grid md:grid-cols-2 md:mt-0 mt-30 min-h-screen gap-8">
      <div className="container-padding flex flex-col justify-center">
        <div className="container-padding">
          <h1 className="text-2xl font-bold mb-4">تسجيل حساب جديد</h1>
          <SignUpPage />

          <Link
            href="/auth/login"
            className="mt-4 block text-center bg-black hover:bg-black-500 text-white p-2"
          >
            العودة لصفحة تسجيل الدخول{' '}
          </Link>
        </div>
      </div>
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
        className="bg-primary"
      >
        <Image
          src="/saudi-map-code-light.png"
          alt="Saudi Code Map"
          fill
          objectFit="contain"
        />
      </div>
    </div>
  )
}
