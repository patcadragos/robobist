import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { type Locale } from '@/lib/translations'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no'] as const

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
  description: 'Autonomous pallet truck manufacturer and distributor for European warehouse automation. CE certified AMR robots with AI SLAM navigation, 1,000 kg payload, zero infrastructure changes.',
  foundingDate: '2024',
  areaServed: [
    'Romania', 'Germany', 'France', 'Poland', 'Netherlands', 'Belgium',
    'Czech Republic', 'Hungary', 'Sweden', 'Denmark', 'Finland', 'Norway',
    'Italy', 'Spain', 'Portugal', 'Austria',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RO',
    addressRegion: 'Romania',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'contact@robobist.com',
      contactType: 'sales',
      areaServed: 'EU',
      availableLanguage: ['English', 'Romanian', 'German', 'French', 'Italian', 'Spanish', 'Polish'],
    },
    {
      '@type': 'ContactPoint',
      email: 'contact@robobist.com',
      contactType: 'customer support',
      areaServed: 'EU',
    },
  ],
  knowsAbout: [
    'Autonomous Mobile Robots', 'Warehouse Automation', 'Pallet Trucks', 'AMR',
    'AGV', 'SLAM Navigation', 'Intralogistics', 'Warehouse Robotics',
  ],
  sameAs: [
    'https://www.linkedin.com/company/robobist',
    'https://www.youtube.com/@robobist',
  ],
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: {
      default: 'Robobist | Autonomous Pallet Robotics for Warehouses',
      template: '%s | Robobist',
    },
    description: 'Robobist delivers autonomous pallet trucks for warehouse automation — no infrastructure changes, 1,000 kg payload, AI SLAM navigation, CE certified. Serving Europe.',
    keywords: [
      'autonomous pallet truck', 'warehouse robotics', 'autonomous mobile robot', 'AMR warehouse',
      'SLAM navigation robot', 'warehouse automation Europe', 'pallet robot', 'AGV pallet truck',
      'Robobist P1000', 'autonomous forklift', 'warehouse robot CE certified', 'intralogistics robot',
      'autonomous pallet jack', 'smart warehouse', 'robot de paleti', 'automatizare depozit',
    ],
    authors: [{ name: 'Robobist' }],
    creator: 'Robobist',
    publisher: 'Robobist',
    verification: { google: 'e3PBu26y6G_mapOQuX_EGnF5t7eRd-pfK2epMrcq_Ag' },
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    icons: [
      { rel: 'icon', url: '/ROBOBIST/favicon-negru.png', media: '(prefers-color-scheme: light)' },
      { rel: 'icon', url: '/ROBOBIST/favicon-alb.png', media: '(prefers-color-scheme: dark)' },
    ],
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale,
      url: `https://robobist.com/${locale}`,
      siteName: 'Robobist',
      title: 'Robobist | Autonomous Pallet Robotics for Warehouses',
      description: 'Autonomous pallet trucks for warehouse automation — 1,000 kg payload, AI navigation, zero infrastructure changes. CE certified for Europe.',
      images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist P1000 Autonomous Pallet Truck' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Robobist | Autonomous Pallet Robotics',
      description: 'Autonomous pallet trucks for warehouse automation. No infrastructure changes required.',
      images: ['https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png'],
    },
    alternates: {
      canonical: `https://robobist.com/${locale}`,
      languages: Object.fromEntries(locales.map(l => [l, `https://robobist.com/${l}`])),
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale as Locale
  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-inter antialiased">
        <LanguageProvider locale={locale}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
