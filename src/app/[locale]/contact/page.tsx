'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Globe, Handshake, Check } from 'lucide-react'
import { useT } from '@/contexts/LanguageContext'

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
  'Germany', 'France', 'Netherlands', 'Poland', 'Belgium', 'Italy', 'Austria',
  'Switzerland', 'Spain', 'Czech Republic', 'Sweden', 'Hungary', 'Denmark',
  'Norway', 'Finland', 'Portugal', 'Slovakia', 'Romania', 'United Kingdom',
  'United States', 'Other',
]


const schema = z.object({
  first_name: z.string().min(2, 'required'),
  last_name: z.string().min(2, 'required'),
  company: z.string().min(2, 'required'),
  job_title: z.string().optional(),
  email: z.string().email('validEmail'),
  phone: z.string().optional(),
  country: z.string().min(1, 'selectYourCountry'),
  message: z.string().optional(),
  interested_demo: z.boolean().optional(),
  used_configurator: z.boolean().optional(),
  urgent: z.boolean().optional(),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useT()

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('robobist_contact')
      if (saved) {
        const data = JSON.parse(saved)
        reset({
          first_name: data.first_name ?? '',
          last_name: data.last_name ?? '',
          company: data.company ?? '',
          job_title: data.job_title ?? '',
          email: data.email ?? '',
          phone: data.phone ?? '',
          country: data.country ?? '',
          used_configurator: true,
        })
      }
    } catch {}
  }, [reset])

  const getError = (key: string) => {
    if (key === 'required') return t.contact.required
    if (key === 'validEmail') return t.contact.validEmail
    if (key === 'selectYourCountry') return t.contact.selectYourCountry
    return key
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setSubmitted(true)
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-4">{t.contact.tag}</p>
            <h1 className="mb-6">{t.contact.h2}</h1>
            <p className="text-[17px] text-[#545554] leading-[1.65] mb-10">{t.contact.sub}</p>

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
                <span className="text-[16px] text-[#545554]">{t.contact.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Handshake size={18} className="text-[#F36D21]" />
                </div>
                <span className="text-[16px] text-[#545554]">{t.contact.partnerLabel}</span>
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
                  <h3 className="text-[24px] font-semibold mb-3">{t.contact.successH3}</h3>
                  <p className="text-[16px] text-[#545554]">{t.contact.successP}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.firstName} *</label>
                      <input {...register('first_name')} placeholder="John" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.first_name && <p className="text-[12px] text-red-500 mt-1">{getError(errors.first_name.message ?? '')}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.lastName} *</label>
                      <input {...register('last_name')} placeholder="Smith" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.last_name && <p className="text-[12px] text-red-500 mt-1">{getError(errors.last_name.message ?? '')}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.company} *</label>
                      <input {...register('company')} placeholder="Acme Corp" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.company && <p className="text-[12px] text-red-500 mt-1">{getError(errors.company.message ?? '')}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.jobTitle}</label>
                      <input {...register('job_title')} placeholder="Operations Manager" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.email} *</label>
                      <input {...register('email')} type="email" placeholder="john@company.com" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.email && <p className="text-[12px] text-red-500 mt-1">{getError(errors.email.message ?? '')}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.phone}</label>
                      <input {...register('phone')} type="tel" placeholder="+49 30 12345678" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.country} *</label>
                    <select {...register('country')} className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white">
                      <option value="">{t.contact.selectCountry}</option>
                      {countries.map(c => <option key={c}>{c}</option>)}
                    </select>
                    {errors.country && <p className="text-[12px] text-red-500 mt-1">{getError(errors.country.message ?? '')}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{t.contact.message}</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    {[
                      { name: 'interested_demo', label: t.contact.checkDemo },
                      { name: 'used_configurator', label: t.contact.checkConfigurator },
                      { name: 'urgent', label: t.contact.checkUrgent },
                    ].map(cb => (
                      <label key={cb.name} className="flex items-center gap-3 cursor-pointer">
                        <input
                          {...register(cb.name as keyof FormData)}
                          type="checkbox"
                          className="cb flex-shrink-0"
                        />
                        <span className="text-[14px] text-[#545554]">{cb.label}</span>
                      </label>
                    ))}
                  </div>

                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#F36D21] text-white font-semibold text-[16px] rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : t.contact.submit}
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
