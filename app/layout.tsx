import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LegitExchange - Revolutionizing Real Estate in Nigeria',
  description: 'Connect directly with property owners and buyers in Jos, Plateau State, and across Nigeria. Only 5% transaction fee vs traditional 10% realtor fees.',
  keywords: 'real estate, nigeria, jos, plateau state, property, lawyers, buy property, sell property',
  authors: [{ name: 'LegitExchange Team' }],
  creator: 'LegitExchange',
  publisher: 'LegitExchange',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://legitexchange.ng'),
  openGraph: {
    title: 'LegitExchange - Revolutionizing Real Estate in Nigeria',
    description: 'Connect directly with property owners and buyers. Only 5% transaction fee vs traditional 10% realtor fees.',
    url: 'https://legitexchange.ng',
    siteName: 'LegitExchange',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LegitExchange - Real Estate Platform',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LegitExchange - Revolutionizing Real Estate in Nigeria',
    description: 'Connect directly with property owners and buyers. Only 5% transaction fee vs traditional 10% realtor fees.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
