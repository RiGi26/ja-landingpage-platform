import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import V43Shell, { DialogButton } from '@/components/v43/V43Shell'
import PortalDemoCarousel from '@/components/v43/PortalDemoCarousel'
import '@/components/v43/v43.css'

export const metadata: Metadata = {
  title: 'Layanan — Webzoka',
  description: 'Website membantu pelanggan mengenal usahamu. Portal membantu tim menjalankan pekerjaan harian. Pilih salah satu atau rencanakan keduanya bersama.',
  alternates: { canonical: 'https://www.webzoka.com/layanan/' },
  openGraph: {
    title: 'Layanan — Webzoka',
    description: 'Website dan Portal, sesuai kebutuhan bisnismu.',
    url: 'https://www.webzoka.com/layanan/',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
}

export default function ServicesPage() {
  return (
    <V43Shell page="services">
      <main id="main-content" tabIndex={-1}>
        <section className="services-intro container">
          <nav className="breadcrumb" aria-label="Jejak halaman">
            <Link href="/">Beranda</Link><span aria-hidden="true">/</span><span>Layanan</span></nav>
          <div className="hero-copy">
            <p className="section-kicker">Layanan Webzoka</p>
            <h1>Website dan Portal, sesuai kebutuhan bisnismu.</h1>
            <p>Website membantu pelanggan mengenal usahamu. Portal membantu tim menjalankan pekerjaan harian. Pilih salah satu atau rencanakan keduanya bersama.</p>
            <DialogButton className="button button-light" type="button" dialog="consultation">Diskusikan kebutuhanmu</DialogButton>
            <nav className="service-index" aria-label="Pilih jenis layanan">
              <Link href="#website">Website</Link>
              <Link href="#portal">Portal SaaS</Link>
              <Link href="#bundle">Website + Portal</Link></nav>
          </div>
        </section>

        <div className="offerings container">
          <p className="section-kicker offerings-label">Pilih layanan yang sesuai kebutuhanmu</p>

          <section id="website" className="service-chapter">
            <div className="service-content">
              <p className="section-kicker">01 · Website Managed Service</p>
              <h2>Website</h2>
              <p className="service-lead">Beri pelanggan tempat yang jelas untuk mengenal usaha, melihat penawaran, dan menghubungimu.</p>
              <p className="scope-label">Lingkup pembahasan</p>
              <ul className="service-scope">
                <li>Halaman, teks, foto, dan desain yang dibutuhkan.</li>
                <li>Fitur dan integrasi sesuai lingkup kerja.</li>
                <li>Hosting, pemeliharaan, dan biaya perpanjangan.</li>
              </ul>
              <dl className="service-facts">
                <div><dt>Cocok untuk</dt><dd>Profil usaha, katalog, layanan, atau portofolio.</dd></div>
                <div><dt>Harga awal</dt><dd>Mulai Rp600.000 untuk Website dasar.</dd></div>
              </dl>
              <details className="service-details">
                <summary>Hal yang perlu disepakati <span aria-hidden="true">+</span></summary>
                <div className="details-content">
                  <p>Biaya, jadwal, hasil yang diserahkan, revisi, serta ketentuan hosting dan pemeliharaan dibahas sebelum kamu memberi konfirmasi.</p>
                  <Link className="text-link" href="/seluruh-layanan/">Detail layanan website</Link>
                </div>
              </details>
            </div>
            <div className="service-examples">
              <figure className="service-media">
                <Image unoptimized src="/theme-previews/toko_online/rumah/rumah-selaras-desktop.webp" alt="Preview template website Rumah Selaras" width="1000" height="750" loading="lazy" />
                <figcaption><span className="status">Preview</span>Rumah Selaras · Contoh visual template website.</figcaption>
              </figure>
            </div>
          </section>

          <section id="portal" className="service-chapter">
            <div className="service-content">
              <p className="section-kicker">02 · Portal SaaS</p>
              <h2>Portal SaaS</h2>
              <p className="service-lead">Bantu tim mencatat dan menangani pekerjaan harian. Pilihan Portal mengikuti alur usaha, pengguna, dan kebutuhan data.</p>
              <p className="scope-label">Lingkup pembahasan</p>
              <ul className="service-scope">
                <li>Alur kerja yang ingin dibantu.</li>
                <li>Peran tim, akses pengguna, dan kebutuhan data.</li>
                <li>Kesiapan produk, dukungan, dan ketentuan langganan.</li>
              </ul>
              <dl className="service-facts">
                <div><dt>Contoh kebutuhan</dt><dd>Stok dan pesanan, kegiatan belajar, administrasi klinik dan apotek, serta operasional laundry.</dd></div>
                <div><dt>Biaya</dt><dd>Mengikuti produk, kebutuhan, dan dukungan.</dd></div>
              </dl>
              <details className="service-details">
                <summary>Memilih Portal yang sesuai <span aria-hidden="true">+</span></summary>
                <div className="details-content">
                  <p>Kita mulai dari pekerjaan yang ingin dirapikan, siapa yang memakai sistem, dan data yang dibutuhkan. Kesiapan fitur, biaya, serta ketentuan langganan dijelaskan sebelum kamu memutuskan.</p>
                  <Link className="text-link" href="/pricing/">Paket Portal</Link>
                </div>
              </details>
            </div>
            <div className="service-examples">
              <figure className="service-media portal-demo-media">
                <PortalDemoCarousel />
              </figure>
            </div>
          </section>

          <section id="bundle" className="service-chapter">
            <div className="service-content">
              <p className="section-kicker">03 · Website + Portal Bundle</p>
              <h2>Website + Portal</h2>
              <p className="service-lead">Rencanakan tampilan untuk pelanggan dan langkah kerja tim sejak awal. Kebutuhan keduanya dibahas dalam satu lingkup kerja.</p>
              <p className="scope-label">Lingkup pembahasan</p>
              <ul className="service-scope">
                <li>Perjalanan pelanggan dan pekerjaan tim berikutnya.</li>
                <li>Data serta integrasi yang diperlukan.</li>
                <li>Tahapan pengerjaan dan dukungan.</li>
              </ul>
              <dl className="service-facts">
                <div><dt>Cocok untuk</dt><dd>Usaha yang membutuhkan website dan alur kerja tim.</dd></div>
                <div><dt>Lingkup dan biaya</dt><dd>Mengikuti kebutuhan dan kesiapan sistem.</dd></div>
              </dl>
              <details className="service-details">
                <summary>Merencanakan keduanya <span aria-hidden="true">+</span></summary>
                <div className="details-content">
                  <p>Fitur dan integrasi mengikuti kesiapan produk serta lingkup kerja yang disepakati. Biaya Website, Portal, dan dukungan dibahas sebelum mulai.</p>
                  <p>Contoh Japan Arena menampilkan website publik dan dashboard belajar siswa. Gambar dashboard diambil dari tampilan akun siswa.</p>
                </div>
              </details>
            </div>
            <div className="service-examples">
              <figure className="service-media bundle-preview">
                <div className="bundle-preview-stage">
                  <div className="bundle-preview-website">
                    <span className="bundle-preview-label">Website publik</span>
                    <Image unoptimized src="/images/portfolio/japan-arena-desktop.png" alt="Website publik Japan Arena" width="1440" height="1000" loading="lazy" />
                  </div>
                  <div className="bundle-preview-portal">
                    <span className="bundle-preview-label">Dashboard siswa</span>
                    <div className="bundle-preview-dashboard">
                      <Image unoptimized src="/images/portfolio/japan-arena-student-dashboard-desktop.jpg" alt="Dashboard belajar siswa Japan Arena versi desktop" width="1440" height="900" loading="lazy" />
                    </div>
                  </div>
                </div>
                <figcaption><span className="status status-live">Live</span>Japan Arena · Website publik dan dashboard siswa. Tangkapan layar tampilan produk.</figcaption>
              </figure>
            </div>
          </section>
        </div>

        <section className="bundle-strip">
          <div className="container">
            <h2>Mulai dari kebutuhan bisnismu.</h2>
            <p>Ceritakan kebutuhan website dan pekerjaan harian timmu. Tim Webzoka membahas pilihan, lingkup kerja, biaya, dan jadwal sebelum mulai.</p>
            <DialogButton className="button button-light" type="button" dialog="consultation">Diskusikan kebutuhanmu</DialogButton>
          </div>
        </section>
      </main>
    </V43Shell>
  )
}
