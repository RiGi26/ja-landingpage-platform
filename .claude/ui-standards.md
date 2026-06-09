# UI Standards — Japan Arena Corp Landing

Checklist ini wajib diverifikasi sebelum setiap PR yang menyentuh UI.
Berdasarkan PSI audit japanarena.com (Juni 2026).

---

## IMAGE

- Gambar baru → cek dimensi file vs dimensi tampil
- Logo/icon: maksimal **128×128px**, format PNG terkompresi atau SVG
- Foto konten: gunakan `next/image` dengan `width` dan `height` akurat
- Tidak ada gambar >100KB tanpa alasan (foto hero: ok, icon: tidak)
- Compress: `sharp(input).resize(W,H).png({compressionLevel:9}).toFile(output)`

## CONTRAST (WCAG AA)

| Class | Background | Ratio | Status |
|---|---|---|---|
| `text-gray-400` | white | 2.6:1 | ❌ FAIL — gunakan `text-gray-600` |
| `text-gray-500` | white | 3.9:1 | ⚠️ BORDERLINE |
| `text-gray-600` | white | 5.9:1 | ✅ PASS |
| `text-gray-500` | `#F5F5F7` | ~3.7:1 | ⚠️ BORDERLINE |
| `text-blue-100` | `#0071E3` | ~2.1:1 | ❌ FAIL — gunakan `text-white` |

**Aturan praktis:** teks muted minimum `text-gray-600`. Kalau ukuran <12px, minimum `text-gray-700`.

## ACCESSIBILITY

- Button hanya icon → wajib `aria-label="..."` 
- Toggle button → tambah `aria-expanded={isOpen}`
- Link hanya icon → tambah `aria-label`
- Input tanpa visible label → tambah `aria-label`

## HEADING HIERARCHY

```
h1  → satu per page, di hero
  h2  → section title
    h3  → card title, item title dalam section
      h4  → sub-item (jarang)
p   → navigation labels di footer (BUKAN h4)
```

- Tidak boleh lompat level (h1 → h3 tanpa h2)
- Footer nav header: gunakan `<p>` bukan `<h4>`

## JAVASCRIPT

- `browserslist` di package.json: `[">0.3%", "not dead", "not op_mini all", "not ie 11"]`
- Jangan polyfill manual untuk: `Array.at`, `Array.flat`, `Object.fromEntries`, `Object.hasOwn`
- CSS transitions: **jangan** `transition: all` → spesifikkan: `transition: transform 200ms ease`

---

## Quick Mental Checklist (30 detik)

Sebelum `git add`:

1. **Ada gambar baru?** → Berapa KB? Wajar tidak untuk ukuran tampilnya?
2. **Ada teks baru warna muted?** → `gray-400`? Ganti ke `gray-600`
3. **Ada button baru tanpa teks?** → Ada `aria-label`?
4. **Ada heading baru?** → Levelnya benar?
