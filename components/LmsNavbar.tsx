'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281296917963'
const waUrl = `https://wa.me/${WA_NUMBER}`

const NAV_LINKS = [
  { label: 'Fitur',   href: '#fitur'   },
  { label: 'Segmen',  href: '#segmen'  },
  { label: 'Harga',   href: '#harga'   },
  { label: 'Demo',    href: '#demo'    },
]

export default function LmsNavbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-200 ${
        scrolled ? 'shadow-sm border-b border-gray-100' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <Image
            src="/images/logo-light.jpg"
            alt="Japan Arena Corp"
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-black text-white transition-all hover:scale-[1.02] shadow-sm shadow-blue-200"
        >
          Konsultasi Gratis
        </a>

        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900 py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-700"
          >
            Hubungi Kami
          </a>
        </div>
      )}
    </header>
  )
}
