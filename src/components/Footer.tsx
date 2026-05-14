import Link from 'next/link'
import Image from 'next/image'

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
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + tagline */}
          <div className="space-y-5">
            <Image src="/ROBOBIST/logo-alb.png" alt="Robobist" width={140} height={36} className="h-8 w-auto object-contain" />
            <p className="text-[14px] text-[#888] leading-relaxed">
              Autonomous pallet robotics for the modern warehouse. Built for Europe.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="LinkedIn" className="text-[#888] hover:text-[#F36D21] transition-colors">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="YouTube" className="text-[#888] hover:text-[#F36D21] transition-colors">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#888] mb-4">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'Product', 'Configurator', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-[14px] text-[#888] hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#888] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[14px] text-[#888] hover:text-white transition-colors">About Us</Link></li>
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
              <li><Link href="/contact" className="text-[14px] text-[#888] hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#888] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@robobist.com" className="text-[14px] text-[#888] hover:text-[#F36D21] transition-colors">
                  contact@robobist.com
                </a>
              </li>
              <li className="text-[14px] text-[#888]">Based in Romania · Europe</li>
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
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#888]">
          <div className="flex flex-wrap items-center gap-1">
            <span>© 2025 Robobist. All rights reserved.</span>
            <span className="hidden sm:inline mx-2">|</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
          <span>In partnership with Flacăra Electric</span>
        </div>
      </div>
    </footer>
  )
}
