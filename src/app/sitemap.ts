import type { MetadataRoute } from 'next'

const base = 'https://robobist.com'
const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no']

const pages = [
  { path: '',        priority: 1.0, changeFrequency: 'weekly'  as const },
  { path: '/product',       priority: 0.9, changeFrequency: 'weekly'  as const },
  { path: '/configurator',  priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/contact',       priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about',         priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/careers',       priority: 0.6, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap(locale =>
    pages.map(page => ({
      url: `${base}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  )
}
