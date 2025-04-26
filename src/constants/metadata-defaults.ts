import { metadataBase } from '@/constants/domains'
import { Metadata } from 'next'

export const DefaultAppMetadata = {
  metadataBase: new URL(metadataBase),
  title: 'SBC',
  description: '',
  keywords: '',
  icons: {
    icon: ['/assets/img/favicon.png'],
    apple: ['/assets/img/favicon.png'],
    shortcut: ['/assets/img/favicon.png'],
  },
  // Twitter Card data
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    images: [
      {
        url: `${metadataBase}/uploads/Asset_16_2x_30d671b803.png`,
        type: 'image/png',
        alt: '',
      },
    ],
  },
  //  Open Graph data
  openGraph: {
    title: '',
    description: '',
    url: '/',
    siteName: 'SBC',
    type: 'website',
    images: [
      {
        url: `${metadataBase}/uploads/Asset_16_2x_30d671b803.png`,
        secureUrl: `${metadataBase}/uploads/Asset_16_2x_30d671b803.png`,
        type: 'image/svg',
        alt: '',
      },
    ],
  },
  other: {
    'fb:admins': '100063456223406',
  },
} satisfies Metadata
