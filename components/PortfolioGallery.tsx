'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, ArrowRight, Globe, Loader2 } from 'lucide-react'

// Deployment websitebuilder yang menyajikan situs klien published.
const STUDIO_URL = 'https://ja-websitebuilder-platform-nfoa.vercel.app'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

type Site = {
  slug: string
  nama_website: string
  tipe_industri: string | null
}

const INDUSTRY_META: Record<string, { label: string }> = {
  toko_online: { label: 'Toko Online' },
  restaurant: { label: 'Restaurant' },
  klinik: { label: 'Klinik & Beauty' },
  perusahaan: { label: 'Perusahaan' },
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

function PortfolioCard({ site }: { site: Site }) {
  const [loaded, setLoaded] = useState(false)
  const meta = metaFor(site.tipe_industri)
  const liveUrl = `${STUDIO_URL}/${site.slug}`

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex flex-col rounded-[28px] bg-white border border-black/[0.04] apple-shadow overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <span className="absolute top-2 right-2 z-10 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
        🟢 Live Sekarang
      </span>
      {/* Browser chrome */}
      <div className="bg-gray-50 px-4 py-3 flex items-center gap-2.5 border-b border-black/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 mx-1">
          <div className="bg-white border border-black/5 rounded-md px-3 py-1 text-[10px] text-gray-400 font-mono text-center truncate">
            {site.slug}.japanarena.com
          </div>
        </div>
        <ExternalLink size={12} className="text-gray-300 group-hover:text-[#0071E3] transition-colors shrink-0" />
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
        <span className="text-xs text-gray-400">{meta.label}</span>
        <p className="text-[10px] text-gray-400 font-mono mt-1 truncate">{site.slug}.japanarena.com</p>
      </div>
    </a>
  )
}

const FALLBACK_SITES: Site[] = [
  { slug: 'klinik-pratama', nama_website: 'Klinik Pratama Jaya', tipe_industri: 'klinik' },
  { slug: 'rental-mobil-bali', nama_website: 'Bali Express Rental', tipe_industri: 'travel' },
  { slug: 'toko-kue-lestari', nama_website: 'Kue Lestari Jakarta', tipe_industri: 'toko_online' },
]

export default function PortfolioGallery() {
  const [sites, setSites] = useState<Site[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON) {
      setError(true)
      return
    }
    const url =
      `${SUPABASE_URL}/rest/v1/landing_pages` +
      `?status=eq.published&select=slug,nama_website,tipe_industri&order=created_at.asc`

    fetch(url, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Site[]) => setSites(data))
      .catch(() => setError(true))
  }, [])

  // Gunakan data fallback jika fetch gagal atau belum ada data, 
  // agar section tetap crawlable dan tidak kosong di sisi client.
  const displaySites = sites && sites.length > 0 ? sites : FALLBACK_SITES

  return (
    <section id="portofolio" className="bg-[#F5F5F7] py-24 lg:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live Sekarang
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight sf-display-heavy">
            {sites && sites.length > 0
              ? <>{sites.length} Website Klien Kami — <span className="text-[#0071E3]">Bisa Dicek Langsung</span></>
              : <>Portfolio Klien Kami — <span className="text-[#0071E3]">Bisa Dicek Langsung</span></>
            }
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-5 font-medium">
            Bukan mockup, bukan demo — ini domain nyata yang sudah diakses pelanggan klien kami hari ini.
            Klik kartu mana saja untuk buka langsung di tab baru.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySites.map((site) => (
            <PortfolioCard key={site.slug} site={site} />
          ))}

          {/* Japan Arena Academy — always shown */}
          <a
            href="https://www.japanarena.id"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex flex-col rounded-[28px] bg-white border border-black/[0.04] apple-shadow overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <span className="absolute top-2 right-2 z-10 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              🟢 Live Sekarang
            </span>
            {/* Browser chrome */}
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-2.5 border-b border-black/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 mx-1">
                <div className="bg-white border border-black/5 rounded-md px-3 py-1 text-[10px] text-gray-400 font-mono text-center truncate">
                  www.japanarena.id
                </div>
              </div>
              <ExternalLink size={12} className="text-gray-300 group-hover:text-[#0071E3] transition-colors shrink-0" />
            </div>
            {/* Preview */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-4xl mb-3">🎓</p>
                <p className="text-white font-black text-lg">Japan Arena Academy</p>
                <p className="text-blue-200 text-sm mt-1">Sistem Pelatihan Bahasa Jepang</p>
              </div>
              <div className="absolute inset-0 bg-[#0071E3]/0 group-hover:bg-[#0071E3]/15 transition-all duration-300 flex items-center justify-center">
                <span className="bg-white text-gray-900 font-black text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ExternalLink size={13} /> Buka Website Live
                </span>
              </div>
            </div>
            {/* Footer info */}
            <div className="px-5 py-4">
              <h3 className="text-sm font-bold text-gray-900 truncate">Japan Arena Academy</h3>
              <span className="text-xs text-gray-400">Website Sekolah / LMS</span>
              <p className="text-[10px] text-gray-400 font-mono mt-1 truncate">www.japanarena.id</p>
            </div>
          </a>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6 italic">
          Semua website di atas bisa Anda buka sekarang di browser — bukan mockup, bukan demo internal.
        </p>

        {/* CTA */}
        <div className="text-center mt-14 space-y-3">
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
