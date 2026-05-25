'use client'

import { useState } from 'react'
import { Check, Sparkles, Building2, Zap, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'
import ComparisonInfographic from '@/components/ComparisonInfographic'

const PLATFORMS = [
  { 
    id: 'lms', 
    name: 'Portal LMS', 
    icon: '🎓',
    plans: [
      { tier: 'Starter', price: 249000, feat: ['50 Siswa', '5 Kursus', 'Progress Tracking'] },
      { tier: 'Pro', price: 499000, feat: ['500 Siswa', 'Unlimited Kursus', 'Sertifikat Otomatis'], popular: true },
      { tier: 'Institusi', price: 999000, feat: ['Unlimited Siswa', 'Custom Domain', 'Advanced Analytics'] },
    ]
  },
  { 
    id: 'clinic', 
    name: 'Portal Klinik', 
    icon: '🏥',
    plans: [
      { tier: 'Starter', price: 299000, feat: ['1 Dokter', 'Booking System', 'Rekam Medis Dasar'] },
      { tier: 'Pro', price: 599000, feat: ['5 Dokter', 'WhatsApp Notifikasi', 'Integrasi Farmasi'], popular: true },
      { tier: 'Klinik', price: 1199000, feat: ['Unlimited Dokter', 'Multi Cabang', 'Laporan Lanjutan'] },
    ]
  },
  { 
    id: 'pharmacy', 
    name: 'Portal Farmasi', 
    icon: '💊',
    plans: [
      { tier: 'Starter', price: 199000, feat: ['1 Kasir', 'Stok Obat', 'Laporan Harian'] },
      { tier: 'Pro', price: 449000, feat: ['3 Kasir', 'Printer Integration', 'Offline Mode'], popular: true },
      { tier: 'Apotek', price: 899000, feat: ['Unlimited Kasir', 'Cetak Label', 'Analytics Stok'] },
    ]
  },
  { 
    id: 'travel', 
    name: 'Travel & Rental', 
    icon: '🚌',
    plans: [
      { tier: 'Starter', price: 299000, feat: ['Fleet Management', 'E-Ticketing', 'Jadwal Real-time'] },
      { tier: 'Pro', price: 749000, feat: ['Live Tracking Driver', 'WhatsApp E-ticket', 'Payment Integration'], popular: true },
      { tier: 'Enterprise', price: 1499000, feat: ['White Label App', 'Advanced API', 'SLA 99.9%'] },
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
            <div className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
              <ArrowRight size={14} className="rotate-180" />
            </div>
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Investasi Digital yang <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-4">Tepat Sasaran</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Pilih portal yang sesuai dengan kebutuhan operasional bisnis Anda. Transparan, terjangkau, dan tanpa biaya setup.
          </p>
        </div>

        {/* Platform Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {currentPlatform.plans.map((plan, idx) => (
            <div 
              key={plan.tier}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all hover:translate-y-[-4px] ${
                plan.popular ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-gray-100 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={12} /> Paling Populer
                </div>
              )}
              <div className="mb-8">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{plan.tier}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-gray-900">Rp {plan.price.toLocaleString('id-ID')}</span>
                  <span className="text-gray-400 text-sm font-medium">/bulan</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {plan.feat.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <Link 
                href="https://wa.me/6281296917963"
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  plan.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                  : 'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                Mulai Berlangganan <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <ComparisonInfographic />

        {/* ECOSYSTEM BUNDLE STRATEGY */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/30">
                < Zap size={12} fill="currentColor" /> Ecosystem Advantage
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                Gunakan Seluruh Ekosistem, Hemat Hingga <span className="text-blue-500">40%</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Bisnis Anda berkembang pesat? Gabungkan Portal Klinik, Farmasi, dan LMS dalam satu paket <span className="text-white font-bold">JapanArena Enterprise Bundle</span> untuk efisiensi maksimal dan sinkronisasi data real-time.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <ShieldCheck className="text-blue-500" size={20} /> Data Terintegrasi
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                   • Multi-Platform Support
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                   • Priority 24/7 Access
                </div>
              </div>
            </div>
            
            <div className="shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 text-center border-dashed">
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Enterprise Bundle mulai</p>
                <div className="text-5xl font-black text-white mb-6">Rp 1.499.000<span className="text-lg text-gray-500 font-medium">/bln</span></div>
                <button className="w-full bg-white text-black py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-200 transition-all">
                  Hubungi Sales Expert <MessageCircle size={20} />
                </button>
                <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-tighter">*S&K Berlaku untuk minimal 3 aktivasi portal</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
           {[
             { t: 'Tanpa Biaya Setup', d: 'Mulai operasional digital Anda hari ini tanpa biaya instalasi awal yang memberatkan.' },
             { t: 'Update Berkala', d: 'Dapatkan pembaruan fitur keamanan dan fungsionalitas secara gratis setiap bulannya.' },
             { t: 'Multi-Terminal', d: 'Akses dashboard bisnis Anda dari smartphone, tablet, maupun desktop di mana saja.' },
           ].map(item => (
             <div key={item.t}>
               <h4 className="font-black text-gray-900 mb-2">{item.t}</h4>
               <p className="text-sm text-gray-500 leading-relaxed">{item.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}
