import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply — Robobist Careers',
  description: 'Submit your application to join the Robobist team.',
  robots: { index: false },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
