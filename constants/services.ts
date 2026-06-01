export interface Addon {
  id: string;
  name: string;
  description: string;
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
  { id: 'basic',      name: 'Basic',      storage: '5GB',    visitor: '±500/bulan',        price: 600000,   maintain: 450000,  description: 'Cocok untuk landing page atau profil bisnis sederhana dengan puluhan foto.' },
  { id: 'starter',    name: 'Starter',    storage: '20GB',   visitor: '±3.000/bulan',       price: 1200000,  maintain: 900000,  description: 'Pas untuk toko online, klinik, atau bisnis yang rutin upload konten.' },
  { id: 'growth',     name: 'Growth',     storage: '50GB',   visitor: '±15.000/bulan',      price: 2500000,  maintain: 1875000, description: 'Performa ekstra untuk traffic ramai & banyak transaksi setiap harinya.' },
  { id: 'business',   name: 'Business',   storage: '100GB',  visitor: '±50.000/bulan',      price: 5000000,  maintain: 3750000, description: 'Skala medium-enterprise dengan kebutuhan storage media yang masif.' },
  { id: 'enterprise', name: 'Enterprise', storage: '250GB+', visitor: 'High Performance',   price: 10000000, maintain: 7500000, description: 'Dedicated resources untuk aplikasi skala besar dengan ribuan user aktif.' },
];

export const ADDON_GROUPS: Record<string, { title: string; items: Addon[] }> = {
  general: {
    title: 'General Add-on',
    items: [
      {
        id: 'admin-dash',
        name: 'Dashboard Admin',
        description: 'Panel khusus untuk Anda kelola isi website sendiri — update foto, teks, harga, atau hapus konten tanpa perlu hubungi tim teknis.',
        price: 250000,
        category: 'general',
      },
      {
        id: 'midtrans',
        name: 'Midtrans Payment Gateway',
        description: 'Koneksi ke 30+ metode pembayaran (QRIS, transfer bank, e-wallet, kartu kredit) langsung di website. Customer bayar di tempat, dana masuk otomatis.',
        price: 400000,
        category: 'general',
      },
      {
        id: 'wa-auto',
        name: 'WhatsApp Automation',
        description: 'Pesan WA otomatis terkirim ke customer saat ada order baru, konfirmasi pembayaran, atau pengingat jadwal — tanpa ketik manual satu per satu.',
        price: 300000,
        category: 'general',
      },
      {
        id: 'g-sheets',
        name: 'Google Sheets Integration',
        description: 'Data dari website (order, pendaftaran, form kontak) otomatis tercatat ke Google Sheets yang bisa Anda akses kapan saja dari perangkat apapun.',
        price: 150000,
        category: 'general',
      },
      {
        id: 'invoice-auto',
        name: 'Invoice Automation',
        description: 'Nota/tagihan PDF digenerate dan dikirim otomatis ke email customer setiap ada transaksi — terlihat profesional dan hemat waktu admin.',
        price: 200000,
        category: 'general',
      },
      {
        id: 'seo',
        name: 'SEO Technical Setup',
        description: 'Optimasi teknis agar website mudah ditemukan di Google: meta title, sitemap, kecepatan halaman, dan schema data. Meningkatkan peluang muncul di hasil pencarian.',
        price: 150000,
        category: 'general',
      },
      {
        id: 'live-chat',
        name: 'Live Chat',
        description: 'Kotak chat muncul di sudut website sehingga pengunjung bisa langsung tanya-jawab real-time dengan tim Anda tanpa keluar dari halaman.',
        price: 100000,
        category: 'general',
      },
      {
        id: 'membership',
        name: 'Membership System',
        description: 'Customer bisa daftar akun, login, dan akses konten atau harga eksklusif yang tidak tersedia untuk pengunjung biasa. Cocok untuk komunitas atau program loyalitas.',
        price: 500000,
        category: 'general',
      },
      {
        id: 'api',
        name: 'API Integration',
        description: 'Koneksi website ke sistem eksternal yang sudah Anda pakai (ERP, aplikasi kasir, platform logistik, dll) agar data tidak perlu diinput dua kali.',
        price: 450000,
        category: 'general',
        disclaimer: 'Harga estimasi untuk 1 integrasi standar. Setiap sistem eksternal berbeda kompleksitasnya — tim kami akan konfirmasi scope & biaya final setelah konsultasi teknis.',
      },
      {
        id: 'email-auto',
        name: 'Email Automation',
        description: 'Email otomatis terkirim berdasarkan aksi customer: selamat datang saat daftar, pengingat cart yang ditinggal, newsletter berkala, atau follow-up setelah pembelian.',
        price: 200000,
        category: 'general',
      },
      {
        id: 'crm',
        name: 'CRM Customer',
        description: 'Database terpusat semua data pelanggan (nama, kontak, riwayat transaksi, catatan) dengan fitur follow-up dan segmentasi — agar tidak ada prospek yang terlewat.',
        price: 600000,
        category: 'general',
      },
      {
        id: 'blog',
        name: 'Blog / Halaman Berita',
        description: 'Halaman artikel yang bisa Anda kelola sendiri — tulis berita, promo, atau konten edukasi langsung dari dashboard admin. Mendukung gambar, kategori, dan tanggal publish.',
        price: 200000,
        category: 'general',
      },
    ]
  },
  lms: {
    title: 'LMS / Pendidikan',
    items: [
      {
        id: 'ppdb',
        name: 'PPDB Online',
        description: 'Penerimaan peserta didik baru secara digital — calon siswa daftar online, upload berkas, dan pantau status pendaftaran tanpa harus datang langsung.',
        price: 300000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'portal-siswa',
        name: 'Portal Siswa',
        description: 'Halaman login khusus siswa untuk akses jadwal, nilai, materi belajar, dan pengumuman dari sekolah atau lembaga kursus kapan saja.',
        price: 300000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'cbt',
        name: 'CBT Online',
        description: 'Ujian berbasis komputer langsung di browser — soal tampil online, siswa jawab, dan nilai dihitung otomatis seketika tanpa kertas dan tanpa input manual.',
        price: 450000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'bank-soal',
        name: 'Bank Soal',
        description: 'Repositori soal yang dikelompokkan per mata pelajaran, tingkat kesulitan, dan topik. Soal bisa diacak otomatis setiap kali ujian baru dibuat.',
        price: 350000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'flashcard',
        name: 'Flashcard Interaktif',
        description: 'Alat belajar flip-card digital untuk hafalan vocab, kanji, atau materi ringkas — bisa dimainkan kapan saja dari HP tanpa install aplikasi.',
        price: 250000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'tracking',
        name: 'Tracking Progress Siswa',
        description: 'Laporan perkembangan belajar tiap siswa (nilai, kehadiran, materi selesai) yang bisa dipantau oleh siswa, guru, maupun orang tua secara real-time.',
        price: 400000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'jlpt',
        name: 'Tryout JLPT',
        description: 'Paket soal latihan JLPT (N5–N1) dengan timer dan pembahasan otomatis, dirancang khusus untuk lembaga kursus bahasa Jepang.',
        price: 350000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'zoom',
        name: 'Kelas Live Zoom',
        description: 'Tombol "Masuk Kelas" di portal siswa terhubung langsung ke link Zoom terjadwal — siswa tidak perlu cari link sendiri setiap pertemuan.',
        price: 150000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'absensi',
        name: 'Absensi Online',
        description: 'Siswa check-in lewat website atau HP, rekap kehadiran otomatis tersimpan dan bisa diekspor ke Excel — tidak ada lagi absensi kertas yang hilang.',
        price: 200000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
      {
        id: 'cert',
        name: 'Sertifikat Otomatis',
        description: 'Sertifikat kelulusan atau penyelesaian kursus digenerate PDF otomatis dengan nama siswa — langsung bisa diunduh atau dikirim ke email tanpa desain manual.',
        price: 200000,
        category: 'lms',
        isPortalFeature: true,
        portalName: 'Portal LMS',
        portalLink: '/pricing',
      },
    ]
  },
  ecommerce: {
    title: 'E-Commerce / Online Shop',
    items: [
      {
        id: 'cart',
        name: 'Keranjang Belanja',
        description: 'Customer bisa pilih beberapa produk sekaligus, atur jumlah, lalu lanjut checkout dalam satu sesi — pengalaman belanja seperti di marketplace besar.',
        price: 250000,
        category: 'ecommerce',
      },
      {
        id: 'checkout',
        name: 'Checkout System',
        description: 'Halaman checkout lengkap di website Anda sendiri: isi alamat, pilih ekspedisi, hitung ongkir otomatis, dan konfirmasi order sebelum bayar.',
        price: 200000,
        category: 'ecommerce',
      },
      {
        id: 'track-pack',
        name: 'Tracking Paket',
        description: 'Customer cek status pengiriman paket mereka langsung di website pakai nomor resi — mengurangi pertanyaan "paket saya sudah sampai mana?" ke WA Anda.',
        price: 250000,
        category: 'ecommerce',
      },
      {
        id: 'wishlist',
        name: 'Wishlist Produk',
        description: 'Tombol "Simpan ke Wishlist" di setiap produk agar customer bisa tandai barang favorit dan kembali beli nanti — meningkatkan kemungkinan repeat purchase.',
        price: 150000,
        category: 'ecommerce',
      },
      {
        id: 'review',
        name: 'Review Produk',
        description: 'Kolom ulasan dan rating bintang di setiap produk dari pembeli yang sudah bertransaksi — membangun kepercayaan calon pembeli baru secara organik.',
        price: 200000,
        category: 'ecommerce',
      },
      {
        id: 'voucher',
        name: 'Voucher & Promo',
        description: 'Sistem kode promo yang bisa Anda buat sendiri: diskon persentase, potongan nominal, minimum pembelian, atau batas penggunaan — untuk kampanye promosi kapan saja.',
        price: 150000,
        category: 'ecommerce',
      },
      {
        id: 'affiliate',
        name: 'Affiliate System',
        description: 'Mitra atau influencer punya link unik masing-masing; setiap penjualan dari link itu tercatat otomatis dan komisi dihitung di dashboard tanpa rekap manual.',
        price: 1100000,
        category: 'ecommerce',
        disclaimer: 'Mencakup: unique referral link per mitra, tracking konversi, dan laporan komisi di dashboard. Tidak termasuk auto-payout — pembayaran komisi dilakukan manual oleh admin.',
      },
      {
        id: 'vendor',
        name: 'Multi-Seller Portal Basic',
        description: 'Beberapa penjual bisa daftarkan produk di website Anda; tiap seller punya dashboard sendiri untuk kelola produk dan lihat laporan penjualan mereka.',
        price: 2000000,
        category: 'ecommerce',
        disclaimer: 'Fitur multi-seller dasar: manajemen produk per seller, dashboard sederhana, dan laporan penjualan. Bukan platform marketplace penuh seperti Tokopedia/Shopee.',
      },
      {
        id: 'stock',
        name: 'Manajemen Stok',
        description: 'Stok berkurang otomatis setiap ada order, muncul notifikasi saat stok menipis, dan produk otomatis nonaktif saat habis — tidak perlu update stok manual.',
        price: 450000,
        category: 'ecommerce',
      },
    ]
  },
  travel: {
    title: 'JapanArena Go (Travel)',
    items: [
      {
        id: 'booking',
        name: 'Booking Online',
        description: 'Form pemesanan perjalanan atau armada lengkap dengan pilihan tanggal, rute, dan jumlah penumpang — customer booking 24 jam tanpa perlu chat dulu.',
        price: 300000,
        category: 'travel',
        isPortalFeature: true,
        portalName: 'JapanArena Go',
        portalLink: '/pricing',
      },
      {
        id: 'e-ticket',
        name: 'E-Ticketing',
        description: 'Tiket digital dengan QR code dikirim otomatis ke email atau WA customer setelah booking terkonfirmasi — bukti perjalanan rapi yang mudah ditunjukkan.',
        price: 400000,
        category: 'travel',
        isPortalFeature: true,
        portalName: 'JapanArena Go',
        portalLink: '/pricing',
      },
      {
        id: 'gps',
        name: 'Tracking Armada GPS',
        description: 'Posisi kendaraan ditampilkan real-time di peta, bisa dipantau tim operasional maupun dibagikan ke penumpang yang sedang menunggu kedatangan armada.',
        price: 550000,
        category: 'travel',
        isPortalFeature: true,
        portalName: 'JapanArena Go',
        portalLink: '/pricing',
        disclaimer: 'Termasuk setup integrasi GPS. Biaya data GPS per armada ditagih terpisah sesuai provider GPS pilihan Anda (mulai Rp 50.000/unit/bulan).',
      },
      {
        id: 'driver-sched',
        name: 'Jadwal Driver',
        description: 'Sistem penjadwalan internal: siapa driver yang bertugas di armada mana, pada hari dan jam berapa — menghindari bentrok jadwal dan memudahkan koordinasi.',
        price: 250000,
        category: 'travel',
        isPortalFeature: true,
        portalName: 'JapanArena Go',
        portalLink: '/pricing',
      },
      {
        id: 'seat',
        name: 'Seat Management',
        description: 'Denah kursi visual per kendaraan; customer pilih nomor kursi saat booking dan kursi yang sudah terpesan otomatis terkunci agar tidak dobel.',
        price: 250000,
        category: 'travel',
        isPortalFeature: true,
        portalName: 'JapanArena Go',
        portalLink: '/pricing',
      },
      {
        id: 'invoice-travel',
        name: 'Invoice Travel',
        description: 'Dokumen perjalanan resmi (invoice + itinerary) digenerate otomatis setelah booking — penting untuk customer korporat yang butuh bukti untuk reimburse.',
        price: 200000,
        category: 'travel',
        isPortalFeature: true,
        portalName: 'JapanArena Go',
        portalLink: '/pricing',
      },
    ]
  },
  medical: {
    title: 'Klinik / Medis',
    items: [
      {
        id: 'med-record',
        name: 'Rekam Medis Digital',
        description: 'Riwayat kunjungan, diagnosis, resep, dan catatan dokter tersimpan digital per pasien — mudah diakses saat pasien datang kembali tanpa cari berkas fisik.',
        price: 550000,
        category: 'medical',
        isPortalFeature: true,
        portalName: 'Portal Klinik',
        portalLink: '/pricing',
      },
      {
        id: 'queue',
        name: 'Antrian Pasien Online',
        description: 'Pasien ambil nomor antrian dari rumah lewat website atau HP, tahu estimasi giliran mereka, dan tidak perlu menunggu lama di klinik.',
        price: 300000,
        category: 'medical',
        isPortalFeature: true,
        portalName: 'Portal Klinik',
        portalLink: '/pricing',
      },
      {
        id: 'doc-sched',
        name: 'Jadwal Dokter',
        description: 'Ketersediaan dokter per hari dan jam praktek ditampilkan real-time — pasien bisa pilih dokter dan waktu yang pas sebelum datang ke klinik.',
        price: 250000,
        category: 'medical',
        isPortalFeature: true,
        portalName: 'Portal Klinik',
        portalLink: '/pricing',
      },
      {
        id: 'clinic-res',
        name: 'Reservasi Online Klinik',
        description: 'Pasien booking slot konsultasi secara online; jadwal masuk ke sistem klinik otomatis dan konfirmasi langsung dikirim ke WA atau email pasien.',
        price: 250000,
        category: 'medical',
        isPortalFeature: true,
        portalName: 'Portal Klinik',
        portalLink: '/pricing',
      },
    ]
  }
};

// Rekomendasi add-on per jenis industri (key = nama TEMPLATE_OPTIONS di
// app/seluruh-layanan/page.tsx). Hanya berisi id yg memang ada di ADDON_GROUPS.
// Dipakai untuk menampilkan badge "Direkomendasikan" di Step 3 (Fitur Custom).
export const RECOMMENDED_ADDONS: Record<string, string[]> = {
  'Website Perusahaan':     ['admin-dash', 'seo', 'live-chat', 'wa-auto', 'crm'],
  'Toko Online':            ['cart', 'checkout', 'stock', 'track-pack', 'midtrans', 'wa-auto', 'voucher'],
  'Website Sekolah / LPK':  ['ppdb', 'portal-siswa', 'cbt', 'absensi', 'cert', 'wa-auto', 'admin-dash'],
  'Website Institusi':      ['admin-dash', 'seo', 'wa-auto', 'email-auto', 'g-sheets'],
  'Website Restaurant':     ['admin-dash', 'wa-auto', 'midtrans', 'invoice-auto', 'seo', 'live-chat'],
  'Personal Branding':      ['seo', 'admin-dash', 'live-chat', 'email-auto'],
  'Blog / Media':           ['seo', 'admin-dash', 'membership', 'email-auto'],
  'Travel & Rental':        ['booking', 'e-ticket', 'gps', 'driver-sched', 'seat', 'midtrans'],
  'Custom Jastip':          ['cart', 'checkout', 'track-pack', 'invoice-auto', 'wa-auto', 'midtrans', 'g-sheets'],
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
    normalPrice: 1900000,
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
