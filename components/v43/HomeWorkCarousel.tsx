'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Children, useEffect, useId, useRef, useState, type ReactNode } from 'react'

type HomeWorkCarouselProps = {
  children: ReactNode
  labels: string[]
}

export default function HomeWorkCarousel({ children, labels }: HomeWorkCarouselProps) {
  const slides = Children.toArray(children)
  const trackRef = useRef<HTMLDivElement>(null)
  const positionsRef = useRef<number[]>([0])
  const [positionCount, setPositionCount] = useState(1)
  const [activePosition, setActivePosition] = useState(0)
  const id = useId()
  const headingId = `${id}-heading`
  const trackId = `${id}-track`

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0

    const updateActive = () => {
      const positions = positionsRef.current
      const nearest = positions.reduce((best, position, index) => (
        Math.abs(position - track.scrollLeft) < Math.abs(positions[best] - track.scrollLeft) ? index : best
      ), 0)
      setActivePosition(nearest)
    }

    const measure = () => {
      const elements = Array.from(track.children) as HTMLElement[]
      const firstLeft = elements[0]?.getBoundingClientRect().left ?? 0
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
      const positions = [0]
      elements.forEach(element => {
        const position = Math.min(maxScroll, Math.max(0, element.getBoundingClientRect().left - firstLeft))
        if (position - positions[positions.length - 1] > 1) positions.push(position)
      })
      positionsRef.current = positions
      setPositionCount(positions.length)
      updateActive()
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActive)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(track)
    Array.from(track.children).forEach(element => observer.observe(element))
    track.addEventListener('scroll', onScroll, { passive: true })
    measure()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      track.removeEventListener('scroll', onScroll)
    }
  }, [slides.length])

  const goTo = (index: number) => {
    const track = trackRef.current
    const positions = positionsRef.current
    if (!track) return
    const next = Math.max(0, Math.min(index, positions.length - 1))
    track.scrollTo({
      left: positions[next],
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  if (!slides.length) return null

  return (
    <section className="home-work container section-space" aria-labelledby={headingId}>
      <div className="section-heading home-work-heading" data-home-reveal>
        <div>
          <p className="section-kicker">Karya &amp; konsep desain</p>
          <h2 id={headingId}>Eksplorasi karya &amp; karakter.</h2>
        </div>
        <div className="home-work-heading-actions">
          <div className="home-work-controls" role="group" aria-label="Navigasi karya">
            <button type="button" className="home-work-arrow" aria-label="Karya sebelumnya" aria-controls={trackId} disabled={activePosition === 0} onClick={() => goTo(activePosition - 1)}>
              <ArrowLeft size={16} aria-hidden="true" /> <span className="home-work-arrow-label">Sebelumnya</span>
            </button>
            <div className="home-work-dots" aria-label="Posisi karya">
              {Array.from({ length: positionCount }, (_, index) => (
                <button key={index} type="button" className="home-work-dot" aria-label={`Tampilkan posisi ${index + 1} dari ${positionCount}`} aria-current={activePosition === index ? 'true' : undefined} aria-controls={trackId} onClick={() => goTo(index)}>
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
            <button type="button" className="home-work-arrow" aria-label="Karya berikutnya" aria-controls={trackId} disabled={activePosition === positionCount - 1} onClick={() => goTo(activePosition + 1)}>
              <span className="home-work-arrow-label">Berikutnya</span> <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          <Link className="text-link home-work-all" href="/karya/">Lihat semua karya <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="home-work-track-wrap" data-home-reveal>
        <div
          ref={trackRef}
          id={trackId}
          className="home-work-track"
          role="region"
          aria-roledescription="carousel"
          aria-label="Karya dan konsep desain Webzoka"
          tabIndex={0}
          onKeyDown={event => {
            if (event.target !== event.currentTarget) return
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home' || event.key === 'End') {
              event.preventDefault()
              goTo(event.key === 'Home' ? 0 : event.key === 'End' ? positionCount - 1 : activePosition + (event.key === 'ArrowRight' ? 1 : -1))
            }
          }}
          onFocusCapture={event => {
            const track = trackRef.current
            const slide = (event.target as HTMLElement).closest<HTMLElement>('.home-work-slide')
            if (!track || !slide) return
            const trackBounds = track.getBoundingClientRect()
            const slideBounds = slide.getBoundingClientRect()
            if (slideBounds.left < trackBounds.left || slideBounds.right > trackBounds.right) {
              const firstLeft = track.firstElementChild?.getBoundingClientRect().left ?? trackBounds.left
              track.scrollTo({ left: Math.min(track.scrollWidth - track.clientWidth, Math.max(0, slideBounds.left - firstLeft)), behavior: 'auto' })
            }
          }}
        >
          {slides.map((slide, index) => (
            <div className="home-work-slide" key={index} role="group" aria-roledescription="slide" aria-label={`${index + 1} dari ${slides.length}: ${labels[index] ?? 'Karya Webzoka'}`}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <p className="home-work-position" aria-live="polite" aria-atomic="true">Posisi {activePosition + 1} dari {positionCount}</p>
    </section>
  )
}
