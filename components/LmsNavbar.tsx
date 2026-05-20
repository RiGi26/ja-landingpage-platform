'use client'

import { useState, useEffect } from 'react'
import { Menu, X, LogIn } from 'lucide-react'
import Image from 'next/image'
import PortalPickerModal from './PortalPickerModal'

const NAV_LINKS = [
  { label: 'Fitur',   href: '#fitur'   },
  { label: 'Solusi',  href: '#segmen'  },
  { label: 'Harga',   href: '#harga'   },
]

export default function LmsNavbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/images/Icon.png"
              alt="Japan Arena"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">Japan Arena</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

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

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl px-4 py-6 space-y-4 shadow-2xl">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-lg font-bold text-gray-900 py-1"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-4 border-t border-black/5">
                <button
                    onClick={() => { setOpen(false); setIsPickerOpen(true); }}
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
