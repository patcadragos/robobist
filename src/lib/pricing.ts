export const PRICING = {
  base_min: 60_000,
  base_max: 70_000,

  addons: {
    custom_fork_width:     { min: 1_500, max: 2_000 },
    co_branding:           { min: 800,   max: 1_200 },
    obstacle_avoidance_3d: { min: 3_800, max: 4_500 },
    pallet_recognition_ai: { min: 4_500, max: 5_500 },
    auto_charging_station: { min: 6_500, max: 7_500 },
    extended_warranty_3y:  { min: 3_200, max: 3_800 },
    cold_storage_kit:      { min: 2_000, max: 3_000 },
  },

  volume_discounts: [
    { min: 1,  max: 2,  pct: 0    },
    { min: 3,  max: 5,  pct: 0.05 },
    { min: 6,  max: 10, pct: 0.08 },
    { min: 11, max: 99, pct: 0.12 },
  ],
}

export interface ConfiguratorState {
  facility_type: string
  floor_area: number
  shifts: string
  payload: string
  pallets_per_day: number
  pallet_types: string[]
  aisle_width: string
  wms: string
  wifi: string
  units: number
  custom_fork: boolean
  custom_fork_mm?: string
  color_scheme: string
  co_branding: boolean
  company_name?: string
  obstacle_avoidance: boolean
  pallet_ai: boolean
  auto_charging: boolean
  warranty_3y: boolean
  first_name: string
  last_name: string
  company: string
  job_title: string
  email: string
  phone: string
  country: string
  how_heard: string
  privacy: boolean
  updates: boolean
}

export interface PriceResult {
  per_unit_min: number
  per_unit_max: number
  total_min: number
  total_max: number
  discount_pct: number
  breakdown: { label: string; min: number; max: number }[]
}

export function calculatePrice(config: Partial<ConfiguratorState>): PriceResult {
  let unit_min = PRICING.base_min
  let unit_max = PRICING.base_max
  const breakdown: { label: string; min: number; max: number }[] = [
    { label: 'Base RPT-1000', min: unit_min, max: unit_max },
  ]

  if (config.custom_fork) {
    unit_min += PRICING.addons.custom_fork_width.min
    unit_max += PRICING.addons.custom_fork_width.max
    breakdown.push({ label: 'Custom Fork Width', ...PRICING.addons.custom_fork_width })
  }
  if (config.co_branding) {
    unit_min += PRICING.addons.co_branding.min
    unit_max += PRICING.addons.co_branding.max
    const name = config.company_name || 'Your Company'
    breakdown.push({ label: `Co-branding (${name} × Robobist)`, ...PRICING.addons.co_branding })
  }
  if (config.obstacle_avoidance) {
    unit_min += PRICING.addons.obstacle_avoidance_3d.min
    unit_max += PRICING.addons.obstacle_avoidance_3d.max
    breakdown.push({ label: '3D Obstacle Avoidance', ...PRICING.addons.obstacle_avoidance_3d })
  }
  if (config.pallet_ai) {
    unit_min += PRICING.addons.pallet_recognition_ai.min
    unit_max += PRICING.addons.pallet_recognition_ai.max
    breakdown.push({ label: 'Pallet Recognition AI', ...PRICING.addons.pallet_recognition_ai })
  }
  if (config.auto_charging) {
    unit_min += PRICING.addons.auto_charging_station.min
    unit_max += PRICING.addons.auto_charging_station.max
    breakdown.push({ label: 'Auto Charging Station', ...PRICING.addons.auto_charging_station })
  }
  if (config.warranty_3y) {
    unit_min += PRICING.addons.extended_warranty_3y.min
    unit_max += PRICING.addons.extended_warranty_3y.max
    breakdown.push({ label: 'Extended Warranty 3Y', ...PRICING.addons.extended_warranty_3y })
  }
  if (config.facility_type === 'cold_storage') {
    unit_min += PRICING.addons.cold_storage_kit.min
    unit_max += PRICING.addons.cold_storage_kit.max
    breakdown.push({ label: 'Cold Storage Kit', ...PRICING.addons.cold_storage_kit })
  }

  const n = config.units ?? 1
  const disc = PRICING.volume_discounts.find(d => n >= d.min && n <= d.max)
  const discount_pct = disc?.pct ?? 0

  const total_min = Math.round(unit_min * n * (1 - discount_pct))
  const total_max = Math.round(unit_max * n * (1 - discount_pct))

  return { per_unit_min: unit_min, per_unit_max: unit_max, total_min, total_max, discount_pct, breakdown }
}

export function fmt(n: number): string {
  return new Intl.NumberFormat('en-EU').format(n)
}

export function getDiscountLabel(units: number): string {
  if (units >= 11) return '🏷️ -12% volume discount applied'
  if (units >= 6)  return '🏷️ -8% volume discount applied'
  if (units >= 3)  return '🏷️ -5% volume discount applied'
  return 'Standard pricing'
}
