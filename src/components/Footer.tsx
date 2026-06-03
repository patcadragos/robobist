'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useT, useLanguage } from '@/contexts/LanguageContext'

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/>
    </svg>
  )
}

export default function Footer() {
  const t = useT()
  const { locale } = useLanguage()

  const navItems = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/product`, label: t.nav.product },
    { href: `/${locale}/configurator`, label: t.nav.configurator },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + tagline */}
          <div className="space-y-5">
            <Image src="/ROBOBIST/logo-alb.png" alt="Robobist" width={140} height={36} className="h-8 w-auto object-contain" />
            <p className="text-[14px] text-[#888] leading-relaxed">{t.footer.tagline}</p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#888] mb-4">{t.footer.navHeader}</h4>
            <ul className="space-y-3">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[14px] text-[#888] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#888] mb-4">{t.footer.companyHeader}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/about`} className="text-[14px] text-[#888] hover:text-white transition-colors">{t.footer.aboutUs}</Link></li>
              <li>
                <a
                  href="https://flacara-electric.ro/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#888] hover:text-white transition-colors"
                >
                  Partner — Flacăra Electric
                </a>
              </li>
              <li><Link href={`/${locale}/careers`} className="text-[14px] text-[#888] hover:text-white transition-colors">{t.footer.careers}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#888] mb-4">{t.footer.contactHeader}</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@robobist.com" className="text-[14px] text-[#888] hover:text-[#F36D21] transition-colors">
                  contact@robobist.com
                </a>
              </li>
              <li className="text-[14px] text-[#888]">{t.footer.location}</li>
              <li>
                <a
                  href="https://flacara-electric.ro/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#888] hover:text-[#F36D21] transition-colors"
                >
                  flacara-electric.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col items-center gap-3 text-[13px] text-[#888] sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-1">
            <span>{t.footer.copyright}</span>
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline mx-1">|</span>
              <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t.footer.privacy}</Link>
              <span className="mx-1">|</span>
              <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t.footer.terms}</Link>
            </div>
          </div>
          <span>{t.footer.partnership}</span>
        </div>
      </div>
    </footer>
  )
}
