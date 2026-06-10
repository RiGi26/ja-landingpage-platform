// Kejujuran deliverability — mencerminkan `status` di SSOT mesin pengiriman
// (ja-websitebuilder-platform/src/lib/addons/catalog.ts). WAJIB diisi tiap add-on
// supaya tidak ada fitur yang dijual berharga-tetap padahal belum bisa di-deploy.
//  - 'live'   : ada jalur kode yang merender/menjalankan → fitur otomatis website.
//  - 'manual' : layanan setup nyata yang dikerjakan tim (bukan tombol di renderer).
//  - 'portal' : fitur milik produk portal terpisah (LMS / JapanArena Go / Klinik),
//               bukan add-on website builder → arahkan ke /pricing, jangan dihargai
//               sebagai bagian estimasi website.
//  - 'soon'   : belum terbangun di mesin pengiriman → tawarkan sebagai "konsultasi
//               dulu" tanpa harga tetap, jangan masukkan ke estimasi otomatis.
export type AddonAvailability = 'live' | 'manual' | 'portal' | 'soon';

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'general' | 'lms' | 'ecommerce' | 'travel' | 'medical';
  availability: AddonAvailability;
  isPortalFeature?: boolean;
  portalName?: string;
  portalLink?: string;
  disclaimer?: string;
}

/** Add-on yang harganya dijumlahkan ke estimasi website (hanya yang benar-benar
 *  bisa di-deploy sebagai fitur situs / jasa setup nyata). 'portal' & 'soon'
 *  dikecualikan karena bukan add-on website berharga-tetap. */
export function isPricedAddon(a: Addon): boolean {
  return a.availability === 'live' || a.availability === 'manual';
}

export interface HostingPackage {
  id: string;
  name: string;
  storage: string;
  /** Analogi ruang simpan dalam bahasa awam, mis. "muat ±2.500 foto". */
  capacityHint: string;
  visitor: string;
  price: number;
  maintain: number;
  description: string;
  industryDesc?: Record<string, string>;
  recommendedFor?: string[];
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
  {
    id: 'basic', name: 'Basic', storage: '5GB', capacityHint: '5GB — muat ±2.500 foto produk', visitor: '±500 pengunjung/bln',
    price: 600000, maintain: 450000,
    description: 'Profil bisnis online + katalog produk/layanan. Cocok untuk bisnis baru yang baru mulai hadir di internet.',
    recommendedFor: ['Website Perusahaan', 'Toko Online', 'Website Klinik & Spa', 'Website Restaurant', 'Travel & Rental', 'Personal Branding', 'Custom Jastip'],
    industryDesc: {
      'Website Perusahaan':  'Profil perusahaan + halaman layanan + 20–50 foto portofolio. Cukup untuk bisnis yang mencari klien dari rekomendasi dan pencarian Google.',
      'Toko Online':         'Katalog sampai 100 produk + foto tiap item. Cocok untuk toko baru yang baru mulai jual online.',
      'Website Klinik & Spa':'Profil klinik + jadwal dokter + foto fasilitas. Cukup untuk 1–2 dokter dengan pasien lokal radius 5km.',
      'Website Restaurant':  'Menu digital 20–80 item + foto suasana + Google Maps. Cukup untuk 1 outlet tanpa sistem order online.',
      'Travel & Rental':     'Katalog armada sampai 20 unit + form booking dasar. Cocok untuk rental yang baru mulai online.',
      'Personal Branding':   'Portofolio 10–40 proyek + bio + kontak. Ruang simpan sangat ringan — bisa bertahan lama di paket ini.',
      'Custom Jastip':       'Katalog batch + foto produk + form order. Cocok untuk jastip aktif 1–2 batch per bulan.',
      'Website Sekolah / LPK': 'Kurang disarankan — video profil dan foto galeri angkatan butuh ruang lebih. Pertimbangkan Starter.',
      'Blog / Media':        'Kurang disarankan — kunjungan dari Google bisa melonjak tiba-tiba. Blog aktif butuh kuota lebih besar. Pertimbangkan Starter.',
      'Website Institusi':   'Kurang disarankan — arsip PDF dan foto kegiatan tahunan akan cepat penuh. Pertimbangkan Starter.',
    },
  },
  {
    id: 'starter', name: 'Starter', storage: '20GB', capacityHint: '20GB — muat ±10.000 foto atau beberapa video pendek', visitor: '±3.000 pengunjung/bln',
    price: 1200000, maintain: 900000,
    description: 'Bisnis aktif dengan konten rutin, booking online, atau katalog lengkap. Paket paling banyak dipilih.',
    recommendedFor: ['Website Sekolah / LPK', 'Blog / Media', 'Website Institusi'],
    industryDesc: {
      'Website Perusahaan':  'Portofolio proyek lengkap + galeri tim + dokumen profil PDF. Untuk perusahaan yang rutin menawarkan jasa ke klien baru.',
      'Toko Online':         'Katalog 200+ produk + foto berkualitas tinggi tiap produk. Untuk toko yang aktif promosi di Instagram atau TikTok.',
      'Website Klinik & Spa':'Booking online aktif + banyak foto layanan + mulai buka cabang kedua. Paling banyak dipilih klinik.',
      'Website Sekolah / LPK': 'Video profil sekolah + foto galeri angkatan + halaman pendaftaran. Rekomendasi untuk semua LPK dan bimbel.',
      'Website Restaurant':  'Multi-outlet atau menu musiman yang sering berubah. Untuk restoran yang aktif promosi event.',
      'Travel & Rental':     'Armada 20–50 unit + booking real-time + foto lengkap tiap kendaraan. Untuk rental yang serius scale.',
      'Personal Branding':   'Tambah halaman produk digital, kelas online, atau e-book. Untuk konsultan yang mulai monetisasi konten.',
      'Blog / Media':        'Ratusan artikel + foto header tiap post. Rekomendasi untuk media — kunjungan dari Google bisa melonjak tiba-tiba.',
      'Custom Jastip':       'Batch bulanan aktif 100–300 item per batch + galeri testimoni. Untuk jastip dengan repeat buyer rutin.',
      'Website Institusi':   'Arsip dokumen PDF + foto kegiatan tahunan + halaman pengumuman. Rekomendasi untuk semua yayasan dan organisasi.',
    },
  },
  {
    id: 'growth', name: 'Growth', storage: '50GB', capacityHint: '50GB — muat ribuan foto + banyak video', visitor: '±15.000 pengunjung/bln',
    price: 2500000, maintain: 1875000,
    description: 'Bisnis ramai — promo sering, banyak pengunjung dari iklan, atau banyak transaksi dan konten setiap hari.',
    recommendedFor: [],
    industryDesc: {
      'Website Perusahaan':  'Perusahaan besar dengan banyak proyek, tim lintas kota, dan banyak pengunjung dari iklan atau liputan media.',
      'Toko Online':         'Ribuan produk + sering flash sale + banyak pengunjung dari marketplace atau iklan berbayar.',
      'Website Klinik & Spa':'Klinik dengan banyak dokter spesialis, sistem booking penuh, dan iklan digital aktif.',
      'Website Sekolah / LPK': 'Kelas online sederhana, banyak cabang, atau arsip materi per angkatan yang terus bertambah setiap tahun.',
      'Website Restaurant':  'Jaringan restoran banyak cabang dengan sistem pesan-antar dan program loyalitas.',
      'Travel & Rental':     'Armada 50+ unit di beberapa kota, booking ramai saat musim liburan, iklan aktif Google/Meta.',
      'Personal Branding':   'Platform kursus online dengan video materi, ribuan pengikut, dan webinar rutin.',
      'Blog / Media':        'Media aktif dengan 1.000+ artikel dan 10.000+ kunjungan per bulan dari pencarian Google.',
      'Custom Jastip':       'Jastip besar dengan ribuan pembeli, stok ready stock, atau live shopping rutin di TikTok.',
      'Website Institusi':   'Lembaga besar dengan banyak cabang, arsip 10+ tahun, dan ratusan anggota aktif.',
    },
  },
  {
    id: 'business', name: 'Business', storage: '100GB', capacityHint: '100GB — puluhan ribu foto atau ratusan video kursus', visitor: '±50.000 pengunjung/bln',
    price: 5000000, maintain: 3750000,
    description: 'Untuk bisnis dengan ribuan produk, banyak video kursus, atau lonjakan pengunjung besar dari iklan skala nasional.',
  },
  {
    id: 'enterprise', name: 'Enterprise', storage: '250GB+', capacityHint: '250GB+ — tanpa batas wajar untuk platform besar', visitor: 'Sangat tinggi',
    price: 10000000, maintain: 7500000,
    description: 'Server khusus milik Anda sendiri untuk platform dengan puluhan ribu pengguna aktif — tidak dipakai bareng bisnis lain.',
  },
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
        availability: 'live',
      },
      {
        id: 'midtrans',
        name: 'Midtrans Payment Gateway',
        description: 'Koneksi ke 30+ metode pembayaran (QRIS, transfer bank, e-wallet, kartu kredit) langsung di website. Customer bayar di tempat, dana masuk otomatis.',
        price: 400000,
        category: 'general',
        availability: 'live',
      },
      {
        id: 'wa-auto',
        name: 'WhatsApp Automation',
        description: 'Pesan WA otomatis terkirim ke customer saat ada order baru, konfirmasi pembayaran, atau pengingat jadwal — tanpa ketik manual satu per satu.',
        price: 300000,
        category: 'general',
        availability: 'live',
      },
      {
        id: 'g-sheets',
        name: 'Google Sheets Integration',
        description: 'Data dari website (order, pendaftaran, form kontak) otomatis tercatat ke Google Sheets yang bisa Anda akses kapan saja dari perangkat apapun.',
        price: 150000,
        category: 'general',
        availability: 'manual',
        disclaimer: 'Layanan setup yang dikonfigurasi oleh tim kami (bukan tombol instan). Kami sambungkan dan uji koneksinya saat pembuatan website.',
      },
      {
        id: 'invoice-auto',
        name: 'Invoice Automation',
        description: 'Nota/tagihan PDF digenerate dan dikirim otomatis ke email customer setiap ada transaksi — terlihat profesional dan hemat waktu admin.',
        price: 200000,
        category: 'general',
        availability: 'manual',
        disclaimer: 'Layanan setup yang dikonfigurasi oleh tim kami (bukan tombol instan). Format nota disesuaikan dengan brand Anda saat pembuatan website.',
      },
      {
        id: 'seo',
        name: 'SEO Technical Setup',
        description: 'Optimasi teknis agar website mudah ditemukan di Google: meta title, sitemap, kecepatan halaman, dan schema data. Meningkatkan peluang muncul di hasil pencarian.',
        price: 150000,
        category: 'general',
        availability: 'live',
      },
      {
        id: 'live-chat',
        name: 'Live Chat',
        description: 'Kotak chat muncul di sudut website sehingga pengunjung bisa langsung tanya-jawab real-time dengan tim Anda tanpa keluar dari halaman.',
        price: 100000,
        category: 'general',
        availability: 'live',
      },
      {
        id: 'membership',
        name: 'Membership System',
        description: 'Customer bisa daftar akun, login, dan akses konten atau harga eksklusif yang tidak tersedia untuk pengunjung biasa. Cocok untuk komunitas atau program loyalitas.',
        price: 500000,
        category: 'general',
        availability: 'soon',
      },
      {
        id: 'api',
        name: 'API Integration',
        description: 'Koneksi website ke sistem eksternal yang sudah Anda pakai (ERP, aplikasi kasir, platform logistik, dll) agar data tidak perlu diinput dua kali.',
        price: 450000,
        category: 'general',
        availability: 'manual',
        disclaimer: 'Harga estimasi untuk 1 integrasi standar. Setiap sistem eksternal berbeda kompleksitasnya — tim kami akan konfirmasi scope & biaya final setelah konsultasi teknis.',
      },
      {
        id: 'email-auto',
        name: 'Email Automation',
        description: 'Email otomatis terkirim berdasarkan aksi customer: selamat datang saat daftar, pengingat cart yang ditinggal, newsletter berkala, atau follow-up setelah pembelian.',
        price: 200000,
        category: 'general',
        availability: 'manual',
        disclaimer: 'Layanan setup yang dikonfigurasi oleh tim kami (bukan tombol instan). Termasuk integrasi ke penyedia email pilihan Anda.',
      },
      {
        id: 'crm',
        name: 'CRM Customer',
        description: 'Database terpusat semua data pelanggan (nama, kontak, riwayat transaksi, catatan) dengan fitur follow-up dan segmentasi — agar tidak ada prospek yang terlewat.',
        price: 600000,
        category: 'general',
        availability: 'soon',
      },
      {
        id: 'blog',
        name: 'Blog / Halaman Berita',
        description: 'Halaman artikel yang bisa Anda kelola sendiri — tulis berita, promo, atau konten edukasi langsung dari dashboard admin. Mendukung gambar, kategori, dan tanggal publish.',
        price: 200000,
        category: 'general',
        availability: 'live',
      },
      // Sinkron katalog wb 2026-06-11: career & newsletter kini LIVE (band CTA
      // terinjeksi otomatis di website, semua tema termasuk lux).
      {
        id: 'career',
        name: 'Portal Lowongan Kerja',
        description: 'Section karier di website Anda — ajakan bergabung dengan tombol kirim lamaran (via WhatsApp/email). Cocok untuk perusahaan yang sedang berkembang.',
        price: 300000,
        category: 'general',
        availability: 'live',
        disclaimer: 'Versi saat ini berupa banner ajakan + tombol lamaran. Daftar lowongan terstruktur (posisi, lokasi, filter) menyusul.',
      },
      {
        id: 'newsletter',
        name: 'Newsletter System',
        description: 'Band ajakan berlangganan info & promo di website Anda — pengunjung mendaftar lewat WhatsApp sehingga langsung masuk daftar kontak Anda.',
        price: 200000,
        category: 'general',
        availability: 'live',
        disclaimer: 'Pendaftaran via WhatsApp (tanpa form email otomatis). Kolektor email + kirim massal menyusul.',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'live',
      },
      {
        id: 'checkout',
        name: 'Checkout System',
        description: 'Halaman checkout lengkap di website Anda sendiri: isi alamat, pilih ekspedisi, hitung ongkir otomatis, dan konfirmasi order sebelum bayar.',
        price: 200000,
        category: 'ecommerce',
        availability: 'live',
      },
      {
        id: 'track-pack',
        name: 'Tracking Paket',
        description: 'Customer cek status pengiriman paket mereka langsung di website pakai nomor resi — mengurangi pertanyaan "paket saya sudah sampai mana?" ke WA Anda.',
        price: 250000,
        category: 'ecommerce',
        availability: 'soon',
      },
      {
        id: 'wishlist',
        name: 'Wishlist Produk',
        description: 'Tombol "Simpan ke Wishlist" di setiap produk agar customer bisa tandai barang favorit dan kembali beli nanti — meningkatkan kemungkinan repeat purchase.',
        price: 150000,
        category: 'ecommerce',
        availability: 'soon',
      },
      {
        id: 'review',
        name: 'Review Produk',
        description: 'Kolom ulasan dan rating bintang di setiap produk dari pembeli yang sudah bertransaksi — membangun kepercayaan calon pembeli baru secara organik.',
        price: 200000,
        category: 'ecommerce',
        availability: 'soon',
      },
      {
        id: 'voucher',
        name: 'Voucher & Promo',
        description: 'Sistem kode promo yang bisa Anda buat sendiri: diskon persentase, potongan nominal, minimum pembelian, atau batas penggunaan — untuk kampanye promosi kapan saja.',
        price: 150000,
        category: 'ecommerce',
        availability: 'soon',
      },
      {
        id: 'affiliate',
        name: 'Affiliate System',
        description: 'Mitra atau influencer punya link unik masing-masing; setiap penjualan dari link itu tercatat otomatis dan komisi dihitung di dashboard tanpa rekap manual.',
        price: 1100000,
        category: 'ecommerce',
        availability: 'soon',
        disclaimer: 'Mencakup: unique referral link per mitra, tracking konversi, dan laporan komisi di dashboard. Tidak termasuk auto-payout — pembayaran komisi dilakukan manual oleh admin.',
      },
      {
        id: 'vendor',
        name: 'Multi-Seller Portal Basic',
        description: 'Beberapa penjual bisa daftarkan produk di website Anda; tiap seller punya dashboard sendiri untuk kelola produk dan lihat laporan penjualan mereka.',
        price: 2000000,
        category: 'ecommerce',
        availability: 'soon',
        disclaimer: 'Fitur multi-seller dasar: manajemen produk per seller, dashboard sederhana, dan laporan penjualan. Bukan platform marketplace penuh seperti Tokopedia/Shopee.',
      },
      {
        id: 'stock',
        name: 'Manajemen Stok',
        description: 'Stok berkurang otomatis setiap ada order, muncul notifikasi saat stok menipis, dan produk otomatis nonaktif saat habis — tidak perlu update stok manual.',
        price: 450000,
        category: 'ecommerce',
        availability: 'soon',
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
        availability: 'live',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'portal',
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
        availability: 'live',
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
        availability: 'live',
        isPortalFeature: true,
        portalName: 'Portal Klinik',
        portalLink: '/pricing',
      },
    ]
  }
};

// Rekomendasi add-on per jenis industri (key = nama TEMPLATE_OPTIONS di
// app/seluruh-layanan/page.tsx). HANYA berisi add-on yang benar-benar bisa
// di-deploy (availability 'live'/'manual'). Fitur 'portal' (LMS/Travel/Klinik)
// & 'soon' sengaja TIDAK direkomendasikan di sini — diarahkan lewat callout
// "produk portal" supaya badge "Rekomendasi" tetap jujur (bisa dikirim).
export const RECOMMENDED_ADDONS: Record<string, string[]> = {
  'Website Perusahaan':     ['admin-dash', 'seo', 'live-chat', 'wa-auto'],
  'Website Klinik & Spa':   ['clinic-res', 'doc-sched', 'wa-auto', 'admin-dash', 'seo', 'live-chat'],
  'Toko Online':            ['cart', 'checkout', 'midtrans', 'wa-auto'],
  'Website Sekolah / LPK':  ['wa-auto', 'admin-dash'],
  'Website Institusi':      ['admin-dash', 'seo', 'wa-auto', 'email-auto', 'g-sheets'],
  'Website Restaurant':     ['admin-dash', 'wa-auto', 'midtrans', 'invoice-auto', 'seo', 'live-chat'],
  'Personal Branding':      ['seo', 'admin-dash', 'live-chat', 'email-auto'],
  'Blog / Media':           ['seo', 'admin-dash', 'email-auto'],
  'Travel & Rental':        ['booking', 'midtrans'],
  'Custom Jastip':          ['cart', 'checkout', 'invoice-auto', 'wa-auto', 'midtrans', 'g-sheets'],
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
    desc: 'Semua yang dibutuhkan untuk mulai berjualan online: keranjang belanja, checkout, pembayaran otomatis (Midtrans), dan notifikasi WhatsApp ke pembeli.',
    hostingId: 'starter',
    addonIds: ['cart', 'checkout', 'midtrans', 'wa-auto'],
    normalPrice: 2350000,
    bundlePrice: 1699000,
  }
];
