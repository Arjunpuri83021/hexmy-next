import './globals.css'
import { Inter } from 'next/font/google'
import AppFrame from './components/AppFrame'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Hexmy - Premium Adult Entertainment Videos',
    template: '%s | Hexmy'
  },
  description: 'Watch premium adult entertainment videos featuring top stars and categories. High quality content updated daily.',
  keywords: 'adult videos, premium content, entertainment, streaming',
  authors: [{ name: 'Hexmy' }],
  creator: 'Hexmy',
  publisher: 'Hexmy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hexmy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hexmy.com',
    siteName: 'Hexmy',
    title: 'Hexmy - Premium Adult Entertainment Videos',
    description: 'Watch premium adult entertainment videos featuring top stars and categories. High quality content updated daily.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hexmy - Premium Adult Entertainment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hexmy - Premium Adult Entertainment Videos',
    description: 'Watch premium adult entertainment videos featuring top stars and categories. High quality content updated daily.',
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
    google: 'mCwmvJm_aIpaaXKbGYE35hWFSsZeSMlv7e_qLy8-Tns',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="shortcut icon" href="/icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Bootstrap Icons for admin action buttons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body className={inter.className}>
        <AppFrame>
          {children}
        </AppFrame>
      </body>
    </html>
  )
}
