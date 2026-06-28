import Navbar from '@/components/LmsNavbar'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export const metadata = {
  title: 'Kebijakan Privasi — Webzoka',
  description: 'Kebijakan Privasi Webzoka: data apa yang kami kumpulkan, bagaimana kami menyimpan dan melindunginya, serta hak kamu atas data tersebut.',
}

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: '1. Tentang Kebijakan Ini',
    body: [
      'Webzoka adalah nama usaha terdaftar yang beroperasi di bawah hukum Republik Indonesia. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi kamu saat menggunakan website dan layanan kami.',
      'Dengan memakai layanan Webzoka, kamu menyetujui praktik yang dijelaskan di halaman ini.',
    ],
  },
  {
    h: '2. Data yang Kami Kumpulkan',
    body: [
      'Data identitas & kontak: nama, nomor WhatsApp, email, dan nama bisnis yang kamu isi saat memesan atau berkonsultasi.',
      'Data bisnis: konten, logo, dan informasi yang kamu kirim agar kami bisa membangun website atau portal kamu.',
      'Data transaksi: catatan pesanan dan status pembayaran. Pembayaran diproses oleh mitra payment gateway resmi (Midtrans) — kami tidak menyimpan nomor kartu atau kredensial pembayaran kamu.',
      'Data teknis: informasi standar seperti alamat IP dan jenis perangkat untuk menjaga keamanan dan performa layanan.',
    ],
  },
  {
    h: '3. Bagaimana Kami Menggunakan Data',
    body: [
      'Membangun, mengoperasikan, dan memelihara website atau portal kamu.',
      'Memproses pesanan dan pembayaran melalui Midtrans.',
      'Mengirim notifikasi terkait pesanan, invoice, dan dukungan melalui WhatsApp atau email.',
      'Kami tidak menjual data kamu ke pihak ketiga mana pun.',
    ],
  },
  {
    h: '4. Penyimpanan & Keamanan Data',
    body: [
      'Data setiap bisnis disimpan terpisah dan terenkripsi. Kami menjalankan backup berkala dan kontrol akses agar data kamu tidak bocor atau bercampur dengan pelanggan lain.',
      'Jika kamu berhenti berlangganan, data tetap kami simpan untuk jangka waktu wajar agar kamu sempat melakukan ekspor sebelum dihapus.',
    ],
  },
  {
    h: '5. Cookie',
    body: [
      'Website kami memakai cookie secukupnya untuk menjaga sesi dan mengukur performa halaman. Kamu bisa mematikan cookie lewat pengaturan browser, namun sebagian fitur mungkin tidak berjalan optimal.',
    ],
  },
  {
    h: '6. Hak Kamu',
    body: [
      'Kamu berhak meminta akses, perbaikan, atau penghapusan data pribadi kamu. Untuk mengajukan permintaan, hubungi kami lewat kontak di bawah dan kami akan menindaklanjuti dalam waktu yang wajar.',
    ],
  },
]

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      <main className="max-w-3xl mx-auto pt-36 pb-24 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors mb-10"
        >
          <ArrowRight size={14} className="rotate-180" /> Kembali ke Beranda
        </Link>

        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight sf-display-heavy mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-sm text-gray-500">Berlaku sejak Juni 2026</p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h} className="bg-white rounded-[28px] p-7 md:p-9 apple-shadow border border-black/[0.03]">
              <h2 className="text-xl font-black text-gray-900 mb-4">{s.h}</h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="bg-white rounded-[28px] p-7 md:p-9 apple-shadow border border-black/[0.03]">
            <h2 className="text-xl font-black text-gray-900 mb-4">7. Hubungi Kami</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ada pertanyaan soal privasi atau data kamu? Hubungi kami:
            </p>
            <a
              href="mailto:contact@webzoka.com"
              className="inline-flex items-center gap-2 text-[#0071E3] font-bold hover:text-[#005BB5] transition-colors"
            >
              <Mail size={16} /> contact@webzoka.com
            </a>
          </section>
        </div>
      </main>
    </div>
  )
}
