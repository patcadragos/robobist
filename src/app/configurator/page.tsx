'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Info } from 'lucide-react'
import { calculatePrice, fmt, getDiscountLabel, type PriceResult } from '@/lib/pricing'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TOTAL_STEPS = 5

// Contact form schema
const contactSchema = z.object({
  first_name: z.string().min(2, 'Required'),
  last_name: z.string().min(2, 'Required'),
  company: z.string().min(2, 'Required'),
  job_title: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Please select your country'),
  how_heard: z.string().optional(),
  privacy: z.boolean().refine(v => v, 'You must agree to the Privacy Policy'),
  updates: z.boolean().optional(),
})
type ContactData = z.infer<typeof contactSchema>

const facilityTypes = [
  { id: 'distribution', label: 'Distribution Center', emoji: '🏭' },
  { id: 'manufacturing', label: 'Manufacturing', emoji: '⚙️' },
  { id: 'cold_storage', label: 'Cold Storage', emoji: '❄️' },
  { id: 'ecommerce', label: 'E-commerce', emoji: '📦' },
  { id: 'other', label: 'Other', emoji: '⬜' },
]

const countries = [
  'Romania', 'Germany', 'France', 'Netherlands', 'Belgium', 'Poland', 'Hungary',
  'Austria', 'Switzerland', 'Italy', 'Spain', 'Portugal', 'Czech Republic',
  'Slovakia', 'Sweden', 'Denmark', 'Norway', 'Finland', 'United Kingdom',
  'United States', 'Other',
]

interface Config {
  // Step 1
  facility_type: string
  floor_area: number
  shifts: string
  // Step 2
  payload: string
  pallets_per_day: number
  pallet_types: string[]
  aisle_width: string
  // Step 3
  wms: string
  wifi: string
  units: number
  // Step 4
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

function SelectCard({ id, label, emoji, selected, onSelect }: { id: string; label: string; emoji: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center ${
        selected
          ? 'border-[#F36D21] bg-[rgba(243,109,33,0.06)]'
          : 'border-[#E8E8E8] bg-white hover:border-[#ccc]'
      }`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-[13px] font-medium text-black leading-tight">{label}</span>
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

function LivePriceBox({ config }: { config: Config }) {
  const result = calculatePrice(config)
  return (
    <div className="mt-6 bg-[#F5F5F5] rounded-xl p-5 border border-[#E8E8E8]">
      <div className="text-[12px] font-semibold uppercase tracking-wider text-[#888] mb-3">Live Estimate</div>
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <div className="text-[13px] text-[#545554]">Per unit:</div>
          <div className="text-[20px] font-bold text-black">€{fmt(result.per_unit_min)} – €{fmt(result.per_unit_max)}</div>
        </div>
        <div className="text-right">
          <div className="text-[13px] text-[#545554]">× {config.units} unit{config.units > 1 ? 's' : ''}</div>
          <div className="text-[20px] font-bold text-[#F36D21]">€{fmt(result.total_min)} – €{fmt(result.total_max)}</div>
        </div>
      </div>
      {result.discount_pct > 0 && (
        <div className="mt-2 text-[13px] text-[#F36D21] font-medium">
          Volume discount: -{(result.discount_pct * 100).toFixed(0)}% applied
        </div>
      )}
    </div>
  )
}

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
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) })

  const update = (partial: Partial<Config>) => setConfig(prev => ({ ...prev, ...partial }))

  const togglePalletType = (type: string) => {
    setConfig(prev => ({
      ...prev,
      pallet_types: prev.pallet_types.includes(type)
        ? prev.pallet_types.filter(t => t !== type)
        : [...prev.pallet_types, type],
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

  const onSubmit = (data: ContactData) => {
    const fullConfig = { ...config, ...data }
    const priceResult = calculatePrice(fullConfig)
    setResult(priceResult)
    setDirection('forward')
    setStep(6) // result step
  }

  const canContinue = () => {
    if (step === 1) return config.facility_type && config.shifts
    if (step === 2) return config.payload && config.aisle_width && config.pallet_types.length > 0
    if (step === 3) return config.wms && config.wifi
    if (step === 4) return true
    return true
  }

  return (
    <div className="pt-16 min-h-screen gradient-configurator grain">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#F36D21] mb-2">Configure Your Robot</p>
          <h1 className="text-[clamp(28px,4vw,40px)] mb-2">Get Your Price Estimate</h1>
          <p className="text-[16px] text-[#545554]">Instant calculation — no waiting, no sales calls required.</p>
        </motion.div>

        {step <= TOTAL_STEPS && <ProgressBar step={step} />}

        {/* Card */}
        <div className={`bg-white rounded-2xl shadow-xl border border-[#E8E8E8] overflow-hidden ${step > TOTAL_STEPS ? '' : ''}`}>
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
                    <h3 className="text-[20px] font-semibold mb-1">Warehouse Profile</h3>
                    <p className="text-[14px] text-[#888]">Step 1 of 5 — Tell us about your facility</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">What type of facility do you operate?</p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {facilityTypes.map(f => (
                        <SelectCard
                          key={f.id}
                          id={f.id}
                          label={f.label}
                          emoji={f.emoji}
                          selected={config.facility_type === f.id}
                          onSelect={() => update({ facility_type: f.id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-medium text-black">Warehouse floor area</p>
                      <span className="text-[20px] font-bold text-black">{config.floor_area.toLocaleString()} m²</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={50000}
                      step={500}
                      value={config.floor_area}
                      onChange={e => update({ floor_area: Number(e.target.value) })}
                      className="w-full accent-[#F36D21]"
                    />
                    <div className="flex justify-between text-[12px] text-[#888] mt-1">
                      <span>500 m²</span><span>50,000 m²</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Shifts per day</p>
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
                    <h3 className="text-[20px] font-semibold mb-1">Operations</h3>
                    <p className="text-[14px] text-[#888]">Step 2 of 5 — Your workflow details</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Maximum payload per move?</p>
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
                            <span className="absolute -top-2.5 -right-2 bg-[#F36D21] text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap">RPT-1000 ✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                    {config.payload === '> 1,000 kg' && (
                      <div className="mt-3 flex items-start gap-2 text-[13px] text-[#F36D21] bg-[#FFF5EF] p-3 rounded-lg border border-[#F36D21]/20">
                        <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                        Our current model handles up to 1,000 kg. Contact us for custom solutions.
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-medium text-black">Pallets moved per day</p>
                      <span className="text-[20px] font-bold text-black">{config.pallets_per_day}</span>
                    </div>
                    <input
                      type="range" min={50} max={2000} step={10} value={config.pallets_per_day}
                      onChange={e => update({ pallets_per_day: Number(e.target.value) })}
                      className="w-full accent-[#F36D21]"
                    />
                    <div className="flex justify-between text-[12px] text-[#888] mt-1">
                      <span>50</span><span>2,000+</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Pallet types used (select all that apply)</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Euro Pallet (800×1200)', 'Open Pallet', 'Closed Pallet', 'Custom'].map(t => (
                        <label key={t} className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E8E8] cursor-pointer hover:border-[#F36D21]/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={config.pallet_types.includes(t)}
                            onChange={() => togglePalletType(t)}
                            className="accent-[#F36D21] w-4 h-4"
                          />
                          <span className="text-[14px] text-black">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Minimum aisle width</p>
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
                        The RPT-1000 requires a minimum 1,300mm aisle width.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[20px] font-semibold mb-1">Infrastructure</h3>
                    <p className="text-[14px] text-[#888]">Step 3 of 5 — Your current setup</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Existing WMS?</p>
                    <ToggleGroup
                      options={['✅ Yes, active', '❌ No', '🔄 Planning']}
                      value={config.wms}
                      onChange={v => update({ wms: v })}
                    />
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Wi-Fi coverage?</p>
                    <ToggleGroup
                      options={['Full Coverage', 'Partial', 'None']}
                      value={config.wifi}
                      onChange={v => update({ wifi: v })}
                    />
                    {config.wifi === 'None' && (
                      <div className="mt-3 flex items-start gap-2 text-[13px] text-[#545554] bg-[#F5F5F5] p-3 rounded-lg border border-[#E8E8E8]">
                        <Info size={16} className="flex-shrink-0 mt-0.5 text-[#888]" />
                        Full Wi-Fi coverage is recommended for optimal performance.
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-medium text-black">How many robots do you need?</p>
                      <span className="text-[20px] font-bold text-black">{config.units} unit{config.units > 1 ? 's' : ''}</span>
                    </div>
                    <input
                      type="range" min={1} max={20} step={1} value={config.units}
                      onChange={e => update({ units: Number(e.target.value) })}
                      className="w-full accent-[#F36D21]"
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
                    <h3 className="text-[20px] font-semibold mb-1">Customization</h3>
                    <p className="text-[14px] text-[#888]">Step 4 of 5 — Personalize your robot</p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Fork width</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => update({ custom_fork: false })}
                        className={`px-5 h-11 rounded-xl text-[14px] font-medium border transition-all ${
                          !config.custom_fork ? 'bg-black text-white border-black' : 'bg-white text-[#545554] border-[#E8E8E8] hover:border-black'
                        }`}
                      >Standard 610mm</button>
                      <button
                        type="button"
                        onClick={() => update({ custom_fork: true })}
                        className={`px-5 h-11 rounded-xl text-[14px] font-medium border transition-all ${
                          config.custom_fork ? 'bg-black text-white border-black' : 'bg-white text-[#545554] border-[#E8E8E8] hover:border-black'
                        }`}
                      >Custom width</button>
                      {config.custom_fork && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="mm"
                            value={config.custom_fork_mm}
                            onChange={e => update({ custom_fork_mm: e.target.value })}
                            className="w-24 h-11 border border-[#E8E8E8] rounded-xl px-3 text-[14px] focus:outline-none focus:border-[#F36D21]"
                          />
                          <span className="text-[14px] text-[#888]">mm (+€1,500–€2,000)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Color scheme</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'white_orange', label: 'White + Orange', colors: ['#fff', '#F36D21'] },
                        { id: 'black_orange', label: 'Black + Orange', colors: ['#111', '#F36D21'] },
                        { id: 'gray_black', label: 'Gray + Black', colors: ['#888', '#111'] },
                        { id: 'custom', label: 'Custom Brand', colors: ['#E8E8E8', '#E8E8E8'] },
                      ].map(cs => (
                        <button
                          key={cs.id}
                          type="button"
                          onClick={() => update({ color_scheme: cs.id })}
                          className={`flex items-center gap-2 px-4 h-11 rounded-xl border-2 transition-all text-[13px] font-medium ${
                            config.color_scheme === cs.id ? 'border-[#F36D21]' : 'border-[#E8E8E8] hover:border-[#ccc]'
                          }`}
                        >
                          <span className="flex gap-0.5">
                            {cs.colors.map((c, i) => (
                              <span key={i} className="w-5 h-5 rounded-full border border-[#E8E8E8]" style={{ background: c }} />
                            ))}
                          </span>
                          {cs.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Company co-branding</p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => update({ co_branding: false })}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-[14px] ${
                          !config.co_branding ? 'border-[#F36D21] bg-[rgba(243,109,33,0.04)]' : 'border-[#E8E8E8] hover:border-[#ccc]'
                        }`}
                      >
                        <div className="font-medium">No branding — Standard Robobist</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => update({ co_branding: true })}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-[14px] ${
                          config.co_branding ? 'border-[#F36D21] bg-[rgba(243,109,33,0.04)]' : 'border-[#E8E8E8] hover:border-[#ccc]'
                        }`}
                      >
                        <div className="font-medium">Co-branding: Your Company × Robobist</div>
                        <div className="text-[12px] text-[#888] mt-0.5">+€800–€1,200 / unit</div>
                      </button>
                    </div>
                    {config.co_branding && (
                      <div className="mt-3 space-y-2">
                        <input
                          type="text"
                          placeholder="Your company name"
                          value={config.company_name}
                          onChange={e => update({ company_name: e.target.value })}
                          className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21]"
                        />
                        {config.company_name && (
                          <p className="text-[13px] text-[#545554]">
                            Will appear as: <strong>{config.company_name} × Robobist</strong>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-black mb-3">Optional add-ons</p>
                    <div className="space-y-2">
                      {[
                        { key: 'obstacle_avoidance', label: '3D Obstacle Avoidance', price: '+€3,800 – €4,500 / unit' },
                        { key: 'pallet_ai', label: 'Pallet Recognition AI', price: '+€4,500 – €5,500 / unit' },
                        { key: 'auto_charging', label: 'Automatic Charging Station', price: '+€6,500 – €7,500 / station' },
                        { key: 'warranty_3y', label: 'Extended Warranty (3 years)', price: '+€3,200 – €3,800 / unit' },
                      ].map(addon => (
                        <label key={addon.key} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E8E8E8] cursor-pointer hover:border-[#F36D21]/40 transition-colors">
                          <input
                            type="checkbox"
                            checked={config[addon.key as keyof Config] as boolean}
                            onChange={e => update({ [addon.key]: e.target.checked })}
                            className="accent-[#F36D21] w-4 h-4 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-medium text-black">{addon.label}</div>
                            <div className="text-[12px] text-[#888]">{addon.price}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <LivePriceBox config={config} />
                </div>
              )}

              {/* STEP 5 — Contact details */}
              {step === 5 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <h3 className="text-[20px] font-semibold mb-1">Your Details</h3>
                    <p className="text-[14px] text-[#888]">Step 5 of 5 — We'll send you the official quote</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'first_name', label: 'First Name *', placeholder: 'John' },
                      { name: 'last_name', label: 'Last Name *', placeholder: 'Smith' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-[13px] font-medium text-[#545554] mb-1.5">{f.label}</label>
                        <input
                          {...register(f.name as keyof ContactData)}
                          placeholder={f.placeholder}
                          className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white"
                        />
                        {errors[f.name as keyof ContactData] && (
                          <p className="text-[12px] text-red-500 mt-1">{errors[f.name as keyof ContactData]?.message}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Company Name *</label>
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
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Email Address *</label>
                      <input {...register('email')} type="email" placeholder="john@company.com" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                      {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Phone Number</label>
                      <input {...register('phone')} type="tel" placeholder="+40 700 000 000" className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">Country *</label>
                      <select {...register('country')} className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white">
                        <option value="">Select country</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.country && <p className="text-[12px] text-red-500 mt-1">{errors.country.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#545554] mb-1.5">How did you hear about us?</label>
                      <select {...register('how_heard')} className="w-full h-11 border border-[#E8E8E8] rounded-xl px-4 text-[14px] focus:outline-none focus:border-[#F36D21] transition-colors bg-white">
                        <option value="">Select...</option>
                        <option>Google Search</option>
                        <option>LinkedIn</option>
                        <option>Trade Show</option>
                        <option>Referral</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input {...register('privacy')} type="checkbox" className="accent-[#F36D21] w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-[#545554]">
                        I agree to Robobist&apos;s{' '}
                        <Link href="#" className="text-[#F36D21] hover:underline">Privacy Policy</Link> *
                      </span>
                    </label>
                    {errors.privacy && <p className="text-[12px] text-red-500">{errors.privacy.message}</p>}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input {...register('updates')} type="checkbox" className="accent-[#F36D21] w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-[#545554]">I'd like to receive product updates (optional)</span>
                    </label>
                  </div>

                  <LivePriceBox config={config} />

                  <button
                    type="submit"
                    className="w-full h-14 bg-[#F36D21] text-white font-semibold text-[16px] rounded-xl hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    Calculate My Estimate
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

              {/* RESULT STEP */}
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
                    <h3 className="text-[20px] font-semibold">Your Configuration Summary</h3>
                  </div>

                  {/* Summary */}
                  <div className="bg-[#F5F5F5] rounded-xl p-5 text-[14px] text-[#545554] space-y-1">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span>Facility: <strong className="text-black">{facilityTypes.find(f => f.id === config.facility_type)?.label || config.facility_type}</strong></span>
                      <span>Area: <strong className="text-black">{config.floor_area.toLocaleString()} m²</strong></span>
                      <span>Shifts: <strong className="text-black">{config.shifts}</strong></span>
                      <span>Pallets: <strong className="text-black">~{config.pallets_per_day}/day</strong></span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span>Units: <strong className="text-black">{config.units}</strong></span>
                      {config.co_branding && config.company_name && (
                        <span>Branding: <strong className="text-black">{config.company_name} × Robobist</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div>
                    <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#888] mb-3">Price Breakdown (per unit)</h4>
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

                  {/* Totals */}
                  <div className="bg-[#FAFAFA] rounded-xl p-5 border border-[#E8E8E8]">
                    <div className="flex justify-between text-[14px] text-[#545554] mb-1">
                      <span>Per unit subtotal</span>
                      <span className="font-medium text-black tabular-nums">€{fmt(result.per_unit_min)} – €{fmt(result.per_unit_max)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-[#545554] mb-1">
                      <span>× {config.units} unit{config.units > 1 ? 's' : ''}</span>
                      <span className="font-medium text-black tabular-nums">€{fmt(result.per_unit_min * config.units)} – €{fmt(result.per_unit_max * config.units)}</span>
                    </div>
                    {result.discount_pct > 0 && (
                      <div className="flex justify-between text-[14px] text-[#F36D21] mb-1">
                        <span>Volume discount (-{(result.discount_pct * 100).toFixed(0)}%)</span>
                        <span className="font-medium tabular-nums">-€{fmt(Math.round(result.per_unit_min * config.units * result.discount_pct))} – -€{fmt(Math.round(result.per_unit_max * config.units * result.discount_pct))}</span>
                      </div>
                    )}
                    <div className="border-t border-[#E8E8E8] mt-3 pt-3 flex justify-between">
                      <span className="font-bold text-[16px] text-black">TOTAL ESTIMATE</span>
                      <span className="font-bold text-[20px] text-[#F36D21] tabular-nums">€{fmt(result.total_min)} – €{fmt(result.total_max)}</span>
                    </div>
                    {result.discount_pct > 0 && (
                      <div className="text-[12px] text-[#888] mt-1 text-right">
                        ≈ €{fmt(Math.round(result.total_min / config.units))} – €{fmt(Math.round(result.total_max / config.units))} / unit (after discount)
                      </div>
                    )}
                  </div>

                  <p className="text-[12px] text-[#888]">
                    * This is a preliminary estimate. Final price confirmed in official quotation.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 h-12 bg-[#F36D21] text-white font-semibold rounded-xl flex items-center justify-center text-[15px] hover:bg-[#e55e12] transition-all"
                    >
                      Request Official Quote
                    </Link>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setConfig(defaultConfig); setResult(null) }}
                      className="flex-1 h-12 border border-[#E8E8E8] text-[#545554] font-medium rounded-xl hover:border-black hover:text-black transition-all text-[15px]"
                    >
                      Reconfigure
                    </button>
                  </div>
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
                Back
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
                  Continue
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
