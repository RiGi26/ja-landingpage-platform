import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Harga Langganan Portal LMS, Klinik, Farmasi, Travel, Operasi (Stock) & Laundry | Webzoka',
  description:
    'Portal bisnis siap pakai mulai Rp 149.000/bulan. Termasuk Portal Operasi (Stock) & Portal Laundry untuk kelola pesanan, stok & order cuci kiloan. Trial 14 hari gratis tanpa kartu kredit. Bayar tahunan hemat 2 bulan. Tanpa setup fee.',
  keywords: [
    'harga sistem klinik', 'harga lms karyawan', 'software apotek murah',
    'sistem travel rental indonesia', 'saas bisnis indonesia', 'software bisnis ukm',
    'software stok barang', 'sistem inventory ukm', 'aplikasi pesanan dan stok',
    'software laundry', 'aplikasi laundry kiloan', 'kasir laundry',
  ],
  alternates: { canonical: 'https://www.webzoka.com/pricing/' },
  openGraph: {
    title: 'Harga Portal Bisnis — Mulai Rp 149.000/bulan | Webzoka',
    description: 'Trial 14 hari gratis. Bayar tahunan hemat 2 bulan. Tanpa setup fee, tanpa kontrak.',
    url: 'https://www.webzoka.com/pricing/',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
