'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useT, useLanguage } from '@/contexts/LanguageContext'

export default function CTABanner() {
  const t = useT()
  const { locale } = useLanguage()

  return (
    <section className="gradient-cta grain py-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white mb-4">{t.cta.h2}</h2>
          <p className="text-[17px] text-white/85 mb-10">{t.cta.sub}</p>
          <Link
            href={`/${locale}/configurator`}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 h-14 rounded-xl hover:bg-black hover:text-white transition-all duration-200 hover:scale-[1.02] text-[16px]"
          >
            {t.cta.btn}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
