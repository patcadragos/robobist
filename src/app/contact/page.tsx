'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Globe, Handshake, Check } from 'lucide-react'

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/>
    </svg>
  )
}

const countries = [
  'Romania', 'Germany', 'France', 'Netherlands', 'Belgium', 'Poland', 'Hungary',
  'Austria', 'Switzerland', 'Italy', 'Spain', 'Portugal', 'Czech Republic',
  'Slovakia', 'Sweden', 'Denmark', 'Norway', 'Finland', 'United Kingdom',
  'United States', 'Other',
]

const schema = z.object({
  first_name: z.string().min(2, 'Required'),
  last_name: z.string().min(2, 'Required'),
  company: z.string().min(2, 'Required'),
  job_title: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Please select your country'),
  message: z.string().optional(),
  interested_demo: z.boolean().optional(),
  used_configurator: z.boolean().optional(),
  urgent: z.boolean().optional(),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (_data: FormData) => {
    setSubmitted(true)
  }

  return (
    <div className="pt-16 bg-white grain min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-4">Get In Touch</p>
            <h2 className="mb-6">Let&apos;s talk automation.</h2>
            <p className="text-[17px] text-[#545554] leading-[1.65] mb-10">
              Tell us about your warehouse and we&apos;ll get back within 24 hours.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#F36D21]" />
                </div>
                <a href="mailto:contact@robobist.com" className="text-[16px] text-[#545554] hover:text-[#F36D21] transition-colors">
                  contact@robobist.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe size={18} className="text-[#F36D21]" />
                </div>
                <span className="text-[16px] text-[#545554]">Romania — Serving Europe & Beyond</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Handshake size={18} className="text-[#F36D21]" />
                </div>
                <span className="text-[16px] text-[#545554]">In partnership with Flacăra Electric</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center text-[#545554] hover:bg-[#F36D21] hover:text-white transition-all">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center text-[#545554] hover:bg-[#F36D21] hover:text-white transition-all">
                <YouTubeIcon />
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <Check size={28} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-[24px] font-semibold mb-3">Thank you!</h3>
                  <p className="text-[16px] text-[#545554]">We&apos;ll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">First Name *</label>
                      <input {...register('first_name')} placeholder="John" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.first_name && <p className="text-[12px] text-red-500 mt-1">{errors.first_name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Last Name *</label>
                      <input {...register('last_name')} placeholder="Smith" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.last_name && <p className="text-[12px] text-red-500 mt-1">{errors.last_name.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Company *</label>
                      <input {...register('company')} placeholder="Acme Corp" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.company && <p className="text-[12px] text-red-500 mt-1">{errors.company.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Job Title</label>
                      <input {...register('job_title')} placeholder="Operations Manager" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Email *</label>
                      <input {...register('email')} type="email" placeholder="john@company.com" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Phone</label>
                      <input {...register('phone')} type="tel" placeholder="+40 700 000 000" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Country *</label>
                    <select {...register('country')} className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white">
                      <option value="">Select country</option>
                      {countries.map(c => <option key={c}>{c}</option>)}
                    </select>
                    {errors.country && <p className="text-[12px] text-red-500 mt-1">{errors.country.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Message</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your warehouse and what you're looking for..."
                      className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    {[
                      { name: 'interested_demo', label: 'Interested in a demo' },
                      { name: 'used_configurator', label: 'Already used the Configurator' },
                      { name: 'urgent', label: 'Urgent inquiry' },
                    ].map(cb => (
                      <label key={cb.name} className="flex items-center gap-3 cursor-pointer">
                        <input
                          {...register(cb.name as keyof FormData)}
                          type="checkbox"
                          className="accent-[#F36D21] w-4 h-4 flex-shrink-0"
                        />
                        <span className="text-[14px] text-[#545554]">{cb.label}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#F36D21] text-white font-semibold text-[16px] rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.01]"
                  >
                    Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
