import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'

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
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-32 md:pt-40">
        <Link href="/" className="mb-8 inline-flex min-h-11 items-center text-sm font-bold text-blue-700 hover:underline">Kembali ke Beranda</Link>
        <h1 className="sf-display-heavy mb-8 text-3xl font-black leading-tight text-gray-900 md:text-5xl">Syarat &amp; Ketentuan</h1>
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
          <Link href="/privacy/" className="inline-flex min-h-11 items-center hover:underline">Kebijakan Privasi</Link>
        </nav>
      </main>
    </div>
  )
}
