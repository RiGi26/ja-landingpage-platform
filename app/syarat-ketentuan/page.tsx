import Navbar from '@/components/LmsNavbar'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export const metadata = {
  title: 'Syarat & Ketentuan — Webzoka',
  description: 'Syarat & Ketentuan penggunaan layanan Webzoka: ruang lingkup layanan, pemesanan & pembayaran, revisi, langganan, serta tanggung jawab masing-masing pihak.',
}

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: '1. Penerimaan Syarat',
    body: [
      'Webzoka adalah nama usaha terdaftar yang beroperasi di bawah hukum Republik Indonesia. Dengan memesan atau menggunakan layanan kami, kamu menyetujui Syarat & Ketentuan ini.',
    ],
  },
  {
    h: '2. Layanan Kami',
    body: [
      'Webzoka menyediakan pembuatan website dan portal sistem bisnis (seperti LMS, klinik, farmasi, rental, dan stok/operasi), berikut hosting dan pemeliharaannya.',
      'Lingkup setiap pesanan mengikuti paket dan rincian yang tampil di kalkulator sebelum kamu membayar.',
    ],
  },
  {
    h: '3. Pemesanan & Pembayaran',
    body: [
      'Estimasi biaya muncul di kalkulator sebelum kamu membayar. Pembayaran diproses melalui payment gateway resmi (Midtrans).',
      'Pengerjaan dimulai setelah data bisnis dan pembayaran (atau DP) kami terima. Estimasi waktu live adalah 3–5 hari kerja, tergantung kompleksitas dan kelengkapan data dari kamu.',
    ],
  },
  {
    h: '4. Revisi & Perubahan',
    body: [
      'Revisi konten dan penyesuaian layout minor termasuk dalam paket. Perubahan besar seperti ganti template atau penambahan fitur baru akan kami diskusikan dan estimasi biayanya lebih dulu sebelum dikerjakan.',
    ],
  },
  {
    h: '5. Langganan & Perpanjangan',
    body: [
      'Tidak ada kontrak minimum. Untuk portal berbasis langganan, kamu bisa berhenti kapan saja. Untuk website, hosting berjalan per tahun dan bisa tidak diperpanjang saat jatuh tempo.',
      'Biaya perpanjangan (renewal) sudah tertera sejak awal di kalkulator — tidak ada tagihan kejutan.',
    ],
  },
  {
    h: '6. Tanggung Jawab Kamu',
    body: [
      'Kamu bertanggung jawab atas keabsahan konten dan data yang kamu kirim, serta memastikan kamu berhak menggunakannya. Kamu tidak boleh memakai layanan untuk tujuan melanggar hukum yang berlaku di Indonesia.',
    ],
  },
  {
    h: '7. Batasan Tanggung Jawab',
    body: [
      'Kami berupaya menjaga layanan tetap berjalan dan aman, namun tidak menjamin layanan bebas gangguan sepenuhnya. Webzoka tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari pemakaian layanan di luar kendali wajar kami.',
    ],
  },
]

export default function SyaratKetentuanPage() {
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
            Syarat &amp; Ketentuan
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
            <h2 className="text-xl font-black text-gray-900 mb-4">8. Hubungi Kami</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ada pertanyaan soal Syarat &amp; Ketentuan ini? Hubungi kami:
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
