import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator Harga Website — Transparan Mulai Rp 600.000 | Webzoka',
  description:
    'Pilih template, paket server, dan fitur sesuai kebutuhan bisnis Anda. Harga transparan, tidak ada biaya tersembunyi. Website live 3–5 hari kerja setelah briefing diterima.',
  keywords: [
    'harga buat website', 'kalkulator website indonesia', 'website murah profesional',
    'website bisnis 5 hari', 'buat website toko online', 'website klinik murah',
  ],
  alternates: { canonical: 'https://webzoka.com/seluruh-layanan' },
  openGraph: {
    title: 'Kalkulator Harga Website — Mulai Rp 600.000 | Webzoka',
    description: 'Harga transparan, tidak ada biaya tersembunyi. Website live 3–5 hari kerja setelah briefing diterima.',
    url: 'https://webzoka.com/seluruh-layanan',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
