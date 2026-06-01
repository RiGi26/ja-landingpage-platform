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
  title: 'Japan Arena Corp — Satu Ekosistem Digital untuk Bisnis Anda',
  description:
    'Sistem operasional terintegrasi untuk LMS, Klinik, Farmasi, Jastip, Travel, dan Website Custom. Setup 1–3 hari, tanpa coding.',
  openGraph: {
    title: 'Japan Arena Corp — Otomasi Bisnis Tanpa Ribet',
    description: 'Setup 1–3 hari, langsung operasional.',
    url: 'https://japanarenacorp.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  )
}
