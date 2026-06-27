---
name: design-review
description: Menilai kualitas UI/UX sebuah halaman atau komponen (terutama mobile) dengan bukti screenshot dari render sungguhan, lalu memberi verdict + saran berprioritas. Gunakan saat user minta "review desain/tampilan", "apakah tampilan mobile sudah bagus", "saran UX", menilai layout/spacing/hierarki, atau membandingkan opsi tampilan. Bukan untuk mencari bug kode (pakai /code-review) — ini khusus penilaian desain visual & pengalaman pengguna.
---

# Design Review

Nilai UI/UX berbasis **bukti**, bukan asumsi. Selalu render halaman sungguhan,
ambil screenshot di beberapa breakpoint, lalu nilai terhadap standar proyek.

## Sumber kebenaran proyek (baca dulu)
- `.claude/ui-standards.md` — checklist wajib: kontras (WCAG AA), a11y, hierarki heading, gambar, JS.
- `.claude/product-marketing-context.md` — konteks produk/brand (mis. brand = **Webzoka**), nada, audiens.
Temuan harus konsisten dengan kedua file ini. Mis. teks muted minimum `text-gray-600`.

## Proses

### 1. Tentukan target
Halaman/komponen mana, dan device fokus (default: **mobile-first**). Catat route-nya (mis. `/pricing`).

### 2. Render sungguhan + screenshot
Proyek ini **static export** (`output: export`) — `next start` tidak jalan. Pola yang sudah terbukti:
```bash
npm run build                       # hasil ke ./out
npx serve@latest out -l 3212        # jalankan di background
```
Screenshot pakai Chromium pra-instal + Playwright global (env: web). ESM perlu import via path absolut:
```js
import pkg from '/opt/node22/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3212/<route>', { waitUntil: 'networkidle' });
await p.screenshot({ path: '<scratchpad>/shot.png' });
```
Breakpoint standar: **390** (mobile), **768** (tablet), **1280** (desktop). Untuk komponen
interaktif (carousel, sheet, dropdown) ambil juga **state**-nya (tertutup, terbuka, ter-scroll).
Lalu **Read** tiap PNG agar benar-benar dilihat sebelum menilai.

### 3. Nilai per dimensi
- **Layout & spacing** — ruang kosong janggal (mis. kartu dipaksa sama tinggi di carousel mobile), alignment, padding konsisten.
- **Hierarki visual** — apa yang dilihat pertama? Harga/CTA/badge menonjol sesuai tujuan?
- **Pola mobile** — afordans scroll (peek + dot + hint), snap, target sentuh ≥ 44px, teks tidak terpotong.
- **Konsistensi** — spacing/warna/komponen seragam; brand seragam (Webzoka).
- **Aksesibilitas & kontras** — cek terhadap `.claude/ui-standards.md` (kontras, `aria-label`, `aria-expanded`, heading).
- **Konversi** — CTA jelas, paket/elemen rekomendasi ("Paling Populer") terlihat lebih awal.
- **Integritas responsif** — perubahan mobile tidak merusak desktop, dan sebaliknya.

### 4. Output
- **Verdict** ringkas dulu (mis. "scroll samping sudah OK — pertahankan").
- **Temuan berprioritas** dengan label dampak: 🔴 wajib / 🟡 sebaiknya / 🟢 sudah baik.
  Tiap temuan: *bukti* (rujuk screenshot/elemen) → *saran konkret* (class/komponen) → *effort & risiko*.
- Tutup dengan **rekomendasi langkah** (mana dikerjakan dulu) dan tawarkan mengimplementasikan.

## Aturan
- Jangan menilai tanpa screenshot render nyata. "Kelihatannya" tidak cukup.
- Bedakan **mobile vs desktop** — solusi mobile (mis. `items-start`) sering tak cocok desktop (`md:items-stretch`).
- Saran harus actionable: sebut file, class Tailwind, atau pola yang sudah ada di repo untuk dipakai ulang.
- Jangan ubah kode dalam mode review kecuali user setuju; review = menilai + mengusulkan.
- Bersihkan server background setelah selesai bila perlu.
