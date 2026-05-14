'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const hotspots = [
  {
    id: 1,
    x: '22%',
    y: '18%',
    label: 'HMI Control Panel',
    desc: '7" touchscreen + emergency stop',
  },
  {
    id: 2,
    x: '72%',
    y: '15%',
    label: '360° Lidar Array',
    desc: '5 sensors, ±10mm accuracy',
  },
  {
    id: 3,
    x: '48%',
    y: '78%',
    label: 'Heavy-Duty Forks',
    desc: '1,220mm length, 1,000kg rated',
  },
  {
    id: 4,
    x: '78%',
    y: '50%',
    label: 'Perimeter Safety',
    desc: 'Auto-stop on obstacle detection',
  },
]

export default function ProductShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={containerRef} className="gradient-dark grain py-[120px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-white/50 mb-3">The Robot</p>
          <h2 className="text-white">RPT-1000. Every detail engineered.</h2>
        </motion.div>

        {/* Robot image + hotspots */}
        <div className="flex justify-center">
          <motion.div style={{ y }} className="relative max-w-[700px] w-full">
            <Image
              src="https://cdn1.seer-group.com/static/products/SPT-1000/2.png"
              alt="Robobist RPT-1000 detail view"
              width={700}
              height={560}
              className="w-full h-auto object-contain drop-shadow-2xl"
            />

            {/* Hotspots */}
            {hotspots.map(h => (
              <div
                key={h.id}
                style={{ left: h.x, top: h.y }}
                className="absolute"
                onMouseEnter={() => setActiveHotspot(h.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Pulse ring */}
                <span
                  className="absolute inset-[-6px] rounded-full border-2 border-[#F36D21] hotspot-ring"
                  style={{ opacity: 0.5 }}
                />
                {/* Dot */}
                <button
                  className="relative w-4 h-4 bg-[#F36D21] rounded-full cursor-pointer z-10"
                  aria-label={h.label}
                />

                {/* Tooltip */}
                {activeHotspot === h.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="glass-dark rounded-xl px-4 py-3 absolute z-20 w-52 shadow-2xl"
                    style={{
                      bottom: '130%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="text-[13px] font-semibold text-white mb-1">{h.label}</div>
                    <div className="text-[12px] text-white/70">{h.desc}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/60" />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/product"
            className="border border-white text-white px-8 h-12 rounded-xl inline-flex items-center text-[15px] font-medium hover:bg-white hover:text-black transition-all duration-200"
          >
            View Full Specifications
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
