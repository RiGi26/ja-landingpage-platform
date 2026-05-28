'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X, LogIn, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PortalPickerModal from './PortalPickerModal'
import ServiceMegaMenu, { COLUMNS } from './ServiceMegaMenu'

const NAV_LINKS = [
  { label: 'Rakit Website', href: '/seluruh-layanan' },
  { label: 'Paket Langganan',   href: '/pricing' },
]

export default function LmsNavbar() {
  const [open,         setOpen]         = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [isMenuOpen,   setIsMenuOpen]   = useState(false)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  // Scroll listener — close mega menu on scroll + detect scrolled state
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20)
      if (window.scrollY > 20) closeMenu()
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [closeMenu])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Icon.png"
              alt="Japan Arena"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block whitespace-nowrap">
              Japan Arena Corp
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Home */}
            <Link
              href="/"
              className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            {/* Sistem & Portal — mega menu trigger */}
            <button
              onClick={() => setIsMenuOpen(v => !v)}
              className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                isMenuOpen ? 'text-[#0071E3]' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Sistem & Portal
              <ChevronDown
                size={14}
                strokeWidth={2.5}
                className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Jasa Jastip — Standalone Link */}
            <a
              href="https://ja-jastip-platform.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
            >
              Jasa Jastip
            </a>

            {/* Regular nav links */}
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPickerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-bold transition-all hover:bg-gray-800 shadow-md hover:shadow-lg active:scale-95"
            >
              <LogIn size={16} />
              Portal Login
            </button>

            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl px-4 py-6 space-y-4 shadow-2xl overflow-y-auto max-h-[80vh]">
            {/* Regular links */}
            <Link href="/" onClick={() => setOpen(false)} className="block text-lg font-bold text-gray-900 py-1">
              Home
            </Link>
            <a 
              href="https://ja-jastip-platform.vercel.app" 
              className="block text-lg font-bold text-red-600 py-1"
              onClick={() => setOpen(false)}
            >
              Jasa Jastip Jepang
            </a>
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-lg font-bold text-gray-900 py-1"
              >
                {l.label}
              </Link>
            ))}

            {/* Layanan — flat list by column */}
            <div className="pt-2 border-t border-black/5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0071E3] mb-3">
                Katalog Sistem & Portal
              </p>
              {COLUMNS.map(col => (
                <div key={col.title} className="mb-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    {col.emoji} {col.title}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {col.items.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="text-xs font-semibold text-gray-700 hover:text-[#0071E3] py-1 truncate transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-black/5">
              <button
                onClick={() => { setOpen(false); setIsPickerOpen(true) }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white font-black"
              >
                <LogIn size={18} /> Masuk ke Portal
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mega Menu (desktop only) */}
      <ServiceMegaMenu isOpen={isMenuOpen} onClose={closeMenu} />

      <PortalPickerModal isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} />
    </>
  )
}
