'use client'

import { useEffect } from 'react'

// Program Mitra — tangkap ?ref=KODE di landing (static export, tanpa
// middleware) ke localStorage, umur 30 hari. Kode lalu dibawa ke form
// order websitebuilder lewat parameter &ref= (lihat seluruh-layanan).
const KEY = 'ja_ref'
const TS_KEY = 'ja_ref_ts'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000
const CODE_RE = /^[A-Za-z0-9]{4,16}$/

export function getStoredRef(): string | null {
  try {
    const ts = Number(localStorage.getItem(TS_KEY) || 0)
    if (!ts || Date.now() - ts > MAX_AGE_MS) return null
    const code = localStorage.getItem(KEY)
    return code && CODE_RE.test(code) ? code.toUpperCase() : null
  } catch {
    return null
  }
}

export default function RefCapture() {
  useEffect(() => {
    try {
      // window.location.search (bukan useSearchParams) — aman untuk
      // static export tanpa Suspense boundary.
      const code = new URLSearchParams(window.location.search).get('ref')
      if (code && CODE_RE.test(code)) {
        localStorage.setItem(KEY, code.toUpperCase())
        localStorage.setItem(TS_KEY, String(Date.now()))
        return
      }
      // Bersihkan kode kedaluwarsa.
      const ts = Number(localStorage.getItem(TS_KEY) || 0)
      if (ts && Date.now() - ts > MAX_AGE_MS) {
        localStorage.removeItem(KEY)
        localStorage.removeItem(TS_KEY)
      }
    } catch { /* localStorage tidak tersedia — abaikan */ }
  }, [])
  return null
}
