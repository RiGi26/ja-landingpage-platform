import type { Metadata } from 'next'
import { Newsreader } from 'next/font/google'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-warm-display',
  weight: ['400', '500', '600'],
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'Webzoka Store — Pilih Template untuk Bisnismu',
  description:
    'Mulai dari template yang sesuai dengan bisnis, lihat preview-nya, lalu konsultasikan penyesuaian bersama Webzoka.',
  robots: { index: false, follow: false },
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <div className={newsreader.variable}>{children}</div>
}
