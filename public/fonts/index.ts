import localFont from 'next/font/local'

export const Tajawal = localFont({
  src: [
    {
      path: '../../public/fonts/Tajawal-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Tajawal-Medium.ttf',
      weight: '500',
      style: 'bold',
    },
  ],
  variable: '--body-font',
})
