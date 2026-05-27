import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? 'dragospatca@gmail.com'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const { first_name, last_name, company, job_title, email, phone, country, message, interested_demo, used_configurator, urgent } = body

    if (!first_name || !last_name || !email || !company || !country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const flags = [
      interested_demo && 'Interested in demo',
      used_configurator && 'Used configurator',
      urgent && 'URGENT',
    ].filter(Boolean).join(' · ')

    await resend.emails.send({
      from: 'Robobist Contact <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `${urgent ? '[URGENT] ' : ''}New enquiry — ${first_name} ${last_name}, ${company}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
        <div style="background:#ffffff;border-bottom:3px solid #F36D21;padding:18px 0 16px;margin-bottom:24px">
          <img src="https://robobist.com/ROBOBIST/logo-negru.png" alt="Robobist" height="28" style="display:block" />
        </div>
        <h2 style="font-family:sans-serif;margin:0 0 20px">New contact enquiry</h2>
        ${flags ? `<p style="font-family:sans-serif;font-size:13px;color:#F36D21;font-weight:600;margin:0 0 20px">${flags}</p>` : ''}
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;color:#888;width:140px">Name</td><td style="padding:6px 0">${first_name} ${last_name}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Company</td><td style="padding:6px 0;font-weight:600">${company}</td></tr>
          ${job_title ? `<tr><td style="padding:6px 0;color:#888">Job title</td><td style="padding:6px 0">${job_title}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#F36D21">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#888">Phone</td><td style="padding:6px 0">${phone}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#888">Country</td><td style="padding:6px 0">${country}</td></tr>
          ${message ? `<tr><td style="padding:6px 0;color:#888;vertical-align:top">Message</td><td style="padding:6px 0">${message.replace(/\n/g, '<br>')}</td></tr>` : ''}
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:32px">Sent from robobist.com contact form</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
