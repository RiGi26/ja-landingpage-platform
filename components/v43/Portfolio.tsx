'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DialogButton } from './V43Shell'
import PreviewProject from './PreviewProject'

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'live' | 'preview'>('all')
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="work-gallery hybrid-work container" aria-labelledby="work-title">
        <div className="work-intro">
          <p className="section-kicker">Karya Webzoka</p>
          <h1 id="work-title" className="work-statement">Karya yang bisa kamu lihat.</h1>
          <p className="work-description">Jelajahi produk kami dan contoh tampilan website. Setiap karya punya kebutuhan dan karakter sendiri.</p></div>
        <div className="work-toolbar" role="group" aria-label="Filter karya"><span className="section-kicker">Tampilkan</span><button className="filter-pill" type="button" data-filter="all" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Semua</button><button className="filter-pill" type="button" data-filter="live" aria-pressed={filter === 'live'} onClick={() => setFilter('live')}>Live</button><button className="filter-pill" type="button" data-filter="preview" aria-pressed={filter === 'preview'} onClick={() => setFilter('preview')}>Preview</button></div>
        <div className="project-grid project-grid-work">
          <article className="project project-featured" data-status="live" hidden={filter === 'preview'}><a className="project-visual" href="https://www.japanarena.id/" target="_blank" rel="noopener noreferrer" aria-label="Buka situs publik Japan Arena, tab baru"><Image unoptimized src="/images/portfolio/japan-arena-desktop.png" alt="Japan Arena, situs publik aktif" width="1440" height="1000" priority /></a>
            <div className="project-info">
              <h2>Japan Arena</h2>
              <p className="project-note">Situs publik untuk mengenalkan program belajar bahasa Jepang.</p>
              <div className="project-meta"><span>Website + Portal belajar</span><span className="status status-live">Live</span></div></div></article>
          <PreviewProject project="rumah" heading="h2" hidden={filter === 'live'} />
          <PreviewProject project="kopi" heading="h2" hidden={filter === 'live'} />
        </div>
        <p className="gallery-note">Live menandai situs publik yang aktif. Preview merupakan contoh tampilan template, bukan website pelanggan.</p>
      </section>
      <section className="contact-strip container">
        <h2>Apa yang ingin kamu buat?</h2>
        <DialogButton className="button button-blue" type="button" dialog="consultation">Ceritakan kebutuhanmu</DialogButton></section>
      <p className="sr-only" role="status" aria-live="polite">{filter === 'live' ? 1 : filter === 'preview' ? 2 : 3} karya ditampilkan.</p>
    </main>
  )
}
