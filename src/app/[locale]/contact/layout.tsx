import type { Metadata } from 'next'

const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no']

const contactBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://robobist.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://robobist.com/contact' },
  ],
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: 'Contact Robobist — Request a Quote for Warehouse Automation',
    description: 'Get in touch with the Robobist team. Request a quote for autonomous pallet truck solutions, schedule a demo, or ask about WMS integration and installation across Europe.',
    keywords: [
      'contact Robobist', 'warehouse robot quote', 'autonomous pallet truck demo',
      'warehouse automation contact', 'AMR robot sales Europe', 'pallet robot inquiry',
    ],
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: {
      canonical: `https://robobist.com/${locale}/contact`,
      languages: Object.fromEntries(locales.map(l => [l, `https://robobist.com/${l}/contact`])),
    },
    openGraph: {
      title: 'Contact Robobist | Warehouse Automation Quote',
      description: 'Request a quote or schedule a demo for the Robobist P1000 autonomous pallet truck. We respond within 24 hours.',
      url: `https://robobist.com/${locale}/contact`,
      images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist P1000 Autonomous Pallet Truck' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Robobist | Warehouse Automation Quote',
      description: 'Request a quote for the Robobist P1000 autonomous pallet truck. We respond within 24 hours.',
      images: ['https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png'],
    },
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbSchema) }} />
      {children}
    </>
  )
}
