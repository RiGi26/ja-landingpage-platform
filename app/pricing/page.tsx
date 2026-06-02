'use client'

import { useState } from 'react'
import { Check, Sparkles, Building2, Zap, ShieldCheck, ArrowRight, MessageCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'
import ComparisonInfographic from '@/components/ComparisonInfographic'

const PLATFORMS = [
  { 
    id: 'lms', 
    name: 'Portal LMS', 
    icon: '🎓',
    demoUrl: 'https://app.japanarenacorp.com/demo',
    plans: [
      { tier: 'Pro Trial', price: 0, feat: ['Akses Semua Fitur Pro', 'Aktif selama 14 Hari', 'Tanpa Kartu Kredit'] },
      { tier: 'Professional', price: 499000, feat: ['500+ Siswa', 'Unlimited Kursus', 'Sertifikat Otomatis'], popular: true },
      { tier: 'Business', price: 1199000, feat: ['Unlimited Siswa', 'Custom Domain', 'Laporan Progres Angkatan'] },
    ]
  },
  { 
    id: 'clinic', 
    name: 'Portal Klinik', 
    icon: '🏥',
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
    icon: '💊',
    demoUrl: 'https://ja-pharmacy-platform.vercel.app/login',
    plans: [
      { tier: 'Pro Trial', price: 0, feat: ['Akses Semua Fitur Pro', 'Aktif selama 14 Hari', 'Tanpa Kartu Kredit'] },
      { tier: 'Professional', price: 449000, feat: ['3 Kasir / Akun', 'Printer Integration', 'Sync Data Klinik'], popular: true },
      { tier: 'Business', price: 999000, feat: ['Unlimited Kasir', 'Sync Stok Otomatis', 'Laporan Tahunan'] },
    ]
  },
  { 
    id: 'travel', 
    name: 'JapanArena Go', 
    icon: '🚀',
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
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 px-4">
        {/* Breadcrumb / Back Button */}
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
              <ArrowRight size={14} className="rotate-180" />
            </div>
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight sf-display-heavy">
            Investasi Digital yang <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-4">Tepat Sasaran</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Pilih Layanan Kami (Sistem Siap Pakai) yang sesuai dengan skala operasional bisnis Anda. Transparan, terjangkau, dan tanpa biaya setup per fitur.
          </p>
        </div>

        {/* Platform Switcher */}
        <div role="tablist" aria-label="Pilih platform" className="flex flex-wrap justify-center gap-2 mb-12">
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
              <span>{p.icon}</span> {p.name}
            </button>
          ))}
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
                plan.popular ? 'border-blue-600 shadow-2xl scale-105 z-10' : 'border-black/[0.03] shadow-sm'
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
                  className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 text-sm uppercase tracking-widest ${
                    plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
                    : plan.tier === 'Pro Trial'
                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {plan.tier === 'Pro Trial' ? 'Mulai Trial 14 Hari' : 'Mulai Berlangganan'} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <ComparisonInfographic />

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
                <button className="w-full bg-white text-black py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95 shadow-xl">
                  Hubungi Sales Expert <MessageCircle size={20} />
                </button>
                <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-tighter font-bold">*S&K Berlaku untuk minimal 3 aktivasi portal</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           {[
             { t: 'Tanpa Biaya Setup', d: 'Mulai operasional digital Anda hari ini tanpa biaya instalasi awal yang memberatkan kashflow bisnis.' },
             { t: 'Update Berkala', d: 'Dapatkan pembaruan fitur keamanan dan fungsionalitas secara gratis setiap bulannya tanpa biaya tambahan.' },
             { t: 'Keamanan Data', d: 'Data bisnis Anda disimpan di infrastruktur terenkripsi dengan backup berkala demi kenyamanan Anda.' },
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
