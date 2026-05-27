'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useT } from '@/contexts/LanguageContext'

function CountUp({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, target])

  return (
    <span ref={ref} className="font-variant-tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}

export default function StatsBar() {
  const t = useT()

  const stats = [
    { value: 1000, suffix: ' kg', label: t.stats.payload, prefix: '' },
    { value: 1.1, suffix: ' m/s', label: t.stats.speed, prefix: '' },
    { value: 8, suffix: ' h', label: t.stats.battery, prefix: '' },
    { value: 10, suffix: 'mm', label: t.stats.positioning, prefix: '±' },
  ]

  return (
    <section className="gradient-dark grain py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col items-center py-6 md:py-8 px-2 md:px-4 ${
                i < stats.length - 1 ? 'border-r border-[#333]' : ''
              }`}
            >
              <div className="text-[clamp(18px,4vw,56px)] font-bold text-white leading-none tracking-tight mb-1 md:mb-2 whitespace-nowrap">
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-[12px] md:text-[14px] text-[#888] whitespace-nowrap">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
