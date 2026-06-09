import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Get a Quote for Warehouse Automation',
  description: 'Contact Robobist to get a quote for autonomous pallet trucks. We respond within 24 hours. Serving warehouses across Europe.',
  keywords: [
    'warehouse robot quote', 'autonomous pallet truck price', 'contact Robobist',
    'warehouse automation quote Europe', 'AMR pallet truck inquiry',
  ],
  alternates: { canonical: 'https://robobist.com/contact' },
  openGraph: {
    title: 'Contact Robobist | Get a Warehouse Automation Quote',
    description: 'Get a quote for autonomous pallet trucks. Response within 24 hours.',
    url: 'https://robobist.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
