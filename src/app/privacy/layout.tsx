import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Robobist',
  description: 'Privacy Policy for Robobist. Learn how we collect, use, and protect your personal data in compliance with GDPR.',
  robots: { index: false, follow: false },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
