'use client'

import { useState } from 'react'
import {
  Users, MessageCircle, FileText, BookOpen, GraduationCap,
  Lock, Check, ArrowRight, Zap, Shield, Clock,
  X, Star, ChevronRight, Video, HardDrive, Globe2, LogIn, Building2, ShoppingBag
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
              Solusi SaaS manajemen operasional untuk LMS, Klinik, dan Jastip. 
              Satu dashboard untuk mengelola seluruh aspek bisnis Anda.
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
        description: 'Untuk kursus, bimbel, sekolah, dan training karyawan korporasi.',
        cta: 'Demo LMS',
        href: 'https://ja-lms-platform.vercel.app/demo',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        emoji: '🏥',
        label: 'Portal Klinik',
        description: 'Manajemen rekam medis, antrean, dan billing apotek dalam satu sistem.',
        cta: 'Demo Klinik',
        href: 'https://ja-clinic-platform.vercel.app/demo',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
      },
      {
        emoji: '🇯🇵',
        label: 'Portal Jastip',
        description: 'Smart calculator otomatis untuk bisnis jasa titip barang luar negeri.',
        cta: 'Coba Jastip',
        href: 'https://ja-jastip-platform.vercel.app',
        color: 'text-red-600',
        bg: 'bg-red-50',
      },
      {
        emoji: '🌐',
        label: 'Website Builder',
        description: 'Hadirkan brand Anda secara online dalam waktu kurang dari 24 jam.',
        cta: 'Lihat Detail',
        href: 'https://ja-websitebuilder.vercel.app',
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PORTALS.map(p => (
                        <div key={p.label} className="group flex flex-col p-8 rounded-[32px] bg-white border border-black/[0.03] apple-shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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

// ─── Main Page ───────────────────────────────────────────────────────────────

import { BarChart2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <SocialProofBar />
        <SegmenSection />
        <GlobalFeatures />
        
        {/* Placeholder for FAQ / Footer which remains standard */}
        <section id="harga" className="py-24 bg-white border-t border-black/5">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-3xl font-black mb-6">Mulai Transformasi Bisnis Anda Hari Ini</h2>
                <a href={waLink()} className="inline-block bg-[#0071E3] text-white px-10 py-4 rounded-full font-black shadow-lg hover:scale-105 transition-all">Hubungi Sales Specialist</a>
            </div>
        </section>
      </main>

      <footer className="bg-[#1D1D1F] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                  <Image src="/images/Icon.png" alt="Logo" width={32} height={32} className="invert brightness-0" />
                  <span className="font-bold">Japan Arena Corp</span>
              </div>
              <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Japan Arena. All rights reserved.</p>
          </div>
      </footer>
    </div>
  )
}
