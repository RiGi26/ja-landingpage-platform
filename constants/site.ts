// Konstanta URL infrastruktur yang dipakai lintas komponen. Dipusatkan di sini
// supaya saat domain berubah (mis. custom domain studio.webzoka.com) cukup
// ubah satu env var — tak perlu menyentuh banyak file. Semua fallback memakai
// domain produksi saat ini sehingga perilaku tidak berubah bila env belum diisi.

/** Canonical public origin for the corporate information site. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://www.webzoka.com'

/** Basis URL app Website Builder (form /order, /track, preview situs publish). */
export const WB_URL =
  process.env.NEXT_PUBLIC_WEBSITEBUILDER_URL?.replace(/\/+$/, '') ||
  'https://ja-websitebuilder-platform-nfoa.vercel.app'

/** Nomor WhatsApp utama (tanpa + dan tanpa 0 di depan). */
export const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281296917963').trim()

/** Bangun link wa.me dengan pesan opsional (otomatis ter-encode). */
export const waLink = (msg?: string) => {
  const base = `https://wa.me/${WA_NUMBER}`
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
}
