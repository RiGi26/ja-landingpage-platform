'use client'

import { useState, useMemo } from 'react'
import { 
  Check, 
  ArrowRight, 
  MessageCircle, 
  Globe, 
  Zap, 
  Shield, 
  AlertCircle,
  Layout,
  Smartphone,
  Server,
  ChevronRight,
  Info,
  Database,
  Users
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'
import {
  HOSTING_PACKAGES,
  ADDON_GROUPS,
  Addon,
  HostingPackage,
  BUNDLES,
  Bundle
} from '@/constants/services'

const WA_NUMBER = '6281296917963'

export default function SeluruhLayananPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('Website Perusahaan')
  const [selectedPackage, setSelectedPackage] = useState<HostingPackage>(HOSTING_PACKAGES[0])
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([])
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null)

  const handleSelectBundle = (bundle: Bundle) => {
    if (selectedBundleId === bundle.id) {
      setSelectedBundleId(null)
      setSelectedPackage(HOSTING_PACKAGES[0])
      setSelectedAddons([])
      return
    }
    setSelectedBundleId(bundle.id)
    const pkg = HOSTING_PACKAGES.find(h => h.id === bundle.hostingId)
    if (pkg) setSelectedPackage(pkg)
    const addons = Object.values(ADDON_GROUPS)
      .flatMap(g => g.items)
      .filter(a => bundle.addonIds.includes(a.id))
    setSelectedAddons(addons)
  }

  const toggleAddon = (addon: Addon) => {
    setSelectedBundleId(null)
    setSelectedAddons(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    )
  }

  const { setupTotal, maintainTotal } = useMemo(() => {
    const setup = selectedPackage.price + selectedAddons.reduce((acc, curr) => acc + curr.price, 0)
    const maintain = selectedPackage.maintain + selectedAddons.reduce((acc, curr) => acc + Math.round(curr.price * 0.5), 0)
    return { setupTotal: setup, maintainTotal: maintain }
  }, [selectedPackage, selectedAddons])

  const hasPortalFeatures = useMemo(() => {
    const categories = ['lms', 'travel', 'medical']
    const found = selectedAddons.find(a => categories.includes(a.category))
    return found ? found : null
  }, [selectedAddons])

  const waMessage = useMemo(() => {
    const addonText = selectedAddons.length > 0
      ? selectedAddons.map(a => `- ${a.name}`).join('\n')
      : '- Tanpa add-on tambahan'

    const msg = `Halo Japan Arena Corp,

Saya tertarik menggunakan layanan berikut:

Template:
${selectedTemplate}

Paket Hosting:
${selectedPackage.name} (${selectedPackage.storage} Storage)

Add-on:
${addonText}

Estimasi setup tahun pertama:
Rp ${setupTotal.toLocaleString('id-ID')}

Estimasi maintenance tahun ke-2:
Rp ${maintainTotal.toLocaleString('id-ID')}

Mohon info detail selanjutnya.
Terima kasih.`
    return encodeURIComponent(msg)
  }, [selectedTemplate, selectedPackage, selectedAddons, setupTotal, maintainTotal])

  const templates = [
    'Website Perusahaan', 'Website Sekolah', 'Website LPK', 'Website Bimbel',
    'Website Institusi', 'Website Travel', 'Website Klinik', 'Website Restaurant',
    'Website Toko Online', 'Website Personal Branding', 'Website Blog / Media',
    'Website Jastip', 'Website Rental Mobil'
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-32 px-4">
        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0071E3] text-[11px] font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-100">
            <Zap size={14} fill="currentColor" /> Kalkulator Estimasi Biaya Transparan
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight sf-display-heavy mb-6">
            Kalkulator Pembuatan Website.<br />
            <span className="text-[#0071E3]">Transparan Mulai Rp 600.000.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl font-medium">
            Pilih template dasar, paket server, dan tambahkan fitur yang Anda butuhkan. 
            Tanpa biaya tersembunyi, biaya perpanjangan transparan sejak awal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Options */}
          <div className="lg:col-span-8 space-y-8 pb-20">
            
            {/* Step 1: Template */}
            <section className="bg-white rounded-[32px] p-8 apple-shadow border border-black/[0.03]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0071E3]">
                  <Layout size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">1. Pilih Jenis Website</h2>
                  <p className="text-sm text-gray-400 font-medium">Template dasar sesuai industri Anda</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Kategori Bisnis</label>
                    <div className="relative">
                        <select 
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className="w-full p-4 rounded-2xl bg-[#F5F5F7] border border-black/5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                        >
                            {templates.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={18} />
                    </div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100/50">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="text-blue-600" size={18} />
                        <span className="text-sm font-bold text-blue-900">Basic Branding Pack</span>
                    </div>
                    <ul className="text-[13px] text-blue-700/80 space-y-1 font-medium">
                        <li>• Landing Page Modern & Responsive</li>
                        <li>• Setup Domain & Keamanan SSL</li>
                        <li>• Maintenance Ringan & Backup</li>
                    </ul>
                </div>
              </div>
            </section>

            {/* Step 2: Hosting & Storage */}
            <section className="bg-white rounded-[32px] p-8 apple-shadow border border-black/[0.03]">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Server size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">2. Pilih Paket Server & Storage</h2>
                        <p className="text-sm text-gray-400 font-medium">Sesuaikan dengan kapasitas data & traffic</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {HOSTING_PACKAGES.map((pkg) => (
                        <button
                            key={pkg.id}
                            onClick={() => { setSelectedPackage(pkg); setSelectedBundleId(null) }}
                            className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                                selectedPackage.id === pkg.id 
                                ? 'border-emerald-500 bg-emerald-50/30' 
                                : 'border-black/[0.03] hover:border-emerald-200'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-3 md:mb-0">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPackage.id === pkg.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <Database size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">{pkg.name} Package</p>
                                    <div className="flex gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                                        <span className="flex items-center gap-1"><Server size={12}/> {pkg.storage} Storage</span>
                                        <span className="flex items-center gap-1"><Users size={12}/> {pkg.visitor}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <p className={`text-lg font-black ${selectedPackage.id === pkg.id ? 'text-emerald-700' : 'text-gray-900'}`}>
                                    Rp {pkg.price.toLocaleString('id-ID')}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Setup & Thn 1</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
                    <AlertCircle className="text-amber-600 shrink-0" size={20} />
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        <strong>Tips:</strong> Pilih paket lebih tinggi jika Anda berencana mengupload banyak gambar produk, video materi, atau mengharapkan traffic pengunjung yang ramai. Paket dapat di-upgrade kapan saja.
                    </p>
                </div>
            </section>

            {/* Smart Recommendation Callout */}
            {hasPortalFeatures && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white apple-shadow animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16" />
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                            <Zap size={32} fill="currentColor" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg font-bold mb-1">Butuh fitur {hasPortalFeatures.portalName}?</h3>
                            <p className="text-white/80 text-sm font-medium leading-relaxed">
                                Fitur yang Anda pilih sudah tersedia secara lengkap di sistem portal kami. 
                                Lebih hemat biaya, fitur lebih matang, dan tanpa biaya setup per fitur.
                            </p>
                        </div>
                        <Link 
                            href={hasPortalFeatures.portalLink || '/pricing'}
                            className="px-6 py-3 bg-white text-blue-600 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl whitespace-nowrap"
                        >
                            Cek Paket Portal <ChevronRight size={16} className="inline ml-1" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Bundle Paket Hemat */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl -mr-20 -mt-20" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Paket Bundling — Hemat hingga 25%</p>
                </div>
                <h3 className="text-xl font-black mb-6">Pilih Paket Siap Pakai</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {BUNDLES.map((bundle) => {
                    const hostingPkg = HOSTING_PACKAGES.find(h => h.id === bundle.hostingId)
                    const isSelected = selectedBundleId === bundle.id
                    return (
                      <button
                        key={bundle.id}
                        onClick={() => handleSelectBundle(bundle)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-yellow-400 bg-white/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg">{bundle.emoji}</span>
                          {isSelected && (
                            <span className="text-[9px] font-black bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full uppercase">Dipilih</span>
                          )}
                        </div>
                        <p className="font-black text-sm mb-1">{bundle.name}</p>
                        <p className="text-[11px] text-white/70 leading-relaxed mb-3">{bundle.desc}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-white/50 line-through">Rp {bundle.normalPrice.toLocaleString('id-ID')}</span>
                          <span className="font-black text-yellow-300">Rp {bundle.bundlePrice.toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-[9px] text-blue-200 mt-1">
                          Hosting {hostingPkg?.name} + {bundle.addonIds.length} add-on terpilih
                        </p>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[10px] text-blue-200 mt-4 text-center">
                  atau pilih manual di bawah — kalkulator estimasi tetap aktif
                </p>
              </div>
            </section>

            {/* Step 3: Add-ons */}
            {Object.entries(ADDON_GROUPS).map(([key, group]) => (
              <section key={key} className="bg-white rounded-[32px] p-8 apple-shadow border border-black/[0.03]">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  {group.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map(addon => {
                    const isActive = selectedAddons.find(a => a.id === addon.id)
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`group p-6 rounded-[24px] border-2 text-left transition-all relative overflow-hidden ${
                          isActive 
                            ? 'border-[#0071E3] bg-blue-50/50' 
                            : 'border-black/[0.03] hover:border-blue-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-[#0071E3] rounded-full flex items-center justify-center text-white">
                            <Check size={14} strokeWidth={4} />
                          </div>
                        )}
                        <h4 className={`font-bold mb-4 pr-8 transition-colors ${isActive ? 'text-[#0071E3]' : 'text-gray-900'}`}>
                          {addon.name}
                        </h4>
                        <div className="space-y-1">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Setup Cost</p>
                          <p className={`text-lg font-black tracking-tight ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                            Rp {addon.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-black/[0.03] flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Maintenance Thn 2+</span>
                            <span className="text-[10px] font-bold text-blue-600">Rp {(addon.price * 0.5).toLocaleString('id-ID')}</span>
                        </div>
                        {addon.disclaimer && (
                          <div className="mt-3 pt-3 border-t border-black/[0.03] flex items-start gap-2">
                            <Info size={12} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[9px] text-amber-700 leading-relaxed font-medium">{addon.disclaimer}</p>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Right Column: Summary (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-[40px] p-8 apple-shadow border-2 border-[#0071E3]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl -mr-16 -mt-16" />
              
              <h2 className="text-2xl font-black text-gray-900 mb-8 sf-display-heavy relative z-10">Estimasi Biaya</h2>

              <div className="space-y-6 mb-8 relative z-10">
                <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Paket Server ({selectedPackage.name})</p>
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-gray-900">{selectedTemplate}</p>
                        <p className="font-bold text-[#0071E3]">Rp {selectedPackage.price.toLocaleString('id-ID')}</p>
                    </div>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {selectedAddons.length > 0 ? (
                        selectedAddons.map(addon => (
                            <div key={addon.id} className="flex justify-between items-center text-sm font-bold border-b border-black/[0.03] pb-3 last:border-0">
                                <span className="text-gray-600">{addon.name}</span>
                                <span className="text-gray-900">Rp {addon.price.toLocaleString('id-ID')}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400 text-center py-4 font-medium italic">Belum ada add-on terpilih</p>
                    )}
                </div>
              </div>

              <div className="space-y-4 mb-8 pt-6 border-t border-black/5 relative z-10">
                <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Setup Tahun Pertama</span>
                        <p className="text-2xl font-black text-[#0071E3] tracking-tight">
                            Rp {setupTotal.toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <span className="text-xs font-bold text-blue-900">Renewal Thn 2+ (hemat ~38%)</span>
                    <span className="text-lg font-black text-blue-900">Rp {maintainTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <a 
                href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 rounded-[20px] bg-[#25D366] text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-green-100 active:scale-95"
              >
                <MessageCircle size={20} fill="currentColor" /> Chat Admin via WA
              </a>

              <div className="mt-6 p-4 rounded-xl bg-gray-50 flex items-start gap-3">
                <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                    Harga estimasi dapat berubah sesuai dengan kompleksitas request custom dan revisi desain.
                </p>
              </div>
            </div>

            {/* Support Link */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 font-medium">Bingung memilih? <Link href={waLink('Halo Japan Arena, saya butuh bantuan memilih fitur website.')} className="text-[#0071E3] font-bold hover:underline">Konsultasi Gratis</Link></p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer / FAQ Shortcut */}
      <section className="bg-white py-20 mt-20 border-t border-black/5">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Butuh Sistem yang Lebih Kompleks?</h2>
              <p className="text-gray-500 mb-8 font-medium">Kami siap membantu membangun platform digital skala enterprise sesuai kebutuhan spesifik bisnis Anda.</p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all"
              >
                Lihat Paket Berlangganan (SaaS) <ArrowRight size={18} />
              </Link>          </div>
      </section>
    </div>
  )
}

function waLink(msg: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
