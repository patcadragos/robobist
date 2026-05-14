'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function PartnerSection() {
  return (
    <section className="bg-white grain py-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-4">Strategic Partner</p>
            <h2 className="mb-6">Backed by Flacăra Electric.</h2>
            <p className="text-[17px] text-[#545554] leading-[1.65] mb-8 max-w-[520px]">
              Robobist operates in close collaboration with Flacăra Electric — Romania&apos;s leading electrical engineering firm.
              Together we deliver end-to-end warehouse automation across Europe: from integration to ongoing maintenance.
            </p>
            <a
              href="https://flacara-electric.ro/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[#F36D21] hover:underline underline-offset-4"
            >
              Visit flacara-electric.ro
              <ExternalLink size={14} />
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
                alt="Warehouse automation with Flacăra Electric"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
