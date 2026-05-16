import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Japan Arena Corp — Sistem Manajemen Bisnis Kursus',
  description:
    'Platform LMS siap pakai untuk bisnis kursus Anda. Portal siswa, invoice otomatis, notifikasi WA, absensi, laporan keuangan.',
  openGraph: {
    title: 'Japan Arena Corp — LMS Siap Pakai',
    description: 'Setup 1–3 hari, langsung jalan.',
    url: 'https://japanarenacorp.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
