import type { LucideIcon } from 'lucide-react';
import { GraduationCap, Cross, Bus, Pill, Boxes } from 'lucide-react';
import { HOSTING_PACKAGES } from './services';

// Paket combo "Website + Portal" — menggabungkan produk Website Builder (bayar
// sekali) dengan langganan Portal (per bulan). Ditampilkan di landing page tepat
// setelah SegmenSection sebagai jembatan konversi: customer baru saja lihat
// Website & Portal terpisah, di sini dijawab "bisa dapat dua-duanya sekaligus".
//
// KEDALAMAN: tampilan + harga combo saja (belum checkout). CTA mengarah ke
// /pricing?platform=<id> (buka tab portal terkait) & URL demo portal.

export interface WebsitePortalCombo {
  id: string;
  /**
   * id platform pricing — HARUS cocok dengan PLATFORMS[].id di
   * app/pricing/PricingPageClient.tsx (lms | clinic | pharmacy | rental | stock).
   * Dipakai untuk deep-link ?platform= DAN key PORTAL_START_PRICE. Kalau tak cocok,
   * deep-link gagal diam-diam → jatuh ke tab pertama (LMS). (Bug ini pernah terjadi
   * saat portalId 'travel' dipakai padahal id pricing = 'rental'.)
   */
  portalId: string;
  portalLabel: string;
  /** Kalimat singkat "kenapa Website + Portal ini masuk akal bareng". */
  tagline: string;
  icon: LucideIcon;
  /** Kelas warna Tailwind — samakan gaya SegmenSection (app/page.tsx). */
  color: string;
  bg: string;
  demoHref: string;
  /** Buka tab portal terkait di /pricing (deep-link ?platform= didukung sejak 2026-07). */
  pricingHref: string;
}

/** Harga website sekali (setup) — paket termurah. Single source: HOSTING_PACKAGES. */
export const WEBSITE_FROM_PRICE =
  HOSTING_PACKAGES.find(h => h.id === 'basic')?.price ?? 600000;

// Harga awal portal = tier Starter (bulanan). SUMBER KEBENARAN angka ini ada di
// PLATFORMS[].plans (tier 'Starter') pada app/pricing/PricingPageClient.tsx —
// disalin ke sini agar landing tetap "pricing-light" tanpa import komponen berat.
// Kalau harga Starter di sana berubah, sesuaikan di sini juga. (Ekstraksi penuh
// PLATFORMS ke constants/ bisa jadi follow-up terpisah.)
export const PORTAL_START_PRICE: Record<string, number> = {
  lms: 149000,
  clinic: 199000,
  pharmacy: 149000,
  rental: 149000,
  stock: 199000,
};

// Combo yang ditampilkan — paritas dengan SegmenSection (portal yang punya tab
// pricing self-subscribe). Laundry belum punya tab /pricing → tetap lewat "chat
// tim kami" di bawah kartu. Menambah portal: tambah entri di sini + pastikan
// PORTAL_START_PRICE punya harganya + id-nya ada di PLATFORMS (PricingPageClient).
export const WEBSITE_PORTAL_COMBOS: WebsitePortalCombo[] = [
  {
    id: 'website-lms',
    portalId: 'lms',
    portalLabel: 'Portal Belajar / LMS',
    tagline: 'Website buat menarik pendaftar baru, portal buat kelola materi, ujian, sampai terbitkan sertifikat otomatis.',
    icon: GraduationCap,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    demoHref: 'https://lms.webzoka.com/demo',
    pricingHref: '/pricing?platform=lms',
  },
  {
    id: 'website-clinic',
    portalId: 'clinic',
    portalLabel: 'Portal Klinik',
    tagline: 'Website buat pasien menemukan & booking, portal buat rekam medis, antrian, dan jadwal dokter dalam satu tempat.',
    icon: Cross,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    demoHref: 'https://clinic.webzoka.com/demo',
    pricingHref: '/pricing?platform=clinic',
  },
  {
    id: 'website-rental',
    portalId: 'rental',
    portalLabel: 'Portal Travel & Rental',
    tagline: 'Website buat pelanggan lihat armada, portal buat booking anti-bentrok, e-ticket, dan pembayaran online.',
    icon: Bus,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    demoHref: 'https://rent.webzoka.com/demo',
    pricingHref: '/pricing?platform=rental',
  },
  {
    id: 'website-pharmacy',
    portalId: 'pharmacy',
    portalLabel: 'Portal Farmasi',
    tagline: 'Website biar apotek gampang ditemukan, portal buat pantau stok obat, resep digital, dan kasir yang terhubung gudang real-time.',
    icon: Pill,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    demoHref: 'https://pharmacy.webzoka.com/demo',
    pricingHref: '/pricing?platform=pharmacy',
  },
  {
    id: 'website-stock',
    portalId: 'stock',
    portalLabel: 'Portal Stok & Operasi',
    tagline: 'Website buat terima order, portal buat kelola stok, produksi, kasir, sampai laporan keuangan — kasir, dapur & gudang tersinkron.',
    icon: Boxes,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    demoHref: 'https://stock.webzoka.com/demo',
    pricingHref: '/pricing?platform=stock',
  },
];
