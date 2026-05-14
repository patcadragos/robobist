'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as number[] } },
})

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as number[] } },
}

const badgeVariant = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay, type: 'spring', stiffness: 200 } },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen hero-bg grain overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center min-h-[calc(100vh-64px)] py-12 md:py-0 gap-8 md:gap-0">
          {/* Left: Text */}
          <div className="flex-1 max-w-xl">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.p
                variants={fadeUp(0)}
                className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21]"
              >
                Autonomous Pallet Robotics
              </motion.p>

              <motion.h1 variants={fadeUp(0.1)} className="text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.02em] text-black">
                Logistics that<br />moves itself.
              </motion.h1>

              <motion.p variants={fadeUp(0.2)} className="text-[17px] text-[#545554] leading-[1.65] max-w-[460px]">
                The Robobist RPT-1000 handles 1,000 kg payloads with AI navigation — zero infrastructure changes required.
              </motion.p>

              <motion.div variants={fadeUp(0.3)} className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/configurator"
                  className="inline-flex items-center gap-2 bg-[#F36D21] text-white font-semibold px-7 h-12 rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.02] text-[15px]"
                >
                  Configure Your Robot
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/product"
                  className="inline-flex items-center h-12 px-6 text-[15px] font-medium text-black underline underline-offset-4 decoration-[#E8E8E8] hover:decoration-black transition-all"
                >
                  View Specifications
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Robot image + badges */}
          <div className="flex-1 flex items-center justify-center relative w-full md:max-w-[55%]">
            <motion.div variants={fadeLeft} initial="hidden" animate="visible" className="relative w-full max-w-[560px]">
              <Image
                src="/ROBOBIST/RPT-HOMEVIEW.png"
                alt="Robobist RPT-1000 autonomous pallet truck"
                width={560}
                height={480}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />

              {/* Badge 1 — top left */}
              <motion.div
                variants={badgeVariant(0.6)}
                initial="hidden"
                animate="visible"
                className="absolute top-[8%] left-[2%] glass rounded-2xl px-4 py-3 shadow-lg float-badge"
              >
                <div className="text-[22px] font-bold text-black leading-none">1,000 kg</div>
                <div className="text-[12px] text-[#545554] mt-0.5">Max Payload</div>
              </motion.div>

              {/* Badge 2 — right middle */}
              <motion.div
                variants={badgeVariant(0.9)}
                initial="hidden"
                animate="visible"
                className="absolute top-[42%] right-[0%] glass rounded-2xl px-4 py-3 shadow-lg float-badge-2"
              >
                <div className="text-[22px] font-bold text-black leading-none">8h</div>
                <div className="text-[12px] text-[#545554] mt-0.5">Battery Life</div>
              </motion.div>

              {/* Badge 3 — bottom left */}
              <motion.div
                variants={badgeVariant(1.2)}
                initial="hidden"
                animate="visible"
                className="absolute bottom-[12%] left-[4%] glass rounded-2xl px-4 py-3 shadow-lg float-badge-3"
              >
                <div className="text-[22px] font-bold text-black leading-none">±10mm</div>
                <div className="text-[12px] text-[#545554] mt-0.5">Accuracy</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-[12px] text-[#888] font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-[#888]" />
        </motion.div>
      </div>
    </section>
  )
}
