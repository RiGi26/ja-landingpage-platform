import type { Metadata } from 'next'
import V43Shell from '@/components/v43/V43Shell'
import '@/components/v43/v43.css'
import Link from 'next/link'
import { MapPin, Mail, Phone, ArrowRight, MessageCircle } from 'lucide-react'

const WA_NUMBER = '6281296917963'

export const metadata: Metadata = {
  title: 'Tentang Kami — Webzoka',
  description: 'Kenali layanan Website Managed Service dan Portal SaaS Webzoka untuk kebutuhan bisnis, serta cara menghubungi tim kami.',
  alternates: { canonical: 'https://www.webzoka.com/tentang-kami/' },
  openGraph: {
    title: 'Tentang Kami — Webzoka',
    description: 'Kenali layanan Website Managed Service dan Portal SaaS Webzoka untuk kebutuhan bisnis, serta cara menghubungi tim kami.',
    url: 'https://www.webzoka.com/tentang-kami/',
    siteName: 'Webzoka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/logo-light.jpg', width: 1200, height: 630, alt: 'Webzoka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami — Webzoka',
    description: 'Kenali layanan Website Managed Service dan Portal SaaS Webzoka untuk kebutuhan bisnis, serta cara menghubungi tim kami.',
    images: ['/images/logo-light.jpg'],
  },
}

export default function TentangKamiPage() {
  return (
    <V43Shell page="about">

      <main id="main-content" tabIndex={-1} className="legacy-page legacy-about container">

        {/* Back link */}
        <Link
          href="/"
          className="text-link legacy-back"
        >
          <ArrowRight aria-hidden="true" size={14} className="legacy-back-icon" /> Kembali ke Beranda
        </Link>

        {/* Hero */}
        <div className="legacy-intro">
          <p className="section-kicker legacy-kicker">
            <span aria-hidden="true">🇮🇩</span> Platform Digital Buatan Indonesia
          </p>
          <h1 className="legacy-title">
            Tentang Webzoka
          </h1>
          <p className="legacy-lead">
            Webzoka adalah perusahaan teknologi Indonesia yang membangun perangkat lunak bisnis (SaaS) untuk usaha kecil dan menengah — dari website profesional hingga sistem operasional lengkap.
          </p>
          <p className="legacy-body legacy-followup">
            Nama &quot;Webzoka&quot; mencerminkan visi kami: platform digital yang kuat dan mudah, dibangun dengan hati untuk pelaku bisnis Indonesia.
          </p>
        </div>

        {/* Misi */}
        <div className="legacy-section">
          <h2 className="legacy-section-title">Misi Kami</h2>
          <p className="legacy-body">
            Membantu pemilik usaha kecil dan menengah di seluruh Indonesia untuk tampil profesional secara digital, mengotomasi operasional bisnis mereka, dan berkembang — tanpa harus jadi ahli teknologi.
          </p>
          <div className="legacy-grid legacy-values">
            {[
              { t: 'Jujur', d: 'Harga transparan sejak awal. Tidak ada biaya tersembunyi, tidak ada kontrak paksa.' },
              { t: 'Bisa Dibuktikan', d: 'Semua klaim bisa dicek — demo nyata, portofolio live, harga transparan.' },
              { t: 'Untuk Indonesia', d: 'Bahasa Indonesia, metode bayar Indonesia, support WA dalam bahasa Indonesia.' },
            ].map(v => (
              <div key={v.t} className="legacy-item">
                <p className="legacy-item-title">{v.t}</p>
                <p className="legacy-body">{v.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="legacy-section legacy-contact">
          <h2 className="legacy-section-title">Hubungi Kami</h2>
          <ul className="legacy-contact-list">
            <li className="legacy-contact-row">
              <MapPin aria-hidden="true" size={20} className="legacy-contact-icon" />
              <span>Jakarta Selatan, DKI Jakarta, Indonesia</span>
            </li>
            <li className="legacy-contact-row">
              <Mail aria-hidden="true" size={20} className="legacy-contact-icon" />
              <a href="mailto:webzokacompany@gmail.com" className="text-link legacy-email">webzokacompany@gmail.com</a>
            </li>
            <li className="legacy-contact-row">
              <Phone aria-hidden="true" size={20} className="legacy-contact-icon" />
              <span>+62 812-9691-7963</span>
            </li>
            <li className="legacy-contact-row">
              <MessageCircle aria-hidden="true" size={20} className="legacy-contact-icon" />
              <span>Support WA: Senin–Sabtu, 08.00–17.00 WIB</span>
            </li>
          </ul>
          <div className="legacy-actions">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Halo%20Webzoka%2C%20saya%20ingin%20konsultasi%20tentang%20layanan%20website%20dan%20Portal%20untuk%20bisnis%20saya.`}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-blue legacy-button"
            >
              <MessageCircle aria-hidden="true" size={16} /> Chat Tim Kami
            </a>
          </div>
        </div>

      </main>
    </V43Shell>
  )
}
