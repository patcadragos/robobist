import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Robobist',
  url: 'https://robobist.com',
  logo: 'https://robobist.com/ROBOBIST/logo-negru.png',
  description: 'Autonomous pallet truck manufacturer and distributor for European warehouse automation.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@robobist.com',
    contactType: 'sales',
    areaServed: 'EU',
  },
}

export const metadata: Metadata = {
  title: {
    default: 'Robobist | Autonomous Pallet Robotics for Warehouses',
    template: '%s | Robobist',
  },
  description: 'Robobist delivers autonomous pallet trucks for warehouse automation — no infrastructure changes, 1,000 kg payload, AI SLAM navigation, CE certified. Serving Europe.',
  keywords: [
    'autonomous pallet truck', 'warehouse robotics', 'autonomous mobile robot', 'AMR warehouse',
    'SLAM navigation robot', 'warehouse automation Europe', 'pallet robot', 'AGV pallet truck',
    'Robobist RPT-1000', 'autonomous forklift', 'warehouse robot CE certified', 'intralogistics robot',
    'autonomous pallet jack', 'smart warehouse', 'robot de paleti', 'automatizare depozit',
  ],
  authors: [{ name: 'Robobist' }],
  creator: 'Robobist',
  publisher: 'Robobist',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  icons: [
    { rel: 'icon', url: '/ROBOBIST/favicon-negru.png', media: '(prefers-color-scheme: light)' },
    { rel: 'icon', url: '/ROBOBIST/favicon-alb.png', media: '(prefers-color-scheme: dark)' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://robobist.com',
    siteName: 'Robobist',
    title: 'Robobist | Autonomous Pallet Robotics for Warehouses',
    description: 'Autonomous pallet trucks for warehouse automation — 1,000 kg payload, AI navigation, zero infrastructure changes. CE certified for Europe.',
    images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist RPT-1000 Autonomous Pallet Truck' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robobist | Autonomous Pallet Robotics',
    description: 'Autonomous pallet trucks for warehouse automation. No infrastructure changes required.',
    images: ['https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png'],
  },
  alternates: { canonical: 'https://robobist.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-inter antialiased">
        <div id="google_translate_element" style={{ display: 'none' }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <Script id="google-translate-init" strategy="afterInteractive">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'ro,de,fr,it,es,pl,nl,pt,cs,hu,sv,da,fi,no',
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}</Script>
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      </body>
    </html>
  )
}
