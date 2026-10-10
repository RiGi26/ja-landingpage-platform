import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Syne } from 'next/font/google'
import './globals.css'
import RefCapture from './RefCapture'
import AnalyticsConsent from '@/components/AnalyticsConsent'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Webzoka — Website untuk ditemukan. Sistem untuk operasional jalan.',
  description:
    'Website dan Portal SaaS untuk kebutuhan bisnis Indonesia. Website mulai Rp600k; scope, biaya, dan jadwal dikonfirmasi melalui konsultasi sebelum pengerjaan dimulai.',
  keywords: [
    'jasa pembuatan website', 'website bisnis indonesia', 'website managed service',
    'portal saas', 'sistem operasional bisnis', 'website dan portal',
  ],
  authors: [{ name: 'Webzoka' }],
  verification: {
    google: 'demIw8L-D7hiN7YrFATE8fJGPbkamQh9K8pu65FYcDI',
  },
  metadataBase: new URL('https://www.webzoka.com'),
  alternates: { canonical: 'https://www.webzoka.com' },
  openGraph: {
    title: 'Webzoka — Website untuk ditemukan. Sistem untuk operasional jalan.',
    description: 'Website dan Portal SaaS untuk kebutuhan bisnis Indonesia. Website mulai Rp600k; scope, biaya, dan jadwal dikonfirmasi melalui konsultasi sebelum pengerjaan dimulai.',
    url: 'https://www.webzoka.com',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webzoka — Website untuk ditemukan. Sistem untuk operasional jalan.',
    description: 'Website dan Portal SaaS untuk kebutuhan bisnis Indonesia. Website mulai Rp600k; scope, biaya, dan jadwal dikonfirmasi melalui konsultasi sebelum pengerjaan dimulai.',
    images: ['/images/logo-light.jpg'],
  },
  robots: { index: true, follow: true },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Webzoka',
  url: 'https://www.webzoka.com',
  logo: 'https://www.webzoka.com/images/Icon.png',
  description: 'Penyedia website bisnis dan portal sistem operasional untuk UKM Indonesia.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Indonesian',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Webzoka',
  url: 'https://www.webzoka.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      {/* #app-shell membungkus konten halaman. Dialog/sheet di-portal ke <body>
          sehingga jadi sibling shell ini — useDialogA11y men-`inert` shell saat
          dialog terbuka tanpa ikut menonaktifkan dialog-nya. */}
      <body className="antialiased">
        <RefCapture />
        <div id="app-shell">{children}</div>
        <AnalyticsConsent />
      </body>
    </html>
  )
}
