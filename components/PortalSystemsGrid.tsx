'use client'

import { useEffect, useState } from 'react'
import { X, ArrowRight, type LucideIcon } from 'lucide-react'

export type PortalItem = {
  icon: LucideIcon
  label: string
  short?: string
  description: string
  cta: string
  href: string
  color: string
  bg: string
  isExternal: boolean
}

// Versi mobile dari portal sistem: grid kotak ringkas 3-kolom (ikon + nama).
// flex-wrap + justify-center → baris terakhir otomatis rata-tengah saat jumlah
// portal ganjil. Ketuk kotak → bottom-sheet detail (deskripsi + tombol CTA)
// dengan animasi slide-up ala iOS. Tekan kotak = pantulan kecil (spring).
export default function PortalSystemsGrid({ portals }: { portals: PortalItem[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  // Escape untuk tutup + kunci scroll body saat sheet terbuka
  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [selected])

  const active = selected === null ? null : portals[selected]
  const ActiveIcon = active?.icon

  return (
    <>
      {/* Grid kotak — 3 per baris, baris ganjil otomatis ke tengah */}
      <div className="flex flex-wrap justify-center gap-3">
        {portals.map((p, i) => {
          const Icon = p.icon
          return (
            <button
              key={p.label}
              onClick={() => setSelected(i)}
              aria-label={`Lihat detail ${p.label}`}
              className="group flex flex-col items-center gap-2.5 w-[calc(33.333%-8px)] py-4 px-2 rounded-2xl bg-white border border-black/[0.05] apple-shadow transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-[0.92]"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.bg} ${p.color} transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-90`}
              >
                <Icon size={22} />
              </div>
              <span className="text-[11px] font-bold text-gray-700 text-center leading-tight">
                {p.short ?? p.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Bottom-sheet detail (iOS-style slide-up) */}
      {active && ActiveIcon && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelected(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[80vh] flex flex-col pb-[env(safe-area-inset-bottom)]"
          >
            <div className="pt-3 flex justify-center shrink-0">
              <span className="h-1.5 w-10 rounded-full bg-gray-200" />
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${active.bg} ${active.color}`}>
                  <ActiveIcon size={26} />
                </div>
                <h3 className="text-lg font-bold sf-display text-gray-900 leading-tight">{active.label}</h3>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Tutup"
                  className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-6">{active.description}</p>
              <a
                href={active.href}
                {...(active.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex w-full items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold bg-gray-900 text-white hover:bg-black transition-all active:scale-[0.97]"
              >
                {active.cta} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
