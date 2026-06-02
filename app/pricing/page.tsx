'use client'

import { useState } from 'react'
import { Check, Sparkles, Building2, Zap, ShieldCheck, ArrowRight, MessageCircle, ExternalLink, GraduationCap, Cross, Pill, Bus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'
import ComparisonInfographic from '@/components/ComparisonInfographic'

const PLATFORMS: { id: string; name: string; icon: LucideIcon; demoUrl: string; plans: { tier: string; price: number; feat: string[]; popular?: boolean }[] }[] = [
  {
    id: 'lms',
    name: 'Portal LMS',
    icon: GraduationCap,
    demoUrl: 'https://app.japanarena.com/demo',
    plans: [
      { tier: 'Pro Trial', price: 0, feat: ['Akses Semua Fitur Pro', 'Aktif selama 14 Hari', 'Tanpa Kartu Kredit'] },
      { tier: 'Professional', price: 499000, feat: ['500+ Siswa', 'Unlimited Kursus', 'Sertifikat Otomatis'], popular: true },
      { tier: 'Business', price: 1199000, feat: ['Unlimited Siswa', 'Custom Domain', 'Laporan Progres Angkatan'] },
    ]
  },
  {
    id: 'clinic',
    name: 'Portal Klinik',
    icon: Cross,
    demoUrl: 'https://ja-clinic-platform.vercel.app/demo',
    plans: [
      { tier: 'Pro Trial', price: 0, feat: ['Akses Semua Fitur Pro', 'Aktif selama 14 Hari', 'Tanpa Kartu Kredit'] },
      { tier: 'Professional', price: 599000, feat: ['5 Dokter / Akun', 'WhatsApp Notifikasi', 'Integrasi Farmasi'], popular: true },
      { tier: 'Business', price: 1499000, feat: ['Unlimited Dokter', 'Cetak Resep & Kwitansi PDF', 'Audit Log Staf'] },
    ]
  },
  {
    id: 'pharmacy',
    name: 'Portal Farmasi',
    icon: Pill,
    demoUrl: 'https://ja-pharmacy-platform.vercel.app/login',
    plans: [
      { tier: 'Pro Trial', price: 0, feat: ['Akses Semua Fitur Pro', 'Aktif selama 14 Hari', 'Tanpa Kartu Kredit'] },
      { tier: 'Professional', price: 449000, feat: ['3 Kasir / Akun', 'Printer Integration', 'Sync Data Klinik'], popular: true },
      { tier: 'Business', price: 999000, feat: ['Unlimited Kasir', 'Sync Stok Otomatis', 'Laporan Tahunan'] },
    ]
  },
  {
    id: 'travel',
    name: 'Portal Travel & Rental',
    icon: Bus,
    demoUrl: 'https://ja-rental-platform.vercel.app/auth/login',
    plans: [
      { tier: 'Pro Trial', price: 0, feat: ['Akses Semua Fitur Pro', 'Aktif selama 14 Hari', 'Tanpa Kartu Kredit'] },
      { tier: 'Professional', price: 749000, feat: ['Live Tracking Driver', 'WhatsApp E-ticket', 'Payment Integration'], popular: true },
      { tier: 'Business', price: 1899000, feat: ['Custom Subdomain Unik', 'Fleet Status Advanced', 'E-Ticket WA Unlimited'] },
    ]
  }
]

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('lms')
  const currentPlatform = PLATFORMS.find(p => p.id === activeTab) || PLATFORMS[0]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 px-4">
        {/* Breadcrumb / Back Button */}
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-white border border-black/5 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
              <ArrowRight size={14} className="rotate-180" />
            </div>
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-[11px] font-bold px-4 py-1.5 rounded-full mb-5 border border-green-100">
            <Check size={13} strokeWidth={3} /> Coba 14 hari gratis — tanpa kartu kredit
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight sf-display-heavy">
            Sistem Portal Bisnis — <span className="text-blue-600">Hemat 44–74%</span> vs Vendor Lain
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Pilih portal sesuai bisnis Anda. Tanpa setup fee, tanpa kontrak minimum, tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Platform Switcher */}
        <div className="text-center mb-5">
          <p className="text-sm font-bold text-gray-400">Bisnis saya bergerak di bidang:</p>
        </div>
        <div role="tablist" aria-label="Pilih platform" className="flex flex-wrap justify-center gap-2 mb-4">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              role="tab"
              aria-selected={activeTab === p.id}
              aria-controls={`tabpanel-${p.id}`}
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === p.id
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              <p.icon size={16} /> {p.name}
            </button>
          ))}
        </div>
        <div className="text-center mb-12">
          <a
            href="https://wa.me/6281296917963?text=Halo%20Japan%20Arena%2C%20saya%20tidak%20yakin%20platform%20mana%20yang%20cocok%20untuk%20bisnis%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0071E3] font-bold hover:underline"
          >
            Tidak yakin pilih yang mana? Chat tim kami →
          </a>
        </div>

        {/* Pricing Cards */}
        <div
          role="tabpanel"
          id={`tabpanel-${currentPlatform.id}`}
          aria-labelledby={`tab-${currentPlatform.id}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {currentPlatform.plans.map((plan, idx) => (
            <div 
              key={plan.tier}
              className={`relative bg-white rounded-[40px] p-8 border-2 transition-all flex flex-col ${
                plan.popular ? 'border-blue-600 shadow-2xl shadow-blue-100 ring-4 ring-blue-50' : 'border-black/[0.03] shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} /> Paling Populer
                </div>
              )}
              <div className="mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{plan.tier}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-gray-900 sf-display-heavy">
                    {plan.price === 0 ? 'Gratis' : `Rp ${plan.price.toLocaleString('id-ID')}`}
                  </span>
                  {plan.price !== 0 && (
                    <span className="text-gray-400 text-sm font-medium">/bulan</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.feat.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                {currentPlatform.demoUrl && (
                  <Link
                    href={currentPlatform.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl border-2 border-blue-50 text-blue-600 font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all text-sm group/demo"
                  >
                    Lihat Demo Sistem <ExternalLink size={14} className="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                  </Link>
                )}

                <Link 
                  href={plan.tier === 'Pro Trial' ? 'https://ja-rental-platform.vercel.app/register' : "https://wa.me/6281296917963"}
                  className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-[0.96] text-sm uppercase tracking-widest ${
                    plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
                    : plan.tier === 'Pro Trial'
                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {plan.tier === 'Pro Trial' ? 'Mulai Trial 14 Hari — Gratis' : plan.tier === 'Business' ? 'Chat untuk Business Plan' : 'Mulai Berlangganan'} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <ComparisonInfographic />

        {/* FAQ */}
        <div className="py-20 border-t border-black/5">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">FAQ</p>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight sf-display-heavy">
              Pertanyaan Sebelum Berlangganan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Apa yang terjadi setelah trial 14 hari habis?',
                a: 'Akses fitur dibatasi ke paket gratis. Tidak ada charge otomatis, tidak ada kartu kredit yang ditagih. Anda bisa pilih paket berbayar kapan saja — atau tetap di akses terbatas.',
              },
              {
                q: 'Apakah bisa upgrade atau downgrade paket?',
                a: 'Ya, kapan saja. Tidak ada penalti, tidak ada kontrak minimum. Cukup chat tim kami dan paket diubah di hari yang sama.',
              },
              {
                q: 'Bagaimana cara pembayaran langganan?',
                a: 'Transfer bank, QRIS, atau kartu kredit via Midtrans. Konfirmasi pembayaran otomatis masuk via WA.',
              },
              {
                q: 'Apakah data saya aman kalau berhenti berlangganan?',
                a: 'Data Anda tetap tersimpan 30 hari setelah berhenti. Kami beri waktu untuk export sebelum data dihapus permanen.',
              },
              {
                q: 'Apakah portal ini bisa dipakai bersamaan dengan website builder?',
                a: 'Ya. Keduanya terpisah tapi terintegrasi. Website untuk tampilan online, portal untuk operasional bisnis dari dalam.',
              },
              {
                q: 'Apakah ada biaya setup per fitur?',
                a: 'Tidak. Semua fitur dalam paket langsung aktif tanpa biaya setup tambahan. Yang ada hanya biaya langganan bulanan yang tercantum.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-[#F5F5F7] rounded-[24px] p-8 border border-black/[0.03]">
                <h3 className="text-base font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm text-gray-400 font-medium">
              Pertanyaan lain?{' '}
              <a
                href="https://wa.me/6281296917963?text=Halo%20Japan%20Arena%2C%20saya%20punya%20pertanyaan%20soal%20langganan."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071E3] font-bold hover:underline"
              >
                Chat tim kami
              </a>
            </p>
          </div>
        </div>

        {/* ECOSYSTEM BUNDLE STRATEGY */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/30">
                < Zap size={12} fill="currentColor" /> Ecosystem Advantage
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight sf-display-heavy">
                Gunakan Seluruh Ekosistem, Hemat Hingga <span className="text-blue-500">40%</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-medium">
                Bisnis Anda berkembang pesat? Gabungkan Portal Klinik, Farmasi, dan LMS dalam satu paket <span className="text-white font-black">JapanArena Business Bundle</span> untuk efisiensi maksimal dan sinkronisasi data real-time.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <ShieldCheck className="text-blue-500" size={20} /> Data Terintegrasi
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                   • Multi-User Support
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                   • Priority WhatsApp Access
                </div>
              </div>
            </div>
            
            <div className="shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 text-center border-dashed">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Business Bundle mulai</p>
                <div className="text-5xl font-black text-white mb-6 sf-display-heavy">Rp 1.499.000<span className="text-lg text-gray-500 font-medium">/bln</span></div>
                <a
                  href="https://wa.me/6281296917963?text=Halo%20Japan%20Arena%2C%20saya%20tertarik%20dengan%20Business%20Bundle%20untuk%20beberapa%20portal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-[0.96] shadow-xl"
                >
                  Chat Tim Kami <MessageCircle size={20} />
                </a>
                <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-tighter font-bold">*Syarat berlaku — minimal 3 portal aktif</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           {[
             { t: 'Tanpa Biaya Setup', d: 'Langsung pakai hari ini — tidak ada biaya awal, tidak ada instalasi. Sistem aktif begitu Anda daftar.' },
             { t: 'Update Otomatis', d: 'Sistem selalu ter-update — fitur baru dan patch keamanan masuk sendiri. Anda tidak perlu urus apapun.' },
             { t: 'Data Tidak Bisa Diintip', d: 'Setiap bisnis punya ruang data sendiri yang terisolasi. Enkripsi aktif dari hari pertama, backup harian.' },
           ].map(item => (
             <div key={item.t} className="group">
               <h4 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-widest border-l-4 border-blue-600 pl-4">{item.t}</h4>
               <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}
