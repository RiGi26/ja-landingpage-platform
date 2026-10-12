import type { Metadata } from 'next'
import '@/components/v43/v43.css'

export const metadata: Metadata = {
  title: 'Paket Portal LMS & Stock | Webzoka',
  description:
    'LMS dan Stock menjadi fokus penawaran awal Webzoka. Bandingkan paket dan diskusikan kesiapan aktivasi. Klinik, Farmasi, Travel & Rental, serta Laundry berstatus Dalam Pengembangan.',
  keywords: [
    'harga lms karyawan', 'paket lms', 'saas bisnis indonesia', 'software bisnis ukm',
    'software stok barang', 'sistem inventory ukm', 'aplikasi pesanan dan stok',
  ],
  alternates: { canonical: 'https://www.webzoka.com/pricing/' },
  openGraph: {
    title: 'Paket Portal LMS & Stock | Webzoka',
    description: 'Fokus penawaran awal: LMS dan Stock. Portal Klinik, Farmasi, Travel & Rental, serta Laundry berstatus Dalam Pengembangan. Diskusikan paket dan kesiapan aktivasi dengan tim Webzoka.',
    url: 'https://www.webzoka.com/pricing/',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
