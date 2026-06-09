'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Info, Warehouse, Factory, Snowflake, Package, HelpCircle } from 'lucide-react'
import { calculatePrice, fmt, getDiscountLabel, type PriceResult } from '@/lib/pricing'
import Link from 'next/link'
import { useT, useLanguage } from '@/contexts/LanguageContext'

const TOTAL_STEPS = 5

const contactSchema = z.object({
  first_name: z.string().min(2, 'required'),
  last_name: z.string().min(2, 'required'),
  company: z.string().min(2, 'required'),
  job_title: z.string().optional(),
  email: z.string().email('validEmail'),
  phone: z.string().optional(),
  country: z.string().min(1, 'selectYourCountry'),
  how_heard: z.string().optional(),
  privacy: z.boolean().refine(v => v, 'mustAgreePrivacy'),
  updates: z.boolean().optional(),
})
type ContactData = z.infer<typeof contactSchema>

const facilityIds = ['distribution', 'manufacturing', 'cold_storage', 'ecommerce', 'other'] as const
const facilityIcons: Record<string, React.ElementType> = {
  distribution: Warehouse,
  manufacturing: Factory,
  cold_storage: Snowflake,
  ecommerce: Package,
  other: HelpCircle,
}

const palletIds = ['euro', 'open', 'closed', 'custom'] as const
type PalletId = typeof palletIds[number]

const colorIds = ['white_orange', 'black_orange', 'gray_black', 'custom'] as const
const colorSwatches: Record<string, string[]> = {
  white_orange: ['#fff', '#F36D21'],
  black_orange: ['#111', '#F36D21'],
  gray_black: ['#888', '#111'],
  custom: ['#E8E8E8', '#E8E8E8'],
}

const howHeardIds = ['google', 'linkedin', 'tradeshow', 'referral', 'other'] as const

const countries = [
  'Germany', 'France', 'Netherlands', 'Poland', 'Belgium', 'Italy', 'Austria',
  'Switzerland', 'Spain', 'Czech Republic', 'Sweden', 'Hungary', 'Denmark',
  'Norway', 'Finland', 'Portugal', 'Slovakia', 'Romania', 'United Kingdom',
  'United States', 'Other',
]


interface Config {
  facility_type: string
  floor_area: number
  shifts: string
  payload: string
  pallets_per_day: number
  pallet_types: PalletId[]
  aisle_width: string
  wms: string
  wifi: string
  units: number
  custom_fork: boolean
  custom_fork_mm: string
  color_scheme: string
  co_branding: boolean
  company_name: string
  obstacle_avoidance: boolean
  pallet_ai: boolean
  auto_charging: boolean
  warranty_3y: boolean
}

const defaultConfig: Config = {
  facility_type: '',
  floor_area: 5000,
  shifts: '',
  payload: '',
  pallets_per_day: 300,
  pallet_types: [],
  aisle_width: '',
  wms: '',
  wifi: '',
  units: 1,
  custom_fork: false,
  custom_fork_mm: '',
  color_scheme: 'white_orange',
  co_branding: false,
  company_name: '',
  obstacle_avoidance: false,
  pallet_ai: false,
  auto_charging: false,
  warranty_3y: false,
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const n = i + 1
        const done = step > n
        const active = step === n
        return (
          <div key={n} className="flex items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-semibold border-2 transition-all duration-300 ${
              done ? 'bg-[#F36D21] border-[#F36D21] text-white'
              : active ? 'bg-[#F36D21] border-[#F36D21] text-white'
              : 'bg-white border-[#E8E8E8] text-[#888]'
            }`}>
              {done ? <Check size={16} /> : n}
            </div>
            {n < TOTAL_STEPS && (
              <div className={`w-12 sm:w-16 h-[2px] transition-all duration-300 ${step > n ? 'bg-[#F36D21]' : 'bg-[#E8E8E8]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function SelectCard({ id, label, icon: Icon, selected, onSelect }: { id: string; label: string; icon: React.ElementType; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-200 text-center ${
        selected
          ? 'border-[#F36D21] bg-[rgba(243,109,33,0.06)]'
          : 'border-[#E8E8E8] bg-white hover:border-[#ccc]'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
        selected ? 'bg-[#F36D21]' : 'bg-[#F5F5F5]'
      }`}>
        <Icon size={20} className={selected ? 'text-white' : 'text-[#545554]'} />
      </div>
      <span className="text-[13px] font-medium text-black leading-tight break-words w-full">{label}</span>
    </button>
  )
}

function ToggleGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-5 h-11 rounded-xl text-[14px] font-medium border transition-all duration-200 ${
            value === opt ? 'bg-black text-white border-black' : 'bg-white text-[#545554] border-[#E8E8E8] hover:border-black'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function LivePriceBox({ config, t }: { config: Config; t: ReturnType<typeof useT> }) {
  const result = calculatePrice(config)
  const tc = t.configurator
  return (
    <div className="mt-6 bg-[#F5F5F5] rounded-xl p-5 border border-[#E8E8E8]">
      <div className="text-[12px] font-semibold uppercase tracking-wider text-[#888] mb-3">{tc.liveEstimate}</div>
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <div className="text-[13px] text-[#545554]">{tc.perUnit}</div>
          <div className="text-[20px] font-bold text-black">€{fmt(result.per_unit_min)} – €{fmt(result.per_unit_max)}</div>
        </div>
        <div className="text-right">
          <div className="text-[13px] text-[#545554]">× {config.units} {config.units > 1 ? tc.units : tc.unit}</div>
          <div className="text-[20px] font-bold text-[#F36D21]">€{fmt(result.total_min)} – €{fmt(result.total_max)}</div>
        </div>
      </div>
      {result.discount_pct > 0 && (
        <div className="mt-2 text-[13px] text-[#F36D21] font-medium">
          {tc.volumeDiscount}: -{(result.discount_pct * 100).toFixed(0)}% {tc.applied}
        </div>
      )}
    </div>
  )
}

const sliderStyle = (value: number, min: number, max: number) => ({
  background: `linear-gradient(to right, #F36D21 ${((value - min) / (max - min)) * 100}%, #E8E8E8 ${((value - min) / (max - min)) * 100}%)`
})

const slideVariants = {
  enterForward: { x: 40, opacity: 0 },
  enterBackward: { x: -40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitForward: { x: -40, opacity: 0 },
  exitBackward: { x: 40, opacity: 0 },
}

export default function ConfiguratorPage() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [config, setConfig] = useState<Config>(defaultConfig)
  const [result, setResult] = useState<PriceResult | null>(null)
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const t = useT()
  const { locale } = useLanguage()
  const tc = t.configurator

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema), mode: 'onTouched' })

  const getError = (key: string | undefined) => {
    if (!key) return ''
    if (key === 'required') return tc.required
    if (key === 'validEmail') return tc.validEmail
    if (key === 'selectYourCountry') return tc.selectYourCountry
    if (key === 'mustAgreePrivacy') return tc.mustAgreePrivacy

    return key
  }

  const update = (partial: Partial<Config>) => setConfig(prev => ({ ...prev, ...partial }))

  const togglePalletType = (id: PalletId) => {
    setConfig(prev => ({
      ...prev,
      pallet_types: prev.pallet_types.includes(id)
        ? prev.pallet_types.filter(t => t !== id)
        : [...prev.pallet_types, id],
    }))
  }

  const goNext = () => {
    setDirection('forward')
    setStep(s => Math.min(s + 1, TOTAL_STEPS + 1))
  }
  const goBack = () => {
    setDirection('backward')
    setStep(s => Math.max(s - 1, 1))
  }

  const onSubmit = async (data: ContactData) => {
    const fullConfig = { ...config, ...data }
    const priceResult = calculatePrice(fullConfig)
    setResult(priceResult)
    setContactData(data)
    sessionStorage.setItem('robobist_contact', JSON.stringify(data))
    setDirection('forward')
    setStep(6)
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullConfig),
      })
    } catch {}
  }

  const canContinue = () => {
    if (step === 1) return config.facility_type && config.shifts
    if (step === 2) return config.payload && config.aisle_width && config.pallet_types.length > 0
    if (step === 3) return config.wms && config.wifi
    return true
  }

  return (
    <div className="pt-16 min-h-screen gradient-configurator grain">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-2">{tc.tag}</p>
          <h1 className="text-[clamp(28px,4vw,40px)] mb-2">{tc.h1}</h1>
          <p className="text-[16px] text-[#545554]">{tc.sub}</p>
        </motion.div>

        {step <= TOTAL_STEPS && <ProgressBar step={step} />}

        <div className="bg-white rounded-2xl shadow-xl border border-[#E8E8E8] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial={direction === 'forward' ? 'enterForward' : 'enterBackward'}
              animate="center"
              exit={direction === 'forward' ? 'exitForward' : 'exitBackward'}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-6 sm:p-8"
            >
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[20px] font-semibold mb-1">{tc.step1Title}</h3>
                    <p className="text-[14px] text-[#888]">{tc.step1Sub}</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.facilityQuestion}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {facilityIds.map(id => (
                        <SelectCard
                          key={id}
                          id={id}
                          label={tc.facilityTypes[id]}
                          icon={facilityIcons[id]}
                          selected={config.facility_type === id}
                          onSelect={() => update({ facility_type: id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-medium text-black">{tc.floorArea}</p>
                      <span className="text-[20px] font-bold text-black">{config.floor_area.toLocaleString()} m²</span>
                    </div>
                    <input
                      type="range" min={500} max={50000} step={500} value={config.floor_area}
                      onChange={e => update({ floor_area: Number(e.target.value) })}
                      className="slider"
                      style={sliderStyle(config.floor_area, 500, 50000)}
                    />
                    <div className="flex justify-between text-[12px] text-[#888] mt-1">
                      <span>500 m²</span><span>50,000 m²</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.shiftsPerDay}</p>
                    <ToggleGroup
                      options={['1 Shift', '2 Shifts', '24/7']}
                      value={config.shifts}
                      onChange={v => update({ shifts: v })}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[20px] font-semibold mb-1">{tc.step2Title}</h3>
                    <p className="text-[14px] text-[#888]">{tc.step2Sub}</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.payloadQuestion}</p>
                    <div className="flex flex-wrap gap-2">
                      {['< 500 kg', '500–1,000 kg', '> 1,000 kg'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update({ payload: opt })}
                          className={`relative px-5 h-11 rounded-xl text-[14px] font-medium border transition-all ${
                            config.payload === opt ? 'bg-black text-white border-black' : 'bg-white text-[#545554] border-[#E8E8E8] hover:border-black'
                          }`}
                        >
                          {opt}
                          {opt === '500–1,000 kg' && (
                            <span className="absolute -top-2.5 -right-2 bg-[#F36D21] text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap">Robobist P1000 ✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                    {config.payload === '> 1,000 kg' && (
                      <div className="mt-3 flex items-start gap-2 text-[13px] text-[#F36D21] bg-[#FFF5EF] p-3 rounded-lg border border-[#F36D21]/20">
                        <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                        {tc.payloadWarning}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-medium text-black">{tc.palletsPerDay}</p>
                      <span className="text-[20px] font-bold text-black">{config.pallets_per_day}</span>
                    </div>
                    <input
                      type="range" min={50} max={2000} step={10} value={config.pallets_per_day}
                      onChange={e => update({ pallets_per_day: Number(e.target.value) })}
                      className="slider"
                      style={sliderStyle(config.pallets_per_day, 50, 2000)}
                    />
                    <div className="flex justify-between text-[12px] text-[#888] mt-1">
                      <span>50</span><span>2,000+</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.palletTypesQuestion}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {palletIds.map(id => (
                        <label key={id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E8E8] cursor-pointer hover:border-[#F36D21]/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={config.pallet_types.includes(id)}
                            onChange={() => togglePalletType(id)}
                            className="cb"
                          />
                          <span className="text-[14px] text-black">{tc.palletTypes[id]}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.aisleWidth}</p>
                    <div className="flex flex-wrap gap-2">
                      {['< 1,300mm', '1,300–1,500mm', '1,500–2,000mm', '> 2,000mm'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update({ aisle_width: opt })}
                          className={`px-4 h-11 rounded-xl text-[14px] font-medium border transition-all ${
                            config.aisle_width === opt ? 'bg-black text-white border-black' : 'bg-white text-[#545554] border-[#E8E8E8] hover:border-black'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {config.aisle_width === '< 1,300mm' && (
                      <div className="mt-3 flex items-start gap-2 text-[13px] text-[#F36D21] bg-[#FFF5EF] p-3 rounded-lg border border-[#F36D21]/20">
                        <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                        {tc.aisleWarning}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[20px] font-semibold mb-1">{tc.step3Title}</h3>
                    <p className="text-[14px] text-[#888]">{tc.step3Sub}</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.wmsQuestion}</p>
                    <ToggleGroup
                      options={['Active', 'No WMS', 'Planning']}
                      value={config.wms}
                      onChange={v => update({ wms: v })}
                    />
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.wifiQuestion}</p>
                    <ToggleGroup
                      options={['Full Coverage', 'Partial', 'None']}
                      value={config.wifi}
                      onChange={v => update({ wifi: v })}
                    />
                    {config.wifi === 'None' && (
                      <div className="mt-3 flex items-start gap-2 text-[13px] text-[#545554] bg-[#F5F5F5] p-3 rounded-lg border border-[#E8E8E8]">
                        <Info size={16} className="flex-shrink-0 mt-0.5 text-[#888]" />
                        {tc.wifiWarning}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-medium text-black">{tc.unitsQuestion}</p>
                      <span className="text-[20px] font-bold text-black">{config.units} {config.units > 1 ? tc.units : tc.unit}</span>
                    </div>
                    <input
                      type="range" min={1} max={20} step={1} value={config.units}
                      onChange={e => update({ units: Number(e.target.value) })}
                      className="slider"
                      style={sliderStyle(config.units, 1, 20)}
                    />
                    <div className="flex justify-between text-[12px] text-[#888] mt-1 mb-3">
                      <span>1</span><span>20</span>
                    </div>
                    <div className={`text-[13px] font-medium px-3 py-2 rounded-lg ${config.units >= 3 ? 'text-[#F36D21] bg-[#FFF5EF]' : 'text-[#888] bg-[#F5F5F5]'}`}>
                      {getDiscountLabel(config.units)}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[20px] font-semibold mb-1">{tc.step4Title}</h3>
                    <p className="text-[14px] text-[#888]">{tc.step4Sub}</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.forkWidth}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => update({ custom_fork: false })}
                        className={`px-5 h-11 rounded-xl text-[14px] font-medium border transition-all ${
                          !config.custom_fork ? 'bg-black text-white border-black' : 'bg-white text-[#545554] border-[#E8E8E8] hover:border-black'
                        }`}
                      >{tc.standardFork}</button>
                      <button
                        type="button"
                        onClick={() => update({ custom_fork: true })}
                        className={`px-5 h-11 rounded-xl text-[14px] font-medium border transition-all ${
                          config.custom_fork ? 'bg-black text-white border-black' : 'bg-white text-[#545554] border-[#E8E8E8] hover:border-black'
                        }`}
                      >{tc.customFork}</button>
                      {config.custom_fork && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="mm"
                            value={config.custom_fork_mm}
                            onChange={e => update({ custom_fork_mm: e.target.value })}
                            className="w-24 h-11 border border-[#E8E8E8] rounded-xl px-3 text-[14px] focus:outline-none focus:border-[#F36D21]"
                          />
                          <span className="text-[14px] text-[#888]">mm (+€400–€600)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.colorScheme}</p>
                    <div className="flex flex-wrap gap-3">
                      {colorIds.map(id => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => update({ color_scheme: id })}
                          className={`flex items-center gap-2 px-4 h-11 rounded-xl border-2 transition-all text-[13px] font-medium ${
                            config.color_scheme === id ? 'border-[#F36D21]' : 'border-[#E8E8E8] hover:border-[#ccc]'
                          }`}
                        >
                          <span className="flex gap-0.5">
                            {colorSwatches[id].map((c, i) => (
                              <span key={i} className="w-5 h-5 rounded-full border border-[#E8E8E8]" style={{ background: c }} />
                            ))}
                          </span>
                          {tc.colorOptions[id]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.coBranding}</p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => update({ co_branding: false })}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-[14px] ${
                          !config.co_branding ? 'border-[#F36D21] bg-[rgba(243,109,33,0.04)]' : 'border-[#E8E8E8] hover:border-[#ccc]'
                        }`}
                      >
                        <div className="font-medium">{tc.noBranding}</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => update({ co_branding: true })}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-[14px] ${
                          config.co_branding ? 'border-[#F36D21] bg-[rgba(243,109,33,0.04)]' : 'border-[#E8E8E8] hover:border-[#ccc]'
                        }`}
                      >
                        <div className="font-medium">{tc.withBranding}</div>
                        <div className="text-[12px] text-[#888] mt-0.5">+€200–€350 / unit</div>
                      </button>
                    </div>
                    {config.co_branding && (
                      <div className="mt-3 space-y-2">
                        <input
                          type="text"
                          placeholder={tc.companyNamePlaceholder}
                          value={config.company_name}
                          onChange={e => update({ company_name: e.target.value })}
                          className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21]"
                        />
                        {config.company_name && (
                          <p className="text-[13px] text-[#545554]">
                            {tc.brandingPreview} <strong>{config.company_name} × Robobist</strong>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">{tc.addons}</p>
                    <div className="space-y-2">
                      {([
                        { key: 'obstacle_avoidance', price: '+€700 – €1,000 / unit' },
                        { key: 'pallet_ai', price: '+€900 – €1,200 / unit' },
                        { key: 'auto_charging', price: '+€1,200 – €1,600 / station' },
                        { key: 'warranty_3y', price: '+€500 – €700 / unit' },
                      ] as const).map(addon => (
                        <label key={addon.key} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E8E8E8] cursor-pointer hover:border-[#F36D21]/40 transition-colors">
                          <input
                            type="checkbox"
                            checked={config[addon.key as keyof Config] as boolean}
                            onChange={e => update({ [addon.key]: e.target.checked })}
                            className="cb flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-medium text-black">{tc.addonItems[addon.key]}</div>
                            <div className="text-[12px] text-[#888]">{addon.price}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <LivePriceBox config={config} t={t} />
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <h3 className="text-[20px] font-semibold mb-1">{tc.step5Title}</h3>
                    <p className="text-[14px] text-[#888]">{tc.step5Sub}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.firstName} *</label>
                      <input {...register('first_name')} placeholder="John" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white" />
                      {errors.first_name && <p className="text-[12px] text-red-500 mt-1">{getError(errors.first_name.message)}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.lastName} *</label>
                      <input {...register('last_name')} placeholder="Smith" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white" />
                      {errors.last_name && <p className="text-[12px] text-red-500 mt-1">{getError(errors.last_name.message)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.companyName} *</label>
                      <input {...register('company')} placeholder="Acme Corp" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.company && <p className="text-[12px] text-red-500 mt-1">{getError(errors.company.message)}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.jobTitle}</label>
                      <input {...register('job_title')} placeholder="Operations Manager" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.emailAddress} *</label>
                      <input {...register('email')} type="email" placeholder="john@company.com" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.email && <p className="text-[12px] text-red-500 mt-1">{getError(errors.email.message)}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.phoneNumber}</label>
                      <input {...register('phone')} type="tel" placeholder="+49 30 12345678" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.countryLabel} *</label>
                      <select {...register('country')} className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white">
                        <option value="">{tc.selectCountry}</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.country && <p className="text-[12px] text-red-500 mt-1">{getError(errors.country.message)}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{tc.howHeard}</label>
                      <select {...register('how_heard')} className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white">
                        <option value="">Select...</option>
                        {howHeardIds.map(id => (
                          <option key={id} value={id}>{tc.howHeardOptions[id]}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input {...register('privacy')} type="checkbox" className="cb mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-[#545554]">
                        {tc.privacyText}{' '}
                        <Link href="/privacy" target="_blank" className="text-[#F36D21] hover:underline">{tc.privacyLink}</Link> *
                      </span>
                    </label>
                    {errors.privacy && <p className="text-[12px] text-red-500">{getError(errors.privacy.message)}</p>}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input {...register('updates')} type="checkbox" className="cb mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-[#545554]">{tc.updatesText}</span>
                    </label>
                  </div>

                  <LivePriceBox config={config} t={t} />

                  <button
                    type="submit"
                    className="w-full h-14 bg-[#F36D21] text-white font-semibold text-[16px] rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    {tc.submitBtn}
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

              {/* RESULT */}
              {step === 6 && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={20} className="text-green-600" />
                    </div>
                    <h3 className="text-[20px] font-semibold">{tc.resultTitle}</h3>
                  </div>

                  <div className="bg-[#F5F5F5] rounded-xl p-5 text-[14px] text-[#545554] space-y-1">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span>{tc.facilityLabel} <strong className="text-black">{tc.facilityTypes[config.facility_type as keyof typeof tc.facilityTypes] || config.facility_type}</strong></span>
                      <span>{tc.areaLabel} <strong className="text-black">{config.floor_area.toLocaleString()} m²</strong></span>
                      <span>{tc.shiftsLabel} <strong className="text-black">{config.shifts}</strong></span>
                      <span>{tc.palletsLabel} <strong className="text-black">~{config.pallets_per_day}/day</strong></span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span>{tc.unitsLabel} <strong className="text-black">{config.units}</strong></span>
                      {config.co_branding && config.company_name && (
                        <span>{tc.brandingLabel} <strong className="text-black">{config.company_name} × Robobist</strong></span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#888] mb-3">{tc.priceBreakdown}</h4>
                    <div className="border border-[#E8E8E8] rounded-xl overflow-hidden">
                      <table className="w-full text-[14px]">
                        <tbody>
                          {result.breakdown.map((row, i) => (
                            <tr key={row.label} className={i % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                              <td className="px-5 py-2.5 text-[#545554]">{row.label}</td>
                              <td className="px-5 py-2.5 text-right font-medium text-black tabular-nums">
                                {i === 0 ? '' : '+'}€{fmt(row.min)} – €{fmt(row.max)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-[#FAFAFA] rounded-xl p-5 border border-[#E8E8E8]">
                    <div className="flex justify-between text-[14px] text-[#545554] mb-1">
                      <span>{tc.perUnitSubtotal}</span>
                      <span className="font-medium text-black tabular-nums">€{fmt(result.per_unit_min)} – €{fmt(result.per_unit_max)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-[#545554] mb-1">
                      <span>× {config.units} {config.units > 1 ? tc.units : tc.unit}</span>
                      <span className="font-medium text-black tabular-nums">€{fmt(result.per_unit_min * config.units)} – €{fmt(result.per_unit_max * config.units)}</span>
                    </div>
                    {result.discount_pct > 0 && (
                      <div className="flex justify-between text-[14px] text-[#F36D21] mb-1">
                        <span>{tc.volumeDiscount} (-{(result.discount_pct * 100).toFixed(0)}%)</span>
                        <span className="font-medium tabular-nums">-€{fmt(Math.round(result.per_unit_min * config.units * result.discount_pct))} – -€{fmt(Math.round(result.per_unit_max * config.units * result.discount_pct))}</span>
                      </div>
                    )}
                    <div className="border-t border-[#E8E8E8] mt-3 pt-3 flex justify-between">
                      <span className="font-bold text-[16px] text-black">{tc.totalEstimate}</span>
                      <span className="font-bold text-[20px] text-[#F36D21] tabular-nums">€{fmt(result.total_min)} – €{fmt(result.total_max)}</span>
                    </div>
                    {result.discount_pct > 0 && (
                      <div className="text-[12px] text-[#888] mt-1 text-right">
                        ≈ €{fmt(Math.round(result.total_min / config.units))} – €{fmt(Math.round(result.total_max / config.units))} / unit (after discount)
                      </div>
                    )}
                  </div>

                  <div className="border border-[#E8E8E8] rounded-xl p-5 bg-[#FAFAFA] space-y-3">
                    <p className="text-[13px] font-semibold text-black">Not included in this estimate:</p>
                    <ul className="space-y-1.5 text-[13px] text-[#545554]">
                      <li className="flex items-start gap-2"><span className="text-[#F36D21] mt-0.5">—</span><span><strong className="text-black">WMS integration</strong> — depends on your existing system, API access, and fleet size; scoped during the free consultation</span></li>
                      <li className="flex items-start gap-2"><span className="text-[#F36D21] mt-0.5">—</span><span><strong className="text-black">Network / WiFi infrastructure</strong> — scoped per warehouse size and layout</span></li>
                      <li className="flex items-start gap-2"><span className="text-[#F36D21] mt-0.5">—</span><span><strong className="text-black">Automated doors & gates</strong> — priced per access point and door type</span></li>
                      <li className="flex items-start gap-2"><span className="text-[#F36D21] mt-0.5">—</span><span><strong className="text-black">Installation & commissioning</strong> — scoped per site after a free consultation</span></li>
                    </ul>
                    <p className="text-[12px] text-[#888] pt-1">{tc.disclaimer}</p>
                  </div>

                  <div className="bg-[#F5F5F5] rounded-xl px-5 py-4 flex items-start gap-3">
                    <Check size={18} className="text-[#F36D21] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-semibold text-black mb-0.5">Quote request sent.</p>
                      <p className="text-[13px] text-[#545554]">We have received your configuration and will get back to you within 24 hours with a formal offer.</p>
                    </div>
                  </div>

                  <Link
                    href={`/${locale}`}
                    className="w-full h-12 bg-[#F36D21] text-white font-semibold rounded-xl hover:bg-[#e55e12] transition-all duration-200 text-[15px] flex items-center justify-center"
                  >
                    Back to Home
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          {step <= TOTAL_STEPS && (
            <div className="px-6 sm:px-8 pb-6 flex items-center justify-between border-t border-[#F5F5F5] pt-5">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className={`flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-medium border transition-all ${
                  step === 1 ? 'opacity-0 pointer-events-none' : 'border-[#E8E8E8] text-[#545554] hover:border-black hover:text-black'
                }`}
              >
                <ArrowLeft size={16} />
                {tc.back}
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue()}
                  className={`flex items-center gap-2 h-11 px-7 rounded-xl text-[14px] font-semibold transition-all ${
                    canContinue()
                      ? 'bg-[#F36D21] text-white hover:bg-[#e55e12] hover:scale-[1.02]'
                      : 'bg-[#E8E8E8] text-[#888] cursor-not-allowed'
                  }`}
                >
                  {tc.continue}
                  <ArrowRight size={16} />
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
