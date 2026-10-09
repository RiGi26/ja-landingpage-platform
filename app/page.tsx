import Image from 'next/image'
import Link from 'next/link'
import V43Shell, { DialogButton } from '@/components/v43/V43Shell'
import PreviewProject from '@/components/v43/PreviewProject'
import '@/components/v43/v43.css'

export default function HomePage() {
  return (
    <V43Shell page="home">
      <main id="main-content" tabIndex={-1}>
        <section className="home-hero hybrid-hero container" aria-labelledby="home-title">
          <div className="hero-heading">
            <div className="hero-copy">
              <p className="section-kicker">Webzoka · Website &amp; sistem</p>
              <h1 id="home-title">Website untuk bisnis.<br />Sistem untuk kerja tim.</h1></div>
            <div className="hero-aside">
              <p className="hero-description">Kami membuat website dan Portal untuk kebutuhan bisnis Indonesia, dari tampilan di depan pelanggan sampai pekerjaan harian tim.</p>
              <Link className="button button-blue" href="/layanan/">Jelajahi layanan</Link></div>
          </div>
          <div className="hero-media">
            <figure className="hero-screen">
              <a className="hero-image-link" href="https://www.japanarena.id/" target="_blank" rel="noopener noreferrer" aria-label="Buka situs publik Japan Arena, tab baru"><Image unoptimized src="/images/portfolio/japan-arena-desktop.png" alt="Tampilan situs publik Japan Arena yang aktif" width="1440" height="1000" priority /></a>
              <figcaption>
                <div><strong>Japan Arena</strong><span>Website + Portal belajar · Produk Webzoka</span></div><span className="status status-live">Live</span></figcaption>
            </figure></div>
        </section>
        <section className="home-work container section-space" aria-labelledby="home-work-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Arah tampilan lainnya</p>
              <h2 id="home-work-title">Dua usaha, dua karakter.</h2></div>
            <Link className="text-link" href="/karya/">Lihat semua karya</Link></div>
          <div className="project-grid project-grid-home">
            <PreviewProject project="rumah" heading="h3" />
            <PreviewProject project="kopi" heading="h3" />
          </div>
          <p className="gallery-note">Preview merupakan contoh tampilan template, bukan website pelanggan aktif.</p>
        </section>
        <section className="home-services container" aria-labelledby="home-services-title">
          <p className="section-kicker">Layanan Webzoka</p>
          <div className="home-services-grid">
            <div className="home-services-copy">
              <h2 id="home-services-title">Website, Portal,<br />atau keduanya.</h2>
              <p>Mulai dari kebutuhanmu. Website untuk pelanggan mengenal usaha; Portal untuk tim mengelola pekerjaan berikutnya.</p></div>
            <nav className="service-paths" aria-label="Pilihan layanan">
              <Link className="service-path" href="/layanan/#website">
                <h3>Website</h3>
                <p>Perkenalkan usaha dan beri pelanggan jalur kontak yang jelas.</p></Link>
              <Link className="service-path" href="/layanan/#portal">
                <h3>Portal SaaS</h3>
                <p>Bahas sistem untuk pekerjaan harian, pengguna, dan data tim.</p></Link>
              <Link className="service-path" href="/layanan/#bundle">
                <h3>Website + Portal</h3>
                <p>Rencanakan tampilan bisnis dan alur kerja tim bersama.</p></Link>
            </nav>
          </div>
        </section>
        <section className="contact-strip container">
          <h2>Mulai dari kebutuhan bisnismu.</h2>
          <DialogButton className="button button-blue" type="button" dialog="consultation">Konsultasi dengan Webzoka</DialogButton></section>
      </main>
    </V43Shell>
  )
}
