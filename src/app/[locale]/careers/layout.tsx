import type { Metadata } from 'next'

const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no']

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: 'Careers — Join the Robobist Team',
    description: 'Help us build the future of autonomous warehouse robotics in Europe. Explore open positions at Robobist.',
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: {
      canonical: `https://robobist.com/${locale}/careers`,
      languages: Object.fromEntries(locales.map(l => [l, `https://robobist.com/${l}/careers`])),
    },
    openGraph: {
      title: 'Careers | Robobist',
      description: 'Help us build the future of autonomous warehouse robotics in Europe.',
      url: `https://robobist.com/${locale}/careers`,
      images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist — Careers in Warehouse Robotics' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Careers | Robobist',
      description: 'Help us build the future of autonomous warehouse robotics in Europe.',
      images: ['https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png'],
    },
  }
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
