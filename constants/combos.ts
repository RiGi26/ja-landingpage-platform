import type { LucideIcon } from 'lucide-react';
import { GraduationCap, Cross, Bus } from 'lucide-react';
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
  /** id portal — harus cocok dengan PLATFORMS[].id di app/pricing/PricingPageClient.tsx. */
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
  travel: 149000,
  stock: 199000,
};

// 3 combo unggulan yang ditampilkan. Menambah portal lain (pharmacy/stock/laundry)
// cukup tambah entri di sini + pastikan PORTAL_START_PRICE punya harganya.
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
    id: 'website-travel',
    portalId: 'travel',
    portalLabel: 'Portal Travel & Rental',
    tagline: 'Website buat pelanggan lihat armada, portal buat booking anti-bentrok, e-ticket, dan pembayaran online.',
    icon: Bus,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    demoHref: 'https://rent.webzoka.com/demo',
    pricingHref: '/pricing?platform=travel',
  },
];
