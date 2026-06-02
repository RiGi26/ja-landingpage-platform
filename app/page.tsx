'use client'

import { useState, useEffect } from 'react'
import {
  Users, MessageCircle, FileText, BookOpen, GraduationCap,
  Lock, Check, ArrowRight, Zap, Shield, Clock,
  X, Star, ChevronRight, Video, HardDrive, Globe2, LogIn, Building2, ShoppingBag, BarChart2,
  Facebook, Twitter, Instagram, Linkedin, ShieldCheck, LayoutGrid, Rocket, MapPin, Mail, Phone,
  Bus, Pill, Cross
} from 'lucide-react'
import Navbar from '@/components/LmsNavbar'
import AnimatedHeroMockup from '@/components/AnimatedHeroMockup'
import PortfolioGallery from '@/components/PortfolioGallery'
import Image from 'next/image'
import Link from 'next/link'

const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281296917963').trim()

const waLink = (msg?: string): string => {
  const base = `https://wa.me/${WA_NUMBER}`
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
}

// ─── Sections ───────────────────────────────────────────────────────────────

function HeroSection() {
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
              Satu Platform, Berbagai Solusi Bisnis
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight sf-display-heavy">
              Bisnis Anda Bisa<br />
              <span className="text-[#0071E3]">Jalan Sendiri.</span>
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              Masih rekap manual setiap malam? Masih telepon satu-satu untuk tagih pembayaran?
              Klien kami rata-rata memangkas <span className="text-gray-900 font-semibold">70% waktu admin</span> —
              karena invoice, notifikasi WA, dan laporan harian sudah berjalan otomatis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={waLink('Halo Japan Arena Corp, saya ingin lihat demo sistem untuk bisnis saya.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071E3] text-white font-bold rounded-full transition-all hover:bg-[#005BB5] shadow-lg glow-button"
              >
                Chat & Lihat Demo Gratis <ArrowRight size={18} />
              </a>
              <a
                href={waLink('Halo Japan Arena, saya ingin konsultasi sistem bisnis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 border border-black/5 font-bold rounded-full transition-all hover:bg-gray-50 active:scale-[0.96] apple-shadow"
              >
                Konsultasi WA
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-gray-400 font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Setup 1–3 hari</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Tanpa Coding</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Enterprise Security</span>
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
    { value: '6+', label: 'Platform Aktif' },
    { value: '1–3 hari', label: 'Waktu Setup' },
    { value: '24/7', label: 'Sistem Berjalan' },
    { value: '100%', label: 'Tanpa Coding' },
  ]
  return (
    <section className="bg-white border-y border-black/5 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {STATS.map(s => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="text-lg font-extrabold text-gray-900 sf-display-heavy">{s.value}</span>
            <span className="text-[12px] text-gray-400 font-medium border-l border-black/10 pl-3">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SegmenSection() {
    const PORTALS = [
      {
        icon: Globe2,
        label: 'Katalog Website',
        description: 'Website profil bisnis profesional, instan, dan terjangkau. Mulai dari Rp 600.000.',
        cta: 'Mulai Rakit Website',
        href: '/seluruh-layanan',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        isExternal: false,
      },
      {
        icon: Bus,
        label: 'Portal Travel & Rental',
        description: 'Sistem manajemen transportasi antar kota dan operasional penyewaan armada dengan fitur pelacakan real-time dan e-ticketing.',
        cta: 'Eksplor Sistem Travel',
        href: 'https://ja-rental-platform.vercel.app',
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        isExternal: true,
      },
      {
        icon: GraduationCap,
        label: 'Portal LMS',
        description: 'Otomasi sistem pengajaran dan pelatihan karyawan dalam satu platform cerdas & terpusat.',
        cta: 'Eksplor Portal',
        href: 'https://ja-lms-platform.vercel.app/demo',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        isExternal: true,
      },
      {
        icon: Cross,
        label: 'Portal Klinik',
        description: 'Tingkatkan layanan kesehatan dengan rekam medis digital dan sistem antrean pasien otomatis.',
        cta: 'Eksplor Portal Klinik',
        href: 'https://ja-clinic-platform.vercel.app/demo',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        isExternal: true,
      },
      {
        icon: Pill,
        label: 'Portal Farmasi',
        description: 'Kendali penuh stok obat dan transaksi apotek dengan sistem POS yang terintegrasi.',
        cta: 'Eksplor Portal Farmasi',
        href: 'https://ja-pharmacy-platform.vercel.app/login',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        isExternal: true,
      },
      {
        icon: ShoppingBag,
        label: 'Layanan Jastip Jepang',
        description: 'Jasa titip profesional dari Jepang ke Indonesia. Belanja barang impian Anda dengan kalkulasi biaya transparan dan pengiriman express.',
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
                    <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Solusi Kami</p>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight sf-display-heavy">
                        Satu Ekosistem,<br className="hidden md:block" /> Semua Kebutuhan Bisnis
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                      Pilih sistem yang cocok — atau gabungkan semuanya. Setiap platform sudah terintegrasi satu sama lain.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {PORTALS.map((p, index) => {
                        const isFeatured = index === 0
                        const IconComponent = p.icon
                        return (
                        <div
                          key={p.label}
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
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-2">Produk Unggulan</span>
                            )}
                            <h3 className={`text-xl font-bold mb-3 sf-display ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{p.label}</h3>
                            <p className={`text-sm leading-relaxed mb-8 flex-1 ${isFeatured ? 'text-blue-100' : 'text-gray-500'}`}>{p.description}</p>
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
        { title: 'Lihat Angka, Bukan Tebak-tebakan', desc: 'Buka dashboard dari HP kapanpun. Pemasukan hari ini, tren minggu ini — semua sudah tersaji, bukan menunggu rekap manual.', icon: BarChart2 },
        { title: 'Data Bisnis Anda Tidak Bocor', desc: 'Setiap bisnis punya ruang data sendiri yang terisolasi. Tidak bercampur, tidak bisa diintip — enkripsi enterprise dari hari pertama.', icon: Shield },
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
        { t: 'Pilih & Konsultasi', d: 'Ceritakan bisnis Anda. Kami bantu tentukan platform mana yang paling cocok — tanpa jargon teknis.', i: LayoutGrid },
        { t: 'Kami Setup dalam 1–3 Hari', d: 'Logo, domain, dan sistem dikonfigurasi tim kami. Anda tidak perlu sentuh satu baris kode pun.', i: Zap },
        { t: 'Bisnis Jalan, Anda Santai', d: 'Pembayaran masuk, notifikasi terkirim, laporan tersaji — semua berjalan sendiri 24/7.', i: Rocket },
    ]

    const BADGES = [
        { t: 'Enterprise Security', d: '256-bit SSL Encryption', i: ShieldCheck },
        { t: 'Daily Backups', d: 'Data aman & terproteksi', i: HardDrive },
        { t: 'High Availability', d: '99.9% Uptime Guarantee', i: Globe2 },
        { t: 'Official Integration', d: 'Midtrans & WA Gateway', i: Zap },
    ]

    return (
        <section className="bg-white py-24 px-4 border-t border-black/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Cara Kerja</p>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight sf-display-heavy">Dari Nol ke Operasional<br className="hidden md:block" /> dalam 3 Hari</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {STEPS.map((s, i) => (
                        <div key={i} className={`relative p-8 rounded-[40px] bg-[#F5F5F7] border border-black/[0.03] apple-shadow overflow-hidden group reveal reveal-delay-${i + 1}`}>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0071E3]/5 rounded-full blur-2xl group-hover:bg-[#0071E3]/10 transition-colors" />
                            <div className="w-14 h-14 bg-white rounded-lg apple-shadow flex items-center justify-center mb-6 text-[#0071E3] group-hover:scale-110 transition-transform">
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
                                <p className="text-[10px] text-gray-400 font-medium">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LandingPage() {
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
      
      <main>
        <HeroSection />
        <SocialProofBar />
        <SegmenSection />
        <PortfolioGallery />
        <GlobalFeatures />
        <TrustSection />
        
        <section id="harga" className="py-32 bg-[#070B14] relative overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, #0071E3, transparent)'}} />
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(ellipse 60% 60% at 80% 80%, #3B82F6, transparent)'}} />
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
              <p className="text-[12px] font-bold uppercase tracking-widest text-blue-400 mb-6">Mulai Sekarang</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white sf-display-heavy leading-[1.1]">
                Berapa jam seminggu Anda<br className="hidden md:block" /> habiskan untuk hal yang<br className="hidden md:block" /> <span className="text-[#0071E3]">bisa diotomasi?</span>
              </h2>
              <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                Bisnis yang bergabung dengan kami rata-rata memangkas waktu admin hingga 70%.
                Satu percakapan WA — kami tunjukkan sistemnya langsung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={waLink('Halo Japan Arena Corp, saya ingin lihat demo sistem untuk bisnis saya.')}
                  className="inline-flex items-center justify-center gap-2 bg-[#0071E3] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 hover:bg-[#005BB5] transition-all glow-button"
                >
                  Chat & Lihat Demo Gratis <ArrowRight size={18} />
                </a>
                <a
                  href="#segmen"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/20 active:scale-[0.96] transition-all backdrop-blur-sm"
                >
                  Jelajahi Platform
                </a>
              </div>
              <p className="text-gray-600 text-sm mt-8">Tidak ada komitmen. Tidak ada biaya konsultasi.</p>
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
                      <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                          Penyedia solusi infrastruktur digital dan ekosistem sistem operasional terintegrasi untuk bisnis modern di Indonesia.
                      </p>
                      <div className="flex gap-4">
                          <a href="#" aria-label="Facebook" className="w-11 h-11 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Facebook size={18} /></a>
                          <a href="#" aria-label="Twitter" className="w-11 h-11 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Twitter size={18} /></a>
                          <a href="#" aria-label="Instagram" className="w-11 h-11 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Instagram size={18} /></a>
                          <a href="#" aria-label="LinkedIn" className="w-11 h-11 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Linkedin size={18} /></a>
                      </div>
                  </div>

                  {/* Product Links */}
                  <div className="col-span-1 md:col-span-2 space-y-5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Platform</h4>
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
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Perusahaan</h4>
                      <ul className="space-y-3 text-sm text-gray-500">
                          <li><a href="#" className="hover:text-[#0071E3] transition-colors">Tentang Kami</a></li>
                          <li><a href="#" className="hover:text-[#0071E3] transition-colors">Karir</a></li>
                          <li><span className="opacity-40 cursor-not-allowed select-none" aria-disabled="true" title="Segera hadir">Blog Edukasi</span></li>
                          <li><a href="#" className="hover:text-[#0071E3] transition-colors">Partner Kami</a></li>
                      </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="col-span-full md:col-span-4 space-y-5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Hubungi Kami</h4>
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
                  <p className="text-[12px] text-gray-400 font-medium">
                      © {new Date().getFullYear()} Japan Arena Corp. All rights reserved.
                  </p>
                  <div className="flex gap-8 text-[12px] text-gray-400 font-medium">
                      <a href="#" className="hover:text-gray-900 transition-colors">Kebijakan Privasi</a>
                      <a href="#" className="hover:text-gray-900 transition-colors">Syarat & Ketentuan</a>
                      <a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  )
}
