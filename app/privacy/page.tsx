import type { Metadata } from 'next'
import Link from 'next/link'
import V43Shell from '@/components/v43/V43Shell'
import '@/components/v43/v43.css'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — Webzoka',
  description: 'Kebijakan Privasi untuk Website Managed Service dan Portal SaaS Webzoka.',
  alternates: { canonical: 'https://www.webzoka.com/privacy/' },
  openGraph: {
    title: 'Kebijakan Privasi — Webzoka',
    description: 'Kebijakan Privasi untuk Website Managed Service dan Portal SaaS Webzoka.',
    url: 'https://www.webzoka.com/privacy/',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kebijakan Privasi — Webzoka',
    description: 'Kebijakan Privasi untuk Website Managed Service dan Portal SaaS Webzoka.',
    images: ['/images/logo-light.jpg'],
  },
}

const sections = [
  {
    "h": "1. Tentang kebijakan ini",
    "body": [
      "Webzoka adalah brand layanan digital yang menyediakan Website Managed Service dan Portal SaaS. Kebijakan ini menjelaskan penggunaan data pribadi dalam konsultasi, pemesanan, dan penggunaan layanan Webzoka."
    ]
  },
  {
    "h": "2. Data dan tujuan penggunaannya",
    "body": [
      "Data identitas dan kontak mencakup nama, email, nomor WhatsApp, dan informasi bisnis yang kamu berikan saat berkonsultasi atau memesan. Materi bisnis dapat mencakup teks, logo, foto, dan data yang kamu kirim untuk pengerjaan website atau penggunaan portal.",
      "Kami menggunakan data untuk menanggapi konsultasi, menyiapkan penawaran, mengerjakan website, menyediakan portal, dan memberi dukungan. Catatan pesanan dan pembayaran digunakan untuk administrasi layanan."
    ]
  },
  {
    "h": "3. Pembayaran dan penyedia layanan",
    "body": [
      "Metode atau penyedia pembayaran yang tersedia akan diinformasikan pada proses pemesanan atau pembayaran.",
      "Layanan dapat melibatkan penyedia teknologi atau komunikasi sesuai kebutuhan layanan yang digunakan. Data yang dikirim ke layanan eksternal mengikuti kebijakan penyedia terkait."
    ]
  },
  {
    "h": "4. Penyimpanan dan keamanan",
    "body": [
      "Webzoka menerapkan langkah pengamanan teknis dan organisasi yang wajar sesuai jenis layanan yang digunakan. Tidak ada sistem yang dapat dijamin bebas dari risiko sepenuhnya.",
      "Penyimpanan dan penghapusan data mengikuti kebutuhan layanan, kesepakatan pelanggan, dan kewajiban yang berlaku. Hubungi kami untuk membahas akses atau ekspor data saat layanan berakhir."
    ]
  },
  {
    "h": "5. Cookie dan analitik",
    "body": [
      "Website menyimpan pilihan analitik melalui cookie dan penyimpanan lokal browser. Google Analytics 4 dimuat hanya jika kamu menyetujui analitik dan konfigurasi analitik tersedia.",
      "Peristiwa analitik khusus dibatasi pada properti yang diizinkan, seperti halaman asal dan tujuan tautan. Kami tidak memasukkan isi draft, nama, nomor WhatsApp, pesan, token, atau user-ID ke properti peristiwa tersebut.",
      "Kamu dapat mengubah pilihan melalui Pengaturan privasi. Pengaturan cookie juga dapat dikelola melalui browser."
    ]
  },
  {
    "h": "6. Hak kamu",
    "body": [
      "Kamu dapat mengajukan permintaan akses, perbaikan, atau penghapusan data pribadi melalui kontak di bawah. Kami menindaklanjuti permintaan sesuai jenis layanan, kebutuhan verifikasi, dan kewajiban yang berlaku."
    ]
  }
]

export default function LegalPage() {
  return (
    <V43Shell page="privacy">
      <main id="main-content" tabIndex={-1} className="legacy-page legacy-legal container">
        <Link href="/" className="text-link legacy-back">Kembali ke Beranda</Link>
        <h1 className="legacy-title">Kebijakan Privasi</h1>
        <div className="legacy-legal-sections">
          {sections.map(section => (
            <section key={section.h} className="legacy-legal-section">
              <h2 className="legacy-section-title">{section.h}</h2>
              <div className="legacy-paragraphs">{section.body.map(paragraph => <p key={paragraph} className="legacy-body">{paragraph}</p>)}</div>
            </section>
          ))}
          <section className="legacy-legal-section">
            <h2 className="legacy-section-title">Hubungi Webzoka</h2>
            <p className="legacy-body">Pertanyaan terkait layanan, ketentuan, atau data pribadi dapat dikirim melalui email:</p>
            <a href="mailto:webzokacompany@gmail.com" className="text-link legacy-email">webzokacompany@gmail.com</a>
          </section>
        </div>
        <nav aria-label="Informasi layanan dan legal" className="legacy-links">
          <Link href="/seluruh-layanan/" className="text-link">Website Managed Service</Link>
          <Link href="/pricing/" className="text-link">Portal SaaS</Link>
          <Link href="/terms/" className="text-link">Syarat &amp; Ketentuan</Link>
        </nav>
      </main>
    </V43Shell>
  )
}
