'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bot, LayoutDashboard, Wifi, DoorOpen, Wrench, Headphones, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const anchor = {
  icon: Bot,
  title: 'Robobist P1000',
  desc: 'The foundation of your automation. AI SLAM navigation, 1,000 kg payload, CE certified. No infrastructure changes required.',
  note: 'From €40,000 / unit — volume discounts from 3 units',
  highlight: true,
}

const services = [
  {
    icon: LayoutDashboard,
    title: 'WMS Integration',
    desc: 'Connect the robot fleet to your existing Warehouse Management System (SAP, Oracle, or custom WMS) via standard APIs.',
  },
  {
    icon: DoorOpen,
    title: 'Automated Doors & Gates',
    desc: 'Smart access points that open automatically as the robot approaches. Pricing depends on the number of doors and door type.',
  },
  {
    icon: Wifi,
    title: 'Network Infrastructure',
    desc: 'Dedicated WiFi mesh network designed for uninterrupted SLAM navigation. Coverage depends on warehouse size and layout.',
  },
  {
    icon: Wrench,
    title: 'Installation & Commissioning',
    desc: 'Full on-site deployment: warehouse mapping, robot calibration, WMS go-live. Typically 1–3 days per site.',
  },
  {
    icon: Headphones,
    title: '24/7 Support & Maintenance',
    desc: 'Remote monitoring, proactive alerts, and on-site intervention SLA plans. Annual contracts tailored to your fleet size.',
  },
]

export default function ServicesSection() {
  const { locale } = useLanguage()

  return (
    <section className="bg-[#FAFAFA] grain py-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">Full Solution</p>
          <h2 className="mb-4">More than a robot.</h2>
          <p className="text-[18px] text-[#545554] max-w-2xl mx-auto leading-[1.65]">
            Every warehouse is different. We build the complete automation stack around yours — from the robot itself to doors, network, WMS, and ongoing support.
          </p>
        </motion.div>

        {/* Anchor card — robot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 rounded-2xl border-2 border-[#F36D21] bg-white p-8 flex flex-col sm:flex-row sm:items-center gap-6"
        >
          <div className="w-14 h-14 rounded-xl bg-[#F36D21] flex items-center justify-center flex-shrink-0">
            <Bot size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F36D21] mb-1">Starting point</p>
            <h3 className="text-[20px] font-bold mb-1">{anchor.title}</h3>
            <p className="text-[15px] text-[#545554] leading-[1.6]">{anchor.desc}</p>
          </div>
          <div className="sm:text-right flex-shrink-0">
            <div className="text-[22px] font-black text-black">From €40,000</div>
            <div className="text-[13px] text-[#888] mt-0.5">per unit · volume discounts apply</div>
          </div>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white border border-[#E8E8E8] rounded-2xl p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F5F5F5] flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#F36D21]" />
                </div>
                <h4 className="text-[17px] font-semibold mb-2">{s.title}</h4>
                <p className="text-[14px] text-[#545554] leading-[1.65]">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-black text-white rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-semibold text-[17px] mb-1">Your final price depends on your warehouse.</p>
            <p className="text-[14px] text-white/65 leading-[1.6] max-w-xl">
              Number of automated doors, warehouse size, existing IT infrastructure, WMS compatibility — every site is different. We scope it all in a free consultation.
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-[#F36D21] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#e55e12] transition-all duration-200 whitespace-nowrap text-[15px] flex-shrink-0"
          >
            Get a full quote
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
