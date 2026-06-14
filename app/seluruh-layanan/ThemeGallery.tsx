'use client'
// ============================================================
// FASE 2 (PREVIEW_MODEL_ANALYSIS.md §9.2) — galeri tema "Model B" registry-driven.
// Mengganti preview iframe-tunggal di section "First Look" konfigurator untuk
// industri yang sudah punya tema bespoke (rollout D4: Toko Online dulu).
//
// Data = data/theme-registry.json (di-generate WB `npm run sync:corp-preview`).
// Kejujuran (§6): tema `live` pakai screenshot ASLI; tema `live-noshot` pakai
// kartu fallback (swatch warna + nama) — TIDAK pernah meminjam gambar tema lain.
// Handoff tema ke order = Fase 3 → di sini galeri masih "inspirasi gaya" (display).
// ============================================================
import {
  UtensilsCrossed,
  Shirt,
  Palette,
  Sparkles,
  Smartphone,
  Sofa,
  Wine,
  Check,
  type LucideIcon,
} from 'lucide-react'
import themeRegistryRaw from '@/data/theme-registry.json'

// ── Tipe registry (cermin bentuk §5; di-generate WB, jangan edit tangan) ──────
export type ThemeStatus = 'live' | 'live-noshot' | 'coming-soon'
export interface ViewportThumbs {
  mobile: string
  tablet: string
  desktop: string
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
// Hanya tile yang di-rollout Fase 2 (D4: Toko Online dulu). Tile lain → null →
// page.tsx pakai preview iframe lama. "Kuliner & Makanan" (D1) menyaring ke
// sub-kat kuliner saja; "Toko Online" menampilkan seluruh sub-kat.
const LABEL_TO_REGISTRY: Record<string, { tipe: string; subKategori?: string }> = {
  'Toko Online': { tipe: 'toko_online' },
  'Kuliner & Makanan': { tipe: 'toko_online', subKategori: 'kuliner' },
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

// ── Kartu satu tema (selectable: handoff tema ke order, Fase 3) ─────────────
function ThemeCard({
  theme: t,
  selected,
  onSelect,
}: {
  theme: ThemePreviewEntry
  selected: boolean
  onSelect: () => void
}) {
  const live = t.status === 'live' && t.thumbs
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Pilih tema ${t.nama} untuk ${t.subKategoriNama}${selected ? ' (terpilih)' : ''}`}
      className={`snap-start shrink-0 w-[72%] sm:w-auto text-left rounded-2xl overflow-hidden border transition-all duration-300 group active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
        selected
          ? 'border-[#0071E3] ring-2 ring-[#0071E3] bg-[#0071E3]/10'
          : 'border-white/10 bg-white/[0.04] hover:border-white/25'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-800 ring-1 ring-inset ring-white/10">
        {live && t.thumbs ? (
          <img
            src={t.thumbs.desktop}
            alt={`Contoh tampilan tema ${t.nama} untuk ${t.subKategoriNama}`}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
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
        )}
        <span
          className={`absolute top-2.5 left-2.5 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-sm ${
            live ? 'bg-black/45 text-gray-200' : 'bg-amber-400/20 text-amber-200'
          }`}
        >
          {live ? 'Contoh tampilan' : 'Gambar segera'}
        </span>
        {selected && (
          <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#0071E3] text-white flex items-center justify-center shadow-lg shadow-blue-900/40">
            <Check size={14} strokeWidth={3} aria-hidden />
          </span>
        )}
      </div>
      <div className="p-3.5">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-white/20"
            style={{ background: t.mood }}
            aria-hidden
          />
          <h4 className="text-sm font-bold text-white sf-display truncate">{t.nama}</h4>
        </div>
        <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">{t.deskripsi}</p>
      </div>
    </button>
  )
}

// ── Galeri ────────────────────────────────────────────────────────────────
export default function ThemeGallery({
  label,
  groups,
  selectedThemeId,
  onSelect,
}: {
  label: string
  groups: SubKategoriGroup[]
  selectedThemeId?: string
  onSelect?: (subKategori: string, themeId: string) => void
}) {
  const singleGroup = groups.length === 1
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
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
              {g.themes.map((t) => (
                <ThemeCard
                  key={t.themeId}
                  theme={t}
                  selected={selectedThemeId === t.themeId}
                  onSelect={() => onSelect?.(t.subKategori, t.themeId)}
                />
              ))}
            </div>
          </div>
        )
      })}
      {selectedThemeId ? (
        <p className="text-xs font-semibold text-[#0071E3] flex items-center gap-1.5">
          <Check size={13} strokeWidth={3} aria-hidden /> Gaya terpilih akan diterapkan saat Anda isi
          brief — masih bisa diubah nanti.
        </p>
      ) : (
        <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
          Ketuk tema untuk memilih gayanya. Gambar di sini contoh tampilan; konten (foto, teks,
          produk) diisi sesuai bisnis <span className="text-gray-400 font-bold">{label}</span> Anda
          setelah pesan.
        </p>
      )}
    </div>
  )
}
