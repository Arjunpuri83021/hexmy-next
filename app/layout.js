import './globals.css'
import { Inter } from 'next/font/google'
import AppFrame from './components/AppFrame'
import Script from "next/script"

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
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) { return; }
    }
    k=e.createElement(t),
    a=e.getElementsByTagName(t)[0],
    k.async=1,
    k.src=r,
    a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109395170', 'ym');

ym(109395170, 'init', {
    ssr:true,
    webvisor:true,
    clickmap:true,
    ecommerce:"dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce:true,
    trackLinks:true
});
`}
        </Script>
        <AppFrame>
          {children}
        </AppFrame>
      </body>
    </html>
  )
}
