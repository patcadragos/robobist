import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { calculatePrice, fmt, type ConfiguratorState } from '@/lib/pricing'

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? 'dragospatca@gmail.com'

function row(label: string, value: string) {
  return `<tr><td style="padding:5px 0;color:#888;width:180px;font-size:14px">${label}</td><td style="padding:5px 0;font-size:14px">${value}</td></tr>`
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body: Partial<ConfiguratorState> = await req.json()
    const { first_name, last_name, email, company, phone, country, job_title, how_heard } = body

    if (!first_name || !last_name || !email || !company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const price = calculatePrice(body)
    const units = body.units ?? 1

    const addons = [
      body.obstacle_avoidance && '3D Obstacle Avoidance',
      body.pallet_ai && 'Pallet Recognition AI',
      body.auto_charging && 'Auto Charging Station',
      body.warranty_3y && 'Extended Warranty (3Y)',
      body.custom_fork && `Custom Fork Width${body.custom_fork_mm ? ` (${body.custom_fork_mm}mm)` : ''}`,
      body.co_branding && `Co-branding (${body.company_name || 'custom'})`,
    ].filter(Boolean).join(', ') || 'None'

    const breakdownRows = price.breakdown
      .map(b => `<tr>
        <td style="padding:4px 8px;font-size:13px;color:#545554">${b.label}</td>
        <td style="padding:4px 8px;font-size:13px;text-align:right">€${fmt(b.min)} – €${fmt(b.max)}</td>
      </tr>`)
      .join('')

    const discountNote = price.discount_pct > 0
      ? `<p style="font-size:13px;color:#F36D21;margin:8px 0 0">Volume discount: ${Math.round(price.discount_pct * 100)}% applied</p>`
      : ''

    await resend.emails.send({
      from: 'Robobist Configurator <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New quote request — ${first_name} ${last_name}, ${company} (${units} unit${units > 1 ? 's' : ''})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <div style="border-bottom:3px solid #F36D21;padding:16px 0 14px;margin-bottom:24px">
            <img src="https://robobist.com/ROBOBIST/logo-negru.png" alt="Robobist" height="26" style="display:block" />
          </div>
          <h2 style="margin:0 0 4px">New configurator quote request</h2>
          <p style="margin:0 0 24px;font-size:13px;color:#888">Submitted via robobist.com/configurator</p>

          <h3 style="font-size:15px;margin:0 0 8px;border-bottom:1px solid #E8E8E8;padding-bottom:6px">Contact</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            ${row('Name', `${first_name} ${last_name}`)}
            ${row('Company', `<strong>${company}</strong>`)}
            ${job_title ? row('Job title', job_title) : ''}
            ${row('Email', `<a href="mailto:${email}" style="color:#F36D21">${email}</a>`)}
            ${phone ? row('Phone', phone) : ''}
            ${country ? row('Country', country) : ''}
            ${how_heard ? row('How they heard', how_heard) : ''}
          </table>

          <h3 style="font-size:15px;margin:0 0 8px;border-bottom:1px solid #E8E8E8;padding-bottom:6px">Warehouse profile</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            ${row('Facility type', body.facility_type ?? '')}
            ${row('Floor area', `${body.floor_area?.toLocaleString() ?? '—'} m²`)}
            ${row('Shifts / day', body.shifts ?? '')}
            ${row('Max payload', body.payload ?? '')}
            ${row('Pallets / day', String(body.pallets_per_day ?? '—'))}
            ${row('Pallet types', (body.pallet_types ?? []).join(', '))}
            ${row('Aisle width', body.aisle_width ?? '')}
            ${row('WMS', body.wms ?? '')}
            ${row('Wi-Fi', body.wifi ?? '')}
          </table>

          <h3 style="font-size:15px;margin:0 0 8px;border-bottom:1px solid #E8E8E8;padding-bottom:6px">Configuration</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            ${row('Units', String(units))}
            ${row('Color scheme', body.color_scheme ?? '')}
            ${row('Add-ons', addons)}
          </table>

          <h3 style="font-size:15px;margin:0 0 8px;border-bottom:1px solid #E8E8E8;padding-bottom:6px">Price estimate</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:8px;background:#FAFAFA;border-radius:8px">
            <tr style="background:#F5F5F5"><th style="padding:6px 8px;font-size:12px;text-align:left;color:#888">Item</th><th style="padding:6px 8px;font-size:12px;text-align:right;color:#888">Range (per unit)</th></tr>
            ${breakdownRows}
            <tr style="border-top:2px solid #E8E8E8">
              <td style="padding:8px;font-size:14px;font-weight:700">Total estimate (${units} unit${units > 1 ? 's' : ''})</td>
              <td style="padding:8px;font-size:16px;font-weight:700;text-align:right;color:#F36D21">€${fmt(price.total_min)} – €${fmt(price.total_max)}</td>
            </tr>
          </table>
          ${discountNote}

          <p style="font-size:11px;color:#aaa;margin-top:24px">Hardware estimate only. Installation, WMS integration, and infrastructure are quoted separately.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Quote API error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
