'use client'

import { useState } from 'react'
import { ChevronDown, ArrowRight, type LucideIcon } from 'lucide-react'

export type PortalItem = {
  icon: LucideIcon
  label: string
  description: string
  cta: string
  href: string
  color: string
  bg: string
  isExternal: boolean
}

// Versi mobile dari kartu portal sistem: tiap portal jadi baris accordion ringkas.
// Ketuk baris → buka deskripsi + tombol CTA. Hanya satu terbuka pada satu waktu.
// Pola accordion mengikuti components/LmsFaq.tsx (useState + ChevronDown rotate).
export default function PortalSystemsAccordion({ portals }: { portals: PortalItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {portals.map((p, i) => {
        const Icon = p.icon
        const isOpen = open === i
        return (
          <div
            key={p.label}
            className="rounded-2xl border border-black/[0.06] bg-white apple-shadow overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-gray-50"
            >
              <div
                className={`w-11 h-11 rounded-[8px] flex items-center justify-center shrink-0 ${p.bg} ${p.color}`}
              >
                <Icon size={22} />
              </div>
              <span className="flex-1 font-bold text-gray-900 sf-display text-[15px] leading-tight">
                {p.label}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-3 border-t border-gray-100">
                <p className="text-sm leading-relaxed text-gray-500 mb-4">{p.description}</p>
                <a
                  href={p.href}
                  {...(p.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex w-full items-center justify-center gap-2 py-3 rounded-full text-sm font-bold bg-gray-900 text-white hover:bg-black transition-all"
                >
                  {p.cta} <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
