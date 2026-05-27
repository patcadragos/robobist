'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { translations, LANGUAGES, type Locale, type Translations } from '@/lib/translations'

interface LanguageContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  languages: typeof LANGUAGES
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  function setLocale(next: Locale) {
    // Replace locale segment: /de/product → /fr/product
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const t = translations[locale] as unknown as Translations

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}

export function useT() {
  return useLanguage().t
}
