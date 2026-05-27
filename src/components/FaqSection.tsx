'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useT } from '@/contexts/LanguageContext'

const schemaFaqs = [
  { q: 'What is an autonomous pallet truck and how does it differ from a traditional forklift?', a: 'An autonomous pallet truck (AMR) navigates your warehouse independently using AI-powered SLAM navigation and lidar sensors. No driver required. Unlike traditional forklifts, it avoids obstacles dynamically, works 24/7 without breaks, and integrates with your WMS for fully automated pallet movements.' },
  { q: 'Do I need to modify my warehouse infrastructure to deploy autonomous robots?', a: 'No infrastructure changes required. The Robobist P1000 uses Laser SLAM navigation, mapping your warehouse autonomously without rails, magnetic strips, or QR codes on the floor. It adapts to your existing layout from day one.' },
  { q: 'What is the difference between an AGV and an AMR?', a: 'AGVs (Automated Guided Vehicles) follow fixed paths using floor markers or rails. AMRs (Autonomous Mobile Robots) like the Robobist P1000 use AI and sensors to navigate dynamically, avoiding obstacles in real-time. AMRs are significantly more flexible, easier to deploy, and require no floor modifications.' },
  { q: 'How much does warehouse automation cost with the Robobist P1000?', a: 'The Robobist P1000 starts from €40,000 per unit. A fully configured unit with all add-ons typically stays under €50,000. Volume discounts apply from 3 units. Use our configurator for an instant estimate.' },
  { q: 'How long does it take to deploy autonomous pallet robots in a warehouse?', a: 'A typical Robobist P1000 deployment takes 1–3 days for initial mapping and configuration. Our team handles full installation covering network infrastructure, WMS integration, and operator training, so you are up and running from week one.' },
  { q: 'Is the Robobist P1000 safe to operate alongside human workers?', a: 'Yes. The Robobist P1000 includes 360° laser protection, 3D obstacle avoidance, emergency stop buttons, sound and light indicators, and a braking distance of ≤30 cm at full speed. It is CE certified and fully compliant with European safety standards for human-robot collaboration.' },
  { q: 'What payload can the Robobist P1000 autonomous pallet truck carry?', a: 'The Robobist P1000 carries up to 1,000 kg (2,204 lbs), suitable for standard Euro pallets and industrial loads. It handles both open and closed pallet types and operates from 0°C to 50°C.' },
  { q: 'How long does the battery last and how is it charged?', a: 'The 48V / 36Ah LiFePO4 battery lasts up to 8 hours per charge — a full shift. It charges from 10% to 80% in 1.5 hours and supports both manual and automatic charging, allowing opportunity charging during breaks.' },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: schemaFaqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  const t = useT()

  return (
    <section className="bg-white grain py-[120px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3">FAQ</p>
          <h2>{t.faq.h2}</h2>
        </div>
        <div className="space-y-3">
          {(t.faq.items as unknown as { q: string; a: string }[]).map((faq, i) => (
            <div key={i} className="border border-[#E8E8E8] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="text-[16px] font-semibold">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-[#F36D21] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="px-6 pb-5 text-[15px] text-[#545554] leading-[1.7]">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
