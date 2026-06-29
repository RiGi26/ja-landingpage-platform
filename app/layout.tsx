import type { Metadata } from 'next'
import { Syne, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import RefCapture from './RefCapture'

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
  title: 'Webzoka — Website & Sistem Bisnis untuk UKM Indonesia',
  description:
    'Bikin website bisnis siap pakai (Klinik, LMS, Farmasi, Travel) mulai Rp 600rb. Proses 3–5 hari kerja, terima beres tanpa coding. Cek demonya di sini!',
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
    title: 'Webzoka — Website & Sistem Bisnis untuk UKM Indonesia',
    description: 'Website bisnis dalam 3–5 hari kerja. Portal klinik, LMS, farmasi, travel siap pakai. Mulai Rp 600.000.',
    url: 'https://www.webzoka.com',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webzoka — Website & Sistem Bisnis UKM Indonesia',
    description: 'Website bisnis dalam 3–5 hari kerja. Mulai Rp 600.000.',
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

const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Berapa lama website saya selesai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '3–5 hari kerja setelah data bisnis dan DP diterima. Konten sederhana bisa selesai lebih cepat. Website dengan fitur custom bisa lebih lama — kami konfirmasi timeline pasti sebelum mulai.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah saya bisa pakai domain sendiri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya. Kami bantu pointing domain kamu ke sistem kami. Belum punya domain? Bisa pakai subdomain gratis atau kami bantu daftarkan domain baru.',
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
      {/* #app-shell membungkus konten halaman. Dialog/sheet di-portal ke <body>
          sehingga jadi sibling shell ini — useDialogA11y men-`inert` shell saat
          dialog terbuka tanpa ikut menonaktifkan dialog-nya. */}
      <body className="antialiased"><RefCapture /><div id="app-shell">{children}</div></body>
    </html>
  )
}
