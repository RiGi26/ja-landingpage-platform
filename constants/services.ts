export interface Addon {
  id: string;
  name: string;
  price: number;
  category: 'general' | 'lms' | 'ecommerce' | 'travel' | 'medical';
  isPortalFeature?: boolean;
  portalName?: string;
  portalLink?: string;
  disclaimer?: string;
}

export interface HostingPackage {
  id: string;
  name: string;
  storage: string;
  visitor: string;
  price: number;
  maintain: number;
  description: string;
}

export interface Bundle {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  addonIds: string[];
  hostingId: string;
  normalPrice: number;
  bundlePrice: number;
}

export const HOSTING_PACKAGES: HostingPackage[] = [
  { id: 'basic',      name: 'Basic',      storage: '5GB',    visitor: '±500/bulan',        price: 600000,   maintain: 370000,  description: 'Cocok untuk landing page atau profil bisnis sederhana dengan puluhan foto.' },
  { id: 'starter',    name: 'Starter',    storage: '20GB',   visitor: '±3.000/bulan',       price: 1200000,  maintain: 750000,  description: 'Pas untuk toko online, klinik, atau bisnis yang rutin upload konten.' },
  { id: 'growth',     name: 'Growth',     storage: '50GB',   visitor: '±15.000/bulan',      price: 2500000,  maintain: 1550000, description: 'Performa ekstra untuk traffic ramai & banyak transaksi setiap harinya.' },
  { id: 'business',   name: 'Business',   storage: '100GB',  visitor: '±50.000/bulan',      price: 5000000,  maintain: 3100000, description: 'Skala medium-enterprise dengan kebutuhan storage media yang masif.' },
  { id: 'enterprise', name: 'Enterprise', storage: '250GB+', visitor: 'High Performance',   price: 10000000, maintain: 6200000, description: 'Dedicated resources untuk aplikasi skala besar dengan ribuan user aktif.' },
];

export const ADDON_GROUPS: Record<string, { title: string; items: Addon[] }> = {
  general: {
    title: 'General Add-on',
    items: [
      { id: 'admin-dash',   name: 'Dashboard Admin',           price: 250000, category: 'general' },
      { id: 'midtrans',     name: 'Midtrans Payment Gateway',  price: 400000, category: 'general' },
      { id: 'wa-auto',      name: 'WhatsApp Automation',       price: 300000, category: 'general' },
      { id: 'g-sheets',     name: 'Google Sheets Integration', price: 150000, category: 'general' },
      { id: 'invoice-auto', name: 'Invoice Automation',        price: 200000, category: 'general' },
      { id: 'seo',          name: 'SEO Technical Setup',       price: 150000, category: 'general' },
      { id: 'live-chat',    name: 'Live Chat',                 price: 100000, category: 'general' },
      { id: 'membership',   name: 'Membership System',         price: 500000, category: 'general' },
      { id: 'api',          name: 'API Integration',           price: 450000, category: 'general' },
      { id: 'email-auto',   name: 'Email Automation',          price: 200000, category: 'general' },
      { id: 'crm',          name: 'CRM Customer',              price: 600000, category: 'general' },
    ]
  },
  lms: {
    title: 'LMS / Pendidikan',
    items: [
      { id: 'ppdb',         name: 'PPDB Online',             price: 300000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'portal-siswa', name: 'Portal Siswa',            price: 300000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'cbt',          name: 'CBT Online',              price: 450000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'bank-soal',    name: 'Bank Soal',               price: 350000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'flashcard',    name: 'Flashcard Interaktif',    price: 250000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'tracking',     name: 'Tracking Progress Siswa', price: 400000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'jlpt',         name: 'Tryout JLPT',             price: 350000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'zoom',         name: 'Kelas Live Zoom',         price: 150000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'absensi',      name: 'Absensi Online',          price: 200000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'cert',         name: 'Sertifikat Otomatis',     price: 200000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
    ]
  },
  ecommerce: {
    title: 'E-Commerce / Online Shop',
    items: [
      { id: 'cart',       name: 'Keranjang Belanja',   price: 250000, category: 'ecommerce' },
      { id: 'checkout',   name: 'Checkout System',     price: 200000, category: 'ecommerce' },
      { id: 'track-pack', name: 'Tracking Paket',      price: 250000, category: 'ecommerce' },
      { id: 'wishlist',   name: 'Wishlist Produk',     price: 150000, category: 'ecommerce' },
      { id: 'review',     name: 'Review Produk',       price: 200000, category: 'ecommerce' },
      { id: 'voucher',    name: 'Voucher & Promo',     price: 150000, category: 'ecommerce' },
      { id: 'affiliate',  name: 'Affiliate System',    price: 750000, category: 'ecommerce' },
      {
        id: 'vendor',
        name: 'Multi-Seller Portal Basic',
        price: 2000000,
        category: 'ecommerce',
        disclaimer: 'Fitur multi-seller dasar: manajemen produk per seller, dashboard sederhana, dan laporan penjualan. Bukan platform marketplace penuh seperti Tokopedia/Shopee.'
      },
      { id: 'stock', name: 'Manajemen Stok', price: 450000, category: 'ecommerce' },
    ]
  },
  travel: {
    title: 'Travel & Rental',
    items: [
      { id: 'booking',       name: 'Booking Online',   price: 300000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'e-ticket',      name: 'E-Ticketing',      price: 400000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      {
        id: 'gps',
        name: 'Tracking Armada GPS',
        price: 550000,
        category: 'travel',
        isPortalFeature: true,
        portalName: 'Travel & Rental Platform',
        portalLink: '/pricing',
        disclaimer: 'Termasuk setup integrasi GPS. Biaya data GPS per armada ditagih terpisah sesuai provider GPS pilihan Anda (mulai Rp 50.000/unit/bulan).'
      },
      { id: 'driver-sched',   name: 'Jadwal Driver',   price: 250000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'seat',           name: 'Seat Management', price: 250000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'invoice-travel', name: 'Invoice Travel',  price: 200000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
    ]
  },
  medical: {
    title: 'Klinik / Medis',
    items: [
      {
        id: 'med-record',
        name: 'Rekam Medis Digital',
        price: 550000,
        category: 'medical',
        isPortalFeature: true,
        portalName: 'Portal Klinik',
        portalLink: '/pricing'
      },
      { id: 'queue',      name: 'Antrian Pasien Online',   price: 300000, category: 'medical', isPortalFeature: true, portalName: 'Portal Klinik', portalLink: '/pricing' },
      { id: 'doc-sched',  name: 'Jadwal Dokter',           price: 250000, category: 'medical', isPortalFeature: true, portalName: 'Portal Klinik', portalLink: '/pricing' },
      { id: 'clinic-res', name: 'Reservasi Online Klinik', price: 250000, category: 'medical', isPortalFeature: true, portalName: 'Portal Klinik', portalLink: '/pricing' },
    ]
  }
};

export const BUNDLES: Bundle[] = [
  {
    id: 'starter-bisnis',
    emoji: '🚀',
    name: 'Starter Bisnis',
    desc: 'Paket populer untuk UMKM yang baru go-digital. Sudah termasuk WA otomatis dan invoice digital.',
    hostingId: 'basic',
    addonIds: ['admin-dash', 'wa-auto', 'invoice-auto'],
    normalPrice: 1350000,
    bundlePrice: 999000,
  },
  {
    id: 'corporate-pro',
    emoji: '🏢',
    name: 'Corporate Pro',
    desc: 'Website perusahaan profesional dengan fitur SEO, sistem blog berita, dan Live Chat terintegrasi.',
    hostingId: 'starter',
    addonIds: ['seo', 'blog', 'admin-dash', 'live-chat'],
    normalPrice: 1650000,
    bundlePrice: 1299000,
  },
  {
    id: 'toko-online',
    emoji: '🛒',
    name: 'Toko Online Basic',
    desc: 'Semua yang dibutuhkan untuk berjualan online: keranjang, checkout, manajemen stok, dan voucher promo.',
    hostingId: 'starter',
    addonIds: ['cart', 'checkout', 'stock', 'voucher'],
    normalPrice: 1750000,
    bundlePrice: 1399000,
  }
];
