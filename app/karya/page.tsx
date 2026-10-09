import type { Metadata } from 'next'
import V43Shell from '@/components/v43/V43Shell'
import Portfolio from '@/components/v43/Portfolio'
import '@/components/v43/v43.css'

export const metadata: Metadata = {
  title: 'Karya — Webzoka',
  description: 'Jelajahi produk kami dan contoh tampilan website. Setiap karya punya kebutuhan dan karakter sendiri.',
  alternates: { canonical: 'https://www.webzoka.com/karya/' },
  openGraph: {
    title: 'Karya — Webzoka',
    description: 'Karya yang bisa kamu lihat. Produk Webzoka dan contoh tampilan website.',
    url: 'https://www.webzoka.com/karya/',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
}

export default function WorkPage() {
  return <V43Shell page="work"><Portfolio /></V43Shell>
}
