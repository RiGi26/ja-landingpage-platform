import type { Metadata } from 'next'
import { SITE_URL } from '@/constants/site'

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
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Harga Portal Bisnis — Mulai Rp 149.000/bulan | Webzoka',
    description: 'Trial 14 hari gratis. Bayar tahunan hemat 2 bulan. Tanpa setup fee, tanpa kontrak.',
    url: `${SITE_URL}/pricing`,
    type: 'website',
  },
}

const pricingFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Apa yang terjadi setelah trial 14 hari habis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Akses fitur dibatasi ke paket gratis. Tidak ada charge otomatis, tidak ada kartu kredit yang ditagih. kamu bisa pilih paket berbayar kapan saja.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah bisa upgrade atau downgrade paket?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya, kapan saja. Tidak ada penalti, tidak ada kontrak minimum. Cukup chat tim kami dan paket diubah di hari yang sama.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah ada biaya setup per fitur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tidak. Semua fitur dalam paket langsung aktif tanpa biaya setup tambahan. Yang ada hanya biaya langganan bulanan yang tercantum.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah data saya aman kalau berhenti berlangganan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Data kamu tetap tersimpan 30 hari setelah berhenti. Kami beri waktu untuk export sebelum data dihapus permanen.',
      },
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      {children}
    </>
  )
}
