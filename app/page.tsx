'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  ExternalLink,
  Globe2,
  LayoutDashboard,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { waLink as buildWaLink } from '@/constants/site'

const STORE_PATH = '/store'
const PACKAGE_PATH = '/seluruh-layanan'
const STOCK_DEMO_URL = 'https://stock.webzoka.com/demo'
const JAPAN_ARENA_URL = 'https://www.japanarena.id'
const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL?.trim() || ''
const WA_MESSAGE = 'Halo Webzoka, saya ingin konsultasi soal website dan sistem untuk bisnis saya.'
const WHATSAPP_URL = buildWaLink(WA_MESSAGE)

type Status = 'Live' | 'Preview' | 'Case study'

const exploreNavItems = [
  { label: 'Solusi', href: '#solusi' },
  { label: 'Webzoka Store', href: STORE_PATH, external: true },
  { label: 'Karya', href: '#karya' },
  { label: 'Harga', href: '#harga' },
]

const learnNavItems = [
  { label: 'Artikel', href: '' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Komitmen Kami', href: '#komitmen' },
]

const faqItems = [
  {
    question: 'Apa bedanya Website, Portal, dan Bundle?',
    answer:
      'Website membantu bisnis ditemukan dan dipercaya. Portal merapikan kerja harian seperti pesanan, status, stok, atau tim. Bundle menghubungkan keduanya dalam satu jalur mulai.',
  },
  {
    question: 'Apa yang termasuk dalam harga mulai Rp600k?',
    answer:
      'Angka tersebut adalah harga awal Website dari paket dasar. Scope final mengikuti jumlah halaman, kesiapan konten, integrasi, dan level dukungan. Detailnya bisa kamu cek di Store sebelum memesan.',
  },
  {
    question: 'Apa yang dimaksud perpanjangan?',
    answer:
      'Perpanjangan mencakup kebutuhan hosting dan pemeliharaan setelah periode awal. Detail perpanjangan ditampilkan sebelum pembayaran; ketentuan komersial final masih perlu dikunci di satu sumber resmi.',
  },
  {
    question: 'Bagaimana target peluncuran 3–5 hari bekerja?',
    answer:
      'Target berlaku untuk scope yang siap direview: kebutuhan awal, aset utama, dan keputusan konten sudah tersedia. Scope custom atau revisi besar bisa membutuhkan waktu berbeda dan akan dikonfirmasi sebelum mulai.',
  },
  {
    question: 'Bisa mulai dari Website lalu menambah Portal?',
    answer:
      'Bisa menjadi jalur yang masuk akal. Kami cek kebutuhan tenant, data, dan alur kerja lebih dulu supaya Portal yang ditambahkan benar-benar membantu, bukan sekadar menambah dashboard.',
  },
  {
    question: 'Demo mana yang live hari ini?',
    answer:
      'Stock saat ini tervalidasi merespons di route demo. Demo LMS, Clinic, Pharmacy, Travel/Rental, dan Laundry tidak diberi label Live di homepage sampai route masing-masing lolos validasi baru.',
  },
  {
    question: 'Apa yang terjadi setelah saya memesan?',
    answer:
      'Kami rapikan scope, minta bahan yang masih kurang, bangun fondasi yang dipilih, lalu masuk ke satu putaran review sebelum peluncuran.',
  },
  {
    question: 'Di mana saya melacak proyek atau dukungan?',
    answer:
      'Store menjadi lanjutan untuk detail paket dan pesanan. Route Masuk Hub untuk proyek, tagihan, dan dukungan belum dikonfirmasi di halaman publik ini, jadi kami tidak menautkan URL yang belum tervalidasi.',
  },
]

function StatusBadge({ status }: { status: Status }) {
  const className = status.toLowerCase().replace(' ', '-')
  return (
    <span className={`v7-status v7-status-${className}`}>
      <span className="v7-status-mark" aria-hidden="true" />
      {status}
    </span>
  )
}

function HubEntry({ className = '', label = 'Masuk Hub' }: { className?: string; label?: string }) {
  if (HUB_URL) {
    return (
      <a href={HUB_URL} className={`v7-hub-entry ${className}`}>
        {label} <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    )
  }

  return (
    <span
      className={`v7-hub-entry v7-hub-pending ${className}`}
      title="Route Hub belum dikonfirmasi"
      aria-label={`${label}, route belum dikonfirmasi`}
    >
      {label} <span className="v7-pending-dot">Segera</span>
    </span>
  )
}

function NavGroup({ label, items, onNavigate }: {
  label?: string
  items: { label: string; href: string; external?: boolean }[]
  onNavigate?: () => void
}) {
  return (
    <div className="v7-nav-group">
      {label && <p className="v7-nav-group-label">{label}</p>}
      <nav aria-label={label || 'Navigasi utama'}>
        {items.map((item) => item.href ? (
          <a key={item.label} href={item.href} onClick={onNavigate}>
            <span>{item.label}</span>
            {item.external && <ArrowUpRight size={14} aria-hidden="true" />}
          </a>
        ) : (
          <span key={item.label} className="v7-nav-unavailable" aria-disabled="true" aria-label={`${item.label}, belum tersedia`}>
            {item.label}
          </span>
        ))}
      </nav>
    </div>
  )
}

function NavigationBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="v7-navigation-body">
      <div className="v7-nav-primary">
        <a href="#top" aria-current="page" onClick={onNavigate}>
          <span>Beranda</span>
          <span className="v7-active-mark" aria-hidden="true" />
        </a>
      </div>
      <NavGroup label="Jelajahi" items={exploreNavItems} onNavigate={onNavigate} />
      <NavGroup label="Pelajari" items={learnNavItems} onNavigate={onNavigate} />
    </div>
  )
}

function BrandLockup() {
  return (
    <div className="v7-brand-lockup">
      <a href="#top" className="v7-brand" aria-label="Webzoka, kembali ke Beranda">
        <Image src="/images/logo-wide-clean.png" alt="Webzoka" width={154} height={50} priority />
      </a>
      <p>Website dan sistem kerja untuk bisnis Indonesia.</p>
    </div>
  )
}

function PublicShell() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const close = () => setOpen(false)
  const closeAndRestoreFocus = () => {
    setOpen(false)
    window.requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  return (
    <>
      <aside className="v7-sidebar" aria-label="Navigasi Webzoka">
        <BrandLockup />
        <NavigationBody />
        <div className="v7-sidebar-utility">
          <HubEntry label="Webzoka Hub" />
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-sidebar-consultation">
            Konsultasi WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </aside>

      <header className="v7-mobile-header">
        <div className="v7-mobile-header-inner">
          <a href="#top" className="v7-brand" aria-label="Webzoka, kembali ke Beranda">
            <Image src="/images/logo-wide-clean.png" alt="Webzoka" width={154} height={50} priority />
          </a>
          {!open && (
            <button
              ref={menuButtonRef}
              type="button"
              className="v7-menu-button"
              aria-label="Buka menu"
              aria-expanded="false"
              aria-controls="v7-mobile-drawer"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      {open && (
        <div className="v7-drawer-layer">
          <button type="button" className="v7-drawer-backdrop" aria-label="Tutup menu" onClick={closeAndRestoreFocus} />
          <aside ref={drawerRef} id="v7-mobile-drawer" className="v7-mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu Webzoka">
            <div className="v7-drawer-head">
              <BrandLockup />
              <button ref={closeButtonRef} type="button" className="v7-menu-button" aria-label="Tutup menu" onClick={closeAndRestoreFocus}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <NavigationBody onNavigate={close} />
            <div className="v7-sidebar-utility">
              <HubEntry label="Webzoka Hub" />
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-sidebar-consultation" onClick={close}>
                Konsultasi WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

function BrowserFrame({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`v7-browser-frame ${compact ? 'is-compact' : ''}`}>
      <div className="v7-browser-bar">
        <span className="v7-browser-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="v7-browser-url">namabisnismu.id</span>
        <Globe2 size={12} aria-hidden="true" />
      </div>
      <div className="v7-browser-canvas">
        <div className="v7-browser-nav"><span>Nama Bisnis</span><span className="v7-browser-nav-links">Tentang &nbsp; Layanan &nbsp; Kontak</span></div>
        <div className="v7-browser-hero">
          <div>
            <span className="v7-micro-label">WEB PUBLIK</span>
            <strong>Bisnis yang mudah ditemukan, mudah dipercaya.</strong>
            <span className="v7-browser-copy">Penawaran jelas. Jalur kontak jelas. Tampilan yang terasa milik bisnis sendiri.</span>
            <span className="v7-browser-cta">Mulai percakapan <ArrowRight size={11} aria-hidden="true" /></span>
          </div>
          <div className="v7-browser-art" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  )
}

function OperationsFrame({ showDemoLink = true }: { showDemoLink?: boolean }) {
  return (
    <div className="v7-operations-frame">
      <div className="v7-ops-topline">
        <span className="v7-ops-logo"><Boxes size={15} aria-hidden="true" /> Stock</span>
        <StatusBadge status="Live" />
      </div>
      <div className="v7-ops-intro">
        <span className="v7-micro-label">KERJA HARIAN</span>
        <strong>Kerja berikutnya terlihat.</strong>
        <span>Pesanan, stok, dan langkah tim berada di satu alur kerja.</span>
      </div>
      <div className="v7-ops-list">
        <div><CheckCircle2 size={16} aria-hidden="true" /><span>Pesanan masuk<small>siap ditindaklanjuti</small></span><ArrowRight size={14} aria-hidden="true" /></div>
        <div><LayoutDashboard size={16} aria-hidden="true" /><span>Status kerja<small>tidak tercecer di chat</small></span><ArrowRight size={14} aria-hidden="true" /></div>
      </div>
      {showDemoLink && (
        <a href={STOCK_DEMO_URL} target="_blank" rel="noopener noreferrer" className="v7-ops-link">
          Lihat demo Stock <ExternalLink size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

function HeroEvidence() {
  return (
    <div className="v7-hero-evidence" aria-label="Contoh hubungan antara website publik dan sistem operasional">
      <div className="v7-evidence-caption" aria-hidden="true">
        <span><b>01</b> Ditemukan</span>
        <span><b>02</b> Dikelola</span>
      </div>
      <div className="v7-evidence-note v7-evidence-note-one"><Sparkles size={14} aria-hidden="true" /> pintu depan</div>
      <div className="v7-evidence-paper"><BrowserFrame /></div>
      <div className="v7-evidence-route"><span>ditemukan</span><i aria-hidden="true" /><span>dikelola</span></div>
      <div className="v7-evidence-mini"><OperationsFrame /></div>
    </div>
  )
}

function HeroSection({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) {
  return (
    <section id="top" ref={heroRef} className="v7-hero">
      <div className="v7-hero-grid v7-container">
        <div className="v7-hero-copy v7-reveal">
          <p className="v7-eyebrow"><span className="v7-eyebrow-line" />Untuk bisnis yang ingin terlihat profesional dan jalan lebih rapi</p>
          <h1><span>Website untuk ditemukan.</span> <em>Sistem untuk operasional jalan.</em></h1>
          <p className="v7-hero-lede">Bangun kepercayaan di depan, rapikan kerja harian di belakang. Mulai dari kebutuhan yang paling penting.</p>
          <div className="v7-proof-row" aria-label="Bukti awal Webzoka">
            <span><b>Mulai Rp600k</b><small>harga awal</small></span>
            <span><b>Siap tayang 3–5 hari</b><small>untuk scope siap review</small></span>
            <span><b>Perpanjangan transparan</b><small>detail sebelum bayar</small></span>
          </div>
          <div className="v7-hero-actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-primary">
              Konsultasi WhatsApp <MessageCircle size={17} aria-hidden="true" />
            </a>
            <a href={PACKAGE_PATH} className="v7-text-link">Lihat paket dan harga <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <p className="v7-hero-note">Ceritakan kebutuhanmu. Kami bantu menentukan fondasi yang paling masuk akal.</p>
        </div>
        <div className="v7-reveal v7-reveal-delay-1"><HeroEvidence /></div>
      </div>
    </section>
  )
}

function PainSection() {
  const moments = [
    ['Pagi', 'Pertanyaan pelanggan mulai menumpuk.', 'Harga, stok, jadwal, dan detail layanan dibalas satu per satu dari chat.'],
    ['Siang', 'Pekerjaan tersebar di banyak tempat.', 'Pesanan ada di WhatsApp, catatan ada di buku, rekap ada di spreadsheet. Tim harus bertanya sebelum bergerak.'],
    ['Malam', 'Owner masih mencari dan merekap ulang.', 'Waktu untuk melihat arah bisnis habis untuk menyatukan informasi yang tercecer sepanjang hari.'],
  ]
  return (
    <section id="solusi" className="v7-section v7-paper-section">
      <div className="v7-container v7-pain-editorial">
        <div className="v7-section-intro v7-pain-intro v7-reveal">
          <p className="v7-eyebrow v7-eyebrow-blue">Masalah yang terasa setiap hari</p>
          <h2>Berhenti Jadi Admin di Bisnis Kamu Sendiri.</h2>
          <p>Bisnis sudah berjalan. Pelanggan sudah datang. Namun terlalu banyak hal masih bergantung pada satu orang yang harus mengingat, membalas, mengecek, lalu merekap semuanya.</p>
          <p className="v7-pain-pullquote">Yang melelahkan bukan satu pekerjaan besar. Yang melelahkan adalah puluhan pekerjaan kecil yang selalu kembali ke owner.</p>
        </div>
        <div className="v7-day-story v7-reveal v7-reveal-delay-1">
          <div className="v7-day-story-head"><span>Satu hari dalam alur manual</span><span>WhatsApp · catatan · spreadsheet</span></div>
          <ol>
          {moments.map(([moment, title, copy]) => (
            <li key={moment}>
              <span className="v7-day-time">{moment}</span>
              <div><strong>{title}</strong><p>{copy}</p></div>
            </li>
          ))}
          </ol>
          <div className="v7-pain-transition">
            <span><small>Sebelum</small>Informasi menunggu owner</span>
            <ArrowRight size={18} aria-hidden="true" />
            <span><small>Sesudah</small>Pelanggan paham, tim tahu langkah berikut</span>
          </div>
        </div>
      </div>
    </section>
  )
}

type OfferKind = 'website' | 'portal' | 'bundle'

function OfferProof({ kind }: { kind: OfferKind }) {
  const flows: Record<OfferKind, { label: string; steps: string[] }> = {
    website: { label: 'Alur pelanggan', steps: ['Dicari', 'Dipahami', 'Dihubungi'] },
    portal: { label: 'Alur tim', steps: ['Masuk', 'Terlihat', 'Dilanjutkan'] },
    bundle: { label: 'Alur utuh', steps: ['Ditemukan', 'Bertanya', 'Ditangani'] },
  }
  const flow = flows[kind]

  return (
    <div className={`v7-offer-proof is-${kind}`} aria-label={`${flow.label}: ${flow.steps.join(', ')}`}>
      <div className="v7-offer-proof-head">
        <span>{flow.label}</span>
        <span>{kind === 'website' ? 'Pintu publik' : kind === 'portal' ? 'Kerja harian' : 'Depan + belakang'}</span>
      </div>
      <div className="v7-offer-proof-flow">
        {flow.steps.map((step, index) => (
          <div key={step}>
            <span>{`0${index + 1}`}</span>
            <strong>{step}</strong>
            {index < flow.steps.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function OfferSection() {
  const offers = [
    { id: 'website' as const, label: 'Website', stage: 'Ditemukan', title: 'Beri pelanggan pintu depan yang meyakinkan.', copy: 'Jelaskan siapa kamu, apa yang ditawarkan, dan bagaimana pelanggan bisa mulai bertanya. Bisnis terasa serius sebelum percakapan pertama dimulai.', outcomes: ['Penawaran mudah dipahami', 'Jalur kontak tidak membuat pelanggan mencari-cari'], cta: 'Saya butuh website', icon: Globe2 },
    { id: 'portal' as const, label: 'Portal', stage: 'Dijalankan', title: 'Beri tim alur kerja yang bisa diikuti.', copy: 'Pesanan, status, stok, atau pekerjaan harian mendapat tempat yang jelas. Tim melihat langkah berikut tanpa semua keputusan kembali ke owner.', outcomes: ['Status kerja terlihat', 'Informasi harian tidak berhenti di chat'], cta: 'Saya butuh sistem', icon: LayoutDashboard },
    { id: 'bundle' as const, label: 'Bundle', stage: 'Disambungkan', title: 'Hubungkan pelanggan yang datang dengan kerja yang berjalan.', copy: 'Website membuka percakapan. Portal membantu tim menanganinya. Bundle menyatukan arah keduanya sejak awal tanpa memaksa bisnis mengambil fitur yang belum dibutuhkan.', outcomes: ['Satu arah dari depan ke belakang', 'Scope tetap mengikuti kebutuhan bisnis'], cta: 'Saya butuh keduanya', icon: Boxes },
  ]
  return (
    <section id="penawaran" className="v7-section v7-surface-section">
      <div className="v7-container">
        <div className="v7-section-heading v7-reveal">
          <div><p className="v7-eyebrow v7-eyebrow-blue">Pilih fondasi</p><h2>Mulai dari yang paling penting.</h2></div>
          <p>Website, Portal, atau Bundle. Keputusan ini dibuat dari kebutuhan bisnis, bukan dari banyaknya fitur yang tersedia.</p>
        </div>
        <div className="v7-offer-progression">
          {offers.map((offer, index) => {
            const Icon = offer.icon
            return (
              <article key={offer.id} className={`v7-offer-chapter is-${offer.id} v7-reveal v7-reveal-delay-${index + 1}`}>
                <div className="v7-offer-chapter-copy">
                  <div className="v7-offer-kicker"><span>{`0${index + 1}`}</span><Icon size={18} aria-hidden="true" /><strong>{offer.label}</strong><i>{offer.stage}</i></div>
                  <h3>{offer.title}</h3>
                  <p>{offer.copy}</p>
                  <ul>{offer.outcomes.map((outcome) => <li key={outcome}><Check size={15} aria-hidden="true" />{outcome}</li>)}</ul>
                  <a href={PACKAGE_PATH} className="v7-card-link">{offer.cta} <ArrowRight size={15} aria-hidden="true" /></a>
                </div>
                <OfferProof kind={offer.id} />
              </article>
            )
          })}
        </div>
        <div className="v7-section-cta"><a href={PACKAGE_PATH} className="v7-text-link">Bandingkan paket <ArrowRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}

function SignatureSection() {
  return (
    <section className="v7-signature">
      <div className="v7-container">
        <div className="v7-signature-heading v7-reveal"><p className="v7-eyebrow v7-eyebrow-amber">Dari pintu depan sampai kerja harian</p><h2>Yang pelanggan lihat, tersambung dengan cara tim bekerja.</h2><p>Mulai dari cara pelanggan menemukanmu. Lanjutkan dengan cara tim menyelesaikan pekerjaan.</p></div>
        <div className="v7-signature-flow v7-reveal v7-reveal-delay-1">
          <div className="v7-signature-browser"><StatusBadge status="Preview" /><BrowserFrame compact /></div>
          <div className="v7-signature-connector"><span>ditemukan → dipahami → dikelola</span><i aria-hidden="true" /></div>
          <div className="v7-signature-ops"><OperationsFrame showDemoLink={false} /></div>
        </div>
        <div className="v7-signature-foot"><span><ShieldCheck size={16} aria-hidden="true" /> Status selalu diberi label: Live, Preview, atau Case study.</span><a href={STOCK_DEMO_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-light">Lihat demo Stock <ExternalLink size={15} aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}

function PortfolioSection() {
  return (
    <section id="karya" className="v7-section v7-paper-section">
      <div className="v7-container">
        <div className="v7-section-heading v7-reveal"><div><p className="v7-eyebrow v7-eyebrow-blue">Karya dan bukti</p><h2>Yang nyata diberi status. Yang belum, kami sebut preview.</h2></div><p>Kepercayaan dibangun dari detail yang bisa ditelusuri, bukan dari klaim yang terdengar besar.</p></div>
        <div className="v7-selected-work">
          <article className="v7-portfolio-feature v7-reveal">
            <div className="v7-portfolio-visual v7-portfolio-live"><div className="v7-portfolio-browser"><div className="v7-browser-bar"><span className="v7-browser-dots" aria-hidden="true"><i /><i /><i /></span><span className="v7-browser-url">japanarena.id</span><ExternalLink size={12} aria-hidden="true" /></div><div className="v7-live-site-preview"><span className="v7-micro-label">PRODUK WEBZOKA</span><strong>Japan Arena</strong><span>Website + Portal belajar yang kami gunakan sendiri.</span><span className="v7-preview-button"><CheckCircle2 size={12} aria-hidden="true" /> Situs aktif</span></div></div><div className="v7-portfolio-stamp"><span>01 · Produk Webzoka sendiri</span></div></div>
            <div className="v7-portfolio-copy"><div className="v7-portfolio-meta"><StatusBadge status="Live" /><span>Website + Portal belajar</span></div><h3>Japan Arena</h3><p>Contoh internal yang bisa dibuka dan ditelusuri: website publik di depan, Portal belajar di belakang, digunakan setiap hari oleh bisnis kami sendiri.</p><div className="v7-work-facts"><span><small>Peran</small>Public Web + Portal</span><span><small>Status</small>Route dapat dibuka</span></div><a href={JAPAN_ARENA_URL} target="_blank" rel="noopener noreferrer" className="v7-card-link">Buka japanarena.id <ExternalLink size={15} aria-hidden="true" /></a></div>
          </article>
          <div className="v7-portfolio-support">
            <article className="v7-portfolio-small v7-reveal v7-reveal-delay-1"><div className="v7-portfolio-image"><Image src="/theme-previews/toko_online/rumah/rumah-selaras-desktop.webp" alt="Preview template Rumah Selaras" fill sizes="(max-width: 767px) 100vw, 40vw" /></div><div className="v7-portfolio-copy"><div className="v7-portfolio-meta"><StatusBadge status="Preview" /><span>02 · Referensi template</span></div><h3>Rumah Selaras</h3><p>Arah visual Website untuk bisnis rumah dan interior. Bukan sistem pelanggan aktif.</p><span className="v7-disabled-link">Preview visual, tidak memiliki route live.</span></div></article>
            <article className="v7-portfolio-small v7-reveal v7-reveal-delay-2"><div className="v7-portfolio-image"><Image src="/theme-previews/restaurant/cafe/cafe-seduh-desktop.webp" alt="Preview template Cafe Seduh" fill sizes="(max-width: 767px) 100vw, 40vw" /></div><div className="v7-portfolio-copy"><div className="v7-portfolio-meta"><StatusBadge status="Preview" /><span>03 · Referensi template</span></div><h3>Cafe Seduh</h3><p>Arah visual Website untuk bisnis kafe. Bukan sistem pelanggan aktif.</p><span className="v7-disabled-link">Preview visual, tidak memiliki route live.</span></div></article>
          </div>
        </div>
        <div className="v7-proof-disclosure v7-reveal"><ShieldCheck size={18} aria-hidden="true" /><p>Setiap karya dibedakan antara Live dan Preview. Route, nama pelanggan, atau hasil bisnis hanya ditampilkan setelah bisa diverifikasi.</p></div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    ['01', 'Ceritakan kebutuhan', 'Bisnis, penawaran, target pelanggan, dan hambatan kerja yang paling mengganggu.'],
    ['02', 'Pilih fondasi', 'Website, Portal, atau Bundle sesuai keputusan yang ingin kamu buat.'],
    ['03', 'Kami bangun dan rapikan', 'Struktur, isi, tampilan, dan penyiapan sistem berjalan dalam satu arah.'],
    ['04', 'Review lalu peluncuran', 'Satu putaran review dan target 3–5 hari untuk scope yang siap direview.'],
  ]
  return (
    <section id="cara-kerja" className="v7-section v7-surface-section">
      <div className="v7-container v7-process-layout">
        <div className="v7-process-intro v7-reveal"><p className="v7-eyebrow v7-eyebrow-blue">Cara kerja</p><h2>Jelas dari kebutuhan sampai peluncuran.</h2><p>Kamu tetap memegang keputusan bisnis. Kami yang merapikan pekerjaan digitalnya.</p></div>
        <div>
          <div className="v7-process-list">
            {steps.map(([number, title, copy], index) => <article className={`v7-process-step v7-reveal v7-reveal-delay-${index + 1}`} key={number}><span className="v7-process-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
          <div className="v7-process-note"><Clock3 size={17} aria-hidden="true" /><span>Target peluncuran 3–5 hari hanya untuk scope Website yang siap direview.</span><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-text-link">Mulai dari konsultasi <ArrowRight size={15} aria-hidden="true" /></a></div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="harga" className="v7-section v7-pricing-section">
      <div className="v7-container">
        <div className="v7-section-heading v7-reveal"><div><p className="v7-eyebrow v7-eyebrow-blue">Harga dan scope</p><h2>Mulai dari angka yang bisa dipahami.</h2></div><p>Beranda memberi gambaran awal. Store memberi detail dan kalkulasi lengkap.</p></div>
        <div className="v7-pricing-layout">
          <article className="v7-price-lead v7-reveal"><span className="v7-micro-label">HARGA AWAL WEBSITE</span><strong>Mulai Rp600k</strong><p>Angka awal untuk paket Website dasar. Portal dan Bundle mengikuti alur kerja serta scope yang dibutuhkan, bukan memakai satu harga rata untuk semua bisnis.</p><a href={PACKAGE_PATH} className="v7-button v7-button-primary">Hitung kebutuhanmu <ArrowRight size={16} aria-hidden="true" /></a></article>
          <div className="v7-price-clarity v7-reveal v7-reveal-delay-1">
            <div><span>01</span><div><small>Yang menjadi titik mulai</small><strong>Website dasar dan kebutuhan publik yang sudah jelas.</strong><p>Jumlah halaman serta kesiapan konten membentuk scope awal.</p></div></div>
            <div><span>02</span><div><small>Yang menyesuaikan harga</small><strong>Integrasi, alur operasional, dan level dukungan.</strong><p>Portal dan Bundle dibicarakan dari pekerjaan nyata yang ingin dirapikan.</p></div></div>
            <div><span>03</span><div><small>Yang dibuka sebelum keputusan</small><strong>Perpanjangan, hosting, dan pemeliharaan.</strong><p>Detail final ditampilkan sebelum pembayaran agar kamu bisa memeriksanya lebih dulu.</p></div></div>
            <div className="v7-price-question"><CreditCard size={18} aria-hidden="true" /><p>Belum yakin masuk Website, Portal, atau Bundle?</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-text-link">Tanya lewat WhatsApp <MessageCircle size={15} aria-hidden="true" /></a></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  const commitments = [
    ['Harga diberi konteks', 'Mulai Rp600k dijelaskan sebagai harga awal Website dasar, bukan janji harga untuk semua kebutuhan.'],
    ['Scope dibicarakan sebelum mulai', 'Halaman, konten, integrasi, dan dukungan dirapikan menjadi keputusan yang bisa kamu periksa.'],
    ['Status bukti dibuat terang', 'Live berarti route sudah dicek. Preview berarti referensi visual, bukan sistem pelanggan aktif.'],
    ['Dukungan tidak disembunyikan', 'Hosting, pemeliharaan, dan jalur dukungan dibicarakan sebelum pembayaran.'],
  ]
  return (
    <section id="komitmen" className="v7-section v7-paper-section v7-trust-section">
      <div className="v7-container v7-trust-layout">
        <div className="v7-trust-intro v7-reveal"><p className="v7-eyebrow v7-eyebrow-blue">Cara kami menjaga kepercayaan</p><h2>Kepercayaan dimulai dari hal yang bisa kamu periksa.</h2><p>Harga, scope, status demo, dan dukungan dijelaskan sesuai keadaannya. Kamu tahu apa yang didapat, apa yang bergantung pada kebutuhan, dan bukti mana yang benar-benar bisa dibuka.</p></div>
        <div className="v7-trust-ledger">
          {commitments.map(([title, copy], index) => <article className={`v7-trust-entry v7-reveal v7-reveal-delay-${Math.min(index + 1, 4)}`} key={title}><span>{`0${index + 1}`}</span><div><h3>{title}</h3><p>{copy}</p></div><CheckCircle2 size={20} aria-hidden="true" /></article>)}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="v7-section v7-surface-section">
      <div className="v7-container v7-faq-grid">
        <div className="v7-faq-intro v7-reveal"><p className="v7-eyebrow v7-eyebrow-blue">Pertanyaan praktis</p><h2>Kalau masih ragu, mulai dari pertanyaan yang paling dekat.</h2><p>Jawaban singkat di sini. Detail produk dan scope tetap berada di Store atau Hub sesuai konteksnya.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-text-link">Masih ragu? Chat via WhatsApp <MessageCircle size={15} aria-hidden="true" /></a></div>
        <div className="v7-faq-list v7-reveal v7-reveal-delay-1">{faqItems.map((item) => <details key={item.question}><summary>{item.question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
      </div>
    </section>
  )
}

function FinalCta({ finalRef }: { finalRef: React.RefObject<HTMLElement> }) {
  return (
    <section ref={finalRef} className="v7-final-cta">
      <div className="v7-container v7-final-layout v7-reveal">
        <div><p className="v7-eyebrow v7-eyebrow-amber">Mulai dari kebutuhan yang paling penting</p><h2>Ceritakan bisnismu. Kita tentukan fondasinya.</h2></div>
        <div className="v7-final-copy"><p>Website, Portal, atau Bundle. Mulai dari percakapan yang jelas, lalu pilih langkah yang memang dibutuhkan bisnis.</p><div className="v7-final-actions"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-light">Konsultasi WhatsApp <MessageCircle size={17} aria-hidden="true" /></a><a href={STORE_PATH} className="v7-text-link">Lihat template di Store <ArrowRight size={16} aria-hidden="true" /></a></div></div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="v7-footer" id="footer-hub">
      <div className="v7-container">
        <div className="v7-footer-grid">
          <div><a href="#top" className="v7-brand"><Image src="/images/logo-wide-clean.png" alt="Webzoka" width={154} height={50} /></a><p>Website untuk ditemukan. Sistem untuk operasional jalan.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-footer-contact">Chat tim kami di WhatsApp <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          <div><strong>Public Web</strong><a href="#solusi">Solusi</a><a href="#cara-kerja">Cara kerja</a><a href="#karya">Karya</a><a href="#harga">Harga</a><a href="#faq">FAQ</a></div>
          <div><strong>Store</strong><a href={STORE_PATH}>Lihat template</a><a href={PACKAGE_PATH}>Hitung kebutuhanmu</a><a href={PACKAGE_PATH}>Lacak pesanan</a></div>
          <div><strong>Hub</strong><HubEntry /><span className="v7-footer-muted">{HUB_URL ? 'Proyek, tagihan, dukungan.' : 'Route Hub belum dikonfirmasi; tidak ada URL placeholder.'}</span></div>
        </div>
        <div className="v7-footer-bottom"><span>© {new Date().getFullYear()} Webzoka</span><span>Harga transparan · target peluncuran 3–5 hari · demo diberi label sesuai status</span><span><a href="/kebijakan-privasi">Kebijakan Privasi</a> · <a href="/syarat-ketentuan">Syarat & Ketentuan</a></span></div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null)
  const finalRef = useRef<HTMLElement>(null)
  const [heroPassed, setHeroPassed] = useState(false)
  const [finalVisible, setFinalVisible] = useState(false)

  useEffect(() => {
    const revealElements = document.querySelectorAll('.v7-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    revealElements.forEach((element) => observer.observe(element))

    const heroObserver = new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting), { threshold: 0.05 })
    if (heroRef.current) heroObserver.observe(heroRef.current)
    const finalObserver = new IntersectionObserver(([entry]) => setFinalVisible(entry.isIntersecting), { threshold: 0.1 })
    if (finalRef.current) finalObserver.observe(finalRef.current)

    return () => { observer.disconnect(); heroObserver.disconnect(); finalObserver.disconnect() }
  }, [])

  return (
    <div className="v7-page">
      <a className="v7-skip-link" href="#main">Lewati ke konten</a>
      <PublicShell />
      <div className="v7-content-shell">
        <main id="main" tabIndex={-1}>
          <HeroSection heroRef={heroRef} />
          <PainSection />
          <OfferSection />
          <SignatureSection />
          <PortfolioSection />
          <ProcessSection />
          <PricingSection />
          <TrustSection />
          <FaqSection />
          <FinalCta finalRef={finalRef} />
        </main>
        <Footer />
      </div>
      <div className={`v7-mobile-cta ${heroPassed && !finalVisible ? 'is-visible' : ''}`} aria-hidden={!(heroPassed && !finalVisible)}>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" tabIndex={heroPassed && !finalVisible ? 0 : -1} className="v7-button v7-button-primary">Chat WhatsApp <MessageCircle size={16} aria-hidden="true" /></a>
      </div>
    </div>
  )
}
