import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configurator — Build Your Warehouse Robot Solution',
  description: 'Configure your Robobist RPT-1000 autonomous pallet truck and get an instant price estimate. Customize units, battery, navigation options, and more.',
  keywords: [
    'warehouse robot configurator', 'autonomous pallet truck price', 'AMR quote calculator',
    'configure warehouse robot', 'RPT-1000 pricing', 'warehouse automation cost',
  ],
  alternates: { canonical: 'https://robobist.com/configurator' },
  openGraph: {
    title: 'Robobist Configurator | Build Your Warehouse Robot Solution',
    description: 'Configure your autonomous pallet truck and get an instant price estimate.',
    url: 'https://robobist.com/configurator',
  },
}

export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
