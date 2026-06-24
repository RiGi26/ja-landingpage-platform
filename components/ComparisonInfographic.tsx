'use client'

import { TrendingDown, Zap, ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react'

const COMPARISON_DATA = [
  { portal: 'LMS (Bisnis)', others: 1950000, ja: 499000, save: '74%' },
  { portal: 'Klinik Digital', others: 1500000, ja: 599000, save: '60%' },
  { portal: 'Apotek (POS)', others: 800000, ja: 449000, save: '44%' },
  { portal: 'Travel & Rental', others: 2150000, ja: 749000, save: '65%' },
]

export default function ComparisonInfographic() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Infografis */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest mb-4 border border-green-100">
            <TrendingDown size={14} /> Analisis Efisiensi Biaya 2026
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            Beralih ke JapanArena, Pangkas Operasional Hingga <span className="text-green-600">75%</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* SISI KIRI: Grafik Harga */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Perbandingan Biaya Langganan Bulanan (PRO)</p>

            {COMPARISON_DATA.map((item) => (
              <div key={item.portal} className="space-y-2.5 group">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-900">{item.portal}</span>
                  <span className="text-green-700 font-black px-2 py-0.5 bg-green-50 border border-green-100 rounded-full text-[10px]">HEMAT {item.save}</span>
                </div>

                {/* Bar Vendor Lain (skala penuh = referensi) */}
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block w-24 shrink-0 text-xs font-bold text-gray-500">Vendor Lain</span>
                  <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-full bg-gray-300 rounded-lg transition-all duration-1000" style={{ width: '100%' }} />
                  </div>
                  <span className="w-28 shrink-0 text-right text-xs font-bold text-gray-600 tabular-nums">Rp {item.others.toLocaleString('id-ID')}</span>
                </div>

                {/* Bar JapanArena (proporsional terhadap vendor) */}
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block w-24 shrink-0 text-xs font-bold text-blue-700">JapanArena</span>
                  <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-lg shadow-sm shadow-blue-200 transition-all duration-1000 delay-300" style={{ width: `${(item.ja / item.others) * 100}%` }} />
                  </div>
                  <span className="w-28 shrink-0 text-right text-xs font-bold text-blue-700 tabular-nums">Rp {item.ja.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              Perbandingan berdasarkan rata-rata harga paket mid-range
              (multi-user, notif WhatsApp, integrasi sistem) dari vendor
              SaaS sejenis aktif di Indonesia, update Mei 2026.{" "}
              <a
                href="https://wa.me/6281296917963?text=Halo%20Japan%20Arena%2C%20saya%20ingin%20melihat%20perbandingan%20harga%20lengkap."
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Minta daftar perbandingan lengkap →
              </a>
            </p>
          </div>

          {/* SISI KANAN: Fitur & Performa */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Box Setup Fee */}
            <div className="p-8 rounded-3xl bg-gray-900 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={80} /></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Investasi Awal</p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <XCircle className="text-red-500" size={20} />
                    <span className="font-bold text-gray-400">Vendor Lain (Setup Fee)</span>
                  </div>
                  <span className="font-mono text-gray-400">Rp 2.000.000++</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-blue-500 shadow-glow" size={20} />
                    <span className="font-bold">JapanArena (Setup Fee)</span>
                  </div>
                  <span className="font-black text-2xl text-blue-500">GRATIS</span>
                </div>
              </div>
            </div>

            {/* Box Technology */}
            <div className="p-8 rounded-3xl border-2 border-gray-100 bg-white shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Teknologi & Kecepatan</p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-gray-900">Ketersediaan & Keandalan Sistem</span>
                    <span className="text-xs font-black text-blue-600 italic tracking-tighter">Infrastruktur Andal</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '99.9%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tech Stack Kita</p>
                    <p className="text-sm font-black text-gray-900">Next.js 14+ + React</p>
                    <p className="text-[9px] text-blue-600 font-bold mt-1 tracking-widest">Dioptimasi untuk kecepatan loading</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 opacity-60">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tech Stack Mereka</p>
                    <p className="text-sm font-bold text-gray-500">Teknologi konvensional</p>
                    <p className="text-[9px] text-red-500 font-bold mt-1 tracking-widest">Sering lambat dibuka pelanggan</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
