'use client'

import { motion } from 'framer-motion'
import { Boxes, Maximize2, Brain, Navigation } from 'lucide-react'

const features = [
  {
    icon: Boxes,
    title: 'Universal Pallet Compatibility',
    body: 'Handles open and closed pallets of all standard sizes — Euro, block, custom. No pallet left behind.',
  },
  {
    icon: Maximize2,
    title: '1,200mm Slim Profile',
    body: 'Navigate aisles as narrow as 1,300mm with zero infrastructure changes. Retrofit-ready from day one.',
  },
  {
    icon: Brain,
    title: 'AI Deep Learning Vision',
    body: 'Identifies pallets from any angle — wrapped, damaged, or non-standard — with millimeter precision.',
  },
  {
    icon: Navigation,
    title: 'Four Navigation Modes',
    body: 'SLAM, reflector, NFL, and hybrid navigation. Adapts to any warehouse layout out of the box.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as number[] },
  }),
}

export default function Features() {
  return (
    <section className="bg-white grain py-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">Why Robobist</p>
          <h2 className="mb-4">Built for real-world warehouses.</h2>
          <p className="text-[17px] text-[#545554] leading-[1.65]">No compromises on reliability, compatibility, or safety.</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.3 }}
                className="bg-[#FAFAFA] border border-[#E8E8E8] border-t-[3px] border-t-[#F36D21] p-8 rounded-xl cursor-default"
                style={{ borderTopColor: '#F36D21', borderTopWidth: '3px' }}
              >
                <div className="w-10 h-10 flex items-center justify-center mb-5">
                  <Icon size={32} className="text-[#F36D21]" />
                </div>
                <h4 className="mb-3">{feat.title}</h4>
                <p className="text-[15px] text-[#545554] leading-[1.6]">{feat.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
