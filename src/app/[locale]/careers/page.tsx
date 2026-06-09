'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, Briefcase, Zap, Globe, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const openings: {
  title: string
  department: string
  location: string
  type: string
  description: string
}[] = []

const values = [
  {
    icon: Zap,
    title: 'Real-world impact',
    body: 'Our robots operate in live warehouses across Europe. Every line of code, every deployment, every client call matters.',
  },
  {
    icon: Globe,
    title: 'European reach',
    body: 'We operate across Germany, Romania, and the wider EU market. You\'ll work with clients and partners from day one.',
  },
  {
    icon: Users,
    title: 'Small team, big scope',
    body: 'No bureaucracy, no silos. You own your domain end-to-end and your decisions ship fast.',
  },
]

export default function CareersPage() {
  const { locale } = useLanguage()

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="hero-bg grain pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-4"
          >
            Careers at Robobist
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.02em] text-black mb-6"
          >
            Help us build the future<br className="hidden sm:block" /> of autonomous warehousing.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[18px] text-[#545554] leading-[1.65] max-w-2xl mx-auto"
          >
            We are a fast-moving robotics company building autonomous pallet solutions for warehouses across Europe. We move fast, ship real products, and work with real clients.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white grain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">Why Robobist</p>
            <h2 className="text-[32px] font-bold">What it means to work here.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#FAFAFA] border border-[#E8E8E8] border-t-[3px] rounded-xl p-7"
                  style={{ borderTopColor: '#F36D21' }}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-[#F36D21]" />
                  </div>
                  <h4 className="text-[17px] font-semibold mb-2">{v.title}</h4>
                  <p className="text-[14px] text-[#545554] leading-[1.65]">{v.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-20 bg-[#FAFAFA] grain">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">Open Positions</p>
            <h2 className="text-[32px] font-bold">Current openings.</h2>
          </motion.div>

          {openings.length > 0 ? (
            <div className="space-y-4">
              {openings.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-[#E8E8E8] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-black transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="text-[18px] font-semibold mb-1">{job.title}</h3>
                    <p className="text-[14px] text-[#545554] mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-[13px] text-[#888]">
                      <span className="flex items-center gap-1"><Briefcase size={13} /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {job.type}</span>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/careers/apply?position=${encodeURIComponent(job.title)}`}
                    className="inline-flex items-center gap-2 bg-[#F36D21] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#e55e12] transition-colors text-[14px] whitespace-nowrap flex-shrink-0"
                  >
                    Apply <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-[#E8E8E8] rounded-xl p-10 text-center"
            >
              <p className="text-[16px] font-semibold text-black mb-2">No open positions right now.</p>
              <p className="text-[14px] text-[#545554] max-w-md mx-auto">
                We are not actively hiring at the moment, but we are always interested in meeting driven people. Send us your CV and we will keep it on file.
              </p>
            </motion.div>
          )}

          {/* Spontaneous application */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 bg-black text-white rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-[17px] font-semibold mb-1">Don't see a role that fits?</p>
              <p className="text-[14px] text-white/65 leading-[1.6] max-w-xl">
                We review spontaneous applications. Tell us who you are and what you bring — attach your CV and we will get back to you.
              </p>
            </div>
            <Link
              href={`/${locale}/careers/apply`}
              className="inline-flex items-center gap-2 bg-[#F36D21] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#e55e12] transition-colors text-[15px] whitespace-nowrap flex-shrink-0"
            >
              Send your CV <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="py-14 bg-white border-t border-[#E8E8E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-[#545554]">Questions about working at Robobist? <a href="mailto:contact@robobist.com" className="text-[#F36D21] hover:underline">contact@robobist.com</a></p>
          <Link href={`/${locale}`} className="text-[13px] text-[#F36D21] hover:underline">← Back to Home</Link>
        </div>
      </section>

    </div>
  )
}
