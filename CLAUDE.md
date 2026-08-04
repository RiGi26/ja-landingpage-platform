# ja-corp-landing — CLAUDE.md

Landing corp Webzoka. ⚠️ Nama repo GitHub ≠ nama folder: `RiGi26/ja-landingpage-platform`,
branch default `master`. Root payung + aturan lintas-app ada di `../CLAUDE.md`; file ini
hanya menambah aturan khusus repo ini.

## Standar UI mobile (lintas-app)

Tiap fitur/halaman user-facing WAJIB ikut kontrak mobile payung — invoke skill `/mobile-ui`
sebelum menulis kode; kalau skill tak tersedia (sesi dibuka langsung di repo ini), baca
`../.claude/commands/mobile-ui.md`. Inti: desain dari 390px; body ≥14px, input ≥16px;
target tap ≥44px; tabel → kartu; elemen melayang tak menutupi kontrol + safe-area.
Bukti UAT wajib menyertakan screenshot viewport 390×844.
