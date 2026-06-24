'use client'

import { useState } from 'react'
import { Check, Sparkles, Building2, Zap, ShieldCheck, ArrowRight, MessageCircle, ExternalLink, GraduationCap, Cross, Pill, Bus, Boxes, FolderOpen, Package, Lightbulb } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'
import ComparisonInfographic from '@/components/ComparisonInfographic'

type CompRow = { label: string; pro: boolean | string; business: boolean | string }

const PLATFORMS: { id: string; name: string; subtitle: string; icon: LucideIcon; demoUrl: string; registerUrl: string; plans: { tier: string; price: number; feat: string[]; popular?: boolean }[]; comparison?: CompRow[] }[] = [
  {
    id: 'lms',
    name: 'Portal Belajar / LMS',
    subtitle: 'Sistem belajar & kursus online',
    icon: GraduationCap,
    demoUrl: 'https://ja-lms-platform.vercel.app/demo',
    registerUrl: 'https://ja-lms-platform.vercel.app/register',
    plans: [
      { tier: 'Starter', price: 0, feat: ['100 Siswa', '10 Kursus', 'Sertifikat Otomatis'] },
      { tier: 'Pro', price: 499000, feat: ['500+ Siswa', 'Unlimited Kursus', 'Sertifikat Otomatis', 'Laporan Progres'], popular: true },
      { tier: 'Business', price: 1199000, feat: ['Unlimited Siswa', 'Custom Domain', 'Laporan Progres Angkatan', 'Priority Support'] },
    ]
  },
  {
    id: 'clinic',
    name: 'Portal Klinik',
    subtitle: 'Manajemen pasien digital',
    icon: Cross,
    demoUrl: 'https://ja-clinic-platform.vercel.app/demo',
    registerUrl: 'https://ja-clinic-platform.vercel.app/register',
    plans: [
      { tier: 'Starter', price: 0, feat: ['25 Pasien/bulan', 'Rekam Medis Digital', 'Booking Online'] },
      { tier: 'Pro', price: 599000, feat: ['Unlimited Pasien', 'Integrasi SATUSEHAT¹', 'Antrian Otomatis', 'Laporan Harian'], popular: true },
      { tier: 'Business', price: 1499000, feat: ['Multi-Dokter', 'Custom Domain', 'API Integration', 'Priority Support'] },
    ]
  },
  {
    id: 'pharmacy',
    name: 'Portal Farmasi',
    subtitle: 'Manajemen apotek digital',
    icon: Pill,
    demoUrl: 'https://ja-pharmacy-platform.vercel.app/demo',
    registerUrl: 'https://wa.me/6281296917963?text=Halo%20Japan%20Arena%2C%20saya%20ingin%20coba%20trial%20Portal%20Farmasi%2014%20hari%20gratis.',
    plans: [
      { tier: 'Starter', price: 0, feat: ['500 SKU Obat', 'Kasir Digital', 'Laporan Transaksi'] },
      { tier: 'Pro', price: 449000, feat: ['Unlimited SKU', 'Alert Stok Habis Otomatis', 'Laporan Harian', 'Multi-Kasir'], popular: true },
      { tier: 'Business', price: 999000, feat: ['Multi-Cabang', 'Custom Domain', 'Integrasi Supplier', 'Priority Support'] },
    ]
  },
  {
    id: 'travel',
    name: 'Portal Travel & Rental',
    subtitle: 'Booking & kelola aset online',
    icon: Bus,
    demoUrl: 'https://ja-rental-platform.vercel.app/demo',
    registerUrl: 'https://ja-rental-platform.vercel.app/register',
    plans: [
      { tier: 'Starter', price: 0, feat: ['10 Unit Aset', 'Booking Online', 'Konfirmasi Otomatis'] },
      { tier: 'Pro', price: 749000, feat: ['Unlimited Unit', 'Anti Double Booking', 'Notif WA Otomatis', 'Laporan Pendapatan'], popular: true },
      { tier: 'Business', price: 1899000, feat: ['Multi-Lokasi', 'Custom Domain', 'API Pembayaran', 'Priority Support'] },
    ]
  },
  {
    id: 'stock',
    name: 'Portal Operasi (Stock)',
    subtitle: 'Stok, pesanan & operasi bisnis',
    icon: Boxes,
    demoUrl: 'https://stock.webzoka.com/demo',
    registerUrl: 'https://wa.me/6281296917963?text=' + encodeURIComponent('Halo Japan Arena, saya ingin coba trial Portal Operasi (Stock) 14 hari gratis.'),
    plans: [
      { tier: 'Starter', price: 0, feat: ['Akses penuh semua fitur Business', 'Coba 14 hari — tanpa kartu kredit', 'Data aman setelah trial berakhir'] },
      { tier: 'Pro', price: 499000, feat: ['Unlimited Produk', 'Lacak Lot & Kadaluarsa (FEFO)', 'Laporan Omzet & HPP', '3 Pengguna'], popular: true },
      { tier: 'Business', price: 999000, feat: ['WA Otomatis (Pembeli & Tim)', 'Modul Gaji & Slip via WA', 'Pengguna tak terbatas', 'Download Excel/PDF + Priority Support'] },
    ],
    comparison: [
      { label: 'Pantau stok & lot kadaluarsa (FEFO)', pro: true, business: true },
      { label: 'Kelola pesanan dari website', pro: true, business: true },
      { label: 'Resep produksi (BOM)', pro: true, business: true },
      { label: 'Ringkasan omzet & HPP', pro: true, business: true },
      { label: 'WA otomatis (pembeli & tim)', pro: false, business: true },
      { label: 'Download laporan (Excel/PDF)', pro: false, business: true },
      { label: 'Modul gaji & slip karyawan via WA', pro: false, business: true },
      { label: 'Laporan laba rugi + susut barang', pro: false, business: true },
      { label: 'Prioritas bantuan', pro: false, business: true },
      { label: 'Jumlah produk & pesanan', pro: 'Tak terbatas', business: 'Tak terbatas' },
      { label: 'Anggota tim', pro: '3 orang', business: 'Tak terbatas' },
      { label: 'Penyimpanan foto & file', pro: 'Wajar pakai', business: 'Wajar pakai' },
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
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group"
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
        <div role="tablist" aria-label="Pilih platform" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {PLATFORMS.map(p => {
            const isActive = activeTab === p.id
            return (
            <button
              key={p.id}
              id={`tab-${p.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${p.id}`}
              onClick={() => setActiveTab(p.id)}
              className={`flex flex-col items-start justify-center text-left h-full min-h-[64px] px-4 py-3 rounded-2xl border font-bold text-sm transition-all ${
                isActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-200'
                : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <p.icon size={16} className="shrink-0" /> {p.name}
              </div>
              <span className={`text-xs mt-0.5 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>{p.subtitle}</span>
            </button>
            )
          })}
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

        {/* Demo link — once per platform */}
        {currentPlatform.demoUrl && (
          <div className="text-center mb-8">
            <Link
              href={currentPlatform.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-blue-100 bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all group/demo"
            >
              Lihat demo {currentPlatform.name}
              <ExternalLink size={14} className="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        )}

        {/* Pricing Cards */}
        <div
          role="tabpanel"
          id={`tabpanel-${currentPlatform.id}`}
          aria-labelledby={`tab-${currentPlatform.id}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {currentPlatform.plans.map((plan, idx) => (
            <div
              key={plan.tier}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all flex flex-col ${
                plan.popular ? 'border-blue-600 shadow-2xl shadow-blue-100 ring-4 ring-blue-50' : 'border-black/[0.03] shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} /> Paling Populer
                </div>
              )}
              <div className="mb-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">{plan.tier}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-gray-900 sf-display-heavy">
                    {plan.price === 0 ? 'Gratis' : `Rp ${plan.price.toLocaleString('id-ID')}`}
                  </span>
                  {plan.price !== 0 && (
                    <span className="text-gray-400 text-sm font-medium">/bulan</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.feat.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href={plan.tier === 'Starter' ? currentPlatform.registerUrl : "https://wa.me/6281296917963"}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.96] text-sm ${
                    plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                    : plan.tier === 'Starter'
                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {plan.tier === 'Starter' ? 'Mulai trial 14 hari — gratis' : plan.tier === 'Business' ? 'Chat untuk Business Plan' : 'Mulai berlangganan'} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Contextual notes per platform */}
        <div className="mb-12 space-y-2 text-center">
          {activeTab === 'lms' && (
            <p className="inline-flex items-start justify-center gap-2 text-sm text-gray-500">
              <FolderOpen size={15} className="mt-0.5 shrink-0 text-gray-500" />
              <span><span className="font-semibold text-gray-700">Format konten yang didukung:</span> Video, PDF, Quiz, Tugas, Live Zoom — semua bisa diupload dari dashboard.</span>
            </p>
          )}
          {activeTab === 'clinic' && (
            <p className="text-xs text-gray-500">
              ¹ SATUSEHAT = sistem rekam medis resmi Kementerian Kesehatan RI, wajib bagi klinik yang terdaftar di Kemkes.
            </p>
          )}
          {activeTab === 'stock' && (
            <p className="inline-flex items-start justify-center gap-2 text-sm text-gray-500">
              <Package size={15} className="mt-0.5 shrink-0 text-gray-500" />
              <span><span className="font-semibold text-gray-700">Trial 14 hari = akses penuh fitur Business.</span> Setelah trial, pilih Pro atau Business. Cocok untuk warung & produksi: pesanan dari website langsung masuk ke stok, lengkap lacak lot kadaluarsa (FEFO) dan resep produksi.</span>
            </p>
          )}
          <p className="inline-flex items-start justify-center gap-2 text-sm text-gray-500">
            <Lightbulb size={15} className="mt-0.5 shrink-0 text-gray-500" />
            <span><span className="font-medium text-gray-700">Harga berlaku untuk 1 akun bisnis.</span>{' '}
            Punya lebih dari 1 cabang?{' '}
            <a
              href="https://wa.me/6281296917963?text=Saya%20ingin%20tanya%20soal%20paket%20multi-cabang%20Japan%20Arena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071E3] font-bold hover:underline"
            >
              Tanyakan paket bundle →
            </a>
            </span>
          </p>
        </div>

        {/* Feature comparison table — only for platforms that define `comparison` (currently Stock) */}
        {currentPlatform.comparison && (
          <div className="mb-20 overflow-hidden rounded-3xl border border-black/[0.03] bg-white shadow-sm">
            <div className="px-6 py-6 border-b border-black/5 text-center">
              <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-2">Detail Fitur</p>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight sf-display-heavy">
                {currentPlatform.name} — Pro vs Business
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-black/5 bg-gray-50/60">
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-gray-500 w-1/2">Fitur</th>
                    <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-widest text-gray-600 w-1/4">Pro</th>
                    <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-widest text-blue-600 w-1/4">Business</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {currentPlatform.comparison.map((row) => (
                    <tr key={row.label} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 text-sm font-bold text-gray-600">{row.label}</td>
                      <td className="px-4 py-3.5 text-center">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 border border-blue-100 mx-auto">
                              <Check className="h-3 w-3 text-blue-600" strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="text-gray-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="text-sm font-bold text-gray-700">{row.pro}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {typeof row.business === 'boolean' ? (
                          row.business ? (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 border border-blue-200 mx-auto">
                              <Check className="h-3 w-3 text-blue-600" strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="text-gray-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="text-sm font-black text-blue-600">{row.business}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-black/5 text-center">
              <p className="text-xs text-gray-500 font-medium">
                Coba semua fitur Business gratis 14 hari — tanpa kartu kredit.
              </p>
            </div>
          </div>
        )}

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
                a: 'Transfer bank, QRIS, kartu kredit, atau minimarket (Alfamart/Indomaret) via Midtrans. Konfirmasi pembayaran otomatis masuk via WA.',
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
              <div key={i} className="bg-[#F5F5F7] rounded-3xl p-8 border border-black/[0.03]">
                <h3 className="text-base font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 font-medium">
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
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/30">
                <Zap size={12} fill="currentColor" /> Keuntungan Ekosistem Terintegrasi
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight sf-display-heavy">
                Gunakan Seluruh Ekosistem, Hemat <span className="text-blue-500">25%</span> dari Total
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-medium">
                Bisnis Anda berkembang pesat? Gabungkan 3 portal atau lebih dalam satu paket <span className="text-white font-black">JapanArena Business Bundle</span> dan hemat 25% dari total langganan — kombinasi apa pun, data tersinkron real-time.
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
            
            <div className="shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center border-dashed">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Business Bundle</p>
                <div className="text-5xl font-black text-white mb-1 sf-display-heavy">Hemat 25%</div>
                <p className="text-sm text-gray-400 font-medium mb-6">dari total langganan bulanan</p>
                <a
                  href="https://wa.me/6281296917963?text=Halo%20Japan%20Arena%2C%20saya%20tertarik%20dengan%20Business%20Bundle%20untuk%20beberapa%20portal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-[0.96] shadow-xl"
                >
                  Chat Tim Kami <MessageCircle size={20} />
                </a>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  *Berlaku untuk langganan minimal 3 portal sekaligus, kombinasi
                  apa pun. Contoh: LMS + Klinik + Travel (Rp 1.847.000/bln) →{" "}
                  <span className="font-medium text-green-400">
                    Rp 1.385.250/bln, hemat Rp 461.750
                  </span>.
                </p>
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
