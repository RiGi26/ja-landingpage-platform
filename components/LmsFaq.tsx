'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Bisa coba dulu sebelum bayar?',
    a: 'Ya. Ada trial gratis 14 hari dengan akses semua fitur Premium — tanpa kartu kredit, tanpa komitmen. Setelah 14 hari, Anda bisa upgrade atau akun otomatis terkunci (data tetap aman).',
  },
  {
    q: 'Berapa lama waktu setup?',
    a: 'Paket Premium: 1–3 hari kerja. Tim kami yang handle semua setup teknis — Anda hanya perlu siapkan konten dan data. Paket Custom diestimasi setelah diskusi kebutuhan spesifik.',
  },
  {
    q: 'Berapa jumlah siswa/user yang bisa didaftarkan?',
    a: 'Paket Premium: unlimited siswa tanpa batas tambahan. Paket Custom: sesuai kesepakatan. Tidak ada biaya per-user tersembunyi.',
  },
  {
    q: 'Apakah notifikasi WhatsApp sudah termasuk?',
    a: 'Ya, notifikasi WA otomatis (invoice, reminder kelas, absensi) tersedia di paket Premium dan Custom. Sistem menggunakan Fonnte — biaya WA sangat terjangkau dan di luar biaya langganan platform.',
  },
  {
    q: 'Apakah data saya aman?',
    a: 'Data disimpan di Supabase (PostgreSQL) dengan enkripsi penuh dan Row Level Security. Setiap client mendapat database terpisah — data Anda tidak bercampur dengan client lain.',
  },
  {
    q: 'Apakah ada kontrak jangka panjang?',
    a: 'Tidak ada. Berlangganan bulanan, bisa berhenti kapan saja. Tidak ada penalti pembatalan atau biaya tersembunyi.',
  },
  {
    q: 'Bisa upgrade atau downgrade paket?',
    a: 'Ya, bisa upgrade kapan saja. Downgrade berlaku di periode berikutnya. Hubungi kami via WA untuk proses upgrade yang cepat.',
  },
  {
    q: 'Apakah bisa custom untuk bisnis non-pendidikan?',
    a: 'Ya. Sistem ini sudah diadaptasi untuk klinik & medis, UMKM, jasa titip, penulis & blogger, dan bisnis korporat. Konsultasikan kebutuhan spesifik Anda via WA.',
  },
  {
    q: 'Apakah bisa pakai domain dan brand sendiri?',
    a: 'Ya, tersedia di paket Custom. Platform tampil dengan nama domain bisnis Anda (contoh: portal.bisnis-anda.com) tanpa jejak Japan Arena Platform sama sekali.',
  },
  {
    q: 'Apa yang terjadi jika saya berhenti berlangganan?',
    a: 'Akun Anda akan dinonaktifkan di akhir periode langganan. Data tetap disimpan selama 30 hari sehingga Anda punya waktu untuk export jika diperlukan. Setelah 30 hari, data dihapus permanen.',
  },
]

export default function LmsFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-900 text-sm pr-4">{faq.q}</span>
            <ChevronDown
              size={16}
              className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 pt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
