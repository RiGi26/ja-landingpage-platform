'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, ArrowRight, Globe, Loader2, GraduationCap } from 'lucide-react'
import { WB_URL as STUDIO_URL } from '@/constants/site'
import MobileCardScroller from '@/components/MobileCardScroller'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

type Site = {
  slug: string
  nama_website: string
  tipe_industri: string | null
}

// Statistik flagship japanarena.id (produk milik kami sendiri) — angka bisa dicek.
const JA_STATS = [
  { value: '96%', label: 'Lulus JLPT N3' },
  { value: '200+', label: 'Siswa aktif' },
  { value: '5.0', label: 'Rating siswa' },
]

const INDUSTRY_META: Record<string, { label: string }> = {
  toko_online: { label: 'Toko Online' },
  restaurant: { label: 'Restaurant' },
  klinik: { label: 'Klinik & Beauty' },
  perusahaan: { label: 'Perusahaan' },
  corporate: { label: 'Perusahaan' },
  sekolah: { label: 'Sekolah / LPK' },
  institusi: { label: 'Institusi' },
  personal_branding: { label: 'Personal Branding' },
  blog: { label: 'Blog / Media' },
  jastip: { label: 'Jastip' },
  travel: { label: 'Travel & Rental' },
}

function metaFor(tipe: string | null) {
  if (tipe && INDUSTRY_META[tipe]) return INDUSTRY_META[tipe]
  return { label: 'Website Custom' }
}

// Klien yang situsnya tersambung ke Portal (bukan website saja) — tampilkan
// "Website + Portal X" seperti japanarena, bukan sekadar label industri.
const PORTAL_CLIENT_LABEL: Record<string, string> = {
  'bakso-tini': 'Website + Portal Operasi',
  'mamazafran-food': 'Website + Portal Operasi',
  'kamy-physio': 'Website + Portal Klinik',
}

// Badge "Live" memakai dot SVG-style (bukan emoji) — konsisten & accessible.
function LiveBadge() {
  return (
    <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
    </span>
  )
}

function PortfolioCard({ site }: { site: Site }) {
  const [loaded, setLoaded] = useState(false)
  const portalLabel = PORTAL_CLIENT_LABEL[site.slug]
  const sublabel = portalLabel ?? metaFor(site.tipe_industri).label
  const liveUrl = `${STUDIO_URL}/${site.slug}`

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex flex-col rounded-[28px] bg-white border border-black/[0.04] apple-shadow overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <LiveBadge />
      {/* Browser chrome */}
      <div className="bg-gray-50 px-4 py-3 flex items-center gap-2.5 border-b border-black/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 mx-1">
          <div className="bg-white border border-black/5 rounded-md px-3 py-1 text-[10px] text-gray-500 font-mono text-center truncate">
            {site.slug}.webzoka.com
          </div>
        </div>
        <ExternalLink size={12} className="text-gray-400 group-hover:text-[#0071E3] transition-colors shrink-0" />
      </div>

      {/* Live mini preview (iframe diperkecil) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        {/* Spinner di belakang — otomatis tertutup begitu iframe melukis konten. */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-gray-300 transition-opacity duration-500 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Loader2 size={28} className="animate-spin" />
        </div>
        <iframe
          src={liveUrl}
          title={site.nama_website}
          loading="lazy"
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          className="absolute top-0 left-0 w-[1440px] h-[1080px] origin-top-left scale-50 border-0 pointer-events-none"
          sandbox="allow-scripts allow-same-origin"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0071E3]/0 group-hover:bg-[#0071E3]/15 transition-all duration-300 flex items-center justify-center">
          <span className="bg-white text-gray-900 font-black text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ExternalLink size={13} /> Buka Website Live
          </span>
        </div>
      </div>

      {/* Footer info */}
      <div className="px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 truncate">{site.nama_website}</h3>
        <span className={`text-xs ${portalLabel ? 'text-[#0071E3] font-semibold' : 'text-gray-600'}`}>{sublabel}</span>
        <p className="text-[10px] text-gray-500 font-mono mt-1 truncate">{site.slug}.webzoka.com</p>
      </div>
    </a>
  )
}

// Placeholder selama data situs klien di-fetch — cegah kedip EmptyClientCard
// sebelum kartu asli muncul. Meniru kerangka PortfolioCard (chrome + preview).
function SkeletonCard() {
  return (
    <div
      className="flex flex-col rounded-[28px] bg-white border border-black/[0.04] apple-shadow overflow-hidden"
      aria-hidden="true"
    >
      <div className="bg-gray-50 px-4 py-3 flex items-center gap-2.5 border-b border-black/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        </div>
        <div className="flex-1 mx-1">
          <div className="h-5 rounded-md bg-gray-100 animate-pulse" />
        </div>
      </div>
      <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="px-5 py-4 space-y-2">
        <div className="h-3.5 w-2/3 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-1/3 rounded bg-gray-100 animate-pulse" />
      </div>
    </div>
  )
}

// Highlight flagship: japanarena.id = produk (Website + Portal LMS) milik Japan
// Arena sendiri, dipakai tiap hari. Menggantikan FlagshipSection lama — angka bisa
// dicek, jadi lead-in galeri sekaligus bukti "website + sistem jadi satu".
function FlagshipHighlight() {
  return (
    <div className="mb-8 lg:mb-10 rounded-[28px] overflow-hidden border border-black/[0.04] bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-200 mb-2 flex items-center gap-2">
            <GraduationCap size={14} /> Kami Bangun. Kami Pakai Sendiri.
          </p>
          <h3 className="text-lg sm:text-xl font-black sf-display-heavy leading-tight">
            japanarena.id — Website + Portal LMS milik kami
          </h3>
          <p className="text-sm text-blue-100/80 leading-relaxed mt-2 max-w-xl">
            Sekolah bahasa Jepang online kami: website tampil di Google, sistemnya ngurus pendaftaran,
            kelas, ujian, sampai sertifikat — jalan tiap hari buat ratusan siswa. Sistem yang sama kami rakit buat kamu.
          </p>
          <div className="flex gap-6 mt-5">
            {JA_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-black sf-display-heavy leading-none">{s.value}</div>
                <div className="text-[11px] text-blue-200 font-medium mt-1.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <a
          href="https://www.japanarena.id"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-bold rounded-full transition-all hover:bg-blue-50 active:scale-[0.96] shadow-lg"
        >
          Buka japanarena.id <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}

// Tampil hanya saat belum ada situs klien published / fetch gagal — jujur, tanpa
// situs palsu. (Sebelumnya FALLBACK_SITES menampilkan slug fiktif berlabel "Live".)
function EmptyClientCard() {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-[28px] border border-dashed border-black/10 bg-gray-50 p-8 min-h-[260px]">
      <div className="w-12 h-12 rounded-2xl bg-white apple-shadow flex items-center justify-center mb-4 text-gray-400">
        <Globe size={22} />
      </div>
      <p className="font-bold text-gray-900">Daftar situs klien sedang dimuat</p>
      <p className="text-sm text-gray-600 mt-1.5 max-w-[15rem]">
        Mau lihat contoh yang sudah live sekarang? Lihat layanan kami.
      </p>
      <a href="/seluruh-layanan" className="inline-flex items-center gap-1.5 text-[#0071E3] font-bold text-sm mt-4">
        Lihat layanan <ArrowRight size={15} />
      </a>
    </div>
  )
}

export default function PortfolioGallery() {
  const [sites, setSites] = useState<Site[] | null>(null)

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON) {
      setSites([])
      return
    }
    // Hanya situs terkurasi (show_in_portfolio=true) — cegah situs uji/internal
    // (mis. *-test) bocor ke galeri publik. Owner opt-in per situs via kolom flag.
    const url =
      `${SUPABASE_URL}/rest/v1/landing_pages` +
      `?status=eq.published&show_in_portfolio=eq.true&select=slug,nama_website,tipe_industri&order=created_at.asc`

    fetch(url, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Site[]) => setSites(data))
      .catch(() => setSites([]))
  }, [])

  const clientSites = sites ?? []

  return (
    <section id="portofolio" className="bg-[#F5F5F7] py-14 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 lg:mb-10">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live Sekarang
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight sf-display-heavy">
            Karya Kami yang Sudah Live — <span className="text-[#0071E3]">Bisa Dicek Langsung</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-5 font-medium">
            {clientSites.length > 0 ? `Sudah ${clientSites.length} bisnis jalan pakai Website + Portal kami. ` : ''}
            Bukan mockup, bukan demo internal — klik kartu mana saja untuk buka langsung di tab baru.
          </p>
        </div>

        {/* Flagship kami sendiri sebagai lead-in */}
        <FlagshipHighlight />

        {/* Gallery — mobile: carousel geser + dot; desktop: grid */}
        <MobileCardScroller desktopGrid="md:grid-cols-2 lg:grid-cols-3" hint="Geser untuk lihat karya lain →">
          {sites === null && [0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          {sites !== null && clientSites.map((site) => <PortfolioCard key={site.slug} site={site} />)}
          {sites !== null && clientSites.length === 0 && <EmptyClientCard />}
        </MobileCardScroller>

        <p className="text-sm text-gray-500 text-center mt-6 italic">
          Semua situs di atas bisa kamu buka sekarang di browser — bukan mockup, bukan demo internal.
        </p>

        {/* CTA */}
        <div className="text-center mt-10 lg:mt-14 space-y-3">
          <a
            href="/seluruh-layanan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0071E3] text-white font-bold rounded-full transition-all hover:bg-[#005BB5] active:scale-[0.96] shadow-lg glow-button"
          >
            Website Saya Mau Seperti Ini <ArrowRight size={18} />
          </a>
          <p className="text-sm text-gray-600 font-medium">Live dalam 3–5 hari kerja. Domain sendiri. Mulai dari Rp 600.000.</p>
        </div>
      </div>
    </section>
  )
}
