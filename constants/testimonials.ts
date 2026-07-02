// Testimoni klien — bukti sosial pihak-ketiga (melengkapi galeri "Karya Kami").
//
// PRINSIP KEJUJURAN (kejujuran-jualan): HANYA kutipan ASLI dari klien yang sudah
// memberi izin yang boleh tampil di landing. JANGAN mengarang kutipan.
//
// Cara kerja: komponen <Testimonials/> hanya merender entri yang `quote`-nya TIDAK
// kosong. Selama semua `quote` kosong, seluruh section otomatis tidak ditampilkan
// (tidak ada testimoni palsu yang ter-publish). Begitu owner menempel kutipan asli
// di sini, section langsung muncul di halaman — tanpa perubahan kode lain.
//
// Nama bisnis di bawah adalah klien nyata yang situsnya sudah live (terverifikasi
// di DB websitebuilder). Isi `name` (nama pemilik, boleh nama depan), `city`, dan
// `quote` sesuai izin klien.

export interface Testimonial {
  /** Nama pemilik/narasumber. Boleh nama depan saja. */
  name: string;
  /** Nama bisnis klien. */
  business: string;
  /** Kota (opsional — dikosongkan bila belum ada). */
  city?: string;
  /** Kutipan ASLI dari klien. KOSONG = entri tidak dirender. */
  quote: string;
  /** URL situs live klien (opsional) — jadi bukti bisa diklik. */
  siteUrl?: string;
  /** Inisial untuk avatar fallback (2 huruf). */
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: '', // TODO owner: nama pemilik
    business: 'Bakso Tini',
    city: '',
    quote: '', // TODO owner: tempel kutipan asli klien di sini
    siteUrl: 'https://ja-websitebuilder-platform-nfoa.vercel.app/bakso-tini',
    initials: 'BT',
  },
  {
    name: '',
    business: 'Dapur Mama Zafran',
    city: '',
    quote: '',
    siteUrl: 'https://mamazafran-food.webzoka.com',
    initials: 'MZ',
  },
  {
    name: '',
    business: 'Kamy Physio',
    city: '',
    quote: '',
    siteUrl: 'https://kamy-physio.webzoka.com',
    initials: 'KP',
  },
];
