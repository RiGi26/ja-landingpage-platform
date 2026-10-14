import Image from 'next/image'
import Link from 'next/link'
import V43Shell, { DialogButton } from '@/components/v43/V43Shell'
import PreviewProject from '@/components/v43/PreviewProject'
import HomeMotion from '@/components/v43/HomeMotion'
import HomeWorkCarousel from '@/components/v43/HomeWorkCarousel'
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
        <HomeWorkCarousel labels={['Japan Arena', 'Rumah Selaras', 'Kopi Senja']}>
          <article className="home-work-card" data-status="live">
            <div className="home-work-media">
              <span className="home-work-category">Pendidikan &amp; LMS</span>
              <div className="home-work-browser-frame">
                <div className="home-work-browser-bar" aria-hidden="true">
                  <span className="home-work-browser-dots"><i /><i /><i /></span>
                  <span>japanarena.id</span>
                </div>
                <Image unoptimized src="/images/portfolio/japan-arena-desktop.png" alt="Tampilan website Japan Arena, sekolah bahasa Jepang dengan Portal belajar" width={1440} height={1000} loading="lazy" />
              </div>
            </div>
            <div className="home-work-card-copy">
              <h3>Japan Arena</h3>
              <p>Website sekolah bahasa Jepang dengan Portal untuk kegiatan belajar.</p>
            </div>
            <footer className="home-work-card-footer">
              <div className="home-work-card-meta">
                <span>Website + Portal belajar</span>
                <span className="status status-live">Live · Produk Webzoka</span>
              </div>
              <a className="text-link home-work-card-action" href="https://www.japanarena.id/" target="_blank" rel="noopener noreferrer" aria-label="Buka website Japan Arena, tab baru">Buka website<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 4h6v6M20 4l-9 9M10 4H4v16h16v-6" /></svg></a>
            </footer>
          </article>
          <PreviewProject project="rumah" heading="h3" presentation="carousel" />
          <PreviewProject project="kopi" heading="h3" presentation="carousel" />
        </HomeWorkCarousel>
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
