'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lightbulb, Shield, Handshake } from 'lucide-react'
import CTABanner from '@/components/CTABanner'
import { useT } from '@/contexts/LanguageContext'

const valueIcons = [Lightbulb, Shield, Handshake]

export default function AboutPage() {
  const t = useT()

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80"
          alt="Warehouse automation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-white mb-4">{t.about.heroH1}</h1>
            <p className="text-[18px] text-white/85 max-w-xl">{t.about.heroSub}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white grain py-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-4">{t.about.missionTag}</p>
              <h2 className="mb-6">{t.about.missionH2}</h2>
              <p className="text-[17px] text-[#545554] leading-[1.7] mb-5">{t.about.missionP1}</p>
              <p className="text-[17px] text-[#545554] leading-[1.7]">{t.about.missionP2}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <Image
                src="/ROBOBIST/robobist-hq.jpeg"
                alt="Robobist headquarters"
                width={640}
                height={480}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white grain py-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">{t.about.valuesTag}</p>
            <h2>{t.about.valuesH2}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.values.map((v, i) => {
              const Icon = valueIcons[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#FAFAFA] border border-[#E8E8E8] border-t-[3px] border-t-[#F36D21] p-8 rounded-xl"
                  style={{ borderTopColor: '#F36D21', borderTopWidth: '3px' }}
                >
                  <Icon size={32} className="text-[#F36D21] mb-5" />
                  <h4 className="mb-3">{v.title}</h4>
                  <p className="text-[15px] text-[#545554] leading-[1.6]">{v.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
