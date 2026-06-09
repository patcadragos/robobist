'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useT, useLanguage } from '@/contexts/LanguageContext'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as number[] } },
})

const fadeLeft = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as number[] } },
}

const badgeVariant = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay, type: 'spring', stiffness: 200 } },
})

export default function Hero() {
  const t = useT()
  const { locale } = useLanguage()

  return (
    <section className="relative min-h-screen hero-bg grain pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center min-h-[calc(100vh-64px)] py-12 md:py-0 gap-8 md:gap-0">
          {/* Left: Text */}
          <div className="md:w-[45%] max-w-xl">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.p
                variants={fadeUp(0)}
                className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21]"
              >
                {t.hero.tag}
              </motion.p>

              <motion.h1 variants={fadeUp(0.1)} className="text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.02em] text-black">
                {t.hero.h1.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </motion.h1>

              <motion.p variants={fadeUp(0.2)} className="text-[17px] text-[#545554] leading-[1.65] max-w-[460px]">
                {t.hero.sub}
              </motion.p>

              <motion.div variants={fadeUp(0.3)} className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/${locale}/configurator`}
                  className="inline-flex items-center gap-2 bg-[#F36D21] text-white font-semibold px-7 h-12 rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.02] text-[15px]"
                >
                  {t.hero.cta1}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={`/${locale}/product`}
                  className="inline-flex items-center h-12 px-6 text-[15px] font-medium text-black underline underline-offset-4 decoration-[#E8E8E8] hover:decoration-black transition-all"
                >
                  {t.hero.cta2}
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Robot image + badges */}
          <div className="md:w-[55%] flex items-center justify-center relative w-full" style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
            <motion.div variants={fadeLeft} initial="hidden" animate="visible" className="relative w-full max-w-[580px]" style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
              <Image
                src="/ROBOBIST/RPT-HOMEVIEW-cropped.png"
                alt="Robobist P1000 autonomous pallet truck"
                width={600}
                height={267}
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}
                priority
              />

              <motion.div
                variants={badgeVariant(0.6)}
                initial="hidden"
                animate="visible"
                className="absolute -top-[28%] left-[18%] glass rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-lg float-badge"
              >
                <div className="text-[15px] md:text-[22px] font-bold text-black leading-none">1,000 kg</div>
                <div className="text-[10px] md:text-[12px] text-[#545554] mt-0.5">{t.hero.badge1Label}</div>
              </motion.div>

              <motion.div
                variants={badgeVariant(0.9)}
                initial="hidden"
                animate="visible"
                className="absolute top-[10%] right-[4%] glass rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-lg float-badge-2"
              >
                <div className="text-[15px] md:text-[22px] font-bold text-black leading-none">8h</div>
                <div className="text-[10px] md:text-[12px] text-[#545554] mt-0.5">{t.hero.badge2Label}</div>
              </motion.div>

              <motion.div
                variants={badgeVariant(1.2)}
                initial="hidden"
                animate="visible"
                className="absolute -bottom-[14%] left-[8%] glass rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-lg float-badge-3"
              >
                <div className="text-[15px] md:text-[22px] font-bold text-black leading-none">±10mm</div>
                <div className="text-[10px] md:text-[12px] text-[#545554] mt-0.5">{t.hero.badge3Label}</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}
