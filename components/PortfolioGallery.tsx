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
      className="group flex flex-col rounded-[28px] bg-white border border-black/[0.04] apple-shadow overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Browser chrome */}
      <div className="bg-gray-50 px-4 py-3 flex items-center gap-2.5 border-b border-black/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 mx-1">
          <div className="bg-white border border-black/5 rounded-md px-3 py-1 text-[10px] text-gray-400 font-mono text-center truncate">
            {site.slug}.japanarenacorp.com
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
      <div className="flex items-center justify-between px-5 py-4">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-900 truncate">{site.nama_website}</h3>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">{meta.label}</p>
        </div>
        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
          Live
        </span>
      </div>
    </a>
  )
}

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

  // Sembunyikan seluruh section bila gagal / belum ada data — jangan tampilkan blok kosong.
  if (error || (sites && sites.length === 0)) return null

  return (
    <section id="portofolio" className="bg-[#F5F5F7] py-24 lg:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 flex items-center justify-center gap-2">
            <Globe size={14} /> Karya Kami
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight sf-display-heavy">
            Website yang Sudah Kami Bangun
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-5 font-medium">
            Bukan sekadar mockup — ini website klien kami yang sudah live & beroperasi.
            Klik untuk melihat langsung di tab baru.
          </p>
        </div>

        {/* Loading skeleton */}
        {!sites && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-[28px] bg-white border border-black/[0.04] apple-shadow overflow-hidden animate-pulse">
                <div className="h-10 bg-gray-50 border-b border-black/5" />
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="px-5 py-4 space-y-2">
                  <div className="h-3 w-32 bg-gray-100 rounded" />
                  <div className="h-2 w-20 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery */}
        {sites && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <PortfolioCard key={site.slug} site={site} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/seluruh-layanan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0071E3] text-white font-bold rounded-full transition-all hover:bg-[#005BB5] shadow-lg glow-button"
          >
            Buat Website Seperti Ini <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
