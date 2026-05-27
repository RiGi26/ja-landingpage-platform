export interface Addon {
  id: string;
  name: string;
  price: number;
  category: 'general' | 'lms' | 'ecommerce' | 'travel' | 'medical';
  isPortalFeature?: boolean;
  portalName?: string;
  portalLink?: string;
}

export interface HostingPackage {
  id: string;
  name: string;
  storage: string;
  visitor: string;
  price: number;
  maintain: number;
}

export const HOSTING_PACKAGES: HostingPackage[] = [
  { id: 'basic', name: 'Basic', storage: '5GB', visitor: '±500/bulan', price: 600000, maintain: 600000 },
  { id: 'starter', name: 'Starter', storage: '20GB', visitor: '±3.000/bulan', price: 1200000, maintain: 1200000 },
  { id: 'growth', name: 'Growth', storage: '50GB', visitor: '±15.000/bulan', price: 2500000, maintain: 2500000 },
  { id: 'business', name: 'Business', storage: '100GB', visitor: '±50.000/bulan', price: 5000000, maintain: 5000000 },
  { id: 'enterprise', name: 'Enterprise', storage: '250GB+', visitor: 'High Performance', price: 10000000, maintain: 10000000 },
];

export const ADDON_GROUPS: Record<string, { title: string; items: Addon[] }> = {
  general: {
    title: 'General Add-on',
    items: [
      { id: 'admin-dash', name: 'Dashboard Admin', price: 200000, category: 'general' },
      { id: 'midtrans', name: 'Midtrans Payment', price: 300000, category: 'general' },
      { id: 'wa-auto', name: 'WhatsApp Automation', price: 200000, category: 'general' },
      { id: 'g-sheets', name: 'Google Sheets Integration', price: 150000, category: 'general' },
      { id: 'invoice-auto', name: 'Invoice Automation', price: 200000, category: 'general' },
      { id: 'seo', name: 'SEO Optimization', price: 150000, category: 'general' },
      { id: 'live-chat', name: 'Live Chat', price: 100000, category: 'general' },
      { id: 'membership', name: 'Membership System', price: 250000, category: 'general' },
      { id: 'api', name: 'API Integration', price: 350000, category: 'general' },
      { id: 'email-auto', name: 'Email Automation', price: 200000, category: 'general' },
      { id: 'crm', name: 'CRM Customer', price: 350000, category: 'general' },
    ]
  },
  lms: {
    title: 'LMS / Pendidikan',
    items: [
      { id: 'ppdb', name: 'PPDB Online', price: 300000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'portal-siswa', name: 'Portal Siswa', price: 300000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'cbt', name: 'CBT Online', price: 350000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'bank-soal', name: 'Bank Soal', price: 250000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'flashcard', name: 'Flashcard Interaktif', price: 250000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'tracking', name: 'Tracking Progress Siswa', price: 300000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'jlpt', name: 'Tryout JLPT', price: 350000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'zoom', name: 'Kelas Live Zoom', price: 150000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'absensi', name: 'Absensi Online', price: 200000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
      { id: 'cert', name: 'Sertifikat Otomatis', price: 200000, category: 'lms', isPortalFeature: true, portalName: 'Portal LMS', portalLink: '/pricing' },
    ]
  },
  ecommerce: {
    title: 'E-Commerce / Online Shop',
    items: [
      { id: 'cart', name: 'Keranjang Belanja', price: 250000, category: 'ecommerce' },
      { id: 'checkout', name: 'Checkout System', price: 200000, category: 'ecommerce' },
      { id: 'track-pack', name: 'Tracking Paket', price: 250000, category: 'ecommerce' },
      { id: 'wishlist', name: 'Wishlist Produk', price: 150000, category: 'ecommerce' },
      { id: 'review', name: 'Review Produk', price: 200000, category: 'ecommerce' },
      { id: 'voucher', name: 'Voucher & Promo', price: 150000, category: 'ecommerce' },
      { id: 'affiliate', name: 'Affiliate System', price: 350000, category: 'ecommerce' },
      { id: 'vendor', name: 'Marketplace Multi Vendor', price: 500000, category: 'ecommerce' },
      { id: 'stock', name: 'Manajemen Stok', price: 300000, category: 'ecommerce' },
    ]
  },
  travel: {
    title: 'Travel & Rental',
    items: [
      { id: 'booking', name: 'Booking Online', price: 300000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'e-ticket', name: 'E-Ticketing', price: 250000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'gps', name: 'Tracking Armada GPS', price: 350000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'driver-sched', name: 'Jadwal Driver', price: 250000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'seat', name: 'Seat Management', price: 250000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
      { id: 'invoice-travel', name: 'Invoice Travel', price: 200000, category: 'travel', isPortalFeature: true, portalName: 'Travel & Rental Platform', portalLink: '/pricing' },
    ]
  },
  medical: {
    title: 'Klinik / Medis',
    items: [
      { id: 'med-record', name: 'Rekam Medis Digital', price: 400000, category: 'medical', isPortalFeature: true, portalName: 'Portal Klinik', portalLink: '/pricing' },
      { id: 'queue', name: 'Antrian Pasien Online', price: 300000, category: 'medical', isPortalFeature: true, portalName: 'Portal Klinik', portalLink: '/pricing' },
      { id: 'doc-sched', name: 'Jadwal Dokter', price: 250000, category: 'medical', isPortalFeature: true, portalName: 'Portal Klinik', portalLink: '/pricing' },
      { id: 'clinic-res', name: 'Reservasi Online Klinik', price: 250000, category: 'medical', isPortalFeature: true, portalName: 'Portal Klinik', portalLink: '/pricing' },
    ]
  }
};
