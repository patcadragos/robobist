'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/product', label: 'Product' },
  { href: '/configurator', label: 'Configurator' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ro', label: 'RO', name: 'Română' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'pl', label: 'PL', name: 'Polski' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'cs', label: 'CS', name: 'Čeština' },
  { code: 'hu', label: 'HU', name: 'Magyar' },
  { code: 'sv', label: 'SV', name: 'Svenska' },
  { code: 'da', label: 'DA', name: 'Dansk' },
  { code: 'fi', label: 'FI', name: 'Suomi' },
  { code: 'no', label: 'NO', name: 'Norsk' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('en')
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const langRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const activeEl = linkRefs.current[pathname]
    const nav = navRef.current
    if (!activeEl || !nav) return
    setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/)
    if (match) setSelectedLang(match[1])
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const changeLanguage = (code: string) => {
    setSelectedLang(code)
    setLangOpen(false)
    const exp = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
    if (code === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${location.hostname}`
    } else {
      document.cookie = `googtrans=/en/${code}; expires=${exp}; path=/`
      document.cookie = `googtrans=/en/${code}; expires=${exp}; path=/; domain=.${location.hostname}`
    }
    location.reload()
  }

  const currentLang = LANGUAGES.find(l => l.code === selectedLang) ?? LANGUAGES[0]

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
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
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
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={el => { linkRefs.current[link.href] = el }}
                  className={`text-[15px] font-medium transition-colors duration-200 pb-1 ${
                    pathname === link.href ? 'text-black' : 'text-[#545554] hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F5F5F5] transition-colors flex items-center justify-between ${
                            selectedLang === lang.code ? 'text-[#F36D21] font-medium' : 'text-[#545554]'
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
                href="/configurator"
                className="bg-[#F36D21] text-white text-[14px] font-600 px-5 h-10 flex items-center rounded-lg hover:bg-[#e55e12] transition-all duration-200 hover:scale-[1.02]"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
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
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-3 px-4 rounded-lg text-[16px] font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-[#F36D21]/10 text-[#F36D21]'
                        : 'text-[#545554] hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="p-5 border-t border-[#E8E8E8] flex flex-col gap-3">
                <select
                  value={selectedLang}
                  onChange={e => changeLanguage(e.target.value)}
                  className="w-full h-10 border border-[#E8E8E8] rounded-lg px-3 text-[13px] text-[#545554] bg-white focus:outline-none focus:border-[#F36D21]"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name} ({lang.label})</option>
                  ))}
                </select>
                <Link
                  href="/configurator"
                  className="bg-[#F36D21] text-white text-[15px] font-semibold py-3 rounded-lg text-center hover:bg-[#e55e12] transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
