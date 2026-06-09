import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import Features from '@/components/Features'
import ProductShowcase from '@/components/ProductShowcase'
import HowItWorks from '@/components/HowItWorks'
import CTABanner from '@/components/CTABanner'
import FaqSection, { faqSchema } from '@/components/FaqSection'
import ServicesSection from '@/components/ServicesSection'

export const metadata: Metadata = {
  title: 'Robobist | Autonomous Pallet Truck for Warehouse Automation',
  description: 'Robobist P1000 — autonomous pallet truck with 1,000 kg payload, AI SLAM navigation, zero infrastructure changes. CE certified. Deploy in days, not months. Serving European warehouses.',
  keywords: [
    'autonomous pallet truck', 'warehouse automation robot', 'autonomous mobile robot Europe',
    'AMR warehouse', 'SLAM navigation robot', 'warehouse automation no infrastructure',
    'autonomous forklift alternative', 'pallet robot CE certified', 'AGV vs AMR warehouse',
    'warehouse robot cost', 'intralogistics automation', 'autonomous pallet jack',
    'smart warehouse robot', 'robot de paleti', 'automatizare depozit', 'robot magazie',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <StatsBar />
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <ServicesSection />
      <FaqSection />
      <CTABanner />
    </>
  )
}
