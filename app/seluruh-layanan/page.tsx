'use client'

import { useState, useMemo, useEffect } from 'react'
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
  Users,
  Briefcase,
  GraduationCap,
  Building,
  Utensils,
  ShoppingCart,
  User,
  Newspaper,
  Car,
  Plane,
  ChevronLeft
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

// --- CUSTOM HOOK: Odometer Animation ---
function useAnimatedNumber(value: number, duration = 800) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number;
    const startValue = displayValue;
    const difference = value - startValue;

    if (difference === 0) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(Math.floor(startValue + difference * easeProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value); // Ensure it lands exactly on target
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]); // Intentionally omitting displayValue to avoid infinite loops

  return displayValue;
}

// --- TEMPLATES WITH ICONS ---
const TEMPLATE_OPTIONS = [
  { name: 'Website Perusahaan', icon: Briefcase },
  { name: 'Toko Online', icon: ShoppingCart },
  { name: 'Website Sekolah / LPK', icon: GraduationCap },
  { name: 'Website Institusi', icon: Building },
  { name: 'Website Restaurant', icon: Utensils },
  { name: 'Personal Branding', icon: User },
  { name: 'Blog / Media', icon: Newspaper },
  { name: 'Travel & Rental', icon: Plane },
  { name: 'Custom Jastip', icon: Car },
]

export default function SeluruhLayananPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_OPTIONS[0].name)
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
    
    // Auto-advance to Step 3 (Fitur) since Bundle already defines the Server
    setTimeout(() => {
        setCurrentStep(3);
        window.scrollTo({ top: 150, behavior: 'smooth' });
    }, 400); // Slight delay for visual feedback of selection before jumping
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
    const activeBundle = selectedBundleId ? BUNDLES.find(b => b.id === selectedBundleId) : null;
    const setup = activeBundle 
      ? activeBundle.bundlePrice 
      : selectedPackage.price + selectedAddons.reduce((acc, curr) => acc + curr.price, 0)
    const maintain = selectedPackage.maintain + selectedAddons.reduce((acc, curr) => acc + Math.round(curr.price * 0.5), 0)
    return { setupTotal: setup, maintainTotal: maintain }
  }, [selectedPackage, selectedAddons, selectedBundleId])

  // Apply Animation Hook
  const animatedSetupTotal = useAnimatedNumber(setupTotal);

  const hasPortalFeatures = useMemo(() => {
    const categories = ['lms', 'travel', 'medical']
    const found = selectedAddons.find(a => categories.includes(a.category))
    return found ? found : null
  }, [selectedAddons])

  const waMessage = useMemo(() => {
    const addonText = selectedAddons.length > 0
      ? selectedAddons.map(a => `- ${a.name}`).join('\n')
      : '- Tanpa add-on tambahan'

    const activeBundle = selectedBundleId ? BUNDLES.find(b => b.id === selectedBundleId) : null;
    const bundleNote = activeBundle ? `\n\n*(Menggunakan Promo Rakitan: ${activeBundle.name})*` : '';

    const msg = `Halo Japan Arena Corp,

Saya tertarik menggunakan layanan berikut:

Template:
${selectedTemplate}

Paket Hosting:
${selectedPackage.name} (${selectedPackage.storage} Storage)

Add-on:
${addonText}${bundleNote}

Estimasi setup tahun pertama:
Rp ${setupTotal.toLocaleString('id-ID')}

Estimasi maintenance tahun ke-2:
Rp ${maintainTotal.toLocaleString('id-ID')}

Mohon info detail selanjutnya.
Terima kasih.`
    return encodeURIComponent(msg)
  }, [selectedTemplate, selectedPackage, selectedAddons, setupTotal, maintainTotal, selectedBundleId])

  const STEPS = [
    { num: 1, title: 'Fondasi' },
    { num: 2, title: 'Server' },
    { num: 3, title: 'Fitur Custom' },
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
          
          {/* Left Column: Wizard */}
          <div className="lg:col-span-8 space-y-6 pb-20 flex flex-col min-h-[600px]">
            
            {/* Stepper Header */}
            <div className="bg-white rounded-[24px] p-2 apple-shadow border border-black/[0.03] flex items-center justify-between mb-2">
                {STEPS.map((step, idx) => {
                    const isActive = currentStep === step.num;
                    const isPassed = currentStep > step.num;
                    return (
                        <div key={step.num} className="flex-1 flex items-center">
                            <button 
                                onClick={() => setCurrentStep(step.num)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all w-full ${
                                    isActive ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0 ${
                                    isActive ? 'bg-[#0071E3] text-white shadow-md shadow-blue-200' : 
                                    isPassed ? 'bg-blue-100 text-[#0071E3]' : 
                                    'bg-gray-100 text-gray-400'
                                }`}>
                                    {isPassed ? <Check size={16} strokeWidth={3} /> : step.num}
                                </div>
                                <span className={`text-sm font-bold hidden sm:block ${isActive ? 'text-[#0071E3]' : isPassed ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step.title}
                                </span>
                            </button>
                            {idx !== STEPS.length - 1 && (
                                <div className={`h-[2px] flex-1 mx-2 rounded-full transition-all ${isPassed ? 'bg-blue-100' : 'bg-gray-100'}`} />
                            )}
                        </div>
                    )
                })}
            </div>

            {/* WIZARD CONTENT AREA */}
            <div className="flex-1 transition-all duration-500 relative">
                
                {/* STEP 1: FONDASI & BUNDLING */}
                {currentStep === 1 && (
                    <div className="space-y-8 animate-fade-in">
                        <section className="bg-white rounded-[32px] p-5 md:p-8 apple-shadow border border-black/[0.03]">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Pilih Jenis Industri</h2>
                                    <p className="text-sm text-gray-400 font-medium mt-1">Kami akan menyesuaikan desain dasar (template) untuk Anda.</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0071E3] shrink-0">
                                    <Layout size={24} />
                                </div>
                            </div>

                            {/* Bento Grid Template Selection */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {TEMPLATE_OPTIONS.map((tpl) => {
                                    const Icon = tpl.icon;
                                    const isSelected = selectedTemplate === tpl.name;
                                    return (
                                        <button
                                            key={tpl.name}
                                            onClick={() => setSelectedTemplate(tpl.name)}
                                            className={`p-4 rounded-[20px] border-2 text-left transition-all flex flex-col gap-3 group ${
                                                isSelected 
                                                ? 'border-[#0071E3] bg-blue-50/30 ring-4 ring-blue-50' 
                                                : 'border-black/[0.03] hover:border-blue-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                                isSelected ? 'bg-[#0071E3] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                            }`}>
                                                <Icon size={20} />
                                            </div>
                                            <span className={`text-sm font-bold leading-tight ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                                                {tpl.name}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>

                        {/* Bundle Promo Callout */}
                        <section className="bg-gradient-to-br from-gray-900 via-[#1A1A24] to-black rounded-[32px] p-8 text-white relative overflow-hidden apple-shadow">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-20 -mt-20 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Jalur Cepat (Opsional)</p>
                                </div>
                                <h3 className="text-2xl font-black mb-2 sf-display-heavy">Rekomendasi Rakitan</h3>
                                <p className="text-sm text-gray-400 font-medium mb-6">Gunakan bundle fitur yang sering dipakai industri sejenis untuk hemat hingga 25%.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {BUNDLES.map((bundle) => {
                                    const hostingPkg = HOSTING_PACKAGES.find(h => h.id === bundle.hostingId)
                                    const isSelected = selectedBundleId === bundle.id
                                    return (
                                    <button
                                        key={bundle.id}
                                        onClick={() => handleSelectBundle(bundle)}
                                        className={`text-left p-6 rounded-[24px] border-2 transition-all relative overflow-hidden ${
                                        isSelected
                                            ? 'border-yellow-400 bg-white/10'
                                            : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 to-transparent pointer-events-none" />
                                        )}
                                        <div className="flex items-center justify-between mb-4 relative z-10">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl border border-white/5">
                                                {bundle.emoji}
                                            </div>
                                            {isSelected && (
                                                <span className="text-[10px] font-black bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full uppercase tracking-wider">Dipilih</span>
                                            )}
                                        </div>
                                        <p className="font-black text-lg mb-2 relative z-10">{bundle.name}</p>
                                        <p className="text-[12px] text-gray-400 leading-relaxed mb-4 relative z-10 min-h-[54px]">{bundle.desc}</p>
                                        
                                        <div className="pt-4 border-t border-white/10 relative z-10">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-xs text-gray-500 line-through">Rp {bundle.normalPrice.toLocaleString('id-ID')}</span>
                                                <span className="font-black text-yellow-400 text-xl tracking-tight">Rp {bundle.bundlePrice.toLocaleString('id-ID')}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-bold">
                                                Termasuk Server {hostingPkg?.name} + {bundle.addonIds.length} Fitur
                                            </p>
                                        </div>
                                    </button>
                                    )
                                })}
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* STEP 2: SERVER */}
                {currentStep === 2 && (
                    <div className="space-y-8 animate-fade-in">
                        <section className="bg-white rounded-[32px] p-5 md:p-8 apple-shadow border border-black/[0.03]">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Kapasitas Server & Storage</h2>
                                    <p className="text-sm text-gray-400 font-medium mt-1">Sesuaikan dengan proyeksi traffic dan media Anda.</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                    <Server size={24} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {HOSTING_PACKAGES.map((pkg) => {
                                    const isSelected = selectedPackage.id === pkg.id;
                                    return (
                                    <button
                                        key={pkg.id}
                                        onClick={() => { setSelectedPackage(pkg); setSelectedBundleId(null) }}
                                        className={`flex flex-col p-6 rounded-[24px] border-2 transition-all group ${
                                            isSelected 
                                            ? 'border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-50' 
                                            : 'border-black/[0.03] hover:border-emerald-200'
                                        }`}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-3">
                                            <div className="flex items-center gap-5 mb-4 md:mb-0">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'}`}>
                                                    <Database size={24} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-gray-900 text-lg">{pkg.name} Server</p>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-tight rounded-md">
                                                            <Server size={12}/> {pkg.storage} Storage
                                                        </span>
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-tight rounded-md">
                                                            <Users size={12}/> {pkg.visitor}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left md:text-right">
                                                <p className={`text-2xl font-black tracking-tight ${isSelected ? 'text-emerald-700' : 'text-gray-900'}`}>
                                                    Rp {pkg.price.toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Setup & Tahun Pertama</p>
                                            </div>
                                        </div>
                                        <div className={`text-left text-sm leading-relaxed border-t pt-3 w-full transition-colors ${isSelected ? 'text-emerald-800 border-emerald-200/50' : 'text-gray-500 border-black/[0.03]'}`}>
                                            {pkg.description}
                                        </div>
                                    </button>
                                    )
                                })}
                            </div>

                            <div className="mt-8 p-5 rounded-[20px] bg-amber-50 border border-amber-100 flex gap-4">
                                <AlertCircle className="text-amber-500 shrink-0" size={24} />
                                <p className="text-sm text-amber-900 leading-relaxed font-medium">
                                    <strong>Saran Tim IT:</strong> Pilih paket lebih tinggi jika Anda berencana mengupload banyak gambar resolusi tinggi, video materi, atau mengharapkan lonjakan pengunjung. Paket dapat di-upgrade kapan saja tanpa merusak web.
                                </p>
                            </div>
                        </section>
                    </div>
                )}

                {/* STEP 3: FITUR CUSTOM */}
                {currentStep === 3 && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Smart Recommendation Callout */}
                        {hasPortalFeatures && (
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white apple-shadow relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16" />
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                                        <Zap size={32} fill="currentColor" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-lg font-bold mb-1">Butuh fitur {hasPortalFeatures.portalName}?</h3>
                                        <p className="text-white/80 text-sm font-medium leading-relaxed">
                                            Anda sedang mencoba merakit fitur yang sudah tersedia sebagai Produk Jadi di ekosistem kami. 
                                            Lebih hemat dan tidak perlu biaya setup custom per fitur!
                                        </p>
                                    </div>
                                    <Link 
                                        href={hasPortalFeatures.portalLink || '/pricing'}
                                        className="px-6 py-3 bg-white text-blue-600 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl whitespace-nowrap"
                                    >
                                        Cek Paket Langganan <ChevronRight size={16} className="inline ml-1" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {Object.entries(ADDON_GROUPS).map(([key, group]) => {
                            const isExpanded = expandedGroups.includes(key);
                            return (
                                <section key={key} className="bg-white rounded-[24px] apple-shadow border border-black/[0.03] overflow-hidden">
                                    <button 
                                        onClick={() => toggleGroup(key)}
                                        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${isExpanded ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
                                            <h3 className="text-lg font-bold text-gray-900">{group.title}</h3>
                                            <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
                                                {group.items.length} Fitur
                                            </span>
                                        </div>
                                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                            <ChevronRight size={20} className="text-gray-400" />
                                        </div>
                                    </button>

                                    {isExpanded && (
                                        <div className="px-8 pb-8 animate-fade-in">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {group.items.map(addon => {
                                                    const isActive = selectedAddons.find(a => a.id === addon.id)
                                                    return (
                                                        <button
                                                            key={addon.id}
                                                            onClick={() => toggleAddon(addon)}
                                                            className={`group p-5 rounded-[20px] border-2 text-left transition-all relative overflow-hidden ${
                                                                isActive 
                                                                    ? 'border-[#0071E3] bg-blue-50/50' 
                                                                    : 'border-black/[0.03] hover:border-blue-200 bg-white hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {isActive && (
                                                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#0071E3] rounded-full flex items-center justify-center text-white">
                                                                    <Check size={14} strokeWidth={4} />
                                                                </div>
                                                            )}
                                                            <h4 className={`font-bold text-sm mb-3 pr-8 transition-colors ${isActive ? 'text-[#0071E3]' : 'text-gray-900'}`}>
                                                                {addon.name}
                                                            </h4>
                                                            <div className="space-y-1">
                                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Setup Cost</p>
                                                                <p className={`text-lg font-black tracking-tight ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                                                                    Rp {addon.price.toLocaleString('id-ID')}
                                                                </p>
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
                                        </div>
                                    )}
                                </section>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* WIZARD NAVIGATION BUTTONS */}
            <div className="flex items-center justify-between pt-4 border-t border-black/5 mt-auto">
                <button
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                        currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    <ChevronLeft size={18} /> Kembali
                </button>
                
                {currentStep < 3 ? (
                    <button
                        onClick={() => {
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                            setCurrentStep(prev => prev + 1);
                        }}
                        className="flex items-center gap-2 px-8 py-3 bg-[#0071E3] text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
                    >
                        Lanjutkan <ArrowRight size={18} />
                    </button>
                ) : (
                    <div className="text-sm font-bold text-emerald-600 flex items-center gap-2 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100">
                        <Check size={18} /> Setup Selesai
                    </div>
                )}
            </div>

          </div>

          {/* Right Column: Summary (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-[32px] p-6 apple-shadow border-2 border-[#0071E3]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl -mr-16 -mt-16 pointer-events-none" />
              
              <h2 className="text-xl font-black text-gray-900 mb-5 sf-display-heavy relative z-10">Estimasi Biaya</h2>

              <div className="space-y-4 relative z-10">
                {selectedBundleId ? (
                    <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200/50">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Zap size={14} className="text-yellow-600" fill="currentColor" />
                            <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest">Promo Rakitan Aktif</p>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-bold text-gray-900">{BUNDLES.find(b => b.id === selectedBundleId)?.name}</p>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 line-through">Rp {BUNDLES.find(b => b.id === selectedBundleId)?.normalPrice.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-500">
                            Termasuk Server {selectedPackage.name} + {selectedAddons.length} Fitur Custom.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-black/5 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 shadow-sm shrink-0">
                                <Layout size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Template Dasar</p>
                                <p className="text-sm font-bold text-gray-900 leading-tight">{selectedTemplate}</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-black/5">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Paket Server</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <Server size={14} className="text-[#0071E3]" /> {selectedPackage.name}
                                </p>
                                <p className="text-sm font-bold text-[#0071E3]">Rp {selectedPackage.price.toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Fitur Tambahan</p>
                            {selectedAddons.length > 0 ? (
                                <div className="bg-[#F5F5F7] rounded-xl p-4 border border-black/5 space-y-2">
                                    {selectedAddons.map(addon => (
                                        <div key={addon.id} className="flex justify-between items-center text-xs font-bold border-b border-black/[0.03] pb-2 last:border-0 last:pb-0">
                                            <span className="text-gray-600">{addon.name}</span>
                                            <span className="text-gray-900">Rp {addon.price.toLocaleString('id-ID')}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="text-[11px] text-gray-400 font-medium italic">Belum ada add-on terpilih</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
              </div>

              {/* Fixed Bottom Section (Totals & Button) */}
              <div className="pt-5 border-t border-black/5 relative z-10 mt-5 bg-white">
                <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Setup Tahun Pertama</span>
                            <p className="text-2xl font-black text-[#0071E3] tracking-tight">
                                Rp {animatedSetupTotal.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                        <span className="text-[11px] font-bold text-blue-900">Renewal Thn 2+</span>
                        <span className="text-sm font-black text-blue-900">Rp {maintainTotal.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <a 
                    href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-2xl bg-gray-900 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95"
                >
                    Checkout via WA <ArrowRight size={18} />
                </a>

                <div className="mt-4 flex items-start gap-2">
                    <Info size={14} className="text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                        Harga estimasi final dapat berubah menyesuaikan tingkat kompleksitas custom & lisensi aset.
                    </p>
                </div>
              </div>
            </div>

            {/* Support Link */}
            <div className="mt-5 text-center">
                <p className="text-xs text-gray-400 font-medium">Bingung memilih? <Link href={waLink('Halo Japan Arena, saya butuh bantuan memilih fitur website.')} className="text-[#0071E3] font-bold hover:underline">Konsultasi Gratis</Link></p>
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
                Lihat Paket Langganan <ArrowRight size={18} />
              </Link>          </div>
      </section>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-6 lg:hidden z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex items-center justify-between">
          <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Setup Thn 1</span>
              <p className="text-xl font-black text-[#0071E3] tracking-tight">
                  Rp {animatedSetupTotal.toLocaleString('id-ID')}
              </p>
          </div>
          {currentStep < 3 ? (
              <button
                  onClick={() => {
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                      setCurrentStep(prev => prev + 1);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0071E3] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 active:scale-95 transition-all"
              >
                  Lanjut <ArrowRight size={16} />
              </button>
          ) : (
              <a 
                  href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all"
              >
                  Checkout <ArrowRight size={16} />
              </a>
          )}
      </div>
    </div>
  )
}

function waLink(msg: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}