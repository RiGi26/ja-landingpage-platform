'use client'

import { useState } from 'react'
import {
  Users, MessageCircle, FileText, BookOpen, GraduationCap,
  Lock, Check, ArrowRight, Zap, Shield, Clock,
  X, Star, ChevronRight, Video, HardDrive, Globe2, LogIn, Building2, ShoppingBag, BarChart2,
  Facebook, Twitter, Instagram, Linkedin, ShieldCheck, LayoutGrid, Rocket, MapPin, Mail, Phone
} from 'lucide-react'
import Navbar from '@/components/LmsNavbar'
import LmsFaq from '@/components/LmsFaq'
import Image from 'next/image'

const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281296917963').trim()

const waLink = (msg?: string): string => {
  const base = `https://wa.me/${WA_NUMBER}`
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
}

// ─── Sections ───────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative bg-[#F5F5F7] pt-32 pb-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -mr-64 -mt-64 opacity-60" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white border border-black/5 text-[#0071E3] text-[11px] font-bold px-4 py-1.5 rounded-full apple-shadow">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Satu Platform, Berbagai Solusi Bisnis
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight sf-display-heavy">
              Otomasi Bisnis Anda.<br />
              <span className="text-[#0071E3]">Tanpa Ribet.</span>
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              Solusi SaaS dan ekosistem digital terpadu untuk LMS, Klinik, Jastip, hingga Website Builder. 
              Satu pintu untuk mengotomasi seluruh aspek operasional bisnis Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#segmen"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071E3] text-white font-bold rounded-full transition-all hover:bg-[#005BB5] shadow-lg glow-button"
              >
                Pilih Produk & Demo <ArrowRight size={18} />
              </a>
              <a
                href={waLink('Halo Japan Arena, saya ingin konsultasi sistem bisnis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 border border-black/5 font-bold rounded-full transition-all hover:bg-gray-50 apple-shadow"
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
          <div className="relative animate-fade-up" style={{animationDelay: '100ms'}}>
            <div className="bg-white rounded-[40px] border-[12px] border-black shadow-2xl overflow-hidden aspect-[4/3] relative">
                <div className="absolute inset-0 bg-[#F5F5F7] p-6">
                    {/* Header Mockup */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="bg-white rounded-lg px-4 py-1 text-[10px] font-mono text-gray-400 border border-black/5">dashboard.yourbusiness.com</div>
                    </div>
                    {/* Content Mockup */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[1,2,3].map(i => <div key={i} className="h-16 bg-white rounded-2xl apple-shadow border border-black/5" />)}
                    </div>
                    <div className="h-32 bg-white rounded-[24px] apple-shadow border border-black/5 p-4 flex items-center justify-center text-gray-300">
                        <BarChart2 size={32} />
                    </div>
                </div>
            </div>
            {/* Notifications overlay */}
            <div className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl apple-shadow border border-black/5 flex items-center gap-3 animate-bounce">
                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white"><MessageCircle size={16}/></div>
                <div>
                    <p className="text-[10px] font-bold text-gray-900">WA Notifikasi</p>
                    <p className="text-[9px] text-gray-400">Invoice terkirim otomatis</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function SocialProofBar() {
    return (
      <section className="bg-white border-y border-black/5 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-50 grayscale">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Dipercaya oleh</p>
          <div className="flex items-center gap-2">
            <GraduationCap size={20} />
            <span className="text-sm font-bold">Academy Japan</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 size={20} />
            <span className="text-sm font-bold">Medika Health</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span className="text-sm font-bold">Astra Jastip</span>
          </div>
        </div>
      </section>
    )
}

function SegmenSection() {
    const PORTALS = [
      {
        emoji: '🎓',
        label: 'Portal LMS',
        description: 'Otomasi sistem pengajaran dan pelatihan karyawan dalam satu platform cerdas & terpusat.',
        cta: 'Eksplor Portal',
        href: 'https://ja-lms-platform.vercel.app/demo',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        emoji: '🏥',
        label: 'Portal Klinik',
        description: 'Tingkatkan layanan kesehatan dengan rekam medis digital dan sistem antrean pasien otomatis.',
        cta: 'Cek Demo Medis',
        href: 'https://ja-clinic-platform.vercel.app/demo',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
      },
      {
        emoji: '💊',
        label: 'Portal Farmasi',
        description: 'Kendali penuh stok obat dan transaksi apotek dengan sistem POS yang terintegrasi.',
        cta: 'Tes Portal Farmasi',
        href: 'https://ja-pharmacy-platform.vercel.app/login',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
      },
      {
        emoji: '🇯🇵',
        label: 'Portal Jastip',
        description: 'Hitung biaya impor dan kelola pesanan jasa titip secara instan, akurat, dan transparan.',
        cta: 'Coba Sistem Jastip',
        href: 'https://ja-jastip-platform.vercel.app',
        color: 'text-red-600',
        bg: 'bg-red-50',
      },
      {
        emoji: '🌐',
        label: 'Website Builder',
        description: 'Hadirkan brand profesional Anda secara online dengan website instan yang siap pakai.',
        cta: 'Pilih Katalog Desain',
        href: 'https://ja-websitebuilder-platform-nfoa.vercel.app',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
    ]

    return (
        <section id="segmen" className="bg-white py-24 lg:py-32 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Our Solutions</p>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        Pilih Platform Sesuai Bisnis Anda
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {PORTALS.map((p, index) => (
                        <div 
                          key={p.label} 
                          className={`group flex flex-col p-8 rounded-[32px] bg-white border border-black/[0.03] apple-shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-sm`}
                        >
                            <div className={`w-14 h-14 ${p.bg} rounded-[20px] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                                {p.emoji}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{p.label}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">{p.description}</p>
                            <a href={p.href} target="_blank" className={`w-full py-3 rounded-full text-center text-sm font-bold transition-all bg-gray-900 text-white hover:bg-black`}>
                                {p.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function GlobalFeatures() {
    const FEATURES = [
        { title: 'Notifikasi WA Otomatis', desc: 'Reminder invoice, link zoom, dan OTP dikirim langsung ke WhatsApp pelanggan.', icon: MessageCircle },
        { title: 'Laporan Real-time', desc: 'Pantau grafik pemasukan dan performa bisnis kapanpun dari perangkat apa saja.', icon: BarChart2 },
        { title: 'Database Terisolasi', desc: 'Setiap tenant memiliki database mandiri (RLS) untuk keamanan data tingkat tinggi.', icon: Shield },
    ]

    return (
        <section id="fitur" className="bg-[#F5F5F7] py-24 lg:py-32 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {FEATURES.map(f => (
                        <div key={f.title} className="flex flex-col items-center text-center group">
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
        { t: '1. Pilih Portal', d: 'Pilih platform SaaS yang sesuai dengan kebutuhan bisnis Anda.', i: LayoutGrid },
        { t: '2. Aktivasi & Branding', d: 'Sistem disiapkan dalam 1-3 hari dengan logo & domain Anda.', i: Zap },
        { t: '3. Langsung Operasional', d: 'Bisnis Anda siap berjalan dengan otomasi penuh 24/7.', i: Rocket },
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
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">Simple Process</p>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight sf-display-heavy">Mulai Dalam 3 Langkah Mudah</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {STEPS.map((s, i) => (
                        <div key={i} className="relative p-10 rounded-[40px] bg-[#F5F5F7] border border-black/[0.03] apple-shadow overflow-hidden group">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0071E3]/5 rounded-full blur-2xl group-hover:bg-[#0071E3]/10 transition-colors" />
                            <div className="w-14 h-14 bg-white rounded-2xl apple-shadow flex items-center justify-center mb-6 text-[#0071E3] group-hover:scale-110 transition-transform">
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
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <SocialProofBar />
        <SegmenSection />
        <GlobalFeatures />
        <TrustSection />
        
        {/* Placeholder for FAQ / Footer which remains standard */}
        <section id="harga" className="py-24 bg-white border-t border-black/5">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-4xl font-black mb-6 tracking-tight text-gray-900 sf-display-heavy">Mulai Transformasi Bisnis Anda Hari Ini</h2>
                <p className="text-gray-500 mb-10 text-lg">Bergabunglah dengan puluhan bisnis yang telah mengotomasi operasional mereka bersama kami.</p>
                <a href={waLink('Halo Japan Arena Corp, saya ingin mendiskusikan implementasi sistem untuk bisnis saya.')} className="inline-block bg-[#0071E3] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 hover:bg-[#005BB5] transition-all glow-button">Hubungi Sales Specialist</a>
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
                          Penyedia solusi infrastruktur digital dan ekosistem SaaS terintegrasi untuk bisnis modern di Indonesia dan Jepang.
                      </p>
                      <div className="flex gap-4">
                          <a href="#" className="w-9 h-9 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Facebook size={18} /></a>
                          <a href="#" className="w-9 h-9 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Twitter size={18} /></a>
                          <a href="#" className="w-9 h-9 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Instagram size={18} /></a>
                          <a href="#" className="w-9 h-9 rounded-full bg-white apple-shadow flex items-center justify-center text-gray-400 hover:text-[#0071E3] transition-colors border border-black/5"><Linkedin size={18} /></a>
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
                          <li><a href="https://ja-websitebuilder.vercel.app" className="hover:text-[#0071E3] transition-colors">Website Builder</a></li>
                      </ul>
                  </div>

                  {/* Company Links */}
                  <div className="col-span-1 md:col-span-2 space-y-5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Perusahaan</h4>
                      <ul className="space-y-3 text-sm text-gray-500">
                          <li><a href="#" className="hover:text-[#0071E3] transition-colors">Tentang Kami</a></li>
                          <li><a href="#" className="hover:text-[#0071E3] transition-colors">Karir</a></li>
                          <li><a href="/blog" className="hover:text-[#0071E3] transition-colors">Blog Edukasi</a></li>
                          <li><a href="#" className="hover:text-[#0071E3] transition-colors">Partner Kami</a></li>
                      </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="col-span-full md:col-span-4 space-y-5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Hubungi Kami</h4>
                      <ul className="space-y-4 text-sm text-gray-500">
                          <li className="flex gap-3">
                              <MapPin size={18} className="text-[#0071E3] shrink-0" />
                              <span>Jakarta, Indonesia • Tokyo, Japan</span>
                          </li>
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
