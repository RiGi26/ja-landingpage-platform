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
  Quote,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { waLink as buildWaLink } from '@/constants/site'

const STORE_PATH = '/seluruh-layanan'
const STOCK_DEMO_URL = 'https://stock.webzoka.com/demo'
const JAPAN_ARENA_URL = 'https://www.japanarena.id'
const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL?.trim() || ''
const WA_MESSAGE = 'Halo Webzoka, saya ingin konsultasi soal website dan sistem untuk bisnis saya.'
const WHATSAPP_URL = buildWaLink(WA_MESSAGE)

type Status = 'Live' | 'Preview' | 'Case study'

const navItems = [
  { label: 'Solusi', href: '#solusi' },
  { label: 'Cara kerja', href: '#cara-kerja' },
  { label: 'Karya', href: '#karya' },
  { label: 'Harga', href: '#harga' },
]

const faqItems = [
  {
    question: 'Apa bedanya Website, Portal, dan Bundle?',
    answer:
      'Website membantu bisnis ditemukan dan dipercaya. Portal merapikan kerja harian seperti order, status, stok, atau tim. Bundle menghubungkan keduanya dalam satu jalur mulai.',
  },
  {
    question: 'Apa yang termasuk dalam harga mulai Rp600k?',
    answer:
      'Angka tersebut adalah harga awal Website dari paket dasar. Scope final mengikuti jumlah halaman, kesiapan konten, integrasi, dan level support. Detailnya bisa kamu cek di Store sebelum order.',
  },
  {
    question: 'Apa yang dimaksud renewal?',
    answer:
      'Renewal mencakup kebutuhan hosting dan maintenance yang berjalan setelah periode awal. Detail renewal ditampilkan sebelum pembayaran; terms komersial final masih perlu dikunci di satu sumber resmi.',
  },
  {
    question: 'Bagaimana target launch 3–5 hari bekerja?',
    answer:
      'Target berlaku untuk scope yang siap direview: brief, aset utama, dan keputusan konten sudah tersedia. Scope custom atau revisi besar bisa membutuhkan waktu berbeda dan akan dikonfirmasi sebelum mulai.',
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
    question: 'Apa yang terjadi setelah saya order?',
    answer:
      'Kami rapikan scope, minta bahan yang masih kurang, bangun fondasi yang dipilih, lalu masuk ke satu focused review loop sebelum launch.',
  },
  {
    question: 'Di mana saya melacak project atau support?',
    answer:
      'Store menjadi handoff untuk detail paket dan order. Route Masuk Hub untuk project, billing, dan support belum dikonfirmasi di surface publik ini, jadi kami tidak menautkan URL yang belum tervalidasi.',
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

function HubEntry({ className = '' }: { className?: string }) {
  if (HUB_URL) {
    return (
      <a href={HUB_URL} className={`v7-hub-entry ${className}`}>
        Masuk Hub <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    )
  }

  return (
    <span
      className={`v7-hub-entry v7-hub-pending ${className}`}
      title="Route Hub belum dikonfirmasi"
      aria-label="Masuk Hub, route belum dikonfirmasi"
    >
      Masuk Hub <span className="v7-pending-dot">Route dikonfirmasi nanti</span>
    </span>
  )
}

function PublicNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`v7-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="v7-container v7-header-inner">
        <a href="#top" className="v7-brand" aria-label="Webzoka, kembali ke awal">
          <Image src="/images/logo-wide-clean.png" alt="Webzoka" width={154} height={50} priority />
        </a>

        <nav className="v7-desktop-nav" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href={STORE_PATH} className="v7-nav-store">
            Store <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </nav>

        <div className="v7-header-actions">
          <HubEntry className="v7-desktop-hub" />
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-small v7-button-primary v7-desktop-cta">
            Konsultasi WhatsApp <MessageCircle size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="v7-menu-button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="v7-mobile-menu">
          <nav aria-label="Navigasi mobile">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={close}>
                {item.label} <ArrowRight size={16} aria-hidden="true" />
              </a>
            ))}
            <a href={STORE_PATH} onClick={close}>
              Store <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </nav>
          <div className="v7-mobile-menu-footer">
            <HubEntry />
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-primary" onClick={close}>
              Konsultasi WhatsApp <MessageCircle size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
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
            <span className="v7-micro-label">PUBLIC WEB</span>
            <strong>Bisnis yang mudah ditemukan, mudah dipercaya.</strong>
            <span className="v7-browser-copy">Penawaran jelas. Jalur inquiry jelas. Tampilan yang terasa milik bisnis sendiri.</span>
            <span className="v7-browser-cta">Mulai percakapan <ArrowRight size={11} aria-hidden="true" /></span>
          </div>
          <div className="v7-browser-art" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  )
}

function OperationsFrame() {
  return (
    <div className="v7-operations-frame">
      <div className="v7-ops-topline">
        <span className="v7-ops-logo"><Boxes size={15} aria-hidden="true" /> Stock</span>
        <StatusBadge status="Live" />
      </div>
      <div className="v7-ops-intro">
        <span className="v7-micro-label">DAILY OPERATIONS</span>
        <strong>Kerja berikutnya terlihat.</strong>
        <span>Order, stok, dan langkah tim berada di satu alur kerja.</span>
      </div>
      <div className="v7-ops-list">
        <div><CheckCircle2 size={16} aria-hidden="true" /><span>Order masuk<small>siap ditindaklanjuti</small></span><ArrowRight size={14} aria-hidden="true" /></div>
        <div><LayoutDashboard size={16} aria-hidden="true" /><span>Status kerja<small>tidak tercecer di chat</small></span><ArrowRight size={14} aria-hidden="true" /></div>
      </div>
      <a href={STOCK_DEMO_URL} target="_blank" rel="noopener noreferrer" className="v7-ops-link">
        Lihat demo Stock <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  )
}

function HeroEvidence() {
  return (
    <div className="v7-hero-evidence" aria-label="Contoh hubungan antara website publik dan sistem operasional">
      <div className="v7-evidence-note v7-evidence-note-one"><Sparkles size={14} aria-hidden="true" /> front door</div>
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
          <h1>Website untuk ditemukan. <em>Sistem untuk operasional jalan.</em></h1>
          <p className="v7-hero-lede">Bangun kepercayaan di depan, rapikan kerja harian di belakang — mulai dari kebutuhan yang paling penting.</p>
          <div className="v7-proof-row" aria-label="Bukti awal Webzoka">
            <span><b>Mulai Rp600k</b><small>harga awal</small></span>
            <span><b>Launch 3–5 hari</b><small>untuk scope siap review</small></span>
            <span><b>Renewal transparan</b><small>detail sebelum bayar</small></span>
          </div>
          <div className="v7-hero-actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-primary">
              Konsultasi WhatsApp <MessageCircle size={17} aria-hidden="true" />
            </a>
            <a href={STORE_PATH} className="v7-text-link">Lihat paket dan harga <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <p className="v7-hero-note">Ceritakan kebutuhanmu. Kami bantu menentukan fondasi yang paling masuk akal.</p>
        </div>
        <div className="v7-reveal v7-reveal-delay-1"><HeroEvidence /></div>
      </div>
    </section>
  )
}

function PainSection() {
  const rows = [
    ['Sulit ditemukan', 'Website yang menjelaskan bisnis dengan jelas dan terasa kredibel.'],
    ['Order dan status tercecer', 'Satu alur operasional dengan langkah berikutnya yang terlihat.'],
    ['Semua keputusan berhenti di owner', 'Sistem yang bisa dipakai tim secara konsisten.'],
  ]
  return (
    <section id="solusi" className="v7-section v7-paper-section">
      <div className="v7-container v7-pain-grid">
        <div className="v7-section-intro v7-reveal">
          <p className="v7-eyebrow v7-eyebrow-blue">Masalah yang terasa setiap hari</p>
          <h2>Berhenti Jadi Admin di Bisnis Kamu Sendiri.</h2>
          <p>Bisnis tidak selalu butuh lebih banyak fitur. Sering kali yang dibutuhkan adalah jalur yang lebih jelas, untuk pelanggan dan untuk tim.</p>
        </div>
        <div className="v7-pain-list v7-reveal v7-reveal-delay-1">
          {rows.map(([pain, outcome], index) => (
            <div className="v7-pain-row" key={pain}>
              <span className="v7-pain-index">0{index + 1}</span>
              <div><strong>{pain}</strong><ArrowRight size={16} aria-hidden="true" /><p>{outcome}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OfferSection() {
  const offers = [
    { id: 'website', label: 'Website', tag: 'Public Web', title: 'Untuk ditemukan dan dipercaya.', copy: 'Public pages, positioning, inquiry path, portfolio, dan content blocks yang menjawab pertanyaan pelanggan.', cta: 'Saya butuh website', icon: Globe2 },
    { id: 'portal', label: 'Portal', tag: 'Operational flow', title: 'Untuk kerja harian yang lebih rapi.', copy: 'Alur operasional, status visibility, penggunaan tim, dan support path yang mengikuti kebutuhan bisnis.', cta: 'Saya butuh sistem', icon: LayoutDashboard },
    { id: 'bundle', label: 'Bundle', tag: 'Recommended when both matter', title: 'Website dan sistem dalam satu arah.', copy: 'Hubungkan cara pelanggan menemukan bisnis dengan cara tim menyelesaikan pekerjaan setiap hari.', cta: 'Saya butuh keduanya', icon: Boxes },
  ]
  return (
    <section id="penawaran" className="v7-section v7-surface-section">
      <div className="v7-container">
        <div className="v7-section-heading v7-reveal">
          <div><p className="v7-eyebrow v7-eyebrow-blue">Pilih fondasi</p><h2>Mulai dari yang paling penting.</h2></div>
          <p>Website, Portal, atau Bundle. Keputusan ini dibuat dari kebutuhan bisnis, bukan dari banyaknya fitur yang tersedia.</p>
        </div>
        <div className="v7-offer-grid">
          {offers.map((offer, index) => {
            const Icon = offer.icon
            return (
              <article key={offer.id} className={`v7-offer-card v7-reveal v7-reveal-delay-${index + 1} ${offer.id === 'bundle' ? 'is-featured' : ''}`}>
                <div className="v7-offer-top"><span className="v7-offer-icon"><Icon size={21} aria-hidden="true" /></span><span className="v7-offer-tag">{offer.tag}</span></div>
                <p className="v7-offer-label">{offer.label}</p>
                <h3>{offer.title}</h3>
                <p>{offer.copy}</p>
                <a href={STORE_PATH} className="v7-card-link">{offer.cta} <ArrowRight size={15} aria-hidden="true" /></a>
              </article>
            )
          })}
        </div>
        <div className="v7-section-cta"><a href={STORE_PATH} className="v7-text-link">Bandingkan paket <ArrowRight size={16} aria-hidden="true" /></a></div>
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
          <div className="v7-signature-ops"><OperationsFrame /></div>
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
        <div className="v7-section-heading v7-reveal"><div><p className="v7-eyebrow v7-eyebrow-blue">Karya dan bukti</p><h2>Yang nyata diberi status. Yang belum, kami sebut preview.</h2></div><p>Trust dibangun dari detail yang bisa ditelusuri, bukan dari klaim yang terdengar besar.</p></div>
        <div className="v7-portfolio-grid">
          <article className="v7-portfolio-feature v7-reveal">
            <div className="v7-portfolio-visual v7-portfolio-live"><div className="v7-portfolio-browser"><div className="v7-browser-bar"><span className="v7-browser-dots" aria-hidden="true"><i /><i /><i /></span><span className="v7-browser-url">japanarena.id</span><ExternalLink size={12} aria-hidden="true" /></div><div className="v7-live-site-preview"><span className="v7-micro-label">WEBZOKA PRODUCT</span><strong>Japan Arena</strong><span>Website + Portal belajar yang kami gunakan sendiri.</span><span className="v7-preview-button">Buka situs <ArrowUpRight size={12} aria-hidden="true" /></span></div></div><div className="v7-portfolio-stamp"><StatusBadge status="Live" /><span>Produk Webzoka sendiri</span></div></div>
            <div className="v7-portfolio-copy"><div className="v7-portfolio-meta"><StatusBadge status="Live" /><span>Website + Portal belajar</span></div><h3>Japan Arena</h3><p>Contoh internal yang bisa dibuka dan ditelusuri: website publik di depan, portal belajar di belakang, dipakai setiap hari oleh bisnis kami sendiri.</p><a href={JAPAN_ARENA_URL} target="_blank" rel="noopener noreferrer" className="v7-card-link">Buka japanarena.id <ExternalLink size={15} aria-hidden="true" /></a></div>
          </article>
          <article className="v7-portfolio-small v7-reveal v7-reveal-delay-1"><div className="v7-portfolio-image"><Image src="/theme-previews/toko_online/rumah/rumah-selaras-desktop.webp" alt="Preview template Rumah Selaras" fill sizes="(max-width: 767px) 100vw, 33vw" /></div><div className="v7-portfolio-copy"><div className="v7-portfolio-meta"><StatusBadge status="Preview" /><span>Template reference</span></div><h3>Rumah Selaras</h3><p>Preview visual untuk arah Website. Bukan route customer aktif.</p><span className="v7-disabled-link">Preview only — not an active customer system</span></div></article>
          <article className="v7-portfolio-small v7-reveal v7-reveal-delay-2"><div className="v7-portfolio-image"><Image src="/theme-previews/restaurant/cafe/cafe-seduh-desktop.webp" alt="Preview template Cafe Seduh" fill sizes="(max-width: 767px) 100vw, 33vw" /></div><div className="v7-portfolio-copy"><div className="v7-portfolio-meta"><StatusBadge status="Preview" /><span>Template reference</span></div><h3>Cafe Seduh</h3><p>Preview visual untuk arah Website. Bukan route customer aktif.</p><span className="v7-disabled-link">Preview only — not an active customer system</span></div></article>
        </div>
        <div className="v7-proof-disclosure v7-reveal"><Quote size={18} aria-hidden="true" /><p>Testimonial, logo pelanggan, dan case-study metrics akan muncul setelah ada attribution serta permission yang disetujui. Tidak ada angka atau nama yang diisi untuk mempercantik halaman.</p></div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    ['01', 'Ceritakan kebutuhan', 'Business, offer, audience, dan operational friction yang paling mengganggu.'],
    ['02', 'Pilih fondasi', 'Website, Portal, atau Bundle sesuai keputusan yang ingin kamu buat.'],
    ['03', 'Kami bangun dan rapikan', 'Structure, content, design, dan system setup berjalan dalam satu arah.'],
    ['04', 'Review lalu launch', 'Satu focused review loop dan target 3–5 hari untuk scope yang siap direview.'],
  ]
  return (
    <section id="cara-kerja" className="v7-section v7-surface-section">
      <div className="v7-container">
        <div className="v7-section-heading v7-reveal"><div><p className="v7-eyebrow v7-eyebrow-blue">Cara kerja</p><h2>Jelas dari brief sampai launch.</h2></div><p>Proses singkat supaya kamu tidak perlu menjadi project manager untuk website dan sistem sendiri.</p></div>
        <div className="v7-process-list">
          {steps.map(([number, title, copy], index) => <article className={`v7-process-step v7-reveal v7-reveal-delay-${index + 1}`} key={number}><span className="v7-process-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
        <div className="v7-process-note"><Clock3 size={17} aria-hidden="true" /><span>Target launch 3–5 hari untuk scope yang siap direview.</span><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-text-link">Mulai dari konsultasi <ArrowRight size={15} aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="harga" className="v7-section v7-pricing-section">
      <div className="v7-container">
        <div className="v7-section-heading v7-reveal"><div><p className="v7-eyebrow v7-eyebrow-blue">Harga dan scope</p><h2>Mulai dari angka yang bisa dipahami.</h2></div><p>Homepage memberi anchor. Store memberi detail dan kalkulasi lengkap.</p></div>
        <div className="v7-pricing-grid">
          <article className="v7-price-card v7-price-featured v7-reveal"><span className="v7-micro-label">HARGA AWAL WEBSITE</span><strong>Mulai Rp600k</strong><p>Harga awal dari paket Website dasar. Scope final mengikuti halaman, konten, integrasi, dan support yang dipilih.</p><a href={STORE_PATH} className="v7-button v7-button-primary">Hitung kebutuhanmu <ArrowRight size={16} aria-hidden="true" /></a></article>
          <article className="v7-price-card v7-reveal v7-reveal-delay-1"><span className="v7-micro-label">RENEWAL</span><strong>Transparan sebelum bayar</strong><p>Hosting dan maintenance dipisahkan dari harga awal. Detail final muncul di kalkulator sebelum kamu mengambil keputusan.</p><div className="v7-price-note"><CreditCard size={16} aria-hidden="true" /> Renewal terms perlu dikunci di satu sumber komersial.</div></article>
          <article className="v7-price-card v7-reveal v7-reveal-delay-2"><span className="v7-micro-label">YANG MENGUBAH HARGA</span><strong>Scope, bukan kejutan.</strong><p>Jumlah halaman, integrasi, kesiapan konten, dan level support menjadi faktor utama. Untuk kebutuhan khusus, tanya dulu.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-text-link">Tanya dulu lewat WhatsApp <MessageCircle size={15} aria-hidden="true" /></a></article>
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  const placeholders = [
    '[Attributable testimonial: name, role, business]',
    '[Approved customer logo]',
    '[Case-study metric + source]',
  ]
  return (
    <section className="v7-section v7-paper-section v7-trust-section">
      <div className="v7-container">
        <div className="v7-section-heading v7-reveal"><div><p className="v7-eyebrow v7-eyebrow-blue">Trust layer</p><h2>Bukti yang jujur lebih berguna dari hiasan.</h2></div><p>Bagian ini sengaja menahan diri sampai nama, permission, dan sumber bukti siap dipublikasikan.</p></div>
        <div className="v7-trust-grid">{placeholders.map((text, index) => <div className="v7-trust-placeholder v7-reveal v7-reveal-delay-1" key={text}><span>0{index + 1}</span><p>{text}</p><small>Menunggu approval dan attribution.</small></div>)}</div>
        <div className="v7-commitment-strip v7-reveal"><span><Check size={15} aria-hidden="true" /> Harga transparan</span><span><Check size={15} aria-hidden="true" /> Scope jelas</span><span><Check size={15} aria-hidden="true" /> Demo sesuai status</span><span><Check size={15} aria-hidden="true" /> Ada jalur support</span></div>
        <div className="v7-section-cta"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-text-link">Baca studi kasus setelah proof siap <ArrowRight size={16} aria-hidden="true" /></a></div>
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
      <div className="v7-container">
        <div className="v7-final-card v7-reveal"><p className="v7-eyebrow v7-eyebrow-blue">Mulai dari kebutuhan yang paling penting</p><h2>Ceritakan bisnismu. Kita tentukan fondasinya.</h2><p>Website, Portal, atau Bundle. Mulai dari percakapan yang jelas, bukan dari katalog yang membuat bingung.</p><div className="v7-final-actions"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-primary">Konsultasi WhatsApp <MessageCircle size={17} aria-hidden="true" /></a><a href={STORE_PATH} className="v7-button v7-button-outline">Lihat paket di Store <ArrowRight size={16} aria-hidden="true" /></a></div></div>
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
          <div><strong>Store</strong><a href={STORE_PATH}>Lihat paket dan harga</a><a href={STORE_PATH}>Hitung kebutuhanmu</a><a href={STORE_PATH}>Track order</a></div>
          <div><strong>Hub</strong><HubEntry /><span className="v7-footer-muted">{HUB_URL ? 'Project, billing, support.' : 'Route Hub belum dikonfirmasi; tidak ada URL placeholder.'}</span></div>
        </div>
        <div className="v7-footer-bottom"><span>© {new Date().getFullYear()} Webzoka</span><span>Harga transparan · target launch 3–5 hari · demo diberi label sesuai status</span><span><a href="/kebijakan-privasi">Kebijakan Privasi</a> · <a href="/syarat-ketentuan">Syarat & Ketentuan</a></span></div>
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
      <PublicNav />
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
      <div className={`v7-mobile-cta ${heroPassed && !finalVisible ? 'is-visible' : ''}`} aria-hidden={!(heroPassed && !finalVisible)}>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v7-button v7-button-primary">Konsultasi WhatsApp <MessageCircle size={16} aria-hidden="true" /></a>
      </div>
    </div>
  )
}
