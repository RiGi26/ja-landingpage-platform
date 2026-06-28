'use client'

import { useState, useEffect } from 'react'
import { X, LayoutDashboard, GraduationCap, Building2, ShoppingBag, ArrowRight, LogIn, Pill, Boxes } from 'lucide-react'

export default function PortalPickerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  const PORTALS = [
    {
      title: 'Portal Belajar (LMS)',
      desc: 'Login ke dashboard kursus atau sekolah Anda.',
      icon: GraduationCap,
      href: 'https://lms.webzoka.com/auth/login',
      color: 'bg-blue-50 text-blue-600',
      btn: 'bg-blue-600'
    },
    {
      title: 'Portal Klinik & Medis',
      desc: 'Manajemen rekam medis dan antrean pasien.',
      icon: Building2,
      href: 'https://klinik.webzoka.com/auth/login',
      color: 'bg-emerald-50 text-emerald-600',
      btn: 'bg-emerald-600'
    },
    {
      title: 'Portal Farmasi (Apotek)',
      desc: 'Manajemen stok obat dan kasir apotek terpadu.',
      icon: Pill,
      href: 'https://apotek.webzoka.com/login',
      color: 'bg-indigo-50 text-indigo-600',
      btn: 'bg-indigo-600'
    },
    {
      title: 'Portal Stok & Operasi',
      desc: 'Stok, produksi/BOM, kasir & laporan keuangan.',
      icon: Boxes,
      href: 'https://stock.webzoka.com/login',
      color: 'bg-amber-50 text-amber-600',
      btn: 'bg-amber-600'
    },
    {
      title: 'Portal Jastip Jepang',
      desc: 'Hitung biaya dan kelola pesanan titipan.',
      icon: ShoppingBag,
      href: 'https://jastip.webzoka.com',
      color: 'bg-red-50 text-red-600',
      btn: 'bg-red-600'
    },
    {
      title: 'Portal Travel & Rental',
      desc: 'Manajemen armada, e-ticketing, dan live tracking.',
      icon: LayoutDashboard,
      href: 'https://rental.webzoka.com/auth/login',
      color: 'bg-sky-50 text-sky-600',
      btn: 'bg-sky-600'
    }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-pop border border-black/5">
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl sf-display-heavy text-[#1D1D1F]">Pilih Portal Anda</h2>
              <p className="text-sm text-gray-500 mt-1">Silakan login ke layanan yang Anda gunakan.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {PORTALS.map((p) => (
              <a 
                key={p.title} 
                href={p.href}
                className="group flex flex-row items-center gap-4 p-5 md:p-6 rounded-3xl bg-white border border-black/[0.03] apple-shadow hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 ${p.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <p.icon size={28} />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 leading-tight mb-1 md:mb-2 text-sm md:text-base">{p.title}</h3>
                    <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2">{p.desc}</p>
                    <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform mt-3">
                        Login <ArrowRight size={14} className="ml-1" />
                    </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Enterprise Access Active</span>
            </div>
            <p className="text-[11px] text-gray-400">Punya domain kustom? Silakan login langsung via domain Anda.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
