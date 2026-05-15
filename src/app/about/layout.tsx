import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Robobist — Warehouse Automation Company',
  description: 'Robobist builds autonomous warehouse robots for European markets. In partnership with Flacăra Electric, we deliver turnkey AMR solutions with full installation and 24/7 support.',
  keywords: [
    'Robobist company', 'warehouse automation company Europe', 'AMR manufacturer Romania',
    'Flacăra Electric partnership', 'autonomous robot distributor Europe', 'SEER Robotics Europe',
  ],
  alternates: { canonical: 'https://robobist.com/about' },
  openGraph: {
    title: 'About Robobist | Warehouse Automation Company',
    description: 'Autonomous warehouse robotics for Europe. Turnkey AMR solutions with full installation and support.',
    url: 'https://robobist.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
