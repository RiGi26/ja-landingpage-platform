'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  getAnalyticsConsent,
  loadAnalytics,
  subscribeAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent as ConsentValue,
} from '@/lib/analytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()

export default function AnalyticsConsent() {
  const pathname = usePathname()
  const isV43 = pathname === '/' || pathname === '/layanan' || pathname === '/layanan/' || pathname === '/karya' || pathname === '/karya/'
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, () => null)
  const [showPreferences, setShowPreferences] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const panelRef = useRef<HTMLElement>(null)
  const preferencesOpener = useRef<HTMLElement | null>(null)
  const visible = (consent === null || showPreferences) && (!isV43 || !overlayOpen)

  useEffect(() => {
    if (consent === 'granted') loadAnalytics(GA_MEASUREMENT_ID)
  }, [consent])

  useEffect(() => {
    const onReopen = (event: Event) => {
      const detail = (event as CustomEvent<{ opener?: HTMLElement }>).detail
      preferencesOpener.current = detail?.opener ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
      setShowPreferences(true)
    }
    const onOverlay = () => setOverlayOpen(Boolean(document.body.dataset.v43Overlay))
    onOverlay()
    document.addEventListener('webzoka:privacy-preferences', onReopen)
    document.addEventListener('webzoka:v43-overlay', onOverlay)
    return () => {
      document.removeEventListener('webzoka:privacy-preferences', onReopen)
      document.removeEventListener('webzoka:v43-overlay', onOverlay)
    }
  }, [])

  useEffect(() => {
    if (!isV43) return
    const surface = document.querySelector<HTMLElement>('.v43-shell .page-surface')
    const wasVisible = document.body.classList.contains('v43-consent-visible')
    const scrollPosition = wasVisible ? surface?.scrollTop ?? 0 : window.scrollY
    const measure = () => document.body.style.setProperty('--consent-space', `${visible && panelRef.current ? panelRef.current.getBoundingClientRect().height + 32 : 0}px`)
    document.body.classList.toggle('v43-consent-visible', visible)
    measure()
    if (surface && wasVisible !== visible) {
      if (visible) {
        surface.scrollTop = scrollPosition
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      } else {
        window.scrollTo({ top: scrollPosition, behavior: 'instant' as ScrollBehavior })
        surface.scrollTop = 0
      }
    }
    const observer = new ResizeObserver(measure)
    if (panelRef.current) observer.observe(panelRef.current)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [isV43, pathname, visible])

  useEffect(() => {
    if (!isV43) return
    const surface = document.querySelector<HTMLElement>('.v43-shell .page-surface')
    return () => {
      const scrollPosition = surface?.scrollTop ?? 0
      const wasVisible = document.body.classList.contains('v43-consent-visible')
      document.body.classList.remove('v43-consent-visible')
      document.body.style.removeProperty('--consent-space')
      if (wasVisible && surface?.isConnected) {
        window.scrollTo({ top: scrollPosition, behavior: 'instant' as ScrollBehavior })
        surface.scrollTop = 0
      }
    }
  }, [isV43])

  useEffect(() => {
    if (showPreferences && visible) panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true })
  }, [showPreferences, visible])

  const saveConsent = (nextConsent: ConsentValue) => {
    setAnalyticsConsent(nextConsent)
    setShowPreferences(false)
    if (isV43) {
      const target = showPreferences && preferencesOpener.current?.isConnected ? preferencesOpener.current : document.getElementById('main-content')
      requestAnimationFrame(() => target?.focus({ preventScroll: true }))
      const status = document.getElementById('interaction-status')
      if (status) status.textContent = nextConsent === 'granted' ? 'Analitik diterima.' : 'Analitik ditolak.'
    }
    preferencesOpener.current = null
  }

  if (isV43) return (
    <div className="analytics-controls v43">
      {visible ? (
        <section ref={panelRef} id="cookie-panel" role="dialog" aria-labelledby="analytics-consent-title" className="cookie-panel analytics-consent-panel">
          <h2 id="analytics-consent-title" className="sr-only">Pilihan analitik</h2>
          <div className="cookie-copy">
            <p>Kami memakai analitik untuk memahami penggunaan halaman dan alur template agar pengalaman Webzoka dapat diperbaiki. Analitik tidak menerima isi draft, nama, nomor WhatsApp, pesan, token, atau user-ID. Pilihan ini dapat diubah kapan saja.</p>
            <a href="/privacy/">Kebijakan Privasi</a>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cookie-choice" onClick={() => saveConsent('granted')}>Terima analitik</button>
            <button type="button" className="cookie-choice" onClick={() => saveConsent('denied')}>Tolak</button>
          </div>
        </section>
      ) : null}
    </div>
  )

  return (
    <div className="analytics-controls">
      {visible ? (
        <section
          ref={panelRef}
          role="dialog"
          aria-labelledby="analytics-consent-title"
          className="analytics-consent-panel fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-black/10 bg-white p-5 shadow-2xl md:inset-x-auto md:right-6 md:w-[min(42rem,calc(100vw-3rem))]"
        >
          <h2 id="analytics-consent-title" className="text-base font-bold text-gray-900">
            Pilihan analitik
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Kami memakai analitik untuk memahami penggunaan halaman dan alur template agar pengalaman Webzoka dapat diperbaiki. Analitik tidak menerima isi draft, nama, nomor WhatsApp, pesan, token, atau user-ID. Pilihan ini dapat diubah kapan saja.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Detailnya ada di <a className="font-semibold text-blue-700 underline" href="/kebijakan-privasi/">Kebijakan Privasi</a>.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => saveConsent('granted')} className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700">
              Terima analitik
            </button>
            <button type="button" onClick={() => saveConsent('denied')} className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Tolak
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={(event) => { preferencesOpener.current = event.currentTarget; setShowPreferences(true) }}
          className="analytics-privacy-reopen fixed bottom-4 left-4 z-[90] rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-lg hover:bg-gray-50"
        >
          Pengaturan privasi
        </button>
      )}
      <div id="mobile-consultation-slot" className="analytics-consultation-slot" data-consent-panel-visible={visible} />
    </div>
  )
}
