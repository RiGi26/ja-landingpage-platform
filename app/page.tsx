'use client'

import { useState, useEffect } from 'react'
import {
  Users, MessageCircle, FileText, BookOpen, GraduationCap,
  Lock, Check, ArrowRight, Zap, Clock,
  X, Star, ChevronRight, Video, HardDrive, Globe2, LogIn, Building2, ShoppingBag, BarChart2, ExternalLink,
  ShieldCheck, LayoutGrid, Rocket, MapPin, Mail, Phone,
  Bus, Pill, Cross, Boxes
} from 'lucide-react'
import Navbar from '@/components/LmsNavbar'
import AnimatedHeroMockup from '@/components/AnimatedHeroMockup'
import PortfolioGallery from '@/components/PortfolioGallery'
import DemoPickerModal from '@/components/DemoPickerModal'
import PortalSystemsAccordion from '@/components/PortalSystemsAccordion'
import Image from 'next/image'
import Link from 'next/link'
import { WB_URL } from '@/constants/site'

const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281296917963').trim()

const waLink = (msg?: string): string => {
  const base = `https://wa.me/${WA_NUMBER}`
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
}

// Pesan WhatsApp generik "tanya dulu sebelum mulai" — satu kalimat konsisten
// untuk semua CTA tanya-jawab umum (hero, FAQ, footer, CTA akhir).
const WA_TANYA_UMUM = 'Halo Webzoka, saya ingin tanya soal layanan dulu sebelum mulai.'

// ─── Sections ───────────────────────────────────────────────────────────────

function HeroSection({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative bg-[#F5F5F7] pt-28 pb-16 px-4 overflow-hidden">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Gradient mesh — blue bloom top-right */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] opacity-40" style={{background: 'radial-gradient(ellipse 70% 60% at 80% 0%, #BFDBFE, transparent)'}} />
      {/* Gradient mesh — subtle warm bottom-left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] opacity-20" style={{background: 'radial-gradient(ellipse 60% 60% at 0% 100%, #E0F2FE, transparent)'}} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 animate-fade-up">
            <p className="text-[11px] text-gray-500 font-medium">🇮🇩 Platform Digital Buatan Indonesia · Untuk UKM Indonesia</p>
            <div className="inline-flex items-center gap-2 bg-white border border-black/5 text-[#0071E3] text-[11px] font-bold px-4 py-1.5 rounded-full apple-shadow">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Untuk Rental, Klinik, Apotek, Kursus, dan Bisnis Lainnya
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.05] tracking-tight sf-display-heavy">
              Berhenti Jadi Admin<br />
              <span className="text-[#0071E3]">di Bisnis Kamu Sendiri.</span>
            </h1>

            <p className="text-base md:text-lg font-medium text-blue-600 mt-2 mb-4">
              Belum punya website? Tampil di Google mulai{" "}
              <span className="font-bold">Rp 600.000</span>{" "}
              — siap dalam 3–5 hari kerja.
            </p>

            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              Buat pemilik bisnis yang udah capek ngurusin semua operasional sendirian. Tiap hari HP penuh chat nanya ketersediaan, catat booking manual, sampai rekap uang malam-malam. Kami buatin sistem otomatis supaya bisnis tetap jalan walau kamu lagi tidur.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="/seluruh-layanan"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071E3] text-white font-bold rounded-full transition-all hover:bg-[#005BB5] active:scale-[0.96] shadow-lg glow-button"
                >
                  Rakit Website Sekarang <ArrowRight size={18} />
                </a>
                <button
                  type="button"
                  onClick={onDemo}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 border border-black/5 font-bold rounded-full transition-all hover:bg-gray-50 active:scale-[0.96] apple-shadow"
                >
                  Coba Demo Sistem (Gratis)
                </button>
              </div>
              <p className="text-[13px] text-gray-600 font-medium">Mulai dari <span className="text-gray-900 font-bold">Rp 600.000</span></p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-gray-600 font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Live 3–5 Hari Kerja</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Tanpa Coding</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Domain Sendiri</span>
            </div>
          </div>

          {/* Device Mockup Visualization */}
          <div className="relative z-20">
            <AnimatedHeroMockup />
          </div>

        </div>
      </div>
    </section>
  )
}

function SocialProofBar() {
  const STATS = [
    { value: '6 Platform', label: 'Siap Pakai' },
    { value: '3–5 hari', label: 'Waktu Live' },
    { value: '24/7', label: 'Sistem Berjalan' },
    { value: 'Mulai 600rb', label: 'Biaya Terjangkau' },
  ]
  return (
    <section className="bg-white border-y border-black/5 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {STATS.map(s => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="text-lg font-extrabold text-gray-900 sf-display-heavy">{s.value}</span>
            <span className="text-[12px] text-gray-600 font-medium border-l border-black/10 pl-3">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProofSection() {
  const PILLARS = [
    {
      icon: Globe2,
      title: 'Karya yang Bisa Dicek Langsung',
      desc: 'Produk yang kami pakai sendiri tiap hari — japanarena.id — sudah tayang di domain nyata, bukan mockup. Gulir ke bawah, klik, buka sendiri di tab baru.',
      cta: 'Lihat karya live ↓',
      href: '#portofolio',
    },
    {
      icon: ShieldCheck,
      title: 'Integrasi Resmi, Bukan Tempelan',
      desc: 'Pembayaran lewat Midtrans, notifikasi lewat WhatsApp Gateway resmi. Bukan akalan, bukan plugin asal jalan.',
    },
    {
      icon: BarChart2,
      title: 'Biaya Jujur Sejak Awal',
      desc: 'Estimasi final muncul di kalkulator sebelum kamu bayar sepeser pun. Biaya renewal pun sudah tertera — tidak ada tagihan kejutan.',
      cta: 'Hitung estimasi →',
      href: '/seluruh-layanan',
    },
  ]

  return (
    <section className="bg-white py-16 lg:py-20 px-4 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Bukti, Bukan Janji</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight sf-display-heavy leading-tight">
            Kami Lebih Suka Tunjukkan<br className="hidden md:block" /> daripada Sekadar Berjanji.
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Belum ada ratusan testimoni berbayar di sini. Yang ada: hal-hal yang bisa kamu buktikan sendiri sekarang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <div key={p.title} className={`flex flex-col p-8 rounded-[32px] bg-[#F5F5F7] border border-black/[0.03] apple-shadow reveal reveal-delay-${i + 1}`}>
              <div className="w-14 h-14 rounded-2xl bg-white apple-shadow flex items-center justify-center mb-6 text-[#0071E3]">
                <p.icon size={26} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 sf-display">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{p.desc}</p>
              {p.cta && p.href && (
                <a href={p.href} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0071E3] hover:text-[#005BB5] transition-colors mt-5">
                  {p.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SegmenSection() {
    const PORTALS = [
      {
        icon: Globe2,
        label: 'Katalog Website',
        description: 'Pelanggan kamu sedang cari bisnis seperti milik kamu di Google sekarang. Apakah kamu muncul? Website dengan sistem booking dan katalog — live dalam 3–5 hari. Mulai Rp 600.000.',
        cta: 'Mulai Rakit Website',
        href: '/seluruh-layanan',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        isExternal: false,
      },
      {
        icon: Bus,
        label: 'Portal Travel, Rental & Venue',
        description: 'Sistem booking anti-bentrok 24 jam. Cocok untuk: rental kendaraan, lapangan futsal, villa, studio foto, agen travel — pelanggan cek ketersediaan & bayar dari HP.',
        cta: 'Lihat Demo',
        href: 'https://rental.webzoka.com',
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        isExternal: true,
      },
      {
        icon: GraduationCap,
        label: 'Portal Belajar / LMS',
        description: 'Untuk karyawan baru atau kursus publik — tinggal upload materi sekali. Sistem otomatis ngurus pendaftaran, ujian, sampai penerbitan sertifikat. Cocok untuk: LPK, bimbel, kursus online, sekolah.',
        cta: 'Lihat Demo',
        href: 'https://lms.webzoka.com/demo',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        isExternal: true,
      },
      {
        icon: Cross,
        label: 'Portal Klinik',
        description: 'Semua riwayat pasien rapi, aman, dan bisa diakses dalam sekali klik. Siap integrasi SATUSEHAT (sistem rekam medis resmi Kemenkes RI). Cocok untuk: klinik umum, klinik kecantikan & spa, puskesmas.',
        cta: 'Lihat Demo',
        href: 'https://klinik.webzoka.com/demo',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        isExternal: true,
      },
      {
        icon: Pill,
        label: 'Portal Farmasi',
        description: 'Pantau stok obat & kelola resep digital tanpa pusing. Kasir terhubung ke gudang real-time. Cocok untuk: apotek mandiri, apotek jaringan, klinik dengan dispensing obat.',
        cta: 'Lihat Demo',
        href: 'https://apotek.webzoka.com/demo',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        isExternal: true,
      },
      {
        icon: Boxes,
        label: 'Portal Stok & Operasi',
        description: 'Kelola stok gudang, resep & produksi, pesanan, kasir, sampai laporan keuangan dalam satu portal. Kasir, dapur produksi & gudang tersinkron real-time. Cocok untuk: F&B, manufaktur UKM, retail & grosir.',
        cta: 'Lihat Portal',
        href: 'https://stock.webzoka.com',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        isExternal: true,
      },
      {
        icon: ShoppingBag,
        label: 'Layanan Jastip Jepang',
        description: 'Titip barang dari Jepang langsung ke rumah kamu. Rincian biaya jelas, pengiriman terlacak, tidak perlu khawatir barang hilang.',
        cta: 'Mulai Titip Barang',
        href: 'https://jastip.webzoka.com',
        color: 'text-red-600',
        bg: 'bg-red-50',
        isExternal: true,
      },
    ]

    return (
        <section id="segmen" className="bg-white py-16 lg:py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Pilih Bisnis Kamu</p>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight sf-display-heavy">
                        Mulai dari Website.<br className="hidden md:block" /> Tambah Sistem Kalau Bisnis Sudah Butuh.
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                      Bukan template generik. Setiap sistem dibuat pas sesuai alur kerja bisnis kamu — mulai dari rental mobil, tempat kursus, sampai operasional klinik dan apotek.
                    </p>
                </div>

                {(() => {
                  const featured = PORTALS[0]
                  const systems = PORTALS.slice(1)
                  const FeaturedIcon = featured.icon
                  return (
                    <div className="flex flex-col items-center gap-6">
                      {/* Kartu unggulan = banner full-width horizontal (semua viewport, BUKAN dropdown) */}
                      <a
                        href={featured.href}
                        className="group w-full flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 p-7 sm:p-8 rounded-[32px] bg-[#0071E3] border border-[#005BB5] shadow-xl shadow-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-1"
                      >
                        <div className="w-14 h-14 shrink-0 rounded-[12px] bg-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FeaturedIcon size={26} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Produk Unggulan</span>
                            <h3 className="text-xl sm:text-2xl font-bold text-white sf-display mt-1 mb-2">{featured.label}</h3>
                            <p className="text-sm leading-relaxed text-blue-50 max-w-2xl">{featured.description}</p>
                        </div>
                        <span className="shrink-0 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold bg-white text-[#0071E3] group-hover:bg-blue-50 transition-all">
                            {featured.cta} <ArrowRight size={16} />
                        </span>
                      </a>

                      {/* Divider sebelum portal sistem */}
                      <div className="w-full py-3 sm:py-2">
                        <div className="hidden sm:flex items-center gap-4">
                          <div className="flex-1 h-px bg-black/5" />
                          <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest text-center whitespace-nowrap">
                            Kami gak cuma bikin website pajangan. Dapatkan sistem komplit:
                          </p>
                          <div className="flex-1 h-px bg-black/5" />
                        </div>
                        <p className="sm:hidden text-[11px] font-bold text-gray-600 uppercase tracking-widest text-center leading-relaxed">
                          Kami gak cuma bikin website pajangan. Dapatkan sistem komplit:
                        </p>
                      </div>

                      {/* Desktop: grid kartu (tidak berubah) */}
                      <div className="hidden sm:flex flex-wrap justify-center gap-6 w-full">
                        {systems.map((p) => {
                          const IconComponent = p.icon
                          return (
                            <div key={p.label} className="group flex flex-col p-6 rounded-[32px] bg-white border border-black/[0.03] apple-shadow transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-sm">
                              <div className={`w-14 h-14 rounded-[8px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${p.bg} ${p.color}`}>
                                  <IconComponent size={26} />
                              </div>
                              <h3 className="text-xl font-bold mb-3 sf-display text-gray-900">{p.label}</h3>
                              <p className="text-sm leading-relaxed mb-8 flex-1 text-gray-500">{p.description}</p>
                              <a
                                href={p.href}
                                {...(p.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="w-full py-3 rounded-full text-center text-sm font-bold transition-all bg-gray-900 text-white hover:bg-black"
                              >
                                  {p.cta}
                              </a>
                            </div>
                          )
                        })}
                      </div>

                      {/* Mobile: accordion ringkas (skala saat portal bertambah) */}
                      <div className="sm:hidden w-full">
                        <PortalSystemsAccordion portals={systems} />
                      </div>
                    </div>
                  )
                })()}
            </div>
        </section>
    )
}

function GlobalFeatures() {
    const FEATURES = [
        { title: 'Tidak Ada yang Lupa Bayar Lagi', desc: 'Sistem kirim reminder invoice dan konfirmasi jadwal ke WA pelanggan secara otomatis — tanpa kamu perlu ingat-ingat.', icon: MessageCircle },
        { title: 'Lihat Angka, Bukan Tebak-tebakan', desc: 'Buka dashboard dari HP kapanpun. Pemasukan hari ini, tren minggu ini — semuanya langsung tersaji, tidak perlu tunggu rekap manual.', icon: BarChart2 },
        { title: 'Pelanggan Pesan Sendiri, 24 Jam', desc: 'Booking dan order jalan otomatis lewat sistem — pelanggan bisa pesan & bayar kapan saja, walau kamu lagi tidur. Tanpa harus standby balas chat.', icon: Clock },
    ]

    return (
        <section id="fitur" className="bg-[#F5F5F7] py-16 lg:py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {FEATURES.map((f, i) => (
                        <div key={f.title} className={`flex flex-col items-center text-center group reveal reveal-delay-${i + 1}`}>
                            <div className="w-16 h-16 bg-white rounded-3xl apple-shadow flex items-center justify-center mb-6 text-[#0071E3] group-hover:scale-105 transition-transform">
                                <f.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 sf-display">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TrustSection() {
    const STEPS = [
        { t: 'Hitung & Pesan Sendiri', d: 'Pilih industri di kalkulator, lihat estimasi biaya, lalu pesan dan bayar DP — langsung online. Tanpa harus nunggu sales.', i: LayoutGrid },
        { t: 'Isi Data Bisnis kamu — Sekitar 5 Menit', d: 'Logo, konten, gaya website — isi lewat form data bisnis. Tersimpan otomatis, boleh dicicil.', extra: 'Belum punya logo atau foto? Tim kami siapkan draf awalnya — tidak perlu khawatir.', i: Zap },
        { t: 'Tim Bangun, Live 3–5 Hari', d: 'Kamu tinggal terima beres. Pantau progressnya via Order ID sampai website tayang di domainmu sendiri.', extra: 'Setelah live, kamu bisa edit konten sendiri kapan saja — tanpa perlu hubungi tim kami.', i: Rocket },
    ]

    const BADGES = [
        { t: 'Data Pembeli Aman', d: 'Nomor & transaksi pelanggan tersimpan terkunci — tidak bocor, tidak dijual', i: ShieldCheck },
        { t: 'Tidak Akan Hilang', d: 'Mau se-error apa pun sistemnya nanti, data kamu tetap aman karena otomatis di-backup tiap hari', i: HardDrive },
        { t: 'Anti-Ngadat Saat Rame', d: 'Pelanggan tetap bisa buka & pesan walau pengunjung membludak', i: Globe2 },
        { t: 'Bayar & Notif Otomatis', d: 'Pelanggan bayar via QRIS/transfer, pesanan masuk WhatsApp kamu sendiri', i: Zap },
    ]

    return (
        <section className="bg-[#F5F5F7] py-16 lg:py-20 px-4 border-t border-black/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Cara Kerja</p>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight sf-display-heavy">Pesan Senin, Website Rilis Jumat —<br className="hidden md:block" /> Tanpa Kamu Harus Ngerti Coding</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {STEPS.map((s, i) => (
                        <div key={i} className={`relative p-8 rounded-[40px] bg-white border border-black/[0.03] apple-shadow overflow-hidden group reveal reveal-delay-${i + 1}`}>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0071E3]/5 rounded-full blur-2xl group-hover:bg-[#0071E3]/10 transition-colors" />
                            <div className="w-14 h-14 bg-[#F5F5F7] rounded-lg flex items-center justify-center mb-6 text-[#0071E3] group-hover:scale-110 transition-transform">
                                <s.i size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{s.t}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{s.d}</p>
                            {'extra' in s && <p className="text-sm text-gray-500 mt-1">{(s as { extra: string }).extra}</p>}
                        </div>
                    ))}
                </div>

                <div className="pt-16 border-t border-black/5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {BADGES.map((b, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0071E3] flex items-center justify-center mb-4">
                                    <b.i size={20} />
                                </div>
                                <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-1">{b.t}</h4>
                                <p className="text-[10px] text-gray-600 font-medium">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// Studi kasus flagship: japanarena.id = produk LMS milik Japan Arena sendiri
// (bukan klien pihak ketiga). Dipakai sebagai bukti nyata "website + sistem jadi
// satu", bukan testimoni berkutip — lebih jujur & lebih kuat (angka bisa dicek).
function FlagshipSection() {
  const STATS = [
    { value: '96%', label: 'Lulus JLPT N3' },
    { value: '200+', label: 'Siswa aktif' },
    { value: '5.0', label: 'Rating siswa' },
  ]
  return (
    <section className="bg-white py-16 lg:py-20 px-4 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 flex items-center justify-center gap-2">
            <Star size={13} className="fill-[#0071E3]" /> Karya Andalan Kami
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight sf-display-heavy leading-tight">
            Kami Bangun. Kami Pakai Sendiri.
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            japanarena.id — sekolah bahasa Jepang online milik kami. Website-nya tampil di Google,
            sistem belajarnya jalan tiap hari buat ratusan siswa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 rounded-[40px] overflow-hidden border border-black/[0.04] apple-shadow bg-white">
          {/* Kiri — narasi + angka + CTA */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <p className="text-[13px] font-bold uppercase tracking-widest text-[#0071E3] mb-4">japanarena.id</p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
              Satu produk, dua hal sekaligus: website yang dilihat calon murid, dan sistem yang ngurus
              pendaftaran, kelas, ujian, sampai sertifikat otomatis. Sistem yang sama itulah yang kami
              rakit untuk bisnis kamu.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-black text-gray-900 sf-display-heavy leading-none">{s.value}</div>
                  <div className="text-xs text-gray-600 font-medium mt-2 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-8">Semua angka bisa kamu cek sendiri di japanarena.id.</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.japanarena.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0071E3] text-white font-bold rounded-full transition-all hover:bg-[#005BB5] active:scale-[0.96] shadow-lg glow-button"
              >
                Buka japanarena.id <ExternalLink size={17} />
              </a>
              <a
                href="/seluruh-layanan"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-900 border border-black/5 font-bold rounded-full transition-all hover:bg-gray-50 active:scale-[0.96] apple-shadow"
              >
                Mau Sistem Seperti Ini? <ArrowRight size={17} />
              </a>
            </div>
            <p className="text-[13px] text-gray-500 mt-4">Website mulai Rp 600.000. Live 3–5 hari kerja.</p>
          </div>

          {/* Kanan — mock browser japanarena.id */}
          <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 p-6 sm:p-8 min-h-[300px] lg:min-h-full flex flex-col">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              </div>
              <div className="flex-1 bg-white/10 border border-white/10 rounded-md px-3 py-1 text-[11px] text-blue-100 font-mono text-center truncate">
                www.japanarena.id
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-5">
                <GraduationCap size={32} className="text-white" />
              </div>
              <p className="text-white font-black text-xl sf-display">Japan Arena Academy</p>
              <p className="text-blue-200 text-sm mt-1.5">Sistem Pelatihan Bahasa Jepang</p>
              <span className="inline-flex items-center gap-1.5 mt-5 bg-emerald-500/15 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live sekarang
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const FAQS = [
    {
      q: 'Berapa lama website saya selesai?',
      a: '3–5 hari kerja setelah data bisnis dan DP diterima. Konten sederhana bisa selesai lebih cepat. Website dengan fitur custom bisa lebih lama — kami konfirmasi timeline pasti sebelum mulai.',
    },
    {
      q: 'Apakah saya bisa pakai domain sendiri?',
      a: 'Ya. Kami bantu pointing domain kamu ke sistem kami. Belum punya domain? Bisa pakai subdomain gratis (nama.webzoka.com) atau kami bantu daftarkan domain baru.',
    },
    {
      q: 'Apakah ada biaya setelah tahun pertama?',
      a: 'Ya, ada biaya renewal untuk hosting dan maintenance. Jumlahnya sudah tertera di kalkulator sejak awal — tidak ada biaya tersembunyi yang muncul belakangan.',
    },
    {
      q: 'Apakah saya bisa request revisi?',
      a: 'Ya. Revisi konten dan layout minor termasuk dalam paket. Untuk perubahan besar seperti ganti template atau tambah fitur baru, kita obrolin bareng dulu estimasi biayanya.',
    },
    {
      q: 'Apa bedanya website builder dengan portal (LMS, klinik, dll)?',
      a: 'Website builder untuk tampilan online bisnis kamu — yang dilihat pelanggan. Portal adalah sistem operasional untuk jalankan bisnis dari dalam. Keduanya bisa dipakai terpisah atau bersamaan.',
    },
    {
      q: 'Apakah ada kontrak minimum atau bisa cancel kapan saja?',
      a: 'Tidak ada kontrak minimum. Untuk portal SaaS, bisa cancel kapan saja. Untuk website, hosting berjalan per tahun dan bisa tidak diperpanjang saat jatuh tempo.',
    },
  ]

  return (
    <section className="bg-white py-16 lg:py-20 px-4 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight sf-display-heavy">
            Pertanyaan yang Sering Ditanya
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#F5F5F7] rounded-[24px] p-8 border border-black/[0.03]">
              <h3 className="text-base font-bold text-gray-900 mb-3">{faq.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-sm text-gray-600 font-medium">
            Masih ada pertanyaan?{' '}
            <a
              href={waLink(WA_TANYA_UMUM)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071E3] font-bold hover:underline"
            >
              Chat tim kami
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <DemoPickerModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      <main>
        {/* WhatsApp Sticky Button (Mobile) */}
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <a
            href={waLink(WA_TANYA_UMUM)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat via WhatsApp"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl active:scale-90 transition-transform"
          >
            <MessageCircle size={28} aria-hidden="true" />
          </a>
        </div>

        <HeroSection onDemo={() => setDemoOpen(true)} />
        <SocialProofBar />
        <GlobalFeatures />
        <SegmenSection />
        <TrustSection />
        <ProofSection />
        <FlagshipSection />
        <PortfolioGallery />
        <FaqSection />

        <section id="harga" className="py-20 lg:py-24 bg-[#070B14] relative overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, #0071E3, transparent)'}} />
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(ellipse 60% 60% at 80% 80%, #3B82F6, transparent)'}} />
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
              <p className="text-[12px] font-bold uppercase tracking-widest text-blue-400 mb-6">Mulai Sekarang</p>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-white sf-display-heavy leading-[1.1]">
                Berhenti Ngurus Manual.<br className="hidden md:block" /> <span className="text-[#0071E3]">Mulai Hari Ini.</span>
              </h2>
              <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                Pilih industri kamu di kalkulator, lihat estimasinya, langsung pesan — tanpa nunggu sales.
                Masih ragu?{' '}
                <a
                  href={waLink(WA_TANYA_UMUM)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0071E3] font-bold hover:underline"
                >
                  Chat tim kami dulu
                </a>
                , gratis, tanpa script jualan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/seluruh-layanan"
                  className="inline-flex items-center justify-center gap-2 bg-[#0071E3] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 hover:bg-[#005BB5] transition-all glow-button"
                >
                  Rakit Website Sekarang <ArrowRight size={18} />
                </a>
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/20 active:scale-[0.96] transition-all backdrop-blur-sm"
                >
                  Lihat Demo Sistem
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <p className="text-gray-500 text-sm font-medium">Tidak ada komitmen. Tidak ada biaya konsultasi.</p>
              </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#F5F5F7] border-t border-black/5 pt-20 pb-10 px-4">
          <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-16">
                  {/* Brand Column */}
                  <div className="col-span-full md:col-span-4 space-y-6">
                      <div className="flex items-center gap-3">
                          <Image src="/images/logo-wide-clean.png" alt="Webzoka — Part of Japan Arena Corp" width={170} height={56} className="h-11 w-auto object-contain" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                          Untuk bisnis yang sudah capek ngurus semuanya sendiri — dari website profesional sampai operasional yang berjalan otomatis. Tanpa ribet, tanpa drama.
                      </p>
                      <a
                          href={waLink(WA_TANYA_UMUM)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#0071E3] hover:text-[#005BB5] transition-colors"
                      >
                          <Phone size={16} /> Chat tim kami di WhatsApp
                      </a>
                  </div>

                  {/* Product Links */}
                  <div className="col-span-1 md:col-span-2 space-y-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Platform</p>
                      <ul className="space-y-3 text-sm text-gray-500">
                          <li><a href="https://lms.webzoka.com" className="hover:text-[#0071E3] transition-colors">LMS Portal</a></li>
                          <li><a href="https://klinik.webzoka.com" className="hover:text-[#0071E3] transition-colors">Clinic Management</a></li>
                          <li><a href="https://apotek.webzoka.com" className="hover:text-[#0071E3] transition-colors">Pharmacy System</a></li>
                          <li><a href="https://jastip.webzoka.com" className="hover:text-[#0071E3] transition-colors">Jastip Smart System</a></li>
                          <li><a href="https://stock.webzoka.com" className="hover:text-[#0071E3] transition-colors">Stok & Operasi</a></li>
                          <li><Link href="/seluruh-layanan" className="hover:text-[#0071E3] transition-colors">Rakit Website Custom</Link></li>
                      </ul>
                  </div>

                  {/* Company Links */}
                  <div className="col-span-1 md:col-span-2 space-y-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Perusahaan</p>
                      <ul className="space-y-3 text-sm text-gray-500">
                          <li><Link href="/tentang-kami" className="hover:text-[#0071E3] transition-colors">Tentang Kami</Link></li>
                          <li><Link href="/kebijakan-privasi" className="hover:text-[#0071E3] transition-colors">Kebijakan Privasi</Link></li>
                          <li><Link href="/syarat-ketentuan" className="hover:text-[#0071E3] transition-colors">Syarat &amp; Ketentuan</Link></li>
                          <li>
                            <a
                              href={`${WB_URL}/track`}
                              className="hover:text-[#0071E3] transition-colors"
                            >
                              Lacak Pesanan
                            </a>
                          </li>
                      </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="col-span-full md:col-span-4 space-y-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Hubungi Kami</p>
                      <ul className="space-y-4 text-sm text-gray-500">
                          <li className="flex gap-3">
                              <MapPin size={18} className="text-[#0071E3] shrink-0" />
                              <span>Jakarta Selatan, DKI Jakarta, Indonesia</span>                          </li>
                          <li className="flex gap-3">
                              <Mail size={18} className="text-[#0071E3] shrink-0" />
                              <span>contact@webzoka.com</span>
                          </li>
                          <li className="flex gap-3">
                              <Phone size={18} className="text-[#0071E3] shrink-0" />
                              <span>+62 812-9691-7963</span>
                          </li>
                          <li className="flex gap-3">
                              <MessageCircle size={18} className="text-[#0071E3] shrink-0" />
                              <span>Support WA: Senin–Sabtu, 08.00–17.00 WIB</span>
                          </li>
                      </ul>
                  </div>
              </div>

              {/* Bottom Copyright */}
              <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-[12px] text-gray-600 font-medium">
                        &copy; {new Date().getFullYear()} Webzoka. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Webzoka adalah nama usaha terdaftar yang beroperasi di bawah hukum Republik Indonesia.
                    </p>
                  </div>
                  <div className="flex gap-8 text-[12px] text-gray-600 font-medium">
                      <Link href="/kebijakan-privasi" className="hover:text-[#0071E3] transition-colors">Kebijakan Privasi</Link>
                      <Link href="/syarat-ketentuan" className="hover:text-[#0071E3] transition-colors">Syarat &amp; Ketentuan</Link>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  )
}
