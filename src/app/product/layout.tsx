import type { Metadata } from 'next'

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Robobist RPT-1000',
  description: 'Autonomous pallet truck with 1,000 kg capacity, AI deep learning pallet recognition, SLAM navigation, and ±10mm positioning accuracy.',
  brand: { '@type': 'Brand', name: 'Robobist' },
  image: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png',
  url: 'https://robobist.com/product',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Robobist' },
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Payload Capacity', value: '1000 kg' },
    { '@type': 'PropertyValue', name: 'Navigation', value: 'Laser SLAM' },
    { '@type': 'PropertyValue', name: 'Positioning Accuracy', value: '±10 mm' },
    { '@type': 'PropertyValue', name: 'Battery Life', value: '8 hours' },
    { '@type': 'PropertyValue', name: 'Certification', value: 'CE' },
  ],
}

export const metadata: Metadata = {
  title: 'RPT-1000 Autonomous Pallet Truck — Specs & Features',
  description: 'The Robobist RPT-1000 autonomous pallet truck — 1,000 kg capacity, AI pallet recognition, SLAM navigation, ±10mm accuracy, 8h battery. CE certified for European warehouses.',
  keywords: [
    'RPT-1000', 'autonomous pallet truck specs', 'warehouse AMR 1000kg', 'SLAM navigation pallet robot',
    'AI pallet recognition', 'autonomous pallet jack Europe', 'CE certified pallet robot',
    'LiFePO4 warehouse robot', 'autonomous forklift specifications',
  ],
  alternates: { canonical: 'https://robobist.com/product' },
  openGraph: {
    title: 'Robobist RPT-1000 | Autonomous Pallet Truck Specifications',
    description: '1,000 kg autonomous pallet truck with AI navigation. Zero infrastructure changes. CE certified.',
    url: 'https://robobist.com/product',
    images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist RPT-1000' }],
  },
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {children}
    </>
  )
}
