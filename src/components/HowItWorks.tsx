'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useT, useLanguage } from '@/contexts/LanguageContext'

export default function HowItWorks() {
  const t = useT()
  const { locale } = useLanguage()

  return (
    <section className="gradient-light grain py-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">{t.howItWorks.tag}</p>
          <h2>{t.howItWorks.h2}</h2>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row gap-12 md:gap-0">
          <div className="hidden md:block absolute top-[28px] left-[calc(16.6%+24px)] right-[calc(16.6%+24px)] h-[2px] bg-gradient-to-r from-[#F36D21] via-[#F36D21]/50 to-[#F36D21]" style={{ top: '28px' }} />

          {t.howItWorks.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex-1 flex flex-col items-center text-center px-6 relative"
            >
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-[80px] font-black text-[#F36D21] leading-none select-none pointer-events-none"
                style={{ opacity: 0.2 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10 w-14 h-14 rounded-full bg-[#F36D21] flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-[16px]">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="text-[22px] font-semibold mb-3">{step.title}</h3>
              <p className="text-[15px] text-[#545554] leading-[1.6] max-w-[220px]">{step.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <Link
            href={`/${locale}/configurator`}
            className="inline-flex items-center gap-2 bg-[#F36D21] text-white font-semibold px-8 h-12 rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.02] text-[15px]"
          >
            {t.howItWorks.cta}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
