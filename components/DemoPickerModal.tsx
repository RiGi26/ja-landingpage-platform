'use client'

import { useEffect } from 'react'
import { X, GraduationCap, Cross, Pill, Warehouse, Bus, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react'

type Demo = {
  title: string
  desc: string
  icon: typeof GraduationCap
  href: string
  color: string
}

// URL demo terverifikasi hidup (200). Farmasi pakai /demo, bukan /login.
const DEMOS: Demo[] = [
  {
    title: 'Portal Belajar (LMS)',
    desc: 'Dashboard kursus, materi & video, progres siswa, sertifikat otomatis.',
    icon: GraduationCap,
    href: 'https://ja-lms-platform.vercel.app/demo',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Portal Klinik & Medis',
    desc: 'Rekam medis digital, antrean pasien, jadwal dokter, booking online.',
    icon: Cross,
    href: 'https://ja-clinic-platform.vercel.app/demo',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Portal Farmasi (Apotek)',
    desc: 'Kasir digital, stok obat otomatis, laporan harian tanpa rekap manual.',
    icon: Pill,
    href: 'https://ja-pharmacy-platform.vercel.app/demo',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Portal Stok & Operasi',
    desc: 'Stok & lot otomatis (FEFO), pesanan, produksi & resep, laporan keuangan — operasi bisnis dalam satu portal.',
    icon: Warehouse,
    href: 'https://stock.japanarena.id/demo',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Portal Travel & Rental',
    desc: 'Booking armada, e-ticketing, slot otomatis, live tracking.',
    icon: Bus,
    href: 'https://ja-rental-platform.vercel.app',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Layanan Jastip Jepang',
    desc: 'Hitung biaya titip, kelola pesanan, pelacakan pengiriman.',
    icon: ShoppingBag,
    href: 'https://ja-jastip-platform.vercel.app',
    color: 'bg-red-50 text-red-600',
  },
]

export default function DemoPickerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Escape untuk tutup + kunci scroll body saat modal terbuka
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Pilih demo sistem"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-pop border border-black/5">
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl sf-display-heavy text-[#1D1D1F]">Lihat Demo Langsung</h2>
              <p className="text-sm text-gray-500 mt-1">Coba sistemnya sendiri — tanpa daftar, tanpa bayar. Buka di tab baru.</p>
            </div>
            <button onClick={onClose} aria-label="Tutup" className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {DEMOS.map((d) => (
              <a
                key={d.title}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-row items-center gap-4 p-5 md:p-6 rounded-3xl bg-white border border-black/[0.03] apple-shadow hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 ${d.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <d.icon size={28} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900 leading-tight mb-1 md:mb-2 text-sm md:text-base">{d.title}</h3>
                  <p className="text-[11px] md:text-xs text-gray-500 line-clamp-2">{d.desc}</p>
                  <div className="flex items-center text-sm font-bold text-[#0071E3] group-hover:translate-x-1 transition-transform mt-3">
                    Buka Demo <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">Cari contoh website, bukan sistem operasional?</p>
            <a
              href="#portofolio"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0071E3] hover:text-[#005BB5] transition-colors"
            >
              <ExternalLink size={14} /> Lihat website klien yang sudah live
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
