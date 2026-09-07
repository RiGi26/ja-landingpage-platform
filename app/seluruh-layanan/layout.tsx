import type { Metadata } from 'next'
import { SITE_URL } from '@/constants/site'

export const metadata: Metadata = {
  title: 'Kalkulator Harga Website — Transparan Mulai Rp 600.000 | Webzoka',
  description:
    'Pilih template, paket server, dan fitur sesuai kebutuhan bisnis kamu. Harga transparan, tidak ada biaya tersembunyi. Website live 3–5 hari kerja setelah briefing diterima.',
  keywords: [
    'harga buat website', 'kalkulator website indonesia', 'website murah profesional',
    'website bisnis 5 hari', 'buat website toko online', 'website klinik murah',
  ],
  alternates: { canonical: `${SITE_URL}/seluruh-layanan` },
  openGraph: {
    title: 'Kalkulator Harga Website — Mulai Rp 600.000 | Webzoka',
    description: 'Harga transparan, tidak ada biaya tersembunyi. Website live 3–5 hari kerja setelah briefing diterima.',
    url: `${SITE_URL}/seluruh-layanan`,
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
