'use client'

import { useRef, useState, Children, type ReactNode } from 'react'

// Carousel kartu untuk MOBILE (compact, anti boring-scroll): di bawah `md` kartu
// jadi baris geser-samping (snap) dengan kartu berikutnya "ngintip" (peek) + dot
// indikator + hint geser; di `md:` ke atas kembali jadi grid biasa (kelas grid
// dioper via `desktopGrid`). Pola dicermin dari app/pricing/PricingPageClient.tsx.
//
// Catatan: JANGAN pasang class `reveal` (scroll-reveal) di kartu yang masuk sini —
// kartu yang tergeser ke luar viewport horizontal tak akan ter-"is-visible" dan
// tetap tersembunyi. Reveal cukup di header section.
export default function MobileCardScroller({
  children,
  desktopGrid = 'md:grid-cols-3',
  hint = 'Geser untuk lihat semua →',
  cardWidth = 'w-[85%]',
}: {
  children: ReactNode
  /** Kelas grid untuk `md:` ke atas, mis. "md:grid-cols-3". */
  desktopGrid?: string
  hint?: string
  /** Lebar tiap kartu di mobile (sisakan ruang peek), mis. "w-[85%]". */
  cardWidth?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const items = Children.toArray(children)

  function onScroll() {
    const el = ref.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    const step = first.offsetWidth + 16 // lebar kartu + gap-4
    setActive(Math.round(el.scrollLeft / step))
  }

  return (
    <>
      <div
        ref={ref}
        onScroll={onScroll}
        className={`flex md:grid grid-cols-1 ${desktopGrid} snap-x snap-mandatory overflow-x-auto md:overflow-visible scroll-px-4 gap-4 md:gap-6 -mx-4 px-4 md:mx-0 md:px-0 pt-1 pb-2 md:py-0 items-stretch scrollbar-hide`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className={`snap-start shrink-0 ${cardWidth} md:w-auto flex [&>*]:w-full [&>*]:h-full`}
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="md:hidden flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 bg-[#0071E3]' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] font-medium text-gray-400">{hint}</p>
        </div>
      )}
    </>
  )
}
