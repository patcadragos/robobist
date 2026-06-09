import type { Metadata } from 'next'

const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no']

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: 'Privacy Policy | Robobist',
    description: 'Privacy Policy for Robobist. Learn how we collect, use, and protect your personal data in compliance with GDPR and EU law.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://robobist.com/${locale}/privacy`,
      languages: Object.fromEntries(locales.map(l => [l, `https://robobist.com/${l}/privacy`])),
    },
  }
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
