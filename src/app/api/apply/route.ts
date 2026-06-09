import { put } from '@vercel/blob'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const NOTIFY_EMAIL = process.env.CAREERS_NOTIFY_EMAIL ?? 'dragospatca@gmail.com'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const form = await req.formData()

    const firstName = form.get('firstName') as string
    const lastName = form.get('lastName') as string
    const email = form.get('email') as string
    const phone = (form.get('phone') as string) || ''
    const position = (form.get('position') as string) || 'Spontaneous Application'
    const message = (form.get('message') as string) || ''
    const cvFile = form.get('cv') as File | null

    if (!firstName || !lastName || !email || !cvFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (cvFile.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'CV file must be under 10 MB' }, { status: 400 })
    }

    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(cvFile.type)) {
      return NextResponse.json({ error: 'CV must be a PDF or Word document' }, { status: 400 })
    }

    const ext = cvFile.name.split('.').pop()
    const blobPath = `careers/${Date.now()}-${firstName}-${lastName}.${ext}`
    const blob = await put(blobPath, cvFile, { access: 'public' })

    await resend.emails.send({
      from: 'Robobist Careers <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Application: ${position} — ${firstName} ${lastName}`,
      html: `
        <style>
          @media (prefers-color-scheme: dark) {
            .logo-dark { display: none !important; }
            .logo-light { display: block !important; }
          }
        </style>
        <div style="font-family:sans-serif;max-width:600px">
        <div style="border-bottom:3px solid #F36D21;padding:16px 0 14px;margin-bottom:24px">
          <img class="logo-dark" src="https://robobist.com/ROBOBIST/logo-negru.png" alt="Robobist" height="26" style="display:block" />
          <img class="logo-light" src="https://robobist.com/ROBOBIST/logo-alb.png" alt="Robobist" height="26" style="display:none" />
        </div>
        <h2 style="font-family:sans-serif;margin:0 0 20px">New job application received</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;color:#888;width:140px">Position</td><td style="padding:6px 0;font-weight:600">${position}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Name</td><td style="padding:6px 0">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#888">Phone</td><td style="padding:6px 0">${phone}</td></tr>` : ''}
          ${message ? `<tr><td style="padding:6px 0;color:#888;vertical-align:top">Message</td><td style="padding:6px 0">${message.replace(/\n/g, '<br>')}</td></tr>` : ''}
        </table>
        <div style="margin:24px 0;padding:16px;background:#F5F5F5;border-radius:8px;font-family:sans-serif;font-size:14px">
          <strong>CV / Resume:</strong><br>
          <a href="${blob.url}" style="color:#F36D21">${cvFile.name}</a>
        </div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:32px">Sent from robobist.com careers form</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Apply API error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
