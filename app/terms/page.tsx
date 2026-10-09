import type { Metadata } from 'next'
import Link from 'next/link'
import V43Shell from '@/components/v43/V43Shell'
import '@/components/v43/v43.css'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Webzoka',
  description: 'Syarat & Ketentuan untuk Website Managed Service dan Portal SaaS Webzoka.',
  alternates: { canonical: 'https://www.webzoka.com/terms/' },
}

const sections = [
  {
    "h": "1. Tentang layanan",
    "body": [
      "Webzoka adalah brand layanan digital. Layanan aktif mencakup Website Managed Service, yaitu website yang dibuatkan oleh Webzoka, dan Portal SaaS untuk membantu operasional bisnis.",
      "Website dan Portal dapat dibahas sebagai solusi gabungan sesuai kebutuhan. Rincian layanan mengikuti penawaran atau paket yang dikonfirmasi kepada pelanggan."
    ]
  },
  {
    "h": "2. Pemesanan Website Managed Service",
    "body": [
      "Harga awal pembuatan website adalah Rp600.000. Scope, harga final, jadwal, dan hasil yang akan diserahkan dikonfirmasi sebelum pekerjaan dimulai.",
      "Kebutuhan halaman, kesiapan materi, fitur, integrasi, dan dukungan memengaruhi penawaran. Pelanggan menyediakan materi dan persetujuan yang diperlukan sesuai kesepakatan.",
      "Jadwal pengerjaan mempertimbangkan kompleksitas, kelengkapan materi, dan proses review. Perubahan kebutuhan dapat memerlukan penyesuaian jadwal yang dibahas bersama."
    ]
  },
  {
    "h": "3. Revisi dan perubahan scope",
    "body": [
      "Revisi mengikuti ketentuan dalam penawaran yang disepakati. Permintaan di luar scope dapat memerlukan biaya atau waktu tambahan.",
      "Biaya tambahan dan perubahan pekerjaan harus mendapatkan persetujuan pelanggan sebelum dikerjakan."
    ]
  },
  {
    "h": "4. Portal SaaS",
    "body": [
      "Paket dan periode langganan mengikuti pilihan bulanan atau tahunan yang ditampilkan atau disepakati kepada pelanggan. Fitur dan batas penggunaan mengikuti paket terkait.",
      "Pelanggan dapat memilih tidak memperpanjang langganan. Ketentuan akhir layanan dan kebutuhan akses atau ekspor data dapat dibahas sebelum periode layanan berakhir."
    ]
  },
  {
    "h": "5. Pembayaran",
    "body": [
      "Metode dan instruksi pembayaran yang tersedia akan diinformasikan sebelum pembayaran dilakukan.",
      "Jumlah tagihan, tahapan pembayaran, dan ketentuan pembatalan atau pengembalian dana yang berlaku dikomunikasikan dalam proses pemesanan atau kesepakatan layanan."
    ]
  },
  {
    "h": "6. Hosting, pemeliharaan, dan perpanjangan",
    "body": [
      "Ketentuan hosting, pemeliharaan, perpanjangan, dan biaya yang berlaku disampaikan sebelum pesanan atau perpanjangan dikonfirmasi.",
      "Cakupan dan periode layanan mengikuti kesepakatan masing-masing pesanan. Periksa rincian tersebut sebelum memberikan persetujuan."
    ]
  },
  {
    "h": "7. Tanggung jawab dan dukungan",
    "body": [
      "Pelanggan bertanggung jawab atas keabsahan materi dan data yang diberikan, hak penggunaannya, serta penggunaan layanan sesuai hukum yang berlaku.",
      "Webzoka berupaya menjaga layanan dan memberikan dukungan sesuai kesepakatan. Layanan dapat mengalami gangguan; tidak ada jaminan bahwa layanan selalu bebas gangguan. Hubungi kami untuk membahas kendala atau pertanyaan terkait layanan."
    ]
  }
]

export default function LegalPage() {
  return (
    <V43Shell page="terms">
      <main id="main-content" tabIndex={-1} className="legacy-page legacy-legal container">
        <Link href="/" className="text-link legacy-back">Kembali ke Beranda</Link>
        <h1 className="legacy-title">Syarat &amp; Ketentuan</h1>
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
          <Link href="/privacy/" className="text-link">Kebijakan Privasi</Link>
        </nav>
      </main>
    </V43Shell>
  )
}
