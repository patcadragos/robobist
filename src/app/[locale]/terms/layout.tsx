import type { Metadata } from 'next'

const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no']

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  return {
    title: 'Terms of Use | Robobist',
    description: 'Terms of Use for the Robobist website. Read about acceptable use, intellectual property, disclaimers, and governing law for robobist.com.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://robobist.com/${locale}/terms`,
      languages: Object.fromEntries(locales.map(l => [l, `https://robobist.com/${l}/terms`])),
    },
  }
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
