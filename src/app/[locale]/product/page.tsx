'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Download } from 'lucide-react'
import CTABanner from '@/components/CTABanner'
import { useT, useLanguage } from '@/contexts/LanguageContext'

const images = [
  { src: '/ROBOBIST/RPT-HOMEVIEW.png', alt: 'Robobist P1000 warehouse view' },
  { src: '/ROBOBIST/RPT-FRONTVIEW.png', alt: 'Robobist P1000 front view' },
  { src: '/ROBOBIST/RPT-SIDEVIEW.png', alt: 'Robobist P1000 side view' },
]

type Tab = 'overview' | 'specifications' | 'safety'

const specSections = [
  {
    title: 'Basic Parameters',
    rows: [
      ['Product Name', 'Robobist P1000'],
      ['Series', 'P-Series — Autonomous Pallet Trucks'],
      ['Operation Type', 'Automatic Navigation'],
      ['Navigation', 'Laser SLAM (Reflector & NFL optional)'],
      ['Pallet Types', 'Open / Closed'],
      ['Rated Load Capacity', '1,000 kg  (2,204 lbs)'],
      ['Robot Weight', '450 kg  (992 lbs)'],
      ['Standard Lifting Height', '190 mm  (7.48 in)'],
      ['Dimensions L×W×H', '1,450 × 1,200 × 556 mm'],
      ['Fork Dimensions L×W×H', '1,220 × 168 × 60 mm'],
      ['Fork Outer Width', '610 mm  (24.02 in)'],
      ['Min. Turning Radius', '900 mm  (35.43 in)'],
      ['Operating Temp / RH', '0°C – 50°C / 10–90% RH'],
    ],
  },
  {
    title: 'Performance',
    rows: [
      ['Driving Speed', '1.1 m/s  (full & no load)'],
      ['Slope / Step / Gap', '< 3% / 5 mm / 10 mm'],
      ['Positioning Accuracy', '± 10 mm'],
      ['Angle Accuracy', '± 1°'],
    ],
  },
  {
    title: 'Battery',
    rows: [
      ['Battery', '48V / 36Ah LiFePO4'],
      ['Battery Life', '8 hours'],
      ['Charge Time (10→80%)', '1.5 hours'],
      ['Charging Method', 'Manual / Automatic'],
    ],
  },
  {
    title: 'Sensors & Features',
    rows: [
      ['Main Lidar', '1× H1E0 / Mid-360'],
      ['Perimeter Lidar', '4× C214'],
      ['Wi-Fi Roaming', 'Standard ●'],
      ['HMI Display', 'Standard ●'],
      ['3D Obstacle Avoidance', 'Optional ○'],
      ['Pallet Recognition AI', 'Optional ○'],
    ],
  },
]

const safetyRows = [
  ['E-Stop Button', 'Standard ●'],
  ['Sound & Light Indicator', 'Standard ●'],
  ['360° Laser Protection', 'Standard ●'],
  ['Fork Height Protection', 'Standard ●'],
  ['Bumper Strip', 'Optional ○'],
  ['Braking Distance (1 m/s)', '≤ 30 cm'],
  ['Braking Distance (1.5 m/s)', '≤ 50 cm'],
]

function SpecTable({ sections }: { sections: typeof specSections }) {
  return (
    <div className="space-y-10 overflow-x-auto">
      {sections.map(section => (
        <div key={section.title}>
          <table className="w-full min-w-[480px] specs-table border-collapse text-[15px]">
            <thead>
              <tr>
                <th colSpan={2} className="bg-[#F36D21] text-white text-left px-5 py-3 rounded-t-lg text-[14px] font-semibold uppercase tracking-wide">
                  {section.title}
                </th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map(([key, val], i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                  <td className="px-5 py-3 text-[#545554] w-1/2 font-medium">{key}</td>
                  <td className="px-5 py-3 text-black font-medium tabular-nums">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default function ProductPage() {
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const t = useT()
  const { locale } = useLanguage()

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: t.product.tabOverview },
    { key: 'specifications', label: t.product.tabSpecs },
    { key: 'safety', label: t.product.tabSafety },
  ]

  return (
    <div className="pt-16">
      {/* Product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left sticky gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:w-[52%] flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F5F5F5] rounded-2xl p-6 aspect-[4/3] flex items-center justify-center"
              >
                <Image
                  src={images[activeImg].src}
                  alt={images[activeImg].alt}
                  width={640}
                  height={480}
                  className="w-full h-full object-contain drop-shadow-xl"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-[#F36D21]' : 'border-transparent hover:border-[#E8E8E8]'
                  }`}
                >
                  <Image src={img.src} alt={img.alt} width={120} height={120} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>

            <Link
              href={`/${locale}/product/p1000-autonomous-pallet-truck-datasheet`}
              className="mt-4 flex items-center justify-center gap-2 border border-[#E8E8E8] text-[14px] font-medium text-[#545554] h-11 rounded-xl hover:border-black hover:text-black transition-all"
            >
              <Download size={16} />
              {t.product.download}
            </Link>

          </div>

          {/* Right content */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">{t.product.tag}</p>
            <h1 className="mb-4">Robobist P1000</h1>
            <p className="text-[17px] text-[#545554] mb-8 leading-[1.65]">{t.product.sub}</p>

            {/* Selling points */}
            <ul className="space-y-3 mb-10">
              {t.product.sellingPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#F36D21] mt-0.5 flex-shrink-0" />
                  <span className="text-[16px] text-[#545554]">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                href={`/${locale}/configurator`}
                className="inline-flex items-center gap-2 bg-[#F36D21] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.02] text-[15px]"
              >
                {t.product.cta1}
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center py-3.5 px-6 text-[15px] font-medium text-black underline underline-offset-4 decoration-[#E8E8E8] hover:decoration-black"
              >
                {t.product.cta2}
              </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E8E8E8] mb-8">
              <div className="flex gap-0">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-3 text-[14px] font-medium border-b-2 transition-all ${
                      activeTab === tab.key
                        ? 'border-[#F36D21] text-black'
                        : 'border-transparent text-[#888] hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6 text-[16px] text-[#545554] leading-[1.7]">
                    <p>{t.product.overviewP1}</p>
                    <p>{t.product.overviewP2}</p>
                    <p>{t.product.overviewP3}</p>
                  </div>
                )}
                {activeTab === 'specifications' && (
                  <SpecTable sections={specSections} />
                )}
                {activeTab === 'safety' && (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px] specs-table border-collapse text-[15px]">
                      <thead>
                        <tr>
                          <th colSpan={2} className="bg-[#F36D21] text-white text-left px-5 py-3 rounded-t-lg text-[14px] font-semibold uppercase tracking-wide">
                            Safety Features
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {safetyRows.map(([key, val], i) => (
                          <tr key={key} className={i % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                            <td className="px-5 py-3 text-[#545554] w-1/2 font-medium">{key}</td>
                            <td className="px-5 py-3 text-black font-medium tabular-nums">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <CTABanner />
    </div>
  )
}
