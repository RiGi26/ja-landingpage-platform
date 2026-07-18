'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, Sparkles, ArrowRight, ExternalLink, GraduationCap, Cross, Pill, Bus, Boxes, WashingMachine, FolderOpen, Package, Lightbulb, ChevronDown, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/LmsNavbar'

type Plan = { tier: string; price: number; priceYearly?: number; feat: string[]; popular?: boolean; desc?: string; promo?: string; cta?: string; isTrial?: boolean }
// Tabel banding fitur per-paket. Hanya isi untuk portal yang gating tier-nya
// SUDAH ditegakkan app (mis. Stock) — jangan jual beda fitur yang belum nyata.
// `tiers` sejajar dgn `cols`: boolean = centang/strip, string = nilai (mis. "3", "Tanpa batas").
type MatrixRow = { label: string; tiers: (boolean | string)[] }
type FeatureMatrix = { cols: string[]; rows: MatrixRow[]; note?: string }

const PLATFORMS: { id: string; name: string; subtitle: string; icon: LucideIcon; demoUrl: string; registerUrl: string; plans: Plan[]; featureMatrix?: FeatureMatrix }[] = [
  {
    id: 'lms',
    name: 'Portal Belajar / LMS',
    subtitle: 'Sistem belajar & kursus online',
    icon: GraduationCap,
    demoUrl: 'https://lms.webzoka.com/demo',
    registerUrl: 'https://lms.webzoka.com/register',
    plans: [
      {
        tier: 'Trial', price: 0, isTrial: true, cta: 'Mulai Trial 14 Hari',
        desc: 'Coba semua fitur paket Pro, 14 hari penuh.',
        feat: ['Semua fitur paket Pro', 'Unlimited Siswa', 'Multi-Pengajar', 'Sertifikat Kelulusan', 'Priority Support', 'Tanpa kartu kredit'],
      },
      { tier: 'Starter', price: 149000, priceYearly: 1490000, desc: 'Untuk kelas kecil yang baru mulai.', feat: ['100 Siswa', 'Materi & Sesi Belajar', 'Kuis & Ujian', 'Flashcard', 'Manajemen & Absensi Siswa', 'Portal Wali Murid'] },
      { tier: 'Growth', price: 399000, priceYearly: 3990000, desc: 'Untuk lembaga yang sedang berkembang.', feat: ['500 Siswa', 'Keuangan & Invoice', 'Laporan + Ekspor CSV', 'Notifikasi WhatsApp', 'Jadwal Kelas Live'], popular: true },
      { tier: 'Pro', price: 899000, priceYearly: 8990000, desc: 'Untuk sekolah & lembaga besar.', feat: ['Unlimited Siswa', 'Sertifikat Kelulusan', 'Multi-Pengajar', 'Blog / Artikel Publik', 'Priority Support'] },
    ],
    // Semua baris gating-nya ditegakkan server: Fase A (laporan/WA/jadwal/keuangan/blog)
    // + Fase A.1 (multi-pengajar, sertifikat, kuota siswa) — 2026-06-26.
    featureMatrix: {
      cols: ['Starter', 'Growth', 'Pro'],
      note: 'Trial 14 hari = akses penuh setara Pro. Setelah trial, fitur menyesuaikan paket yang dipilih.',
      rows: [
        { label: 'Materi & sesi belajar (BAB)', tiers: [true, true, true] },
        { label: 'Kuis & ujian (mock test)', tiers: [true, true, true] },
        { label: 'Flashcard (spaced repetition)', tiers: [true, true, true] },
        { label: 'Manajemen & absensi siswa', tiers: [true, true, true] },
        { label: 'Portal wali murid (akses orang tua)', tiers: [true, true, true] },
        { label: 'Laporan + ekspor CSV', tiers: [false, true, true] },
        { label: 'Notifikasi WhatsApp otomatis', tiers: [false, true, true] },
        { label: 'Jadwal kelas live + reminder', tiers: [false, true, true] },
        { label: 'Keuangan & invoice', tiers: [false, true, true] },
        { label: 'Multi-pengajar', tiers: [false, false, true] },
        { label: 'Sertifikat kelulusan', tiers: [false, false, true] },
        { label: 'Blog / artikel publik', tiers: [false, false, true] },
        { label: 'Jumlah siswa aktif', tiers: ['100', '500', 'Tanpa batas'] },
      ],
    },
  },
  {
    id: 'clinic',
    name: 'Portal Klinik',
    subtitle: 'Manajemen pasien digital',
    icon: Cross,
    demoUrl: 'https://clinic.webzoka.com/demo',
    registerUrl: 'https://clinic.webzoka.com/register',
    plans: [
      {
        tier: 'Trial', price: 0, isTrial: true, cta: 'Mulai Trial 14 Hari',
        desc: 'Coba semua fitur paket Pro, 14 hari penuh.',
        feat: ['Semua fitur paket Pro', 'Unlimited Pasien', 'Siap integrasi SATUSEHAT¹', 'Multi-Dokter', 'Custom Domain', 'Tanpa kartu kredit'],
      },
      { tier: 'Starter', price: 199000, priceYearly: 1990000, desc: 'Untuk praktik kecil yang baru mulai.', feat: ['25 Pasien/bulan', 'Antrian & Appointment', 'Rekam Medis Digital', 'Surat Keterangan', 'Booking Online'] },
      { tier: 'Growth', price: 499000, priceYearly: 4990000, desc: 'Untuk klinik yang ramai harian.', feat: ['Unlimited Pasien', 'Siap integrasi SATUSEHAT¹', 'Antrian Otomatis', 'Notifikasi WhatsApp', 'Laporan Harian'], popular: true },
      { tier: 'Pro', price: 1199000, priceYearly: 11990000, desc: 'Untuk klinik multi-dokter & cabang.', feat: ['Semua fitur Growth', 'Multi-Dokter', 'Custom Domain', 'API Integration', 'Priority Support'] },
    ],
    // Gating per-tier ditegakkan server (Klinik Fase A — page+API guard + seat dokter).
    // Custom domain/white-label dikontrol superadmin → tak ditampilkan di sini.
    featureMatrix: {
      cols: ['Starter', 'Growth', 'Pro'],
      note: 'Trial 14 hari = akses penuh setara Pro. Setelah trial, fitur menyesuaikan paket yang dipilih.',
      rows: [
        { label: 'Antrian & appointment', tiers: [true, true, true] },
        { label: 'Database pasien', tiers: [true, true, true] },
        { label: 'Rekam medis + resep (SOAP/ICD-10)', tiers: [true, true, true] },
        { label: 'Surat keterangan (sakit/sehat/rujukan)', tiers: [true, true, true] },
        { label: 'Billing & pembayaran (+ struk WA)', tiers: [false, true, true] },
        { label: 'Apotek / stok obat', tiers: [false, true, true] },
        { label: 'Laporan & analitik (+ ekspor)', tiers: [false, true, true] },
        { label: 'Jadwal staf / shift', tiers: [false, true, true] },
        { label: 'Notifikasi WhatsApp otomatis', tiers: [false, true, true] },
        { label: 'Booking link pasien + QR', tiers: [false, false, true] },
        { label: 'Jumlah dokter', tiers: ['1', '3', 'Tanpa batas'] },
      ],
    },
  },
  {
    id: 'pharmacy',
    name: 'Portal Farmasi',
    subtitle: 'Manajemen apotek digital',
    icon: Pill,
    demoUrl: 'https://pharmacy.webzoka.com/demo',
    registerUrl: 'https://pharmacy.webzoka.com/register',
    plans: [
      {
        tier: 'Trial', price: 0, isTrial: true, cta: 'Mulai Trial 14 Hari',
        desc: 'Coba semua fitur paket Pro, 14 hari penuh.',
        feat: ['Semua fitur paket Pro', 'User/kasir tanpa batas', 'Integrasi resep klinik', 'Mode offline (PWA)', 'Cetak struk hardware', 'Tanpa kartu kredit'],
      },
      { tier: 'Starter', price: 149000, priceYearly: 1490000, desc: 'Untuk apotek kecil yang baru mulai.', feat: ['POS + barcode', 'Master obat & inventory', 'Shift kasir + rekap', 'Logbook obat keras (BPOM)', '1 user'] },
      { tier: 'Growth', price: 399000, priceYearly: 3990000, desc: 'Untuk apotek dengan transaksi padat.', feat: ['Semua Starter', 'Stok opname + monitoring expiry', 'Laporan & analitik (Excel/PDF)', 'Notifikasi WhatsApp', '3 user'], popular: true },
      { tier: 'Pro', price: 799000, priceYearly: 7990000, desc: 'Untuk apotek yang terintegrasi penuh.', feat: ['Semua Growth', 'Integrasi resep klinik', 'Mode offline (PWA)', 'Cetak struk hardware (QZ Tray)', 'User tanpa batas'] },
    ],
    // Gating per-tier ditegakkan server (Farmasi — page+API guard + seat kasir).
    featureMatrix: {
      cols: ['Starter', 'Growth', 'Pro'],
      note: 'Trial 14 hari = akses penuh setara Pro. Setelah trial, fitur menyesuaikan paket yang dipilih.',
      rows: [
        { label: 'POS / kasir (+ barcode)', tiers: [true, true, true] },
        { label: 'Master obat', tiers: [true, true, true] },
        { label: 'Inventory & terima stok', tiers: [true, true, true] },
        { label: 'Shift kasir + rekap', tiers: [true, true, true] },
        { label: 'Logbook obat keras & psikotropika (BPOM)', tiers: [true, true, true] },
        { label: 'Stok opname', tiers: [false, true, true] },
        { label: 'Monitoring expiry + retur/musnah', tiers: [false, true, true] },
        { label: 'Laporan & analitik (Excel/PDF)', tiers: [false, true, true] },
        { label: 'Notifikasi WhatsApp otomatis', tiers: [false, true, true] },
        { label: 'Integrasi resep klinik (webhook)', tiers: [false, false, true] },
        { label: 'Mode offline (PWA) + sinkron', tiers: [false, false, true] },
        { label: 'Cetak struk hardware (QZ Tray)', tiers: [false, false, true] },
        { label: 'Jumlah user/kasir', tiers: ['1', '3', 'Tanpa batas'] },
      ],
    },
  },
  {
    id: 'rental',
    name: 'Portal Travel & Rental',
    subtitle: 'Booking & kelola aset online',
    icon: Bus,
    demoUrl: 'https://rent.webzoka.com/auth/login',
    registerUrl: 'https://rent.webzoka.com/register',
    plans: [
      {
        tier: 'Trial', price: 0, isTrial: true, cta: 'Mulai Trial 14 Hari',
        desc: 'Coba semua fitur paket Pro, 14 hari penuh.',
        feat: ['Semua fitur paket Pro', 'GPS live tracking', 'Rental self-drive', 'Pembayaran online', 'Notif WA otomatis', 'Tanpa kartu kredit'],
      },
      { tier: 'Starter', price: 149000, priceYearly: 1490000, desc: 'Untuk armada kecil yang baru mulai.', feat: ['Armada + reminder servis', 'Rute & jadwal', 'Booking + bayar manual', 'E-ticket & invoice PDF', 'Driver roster + rating'] },
      { tier: 'Growth', price: 399000, priceYearly: 3990000, desc: 'Untuk rental yang sibuk.', feat: ['Semua Starter', 'Pembayaran online (Midtrans)', 'Notifikasi WhatsApp', 'Laporan & analitik'], popular: true },
      { tier: 'Pro', price: 799000, priceYearly: 7990000, desc: 'Untuk operator yang terintegrasi penuh.', feat: ['Semua Growth', 'GPS live tracking', 'Rental self-drive (deposit)', 'Priority support'] },
    ],
    // Gating per-tier ditegakkan server (Travel — page guard + API guard).
    featureMatrix: {
      cols: ['Starter', 'Growth', 'Pro'],
      note: 'Trial 14 hari = akses penuh setara Pro. Setelah trial, fitur menyesuaikan paket yang dipilih.',
      rows: [
        { label: 'Armada + reminder servis', tiers: [true, true, true] },
        { label: 'Rute & jadwal', tiers: [true, true, true] },
        { label: 'Booking + konfirmasi bayar manual', tiers: [true, true, true] },
        { label: 'E-ticket & invoice PDF (QR)', tiers: [true, true, true] },
        { label: 'Driver roster + rating', tiers: [true, true, true] },
        { label: 'Pembayaran online (Midtrans)', tiers: [false, true, true] },
        { label: 'Notifikasi WhatsApp otomatis', tiers: [false, true, true] },
        { label: 'Laporan & analitik', tiers: [false, true, true] },
        { label: 'GPS live tracking', tiers: [false, false, true] },
        { label: 'Modul rental self-drive (deposit)', tiers: [false, false, true] },
      ],
    },
  },
  {
    id: 'stock',
    name: 'Portal Operasi (Stock)',
    subtitle: 'Stok, pesanan & operasi bisnis',
    icon: Boxes,
    demoUrl: 'https://stock.webzoka.com/demo',
    registerUrl: 'https://stock.webzoka.com/register',
    plans: [
      {
        tier: 'Trial', price: 0, isTrial: true, cta: 'Mulai Trial 14 Hari',
        desc: 'Coba semua fitur paket Pro, 14 hari penuh.',
        feat: ['Semua fitur paket Pro', 'Resep / BOM & modul Produksi', 'Perencanaan produksi (MRP)', 'SDM & Penggajian tim', 'Akun & hak akses tim tanpa batas', 'Tanpa kartu kredit'],
      },
      {
        tier: 'Starter', price: 199000, priceYearly: 1990000,
        desc: 'Untuk mulai rapikan pesanan & pembayaran harian.',
        feat: ['Dashboard ringkasan omzet & pesanan harian', 'Kelola pesanan (status: menunggu → dikirim)', 'Harga nego / ubah harga di kasir (POS)', 'Invoice & label pengiriman otomatis', 'Notifikasi WhatsApp ke pelanggan otomatis', 'Manajemen produk & katalog', 'Import produk massal via CSV', 'CRM pelanggan (riwayat + segmen)', 'Kode promo & diskon', '1 akun admin'],
      },
      {
        tier: 'Growth', price: 399000, priceYearly: 3990000, popular: true,
        desc: 'Untuk yang sudah rutin restock & butuh kontrol stok.',
        feat: ['Semua fitur Starter', 'Stok & lot tracking + stok opname', 'Kartu stok per produk (riwayat pergerakan)', 'Stok opname offline — tetap jalan tanpa internet', 'Pemantauan kadaluarsa (expiry monitoring)', 'Manajemen pemasok (purchase order)', 'Laporan keuangan & arus kas otomatis', 'Piutang & pembayaran tempo pelanggan', 'Sampai 3 akun tim & hak akses', 'Verifikasi pembayaran manual & COD'],
      },
      {
        tier: 'Pro', price: 899000, priceYearly: 8990000,
        desc: 'Untuk produksi skala besar & tim yang berkembang.',
        feat: ['Semua fitur Growth', 'Resep / BOM & modul Produksi', 'Perencanaan produksi (MRP)', 'SDM & Penggajian tim produksi', 'Akun & hak akses tim tanpa batas', 'Konfigurasi & white-label penuh', 'Prioritas dukungan teknis'],
      },
    ],
    featureMatrix: {
      cols: ['Starter', 'Growth', 'Pro'],
      note: 'Trial 14 hari = akses penuh setara Pro. Setelah trial, fitur menyesuaikan paket yang dipilih.',
      rows: [
        { label: 'Dashboard & laporan ringkas', tiers: [true, true, true] },
        { label: 'Kelola pesanan & invoice/label', tiers: [true, true, true] },
        { label: 'Harga nego di kasir (POS)', tiers: [true, true, true] },
        { label: 'Notifikasi WhatsApp otomatis', tiers: [true, true, true] },
        { label: 'Produk & katalog', tiers: [true, true, true] },
        { label: 'Import produk via CSV', tiers: [true, true, true] },
        { label: 'CRM & database pelanggan', tiers: [true, true, true] },
        { label: 'Kode promo & diskon', tiers: [true, true, true] },
        { label: 'Stok & Lot + Stok Opname', tiers: [false, true, true] },
        { label: 'Kartu stok per produk', tiers: [false, true, true] },
        { label: 'Stok opname offline (PWA)', tiers: [false, true, true] },
        { label: 'Pemantauan kadaluarsa', tiers: [false, true, true] },
        { label: 'Pemasok & Purchase Order', tiers: [false, true, true] },
        { label: 'Laporan keuangan & arus kas', tiers: [false, true, true] },
        { label: 'Piutang & pembayaran tempo', tiers: [false, true, true] },
        { label: 'Resep / BOM & Produksi', tiers: [false, false, true] },
        { label: 'Perencanaan produksi (MRP)', tiers: [false, false, true] },
        { label: 'SDM & Penggajian', tiers: [false, false, true] },
        { label: 'Jumlah akun tim', tiers: ['1', '3', 'Tanpa batas'] },
      ],
    },
  },
  {
    id: 'laundry',
    name: 'Portal Laundry',
    subtitle: 'Manajemen laundry digital',
    icon: WashingMachine,
    demoUrl: 'https://laundry.webzoka.com/demo',
    registerUrl: 'https://laundry.webzoka.com/register',
    plans: [
      {
        tier: 'Trial', price: 0, isTrial: true, cta: 'Mulai Trial 14 Hari',
        desc: 'Coba semua fitur paket Pro, 14 hari penuh.',
        feat: ['Semua fitur paket Pro', 'SDM & Penggajian', 'Branding sendiri (white-label)', 'Staf tanpa batas', 'Antar-jemput & saldo pelanggan', 'Tanpa kartu kredit'],
      },
      { tier: 'Starter', price: 149000, priceYearly: 1490000, desc: 'Untuk laundry yang baru mulai rapikan order.', feat: ['Order laundry (kiloan & satuan) + timbang', 'Tier kecepatan + ETA (Reguler/Express/Kilat)', 'Status proses cuci (diterima → selesai)', 'Label & QR per kantong + scanner', 'Antar-jemput & saldo pelanggan', 'Notifikasi WhatsApp otomatis', '1 akun admin'] },
      { tier: 'Growth', price: 399000, priceYearly: 3990000, desc: 'Untuk laundry yang butuh kontrol keuangan.', feat: ['Semua fitur Starter', 'Laporan & keuangan (omzet, arus kas, biaya)', 'Sampai 3 akun tim & hak akses'], popular: true },
      { tier: 'Pro', price: 799000, priceYearly: 7990000, desc: 'Untuk laundry dengan tim & multi-staf.', feat: ['Semua fitur Growth', 'SDM & Penggajian', 'Branding sendiri (white-label)', 'Staf tanpa batas', 'Prioritas dukungan teknis'] },
    ],
    // Fitur laundry = jasa: modul stok/BOM/MRP/supplier warisan stock DISEMBUNYIKAN (tak diiklankan).
    // Diferensiasi jujur: Starter = semua operasi laundry · Growth = +laporan/keuangan · Pro = +SDM+white-label.
    // Self-checkout WIRED 2026-07-05 (billing tag 'laundry' + paket laundry di Core) → laundry masuk
    // subscribeReady → tier berbayar pakai CTA "Mulai berlangganan" (register?intent=subscribe).
    featureMatrix: {
      cols: ['Starter', 'Growth', 'Pro'],
      note: 'Trial 14 hari = akses penuh setara Pro. Setelah trial, fitur menyesuaikan paket yang dipilih.',
      rows: [
        { label: 'Order laundry (kiloan & satuan) + timbang', tiers: [true, true, true] },
        { label: 'Tier kecepatan + ETA (Reguler/Express/Kilat)', tiers: [true, true, true] },
        { label: 'Status proses cuci (diterima → selesai)', tiers: [true, true, true] },
        { label: 'Label & QR per kantong + scanner', tiers: [true, true, true] },
        { label: 'Antar-jemput (pickup & delivery)', tiers: [true, true, true] },
        { label: 'Pelanggan + saldo/deposit', tiers: [true, true, true] },
        { label: 'Layanan & harga', tiers: [true, true, true] },
        { label: 'Notifikasi WhatsApp otomatis', tiers: [true, true, true] },
        { label: 'Laporan & keuangan (arus kas & biaya)', tiers: [false, true, true] },
        { label: 'SDM & penggajian', tiers: [false, false, true] },
        { label: 'Branding sendiri (white-label)', tiers: [false, false, true] },
        { label: 'Jumlah akun tim', tiers: ['1', '3', 'Tanpa batas'] },
      ],
    },
  }
]

// Harga otoritatif dari Core DB (lihat /api/public/plans). Key: `${platform}:${coreTier}`.
// Tier tampilan → tier Core (enum): Starter→starter, Growth→pro, Pro→enterprise.
// (Semua portal kini skema seragam Starter/Growth/Pro; semua berbayar, Trial gratis.)
export type PriceMap = Record<string, number>

function coreTierOf(tier: string): 'starter' | 'pro' | 'enterprise' {
  return tier === 'Pro' ? 'enterprise' : tier === 'Growth' ? 'pro' : 'starter'
}

function resolvePrice(platformId: string, tier: string, fallback: number, period: 'monthly' | 'yearly', priceMap?: PriceMap): number {
  const live = priceMap?.[`${platformId}:${coreTierOf(tier)}:${period}`]
  return typeof live === 'number' && live > 0 ? live : fallback
}

// URL publik superadmin (Core) — endpoint status kampanye promo. Non-rahasia.
const SUPERADMIN_URL = 'https://superadmin.webzoka.com'

type CampaignStatus = { active: boolean; discountPct: number; tier: string; months: number }

export default function PricingPageClient({ priceMap }: { priceMap?: PriceMap }) {
  const [activeTab, setActiveTab] = useState('lms')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const currentPlatform = PLATFORMS.find(p => p.id === activeTab) || PLATFORMS[0]

  // Status kampanye promo (Fase 2) — fetch client-side saat mount agar badge
  // reflek toggle owner tanpa redeploy (halaman ini static export).
  const [campaign, setCampaign] = useState<CampaignStatus | null>(null)
  useEffect(() => {
    let alive = true
    fetch(`${SUPERADMIN_URL}/api/public/campaign`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (alive && d && typeof d.active === 'boolean') setCampaign(d) })
      .catch(() => { /* badge cukup tak muncul bila gagal */ })
    return () => { alive = false }
  }, [])

  // Deep-link: /pricing?platform=lms langsung membuka tab portal terkait (mis. dari
  // kartu combo "Website + Portal" di landing). Baca sekali saat mount — halaman ini
  // static export, jadi ambil dari window.location (bukan useSearchParams/Suspense).
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('platform')
    if (wanted && PLATFORMS.some(p => p.id === wanted)) setActiveTab(wanted)
  }, [])

  // Mobile: pemilih portal jadi bottom-sheet (hemat ruang & scalable saat portal bertambah).
  // Escape + scroll-lock body selama sheet terbuka — pola sama dgn DemoPickerModal.
  const [sheetOpen, setSheetOpen] = useState(false)
  useEffect(() => {
    if (!sheetOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSheetOpen(false) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [sheetOpen])

  // Mobile: kartu jadi carousel snap-scroll. Lacak kartu aktif untuk dot indikator,
  // dan reset ke kartu pertama saat ganti tab/platform.
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  function onCardsScroll() {
    const el = cardsRef.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    const step = first.offsetWidth + 16 // lebar kartu + gap-4
    setActiveCard(Math.round(el.scrollLeft / step))
  }
  useEffect(() => {
    cardsRef.current?.scrollTo({ left: 0 })
    setActiveCard(0)
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-24 md:pt-32 px-4">
        {/* Breadcrumb / Back Button */}
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-white border border-black/5 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
              <ArrowRight size={14} className="rotate-180" />
            </div>
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-[11px] font-bold px-4 py-1.5 rounded-full mb-5 border border-green-100">
            <Check size={13} strokeWidth={3} /> Coba 14 hari gratis — tanpa kartu kredit
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight sf-display-heavy">
            Sistem Portal Bisnis — <span className="text-blue-600">Satu Sistem</span> untuk Setiap Industri
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Pilih portal sesuai bisnis kamu. Tanpa setup fee, tanpa kontrak minimum, tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Platform Switcher */}
        <div className="text-center mb-5">
          <p className="text-sm font-bold text-gray-400">Bisnis saya bergerak di bidang:</p>
        </div>
        {/* Desktop: grid penuh. Mobile: dirampingkan jadi tombol + bottom-sheet di bawah. */}
        <div role="tablist" aria-label="Pilih platform" className="hidden md:flex md:flex-wrap md:justify-center gap-2 mb-4">
          {PLATFORMS.map(p => {
            const isActive = activeTab === p.id
            return (
            <button
              key={p.id}
              id={`tab-${p.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${p.id}`}
              onClick={() => setActiveTab(p.id)}
              className={`flex flex-col items-start justify-center text-left h-full min-h-[64px] px-4 py-3 rounded-2xl border font-bold text-sm transition-all md:basis-[calc(33.333%-6px)] lg:basis-[calc(20%-6px)] md:grow-0 md:shrink-0 ${
                isActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-200'
                : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <p.icon size={16} className="shrink-0" /> {p.name}
              </div>
              <span className={`text-xs mt-0.5 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>{p.subtitle}</span>
            </button>
            )
          })}
        </div>

        {/* Mobile: tombol trigger menampilkan portal terpilih → buka bottom-sheet */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          className="md:hidden w-full flex items-center gap-3 text-left px-4 py-3.5 mb-4 rounded-2xl border border-gray-200 bg-white shadow-sm font-bold text-sm active:scale-[0.98] transition-transform"
        >
          <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <currentPlatform.icon size={18} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-gray-900 truncate">{currentPlatform.name}</span>
            <span className="block text-xs font-medium text-gray-500 truncate">{currentPlatform.subtitle}</span>
          </span>
          <ChevronDown size={18} className={`shrink-0 text-gray-400 transition-transform duration-300 ${sheetOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Bottom-sheet pemilih portal (mobile only) */}
        {sheetOpen && (
          <div className="md:hidden fixed inset-0 z-[100]">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
              onClick={() => setSheetOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Pilih platform"
              className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[80vh] flex flex-col pb-[env(safe-area-inset-bottom)]"
            >
              <div className="pt-3 flex justify-center shrink-0">
                <span className="h-1.5 w-10 rounded-full bg-gray-200" />
              </div>
              <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
                <p className="text-sm font-black text-gray-900">Pilih portal</p>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Tutup"
                  className="w-9 h-9 -mr-1 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto px-3 pb-4 space-y-1.5">
                {PLATFORMS.map(p => {
                  const isActive = activeTab === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => { setActiveTab(p.id); setSheetOpen(false) }}
                      className={`w-full flex items-center gap-3 text-left px-3 py-3 rounded-2xl border transition-colors ${
                        isActive ? 'bg-blue-50 border-blue-200' : 'bg-white border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <p.icon size={18} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className={`block text-sm font-bold truncate ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>{p.name}</span>
                        <span className="block text-xs font-medium text-gray-500 truncate">{p.subtitle}</span>
                      </span>
                      {isActive && <Check size={18} className="shrink-0 text-blue-600" strokeWidth={3} />}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
        <div className="text-center mb-12">
          <a
            href="https://wa.me/6281296917963?text=Halo%20Webzoka%2C%20saya%20tidak%20yakin%20platform%20mana%20yang%20cocok%20untuk%20bisnis%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0071E3] font-bold hover:underline"
          >
            Tidak yakin pilih yang mana? Chat tim kami →
          </a>
        </div>

        {/* Demo link — once per platform */}
        {currentPlatform.demoUrl && (
          <div className="text-center mb-8">
            <Link
              href={currentPlatform.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-blue-100 bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all group/demo"
            >
              Lihat demo {currentPlatform.name}
              <ExternalLink size={14} className="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        )}

        {/* Toggle Bulanan / Tahunan */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingPeriod('monthly')}
              aria-pressed={billingPeriod === 'monthly'}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                billingPeriod === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bulanan
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod('yearly')}
              aria-pressed={billingPeriod === 'yearly'}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all inline-flex items-center gap-1.5 ${
                billingPeriod === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tahunan
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                billingPeriod === 'yearly' ? 'bg-white/20 text-white' : 'bg-green-50 text-green-700'
              }`}>
                2 bln gratis
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          onScroll={onCardsScroll}
          role="tabpanel"
          id={`tabpanel-${currentPlatform.id}`}
          aria-labelledby={`tab-${currentPlatform.id}`}
          className={`flex md:grid grid-cols-1 snap-x snap-mandatory overflow-x-auto md:overflow-visible scroll-px-4 gap-4 md:gap-6 lg:gap-8 -mx-4 px-4 md:mx-0 md:px-0 pt-5 md:pt-0 pb-2 md:pb-0 mb-4 md:mb-20 items-stretch [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            currentPlatform.plans.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
          }`}>
          {currentPlatform.plans.map((plan, idx) => {
            // Tab Stock pakai harga statis (Rp) — bypass resolvePrice/priceMap Core.
            const isStock = currentPlatform.id === 'stock'
            // Fallback tahunan = priceYearly bila ada, else bulanan × 10 (2 bln gratis).
            const yearlyFallback = plan.priceYearly ?? plan.price * 10
            const monthlyPrice = isStock ? plan.price : resolvePrice(currentPlatform.id, plan.tier, plan.price, 'monthly', priceMap)
            const yearlyPrice = isStock ? yearlyFallback : resolvePrice(currentPlatform.id, plan.tier, yearlyFallback, 'yearly', priceMap)
            // Kartu Trial selalu gratis (jangan kena map resolvePrice → harga live).
            const price = plan.isTrial ? 0 : (billingPeriod === 'yearly' ? yearlyPrice : monthlyPrice)
            // Hanya Trial yang gratis → alur trial/register. Starter kini BERBAYAR.
            const isFreeCta = plan.isTrial === true
            // Tier tampilan → tier Core (enum), seragam semua portal:
            // Starter→starter, Growth→pro, Pro→enterprise.
            const coreTier = coreTierOf(plan.tier)
            // Portal dgn alur checkout self-service yang sudah jadi (LMS + Stock + Klinik + Farmasi + Rental + Laundry).
            // Rental: register→provision Core→direct-pay Snap→sync (UAT E2E PASS 2026-07-02, platform 'rental').
            // Laundry: register→provision Core (platform 'laundry')→billing→Snap→sync (wired 2026-07-05).
            const subscribeReady =
              currentPlatform.id === 'lms' ||
              currentPlatform.id === 'clinic' ||
              currentPlatform.id === 'pharmacy' ||
              currentPlatform.id === 'rental' ||
              currentPlatform.id === 'laundry' ||
              isStock
            const chatHref = `https://wa.me/6281296917963?text=${encodeURIComponent(`Halo Webzoka, saya ingin berlangganan ${currentPlatform.name} paket ${plan.tier} (${billingPeriod === 'yearly' ? 'tahunan' : 'bulanan'}).`)}`
            const ctaHref = isFreeCta
              ? currentPlatform.registerUrl
              : subscribeReady
                ? `${currentPlatform.registerUrl}?intent=subscribe&tier=${coreTier}&period=${billingPeriod}`
                : chatHref
            const ctaLabel = plan.cta ?? (isFreeCta
              ? 'Mulai trial 14 hari — gratis'
              : subscribeReady
                ? 'Mulai berlangganan'
                : 'Chat untuk berlangganan')
            return (
            <div
              key={plan.tier}
              className={`relative bg-white rounded-3xl p-5 md:p-6 border-2 transition-all flex flex-col snap-start shrink-0 w-[80%] sm:w-[56%] md:w-auto ${
                plan.popular ? 'border-blue-600 shadow-2xl shadow-blue-100 ring-4 ring-blue-50' : 'border-black/[0.03] shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} /> Paling Populer
                </div>
              )}
              <div className="mb-5 md:mb-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">{plan.tier}</p>
                {plan.desc && (
                  <p className="text-sm text-gray-500 font-medium mb-3 leading-snug text-pretty">{plan.desc}</p>
                )}
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className="text-2xl md:text-3xl font-black text-gray-900 sf-display-heavy tabular-nums whitespace-nowrap">
                    {price === 0 ? 'Gratis' : `Rp ${price.toLocaleString('id-ID')}`}
                  </span>
                  {price !== 0 && (
                    <span className="text-gray-400 text-sm font-medium">/{billingPeriod === 'yearly' ? 'tahun' : 'bulan'}</span>
                  )}
                </div>
                {billingPeriod === 'yearly' && price !== 0 && (
                  <p className="mt-1.5 text-xs font-bold text-green-600">
                    ≈ Rp {Math.round(price / 12).toLocaleString('id-ID')}/bln · hemat 2 bulan
                  </p>
                )}
                {plan.promo && (
                  <div className="mt-3 inline-flex items-center rounded-lg bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 border border-blue-100">
                    {plan.promo}
                  </div>
                )}
                {/* Badge promo kampanye — hanya tier yg dikampanyekan (Pro), Bulanan,
                    saat kampanye aktif. Diskon nyata diterapkan di checkout. */}
                {campaign?.active && billingPeriod === 'monthly' && coreTier === campaign.tier && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 border border-green-100">
                    <Sparkles size={12} /> Hemat {campaign.discountPct}% — {campaign.months} bulan pertama
                  </div>
                )}
              </div>

              <div className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 flex-1">
                {plan.feat.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href={ctaHref}
                  className={`w-full py-3.5 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.96] text-sm ${
                    plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                    : isFreeCta
                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {ctaLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            )
          })}
        </div>

        {/* Dot indikator + hint geser — mobile only */}
        <div className="md:hidden flex flex-col items-center gap-2 mb-10 -mt-1">
          <div className="flex items-center gap-1.5">
            {currentPlatform.plans.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeCard ? 'w-5 bg-blue-600' : 'w-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-[11px] font-medium text-gray-400">Geser untuk lihat paket lain →</p>
        </div>

        {/* Contextual notes per platform */}
        <div className="mb-12 space-y-2 text-center">
          {activeTab === 'lms' && (
            <p className="inline-flex items-start justify-center gap-2 text-sm text-gray-500">
              <FolderOpen size={15} className="mt-0.5 shrink-0 text-gray-500" />
              <span><span className="font-semibold text-gray-700">Format konten yang didukung:</span> Video, PDF, Quiz, Tugas, Live Zoom — semua bisa diupload dari dashboard.</span>
            </p>
          )}
          {activeTab === 'clinic' && (
            <p className="text-xs text-gray-500">
              ¹ SATUSEHAT = sistem rekam medis resmi Kementerian Kesehatan RI, wajib bagi klinik yang terdaftar di Kemkes.
            </p>
          )}
          {activeTab === 'stock' && (
            <p className="inline-flex items-start justify-center gap-2 text-sm text-gray-500">
              <Package size={15} className="mt-0.5 shrink-0 text-gray-500" />
              <span><span className="font-semibold text-gray-700">Trial 14 hari = akses penuh fitur Pro.</span> Setelah trial, pilih Starter, Growth, atau Pro. Cocok untuk warung & produksi: pesanan dari website langsung masuk ke stok, lengkap lacak lot kadaluarsa (FEFO) dan resep produksi.</span>
            </p>
          )}
          {activeTab === 'laundry' && (
            <p className="inline-flex items-start justify-center gap-2 text-sm text-gray-500">
              <WashingMachine size={15} className="mt-0.5 shrink-0 text-gray-500" />
              <span><span className="font-semibold text-gray-700">Trial 14 hari = akses penuh fitur Pro.</span> Coba dulu dari Demo atau langsung mulai trial; setelah trial, pilih Starter, Growth, atau Pro dan bayar aman via Midtrans.</span>
            </p>
          )}
          <p className="inline-flex items-start justify-center gap-2 text-sm text-gray-500">
            <Lightbulb size={15} className="mt-0.5 shrink-0 text-gray-500" />
            <span><span className="font-medium text-gray-700">Harga berlaku untuk 1 akun bisnis.</span>{' '}
            Punya lebih dari 1 cabang?{' '}
            <a
              href="https://wa.me/6281296917963?text=Saya%20ingin%20tanya%20soal%20paket%20multi-cabang%20Webzoka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071E3] font-bold hover:underline"
            >
              Tanyakan paket bundle →
            </a>
            </span>
          </p>
        </div>

        {/* Feature comparison table — data-driven, hanya untuk portal yg punya featureMatrix
            (gating tier-nya sudah ditegakkan app; saat ini Stock). */}
        {currentPlatform.featureMatrix && (
          <div className="mb-16 md:mb-20">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight sf-display-heavy text-balance">
                Fitur lengkap tiap paket
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-medium max-w-md mx-auto mt-3 text-pretty">
                Semua paket berjalan di portal yang sama — kamu hanya membuka modul sesuai kebutuhan.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-black/[0.04] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px]">
                  <thead>
                    <tr className="border-b border-black/5 bg-gray-50/70">
                      <th scope="col" className="px-5 md:px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-gray-500 w-1/2">Modul / Fitur</th>
                      {currentPlatform.featureMatrix.cols.map((c) => {
                        const popular = currentPlatform.plans.find(p => p.tier === c)?.popular
                        return (
                          <th key={c} scope="col" className={`px-4 py-4 text-center text-xs font-black uppercase tracking-widest ${popular ? 'text-blue-600' : 'text-gray-600'}`}>{c}</th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {currentPlatform.featureMatrix.rows.map((row) => (
                      <tr key={row.label} className="hover:bg-gray-50/50 transition-colors">
                        <th scope="row" className="px-5 md:px-6 py-3.5 text-left text-sm font-bold text-gray-600">{row.label}</th>
                        {row.tiers.map((v, i) => (
                          <td key={i} className="px-4 py-3.5 text-center">
                            {typeof v === 'boolean' ? (
                              v ? (
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 border border-blue-100 mx-auto" aria-label="termasuk">
                                  <Check className="h-3 w-3 text-blue-600" strokeWidth={3} />
                                </span>
                              ) : (
                                <span className="text-gray-300 font-bold" aria-label="tidak termasuk">—</span>
                              )
                            ) : (
                              <span className="text-sm font-black text-gray-700 tabular-nums">{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {currentPlatform.featureMatrix.note && (
                <div className="px-5 md:px-6 py-4 border-t border-black/5 text-center">
                  <p className="text-xs text-gray-500 font-medium text-pretty">{currentPlatform.featureMatrix.note}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="py-14 md:py-20 border-t border-black/5">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">FAQ</p>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight sf-display-heavy text-balance">
              Pertanyaan Sebelum Berlangganan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
            {[
              {
                q: 'Apa yang terjadi setelah trial 14 hari habis?',
                a: 'Untuk melanjutkan, pilih salah satu paket berbayar (Starter, Growth, atau Pro). Selama trial tidak ada charge otomatis dan tidak ada kartu kredit yang ditagih — kamu yang menentukan kapan mulai berlangganan.',
              },
              {
                q: 'Apakah bisa upgrade atau downgrade paket?',
                a: 'Ya, kapan saja. Tidak ada penalti, tidak ada kontrak minimum. Cukup chat tim kami dan paket diubah di hari yang sama.',
              },
              {
                q: 'Bagaimana cara pembayaran langganan?',
                a: 'Transfer bank, QRIS, kartu kredit, atau minimarket (Alfamart/Indomaret) via Midtrans. Konfirmasi pembayaran otomatis masuk via WA.',
              },
              {
                q: 'Apakah data saya aman kalau berhenti berlangganan?',
                a: 'Data kamu tetap tersimpan 30 hari setelah berhenti. Kami beri waktu untuk export sebelum data dihapus permanen.',
              },
              {
                q: 'Apakah portal ini bisa dipakai bersamaan dengan website builder?',
                a: 'Ya. Keduanya terpisah tapi terintegrasi. Website untuk tampilan online, portal untuk operasional bisnis dari dalam.',
              },
              {
                q: 'Apakah ada biaya setup per fitur?',
                a: 'Tidak. Semua fitur dalam paket langsung aktif tanpa biaya setup tambahan. Yang ada hanya biaya langganan bulanan yang tercantum.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-[#F5F5F7] rounded-2xl px-5 py-4 md:px-6 md:py-5 border border-black/[0.03] [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-[15px] md:text-base font-bold text-gray-900">
                  <span className="text-pretty">{faq.q}</span>
                  <ChevronDown size={18} className="shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 font-medium">
              Pertanyaan lain?{' '}
              <a
                href="https://wa.me/6281296917963?text=Halo%20Webzoka%2C%20saya%20punya%20pertanyaan%20soal%20langganan."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071E3] font-bold hover:underline"
              >
                Chat tim kami
              </a>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
           {[
             { t: 'Tanpa Biaya Setup', d: 'Langsung pakai hari ini — tidak ada biaya awal, tidak ada instalasi. Sistem aktif begitu kamu daftar.' },
             { t: 'Update Otomatis', d: 'Sistem selalu ter-update — fitur baru dan patch keamanan masuk sendiri. kamu tidak perlu urus apapun.' },
             { t: 'Data Tidak Bisa Diintip', d: 'Setiap bisnis punya ruang data sendiri yang terisolasi. Enkripsi aktif dari hari pertama, backup harian.' },
           ].map(item => (
             <div key={item.t} className="group">
               <h4 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-widest border-l-4 border-blue-600 pl-4">{item.t}</h4>
               <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}
