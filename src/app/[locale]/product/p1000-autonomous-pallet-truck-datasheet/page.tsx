'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const features = [
  {
    title: 'Compatible with Various Pallets',
    body: 'Handles open pallets, closed pallets, and custom formats. No pallet left behind — worry-free handling across your entire fleet.',
  },
  {
    title: '1,200 mm Slim Body, 1T Load Capacity',
    body: 'Ultra-slim 1,200 mm vehicle width with a rated load capacity of 1,000 kg. Minimum aisle width of just 1,300 mm for smooth passage in narrow aisles.',
  },
  {
    title: 'AI Deep Learning — Multi-Carrier Recognition',
    body: 'Recognizes pallets in various specifications, different colors, wrapped or damaged pallets, and racks. Adaptive multi-angle recognition with high-precision loading.',
  },
  {
    title: '4 Navigation Options, ±10 mm Accuracy',
    body: 'Supports SLAM, reflector, NFL, and hybrid navigation. Repeat positioning accuracy up to ±10 mm — covering all warehouse navigation scenarios.',
  },
  {
    title: 'Flexible Customization — 4 Options',
    body: 'Fork width, vehicle height, color scheme, and co-branding. Fully adaptable to your warehouse standards and corporate identity.',
  },
]

const specGroups = [
  {
    label: 'Basic Parameters',
    rows: [
      ['Product Model', 'Robobist P1000'],
      ['Product Series', 'P-Series — Autonomous Pallet Trucks'],
      ['Operation Type', 'Automatic Navigation'],
      ['Navigation Type', 'Laser SLAM'],
      ['Pallet Type', 'Open Pallet / Closed Pallet'],
      ['Rated Load Capacity', '1,000 kg'],
      ['Load Center Distance', '100 mm'],
      ['Weight (with battery)', '450 kg'],
      ['Standard Lifting Height', '190 mm'],
      ['Forklift Dimensions L×W×H', '1,450 × 1,200 × 556 mm'],
      ['Fork Dimensions L×W×H', '1,220 × 168 × 60 mm'],
      ['Fork Outer Width', '610 mm'],
      ['Minimum Turning Radius', '900 mm'],
      ['Ambient Temp / Humidity', '0°C – 50°C / 10–90% RH'],
    ],
  },
  {
    label: 'Performance',
    rows: [
      ['Driving Speed (Full & No Load)', '1.1 m/s'],
      ['Passability (Slope / Step / Gap)', '< 3% / 5 mm / 10 mm'],
      ['Navigation Position Accuracy', '±10 mm'],
      ['Navigation Angle Accuracy', '±1°'],
    ],
  },
  {
    label: 'Battery',
    rows: [
      ['Battery Specifications', '48V / 36Ah  LiFePO4'],
      ['Battery Life', '8 hours'],
      ['Charging Time (10% → 80%)', '1.5 hours'],
      ['Charging Method', 'Manual / Automatic'],
    ],
  },
  {
    label: 'Function Configurations',
    rows: [
      ['Lidar', '1× H1E0 / Mid-360  +  4× C213'],
      ['Wi-Fi Roaming', '● Standard'],
      ['3D Obstacle Avoidance', '○ Optional'],
      ['Pallet Recognition AI', '○ Optional'],
      ['HMI Display', '● Standard'],
      ['E-Stop Button', '● Standard'],
      ['Sound & Light Indicator', '● Standard'],
    ],
  },
  {
    label: 'Safety',
    rows: [
      ['Braking Distance at 1.0 m/s', '≤ 30 cm'],
      ['Braking Distance at 1.5 m/s', '≤ 50 cm'],
      ['360° Laser Protection', '● Standard'],
      ['Bumper Strip', '○ Optional'],
      ['Fork Height Protection', '● Standard'],
    ],
  },
]

export default function DatasheetPage() {
  const { locale } = useLanguage()

  useEffect(() => {
    const nav = document.querySelector('nav') as HTMLElement | null
    const footer = document.querySelector('footer') as HTMLElement | null
    if (nav) nav.style.setProperty('display', 'none', 'important')
    if (footer) footer.style.setProperty('display', 'none', 'important')
    return () => {
      if (nav) nav.style.removeProperty('display')
      if (footer) footer.style.removeProperty('display')
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #e5e5e5; padding: 0 !important; margin: 0 !important; }
        main { padding: 0 !important; margin: 0 !important; }

        .ds-page {
          width: 210mm;
          height: 297mm;
          background: #fff;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .ds-page + .ds-page { margin-top: 24px; }

        .no-print { position: fixed; bottom: 32px; right: 32px; z-index: 100; }

        @media print {
          body { background: #fff; }
          .no-print { display: none !important; }
          .ds-page {
            width: 210mm;
            height: auto !important;
            overflow: visible !important;
            display: block !important;
            margin: 0 !important;
          }
          .ds-page + .ds-page {
            page-break-before: always;
            break-before: page;
          }
          .ds-page * { overflow: visible !important; }
          .ds-content { min-height: 264mm; }
          .ds-page + .ds-page .ds-content { min-height: 269.5mm; }
          @page { size: A4; margin: 0; }
        }

        .spec-table { width: 100%; border-collapse: collapse; font-size: 7.5pt; }
        .spec-table th {
          background: #F36D21;
          color: #fff;
          text-align: left;
          padding: 4px 8px;
          font-size: 7pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .spec-table td { padding: 3px 8px; vertical-align: middle; line-height: 1.3; }
        .spec-table tr:nth-child(even) td { background: #F5F5F5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .spec-table td:first-child { color: #545554; width: 52%; }
        .spec-table td:last-child { font-weight: 600; color: #000; }

        .ds-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .ds-footer { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>

      {/* ── PAGE 1 ── */}
      <div className="ds-page">

        {/* Header */}
        <div className="ds-header" style={{ background: '#F36D21', padding: '9mm 12mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <Image src="/ROBOBIST/logo-alb.png" alt="Robobist" width={120} height={32} style={{ height: 26, width: 'auto', objectFit: 'contain' }} />
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '9pt', fontWeight: 600, fontFamily: 'Inter,sans-serif', letterSpacing: '0.01em' }}>
            Build your autonomous warehouse — within days.
          </span>
        </div>

        {/* Main content */}
        <div className="ds-content" style={{ flex: 1, overflow: 'hidden' }}>
          {/* Robot hero */}
          <div style={{ background: '#F8F8F8', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6mm 12mm 4mm' }}>
            <Image
              src="/ROBOBIST/RPT-HOMEVIEW.png"
              alt="Robobist P1000"
              width={480}
              height={360}
              style={{ height: 190, width: 'auto', objectFit: 'contain' }}
              priority
            />
          </div>

          {/* Product name block */}
          <div style={{ background: '#fff', padding: '5mm 12mm 4mm', borderBottom: '1px solid #E8E8E8' }}>
            <p style={{ color: '#F36D21', fontSize: '8pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter,sans-serif', marginBottom: 2 }}>
              Robobist P-Series · Autonomous Pallet Truck
            </p>
            <h1 style={{ fontSize: '26pt', fontWeight: 900, color: '#000', fontFamily: 'Inter,sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}>
              P1000
            </h1>
            <p style={{ fontSize: '10pt', fontWeight: 600, color: '#000', fontFamily: 'Inter,sans-serif', marginTop: 3 }}>
              High Compatibility. Fearless of Pallet Types.
            </p>
          </div>

          {/* Feature grid */}
          <div style={{ padding: '5mm 12mm 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4mm' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: '#F36D21', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <span style={{ color: '#fff', fontSize: 9, fontWeight: 900, fontFamily: 'Inter,sans-serif' }}>{i + 1}</span>
                </div>
                <div>
                  <p style={{ fontSize: '8pt', fontWeight: 700, color: '#000', fontFamily: 'Inter,sans-serif', marginBottom: 2, lineHeight: 1.3 }}>{f.title}</p>
                  <p style={{ fontSize: '7pt', color: '#545554', fontFamily: 'Inter,sans-serif', lineHeight: 1.45 }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="ds-footer" style={{ background: '#F36D21', height: '8mm', display: 'flex', alignItems: 'center', padding: '0 12mm', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: '7pt', fontWeight: 600, fontFamily: 'Inter,sans-serif' }}>Robobist P1000 — Product Datasheet</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '7pt', fontFamily: 'Inter,sans-serif' }}>robobist.com</span>
        </div>
      </div>

      {/* ── PAGE 2 ── */}
      <div className="ds-page">

        {/* Header */}
        <div className="ds-header" style={{ background: '#F36D21', padding: '5mm 12mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <Image src="/ROBOBIST/logo-alb.png" alt="Robobist" width={100} height={26} style={{ height: 20, width: 'auto', objectFit: 'contain' }} />
          <span style={{ color: '#fff', fontSize: '8pt', fontWeight: 700, fontFamily: 'Inter,sans-serif' }}>
            P1000 — Technical Specifications
          </span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '7pt', fontFamily: 'Inter,sans-serif' }}>
            ● Standard &nbsp;&nbsp; ○ Optional
          </span>
        </div>

        {/* Main content */}
        <div className="ds-content" style={{ flex: 1, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 86mm', gap: '5mm', padding: '4mm 12mm' }}>

          {/* LEFT: Spec tables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3mm', overflow: 'hidden' }}>
            {specGroups.map(group => (
              <table key={group.label} className="spec-table">
                <thead>
                  <tr><th colSpan={2}>{group.label}</th></tr>
                </thead>
                <tbody>
                  {group.rows.map(([k, v]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>

          {/* RIGHT: Robot images + dimensions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4mm', overflow: 'hidden' }}>
            <div style={{ background: '#F5F5F5', borderRadius: 8, padding: '4mm', display: 'flex', flexDirection: 'column', gap: '3mm' }}>
              <Image
                src="/ROBOBIST/RPT-FRONTVIEW.png"
                alt="Robobist P1000 front"
                width={240}
                height={206}
                style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: 90 }}
              />
              <Image
                src="/ROBOBIST/RPT-SIDEVIEW.png"
                alt="Robobist P1000 side"
                width={240}
                height={206}
                style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: 90 }}
              />
            </div>

            {/* Key dimensions */}
            <div style={{ background: '#F5F5F5', borderRadius: 8, padding: '4mm', fontSize: '7pt', fontFamily: 'Inter,sans-serif' }}>
              <p style={{ fontWeight: 700, color: '#F36D21', marginBottom: 4, fontSize: '7pt', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Dimensions</p>
              {[
                ['Overall L×W×H', '1,450 × 1,200 × 556 mm'],
                ['Fork Length', '1,220 mm'],
                ['Fork Width', '610 mm'],
                ['Fork Height', '60 mm'],
                ['Min. Aisle Width', '1,300 mm'],
                ['Turn Radius', '900 mm'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px solid #E8E8E8' }}>
                  <span style={{ color: '#545554' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: '#000' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ds-footer" style={{ background: '#F36D21', height: '12mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12mm', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: '7.5pt', fontWeight: 600, fontFamily: 'Inter,sans-serif' }}>contact@robobist.com</span>
          <span style={{ color: '#fff', fontSize: '7.5pt', fontWeight: 600, fontFamily: 'Inter,sans-serif' }}>robobist.com</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '7pt', fontFamily: 'Inter,sans-serif' }}>Germany &amp; Romania · Europe</span>
        </div>
      </div>

      {/* Download button */}
      <div className="no-print">
        <a
          href="/ROBOBIST/robobist-p1000-datasheet.pdf"
          download="Robobist P1000 Datasheet.pdf"
          style={{
            display: 'inline-block',
            background: '#F36D21', color: '#fff', borderRadius: 12,
            padding: '12px 28px', fontSize: 15, fontWeight: 700,
            fontFamily: 'Inter,sans-serif', boxShadow: '0 4px 20px rgba(243,109,33,0.4)',
            textDecoration: 'none',
          }}
        >
          Download PDF
        </a>
      </div>

      {/* Back to Product button */}
      <div style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 100 }} className="no-print">
        <Link
          href={`/${locale}/product`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#545554', borderRadius: 12,
            padding: '12px 20px', fontSize: 14, fontWeight: 600,
            fontFamily: 'Inter,sans-serif', border: '1px solid #E8E8E8',
            textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <ArrowLeft size={15} />
          Back to Product
        </Link>
      </div>
    </>
  )
}
