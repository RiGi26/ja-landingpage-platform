import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — Webzoka',
  description: 'Kebijakan Privasi untuk Website Managed Service dan Portal SaaS Webzoka.',
  alternates: { canonical: 'https://www.webzoka.com/privacy/' },
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
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-32 md:pt-40">
        <Link href="/" className="mb-8 inline-flex min-h-11 items-center text-sm font-bold text-blue-700 hover:underline">Kembali ke Beranda</Link>
        <h1 className="sf-display-heavy mb-8 text-3xl font-black leading-tight text-gray-900 md:text-5xl">Kebijakan Privasi</h1>
        <div className="space-y-6">
          {sections.map(section => (
            <section key={section.h} className="rounded-[24px] border border-black/5 bg-white p-6 apple-shadow md:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">{section.h}</h2>
              <div className="space-y-3">{section.body.map(paragraph => <p key={paragraph} className="text-base leading-relaxed text-gray-600">{paragraph}</p>)}</div>
            </section>
          ))}
          <section className="rounded-[24px] border border-black/5 bg-white p-6 apple-shadow md:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Hubungi Webzoka</h2>
            <p className="mb-3 text-base leading-relaxed text-gray-600">Pertanyaan terkait layanan, ketentuan, atau data pribadi dapat dikirim melalui email:</p>
            <a href="mailto:webzokacompany@gmail.com" className="inline-flex min-h-11 max-w-full items-center break-all text-base font-bold text-blue-700 hover:underline">webzokacompany@gmail.com</a>
          </section>
        </div>
        <nav aria-label="Informasi layanan dan legal" className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-blue-700">
          <Link href="/seluruh-layanan/" className="inline-flex min-h-11 items-center hover:underline">Website Managed Service</Link>
          <Link href="/pricing/" className="inline-flex min-h-11 items-center hover:underline">Portal SaaS</Link>
          <Link href="/terms/" className="inline-flex min-h-11 items-center hover:underline">Syarat &amp; Ketentuan</Link>
        </nav>
      </main>
    </div>
  )
}
