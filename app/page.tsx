'use client'

import { useState, useEffect } from 'react'
import {
  Users, MessageCircle, FileText, BookOpen, GraduationCap,
  Lock, Check, ArrowRight, Zap, Shield, Clock,
  X, Star, ChevronRight, Video, HardDrive, Globe2, LogIn, Building2, ShoppingBag, BarChart2,
  ShieldCheck, LayoutGrid, Rocket, MapPin, Mail, Phone,
  Bus, Pill, Cross
} from 'lucide-react'
import Navbar from '@/components/LmsNavbar'
import AnimatedHeroMockup from '@/components/AnimatedHeroMockup'
import PortfolioGallery from '@/components/PortfolioGallery'
import DemoPickerModal from '@/components/DemoPickerModal'
import Image from 'next/image'
import Link from 'next/link'

const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281296917963').trim()

const waLink = (msg?: string): string => {
  const base = `https://wa.me/${WA_NUMBER}`
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
}

// ─── Sections ───────────────────────────────────────────────────────────────

function HeroSection({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative bg-[#F5F5F7] pt-32 pb-24 px-4 overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white border border-black/5 text-[#0071E3] text-[11px] font-bold px-4 py-1.5 rounded-full apple-shadow">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Untuk Rental, Klinik, Apotek, Kursus, dan Bisnis Lainnya
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight sf-display-heavy">
              Berhenti Jadi Admin<br />
              <span className="text-[#0071E3]">di Bisnis Kamu Sendiri.</span>
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
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
              <p className="text-[13px] text-gray-400 font-medium">Mulai dari <span className="text-gray-900 font-bold">Rp 600.000</span></p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-gray-600 font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Live 3–5 Hari Kerja</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Tanpa Coding</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Data Anda Tidak Bocor</span>
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
    { value: '5 Platform', label: 'Siap Pakai' },
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
      desc: 'Situs klien kami sudah tayang di domain nyata — bukan mockup. Gulir ke bawah, klik mana saja, buka sendiri di tab baru.',
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
      desc: 'Estimasi final muncul di kalkulator sebelum Anda bayar sepeser pun. Biaya renewal pun sudah tertera — tidak ada tagihan kejutan.',
      cta: 'Hitung estimasi →',
      href: '/seluruh-layanan',
    },
  ]

  return (
    <section className="bg-white py-24 lg:py-28 px-4 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Bukti, Bukan Janji</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight sf-display-heavy leading-tight">
            Kami Lebih Suka Tunjukkan<br className="hidden md:block" /> daripada Sekadar Berjanji.
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Belum ada ratusan testimoni berbayar di sini. Yang ada: hal-hal yang bisa Anda buktikan sendiri sekarang.
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
        description: 'Pelanggan Anda sedang cari bisnis seperti milik Anda di Google sekarang. Apakah Anda muncul? Website dengan sistem booking dan katalog — live dalam 3–5 hari. Mulai Rp 600.000.',
        cta: 'Mulai Rakit Website',
        href: '/seluruh-layanan',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        isExternal: false,
      },
      {
        icon: Bus,
        label: 'Portal Travel & Rental',
        description: 'Sistem booking anti-bentrok. Pelanggan bisa cek ketersediaan unit, pilih tanggal, dan bayar langsung dari HP mereka.',
        cta: 'Lihat Demo',
        href: 'https://ja-rental-platform.vercel.app',
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        isExternal: true,
      },
      {
        icon: GraduationCap,
        label: 'Portal LMS',
        description: 'Tinggal upload materi sekali, sistem otomatis ngurus pendaftaran siswa, ujian, sampai penerbitan sertifikat secara mandiri.',
        cta: 'Lihat Demo',
        href: 'https://ja-lms-platform.vercel.app/demo',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        isExternal: true,
      },
      {
        icon: Cross,
        label: 'Portal Klinik',
        description: 'Gak ada lagi drama salah jadwal dokter atau rekam medis keselip. Semua riwayat pasien rapi, aman, dan bisa diakses dalam sekali klik.',
        cta: 'Lihat Demo',
        href: 'https://ja-clinic-platform.vercel.app/demo',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        isExternal: true,
      },
      {
        icon: Pill,
        label: 'Portal Farmasi',
        description: 'Pantau stok obat kedaluwarsa dan kelola resep digital tanpa pusing. Kasir langsung terhubung ke gudang secara real-time.',
        cta: 'Lihat Demo',
        href: 'https://ja-pharmacy-platform.vercel.app/demo',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        isExternal: true,
      },
      {
        icon: ShoppingBag,
        label: 'Layanan Jastip Jepang',
        description: 'Titip barang dari Jepang langsung ke rumah Anda. Rincian biaya jelas, pengiriman terlacak, tidak perlu khawatir barang hilang.',
        cta: 'Mulai Titip Barang',
        href: 'https://ja-jastip-platform.vercel.app',
        color: 'text-red-600',
        bg: 'bg-red-50',
        isExternal: true,
      },
    ]

    return (
        <section id="segmen" className="bg-white py-24 lg:py-32 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Pilih Bisnis Anda</p>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight sf-display-heavy">
                        Mulai dari Website.<br className="hidden md:block" /> Tambah Sistem Kalau Bisnis Sudah Butuh.
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                      Bukan template generik. Setiap sistem dibuat pas sesuai alur kerja bisnis kamu — mulai dari rental mobil, tempat kursus, sampai operasional klinik dan apotek.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {PORTALS.map((p, index) => {
                        const isFeatured = index === 0
                        const IconComponent = p.icon
                        return (
                        <div key={p.label} className="contents">
                        {/* Divider sebelum portal cards — muncul setelah featured card */}
                        {index === 1 && (
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
                        )}
                        <div
                          className={`group flex flex-col p-6 rounded-[32px] transition-all duration-500 hover:-translate-y-2 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-sm ${
                            isFeatured
                              ? 'bg-[#0071E3] border border-[#005BB5] shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300'
                              : 'bg-white border border-black/[0.03] apple-shadow hover:shadow-2xl'
                          }`}
                        >
                            <div className={`w-14 h-14 rounded-[8px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                              isFeatured ? 'bg-white/20 text-white' : `${p.bg} ${p.color}`
                            }`}>
                                <IconComponent size={26} />
                            </div>
                            {isFeatured && (
                              <span className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Produk Unggulan</span>
                            )}
                            <h3 className={`text-xl font-bold mb-3 sf-display ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{p.label}</h3>
                            <p className={`text-sm leading-relaxed mb-8 flex-1 ${isFeatured ? 'text-blue-50' : 'text-gray-500'}`}>{p.description}</p>
                            <a
                              href={p.href}
                              {...(p.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              className={`w-full py-3 rounded-full text-center text-sm font-bold transition-all ${
                                isFeatured
                                  ? 'bg-white text-[#0071E3] hover:bg-blue-50'
                                  : 'bg-gray-900 text-white hover:bg-black'
                              }`}
                            >
                                {p.cta}
                            </a>
                        </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function GlobalFeatures() {
    const FEATURES = [
        { title: 'Tidak Ada yang Lupa Bayar Lagi', desc: 'Sistem kirim reminder invoice dan konfirmasi jadwal ke WA pelanggan secara otomatis — tanpa Anda perlu ingat-ingat.', icon: MessageCircle },
        { title: 'Lihat Angka, Bukan Tebak-tebakan', desc: 'Buka dashboard dari HP kapanpun. Pemasukan hari ini, tren minggu ini — semuanya langsung tersaji, tidak perlu tunggu rekap manual.', icon: BarChart2 },
        { title: 'Data Bisnis Anda Tidak Bocor', desc: 'Data setiap bisnis disimpan terpisah—nggak bakal bercampur, nggak bisa diintip, dan langsung dilindungi enkripsi kelas enterprise.', icon: Shield },
    ]

    return (
        <section id="fitur" className="bg-[#F5F5F7] py-24 lg:py-32 px-4">
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
        { t: 'Isi Briefing, Sekitar 5 Menit', d: 'Logo, konten, gaya website — isi lewat form briefing. Tersimpan otomatis, boleh dicicil. Belum siap? Tim kami siapkan draf awalnya.', i: Zap },
        { t: 'Tim Bangun, Live 3–5 Hari', d: 'Kamu tinggal terima beres. Pantau progressnya via Order ID sampai website tayang di domainmu sendiri.', i: Rocket },
    ]

    const BADGES = [
        { t: 'Data Pembeli Aman', d: 'Nomor & transaksi pelanggan tersimpan terkunci — tidak bocor, tidak dijual', i: ShieldCheck },
        { t: 'Tidak Akan Hilang', d: 'Mau se-error apa pun sistemnya nanti, data kamu tetap aman karena otomatis di-backup tiap hari', i: HardDrive },
        { t: 'Anti-Ngadat Saat Rame', d: 'Pelanggan tetap bisa buka & pesan walau pengunjung membludak', i: Globe2 },
        { t: 'Bayar & Notif Otomatis', d: 'Pelanggan bayar via QRIS/transfer, pesanan masuk WhatsApp Anda sendiri', i: Zap },
    ]

    return (
        <section className="bg-[#F5F5F7] py-24 px-4 border-t border-black/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Cara Kerja</p>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight sf-display-heavy">Pesan Senin, Website Rilis Jumat —<br className="hidden md:block" /> Tanpa Kamu Harus Ngerti Coding</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {STEPS.map((s, i) => (
                        <div key={i} className={`relative p-8 rounded-[40px] bg-white border border-black/[0.03] apple-shadow overflow-hidden group reveal reveal-delay-${i + 1}`}>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0071E3]/5 rounded-full blur-2xl group-hover:bg-[#0071E3]/10 transition-colors" />
                            <div className="w-14 h-14 bg-[#F5F5F7] rounded-lg flex items-center justify-center mb-6 text-[#0071E3] group-hover:scale-110 transition-transform">
                                <s.i size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{s.t}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{s.d}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-20 border-t border-black/5">
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

function TestimonialSection() {
  return (
    <section className="bg-white py-24 px-4 border-t border-black/5">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Kata Mereka</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight sf-display-heavy mb-12">
          Cerita Pemilik Bisnis
        </h2>
        
        {/* Placeholder Box */}
        <div className="max-w-3xl mx-auto bg-[#F5F5F7] rounded-[32px] p-10 border border-dashed border-black/10 flex flex-col items-center justify-center min-h-[250px]">
          <MessageCircle size={32} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium text-lg mb-2">Belum ada testimoni berbayar di sini.</p>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Kami sedang mengumpulkan cerita asli dari klien-klien kami yang sistemnya sudah live dan berjalan. 
            Jadilah salah satu cerita sukses berikutnya.
          </p>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const FAQS = [
    {
      q: 'Berapa lama website saya selesai?',
      a: '3–5 hari kerja setelah brief dan DP diterima. Konten sederhana bisa selesai lebih cepat. Website dengan fitur custom bisa lebih lama — kami konfirmasi timeline pasti sebelum mulai.',
    },
    {
      q: 'Apakah saya bisa pakai domain sendiri?',
      a: 'Ya. Kami bantu pointing domain Anda ke sistem kami. Belum punya domain? Bisa pakai subdomain gratis (nama.japanarena.com) atau kami bantu daftarkan domain baru.',
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
      a: 'Website builder untuk tampilan online bisnis Anda — yang dilihat pelanggan. Portal adalah sistem operasional untuk jalankan bisnis dari dalam. Keduanya bisa dipakai terpisah atau bersamaan.',
    },
    {
      q: 'Apakah ada kontrak minimum atau bisa cancel kapan saja?',
      a: 'Tidak ada kontrak minimum. Untuk portal SaaS, bisa cancel kapan saja. Untuk website, hosting berjalan per tahun dan bisa tidak diperpanjang saat jatuh tempo.',
    },
  ]

  return (
    <section className="bg-white py-24 px-4 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight sf-display-heavy">
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
              href={waLink('Halo Japan Arena, saya punya pertanyaan sebelum mulai.')}
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
            href={waLink('Halo Japan Arena, saya ingin tanya soal layanan.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl active:scale-90 transition-transform"
          >
            <MessageCircle size={28} />
          </a>
        </div>

        <HeroSection onDemo={() => setDemoOpen(true)} />
        <SocialProofBar />
        <GlobalFeatures />
        <SegmenSection />
        <TrustSection />
        {/* <ProofSection /> */}
        {/* <PortfolioGallery /> */}
        <TestimonialSection />
        <FaqSection />

        <section id="harga" className="py-32 bg-[#070B14] relative overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, #0071E3, transparent)'}} />
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(ellipse 60% 60% at 80% 80%, #3B82F6, transparent)'}} />
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
              <p className="text-[12px] font-bold uppercase tracking-widest text-blue-400 mb-6">Mulai Sekarang</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white sf-display-heavy leading-[1.1]">
                Berhenti Ngurus Manual.<br className="hidden md:block" /> <span className="text-[#0071E3]">Mulai Hari Ini.</span>
              </h2>
              <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                Pilih industri Anda di kalkulator, lihat estimasinya, langsung pesan — tanpa nunggu sales.
                Masih ragu?{' '}
                <a
                  href={waLink('Halo Japan Arena Corp, saya mau tanya dulu sebelum mulai.')}
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
                          <Image src="/images/Icon.png" alt="Japan Arena Corp" width={40} height={40} className="object-contain" />
                          <span className="text-xl font-bold tracking-tight text-gray-900 sf-display-heavy">Japan Arena Corp</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                          Untuk bisnis yang sudah capek ngurus semuanya sendiri — dari website profesional sampai operasional yang berjalan otomatis. Tanpa ribet, tanpa drama.
                      </p>
                      <a
                          href={waLink('Halo Japan Arena Corp, saya ingin tanya soal layanan.')}
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
                          <li><a href="https://ja-lms-platform.vercel.app" className="hover:text-[#0071E3] transition-colors">LMS Portal</a></li>
                          <li><a href="https://ja-clinic-platform.vercel.app" className="hover:text-[#0071E3] transition-colors">Clinic Management</a></li>
                          <li><a href="https://ja-pharmacy-platform.vercel.app" className="hover:text-[#0071E3] transition-colors">Pharmacy System</a></li>
                          <li><a href="https://ja-jastip-platform.vercel.app" className="hover:text-[#0071E3] transition-colors">Jastip Smart System</a></li>
                          <li><Link href="/seluruh-layanan" className="hover:text-[#0071E3] transition-colors">Rakit Website Custom</Link></li>
                      </ul>
                  </div>

                  {/* Company Links */}
                  <div className="col-span-1 md:col-span-2 space-y-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Perusahaan</p>
                      <ul className="space-y-3 text-sm text-gray-500">
                          <li><span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Tentang Kami</span></li>
                          <li><span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Karir</span></li>
                          <li><span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Blog Edukasi</span></li>
                          <li><span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Partner Kami</span></li>
                      </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="col-span-full md:col-span-4 space-y-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Hubungi Kami</p>
                      <ul className="space-y-4 text-sm text-gray-500">
                          <li className="flex gap-3">
                              <MapPin size={18} className="text-[#0071E3] shrink-0" />
                              <span>Jakarta, Indonesia</span>                          </li>
                          <li className="flex gap-3">
                              <Mail size={18} className="text-[#0071E3] shrink-0" />
                              <span>contact@japanarena.com</span>
                          </li>
                          <li className="flex gap-3">
                              <Phone size={18} className="text-[#0071E3] shrink-0" />
                              <span>+62 812-9691-7963</span>
                          </li>
                      </ul>
                  </div>
              </div>

              {/* Bottom Copyright */}
              <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-[12px] text-gray-600 font-medium">
                      © {new Date().getFullYear()} Japan Arena Corp. All rights reserved.
                  </p>
                  <div className="flex gap-8 text-[12px] text-gray-600 font-medium">
                      <span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Kebijakan Privasi</span>
                      <span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Syarat & Ketentuan</span>
                      <span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Cookie Policy</span>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  )
}
