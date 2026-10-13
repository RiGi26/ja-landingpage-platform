'use client'

import { useEffect, type RefObject } from 'react'

export default function useHeaderVisibility(headerRef: RefObject<HTMLElement>, pinned: boolean, page: string) {
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const show = (visible: boolean) => { header.dataset.headerHidden = String(!visible) }
    show(true)
    if (pinned) return

    let lastY = Math.max(0, window.scrollY)
    let direction = 0
    let intent = 0
    let frame = 0
    let pointerPinned = false
    let headerHeight = header.offsetHeight

    const update = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      const delta = y - lastY
      lastY = y
      if (y <= headerHeight) {
        intent = 0
        show(true)
        return
      }
      if (delta === 0) return
      const nextDirection = Math.sign(delta)
      if (nextDirection !== direction) {
        direction = nextDirection
        intent = 0
      }
      intent += Math.abs(delta)
      if (intent < 12) return
      show(direction < 0 || pointerPinned || Boolean(header.querySelector(':focus-visible')))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      if (event.clientY <= 16) {
        pointerPinned = true
        show(true)
      } else if (pointerPinned) {
        pointerPinned = event.clientY <= headerHeight || (event.target instanceof Node && header.contains(event.target))
        if (!pointerPinned && direction > 0 && window.scrollY > headerHeight && !header.querySelector(':focus-visible')) show(false)
      }
    }
    const onFocus = () => { intent = 0; show(true) }
    const onResize = () => {
      headerHeight = header.offsetHeight
      lastY = Math.max(0, window.scrollY)
      direction = 0
      intent = 0
      pointerPinned = false
      show(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    header.addEventListener('focusin', onFocus)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('pointermove', onPointerMove)
      header.removeEventListener('focusin', onFocus)
      delete header.dataset.headerHidden
    }
  }, [headerRef, pinned, page])
}
