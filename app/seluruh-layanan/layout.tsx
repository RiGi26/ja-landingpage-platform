import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator Harga Website — Transparan Mulai Rp 600.000 | Japan Arena Corp',
  description:
    'Pilih template, paket server, dan fitur sesuai kebutuhan bisnis Anda. Harga transparan, tidak ada biaya tersembunyi. Website live 1–3 hari setelah order.',
  keywords: [
    'harga buat website', 'kalkulator website indonesia', 'website murah profesional',
    'website bisnis 3 hari', 'buat website toko online', 'website klinik murah',
  ],
  alternates: { canonical: 'https://japanarenacorp.com/seluruh-layanan' },
  openGraph: {
    title: 'Kalkulator Harga Website — Mulai Rp 600.000 | Japan Arena Corp',
    description: 'Harga transparan, tidak ada biaya tersembunyi. Website live 1–3 hari.',
    url: 'https://japanarenacorp.com/seluruh-layanan',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
