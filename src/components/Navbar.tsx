'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useLanguage, useT } from '@/contexts/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileLangOpen, setMobileLangOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const langRef = useRef<HTMLDivElement>(null)
  const mobileLangRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  const { locale, setLocale, languages } = useLanguage()
  const t = useT()

  const navLinks = [
    { path: '/product', labelKey: 'product' as const },
    { path: '/configurator', labelKey: 'configurator' as const },
    { path: '/about', labelKey: 'about' as const },
    { path: '/contact', labelKey: 'contact' as const },
  ]

  useEffect(() => {
    const activeEl = linkRefs.current[pathname] ?? null
    const nav = navRef.current
    if (!activeEl || !nav) {
      setIndicator(null)
      return
    }
    setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth })
  }, [pathname, locale])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const currentLang = languages.find(l => l.code === locale) ?? languages[0]

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 ${
          scrolled ? 'border-b border-black/[0.08]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/ROBOBIST/logo-negru.png"
                alt="Robobist"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* Center nav */}
            <div ref={navRef} className="relative hidden lg:flex items-center gap-8">
              {navLinks.map(link => {
                const href = `/${locale}${link.path}`
                return (
                  <Link
                    key={link.path}
                    href={href}
                    ref={el => { linkRefs.current[href] = el }}
                    className={`text-[15px] font-medium transition-colors duration-200 pb-1 ${
                      pathname === href ? 'text-black' : 'text-[#545554] hover:text-black'
                    }`}
                  >
                    {t.nav[link.labelKey]}
                  </Link>
                )
              })}
              {indicator && (
                <motion.div
                  className="absolute bottom-0 h-[2px] bg-[#F36D21] pointer-events-none"
                  initial={false}
                  animate={{ left: indicator.left, width: indicator.width }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </div>

            {/* Right: lang + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language selector */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#545554] hover:text-black transition-colors px-2 py-1 rounded-lg hover:bg-black/5"
                >
                  <Globe size={14} />
                  <span>{currentLang.label}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-[#E8E8E8] rounded-xl shadow-lg py-1 min-w-[160px] z-50 max-h-[360px] overflow-y-auto"
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => { setLocale(lang.code); setLangOpen(false) }}
                          className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F5F5F5] transition-colors flex items-center justify-between ${
                            locale === lang.code ? 'text-[#F36D21] font-medium' : 'text-[#545554]'
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className="text-[11px] text-[#999] ml-3">{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href={`/${locale}/configurator`}
                className="bg-[#F36D21] text-white text-[14px] font-600 px-5 h-10 flex items-center rounded-lg hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.02]"
              >
                {t.nav.cta}
              </Link>
            </div>

            {/* Mobile: lang + hamburger */}
            <div className="lg:hidden flex items-center gap-1">
              <div ref={mobileLangRef} className="relative">
                <button
                  onClick={() => setMobileLangOpen(!mobileLangOpen)}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#545554] px-2 py-2 rounded-lg hover:bg-black/5 transition-colors"
                >
                  <Globe size={15} />
                  <span>{currentLang.label}</span>
                  <ChevronDown size={11} className={`transition-transform duration-200 ${mobileLangOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-[#E8E8E8] rounded-xl shadow-lg py-1 min-w-[180px] z-50 max-h-[320px] overflow-y-auto"
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => { setLocale(lang.code); setMobileLangOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F5F5] transition-colors flex items-center justify-between ${
                            locale === lang.code ? 'text-[#F36D21] font-medium' : 'text-[#545554]'
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className="text-[11px] text-[#999] ml-3">{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#E8E8E8]">
                <Image src="/ROBOBIST/logo-negru.png" alt="Robobist" width={120} height={32} className="h-7 w-auto object-contain" />
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-5 flex flex-col gap-1">
                {navLinks.map(link => {
                  const href = `/${locale}${link.path}`
                  return (
                    <Link
                      key={link.path}
                      href={href}
                      className={`py-3 px-4 rounded-lg text-[16px] font-medium transition-colors ${
                        pathname === href
                          ? 'bg-[#F36D21]/10 text-[#F36D21]'
                          : 'text-[#545554] hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      {t.nav[link.labelKey]}
                    </Link>
                  )
                })}
              </nav>
              <div className="p-5 border-t border-[#E8E8E8] flex flex-col gap-3">
                <select
                  value={locale}
                  onChange={e => setLocale(e.target.value as typeof locale)}
                  className="w-full h-10 border border-[#E8E8E8] rounded-lg px-3 text-[13px] text-[#545554] bg-white focus:outline-none focus:border-[#F36D21]"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name} ({lang.label})</option>
                  ))}
                </select>
                <Link
                  href={`/${locale}/configurator`}
                  className="bg-[#F36D21] text-white text-[15px] font-semibold py-3 rounded-lg text-center hover:bg-[#e55e12] transition-colors"
                >
                  {t.nav.cta}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
