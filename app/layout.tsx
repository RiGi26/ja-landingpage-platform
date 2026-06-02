import type { Metadata } from 'next'
import { Syne, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

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
  title: 'Japan Arena Corp — Website & Sistem Bisnis untuk UKM Indonesia',
  description:
    'Buat website bisnis dalam 3 hari. Atau tingkatkan dengan portal klinik, LMS, farmasi, travel siap pakai. Mulai Rp 600.000, tanpa coding.',
  keywords: [
    'website builder indonesia', 'buat website bisnis', 'sistem klinik digital',
    'lms karyawan', 'sistem apotek', 'portal travel rental', 'website murah indonesia',
  ],
  authors: [{ name: 'Japan Arena Corp' }],
  verification: {
    google: 'demIw8L-D7hiN7YrFATE8fJGPbkamQh9K8pu65FYcDI',
  },
  metadataBase: new URL('https://japanarena.com'),
  alternates: { canonical: 'https://japanarena.com' },
  openGraph: {
    title: 'Japan Arena Corp — Website & Sistem Bisnis untuk UKM Indonesia',
    description: 'Website bisnis dalam 3 hari. Portal klinik, LMS, farmasi, travel siap pakai. Mulai Rp 600.000.',
    url: 'https://japanarena.com',
    siteName: 'Japan Arena Corp',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Japan Arena Corp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Japan Arena Corp — Website & Sistem Bisnis UKM Indonesia',
    description: 'Website bisnis dalam 3 hari. Mulai Rp 600.000.',
    images: ['/images/logo-light.jpg'],
  },
  robots: { index: true, follow: true },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Japan Arena Corp',
  url: 'https://japanarena.com',
  logo: 'https://japanarena.com/images/Icon.png',
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
  name: 'Japan Arena Corp',
  url: 'https://japanarena.com',
}

const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Berapa lama website saya selesai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1–3 hari kerja setelah brief dan DP diterima. Konten sederhana selesai lebih cepat. Website dengan fitur custom bisa lebih — kami konfirmasi timeline pasti sebelum mulai.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah saya bisa pakai domain sendiri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya. Kami bantu pointing domain Anda ke sistem kami. Belum punya domain? Bisa pakai subdomain gratis atau kami bantu daftarkan domain baru.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah ada biaya setelah tahun pertama?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya, ada biaya renewal untuk hosting dan maintenance. Jumlahnya sudah tertera di kalkulator sejak awal — tidak ada biaya tersembunyi.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah saya bisa request revisi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya. Revisi konten dan layout minor termasuk dalam paket. Untuk perubahan besar, kami diskusikan estimasi biayanya dulu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah ada kontrak minimum atau bisa cancel kapan saja?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tidak ada kontrak minimum. Untuk portal SaaS bisa cancel kapan saja. Untuk website, hosting berjalan per tahun dan bisa tidak diperpanjang saat jatuh tempo.',
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
