import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import Navbar from '@/components/LmsNavbar'
import { waLink } from '@/constants/site'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website — Webzoka',
  description: 'Website bisnis dibuatkan oleh Webzoka, mulai Rp600.000. Konsultasikan scope, harga, dan jadwal sebelum pengerjaan dimulai.',
  alternates: { canonical: 'https://www.webzoka.com/seluruh-layanan/' },
}

const consultationUrl = waLink('Halo Webzoka, saya ingin konsultasi pembuatan website untuk bisnis saya. Mohon bantu jelaskan scope, harga, dan jadwal pengerjaannya.')
const buttonClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#005BB5] active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4'

export default function ManagedWebsitePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-32 md:px-6 md:pt-40">
        <section className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#0071E3]">Website Managed Service</p>
            <h1 className="sf-display-heavy text-3xl font-black leading-tight text-gray-900 md:text-5xl">Website bisnismu, dibuatkan oleh Webzoka.</h1>
            <p className="my-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">Tampilkan layanan, produk, dan cara menghubungi bisnismu dalam website yang mudah dipahami. Ceritakan kebutuhanmu; kami bantu menyiapkan desain dan membangun website sesuai scope yang disepakati.</p>
            <a href={consultationUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}><MessageCircle size={20} aria-hidden="true" /> Konsultasi via WhatsApp</a>
          </div>
          <div className="rounded-[32px] border border-black/5 bg-white p-6 apple-shadow md:p-8">
            <p className="text-sm font-semibold text-gray-600">Harga awal pembuatan website</p>
            <p className="my-3 text-4xl font-black tabular-nums text-gray-900">Rp600.000</p>
            <p className="text-base leading-relaxed text-gray-600">Harga final mengikuti kebutuhan. Scope, biaya, jadwal, dan hasil yang akan diserahkan dikonfirmasi sebelum pengerjaan dimulai.</p>
            <p className="mt-4 border-t border-black/5 pt-4 text-sm leading-relaxed text-gray-600">Ketentuan dan biaya hosting, pemeliharaan, serta perpanjangan disampaikan sebelum pesanan atau perpanjangan dikonfirmasi.</p>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="sf-display text-2xl font-bold text-gray-900 md:text-3xl">Website untuk kebutuhan bisnismu</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['Profil bisnis & jasa', 'Perkenalkan perusahaan, layanan, portofolio, dan jalur konsultasi untuk calon pelanggan.'],
              ['Katalog produk & kuliner', 'Tampilkan produk atau menu, informasi usaha, dan jalur pemesanan yang disepakati.'],
              ['Pendidikan & personal branding', 'Jelaskan program, tampilkan karya, dan bantu pengunjung menghubungi kamu.'],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[24px] border border-black/5 bg-white p-6 apple-shadow">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="sf-display text-2xl font-bold text-gray-900 md:text-3xl">Apa yang menentukan scope dan harga?</h2>
            <ul className="mt-6 space-y-4">
              {['Jumlah halaman dan kebutuhan desain.', 'Kesiapan teks, foto, logo, dan materi bisnis.', 'Fitur khusus, integrasi, atau kebutuhan Portal.', 'Hosting, pemeliharaan, dan dukungan yang disepakati.'].map(item => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-gray-600"><Check size={20} className="mt-1 shrink-0 text-[#0071E3]" aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-gray-600">Kami membantu memilih kebutuhan teknis yang sesuai. Kamu cukup menjelaskan bisnis dan menyiapkan materi yang dibutuhkan; rincian pengerjaan dibahas bersama.</p>
          </div>
          <div className="rounded-[32px] border border-black/5 bg-white p-6 md:p-8">
            <h2 className="sf-display text-2xl font-bold text-gray-900">Alur pengerjaan</h2>
            <ol className="mt-6 space-y-5">
              {[
                ['Konsultasi', 'Ceritakan bisnis, tujuan website, dan kebutuhan utama melalui WhatsApp.'],
                ['Konfirmasi penawaran', 'Sepakati scope, harga, jadwal, hasil yang diserahkan, dan ketentuan revisi sebelum mulai.'],
                ['Pembuatan & review', 'Kami membangun website dari materi yang tersedia, lalu kamu meninjau hasil sesuai kesepakatan.'],
                ['Peluncuran & dukungan', 'Website diluncurkan setelah review dan persiapan selesai. Dukungan mengikuti layanan yang disepakati.'],
              ].map(([title, body], index) => (
                <li key={title} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">{index + 1}</span><div><h3 className="font-bold text-gray-900">{title}</h3><p className="mt-1 text-base leading-relaxed text-gray-600">{body}</p></div></li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-gray-600">Waktu pengerjaan mengikuti kompleksitas, kesiapan materi, dan proses review. Jadwal dikonfirmasi sebelum pekerjaan dimulai.</p>
          </div>
        </section>
        <section className="mt-16 rounded-[32px] bg-gray-900 p-6 text-white md:p-10">
          <h2 className="sf-display text-2xl font-bold md:text-3xl">Butuh Website + Portal?</h2>
          <p className="my-5 max-w-2xl text-base leading-relaxed text-gray-200">Website membantu pelanggan mengenal bisnis. Portal SaaS membantu pekerjaan harian seperti stok, pesanan, atau pengelolaan tim. Keduanya dapat dibahas sebagai solusi gabungan sesuai kebutuhan dan kesiapan bisnismu.</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={consultationUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>Diskusikan kebutuhanmu <ArrowRight size={18} aria-hidden="true" /></a>
            <Link href="/pricing/" className="inline-flex min-h-12 items-center gap-2 font-bold text-white underline underline-offset-4 hover:text-blue-200">Lihat paket Portal SaaS <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
        <nav aria-label="Informasi legal" className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-blue-700">
          <Link href="/privacy/" className="inline-flex min-h-11 items-center hover:underline">Kebijakan Privasi</Link>
          <Link href="/terms/" className="inline-flex min-h-11 items-center hover:underline">Syarat &amp; Ketentuan</Link>
        </nav>
      </main>
    </div>
  )
}
