'use client'
// ============================================================
// FASE 3b+ — Lightbox "Lihat preview" untuk galeri tema konfigurator.
// Menampilkan screenshot HALAMAN PENUH (scrollable) + toggle Desktop/Mobile,
// lalu memberi jalan langsung untuk memilih gaya ("Pilih gaya ini →").
// Dipisah dari aksi "pilih" di kartu (ThemeGallery) supaya user bisa MELIHAT
// dulu sebelum memutuskan. Aksesibel: role=dialog, focus trap, Esc, scroll-lock.
// ============================================================
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Monitor, Smartphone, Check, ArrowRight } from 'lucide-react'
import type { ThemePreviewEntry } from './ThemeGallery'
import { useDialogA11y } from './useDialogA11y'

type Viewport = 'desktop' | 'mobile'

export default function ThemePreviewModal({
  theme: t,
  selected,
  onSelect,
  onClose,
}: {
  theme: ThemePreviewEntry
  selected: boolean
  onSelect: () => void
  onClose: () => void
}) {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const dialogRef = useRef<HTMLDivElement>(null)

  // Modal hanya ter-mount saat dibuka → selalu "open". Hook menangani scroll-lock,
  // simpan/kembalikan fokus, Esc, focus-trap, dan inert latar (#app-shell).
  useDialogA11y(true, onClose, dialogRef)

  const src = t.fullThumbs?.[viewport]
  const titleId = `theme-preview-${t.themeId}`

  // Portal ke <body> — hindari bug containing-block: wrapper galeri pakai
  // `.animate-fade-in` (transform forwards) yang membuat `position:fixed`
  // ter-anchor ke wrapper, bukan viewport. Komponen ini hanya render di klien.
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded-[24px] bg-[#0b0f17] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden animate-scale-pop"
      >
        {/* Header (sticky) */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 shrink-0">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-white/20"
            style={{ background: t.mood }}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-base font-bold text-white sf-display truncate leading-tight">
              {t.nama}
            </h2>
            <p className="text-[11px] text-gray-400 truncate">{t.subKategoriNama} · contoh tampilan</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup preview"
            className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Body — gambar halaman penuh, scroll vertikal */}
        <div className="relative flex-1 min-h-0 bg-gray-950">
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-gray-950 to-transparent pointer-events-none z-10" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none z-10" aria-hidden />
          <div
            tabIndex={0}
            role="group"
            aria-label={`Pratinjau halaman penuh tema ${t.nama}`}
            className="h-full overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0071E3]"
          >
            {src ? (
              <img
                key={viewport}
                src={src}
                alt={`Tampilan halaman penuh tema ${t.nama} pada ${viewport === 'desktop' ? 'desktop' : 'ponsel'}`}
                loading="lazy"
                className={`mx-auto w-full h-auto rounded-xl ring-1 ring-white/10 animate-fade-in ${
                  viewport === 'mobile' ? 'max-w-[360px]' : 'max-w-full'
                }`}
              />
            ) : (
              <p className="text-sm text-gray-400 text-center py-12">Preview belum tersedia.</p>
            )}
          </div>
        </div>

        {/* Footer (sticky) — toggle viewport + CTA pilih */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-white/10 shrink-0">
          <div
            role="group"
            aria-label="Pilih tampilan perangkat"
            className="inline-flex items-center gap-1 bg-white/[0.06] rounded-full p-1"
          >
            {(['desktop', 'mobile'] as Viewport[]).map((vp) => {
              const Icon = vp === 'desktop' ? Monitor : Smartphone
              const active = viewport === vp
              return (
                <button
                  key={vp}
                  type="button"
                  onClick={() => setViewport(vp)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] ${
                    active ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={14} aria-hidden />
                  <span>{vp === 'desktop' ? 'Desktop' : 'Ponsel'}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              if (!selected) onSelect()
              onClose()
            }}
            className={`inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-sm font-bold transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f17] focus-visible:ring-[#0071E3] ${
              selected
                ? 'bg-[#0071E3]/15 text-[#4aa3ff] ring-1 ring-[#0071E3]/40'
                : 'bg-[#0071E3] hover:bg-[#005BB5] text-white shadow-lg shadow-blue-900/40'
            }`}
          >
            {selected ? (
              <>
                <Check size={16} strokeWidth={3} aria-hidden /> Gaya ini terpilih
              </>
            ) : (
              <>
                Pilih gaya ini <ArrowRight size={16} aria-hidden />
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
