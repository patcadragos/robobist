'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, ArrowLeft, X, FileText } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ApplyPage() {
  const { locale } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const positionFromQuery = params?.get('position') ?? ''

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: positionFromQuery || 'Spontaneous Application',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleFile(file: File) {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) {
      setError('Please upload a PDF or Word document.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.')
      return
    }
    setError('')
    setCvFile(file)
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!cvFile) e.cv = 'Please attach your CV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setError('')

    const fd = new FormData()
    fd.append('firstName', form.firstName)
    fd.append('lastName', form.lastName)
    fd.append('email', form.email)
    fd.append('phone', form.phone)
    fd.append('position', form.position)
    fd.append('message', form.message)
    fd.append('cv', cvFile!)

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-[#F36D21]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-[#F36D21]" />
          </div>
          <h2 className="text-[28px] font-bold mb-3">Application received.</h2>
          <p className="text-[15px] text-[#545554] leading-[1.7] mb-8">
            Thank you for your interest in joining Robobist. We review every application and will get back to you within a few business days.
          </p>
          <Link
            href={`/${locale}/careers`}
            className="inline-flex items-center gap-2 text-[14px] text-[#F36D21] hover:underline"
          >
            <ArrowLeft size={14} /> Back to Careers
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="hero-bg grain pt-24 pb-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href={`/${locale}/careers`} className="inline-flex items-center gap-1.5 text-[13px] text-[#888] hover:text-black transition-colors mb-8">
            <ArrowLeft size={13} /> Careers
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-3"
          >
            Apply
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.02em] text-black"
          >
            {form.position}
          </motion.h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        <form onSubmit={handleSubmit} noValidate className="space-y-7">

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-medium text-black mb-1.5">First name <span className="text-[#F36D21]">*</span></label>
              <input
                type="text"
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] outline-none transition-colors focus:border-black ${errors.firstName ? 'border-red-400' : 'border-[#E8E8E8]'}`}
                placeholder="Jane"
              />
              {errors.firstName && <p className="text-[12px] text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black mb-1.5">Last name <span className="text-[#F36D21]">*</span></label>
              <input
                type="text"
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] outline-none transition-colors focus:border-black ${errors.lastName ? 'border-red-400' : 'border-[#E8E8E8]'}`}
                placeholder="Smith"
              />
              {errors.lastName && <p className="text-[12px] text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-medium text-black mb-1.5">Email address <span className="text-[#F36D21]">*</span></label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] outline-none transition-colors focus:border-black ${errors.email ? 'border-red-400' : 'border-[#E8E8E8]'}`}
                placeholder="jane@company.com"
              />
              {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black mb-1.5">Phone <span className="text-[13px] text-[#888] font-normal">(optional)</span></label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] outline-none transition-colors focus:border-black"
                placeholder="+49 123 456 7890"
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="block text-[13px] font-medium text-black mb-1.5">Applying for</label>
            <input
              type="text"
              value={form.position}
              onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
              className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] outline-none transition-colors focus:border-black"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-[13px] font-medium text-black mb-1.5">
              Cover note <span className="text-[13px] text-[#888] font-normal">(optional)</span>
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] outline-none transition-colors focus:border-black resize-none"
              placeholder="Tell us briefly who you are and what you bring..."
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-[13px] font-medium text-black mb-1.5">
              CV / Resume <span className="text-[#F36D21]">*</span>
            </label>

            {cvFile ? (
              <div className="flex items-center gap-3 border border-[#E8E8E8] rounded-xl px-4 py-3.5">
                <FileText size={18} className="text-[#F36D21] flex-shrink-0" />
                <span className="text-[14px] flex-1 truncate">{cvFile.name}</span>
                <span className="text-[12px] text-[#888]">{(cvFile.size / 1024 / 1024).toFixed(1)} MB</span>
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="text-[#888] hover:text-black transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => {
                  e.preventDefault()
                  setDragOver(false)
                  const file = e.dataTransfer.files[0]
                  if (file) handleFile(file)
                }}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl px-6 py-10 text-center cursor-pointer transition-colors ${
                  dragOver ? 'border-[#F36D21] bg-[#F36D21]/5' : errors.cv ? 'border-red-300' : 'border-[#E8E8E8] hover:border-[#999]'
                }`}
              >
                <Upload size={24} className="mx-auto mb-3 text-[#888]" />
                <p className="text-[14px] font-medium text-black mb-1">Drop your CV here, or click to browse</p>
                <p className="text-[12px] text-[#888]">PDF or Word document, max 10 MB</p>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
            />
            {errors.cv && <p className="text-[12px] text-red-500 mt-1.5">{errors.cv}</p>}
          </div>

          {/* Server error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#F36D21] text-white font-semibold text-[15px] px-6 py-4 rounded-xl hover:bg-[#e55e12] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Submit Application'}
          </button>

          <p className="text-[12px] text-[#888] text-center">
            Your information is handled confidentially and used only for this application.
          </p>

        </form>
      </div>
    </div>
  )
}
