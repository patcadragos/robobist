'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useT, useLanguage } from '@/contexts/LanguageContext'
import { Monitor, ScanLine, Package, ShieldCheck } from 'lucide-react'

const icons = [Monitor, ScanLine, Package, ShieldCheck]

export default function ProductShowcase() {
  const t = useT()
  const { locale } = useLanguage()

  return (
    <section className="gradient-dark grain py-[120px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-white/50 mb-3">{t.showcase.tag}</p>
          <h2 className="text-white">{t.showcase.h2}</h2>
        </motion.div>

        {/* Robot image with ambient glow */}
        <div className="flex justify-center mb-16">
          <div className="relative max-w-[560px] w-full">
            {/* Ambient glow */}
            <div className="absolute inset-0 -inset-x-16 bg-[#F36D21]/10 rounded-full blur-[100px] pointer-events-none" />
            <Image
              src="/ROBOBIST/RPT-FRONTVIEW.png"
              alt="Robobist P1000 front view"
              width={2850}
              height={2442}
              className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
            />
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {t.showcase.hotspots.map((spot, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="relative rounded-2xl p-6 border border-white/[0.08] bg-white/[0.04] overflow-hidden group [@media(hover:hover)]:hover:border-[#F36D21]/40 [@media(hover:hover)]:hover:bg-white/[0.06] transition-all duration-300"
              >
                {/* Top orange accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F36D21] to-transparent" />

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#F36D21]/15 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#F36D21]" />
                </div>

                {/* Text */}
                <h4 className="text-white text-[15px] font-semibold mb-1.5 leading-snug">{spot.label}</h4>
                <p className="text-[13px] text-white/50 leading-relaxed">{spot.desc}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            href={`/${locale}/product`}
            className="border border-white/30 text-white px-8 h-12 rounded-xl inline-flex items-center text-[15px] font-medium hover:bg-white hover:text-black transition-all duration-200 hover:border-white"
          >
            {t.showcase.cta}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
