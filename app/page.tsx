import Image from 'next/image'
import Link from 'next/link'
import V43Shell, { DialogButton } from '@/components/v43/V43Shell'
import PreviewProject from '@/components/v43/PreviewProject'
import HomeMotion from '@/components/v43/HomeMotion'
import '@/components/v43/v43.css'
import '@/components/v43/home.css'

export default function HomePage() {
  return (
    <V43Shell page="home">
      <HomeMotion>
        <section className="home-hero hybrid-hero container" aria-labelledby="home-title">
          <div className="hero-heading">
            <div className="hero-copy">
              <p className="section-kicker home-enter home-enter-kicker">Webzoka · Website &amp; sistem</p>
              <h1 id="home-title"><span className="home-title-line home-enter">Website untuk bisnis.</span><span className="home-title-line home-enter">Sistem untuk kerja tim.</span></h1></div>
            <div className="hero-aside">
              <p className="hero-description home-enter">Kami membuat website dan Portal untuk kebutuhan bisnis Indonesia, dari tampilan di depan pelanggan sampai pekerjaan harian tim.</p>
              <Link className="button button-blue home-enter" href="/layanan/">Jelajahi layanan</Link></div>
          </div>
          <div className="hero-media home-enter">
            <figure className="hero-screen">
              <a className="hero-image-link" href="https://www.japanarena.id/" target="_blank" rel="noopener noreferrer" aria-label="Buka situs publik Japan Arena, tab baru"><Image unoptimized src="/images/portfolio/japan-arena-desktop.png" alt="Tampilan situs publik Japan Arena yang aktif" width="1440" height="1000" priority /></a>
              <figcaption>
                <div><strong>Japan Arena</strong><span>Website + Portal belajar · Produk Webzoka</span></div><span className="status status-live">Live</span></figcaption>
            </figure></div>
        </section>
        <section className="home-work container section-space" aria-labelledby="home-work-title">
          <div className="section-heading" data-home-reveal>
            <div>
              <p className="section-kicker">Arah tampilan lainnya</p>
              <h2 id="home-work-title">Dua usaha, dua karakter.</h2></div>
            <Link className="text-link" href="/karya/">Lihat semua karya</Link></div>
          <div className="project-grid project-grid-home">
            <div className="home-project" data-home-reveal><PreviewProject project="rumah" heading="h3" /></div>
            <div className="home-project" data-home-reveal><PreviewProject project="kopi" heading="h3" /></div>
          </div>
        </section>
        <section className="home-services container" aria-labelledby="home-services-title">
          <p className="section-kicker" data-home-reveal>Layanan Webzoka</p>
          <div className="home-services-grid">
            <div className="home-services-copy" data-home-reveal>
              <h2 id="home-services-title">Website, Portal,<br />atau keduanya.</h2>
              <p>Mulai dari kebutuhanmu. Website untuk pelanggan mengenal usaha; Portal untuk tim mengelola pekerjaan berikutnya.</p></div>
            <nav className="service-paths" aria-label="Pilihan layanan">
              <Link className="service-path" href="/layanan/#website" data-home-reveal>
                <h3>Website</h3>
                <p>Perkenalkan usaha dan beri pelanggan jalur kontak yang jelas.</p></Link>
              <Link className="service-path" href="/layanan/#portal" data-home-reveal>
                <h3>Portal SaaS</h3>
                <p>Bahas sistem untuk pekerjaan harian, pengguna, dan data tim.</p></Link>
              <Link className="service-path" href="/layanan/#bundle" data-home-reveal>
                <h3>Website + Portal</h3>
                <p>Rencanakan tampilan bisnis dan alur kerja tim bersama.</p></Link>
            </nav>
          </div>
        </section>
        <section className="contact-strip container" data-home-reveal>
          <h2>Mulai dari kebutuhan bisnismu.</h2>
          <DialogButton className="button button-blue" type="button" dialog="consultation">Konsultasi dengan Webzoka</DialogButton></section>
      </HomeMotion>
    </V43Shell>
  )
}
