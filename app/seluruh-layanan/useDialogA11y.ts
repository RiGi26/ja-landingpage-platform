'use client'
// Hook aksesibilitas dialog/bottom-sheet: scroll-lock body, simpan & kembalikan
// fokus, Esc untuk menutup, dan focus-trap (termasuk re-capture bila fokus
// sempat lolos keluar dialog — sebab background tidak di-`inert`). Pola ini
// diangkat dari ThemePreviewModal supaya sheet lain memakai perilaku yang sama.
import { useEffect, RefObject } from 'react'

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Penghitung dialog terbuka — di-`inert`-kan konten halaman (#app-shell) hanya
// saat ada dialog, dan baru dilepas setelah dialog TERAKHIR tertutup (cegah
// salah-lepas saat dua dialog tumpang-tindih). Shell ada di app/layout.tsx;
// dialog di-portal ke <body> (sibling shell) jadi tak ikut ter-inert.
let openDialogCount = 0
function setShellInert(active: boolean) {
  const shell = document.getElementById('app-shell')
  if (!shell) return
  if (active) {
    openDialogCount += 1
    if (openDialogCount === 1) shell.toggleAttribute('inert', true)
  } else {
    openDialogCount = Math.max(0, openDialogCount - 1)
    if (openDialogCount === 0) shell.toggleAttribute('inert', false)
  }
}

export function useDialogA11y(
  open: boolean,
  onClose: () => void,
  dialogRef: RefObject<HTMLElement>,
) {
  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setShellInert(true)

    // Fokus awal ke elemen fokusabel pertama di dalam dialog.
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const root = dialogRef.current
      if (!root) return
      const focusables = root.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (!root.contains(active)) {
        e.preventDefault()
        first.focus()
        return
      }
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      setShellInert(false)
      prevFocus?.focus?.()
    }
  }, [open, onClose, dialogRef])
}
