'use client'

import { useEffect, useRef } from 'react'

const WA_NUMBER   = process.env.NEXT_PUBLIC_WA_NUMBER  ?? '6281296917963'
const LMS_URL     = process.env.NEXT_PUBLIC_LMS_URL    ?? 'https://lms.webzoka.com'
const CLINIC_BASE = (process.env.NEXT_PUBLIC_CLINIC_URL ?? 'https://ja-clinic-platform.vercel.app/auth/login').split('/auth/')[0]
const JASTIP_URL  = process.env.NEXT_PUBLIC_JASTIP_URL ?? 'https://ja-jastip-platform.vercel.app'

const STUDIO_URL = 'https://ja-websitebuilder-platform-nfoa.vercel.app'

function wa(service: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo Webzoka, saya tertarik dengan layanan ${service}.`)}`
}

type ColItem = { label: string; desc: string; href: string }
type Column  = { emoji: string; title: string; color: string; bg: string; items: ColItem[] }

const COLUMNS: Column[] = [
  {
    emoji: '🌐',
    title: 'Website Profil & Branding',
    color: 'text-[#0071E3]',
    bg   : 'bg-blue-50',
    items: [
      { label: 'All-in Rp 600rb — Domain + Hosting + SSL', desc: 'Selesai 3–5 hari kerja, tanpa biaya tersembunyi', href: '/seluruh-layanan' },
      { label: 'Company Profile',    desc: 'Website perusahaan modern',         href: '/seluruh-layanan' },
      { label: 'Website Sekolah/LPK',desc: 'Portal resmi lembaga pendidikan',   href: '/seluruh-layanan' },
      { label: 'Website Toko Online',desc: 'Jual produk fisik & digital',        href: '/seluruh-layanan' },
      { label: 'Landing Page Event', desc: 'Halaman promosi & registrasi',      href: '/seluruh-layanan' },
      { label: 'Custom Add-on',      desc: 'Tambah fitur sesuai kebutuhan',     href: '/seluruh-layanan' },
    ],
  },
  {
    emoji: '🎓',
    title: 'Portal Sistem (LMS)',
    color: 'text-emerald-700',
    bg   : 'bg-emerald-50',
    items: [
      { label: 'LMS Sekolah & Bimbel', desc: 'Sistem operasional pendidikan',      href: `${LMS_URL}/demo`              },
      { label: 'PPDB Online Portal',   desc: 'Pendaftaran siswa terpusat',         href: `${LMS_URL}/demo`              },
      { label: 'Portal Siswa & Guru',  desc: 'Manajemen nilai & materi',           href: `${LMS_URL}/demo`              },
      { label: 'Quiz & CBT Online',    desc: 'Tryout & simulasi ujian online',      href: wa('Quiz & CBT Online')        },
      { label: 'Sertifikat Otomatis',  desc: 'Auto-generate sertifikat lulus',      href: wa('Sertifikat Otomatis')      },
    ],
  },
  {
    emoji: '🏥',
    title: 'Portal Sistem Operasional',
    color: 'text-indigo-700',
    bg   : 'bg-indigo-50',
    items: [
      { label: 'Portal Klinik & Medis',  desc: 'Rekam medis, antrian, billing',   href: `${CLINIC_BASE}/demo`           },
      { label: 'Sistem Travel & Rental', desc: 'Manajemen armada & e-ticketing',   href: 'https://ja-rental-platform.vercel.app/auth/login' },
      { label: 'Apotek & Farmasi',       desc: 'Stok obat & POS Kasir',            href: 'https://ja-pharmacy-platform.vercel.app/login' },
      { label: 'Portal Stok & Operasi',  desc: 'Stok, produksi/BOM, kasir & keuangan', href: 'https://stock.japanarena.id'   },
      { label: 'Dashboard Bisnis Pro',   desc: 'Monitoring real-time omzet',       href: wa('Dashboard Bisnis')          },
      { label: 'Membership System',      desc: 'Sistem member & plan premium',     href: wa('Membership & Langganan')    },
    ],
  },
  {
    emoji: '⚙️',
    title: 'Otomasi & Integrasi',
    color: 'text-rose-700',
    bg   : 'bg-rose-50',
    items: [
      { label: 'Notifikasi WA Otomatis', desc: 'Reminder & broadcast WA',         href: wa('Notifikasi WA Otomatis')    },
      { label: 'Midtrans Payment',       desc: 'Integrasi gerbang pembayaran',     href: wa('Midtrans Payment')          },
      { label: 'Google Sheets Sync',     desc: 'Sinkronisasi data spreadsheet',    href: wa('Google Sheets Sync')        },
      { label: 'Zoom Integration',       desc: 'Auto-create link virtual room',    href: wa('Zoom Integration')          },
      { label: 'Custom Workflow',        desc: 'Automasi sesuai kebutuhan',        href: wa('Custom Workflow')           },
    ],
  },
]

const WA_GENERAL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Webzoka, saya ingin konsultasi mengenai layanan yang tersedia.')}`

// Hover color per column index
const HOVER_CLASSES = [
  'hover:bg-blue-50/60 hover:text-[#0071E3]',
  'hover:bg-emerald-50/60 hover:text-emerald-700',
  'hover:bg-indigo-50/60 hover:text-indigo-700',
  'hover:bg-rose-50/60 hover:text-rose-700',
]

export default function ServiceMegaMenu({
  isOpen,
  onClose,
}: {
  isOpen : boolean
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Invisible backdrop — click outside to close */}
      <div
        className="fixed inset-0 z-[49]"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel — fixed, right below navbar (h-16 = 64px) */}
      <div
        ref={panelRef}
        className="fixed top-16 left-0 right-0 z-50 px-4 lg:px-6 pointer-events-none"
        style={{
          animation: 'megaMenuIn 0.18s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
      >
        <style>{`
          @keyframes megaMenuIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>

        <div
          className="pointer-events-auto max-w-6xl mx-auto bg-white rounded-2xl border border-black/5 p-6 lg:p-8"
          style={{ boxShadow: '0 20px 40px -15px rgba(0,0,0,0.12)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* 4-column grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {COLUMNS.map((col, ci) => (
              <div key={col.title}>
                {/* Column Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-7 h-7 ${col.bg} rounded-lg flex items-center justify-center text-base flex-shrink-0`}>
                    <span role="img" aria-hidden>{col.emoji}</span>
                  </div>
                  <p className={`text-[11px] font-bold uppercase tracking-widest ${col.color}`}>
                    {col.title}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-0.5">
                  {col.items.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className={`flex flex-col p-2 rounded-xl transition-colors duration-150 group ${HOVER_CLASSES[ci]}`}
                    >
                      <span className="text-xs font-bold text-gray-900 group-hover:inherit leading-tight">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                        {item.desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-gray-400">
              Semua layanan tersedia on-request · Konsultasi gratis via WhatsApp
            </p>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0071E3] text-white text-[12px] font-bold hover:bg-[#005BB5] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Chat Sekarang →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// Export COLUMNS so LmsNavbar can use for mobile flat list
export { COLUMNS }
