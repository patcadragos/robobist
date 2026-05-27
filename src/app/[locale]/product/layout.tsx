import type { Metadata } from 'next'

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Robobist P1000 Autonomous Pallet Truck',
  description: 'Autonomous pallet truck with 1,000 kg load capacity, AI deep learning pallet recognition, Laser SLAM navigation, ±10mm positioning accuracy, 8-hour battery life, and CE certification for European warehouses.',
  brand: { '@type': 'Brand', name: 'Robobist' },
  manufacturer: { '@type': 'Organization', name: 'Robobist', url: 'https://robobist.com' },
  image: [
    'https://robobist.com/ROBOBIST/RPT-FRONTVIEW.png',
    'https://robobist.com/ROBOBIST/RPT-SIDEVIEW.png',
    'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png',
  ],
  url: 'https://robobist.com/product',
  sku: 'Robobist-P1000',
  model: 'Robobist P1000',
  category: 'Autonomous Mobile Robot / Pallet Truck',
  award: 'CE Certified',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: '35000',
    highPrice: '40000',
    offerCount: '1',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Robobist', url: 'https://robobist.com' },
    areaServed: 'EU',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Payload Capacity', value: '1000 kg' },
    { '@type': 'PropertyValue', name: 'Navigation Type', value: 'Laser SLAM' },
    { '@type': 'PropertyValue', name: 'Positioning Accuracy', value: '±10 mm' },
    { '@type': 'PropertyValue', name: 'Driving Speed', value: '1.1 m/s' },
    { '@type': 'PropertyValue', name: 'Battery Life', value: '8 hours' },
    { '@type': 'PropertyValue', name: 'Battery Type', value: '48V 36Ah LiFePO4' },
    { '@type': 'PropertyValue', name: 'Charge Time', value: '1.5 hours (10–80%)' },
    { '@type': 'PropertyValue', name: 'Robot Weight', value: '450 kg' },
    { '@type': 'PropertyValue', name: 'Dimensions', value: '1450 × 1200 × 556 mm' },
    { '@type': 'PropertyValue', name: 'Min Turning Radius', value: '900 mm' },
    { '@type': 'PropertyValue', name: 'Operating Temperature', value: '0°C – 50°C' },
    { '@type': 'PropertyValue', name: 'Certification', value: 'CE' },
    { '@type': 'PropertyValue', name: 'Obstacle Avoidance', value: '360° Laser Protection' },
    { '@type': 'PropertyValue', name: 'Pallet Types', value: 'Open and Closed' },
  ],
}

const productFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the load capacity of the Robobist P1000?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Robobist P1000 has a rated load capacity of 1,000 kg (2,204 lbs), suitable for standard Euro pallets and heavy industrial loads.' },
    },
    {
      '@type': 'Question',
      name: 'What navigation technology does the Robobist P1000 use?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Robobist P1000 uses Laser SLAM (Simultaneous Localization and Mapping) navigation. It maps your warehouse autonomously with no floor modifications, rails, or markers required.' },
    },
    {
      '@type': 'Question',
      name: 'Is the Robobist P1000 CE certified?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Robobist P1000 is CE certified and fully compliant with European safety regulations for autonomous industrial robots operating in shared human-robot environments.' },
    },
    {
      '@type': 'Question',
      name: 'How long does the Robobist P1000 battery last?',
      acceptedAnswer: { '@type': 'Answer', text: 'The 48V / 36Ah LiFePO4 battery provides up to 8 hours of operation — a full working shift. It charges from 10% to 80% in just 1.5 hours with both manual and automatic charging options.' },
    },
    {
      '@type': 'Question',
      name: 'What is the price of the Robobist P1000?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Robobist P1000 starts from €40,000 per unit. A fully configured unit with all add-ons typically stays under €50,000. Volume discounts are available from 3 units. Use the online configurator for a tailored quote.' },
    },
    {
      '@type': 'Question',
      name: 'Can the Robobist P1000 work alongside human workers safely?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Robobist P1000 features 360° laser protection, 3D obstacle avoidance, emergency stop, sound and light warning indicators, and a stopping distance of ≤30 cm at full speed.' },
    },
  ],
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: 'Robobist P1000 Autonomous Pallet Truck — Specs, Price & Features',
    description: 'Robobist P1000: autonomous pallet truck with 1,000 kg capacity, AI SLAM navigation, ±10mm accuracy, 8h LiFePO4 battery, CE certified. From €35,000. Zero infrastructure changes. Ships to EU.',
    keywords: [
      'Robobist P1000 autonomous pallet truck', 'warehouse AMR 1000kg', 'SLAM navigation pallet robot',
      'autonomous pallet truck price', 'AI pallet recognition robot', 'autonomous pallet jack Europe',
      'CE certified warehouse robot', 'LiFePO4 AMR robot', 'autonomous forklift specifications',
      'autonomous pallet truck cost', 'warehouse robot 1 ton', 'pallet AMR Europe',
    ],
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: {
      canonical: `https://robobist.com/${locale}/product`,
      languages: {
        en: 'https://robobist.com/en/product',
        ro: 'https://robobist.com/ro/product',
        de: 'https://robobist.com/de/product',
        fr: 'https://robobist.com/fr/product',
        it: 'https://robobist.com/it/product',
        es: 'https://robobist.com/es/product',
        pl: 'https://robobist.com/pl/product',
        nl: 'https://robobist.com/nl/product',
        pt: 'https://robobist.com/pt/product',
        cs: 'https://robobist.com/cs/product',
        hu: 'https://robobist.com/hu/product',
        sv: 'https://robobist.com/sv/product',
        da: 'https://robobist.com/da/product',
        fi: 'https://robobist.com/fi/product',
        no: 'https://robobist.com/no/product',
      },
    },
    openGraph: {
      title: 'Robobist P1000 | Autonomous Pallet Truck — Specs & Price',
      description: '1,000 kg autonomous pallet truck. AI navigation, CE certified, from €40,000. Zero infrastructure changes. Ships across Europe.',
      url: `https://robobist.com/${locale}/product`,
      images: [{ url: 'https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png', width: 1200, height: 630, alt: 'Robobist P1000 Autonomous Pallet Truck' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Robobist P1000 | Autonomous Pallet Truck',
      description: '1,000 kg autonomous pallet truck. AI navigation, CE certified, from €40,000.',
      images: ['https://robobist.com/ROBOBIST/RPT-HOMEVIEW.png'],
    },
  }
}

const productBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://robobist.com' },
    { '@type': 'ListItem', position: 2, name: 'Robobist P1000 Autonomous Pallet Truck', item: 'https://robobist.com/product' },
  ],
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productBreadcrumbSchema) }} />
      {children}
    </>
  )
}
