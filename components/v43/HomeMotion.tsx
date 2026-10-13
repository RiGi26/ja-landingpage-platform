'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function HomeMotion({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    if (!main || reducedMotion.matches || !('IntersectionObserver' in window)) return

    const elements = Array.from(main.querySelectorAll<HTMLElement>('[data-home-reveal]'))
    // Keep SSR and already-visible content readable; enhance only below the fold.
    const pending = elements.filter((element) => element.getBoundingClientRect().top >= innerHeight)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('home-reveal-pending')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })

    pending.forEach((element) => {
      element.classList.add('home-reveal-pending')
      observer.observe(element)
    })

    const revealAll = () => {
      observer.disconnect()
      pending.forEach((element) => element.classList.remove('home-reveal-pending'))
    }
    const onMotionChange = () => { if (reducedMotion.matches) revealAll() }
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      const element = event.target.closest<HTMLElement>('.home-reveal-pending')
      if (element) {
        element.classList.remove('home-reveal-pending')
        observer.unobserve(element)
      }
    }

    main.addEventListener('focusin', onFocus)
    reducedMotion.addEventListener('change', onMotionChange)
    return () => {
      revealAll()
      main.removeEventListener('focusin', onFocus)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <main ref={mainRef} id="main-content" className="home-canvas" tabIndex={-1}>{children}</main>
}
