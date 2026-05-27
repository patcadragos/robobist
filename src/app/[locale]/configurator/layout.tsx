import type { Metadata } from 'next'

const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no']

const configuratorBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://robobist.com' },
    { '@type': 'ListItem', position: 2, name: 'Get a Quote', item: 'https://robobist.com/configurator' },
  ],
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: 'Configurator — Get an Instant Price Estimate | Robobist',
    description: 'Configure your Robobist P1000 autonomous pallet truck in 5 minutes. Get an instant price estimate tailored to your warehouse — no sales call required.',
    keywords: [
      'autonomous pallet truck price', 'warehouse robot configurator', 'AMR price estimate',
      'pallet robot quote', 'Robobist configurator', 'warehouse automation quote',
    ],
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: {
      canonical: `https://robobist.com/${locale}/configurator`,
      languages: Object.fromEntries(locales.map(l => [l, `https://robobist.com/${l}/configurator`])),
    },
    openGraph: {
      title: 'Configure Your Robot | Robobist',
      description: 'Get an instant price estimate for the Robobist P1000 autonomous pallet truck. 5-minute configurator, no sales call required.',
      url: `https://robobist.com/${locale}/configurator`,
      images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist P1000 Autonomous Pallet Truck Configurator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Configure Your Robot | Robobist',
      description: 'Get an instant price estimate for the Robobist P1000. 5-minute configurator.',
      images: ['https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png'],
    },
  }
}

export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(configuratorBreadcrumbSchema) }} />
      {children}
    </>
  )
}
