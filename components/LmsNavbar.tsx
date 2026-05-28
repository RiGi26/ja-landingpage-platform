'use client'

import { useState, useEffect } from 'react'
import { Menu, X, LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PortalPickerModal from './PortalPickerModal'

const NAV_LINKS = [
  { label: 'Rakit Website', href: '/seluruh-layanan' },
  { label: 'Paket Langganan',   href: '/pricing' },
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
              src="/images/Icon.png"
              alt="Japan Arena"
              width={32}
              height={32}
              className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block whitespace-nowrap">
              Japan Arena Corp
            </span>
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
          <div className="md:hidden absolute top-full left-0 w-full border-t border-black/5 bg-white shadow-2xl p-6 flex flex-col gap-4 animate-fade-in-down">
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

      <PortalPickerModal isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} />
    </>
  )
}
