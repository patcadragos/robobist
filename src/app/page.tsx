import type { Metadata } from 'next'
import Hero from '@/components/Hero'

export const metadata: Metadata = {
  title: 'Robobist | Autonomous Pallet Robotics for Warehouses',
  description: 'Robobist RPT-1000 — autonomous pallet truck with 1,000 kg payload, AI SLAM navigation, zero infrastructure changes. CE certified. Serving European warehouses.',
  alternates: { canonical: 'https://robobist.com' },
}
import StatsBar from '@/components/StatsBar'
import Features from '@/components/Features'
import ProductShowcase from '@/components/ProductShowcase'
import HowItWorks from '@/components/HowItWorks'
import PartnerSection from '@/components/PartnerSection'
import CTABanner from '@/components/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <PartnerSection />
      <CTABanner />
    </>
  )
}
