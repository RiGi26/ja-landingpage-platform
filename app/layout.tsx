import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Syne } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import RefCapture from './RefCapture'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()

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
    'Website dan sistem untuk bantu bisnis tampil online dan lebih mudah dikelola. Mulai Rp600k, target peluncuran 3–5 hari untuk kebutuhan yang siap direview, dengan perpanjangan transparan.',
  keywords: [
    'website builder indonesia', 'buat website bisnis', 'sistem klinik digital',
    'lms karyawan', 'sistem apotek', 'portal travel rental', 'website murah indonesia',
  ],
  authors: [{ name: 'Webzoka' }],
  verification: {
    google: 'demIw8L-D7hiN7YrFATE8fJGPbkamQh9K8pu65FYcDI',
  },
  metadataBase: new URL('https://www.webzoka.com'),
  alternates: { canonical: 'https://www.webzoka.com' },
  openGraph: {
    title: 'Webzoka — Website untuk ditemukan. Sistem untuk operasional jalan.',
    description: 'Website dan sistem untuk bantu bisnis tampil online dan lebih mudah dikelola. Mulai Rp600k, target peluncuran 3–5 hari untuk kebutuhan siap direview.',
    url: 'https://www.webzoka.com',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webzoka — Website untuk ditemukan. Sistem untuk operasional jalan.',
    description: 'Website untuk ditemukan. Sistem untuk operasional jalan. Mulai Rp600k.',
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
        {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      </body>
    </html>
  )
}
