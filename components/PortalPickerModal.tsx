'use client'

import { useState, useEffect } from 'react'
import { X, LayoutDashboard, GraduationCap, Building2, ShoppingBag, ArrowRight, LogIn } from 'lucide-react'

export default function PortalPickerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  const PORTALS = [
    {
      title: 'Portal Belajar (LMS)',
      desc: 'Masuk ke dashboard kursus atau sekolah Anda.',
      icon: GraduationCap,
      href: 'https://ja-lms-platform.vercel.app/auth/login',
      color: 'bg-blue-50 text-blue-600',
      btn: 'bg-blue-600'
    },
    {
      title: 'Portal Klinik & Medis',
      desc: 'Manajemen rekam medis dan antrean pasien.',
      icon: Building2,
      href: 'https://ja-clinic-platform.vercel.app/auth/login',
      color: 'bg-emerald-50 text-emerald-600',
      btn: 'bg-emerald-600'
    },
    {
      title: 'Portal Jastip Jepang',
      desc: 'Hitung biaya dan kelola pesanan titipan.',
      icon: ShoppingBag,
      href: 'https://ja-jastip-platform.vercel.app',
      color: 'bg-red-50 text-red-600',
      btn: 'bg-red-600'
    }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-pop border border-black/5">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl sf-display-heavy text-[#1D1D1F]">Pilih Portal Anda</h2>
              <p className="text-gray-500 mt-1">Silakan masuk ke layanan yang Anda gunakan.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PORTALS.map((p) => (
              <a 
                key={p.title} 
                href={p.href}
                className="group flex flex-col p-6 rounded-3xl bg-white border border-black/[0.03] apple-shadow hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${p.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <p.icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 leading-tight mb-2">{p.title}</h3>
                <p className="text-xs text-gray-500 mb-6 flex-1">{p.desc}</p>
                <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Login <ArrowRight size={14} className="ml-1" />
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
