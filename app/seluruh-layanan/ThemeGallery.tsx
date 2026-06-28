'use client'
// ============================================================
// FASE 2 (PREVIEW_MODEL_ANALYSIS.md §9.2) — galeri tema "Model B" registry-driven.
// Mengganti preview iframe-tunggal di section "First Look" konfigurator untuk
// industri yang sudah punya tema bespoke (rollout D4: Toko Online dulu).
//
// Data = data/theme-registry.json (di-generate WB `npm run sync:corp-preview`).
// Kejujuran (§6): tema `live` pakai screenshot ASLI; tema `live-noshot` pakai
// kartu fallback (swatch warna + nama) — TIDAK pernah meminjam gambar tema lain.
// FASE 3b+: kartu punya DUA aksi terpisah — "Lihat preview" (lightbox halaman
// penuh, ThemePreviewModal) dan "Pilih gaya ini" (handoff tema ke order).
// ============================================================
import { useRef, useState } from 'react'
import {
  UtensilsCrossed,
  Shirt,
  Palette,
  Sparkles,
  Smartphone,
  Sofa,
  Wine,
  Check,
  Eye,
  type LucideIcon,
} from 'lucide-react'
import themeRegistryRaw from '@/data/theme-registry.json'
import ThemePreviewModal from './ThemePreviewModal'

// ── Tipe registry (cermin bentuk §5; di-generate WB, jangan edit tangan) ──────
export type ThemeStatus = 'live' | 'live-noshot' | 'coming-soon'
export interface ViewportThumbs {
  mobile: string
  tablet: string
  desktop: string
}
export interface FullThumbs {
  desktop: string
  mobile: string
}
export interface ThemePreviewEntry {
  themeId: string
  themeKey: string
  subKategori: string
  subKategoriNama: string
  nama: string
  deskripsi: string
  mood: string
  bg: 'dark' | 'light' | 'warm'
  icon: string
  status: ThemeStatus
  thumbs: ViewportThumbs | null
  fullThumbs: FullThumbs | null
  liveDemoUrl?: string
}
export interface SubKategoriGroup {
  id: string
  nama: string
  icon: string
  themes: ThemePreviewEntry[]
}
export interface IndustryPreview {
  tipe: string
  corpLabels: string[]
  hasReadyThemes: boolean
  subKategori: SubKategoriGroup[]
  fallback: { tagline: string; mockupGradient: string; sections: string[]; emoji: string }
}
export type ThemeRegistry = Record<string, IndustryPreview>

const THEME_REGISTRY = themeRegistryRaw as unknown as ThemeRegistry

// ── Resolver: nama tile CORP → entri registry (+ filter sub-kat opsional) ─────
// Tile yang sudah punya tema bespoke siap-shot di registry. Tile lain → null →
// page.tsx pakai preview iframe lama. "Kuliner & Makanan" (D1) menyaring ke
// sub-kat kuliner saja; sisanya menampilkan seluruh sub-kat tipe-nya. Galeri
// menggantikan preview iframe tunggal yang sering off-brand (mis. izakaya untuk
// fine dining, spa untuk klinik medis) supaya pembeli lihat tema yg pas SEBELUM
// bayar. Kunci HARUS sama persis dgn `name` di TEMPLATE_OPTIONS (page.tsx).
const LABEL_TO_REGISTRY: Record<string, { tipe: string; subKategori?: string }> = {
  'Toko Online': { tipe: 'toko_online' },
  'Kuliner & Makanan': { tipe: 'toko_online', subKategori: 'kuliner' },
  'Website Restaurant': { tipe: 'restaurant' },
  'Website Klinik & Spa': { tipe: 'klinik' },
  'Website Sekolah / LPK': { tipe: 'sekolah' },
}

export function galleryForLabel(
  label: string,
): { industry: IndustryPreview; groups: SubKategoriGroup[] } | null {
  const map = LABEL_TO_REGISTRY[label]
  if (!map) return null
  const industry = THEME_REGISTRY[map.tipe]
  if (!industry || !industry.hasReadyThemes) return null
  const groups = map.subKategori
    ? industry.subKategori.filter((g) => g.id === map.subKategori)
    : industry.subKategori
  return groups.length ? { industry, groups } : null
}

const SUBKAT_ICON: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Shirt,
  Palette,
  Sparkles,
  Smartphone,
  Sofa,
  Wine,
}

// ── Kartu satu tema — 2 aksi: Lihat preview (thumbnail) + Pilih (footer) ──────
function ThemeCard({
  theme: t,
  selected,
  onToggleSelect,
  onView,
}: {
  theme: ThemePreviewEntry
  selected: boolean
  onToggleSelect: () => void
  onView: () => void
}) {
  const live = t.status === 'live' && t.thumbs
  const canView = !!(live && t.fullThumbs)
  return (
    <div
      className={`snap-start shrink-0 w-[72%] sm:w-auto rounded-2xl overflow-hidden border transition-all duration-300 ${
        selected
          ? 'border-[#0071E3] ring-2 ring-[#0071E3] bg-[#0071E3]/10'
          : 'border-white/10 bg-white/[0.04] hover:border-white/25'
      }`}
    >
      {/* Thumbnail — tombol "Lihat preview" bila tema punya gambar halaman penuh */}
      {canView ? (
        <button
          type="button"
          onClick={onView}
          aria-label={`Lihat preview tema ${t.nama} untuk ${t.subKategoriNama}`}
          className="group relative block w-full aspect-[4/3] overflow-hidden bg-gray-800 ring-1 ring-inset ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0071E3]"
        >
          <img
            src={t.thumbs!.desktop}
            srcSet={`${t.thumbs!.mobile} 440w, ${t.thumbs!.tablet} 720w, ${t.thumbs!.desktop} 1000w`}
            sizes="(min-width: 1024px) 240px, (min-width: 640px) calc((100vw - 96px) * 0.45), calc((100vw - 96px) * 0.72)"
            alt={`Contoh tampilan tema ${t.nama} untuk ${t.subKategoriNama}`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {/* Scrim + pill "Lihat preview" muncul saat hover/focus (perangkat hover) */}
          <span
            className="absolute inset-0 bg-black/0 group-hover:bg-black/30 group-focus-visible:bg-black/30 transition-colors"
            aria-hidden
          />
          <span
            className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-300 motion-reduce:transition-none"
            aria-hidden
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-[11px] font-bold shadow-lg">
              <Eye size={13} /> Lihat preview
            </span>
          </span>
          {/* Badge mata — cue tap utk perangkat tanpa hover (mobile) */}
          <span
            className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/55 backdrop-blur-sm grid place-items-center text-white sm:hidden"
            aria-hidden
          >
            <Eye size={13} />
          </span>
          <span className="absolute top-2.5 left-2.5 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-sm bg-black/45 text-gray-200">
            Contoh tampilan
          </span>
        </button>
      ) : (
        // Tema live-noshot / tanpa gambar penuh — kartu fallback, tak bisa dibuka.
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-800 ring-1 ring-inset ring-white/10">
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2.5 p-4 text-center"
            style={{ background: `linear-gradient(135deg, ${t.mood}33, ${t.mood}0d)` }}
          >
            <span
              className="w-10 h-10 rounded-full ring-2 ring-white/15"
              style={{ background: t.mood }}
              aria-hidden
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
              Preview gambar segera
            </span>
          </div>
          <span className="absolute top-2.5 left-2.5 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-sm bg-amber-400/20 text-amber-200">
            Gambar segera
          </span>
        </div>
      )}

      {/* Info + tombol pilih */}
      <div className="p-3.5">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-white/20"
            style={{ background: t.mood }}
            aria-hidden
          />
          <h4 className="text-sm font-bold text-white sf-display truncate">{t.nama}</h4>
        </div>
        <p className="text-[11px] text-gray-400 leading-snug line-clamp-2 mb-3">{t.deskripsi}</p>
        <button
          type="button"
          onClick={onToggleSelect}
          aria-pressed={selected}
          aria-label={selected ? `Batalkan pilih tema ${t.nama}` : `Pilih tema ${t.nama}`}
          className={`w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-full text-xs font-bold transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-[#0071E3] ${
            selected
              ? 'bg-[#0071E3] text-white shadow-md shadow-blue-900/40'
              : 'bg-white/[0.06] text-gray-200 hover:bg-white/10 ring-1 ring-inset ring-white/10'
          }`}
        >
          {selected ? (
            <>
              <Check size={14} strokeWidth={3} aria-hidden /> Terpilih
            </>
          ) : (
            'Pilih gaya ini'
          )}
        </button>
      </div>
    </div>
  )
}

// ── Baris tema: carousel snap di mobile (+ dots), grid di sm+ ────────────────
function GroupCarousel({
  themes,
  selectedThemeId,
  onToggleSelect,
  onView,
}: {
  themes: ThemePreviewEntry[]
  selectedThemeId?: string
  onToggleSelect: (t: ThemePreviewEntry) => void
  onView: (t: ThemePreviewEntry) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const itemStride = () => {
    const el = scrollRef.current
    const first = el?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + 12 /* gap-3 */ : el?.clientWidth || 1
  }
  const onScroll = () => {
    const el = scrollRef.current
    if (el) setActive(Math.round(el.scrollLeft / itemStride()))
  }
  const goTo = (i: number) => scrollRef.current?.scrollTo({ left: i * itemStride(), behavior: 'smooth' })

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible"
      >
        {themes.map((t) => (
          <ThemeCard
            key={t.themeId}
            theme={t}
            selected={selectedThemeId === t.themeId}
            onToggleSelect={() => onToggleSelect(t)}
            onView={() => onView(t)}
          />
        ))}
      </div>
      {themes.length > 1 && (
        <div className="flex justify-center gap-1 mt-2.5 sm:hidden" role="group" aria-label="Navigasi tema">
          {themes.map((t, i) => (
            <button
              key={t.themeId}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ke tema ${i + 1} dari ${themes.length}`}
              aria-current={active === i}
              className="grid place-items-center h-6 w-6 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? 'w-5 bg-white/80' : 'w-1.5 bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  )
}

// ── Galeri ────────────────────────────────────────────────────────────────
export default function ThemeGallery({
  label,
  groups,
  selectedThemeId,
  onSelect,
  onClear,
}: {
  label: string
  groups: SubKategoriGroup[]
  selectedThemeId?: string
  onSelect?: (subKategori: string, themeId: string) => void
  onClear?: () => void
}) {
  const singleGroup = groups.length === 1
  const [viewing, setViewing] = useState<ThemePreviewEntry | null>(null)
  return (
    <div className="space-y-6 animate-fade-in">
      {groups.map((g) => {
        const Icon = SUBKAT_ICON[g.icon]
        return (
          <div key={g.id}>
            {!singleGroup && (
              <div className="flex items-center gap-2 mb-2.5">
                {Icon && <Icon size={15} className="text-gray-400 shrink-0" aria-hidden />}
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-300">{g.nama}</h4>
                <span className="text-[10px] text-gray-500 font-medium">
                  {g.themes.length} gaya
                </span>
              </div>
            )}
            <GroupCarousel
              themes={g.themes}
              selectedThemeId={selectedThemeId}
              onToggleSelect={(t) =>
                selectedThemeId === t.themeId ? onClear?.() : onSelect?.(t.subKategori, t.themeId)
              }
              onView={(t) => setViewing(t)}
            />
          </div>
        )
      })}
      {selectedThemeId ? (
        <p className="text-xs font-semibold text-[#0071E3] flex items-center gap-1.5">
          <Check size={13} strokeWidth={3} aria-hidden /> Gaya terpilih akan diterapkan saat kamu isi
          brief — masih bisa diubah nanti.
        </p>
      ) : (
        <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
          Ketuk gambar untuk <span className="text-gray-400 font-bold">lihat preview</span> penuh, lalu
          pilih gayanya. Gambar di sini contoh tampilan; konten (foto, teks, produk) diisi sesuai bisnis{' '}
          <span className="text-gray-400 font-bold">{label}</span> kamu setelah pesan.
        </p>
      )}

      {viewing && (
        <ThemePreviewModal
          theme={viewing}
          selected={selectedThemeId === viewing.themeId}
          onSelect={() => onSelect?.(viewing.subKategori, viewing.themeId)}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  )
}
