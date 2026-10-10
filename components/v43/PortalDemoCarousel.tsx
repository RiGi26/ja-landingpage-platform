'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

const portalSlides = [
  {
    name: 'Portal Stock',
    src: '/images/portfolio/portal-stock-dashboard.jpg',
    alt: 'Dashboard Portal Stock pada akun showcase Webzoka dengan ringkasan stok dan pesanan.',
    caption: 'Portal Stock - Dashboard Operasional Webzoka',
    status: 'Showcase',
  },
  {
    name: 'Portal Clinic',
    src: '/images/portfolio/portal-clinic-dashboard.jpg',
    alt: 'Dashboard Portal Clinic pada akun showcase Webzoka dengan checklist persiapan klinik.',
    caption: 'Portal Clinic - Dashboard Clinic Webzoka',
    status: 'Showcase',
  },
  {
    name: 'Portal Pharmacy',
    src: '/images/portfolio/portal-pharmacy-dashboard.jpg',
    alt: 'Dashboard Portal Pharmacy pada akun showcase Webzoka dengan ringkasan operasional apotek.',
    caption: 'Portal Pharmacy - Dashboard Apotek Webzoka',
    status: 'Showcase',
  },
  {
    name: 'Portal Laundry',
    src: '/images/portfolio/portal-laundry-dashboard.jpg',
    alt: 'Dashboard Portal Laundry pada akun showcase Webzoka dengan ringkasan layanan dan pesanan.',
    caption: 'Portal Laundry - Dashboard Laundry Webzoka',
    status: 'Showcase',
  },
  {
    name: 'Portal LMS',
    src: '/images/portfolio/japan-arena-student-dashboard-desktop.jpg',
    alt: 'Dashboard belajar siswa Japan Arena versi desktop dengan navigasi samping.',
    caption: 'Japan Arena - Dashboard Belajar Siswa',
    status: 'Live',
  },
] as const

export default function PortalDemoCarousel() {
  const viewportId = useId()
  const viewportRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const scrollSettleTimeoutRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = portalSlides[activeIndex]

  const scrollToSlide = useCallback((index: number) => {
    const viewport = viewportRef.current
    if (!viewport) return

    viewport.scrollTo({
      left: index * viewport.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
    setActiveIndex(index)
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' && activeIndex < portalSlides.length - 1) {
      event.preventDefault()
      scrollToSlide(activeIndex + 1)
    } else if (event.key === 'ArrowLeft' && activeIndex > 0) {
      event.preventDefault()
      scrollToSlide(activeIndex - 1)
    } else if (event.key === 'Home' && activeIndex > 0) {
      event.preventDefault()
      scrollToSlide(0)
    } else if (event.key === 'End' && activeIndex < portalSlides.length - 1) {
      event.preventDefault()
      scrollToSlide(portalSlides.length - 1)
    }
  }

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current !== null) return

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null
      const viewport = viewportRef.current
      if (!viewport || viewport.clientWidth === 0) return

      if (scrollSettleTimeoutRef.current !== null) {
        window.clearTimeout(scrollSettleTimeoutRef.current)
      }

      scrollSettleTimeoutRef.current = window.setTimeout(() => {
        const settledViewport = viewportRef.current
        if (!settledViewport || settledViewport.clientWidth === 0) return

        const nextIndex = Math.min(
          portalSlides.length - 1,
          Math.max(0, Math.round(settledViewport.scrollLeft / settledViewport.clientWidth)),
        )
        setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex)
        scrollSettleTimeoutRef.current = null
      }, 140)
    })
  }, [])

  useEffect(() => () => {
    if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current)
    if (scrollSettleTimeoutRef.current !== null) window.clearTimeout(scrollSettleTimeoutRef.current)
  }, [])

  return (
    <>
      <div
        className="portal-carousel-viewport"
        id={viewportId}
        ref={viewportRef}
        role="region"
        aria-label="Contoh dashboard Portal Webzoka"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
      >
        {portalSlides.map((slide, index) => (
          <div
            className="portal-carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} dari ${portalSlides.length}: ${slide.name}`}
            aria-hidden={index !== activeIndex}
            key={slide.name}
          >
            <Image
              unoptimized
              src={slide.src}
              alt={slide.alt}
              width={1440}
              height={slide.status === 'Live' ? 900 : 720}
              style={slide.status === 'Live' ? { objectFit: 'contain' } : undefined}
              sizes="(max-width: 1023px) 100vw, 45vw"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="portal-carousel-controls">
        <button
          className="portal-carousel-arrow"
          type="button"
          aria-label={`Slide sebelumnya${activeIndex > 0 ? `: ${portalSlides[activeIndex - 1].name}` : ''}`}
          aria-controls={viewportId}
          disabled={activeIndex === 0}
          onClick={() => scrollToSlide(activeIndex - 1)}
        >
          <ChevronLeft size={19} strokeWidth={1.8} aria-hidden="true" />
        </button>

        <div className="portal-carousel-center">
          <p
            className="portal-carousel-position"
            role="status"
            aria-label={`Slide ${activeIndex + 1} dari ${portalSlides.length}: ${activeSlide.name}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="portal-carousel-current">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="portal-carousel-total" aria-hidden="true"> / {String(portalSlides.length).padStart(2, '0')}</span>
            <span className="portal-carousel-title">{' '}{activeSlide.name}</span>
          </p>
          <div className="portal-carousel-progress" role="group" aria-label="Pilih tampilan portal">
            {portalSlides.map((slide, index) => (
              <button
                className={index === activeIndex ? 'is-active' : ''}
                type="button"
                key={slide.name}
                aria-label={`Tampilkan ${slide.name}`}
                aria-pressed={index === activeIndex}
                aria-controls={viewportId}
                onClick={() => scrollToSlide(index)}
              >
                <span />
              </button>
            ))}
          </div>
        </div>

        <button
          className="portal-carousel-arrow"
          type="button"
          aria-label={`Slide berikutnya${activeIndex < portalSlides.length - 1 ? `: ${portalSlides[activeIndex + 1].name}` : ''}`}
          aria-controls={viewportId}
          disabled={activeIndex === portalSlides.length - 1}
          onClick={() => scrollToSlide(activeIndex + 1)}
        >
          <ChevronRight size={19} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      <figcaption className="portal-carousel-caption">
        <span className="status">{activeSlide.status}</span>
        <span>
          {activeSlide.caption}
        </span>
      </figcaption>
    </>
  )
}
