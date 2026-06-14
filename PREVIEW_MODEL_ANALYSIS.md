# Analisis Model Preview Konfigurator — Industri vs Sub-Kategori

> Status: **ANALISIS / belum diimplementasikan.** Dokumen rujukan untuk menyambungkan
> preview konfigurator `/seluruh-layanan` (per **industri**) dengan library tema bespoke
> WB (per **sub-kategori**). Dibuat 2026-06-15. Implementasi menunggu keputusan owner (§7).

---

## 1. Masalah

- **Konfigurator menjual di level INDUSTRI** (Step 1 = 13 tile industri), tapi **produk dibangun di level SUB-KATEGORI** (tiap industri punya beberapa tema bespoke).
- Preview sekarang = satu `<iframe>` demo tenant per industri, dikunci oleh `TEMPLATE_PREVIEWS` (key = nama industri) di `app/seluruh-layanan/page.tsx`.
- Tujuan owner: saat semua tema selesai, preview **otomatis tersambung ke tema asli** (single source of truth), pembeli lihat output tema sungguhan — bukan demo legacy/placeholder.

## 2. Temuan inti (grounded ke kode, 2026-06-15)

Mismatch-nya **timpang & terkonsentrasi**, bukan merata:

| Temuan | Detail |
|---|---|
| **Toko Online kelebihan beban** | 1 tile industri → **5 sub-kat / 7 varian** bespoke (kuliner ×2, fashion ×2, kerajinan, kecantikan, gadget), tapi preview cuma 1 demo `batik-larasati` (tema legacy). Pembeli skincare lihat toko batik. |
| **9/13 industri kosong tema** | corporate, klinik, sekolah, personal, blog, travel, jastip, institusi, studio = semua roadmap (`ROADMAP_BESPOKE.md`, 26 tema pending). Nampilin mockup bespoke utk mereka = tidak jujur. |
| **Aset screenshot belum lengkap** | 6 tema live, **hanya 4 ter-shot** (`theme-samples/`: kuliner-tungku, kuliner-pamor, toko-atelier, kecantikan-embun). **kerajinan-tanah, gadget-onyx, restaurant-lux LIVE tapi belum ada screenshot.** `public/` corp belum punya thumbnail tema sama sekali. |
| **🐞 Bug routing** | Tile **"Kuliner & Makanan"** → `industriToTipe()` substring-match `'kuliner'` → **restaurant/finedining**, BUKAN toko-kuliner (Tungku/Pamor) yg dibuat khusus. Preview akan menjanjikan tema yg tak akan dibangun. |
| **Entry hilang / demo rusak** | "Bisnis Jasa & Lainnya" tak punya entry `TEMPLATE_PREVIEWS` (jatuh ke gradient diam-diam). 7 URL `/demo/*` (institusi, personal-branding, blog, rental, jastip, kuliner, studio) kemungkinan 404 — iframe rusak terbaca sbg "ini situs saya nanti". |

### Inventaris tema live (sumber: `taxonomy.ts` THEMES + `BESPOKE_VARIANTS` + `BESPOKE_RENDERERS` + `theme-samples/`)

> **Update 2026-06-15:** sub-kat **rumah** kini LIVE — tema #7 **"rumah-selaras"** (Japandi greige, sesi paralel, PR #158 merged). Jadi toko_online punya **6 sub-kat ready** & total **7 tema live**. Tabel di bawah snapshot 6-tema; **registry auto-derive kondisi terkini**, jadi rumah-selaras (dan tema berikutnya) otomatis ikut begitu generator (Fase 1) dibangun — tak perlu edit manual doc/preview.

| Industri (TipeIndustri) | Sub-kat | Tema (varian) | `themeKey` (renderer) | Screenshot? | Status registry |
|---|---|---|---|---|---|
| toko_online | kuliner | kuliner-tungku, kuliner-pamor | toko-kuliner | ✅ | `live` |
| toko_online | fashion | atelier-noir, atelier-ivoire | toko-atelier | ✅ | `live` |
| toko_online | kecantikan | kecantikan-embun | toko-kecantikan | ✅ | `live` |
| toko_online | kerajinan | kerajinan-tanah | toko-kerajinan | ❌ | `live-noshot` |
| toko_online | gadget | gadget-onyx | toko-gadget | ❌ | `live-noshot` |
| restaurant | finedining | restaurant-lux | restaurant-lux* | ❌ | `live-noshot` |
| (9 industri lain) | — | (roadmap) | — | — | `coming-soon` |

\* `restaurant-lux` sengaja **di luar** `BESPOKE_VARIANTS` (punya jalur `isLux` sendiri) — generator harus menanganinya sebagai entry eksplisit.

## 3. Model preview yang dipertimbangkan

| Model | Cara kerja | Plus | Minus |
|---|---|---|---|
| **A. Flagship/industri** | 1 screenshot tema asli per industri, tanpa step sub-kat | Perubahan terkecil; cepat | Nutupin variasi (5 tema toko jadi 1); pilih "wakil" agak bohong; bug routing tetap |
| **B. Two-level reveal** ⭐ | 13 tile industri → pilih → **galeri tema sub-kategori** (thumbnail asli + nama + swatch + microcopy) | **Bentuk UX = bentuk data**; pamer range di mana padat; mengkerut jujur di mana kosong; bisa pre-seed sub-kat ke brief | Butuh interaktivitas client (oke, sudah client component); butuh thumbnail; handoff `?subkat/?theme` lintas-repo |
| **C. Carousel registry** | Sama data dgn B, tapi preview = swipe carousel horizontal | Juara di mobile (swipe 1 gambar full); — | Carousel sembunyikan opsi (discoverability < grid). **Dipakai sbg skin MOBILE dari B**, bukan model terpisah |
| **D. Galeri tema global** | Galeri semua tema dulu, industri jadi filter | "Wow desain bespoke" maksimal; handoff by theme-id paling bersih | Balik mental model UMKM; galeri keliatan kosong sekarang. **Terlalu dini** (nanti saat 20+ tema) |

## 4. Rekomendasi: **Model B** (grid desktop + carousel mobile), digerakkan registry JSON dari WB

**Kenapa B:** satu-satunya yg bentuk UX-nya sama dgn bentuk data, dan ini end-state yg owner mau ("pembeli lihat output tema asli, tersambung otomatis"). Lawan tiap constraint:

- **Data timpang** → B nunjukin range di toko_online (padat) **dan** mengkerut ke 1 kartu jujur di 9 industri kosong. A under-sell; D over-expose celah.
- **Audiens UMKM mobile** → mereka self-identify dari yg dijual → industri-first benar. Galeri sub-kat pakai microcopy yg sudah ada di `taxonomy.ts` ("Untuk skincare, kosmetik…"). Mobile = carousel full-bleed (model C) biar tak sesak.
- **Static export** → cukup `<img>` dari `public/` (`images.unoptimized` aman). **Alasan kunci B kalahkan ide iframe-per-tema:** iframe ke WB lambat & rapuh di HP, tak bisa di-scale jujur ke 28 tema; PNG statik dari registry = cepat & deterministik.
- **Pipeline lintas-repo** → desain registry-driven inilah yg bikin "tambah tema → muncul di preview" tercapai (lihat §5).

## 5. Arsitektur SSOT (auto-connect)

**Tujuan:** satu kali kerja di WB (kirim tema = entry taxonomy + variant + ledger row + screenshot) → tema muncul di konfigurator CORP **tanpa edit `page.tsx`**.

```
WB (sumber kebenaran — sudah ada)              CORP (static export, repo terpisah)
taxonomy.ts (THEMES, INDUSTRY_SUBKATEGORI) ─┐
variants.ts (BESPOKE_VARIANTS = gerbang     ─┤  scripts/build-theme-registry.mjs
              "output asli?")               ─┤    → theme-registry.json (data)
registry.ts (BESPOKE_RENDERERS)             ─┤    → status dari ada/tidaknya PNG
theme-samples/<id>-{mobile,tablet,desktop}  ─┘
        │
        │  scripts/sync-corp-preview.mjs  (optimize webp + copy lintas-repo)
        ▼
../ja-corp-landing/public/theme-previews/<tipe>/<subkat>/<themeId>-*.webp
../ja-corp-landing/data/theme-registry.json
        ▼
app/seluruh-layanan/page.tsx  → import registry → map jadi galeri (NOL edit logika)
```

**Alur konkret:** owner selesai "Onyx" → `npm run shoot:chrome -- gadget-onyx` → `npm run sync:corp-preview` → review diff di repo CORP → commit → Vercel static rebuild → tile Gadget (di bawah Toko Online) nampilin Onyx asli + bawa `gadget-onyx` ke order. Tanpa sentuh logika `page.tsx`.

**DESIGN_LEDGER = dokumen manusia, BUKAN sumber data.** Generator **tidak** parsing markdown ledger (rapuh). Sumber data = `taxonomy.ts` + `variants.ts` + `registry.ts` + `theme-samples/`. Ledger tetap berperan anti-duplikat + identitas visual + checklist.

### Bentuk registry (generated, jangan edit tangan)

```ts
// Dihasilkan WB scripts/build-theme-registry.mjs; dikonsumsi CORP page.tsx (module scope).
type ViewportThumbs = { mobile: string; tablet: string; desktop: string }

type ThemePreviewEntry = {
  themeId: string            // key BESPOKE_VARIANTS, mis. "gadget-onyx" / "atelier-noir"
  themeKey: string           // key BESPOKE_RENDERERS, mis. "toko-gadget"
  subKategori: string        // "gadget"
  subKategoriNama: string    // "Elektronik / Gadget"
  nama: string               // nama varian, mis. "Onyx"
  deskripsi: string          // microcopy self-select dari taxonomy
  mood: string               // swatch hex, mis. "#22D3EE"
  bg: 'dark' | 'light' | 'warm'
  icon: string               // nama lucide
  status: 'live' | 'live-noshot' | 'coming-soon'  // GERBANG KEJUJURAN
  thumbs: ViewportThumbs | null                    // null saat status != 'live'
  liveDemoUrl?: string       // opsional: tenant asli pakai tema ini
}

type IndustryPreview = {
  tipe: string               // TipeIndustri, mis. "toko_online"
  corpLabels: string[]       // nama tile CORP yg routing ke sini, mis.
                             //   ["Toko Online"] ; ["Website Restaurant","Kuliner & Makanan"]
  hasReadyThemes: boolean    // true jika >=1 entry status:'live'
  subKategori: Array<{ id: string; nama: string; icon: string; themes: ThemePreviewEntry[] }>
  fallback: { tagline: string; mockupGradient: string; sections: string[]; emoji: string }
}

export type ThemeRegistry = Record<string, IndustryPreview>  // key = TipeIndustri
```

## 6. Penanganan kejujuran (struktural, bukan andalan reviewer)

1. **Dua gerbang jadi tile "ini output Anda":** `ready:true` (di `INDUSTRY_SUBKATEGORI`) **DAN** id ada di `BESPOKE_VARIANTS` (atau `restaurant-lux`) **DAN** 3 screenshot ada. Persis seperti `getReadySubKategori()` di brief form → CORP tak akan pernah menawarkan yg WB tak bangun.
2. **Label tiap sample jujur:** "Gaya Onyx — contoh tampilan tema ini · konten nanti diisi punya Anda". Demo tenant lama (batik-larasati dll) **di-relabel** dari "ini Toko Online" → "contoh situs jadi pakai tema X".
3. **Tema live tapi belum di-shot** (`live-noshot`: kerajinan-tanah, gadget-onyx, restaurant-lux): tampil kartu nama+swatch+microcopy **tanpa gambar**, caption "preview gambar segera". Jangan substitusi screenshot tema lain.
4. **Industri tanpa tema** (9): tetap 1 preview wakil tapi label "gaya dasar / tema khusus sedang disiapkan"; ganti iframe `/demo/*` yg 404 dgn gradient mockup.
5. **Ambiguitas Kuliner/Restaurant** = isu kejujuran juga: galeri yg ditawarkan harus = yg `industriToTipe()` + brief form bangun. `corpLabels[]` bikin ini eksplisit & bisa direview.
6. **Tema pre-selected harus sampai ke build:** kalau pembeli tap tema → kirim `?subkat=&theme=` → WB intake **wajib** pre-fill brief form (`branding.variant`). Kalau WB belum dukung, bingkai galeri sbg "inspirasi gaya", bukan "pilihan Anda".

## 7. Keputusan owner yang menentukan (jawab dulu sebelum plan implementasi)

1. **Bug routing "Kuliner & Makanan"** → ke toko_online/kuliner (Tungku/Pamor) atau tetap restaurant/finedining? *(Wajib — kalau tidak, preview janji tema salah.)*
2. **Handoff tema** → pilihan tema di CORP kebawa ke order (`?subkat=&theme=`) + pre-fill brief? *(Linkage paling bernilai; perubahan terkoordinasi CORP+WB. Kalau belum: galeri = "inspirasi gaya".)*
3. **Mekanisme sync** → (rekomendasi) script copy registry+webp ke repo CORP lalu owner commit (CORP self-contained & terversioning), ATAU host di CDN/Supabase Storage + CORP fetch saat build (kurang churn, tapi ada dependency network build-time)?
4. **Rollout bertahap** → luncurkan galeri **Toko Online dulu** (5 sub-kat ready), 12 industri lain tetap model lama sampai wave-nya jadi — oke?
5. **Shoot 3 tema kurang** (kerajinan-tanah, gadget-onyx, restaurant-lux, owner run lokal) → sekarang biar 6/6, atau luncur 4/6 dulu?

Pertanyaan minor: relabel demo tenant lama; perbaiki 7 `/demo/*` yg 404; tambah preview utk "Bisnis Jasa & Lainnya" (#13, tanpa entry).

## 8. Build steps (high-level, dieksekusi setelah keputusan §7)

1. **WB** `scripts/build-theme-registry.mjs` — import THEMES + INDUSTRY_SUBKATEGORI + BESPOKE_VARIANTS + BESPOKE_RENDERERS; emit `theme-registry.json`, status dari keberadaan PNG; exclude `ready:false`; `restaurant-lux` sbg entry eksplisit.
2. **WB** shoot tema kurang: `npm run shoot:chrome -- kerajinan-tanah` / `-- gadget-onyx` / tambah sample restaurant-lux (owner run lokal — sandbox tak bisa shoot).
3. **WB** `scripts/sync-corp-preview.mjs` — optimize PNG → webp (~≤120KB), copy ke `../ja-corp-landing/public/theme-previews/<tipe>/<subkat>/`, tulis `../ja-corp-landing/data/theme-registry.json`. npm script `sync:corp-preview`.
4. **CORP** commit `data/theme-registry.json` + `public/theme-previews/**`; pastikan static export serve via `<img>` biasa.
5. **CORP** refactor `page.tsx` — ganti `TEMPLATE_PREVIEWS` hardcoded dgn lookup dari registry; tile 13 tetap; industri `hasReadyThemes` → galeri ChoiceTile (grid ≥sm, carousel mobile); industri kosong → 1 preview wakil + de-risk `/demo/*`.
6. **CORP** komponen ChoiceTile + galeri/carousel lewat gerbang `/ui-design` + `/make-interfaces-feel-better`; caption lewat `/website-review` (kejujuran).
7. **CORP+WB** handoff `&subkat=&theme=` (jika §7.2 ya); WB intake pre-fill brief. Gate flag sampai verified end-to-end.
8. **WB** resolve routing Kuliner/Restaurant (§7.1) → encode di `corpLabels[]`.
9. **Docs** tambah loop "ship tema → shoot → sync:corp-preview → commit CORP" ke ROADMAP/ledger; opsional CI WB gagal jika tema ready+sellable belum ada screenshot.
10. **QA device asli**: performa carousel 5–7 thumbnail di Toko Online; tak ada iframe 404 sbg "output saya"; tema kepilih selamat sampai brief form.

---

## 9. Rencana implementasi (default rekomendasi diadopsi)

> Keputusan §7 diadopsi pakai **default rekomendasi** di bawah — **asumsi, owner bebas override.**
> Eksekusi WB ditunda sampai owner selesai sesi paralel di repo WB (hindari index.lock/drift).

### 9.1 Keputusan yang diasumsikan
| # | Keputusan | Default diadopsi | Catatan |
|---|---|---|---|
| D1 | Routing "Kuliner & Makanan" | → **toko_online/kuliner** (perbaiki bug) | 2 tile berbeda: "Website Restaurant"=resto/dine-in→restaurant-lux; "Kuliner & Makanan"=UMKM makanan/catering→toko-kuliner (Tungku/Pamor) |
| D2 | Handoff tema ke order | **YA** (`?subkat=&theme=` + WB pre-fill) | Dikerjakan sbg PR terpisah (Fase 3); sebelum itu galeri = "pilihan gaya" yg tetap terkirim |
| D3 | Mekanisme sync | **Script copy ke repo CORP** lalu owner commit | CORP self-contained & terversioning; tanpa dependency network build-time |
| D4 | Rollout | **Toko Online dulu**, 12 industri lain model lama | Galeri muncul hanya utk industri `hasReadyThemes` |
| D5 | Shoot tema kurang | **Owner shoot 3** (kerajinan-tanah, gadget-onyx, restaurant-lux) → 6/6; boleh launch 4/6 (`live-noshot` aman) | Sandbox tak bisa `shoot:chrome` (winmm crash) → owner run lokal |

### 9.2 Urutan eksekusi (4 fase, 3 PR + aksi owner)

**FASE 0 — Owner (prasyarat, lokal):**
- Konfirmasi/override D1–D5 di atas.
- `npm run shoot:chrome -- kerajinan-tanah` · `-- gadget-onyx` · tambah sample `restaurant-lux` (opsional bila mau 6/6 saat launch).

**FASE 1 — PR di WB `ja-websitebuilder-platform` (generator + sync):**
- `scripts/build-theme-registry.mjs` — import `THEMES`+`INDUSTRY_SUBKATEGORI` (taxonomy.ts), `BESPOKE_VARIANTS` (variants.ts), `BESPOKE_RENDERERS` (registry.ts). Emit `theme-registry.json` sesuai bentuk §5. Aturan: hanya sub-kat `ready:true`; status `live` jika id∈BESPOKE_VARIANTS (atau restaurant-lux) **dan** 3 PNG ada di `theme-samples/`, else `live-noshot`; `ready:false` → exclude. Isi `corpLabels[]` sesuai D1.
- `scripts/sync-corp-preview.mjs` — optimize `theme-samples/*.png` → webp ≤~120KB → copy ke `../ja-corp-landing/public/theme-previews/<tipe>/<subkat>/<themeId>-{mobile,tablet,desktop}.webp`; tulis `../ja-corp-landing/data/theme-registry.json`.
- npm scripts: `build:theme-registry`, `sync:corp-preview` (jalankan build lalu copy).
- Opsional: CI guard — gagal jika tema ready+sellable tak punya screenshot.
- *Gate:* tsc + CI. *Verifikasi:* jalankan `sync:corp-preview`, cek `theme-registry.json` + webp landing benar di corp working tree.

**FASE 2 — PR di CORP `ja-corp-landing` (konsumsi registry + galeri Model B):**
- Commit `data/theme-registry.json` + `public/theme-previews/**` (hasil Fase 1).
- `app/seluruh-layanan/page.tsx`: ganti `TEMPLATE_PREVIEWS` hardcoded → lookup dari registry via padanan `industriToTipe(label)` (perlu helper label→tipe di corp, atau registry pakai `corpLabels[]`).
- Industri `hasReadyThemes` → komponen **`ThemeGallery`**: grid `≥sm`, **carousel swipe di mobile** (snap + dots, no lib). Tiap kartu = `ChoiceTile` (thumbnail webp / kartu noshot + nama + swatch `mood` + microcopy `deskripsi` + badge status). Caption jujur (§6).
- Industri tanpa tema → tetap 1 preview wakil; ganti iframe `/demo/*` 404 dgn gradient mockup; relabel demo lama jadi "contoh situs jadi pakai tema X". Tambah preview/representasi utk "Bisnis Jasa & Lainnya".
- *Gate WAJIB:* `/ui-design` + `/make-interfaces-feel-better` (galeri/carousel) + `/website-review` (caption kejujuran). *Verifikasi:* tsc + Vercel preview; QA mobile carousel Toko Online (5–7 thumbnail), tak ada 404 iframe sbg "output saya".

**FASE 3 — PR CORP+WB (handoff tema, flag-gated):**
- CORP: builder URL order tambah `&subkat=&theme=` saat user pilih tema spesifik.
- WB `/order` intake: baca param → pre-select sub-kategori + tema di brief form (`branding.variant`). Hormati guardrail PR sebelumnya (draft/handleSubmit/skip-logic). Gate flag sampai verified end-to-end.
- *Verifikasi:* tema kepilih di corp → kebawa → ke-pre-fill di brief → tersimpan ke build.

### 9.3 Checklist aksi owner
- [ ] Konfirmasi/override D1–D5 (§9.1)
- [ ] Shoot kerajinan-tanah · gadget-onyx · restaurant-lux (lokal)
- [ ] Setelah Fase 1 jalan: `npm run sync:corp-preview`, review diff CORP, commit
- [ ] Putuskan PR vs direct-push tiap fase (default: PR, karena multi-file/logic)

### 9.4 Catatan eksekusi
- Engine bespoke universal (`BESPOKE_RENDERERS`/`BESPOKE_VARIANTS`) sudah ada → generator tinggal baca, **tak nambah cabang renderer**.
- Tiap tema baru di masa depan: shoot → `sync:corp-preview` → commit CORP → otomatis muncul. **Nol edit `page.tsx`.**
- Jangan jalankan sesi/koding paralel di repo WB bersamaan dgn owner (risiko index.lock/drift).
