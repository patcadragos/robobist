import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Robobist | Autonomous Pallet Robotics',
  description: 'The Robobist RPT-1000 handles 1,000 kg payloads with AI navigation — zero infrastructure changes required.',
  keywords: 'autonomous pallet truck, warehouse robotics, AMR, SLAM navigation, Robobist RPT-1000',
  openGraph: {
    title: 'Robobist | Autonomous Pallet Robotics',
    description: 'The Robobist RPT-1000 handles 1,000 kg payloads with AI navigation — zero infrastructure changes required.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
