'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/product', label: 'Product' },
  { href: '/configurator', label: 'Configurator' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<'EN' | 'RO'>('EN')
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

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
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors duration-200 pb-0.5 ${
                    pathname === link.href
                      ? 'text-black border-b-2 border-[#F36D21]'
                      : 'text-[#545554] hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: lang + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-1 text-[13px] font-medium">
                <button
                  onClick={() => setLang('EN')}
                  className={`px-2 py-1 rounded transition-colors ${lang === 'EN' ? 'text-black' : 'text-[#999] hover:text-black'}`}
                >EN</button>
                <span className="text-[#ccc]">/</span>
                <button
                  onClick={() => setLang('RO')}
                  className={`px-2 py-1 rounded transition-colors ${lang === 'RO' ? 'text-black' : 'text-[#999] hover:text-black'}`}
                >RO</button>
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
                <div className="flex items-center gap-2 text-[13px] font-medium">
                  <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'text-black' : 'text-[#999]'}>EN</button>
                  <span className="text-[#ccc]">/</span>
                  <button onClick={() => setLang('RO')} className={lang === 'RO' ? 'text-black' : 'text-[#999]'}>RO</button>
                </div>
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
