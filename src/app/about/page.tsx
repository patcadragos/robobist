'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lightbulb, Shield, Handshake, ExternalLink } from 'lucide-react'
import CTABanner from '@/components/CTABanner'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    body: 'We push the boundaries of warehouse automation with AI-powered navigation and deep learning vision technology.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    body: 'Built for real-world conditions — our robots operate across temperature ranges, diverse pallet types, and complex environments.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    body: 'We succeed when our clients succeed. That means end-to-end support, from integration to ongoing maintenance.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80"
          alt="Warehouse automation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-white mb-4">The Future of Warehouse Automation</h1>
            <p className="text-[18px] text-white/85 max-w-xl">We build robots that work, so your people don&apos;t have to.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white grain py-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-4">Our Mission</p>
              <h2 className="mb-6">Automation that actually works in your warehouse.</h2>
              <p className="text-[17px] text-[#545554] leading-[1.7] mb-5">
                Robobist was founded with a single mission: make autonomous warehouse robotics accessible, reliable, and deployable — without the complexity of traditional automation projects.
              </p>
              <p className="text-[17px] text-[#545554] leading-[1.7]">
                Our flagship product, the RPT-1000, is built on proven SEER Robotics technology, adapted and certified for the European market. With our partners at Flacăra Electric, we deliver complete solutions from day one.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="Robobist team"
                width={640}
                height={480}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="gradient-light grain py-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">Strategic Partnership</p>
            <h2>Robobist × Flacăra Electric</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 text-[17px] text-[#545554] leading-[1.7]"
            >
              <p>
                Flacăra Electric is Romania&apos;s leading electrical engineering firm, with decades of experience in industrial automation, electrical installations, and system integration across Europe.
              </p>
              <p>
                Together, Robobist and Flacăra Electric provide a truly turnkey solution: from robot configuration and delivery, to full warehouse installation, network infrastructure, and ongoing 24/7 technical support.
              </p>
              <a
                href="https://flacara-electric.ro/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F36D21] font-medium hover:underline underline-offset-4"
              >
                Visit flacara-electric.ro
                <ExternalLink size={16} />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-10 border border-[#E8E8E8] shadow-sm text-center">
                <div className="text-[48px] mb-4">⚡</div>
                <h3 className="text-[22px] font-semibold mb-2">Flacăra Electric</h3>
                <p className="text-[15px] text-[#545554]">Romania&apos;s leading electrical engineering partner</p>
                <div className="mt-6 flex justify-center gap-8 text-center">
                  <div>
                    <div className="text-[28px] font-bold text-[#F36D21]">20+</div>
                    <div className="text-[13px] text-[#888]">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-[28px] font-bold text-[#F36D21]">EU</div>
                    <div className="text-[13px] text-[#888]">Wide Coverage</div>
                  </div>
                  <div>
                    <div className="text-[28px] font-bold text-[#F36D21]">24/7</div>
                    <div className="text-[13px] text-[#888]">Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white grain py-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">What We Stand For</p>
            <h2>Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#FAFAFA] border border-[#E8E8E8] border-t-[3px] border-t-[#F36D21] p-8 rounded-xl"
                  style={{ borderTopColor: '#F36D21', borderTopWidth: '3px' }}
                >
                  <Icon size={32} className="text-[#F36D21] mb-5" />
                  <h4 className="mb-3">{v.title}</h4>
                  <p className="text-[15px] text-[#545554] leading-[1.6]">{v.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
