'use client'

import { useState, useEffect } from 'react'
import { Menu, X, LogIn, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PortalPickerModal from './PortalPickerModal'
import { WB_URL as WEBSITEBUILDER_URL } from '@/constants/site'

const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281296917963').trim()
const waLink = (msg?: string) => {
  const base = `https://wa.me/${WA_NUMBER}`
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
}

const NAV_LINKS = [
  { label: 'Buat Website', href: '/seluruh-layanan' },
  // "Sistem Bisnis" saja tidak mengomunikasikan bahwa ini halaman harga.
  { label: 'Harga Sistem Bisnis', href: '/pricing' },
]

export default function LmsNavbar() {
  const [open,         setOpen]         = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  // Detect scrolled state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo-wide-clean.png"
              alt="Webzoka — Part of Japan Arena Corp"
              width={170}
              height={56}
              className="h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Home */}
            <Link
              href="/"
              className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            {/* Regular nav links */}
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}

          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href={waLink('Halo Webzoka, saya ingin lihat demo sistem untuk bisnis saya.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#0071E3] text-white text-sm font-bold rounded-full transition-all hover:bg-[#005BB5] active:scale-[0.96] glow-button"
            >
              <MessageCircle size={15} />
              Konsultasi Gratis
            </a>
            <div className="hidden sm:flex flex-col items-center">
              <button
                onClick={() => setIsPickerOpen(true)}
                title="Sudah punya akun? Login di sini"
                className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
              >
                <LogIn size={15} />
                Masuk Pelanggan
              </button>
              <a
                href={`${WEBSITEBUILDER_URL}/track`}
                className="text-xs text-gray-400 hover:text-gray-600 text-center block mt-1"
              >
                Lacak pesanan →
              </a>
            </div>

            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <>
            {/* Scrim — batas menu vs konten halaman, sekaligus area tap untuk menutup.
                Absolute (bukan fixed): header ber-backdrop-blur jadi containing block. */}
            <div
              className="md:hidden absolute top-full left-0 w-full h-screen bg-black/40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="md:hidden absolute top-full left-0 w-full border-t border-black/5 bg-white shadow-2xl p-6 flex flex-col gap-2 animate-fade-in-down">
              <Link href="/" onClick={() => setOpen(false)} className="block text-lg font-bold text-gray-900 py-2.5">
                Home
              </Link>
              {NAV_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-bold text-gray-900 py-2.5"
                >
                  {l.label}
                </Link>
              ))}

              {/* CTA konversi — drawer sebelumnya hanya menawarkan login (pelanggan lama),
                  tak ada jalan bagi pengunjung baru untuk mulai. */}
              <div className="pt-4 mt-2 border-t border-black/5 flex flex-col gap-2.5">
                <a
                  href={waLink('Halo Webzoka, saya ingin konsultasi soal website / sistem untuk bisnis saya.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#0071E3] text-white font-black transition-transform active:scale-[0.96]"
                >
                  <MessageCircle size={18} /> Konsultasi Gratis
                </a>
                <button
                  onClick={() => { setOpen(false); setIsPickerOpen(true) }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-gray-900 border border-gray-200 font-bold transition-transform active:scale-[0.96]"
                >
                  <LogIn size={18} /> Masuk Layanan
                </button>
                <a
                  href={`${WEBSITEBUILDER_URL}/track`}
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-medium text-gray-500 hover:text-gray-700 py-2.5"
                >
                  Lacak pesanan →
                </a>
              </div>
            </div>
          </>
        )}
      </header>

      <PortalPickerModal isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} />
    </>
  )
}
