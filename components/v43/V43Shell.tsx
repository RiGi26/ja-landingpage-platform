'use client'

import Image from 'next/image'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { waLink } from '@/constants/site'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'

type Page = 'home' | 'services' | 'work' | 'managed' | 'about' | 'privacy' | 'terms' | 'pricing'
const PAGE_PATHS: Record<Page, string> = {
  home: '/', services: '/layanan/', work: '/karya/', managed: '/seluruh-layanan/',
  about: '/tentang-kami/', privacy: '/privacy/', terms: '/terms/', pricing: '/pricing/',
}
type Dialog = 'about' | 'consultation' | 'rumah' | 'kopi'
type DialogContextValue = (dialog: Dialog, opener: HTMLElement) => void
const DialogContext = createContext<DialogContextValue | null>(null)
const WHATSAPP_URL = waLink('Halo Webzoka, saya ingin konsultasi soal website dan sistem untuk bisnis saya.')
const PREVIEWS = {
  rumah: { title: 'Rumah Selaras', src: '/theme-previews/toko_online/rumah/rumah-selaras-desktop.webp', height: 750, description: 'Preview website rumah dan interior. Contoh visual template, bukan proyek pelanggan aktif.' },
  kopi: { title: 'Kopi Senja', src: '/theme-previews/restaurant/cafe/cafe-seduh-desktop.webp', height: 625, description: 'Preview website kafe. Identitas Kopi Senja terlihat pada aset resmi template Cafe Seduh; bukan proyek pelanggan aktif.' },
} as const

function CloseIcon() {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
}

function ChevronIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
}

function canFocus(element: HTMLElement | null): element is HTMLElement {
  return Boolean(element?.isConnected && element.getClientRects().length && !element.closest('[hidden], [inert]') && !element.matches(':disabled'))
}

function focusable(scope: HTMLElement) {
  return Array.from(scope.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), summary, [tabindex="0"]')).filter(canFocus)
}

export function DialogButton({ dialog, onClick, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { dialog: Dialog }) {
  const openDialog = useContext(DialogContext)
  return <button {...props} type={props.type ?? 'button'} data-dialog={dialog} onClick={(event) => {
    onClick?.(event)
    if (!event.defaultPrevented) openDialog?.(dialog, event.currentTarget)
  }}>{children}</button>
}

export default function V43Shell({ page, children, externalOverlayOpen = false }: { page: Page; children: ReactNode; externalOverlayOpen?: boolean }) {
  const [portalReady, setPortalReady] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [submenuPresent, setSubmenuPresent] = useState(false)
  const [submenuAnimated, setSubmenuAnimated] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobilePresent, setMobilePresent] = useState(false)
  const [mobileAnimated, setMobileAnimated] = useState(false)
  const [activeDialog, setActiveDialog] = useState<Dialog | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLAnchorElement>(null)
  const serviceNavRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLUListElement>(null)
  const submenuToggleRef = useRef<HTMLButtonElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)
  const dialogRefs = useRef<Partial<Record<'about' | 'consultation' | 'preview', HTMLDialogElement>>>({})
  const dialogOpener = useRef<HTMLElement | null>(null)
  const mobileRestore = useRef(false)
  const submenuOpenRef = useRef(false)
  const mobileOpenRef = useRef(false)
  const activeDialogRef = useRef<Dialog | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>()
  const mobileTimer = useRef<ReturnType<typeof setTimeout>>()
  const frames = useRef(new Set<number>())
  const mounted = useRef(true)

  const scheduleFrame = useCallback((callback: () => void) => {
    const id = requestAnimationFrame(() => { frames.current.delete(id); callback() })
    frames.current.add(id)
  }, [])

  const desktopFocusTarget = useCallback(() => headerRef.current?.querySelector<HTMLElement>('.desktop-nav [aria-current="page"]') ?? headerRef.current?.querySelector<HTMLElement>('.brand') ?? null, [])

  const setSubmenu = useCallback((open: boolean, focusFirst = false) => {
    clearTimeout(closeTimer.current)
    clearTimeout(leaveTimer.current)
    submenuOpenRef.current = open
    setSubmenuOpen(open)
    if (open) {
      setSubmenuPresent(true)
      scheduleFrame(() => {
        if (!submenuOpenRef.current) return
        if (focusFirst) submenuRef.current?.querySelector<HTMLElement>('a')?.focus()
        scheduleFrame(() => { if (submenuOpenRef.current) setSubmenuAnimated(true) })
      })
    } else {
      setSubmenuAnimated(false)
      closeTimer.current = setTimeout(() => setSubmenuPresent(false), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220)
    }
  }, [scheduleFrame])

  const setMobile = useCallback((open: boolean, restoreFocus = true) => {
    clearTimeout(mobileTimer.current)
    mobileOpenRef.current = open
    mobileRestore.current = !open && restoreFocus
    setMobileOpen(open)
    if (open) {
      setSubmenu(false)
      setMobilePresent(true)
      scheduleFrame(() => scheduleFrame(() => { if (mobileOpenRef.current) setMobileAnimated(true) }))
    } else {
      setMobileAnimated(false)
      mobileTimer.current = setTimeout(() => setMobilePresent(false), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220)
    }
  }, [scheduleFrame, setSubmenu])

  const openDialog = useCallback((dialog: Dialog, opener: HTMLElement) => {
    if (mobileOpenRef.current) setMobile(false, false)
    setSubmenu(false)
    dialogOpener.current = opener
    activeDialogRef.current = dialog
    setActiveDialog(dialog)
  }, [setMobile, setSubmenu])

  const restoreDialogFocus = useCallback(() => {
    if (!mounted.current) return
    activeDialogRef.current = null
    setActiveDialog(null)
    scheduleFrame(() => {
      const target = canFocus(dialogOpener.current) ? dialogOpener.current : canFocus(mobileToggleRef.current) ? mobileToggleRef.current : desktopFocusTarget()
      if (canFocus(target)) target.focus({ preventScroll: true })
    })
  }, [desktopFocusTarget, scheduleFrame])

  useEffect(() => {
    mounted.current = true
    setPortalReady(true)
    const animationFrames = frames.current
    const dialogs = dialogRefs.current
    return () => {
      mounted.current = false
      clearTimeout(closeTimer.current)
      clearTimeout(leaveTimer.current)
      clearTimeout(mobileTimer.current)
      animationFrames.forEach(cancelAnimationFrame)
      Object.values(dialogs).forEach((dialog) => { if (dialog?.open) dialog.close() })
      document.body.classList.remove('v43-menu-open')
      delete document.body.dataset.v43Overlay
      document.dispatchEvent(new CustomEvent('webzoka:v43-overlay'))
    }
  }, [])

  useEffect(() => {
    if (submenuRef.current) submenuRef.current.inert = !submenuOpen
  }, [submenuOpen, submenuPresent])

  useEffect(() => {
    const regions = [headerRef.current, surfaceRef.current, skipRef.current]
    regions.forEach((region) => { if (region) region.inert = mobileOpen })
    if (mobileMenuRef.current) mobileMenuRef.current.inert = !mobileOpen
    document.body.classList.toggle('v43-menu-open', mobileOpen)
    document.body.dataset.v43Overlay = activeDialog || externalOverlayOpen ? 'dialog' : mobileOpen ? 'menu' : ''
    document.dispatchEvent(new CustomEvent('webzoka:v43-overlay'))
    if (mobileOpen) mobileMenuRef.current?.querySelector<HTMLElement>('.mobile-close')?.focus()
    else if (mobileRestore.current) {
      mobileRestore.current = false
      if (canFocus(mobileToggleRef.current)) mobileToggleRef.current.focus({ preventScroll: true })
    }
    return () => regions.forEach((region) => { if (region) region.inert = false })
  }, [activeDialog, externalOverlayOpen, mobileOpen, portalReady])

  useEffect(() => {
    if (!activeDialog || !portalReady) return
    const key = activeDialog === 'rumah' || activeDialog === 'kopi' ? 'preview' : activeDialog
    const dialog = dialogRefs.current[key]
    if (dialog && !dialog.open) {
      dialog.showModal()
      dialog.querySelector<HTMLElement>('.dialog-close')?.focus()
    }
  }, [activeDialog, portalReady])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !serviceNavRef.current?.contains(event.target)) setSubmenu(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (!mobileOpenRef.current || !mobileMenuRef.current) return
      if (event.key === 'Escape') { event.preventDefault(); setMobile(false) }
      if (event.key !== 'Tab') return
      const items = focusable(mobileMenuRef.current)
      const index = items.indexOf(document.activeElement as HTMLElement)
      if (event.shiftKey && index <= 0) { event.preventDefault(); items.at(-1)?.focus() }
      if (!event.shiftKey && (index === items.length - 1 || index < 0)) { event.preventDefault(); items[0]?.focus() }
    }
    const onFocus = (event: FocusEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement) || target.id === 'main-content' || activeDialogRef.current || mobileOpenRef.current || target.closest('.analytics-controls')) return
      scheduleFrame(() => {
        if (!target.isConnected || target.closest('.site-header')) return
        const bounds = target.getBoundingClientRect()
        const topLimit = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + 12
        const panel = document.querySelector<HTMLElement>('.v43.analytics-controls .cookie-panel')
        const bottomLimit = panel ? panel.getBoundingClientRect().top - 12 : innerHeight - 12
        if (bounds.top < topLimit || bounds.bottom > bottomLimit) target.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior })
      })
    }
    const desktopQuery = matchMedia('(min-width: 1024px)')
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches && mobileOpenRef.current) {
        setMobile(false, false)
        scheduleFrame(() => { const target = desktopFocusTarget(); if (canFocus(target)) target.focus({ preventScroll: true }) })
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocus)
    desktopQuery.addEventListener('change', onDesktop)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocus)
      desktopQuery.removeEventListener('change', onDesktop)
    }
  }, [desktopFocusTarget, scheduleFrame, setMobile, setSubmenu])

  const trackStoreEntry = () => trackEvent(ANALYTICS_EVENTS.publicCtaStoreClick, {
    source_page: PAGE_PATHS[page],
    destination: '/seluruh-layanan',
  })
  const preview = activeDialog === 'kopi' ? PREVIEWS.kopi : PREVIEWS.rumah
  const closeBackdrop = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close()
  }

  return <DialogContext.Provider value={openDialog}>
    <div className="v43 v43-shell" data-page={page}>
      <a ref={skipRef} className="skip-link" href="#main-content">Langsung ke isi halaman</a>
      <header ref={headerRef} className="site-header"><div className="header-inner">
        <Link className="brand" href="/" aria-label="Webzoka, beranda"><Image src="/images/logo-wide-clean.png" alt="Webzoka" width={462} height={151} unoptimized /></Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <Link className="nav-pill" data-nav="work" href="/karya/" aria-current={page === 'work' ? 'page' : undefined}>Karya</Link>
          <div ref={serviceNavRef} className={`services-nav${submenuOpen ? ' is-open' : ''}`} data-open={submenuOpen} onPointerEnter={(event) => { if (event.pointerType !== 'touch') setSubmenu(true) }} onPointerLeave={() => {
            leaveTimer.current = setTimeout(() => { if (!serviceNavRef.current?.contains(document.activeElement)) setSubmenu(false) }, 120)
          }} onFocus={(event) => { if (event.target instanceof HTMLElement && event.target.matches('a')) setSubmenu(true) }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSubmenu(false) }} onKeyDown={(event) => {
            if (event.key === 'Escape') { event.preventDefault(); setSubmenu(false); submenuToggleRef.current?.focus() }
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
            event.preventDefault()
            const links = Array.from(submenuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
            const current = links.indexOf(document.activeElement as HTMLAnchorElement)
            const next = current < 0 ? event.key === 'ArrowDown' ? 0 : links.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length
            setSubmenu(true)
            scheduleFrame(() => links[next]?.focus())
          }}>
            <Link className="nav-pill" data-nav="services" href="/layanan/" aria-current={page === 'services' ? 'page' : undefined}>Layanan</Link>
            <button ref={submenuToggleRef} className="submenu-toggle" type="button" aria-label={submenuOpen ? 'Tutup submenu layanan' : 'Buka submenu layanan'} aria-expanded={submenuOpen} aria-controls="service-submenu" onClick={(event) => setSubmenu(!submenuOpen, !submenuOpen && event.detail === 0)}><ChevronIcon /></button>
            <ul ref={submenuRef} id="service-submenu" className={`submenu${submenuAnimated ? ' is-open' : ''}`} hidden={!submenuPresent}>
              <li><Link href="/layanan/#website">Website</Link></li><li><Link href="/layanan/#portal">Portal SaaS</Link></li><li><Link href="/layanan/#bundle">Website + Portal</Link></li>
            </ul>
          </div>
          <DialogButton className="nav-pill" dialog="about">Tentang</DialogButton>
        </nav>
        <div className="header-actions">
          <span className="hub-inactive" aria-disabled="true" title="Webzoka Hub belum tersedia">Webzoka Hub <small>Belum aktif</small></span>
          <DialogButton className="nav-pill consultation" dialog="consultation">Konsultasi</DialogButton>
          <button ref={mobileToggleRef} className="mobile-toggle" type="button" aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobile(!mobileOpen)}><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg></button>
        </div>
      </div></header>
      <div ref={surfaceRef} className="page-surface">{children}<footer className="site-footer"><div className="container">
        <div className="footer-top"><div><Link className="brand" href="/" aria-label="Webzoka, beranda"><Image src="/images/logo-wide-clean.png" alt="Webzoka" width={462} height={151} loading="lazy" unoptimized /></Link><p>Website dan sistem kerja untuk bisnis Indonesia.</p></div>
          <nav className="footer-links" aria-label="Navigasi footer"><Link href="/">Beranda</Link><Link href="/layanan/">Layanan</Link><Link href="/karya/">Karya</Link><DialogButton dialog="about">Tentang</DialogButton><Link href="/seluruh-layanan/" onClick={trackStoreEntry}>Jasa website</Link><Link href="/pricing/">Harga</Link></nav></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Webzoka</span><Link href="/privacy/">Kebijakan Privasi</Link><Link href="/terms/">Syarat &amp; Ketentuan</Link><button className="preferences-reopen" type="button" onClick={(event) => document.dispatchEvent(new CustomEvent('webzoka:privacy-preferences', { detail: { opener: event.currentTarget } }))}>Pilihan cookie</button></div>
      </div></footer></div>
      <p id="interaction-status" className="sr-only" role="status" aria-live="polite" aria-atomic="true" />
    </div>
    {portalReady && createPortal(<div className="v43 v43-portals" data-page={page}>
      <div className="menu-backdrop" hidden={!mobileOpen} onClick={() => setMobile(false)} />
      <section ref={mobileMenuRef} id="mobile-menu" className={`mobile-menu${mobileAnimated ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu utama" hidden={!mobilePresent}>
        <div className="mobile-brand"><Image src="/images/logo-wide-clean.png" alt="Webzoka" width={462} height={151} unoptimized /></div>
        <button className="dialog-close mobile-close" type="button" aria-label="Tutup menu mobile" onClick={() => setMobile(false)}><CloseIcon /></button>
        <nav aria-label="Navigasi mobile">
          <Link href="/" aria-current={page === 'home' ? 'page' : undefined} onClick={() => setMobile(false, false)}>Beranda</Link><Link href="/karya/" aria-current={page === 'work' ? 'page' : undefined} onClick={() => setMobile(false, false)}>Karya</Link>
          <details className="mobile-services"><summary>Layanan <ChevronIcon /></summary><div><Link href="/layanan/" onClick={() => setMobile(false, false)}>Semua layanan</Link><Link href="/layanan/#website" onClick={() => setMobile(false, false)}>Website</Link><Link href="/layanan/#portal" onClick={() => setMobile(false, false)}>Portal SaaS</Link><Link href="/layanan/#bundle" onClick={() => setMobile(false, false)}>Website + Portal</Link></div></details>
          <DialogButton dialog="about">Tentang Webzoka</DialogButton><DialogButton dialog="consultation">Konsultasi</DialogButton><span className="hub-inactive" aria-disabled="true">Webzoka Hub <small>Belum aktif</small></span>
        </nav>
      </section>
      <dialog ref={(element) => { if (element) dialogRefs.current.about = element }} id="about-dialog" className="mockup-dialog" aria-labelledby="about-title" onClick={closeBackdrop} onClose={restoreDialogFocus}><div className="dialog-panel">
        <button className="dialog-close" type="button" aria-label="Tutup tentang Webzoka" onClick={() => dialogRefs.current.about?.close()}><CloseIcon /></button>
        <p className="section-kicker">Tentang Webzoka</p><h2 id="about-title">Dari tampilan bisnis sampai kerja tim.</h2><p>Webzoka membuat website dan sistem kerja untuk pemilik bisnis Indonesia. Kebutuhan pelanggan di depan dan pekerjaan tim di belakang menjadi titik awal pembahasan.</p><p>Website, Portal SaaS, atau keduanya: pilihannya mengikuti kebutuhan dan lingkup kerja yang disepakati.</p><Link className="button button-blue" href="/layanan/" onClick={() => dialogRefs.current.about?.close()}>Jelajahi layanan</Link><p className="dialog-note"><Link className="text-link" href="/tentang-kami/" onClick={() => dialogRefs.current.about?.close()}>Selengkapnya tentang Webzoka</Link></p>
      </div></dialog>
      <dialog ref={(element) => { if (element) dialogRefs.current.consultation = element }} id="consultation-dialog" className="mockup-dialog" aria-labelledby="consultation-title" onClick={closeBackdrop} onClose={restoreDialogFocus}><div className="dialog-panel">
        <button className="dialog-close" type="button" aria-label="Tutup konsultasi" onClick={() => dialogRefs.current.consultation?.close()}><CloseIcon /></button>
        <p className="section-kicker">Mulai dari percakapan</p><h2 id="consultation-title">Apa yang ingin kamu rapikan?</h2><p>Ceritakan jenis bisnis, kebutuhan website, dan pekerjaan harian yang ingin dibantu. Tim Webzoka membahas lingkup kerja, biaya, dan jadwal sebelum mulai.</p><a className="button button-blue" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Buka WhatsApp Webzoka <span className="sr-only">(tab baru)</span></a><p className="dialog-note">Percakapan berlanjut di WhatsApp. Belum ada pesanan atau pembayaran dari halaman ini.</p>
      </div></dialog>
      <dialog ref={(element) => { if (element) dialogRefs.current.preview = element }} id="preview-dialog" className="mockup-dialog preview-dialog" aria-labelledby="preview-title" aria-describedby="preview-description" onClick={closeBackdrop} onClose={restoreDialogFocus}><div className="dialog-panel">
        <button className="dialog-close" type="button" aria-label="Tutup preview" onClick={() => dialogRefs.current.preview?.close()}><CloseIcon /></button>
        <div className="preview-caption"><span className="status">Preview</span><h2 id="preview-title">{preview.title}</h2><p id="preview-description">{preview.description}</p></div><div className="preview-full"><Image id="preview-image" src={preview.src} alt={`Preview template ${preview.title}`} width={1000} height={preview.height} unoptimized /></div>
      </div></dialog>
    </div>, document.body)}
  </DialogContext.Provider>
}
