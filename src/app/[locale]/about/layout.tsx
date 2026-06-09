import type { Metadata } from 'next'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://robobist.com' },
    { '@type': 'ListItem', position: 2, name: 'About Robobist', item: 'https://robobist.com/about' },
  ],
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: 'About Robobist — Autonomous Warehouse Robot Company, Romania',
    description: 'Robobist is a European autonomous warehouse robot company based in Romania. We deliver turnkey AMR pallet truck solutions with full installation, WMS integration, and 24/7 support across Europe.',
    keywords: [
      'Robobist company', 'warehouse automation company Europe', 'AMR manufacturer Romania',
      'autonomous robot company Romania', 'warehouse robot distributor Europe',
      'autonomous pallet truck company', 'intralogistics company Europe',
    ],
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: {
      canonical: `https://robobist.com/${locale}/about`,
      languages: {
        en: 'https://robobist.com/en/about',
        ro: 'https://robobist.com/ro/about',
        de: 'https://robobist.com/de/about',
        fr: 'https://robobist.com/fr/about',
        it: 'https://robobist.com/it/about',
        es: 'https://robobist.com/es/about',
        pl: 'https://robobist.com/pl/about',
        nl: 'https://robobist.com/nl/about',
        pt: 'https://robobist.com/pt/about',
        cs: 'https://robobist.com/cs/about',
        hu: 'https://robobist.com/hu/about',
        sv: 'https://robobist.com/sv/about',
        da: 'https://robobist.com/da/about',
        fi: 'https://robobist.com/fi/about',
        no: 'https://robobist.com/no/about',
      },
    },
    openGraph: {
      title: 'About Robobist | Autonomous Warehouse Robot Company',
      description: 'European autonomous warehouse robotics company. Turnkey AMR solutions with full installation and 24/7 support.',
      url: `https://robobist.com/${locale}/about`,
      images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist P1000 Autonomous Pallet Truck' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Robobist | Autonomous Warehouse Robot Company',
      description: 'European autonomous warehouse robotics company. Turnkey AMR solutions with full installation and 24/7 support.',
      images: ['https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png'],
    },
  }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
