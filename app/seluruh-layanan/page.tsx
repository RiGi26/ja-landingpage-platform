'use client'

import { useState, useMemo, useEffect } from 'react'
import { getStoredRef } from '../RefCapture'
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
  Stethoscope,
  ChevronLeft,
  ExternalLink,
  Sparkles,
  Loader2,
  Wrench,
  Camera,
  Crown,
  ChevronUp,
  X
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'
import {
  HOSTING_PACKAGES,
  ADDON_GROUPS,
  Addon,
  HostingPackage,
  BUNDLES,
  Bundle,
  RECOMMENDED_ADDONS,
  isPricedAddon
} from '@/constants/services'
import ThemeGallery, { galleryForLabel } from './ThemeGallery'

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
  { name: 'Website Perusahaan', icon: Briefcase, subtitle: 'CV, PT, firma, yayasan' },
  { name: 'Toko Online', icon: ShoppingCart, subtitle: 'Produk fisik, olshop, marketplace pribadi' },
  { name: 'Website Klinik & Spa', icon: Stethoscope, subtitle: 'Klinik, pijat, perawatan, kecantikan' },
  { name: 'Website Sekolah / LPK', icon: GraduationCap, subtitle: 'Kursus, bimbel, pelatihan, les privat' },
  { name: 'Website Institusi', icon: Building, subtitle: 'Organisasi, komunitas, lembaga' },
  { name: 'Website Restaurant', icon: Utensils, subtitle: 'Resto, kafe, warung makan, catering' },
  { name: 'Personal Branding', icon: User, subtitle: 'Freelancer, konsultan, fotografer' },
  { name: 'Blog / Media', icon: Newspaper, subtitle: 'Berita, review, komunitas, blog' },
  { name: 'Travel & Rental', icon: Plane, subtitle: 'Rental mobil, motor, alat, wisata' },
  { name: 'Custom Jastip', icon: Car, subtitle: 'Layanan titip beli, pengiriman khusus' },
  { name: 'Kuliner & Makanan', icon: Utensils, subtitle: 'Katering, kue rumahan, UMKM kuliner, warung, cloud kitchen' },
  { name: 'Studio & Kreatif', icon: Camera, subtitle: 'Fotografer, videografer, studio foto, galeri seni, desainer' },
  { name: 'Bisnis Jasa & Lainnya', icon: Wrench, subtitle: 'Bengkel, salon, laundry, gym, kontraktor, dan jasa lainnya' },
]

const TEMPLATE_PREVIEWS: Record<string, {
  demoUrl: string
  tagline: string
  mockUrl: string
  mockupGradient: string
  sections: string[]
  emoji: string
}> = {
  'Website Perusahaan': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/nusa-konsultan',
    tagline: 'Tampil profesional & credible di mata klien korporat — contoh: Nusa Konsultan Digital',
    mockUrl: 'nusa-konsultan.japanarena.com',
    mockupGradient: 'from-slate-800 to-blue-900',
    sections: ['Hero Banner', 'Tentang Kami', 'Layanan', 'Portofolio', 'Kontak'],
    emoji: '🏢',
  },
  'Toko Online': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/batik-larasati',
    tagline: 'Toko online siap terima order & pembayaran 24/7 — contoh: Batik Larasati',
    mockUrl: 'batik-larasati.japanarena.com',
    mockupGradient: 'from-orange-800 to-red-900',
    sections: ['Hero + Promo', 'Katalog Produk', 'Keranjang', 'Checkout', 'Riwayat Order'],
    emoji: '🛍️',
  },
  'Website Klinik & Spa': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/lumiere-spa',
    tagline: 'Klinik & spa premium yang warm, terpercaya & mudah booking — contoh: Lumière Beauty & Spa',
    mockUrl: 'lumiere-spa.japanarena.com',
    mockupGradient: 'from-emerald-800 to-teal-900',
    sections: ['Hero + Jadwal Dokter', 'Layanan Klinik', 'Reservasi Online', 'Testimoni Pasien', 'Kontak & Lokasi'],
    emoji: '🏥',
  },
  'Website Sekolah / LPK': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/lpk-sakura',
    tagline: 'Wajah digital institusi pendidikan yang modern & terpercaya — contoh: LPK Sakura Academy',
    mockUrl: 'lpk-sakura.japanarena.com',
    mockupGradient: 'from-indigo-800 to-purple-900',
    sections: ['Hero', 'Program Studi', 'Galeri', 'Pendaftaran Online', 'Berita'],
    emoji: '🎓',
  },
  'Website Institusi': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/demo/institusi',
    tagline: 'Portal informasi resmi dan terpercaya',
    mockUrl: 'institusi.japanarena.com',
    mockupGradient: 'from-gray-800 to-slate-900',
    sections: ['Header Resmi', 'Pengumuman', 'Struktur Organisasi', 'Layanan', 'Kontak'],
    emoji: '🏛️',
  },
  'Website Restaurant': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/kanawa',
    tagline: 'Menu digital yang bikin pelanggan lapar duluan — contoh: Kanawa Izakaya',
    mockUrl: 'kanawa.japanarena.com',
    mockupGradient: 'from-amber-800 to-orange-900',
    sections: ['Hero Foto Makanan', 'Menu Digital', 'Reservasi Meja', 'Promo', 'Lokasi & Maps'],
    emoji: '🍜',
  },
  'Personal Branding': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/demo/personal-branding',
    tagline: 'Personal website yang menonjolkan keahlian Anda',
    mockUrl: 'nama.japanarena.com',
    mockupGradient: 'from-violet-800 to-pink-900',
    sections: ['Hero Foto', 'Tentang Saya', 'Portofolio', 'Testimoni', 'Hire Me'],
    emoji: '👤',
  },
  'Blog / Media': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/demo/blog',
    tagline: 'Platform konten yang SEO-friendly & mudah dikelola',
    mockUrl: 'blog.japanarena.com',
    mockupGradient: 'from-emerald-800 to-teal-900',
    sections: ['Featured Post', 'Kategori', 'Artikel Terbaru', 'Newsletter', 'Author Page'],
    emoji: '📰',
  },
  'Travel & Rental': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/demo/rental',
    tagline: 'Rental mobil & motor profesional siap live — contoh: Nusantara Drive',
    mockUrl: 'nusantara-drive.japanarena.com',
    mockupGradient: 'from-amber-800 to-orange-900',
    sections: ['Hero + Booking Form', 'Katalog Armada', 'GPS Tracking', 'Cara Pesan', 'Testimoni'],
    emoji: '🚗',
  },
  'Custom Jastip': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/demo/jastip',
    tagline: 'Sistem jasa titip yang terorganisir & profesional',
    mockUrl: 'jastip.japanarena.com',
    mockupGradient: 'from-rose-800 to-pink-900',
    sections: ['Hero', 'Katalog Titipan', 'Form Request', 'Status Order', 'Pembayaran'],
    emoji: '📦',
  },
  'Kuliner & Makanan': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/demo/kuliner',
    tagline: 'Website kuliner yang bikin pelanggan langsung lapar & order',
    mockUrl: 'nama-kuliner.japanarena.com',
    mockupGradient: 'from-orange-700 to-yellow-900',
    sections: ['Hero + Menu Andalan', 'Katalog Produk', 'Form Order WA', 'Lokasi & Maps', 'Promo'],
    emoji: '🍽️',
  },
  'Studio & Kreatif': {
    demoUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/demo/studio',
    tagline: 'Portofolio & booking studio yang menonjolkan karya terbaik Anda',
    mockUrl: 'studio.japanarena.com',
    mockupGradient: 'from-purple-800 to-slate-900',
    sections: ['Hero Portofolio', 'Galeri Karya', 'Layanan & Paket', 'Booking Sesi', 'Kontak'],
    emoji: '📷',
  },
}

// --- Guided progress bar: slim track + momentum label, langkah bisa diklik ---
function GuidedProgressBar({
  steps,
  current,
  onJump,
}: {
  steps: { num: number; title: string }[]
  current: number
  onJump: (num: number) => void
}) {
  const total = steps.length
  const pct = Math.round((current / total) * 100)
  const momentum =
    current >= total ? 'Langkah terakhir!' : current === 1 ? 'Ayo mulai' : 'Tinggal sedikit lagi'
  return (
    <div className="bg-white rounded-[24px] p-4 sm:p-5 apple-shadow border border-black/[0.03]">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-0.5 sm:gap-1.5 min-w-0">
          {steps.map((s) => {
            const active = current === s.num
            const passed = current > s.num
            return (
              <button
                key={s.num}
                onClick={() => onJump(s.num)}
                aria-current={active ? 'step' : undefined}
                className={`flex items-center gap-1.5 rounded-full pl-1 pr-1.5 sm:pr-2.5 py-1 transition-all active:scale-[0.97] ${
                  active ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-black tabular-nums transition-all shrink-0 ${
                    active
                      ? 'bg-[#0071E3] text-white'
                      : passed
                      ? 'bg-blue-100 text-[#0071E3]'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {passed ? <Check size={12} strokeWidth={3.5} /> : s.num}
                </span>
                <span
                  className={`text-xs font-bold whitespace-nowrap hidden sm:block ${
                    active ? 'text-[#0071E3]' : passed ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>
        <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap shrink-0">
          <span className="tabular-nums">Langkah {current}/{total}</span> ·{' '}
          <span className="text-[#0071E3]">{momentum}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#0071E3] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// --- Server tier: outcome dulu, GB jadi chip, badge "Paling Populer" ---
function OutcomeTierRow({
  pkg,
  isSelected,
  selectedTemplate,
  popular,
  onSelect,
}: {
  pkg: HostingPackage
  isSelected: boolean
  selectedTemplate: string
  popular: boolean
  onSelect: () => void
}) {
  const outcome = (selectedTemplate && pkg.industryDesc?.[selectedTemplate]) ?? pkg.description
  return (
    <button
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`relative flex flex-col p-5 sm:p-6 rounded-[24px] border-2 text-left transition-all active:scale-[0.99] group ${
        isSelected
          ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-100'
          : 'border-black/[0.03] hover:border-emerald-200 hover:bg-gray-50/50'
      }`}
    >
      {popular && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-[#0071E3] text-white px-2.5 py-1 rounded-full shadow-sm shadow-blue-200">
          <Crown size={11} fill="currentColor" /> Paling Populer
        </span>
      )}
      <div className="flex items-start justify-between gap-4 w-full">
        <div className="min-w-0">
          <p className="font-bold text-gray-900 text-lg leading-tight">{pkg.name} Server</p>
          <p className={`text-sm leading-relaxed mt-1.5 ${isSelected ? 'text-emerald-900' : 'text-gray-500'}`}>
            {outcome}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-md">
              <Server size={12} /> {pkg.storage}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-md">
              <Users size={12} /> {pkg.visitor}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 font-medium mt-2">{pkg.capacityHint}</p>
        </div>
        <div className="text-right shrink-0">
          <p className={`text-2xl font-black tracking-tight tabular-nums sf-display-heavy ${isSelected ? 'text-emerald-700' : 'text-gray-900'}`}>
            Rp {pkg.price.toLocaleString('id-ID')}
          </p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Setup &amp; Thn 1</p>
          <div className={`mt-3 w-6 h-6 rounded-full ml-auto flex items-center justify-center border-2 transition-all ${isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-200'}`}>
            {isSelected && <Check size={13} strokeWidth={3} />}
          </div>
        </div>
      </div>
    </button>
  )
}

// --- Bundle anchor: harga coret + % hemat (aksen gold kualitas) ---
function BundleAnchorCard({
  bundle,
  active,
  onSelect,
}: {
  bundle: Bundle
  active: boolean
  onSelect: () => void
}) {
  const pct = Math.round((1 - bundle.bundlePrice / bundle.normalPrice) * 100)
  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      className={`relative flex flex-col p-5 rounded-[24px] border-2 text-left transition-all hover:-translate-y-0.5 active:scale-[0.98] h-full ${
        active
          ? 'border-[#0071E3] bg-blue-50/40 ring-2 ring-blue-100'
          : 'border-black/[0.03] bg-white hover:border-blue-200 hover:bg-gray-50/50'
      }`}
    >
      <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-[#FBF3E2] text-[#8A5E1F] border border-[#C8962A]/50 px-2.5 py-1 rounded-full">
        Hemat {pct}%
      </span>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl leading-none" aria-hidden="true">{bundle.emoji}</span>
        <p className="font-bold text-gray-900 text-sm leading-tight">{bundle.name}</p>
      </div>
      <p className="text-[11px] text-gray-500 leading-relaxed mb-3 flex-1">{bundle.desc}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-black text-gray-900 tracking-tight tabular-nums">
          Rp {bundle.bundlePrice.toLocaleString('id-ID')}
        </span>
        <span className="text-[11px] text-gray-400 line-through tabular-nums">
          Rp {bundle.normalPrice.toLocaleString('id-ID')}
        </span>
      </div>
    </button>
  )
}

// --- WhatsApp human-fallback, selalu tampak di tiap langkah ---
function WaFallbackLine({ waHref }: { waHref: string }) {
  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#0071E3] transition-colors py-2"
    >
      <MessageCircle size={14} className="text-[#25D366]" aria-hidden="true" />
      Bingung pilih? Chat tim kami — kami bantu pilihkan
      <ArrowRight size={13} aria-hidden="true" />
    </a>
  )
}

// --- Proof strip: hanya klaim proses yang verifiable (bukan social-proof tak bersumber) ---
function ProofStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-gray-500 mt-6">
      <span className="inline-flex items-center gap-1.5"><Zap size={13} className="text-[#0071E3]" fill="currentColor" /> Live 3–5 hari kerja</span>
      <span className="inline-flex items-center gap-1.5"><Check size={13} strokeWidth={3} className="text-emerald-500" /> Revisi sampai puas sebelum go-live</span>
      <span className="inline-flex items-center gap-1.5"><Shield size={13} className="text-gray-400" /> Pembayaran aman via Midtrans</span>
    </div>
  )
}

// --- Bottom-sheet receipt utk mobile (desktop pakai kolom kanan sticky) ---
function MobileReceiptSheet({
  open, onClose, selectedTemplate, selectedPackage, selectedAddons, selectedBundleId,
  serverDone, fiturDone, setupTotal, maintainTotal, animatedSetupTotal, waHref,
}: {
  open: boolean; onClose: () => void
  selectedTemplate: string; selectedPackage: HostingPackage; selectedAddons: Addon[]
  selectedBundleId: string | null; serverDone: boolean; fiturDone: boolean
  setupTotal: number; maintainTotal: number; animatedSetupTotal: number; waHref: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  const rows = [
    { label: 'Industri', value: selectedTemplate, done: true },
    { label: 'Server', value: serverDone ? `${selectedPackage.name} Server` : 'Pilih di langkah 2', done: serverDone },
    { label: 'Fitur', value: fiturDone ? (selectedAddons.length > 0 ? `${selectedAddons.length} fitur dipilih` : 'Tanpa tambahan') : 'Pilih di langkah 3', done: fiturDone },
  ]

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <div role="dialog" aria-label="Rancangan Website Anda" className={`absolute left-0 bottom-0 w-full bg-white rounded-t-[28px] shadow-2xl max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="sticky top-0 bg-white pt-3 pb-2 flex flex-col items-center z-10">
          <span className="w-10 h-1.5 rounded-full bg-gray-200" />
        </div>
        <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-gray-900 sf-display-heavy">Rancangan Website Anda</h2>
              <p className="text-[11px] text-gray-400 font-medium">Terisi otomatis sambil Anda memilih.</p>
            </div>
            <button onClick={onClose} aria-label="Tutup" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 active:scale-90 transition-transform shrink-0">
              <X size={16} />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {rows.map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${row.done ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-300 border border-gray-200'}`}>
                  {row.done ? <Check size={12} strokeWidth={3.5} /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">{row.label}</p>
                  <p className={`text-sm font-bold leading-tight truncate ${row.done ? 'text-gray-900' : 'text-gray-400'}`}>{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/5 pt-3">
            {selectedBundleId ? (
              <div className="flex justify-between items-center py-2 border-b border-black/[0.04]">
                <span className="text-sm text-gray-700 font-medium">{BUNDLES.find(b => b.id === selectedBundleId)?.name}</span>
                <span className="text-[10px] text-gray-400 line-through tabular-nums">Rp {BUNDLES.find(b => b.id === selectedBundleId)?.normalPrice.toLocaleString('id-ID')}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center py-2.5 border-b border-black/[0.04]">
                  <span className="text-sm text-gray-700 font-medium flex items-center gap-1.5"><Server size={12} className="text-gray-400" /> {selectedPackage.name} Server</span>
                  <span className="text-sm font-bold text-gray-900 tabular-nums">Rp {selectedPackage.price.toLocaleString('id-ID')}</span>
                </div>
                {selectedAddons.map(addon => (
                  <div key={addon.id} className="flex justify-between items-center py-2.5 border-b border-black/[0.04] last:border-0">
                    <span className="text-sm text-gray-500 truncate pr-2">{addon.name}</span>
                    {isPricedAddon(addon)
                      ? <span className="text-sm font-bold text-gray-900 shrink-0 tabular-nums">Rp {addon.price.toLocaleString('id-ID')}</span>
                      : <span className="text-[10px] font-bold text-indigo-500 shrink-0 uppercase tracking-wide">{addon.availability === 'portal' ? 'Portal' : 'Konsultasi'}</span>}
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="mt-4 bg-[#1D1D1F] rounded-2xl p-5 text-white">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Setup Tahun Pertama</p>
            <p className="text-2xl font-black tracking-tight tabular-nums">Rp {animatedSetupTotal.toLocaleString('id-ID')}</p>
            {setupTotal >= 4_000_000 && (
              <div className="bg-white/10 rounded-xl p-3 mt-3">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Dibayar Sekarang · DP 50%</p>
                <p className="text-lg font-black text-green-400 tabular-nums">Rp {Math.ceil(setupTotal * 0.5).toLocaleString('id-ID')}</p>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 mt-3 border-t border-white/10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Perpanjangan Thn 2+</span>
              <span className="text-sm font-black text-gray-300 tabular-nums">Rp {maintainTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#0071E3] py-2">
            <MessageCircle size={14} className="text-[#25D366]" aria-hidden="true" /> Butuh bantuan memilih? Chat tim kami
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SeluruhLayananPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_OPTIONS[0].name)
  const [selectedPackage, setSelectedPackage] = useState<HostingPackage>(HOSTING_PACKAGES[0])
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([])
  // Program Mitra — kode referral tersimpan (RefCapture), dibaca via state
  // di useEffect agar hydration-safe (localStorage tak ada saat SSG).
  const [refCode, setRefCode] = useState<string | null>(null)
  useEffect(() => { setRefCode(getStoredRef()) }, [])
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['general']) // Default open first group
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [previewError, setPreviewError] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    setPreviewLoaded(false)
    setPreviewError(false)
  }, [selectedTemplate])

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupKey) 
        ? prev.filter(k => k !== groupKey) 
        : [...prev, groupKey]
    )
  }

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
    // Hanya add-on yang benar-benar bisa di-deploy ('live'/'manual') yang dijumlahkan.
    // Fitur 'portal' & 'soon' tidak menambah estimasi otomatis — ditandai sebagai
    // "konsultasi dulu" supaya tak ada fitur tak-terkirim yang dihargai diam-diam.
    const pricedAddons = selectedAddons.filter(isPricedAddon)
    const activeBundle = selectedBundleId ? BUNDLES.find(b => b.id === selectedBundleId) : null;
    const setup = activeBundle
      ? activeBundle.bundlePrice
      : selectedPackage.price + pricedAddons.reduce((acc, curr) => acc + curr.price, 0)
    const maintain = selectedPackage.maintain + pricedAddons.reduce((acc, curr) => acc + Math.round(curr.price * 0.75), 0)
    return { setupTotal: setup, maintainTotal: maintain }
  }, [selectedPackage, selectedAddons, selectedBundleId])

  // Apply Animation Hook
  const animatedSetupTotal = useAnimatedNumber(setupTotal);

  // Status "Rancangan Website Anda" — baris terisi sambil user maju.
  const serverDone = currentStep >= 2 || selectedPackage.id !== HOSTING_PACKAGES[0].id || !!selectedBundleId
  const fiturDone = currentStep >= 3 || selectedAddons.length > 0 || !!selectedBundleId
  // Tier pertama yg direkomendasikan utk industri terpilih → badge "Paling Populer".
  const firstRecommendedId = HOSTING_PACKAGES.find(p => selectedTemplate && p.recommendedFor?.includes(selectedTemplate))?.id

  const hasPortalFeatures = useMemo(() => {
    const categories = ['lms', 'travel', 'medical']
    const found = selectedAddons.find(a => categories.includes(a.category))
    return found ? found : null
  }, [selectedAddons])

  // Add-on yg direkomendasikan untuk industri terpilih (badge di Step 3).
  const recommendedIds = useMemo(
    () => RECOMMENDED_ADDONS[selectedTemplate] ?? [],
    [selectedTemplate]
  )

  // Auto-buka grup yg memuat add-on rekomendasi supaya badge langsung terlihat
  // (tanpa menutup grup yg sudah dibuka user).
  useEffect(() => {
    if (recommendedIds.length === 0) return
    const groupsWithRec = Object.entries(ADDON_GROUPS)
      .filter(([, g]) => g.items.some(a => recommendedIds.includes(a.id)))
      .map(([k]) => k)
    setExpandedGroups(prev => Array.from(new Set([...prev, ...groupsWithRec])))
  }, [recommendedIds])

  const waMessage = useMemo(() => {
    const addonNote = (a: Addon) =>
      a.availability === 'portal' ? ' (tersedia via produk portal — konsultasi)'
      : a.availability === 'soon' ? ' (perlu konsultasi, di luar estimasi)'
      : a.availability === 'manual' ? ' (setup oleh tim)'
      : ''
    const addonText = selectedAddons.length > 0
      ? selectedAddons.map(a => `- ${a.name}${addonNote(a)}`).join('\n')
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

Estimasi perpanjangan tahun ke-2:
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
        {/* WhatsApp Sticky Button (Mobile) - positioned higher to avoid fixed bottom bar */}
        <div className="fixed bottom-[100px] right-6 z-40 md:hidden">
          <a
            href={waLink('Halo Japan Arena, saya butuh bantuan merakit website.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat via WhatsApp"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl active:scale-90 transition-transform"
          >
            <MessageCircle size={28} aria-hidden="true" />
          </a>
        </div>

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
            Pilih template, server, dan fitur. Website Anda live dalam <span className="text-gray-900 font-semibold">3–5 hari kerja</span> setelah data bisnis Anda kami terima.
            Tanpa biaya tersembunyi, biaya perpanjangan transparan sejak awal.
          </p>
          <ProofStrip />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Wizard */}
          <div className="lg:col-span-8 space-y-6 pb-20 flex flex-col min-h-[600px]">
            
            {/* Guided progress bar (tipis + momentum, langkah bisa diklik) */}
            <GuidedProgressBar steps={STEPS} current={currentStep} onJump={setCurrentStep} />

            {/* WIZARD CONTENT AREA */}
            <div className="flex-1 transition-all duration-500 relative">
                
                {/* STEP 1: FONDASI & BUNDLING */}
                {currentStep === 1 && (
                    <div className="space-y-8 animate-fade-in">
                        {selectedTemplate === 'Toko Online' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
                                <p className="font-semibold text-blue-800 mb-2">
                                    ✅ Termasuk dalam paket Toko Online:
                                </p>
                                <ul className="space-y-1 list-none">
                                    <li>• Halaman produk dengan foto &amp; deskripsi</li>
                                    <li>• Tombol pesan via WhatsApp</li>
                                    <li>• QRIS / transfer untuk pembayaran</li>
                                    <li>• Kelola stok produk (paket standar)</li>
                                </ul>
                                <p className="mt-3">
                                    💬 Butuh keranjang belanja &amp; checkout otomatis?{" "}
                                    <a
                                        href="https://wa.me/6281296917963?text=Saya%20tertarik%20Toko%20Online%20dengan%20fitur%20checkout%20otomatis"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline font-medium"
                                    >
                                        Tanyakan ke tim kami →
                                    </a>
                                </p>
                            </div>
                        )}
                        <section className="bg-white rounded-[32px] p-5 md:p-8 apple-shadow border border-black/[0.03]">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 sf-display-heavy tracking-tight">Bisnis Anda bergerak di bidang apa?</h2>
                                    <p className="text-sm text-gray-600 font-medium mt-1">Kami sesuaikan desain dasar (template) dengan industri Anda.</p>
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
                                            aria-pressed={selectedTemplate === tpl.name}
                                            className={`p-4 rounded-[20px] border-2 text-left transition-all flex flex-col gap-3 group ${
                                                isSelected 
                                                ? 'border-[#0071E3] bg-blue-50/30 ring-2 ring-blue-100'
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
                                            <span className="text-xs text-gray-600 mt-0.5 leading-tight">
                                                {tpl.subtitle}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>

                        {/* First Look: Template Preview */}
                        <section className="bg-gradient-to-br from-gray-900 via-[#1A1A24] to-black rounded-[32px] p-8 text-white relative overflow-hidden apple-shadow">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-20 -mt-20 pointer-events-none" />
                            <div className="relative z-10">
                                {(() => {
                                    const gallery = galleryForLabel(selectedTemplate)
                                    const preview = TEMPLATE_PREVIEWS[selectedTemplate]
                                    if (!gallery && !preview) return null
                                    return (
                                      <>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{gallery ? 'Tema Siap Pakai' : 'Pratinjau Template'}</p>
                                        </div>
                                        <h3 className="text-2xl font-black mb-1 sf-display-heavy">{gallery ? 'Pilihan Tema' : 'Preview Template'}</h3>
                                        <p className="text-sm text-gray-400 font-medium mb-6">
                                            {gallery ? (
                                                <>Beberapa gaya tema premium siap pakai untuk <span className="text-white font-bold">{selectedTemplate}</span>. Gambar di bawah cuma contoh; konten diisi sesuai bisnis Anda setelah pesan.</>
                                            ) : (
                                                <>Begini kira-kira tampilan website <span className="text-white font-bold">{selectedTemplate}</span> Anda.</>
                                            )}
                                        </p>

                                        {gallery ? (
                                            <ThemeGallery label={selectedTemplate} groups={gallery.groups} />
                                        ) : preview ? (
                                        <div>
                                            <a
                                                href={preview.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block rounded-[20px] overflow-hidden border border-white/10 group cursor-pointer hover:border-white/30 transition-all"
                                            >
                                                {/* Browser Chrome */}
                                                <div className="bg-white/[0.07] px-4 py-3 flex items-center gap-2.5 border-b border-white/10">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                                    </div>
                                                    <div className="flex-1 mx-2">
                                                        <div className="bg-white/10 rounded-md px-3 py-1 text-[10px] text-gray-400 font-mono text-center truncate">
                                                            {preview.mockUrl}
                                                        </div>
                                                    </div>
                                                    <ExternalLink size={12} className="text-gray-500 group-hover:text-gray-300 transition-colors shrink-0" />
                                                </div>

                                                {/* Live Preview / Fallback Mockup */}
                                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                                    {!previewError ? (
                                                        <>
                                                            {/* Spinner saat loading */}
                                                            <div className={`absolute inset-0 flex items-center justify-center bg-gray-900 transition-opacity duration-500 ${previewLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                                                <Loader2 size={28} className="animate-spin text-gray-400" />
                                                            </div>
                                                            {/* Iframe live demo */}
                                                            <iframe
                                                                key={selectedTemplate}
                                                                src={preview.demoUrl}
                                                                title={selectedTemplate}
                                                                loading="lazy"
                                                                tabIndex={-1}
                                                                onLoad={() => setPreviewLoaded(true)}
                                                                onError={() => setPreviewError(true)}
                                                                className="absolute top-0 left-0 w-[1440px] h-[1080px] origin-top-left scale-[0.26] sm:scale-[0.35] md:scale-50 border-0 pointer-events-none"
                                                                sandbox="allow-scripts allow-same-origin"
                                                            />
                                                        </>
                                                    ) : (
                                                        /* Fallback: mockup statis jika iframe gagal */
                                                        <div className={`bg-gradient-to-br ${preview.mockupGradient} h-full p-8`}>
                                                            <div className="text-5xl mb-4">{preview.emoji}</div>
                                                            <div className="h-5 w-48 bg-white/30 rounded-lg mb-2" />
                                                            <div className="h-3 w-64 bg-white/20 rounded mb-5" />
                                                            <div className="flex gap-2 mb-5">
                                                                <div className="h-8 w-28 bg-white/30 rounded-full" />
                                                                <div className="h-8 w-20 bg-white/10 rounded-full border border-white/20" />
                                                            </div>
                                                            <p className="text-[11px] text-white/40 italic font-medium">{preview.tagline}</p>
                                                        </div>
                                                    )}
                                                    {/* Hover Overlay */}
                                                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300 flex items-center justify-center">
                                                        <span className="bg-white text-gray-900 font-black text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                            <ExternalLink size={12} /> Buka Demo Live
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Section Chips */}
                                                <div className="bg-gray-800/60 px-4 py-3 flex gap-2 flex-wrap border-t border-white/5">
                                                    {preview.sections.map(s => (
                                                        <span key={s} className="text-[9px] font-black bg-white/10 text-gray-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </a>

                                            <p className="text-[10px] text-gray-500 font-medium mt-3 flex items-center gap-1.5">
                                                <ExternalLink size={10} /> Klik preview untuk melihat demo live di tab baru
                                            </p>
                                        </div>
                                        ) : null}
                                      </>
                                    )
                                })()}
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
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 sf-display-heavy tracking-tight">Seberapa ramai website Anda nanti?</h2>
                                    <p className="text-sm text-gray-600 font-medium mt-1">
                                      {selectedTemplate ? `Server kami sesuaikan untuk: ${selectedTemplate}` : 'Pilih industri di langkah 1 untuk rekomendasi yang lebih tepat.'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                    <Server size={24} />
                                </div>
                            </div>

                            {/* Penjelasan awam: apa itu server */}
                            <div className="mb-6 p-5 rounded-[20px] bg-emerald-50/60 border border-emerald-100 flex gap-4">
                                <Info className="text-emerald-600 shrink-0" size={22} />
                                <p className="text-sm text-emerald-900 leading-relaxed font-medium">
                                    <strong>Server itu seperti &ldquo;rumah&rdquo; website Anda di internet.</strong>{' '}
                                    Makin banyak foto, produk, dan pengunjung, makin besar rumah yang dibutuhkan.
                                    Tenang — Anda bisa pindah ke rumah yang lebih besar kapan saja tanpa membongkar website.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {HOSTING_PACKAGES.map((pkg) => (
                                    <OutcomeTierRow
                                        key={pkg.id}
                                        pkg={pkg}
                                        isSelected={selectedPackage.id === pkg.id}
                                        selectedTemplate={selectedTemplate}
                                        popular={pkg.id === firstRecommendedId}
                                        onSelect={() => { setSelectedPackage(pkg); setSelectedBundleId(null) }}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 p-5 rounded-[20px] bg-amber-50 border border-amber-100 flex gap-4">
                                <AlertCircle className="text-amber-500 shrink-0" size={24} />
                                <p className="text-sm text-amber-900 leading-relaxed font-medium">
                                    <strong>Saran Tim Kami:</strong>{' '}
                                    {selectedTemplate === 'Website Sekolah / LPK' || selectedTemplate === 'Blog / Media' || selectedTemplate === 'Website Institusi'
                                      ? `Untuk ${selectedTemplate}, kami sarankan mulai dari Starter — bukan Basic. Konten bertambah cepat dan traffic bisa melonjak saat pendaftaran atau publikasi.`
                                      : 'Paket bisa dinaikkan ke yang lebih besar kapan saja tanpa membongkar website. Mulai dari yang sesuai sekarang, naikkan kalau bisnis makin ramai.'}
                                </p>
                            </div>

                            {/* Bundle Shortcut */}
                            <div className="mt-4 p-5 rounded-[20px] bg-yellow-50/80 border border-yellow-200/60">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap size={15} className="text-yellow-600 shrink-0" fill="currentColor" />
                                    <p className="text-sm font-black text-yellow-900">Hemat dengan Paket Bundling</p>
                                </div>
                                <p className="text-[11px] text-yellow-800 font-medium leading-relaxed mb-4">
                                    Sudah tahu fitur yang dibutuhkan? Pilih bundle siap pakai dan hemat hingga 32% dibanding merakit manual.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                                    {BUNDLES.map(bundle => (
                                        <BundleAnchorCard
                                            key={bundle.id}
                                            bundle={bundle}
                                            active={selectedBundleId === bundle.id}
                                            onSelect={() => handleSelectBundle(bundle)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* STEP 3: FITUR CUSTOM */}
                {currentStep === 3 && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-gray-900 sf-display-heavy tracking-tight">Ada fitur tambahan yang Anda butuhkan?</h2>
                            <p className="text-sm text-gray-600 font-medium mt-1">Semua opsional — pilih yang relevan, lewati sisanya. Estimasi terupdate otomatis.</p>
                            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
                                <Check size={14} strokeWidth={3} /> Revisi sampai puas sebelum go-live
                            </div>
                        </div>
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
                                        Cek Layanan Kami <ChevronRight size={16} className="inline ml-1" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {recommendedIds.length > 0 && (
                            <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-100">
                                <Sparkles size={18} className="text-amber-500 shrink-0 mt-0.5" fill="currentColor" />
                                <p className="text-sm text-amber-900 font-medium leading-relaxed">
                                    Fitur bertanda <span className="font-black">Rekomendasi</span> kami sarankan untuk industri <span className="font-black">{selectedTemplate}</span>. Tetap opsional — pilih sesuai kebutuhan Anda.
                                </p>
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
                                        <div className="px-4 sm:px-8 pb-6 sm:pb-8 animate-fade-in">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[...group.items]
                                                  .sort((a, b) => (recommendedIds.includes(b.id) ? 1 : 0) - (recommendedIds.includes(a.id) ? 1 : 0))
                                                  .map(addon => {
                                                    const isActive = selectedAddons.find(a => a.id === addon.id)
                                                    const isRecommended = recommendedIds.includes(addon.id)
                                                    const priced = isPricedAddon(addon)
                                                    return (
                                                        <button
                                                            key={addon.id}
                                                            onClick={() => toggleAddon(addon)}
                                                            role="checkbox"
                                                            aria-checked={!!isActive}
                                                            className={`group p-5 rounded-[20px] border-2 text-left transition-all relative overflow-hidden ${
                                                                isActive
                                                                    ? 'border-[#0071E3] bg-blue-50/50'
                                                                    : isRecommended
                                                                        ? 'border-amber-300 bg-amber-50/30 hover:border-amber-400'
                                                                        : 'border-black/[0.03] hover:border-blue-200 bg-white hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {isActive && (
                                                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#0071E3] rounded-full flex items-center justify-center text-white">
                                                                    <Check size={14} strokeWidth={4} />
                                                                </div>
                                                            )}
                                                            {isRecommended && !isActive && (
                                                                <div className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1">
                                                                    <Sparkles size={9} /> Rekomendasi
                                                                </div>
                                                            )}
                                                            <h4 className={`font-bold text-sm mb-1.5 pr-8 transition-colors ${isActive ? 'text-[#0071E3]' : 'text-gray-900'}`}>
                                                                {addon.name}
                                                            </h4>
                                                            {addon.availability === 'manual' && (
                                                                <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mb-2">
                                                                    Disetup oleh tim
                                                                </span>
                                                            )}
                                                            {addon.availability === 'portal' && (
                                                                <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full mb-2">
                                                                    Produk Portal
                                                                </span>
                                                            )}
                                                            {addon.availability === 'soon' && (
                                                                <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full mb-2">
                                                                    Konsultasi Dulu
                                                                </span>
                                                            )}
                                                            <p className="text-[11px] text-gray-600 leading-relaxed mb-3 pr-2">
                                                                {addon.description}
                                                            </p>
                                                            {priced ? (
                                                                <div className="space-y-1">
                                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Biaya Setup</p>
                                                                    <p className={`text-lg font-black tracking-tight ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                                                                        Rp {addon.price.toLocaleString('id-ID')}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-1">
                                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Harga</p>
                                                                    <p className="text-sm font-bold text-gray-500 leading-snug">
                                                                        {addon.availability === 'portal'
                                                                            ? 'Tersedia di produk portal kami — tanya tim'
                                                                            : 'Custom — konsultasi dulu (di luar estimasi)'}
                                                                    </p>
                                                                </div>
                                                            )}
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
                        currentStep === 1 ? 'invisible pointer-events-none' : 'text-gray-500 hover:bg-gray-200'
                    }`}
                    aria-hidden={currentStep === 1}
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

            {/* WhatsApp human-fallback — selalu tampak di tiap langkah */}
            <WaFallbackLine waHref={`https://wa.me/${WA_NUMBER}?text=${waMessage}`} />

          </div>

          {/* Right Column: Summary (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-[32px] p-6 apple-shadow border border-black/[0.05] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <div className="relative z-10 mb-4">
                <h2 className="text-xl font-black text-gray-900 sf-display-heavy">Rancangan Website Anda</h2>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Terisi otomatis sambil Anda memilih.</p>
              </div>

              <div
                key={`${selectedTemplate}-${selectedPackage.id}-${selectedAddons.length}-${selectedBundleId}`}
                className="relative z-10 animate-fade-in"
              >
                {/* Growing checklist — Industri / Server / Fitur */}
                <div className="space-y-2 mb-4">
                  {[
                    { label: 'Industri', value: selectedTemplate, done: true },
                    { label: 'Server', value: serverDone ? `${selectedPackage.name} Server` : 'Pilih di langkah 2', done: serverDone },
                    { label: 'Fitur', value: fiturDone ? (selectedAddons.length > 0 ? `${selectedAddons.length} fitur dipilih` : 'Tanpa tambahan') : 'Pilih di langkah 3', done: fiturDone },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${row.done ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-300 border border-gray-200'}`}>
                        {row.done ? <Check size={12} strokeWidth={3.5} /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">{row.label}</p>
                        <p className={`text-sm font-bold leading-tight truncate ${row.done ? 'text-gray-900' : 'text-gray-400'}`}>{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Line items — receipt style */}
                <div className="border-t border-black/5 pt-3 space-y-0">
                  {selectedBundleId ? (
                    <>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Zap size={11} className="text-yellow-600" fill="currentColor" />
                        <p className="text-[9px] font-black text-yellow-700 uppercase tracking-widest">Promo Rakitan</p>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-black/[0.04]">
                        <span className="text-sm text-gray-700 font-medium">{BUNDLES.find(b => b.id === selectedBundleId)?.name}</span>
                        <span className="text-[10px] text-gray-400 line-through">Rp {BUNDLES.find(b => b.id === selectedBundleId)?.normalPrice.toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 pt-1">Server {selectedPackage.name} + {selectedAddons.length} fitur custom</p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center py-2.5 border-b border-black/[0.04]">
                        <span className="text-sm text-gray-500">Template Dasar</span>
                        <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Termasuk</span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-black/[0.04]">
                        <span className="text-sm text-gray-700 font-medium flex items-center gap-1.5">
                          <Server size={12} className="text-gray-400" /> {selectedPackage.name} Server
                        </span>
                        <span className="text-sm font-bold text-gray-900">Rp {selectedPackage.price.toLocaleString('id-ID')}</span>
                      </div>
                      {selectedAddons.length > 0 ? (
                        <div className="max-h-[140px] overflow-y-auto">
                          {selectedAddons.map(addon => (
                            <div key={addon.id} className="flex justify-between items-center py-2.5 border-b border-black/[0.04] last:border-0">
                              <span className="text-sm text-gray-500 truncate pr-2">{addon.name}</span>
                              {isPricedAddon(addon) ? (
                                <span className="text-sm font-bold text-gray-900 shrink-0">Rp {addon.price.toLocaleString('id-ID')}</span>
                              ) : (
                                <span className="text-[10px] font-bold text-indigo-500 shrink-0 uppercase tracking-wide">
                                  {addon.availability === 'portal' ? 'Portal' : 'Konsultasi'}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-3 text-center">
                          <p className="text-[11px] text-gray-400">Pilih fitur di Step 3 untuk tambah ke estimasi</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Dark total card */}
                <div className="mt-4 bg-[#1D1D1F] rounded-2xl p-5 text-white">
                  <div className={setupTotal >= 4_000_000 ? 'mb-3' : ''}>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Setup Tahun Pertama</p>
                    <p className="text-2xl font-black tracking-tight tabular-nums">
                      Rp {animatedSetupTotal.toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      Dengan semua fitur tambahan: maks. sekitar{" "}
                      <span className="font-medium">Rp 4.250.000</span>
                      <span
                        title="Estimasi jika semua fitur opsional dipilih. Anda bebas pilih hanya yang dibutuhkan."
                        className="cursor-help text-gray-300 border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none"
                      >
                        ?
                      </span>
                    </p>
                  </div>

                  {setupTotal >= 4_000_000 && (
                    <div className="bg-white/10 rounded-xl p-3 mb-3">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Dibayar Sekarang · DP 50%</p>
                      <p className="text-lg font-black text-green-400 tabular-nums">
                        Rp {Math.ceil(setupTotal * 0.5).toLocaleString('id-ID')}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Perpanjangan Thn 2+</span>
                    <span className="text-sm font-black text-gray-300 tabular-nums">Rp {maintainTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-2">
                    Biaya sewa server + perawatan rutin (update keamanan, backup, bantuan teknis) — bukan biaya buat ulang website.
                  </p>
                </div>

                {/* Single info note */}
                <div className="mt-3 flex items-start gap-2">
                  <Check size={13} className="text-[#0071E3] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Konfirmasi via WA dalam 1×24 jam setelah order.{' '}
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0071E3] font-bold hover:underline"
                    >
                      Butuh bantuan memilih? Chat →
                    </a>
                  </p>
                </div>
                <div className="mt-2 flex items-start gap-2">
                  <Globe size={13} className="text-[#0071E3] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Domain sendiri atau subdomain gratis{' '}
                    <span className="font-mono text-gray-400">nama.japanarena.com</span>
                    {' '}—{' '}
                    <a href="#faq-domain" className="text-[#0071E3] font-bold hover:underline">baca FAQ</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Post-Order Steps */}
      <section className="bg-white py-16 mt-20 border-t border-black/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Setelah Anda Order</p>
          <h2 className="text-2xl font-black text-gray-900 mb-10 tracking-tight">3 Langkah Sederhana — Website Anda Live</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', icon: '💳', title: 'Bayar DP Online', desc: 'Pilih paket, bayar DP 50% lewat QRIS atau transfer. Konfirmasi masuk otomatis via WA.' },
              { step: '2', icon: '🔨', title: 'Tim Bangun (3–5 Hari)', desc: 'Tim kami bangun website sesuai industri Anda. Anda bisa pantau progres via Order ID.' },
              { step: '3', icon: '✏️', title: 'Anda Edit Sendiri & Launch', desc: 'Website live di domain Anda. Edit konten kapan saja dari dashboard — tanpa perlu hubungi kami.' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center p-6 bg-[#F5F5F7] rounded-[24px]">
                <span className="text-3xl mb-3">{s.icon}</span>
                <p className="font-black text-gray-900 mb-2">{s.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / FAQ Shortcut */}
      <section className="bg-white py-20 border-t border-black/5">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Website saja tidak cukup?</h2>
              <p className="text-gray-500 mb-8 font-medium">Butuh booking system, kasir digital, atau LMS karyawan? Kami punya platformnya — siap pakai, bukan custom dari nol.</p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all"
              >
                Lihat Layanan Kami <ArrowRight size={18} />
              </Link>          </div>
      </section>

      {/* Fixed Bottom Bar (All Screens) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <button type="button" onClick={() => setSheetOpen(true)} className="space-y-0.5 text-left lg:pointer-events-none">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  Setup Thn 1
                  <span className="lg:hidden inline-flex items-center gap-0.5 text-[#0071E3] normal-case tracking-normal"><ChevronUp size={11} /> Rincian</span>
              </span>
              <p className="text-xl md:text-2xl font-black text-[#0071E3] tracking-tight tabular-nums">
                  Rp {animatedSetupTotal.toLocaleString('id-ID')}
              </p>
          </button>
          {currentStep < 3 ? (
              <button
                  onClick={() => {
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                      setCurrentStep(prev => prev + 1);
                  }}
                  className="flex items-center gap-2 px-6 md:px-8 py-3 bg-[#0071E3] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 active:scale-[0.96] transition-all"
              >
                  Lanjut <ArrowRight size={16} />
              </button>
          ) : (
              <a
                  href={`https://ja-websitebuilder-platform-nfoa.vercel.app/order?industri=${encodeURIComponent(selectedTemplate)}&estimasi=${setupTotal}&maintain=${maintainTotal}&paket=${encodeURIComponent(selectedPackage.name)}&addons=${encodeURIComponent(selectedAddons.map(a => a.id).join(','))}${selectedBundleId ? `&bundle=${encodeURIComponent(selectedBundleId)}` : ''}${refCode ? `&ref=${encodeURIComponent(refCode)}` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 md:px-8 py-3 bg-[#0071E3] text-white rounded-xl font-bold text-sm shadow-lg active:scale-[0.96] transition-all hover:bg-blue-600"
              >
                  Buat Order & Lacak <ArrowRight size={16} />
              </a>
          )}
        </div>
      </div>

      {/* Bottom-sheet receipt (mobile) — desktop pakai kolom kanan sticky */}
      <MobileReceiptSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        selectedTemplate={selectedTemplate}
        selectedPackage={selectedPackage}
        selectedAddons={selectedAddons}
        selectedBundleId={selectedBundleId}
        serverDone={serverDone}
        fiturDone={fiturDone}
        setupTotal={setupTotal}
        maintainTotal={maintainTotal}
        animatedSetupTotal={animatedSetupTotal}
        waHref={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
      />
    </div>
  )
}

function waLink(msg: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}