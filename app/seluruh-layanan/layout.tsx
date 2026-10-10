import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website — Webzoka',
  description:
    'Website bisnis dibuatkan oleh Webzoka, mulai Rp600.000. Konsultasikan scope, harga, dan jadwal sebelum pengerjaan dimulai.',
  keywords: [
    'jasa pembuatan website', 'website managed service', 'website bisnis indonesia',
    'harga buat website', 'konsultasi website bisnis',
  ],
  alternates: { canonical: 'https://www.webzoka.com/seluruh-layanan/' },
  openGraph: {
    title: 'Jasa Pembuatan Website — Webzoka',
    description: 'Website bisnis dibuatkan oleh Webzoka, mulai Rp600.000. Konsultasikan scope, harga, dan jadwal sebelum pengerjaan dimulai.',
    url: 'https://www.webzoka.com/seluruh-layanan/',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website — Webzoka',
    description: 'Website bisnis dibuatkan oleh Webzoka, mulai Rp600.000. Konsultasikan scope, harga, dan jadwal sebelum pengerjaan dimulai.',
    images: ['/images/logo-light.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
