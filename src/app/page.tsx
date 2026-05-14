import Hero from '@/components/Hero'
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
