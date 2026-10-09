import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import V43Shell from '@/components/v43/V43Shell'
import '@/components/v43/v43.css'
import { waLink } from '@/constants/site'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website — Webzoka',
  description: 'Website bisnis dibuatkan oleh Webzoka, mulai Rp600.000. Konsultasikan scope, harga, dan jadwal sebelum pengerjaan dimulai.',
  alternates: { canonical: 'https://www.webzoka.com/seluruh-layanan/' },
}

const consultationUrl = waLink('Halo Webzoka, saya ingin konsultasi pembuatan website untuk bisnis saya. Mohon bantu jelaskan scope, harga, dan jadwal pengerjaannya.')
const buttonClass = 'button button-blue legacy-button'

export default function ManagedWebsitePage() {
  return (
    <V43Shell page="managed">
      <main id="main-content" tabIndex={-1} className="legacy-page legacy-managed container">
        <section className="legacy-intro legacy-managed-hero">
          <div>
            <p className="section-kicker legacy-kicker">Website Managed Service</p>
            <h1 className="legacy-title">Website bisnismu, dibuatkan oleh Webzoka.</h1>
            <p className="legacy-lead">Tampilkan layanan, produk, dan cara menghubungi bisnismu dalam website yang mudah dipahami. Ceritakan kebutuhanmu; kami bantu menyiapkan desain dan membangun website sesuai scope yang disepakati.</p>
            <a href={consultationUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}><MessageCircle size={20} aria-hidden="true" /> Konsultasi via WhatsApp</a>
          </div>
          <div className="legacy-price-panel">
            <p className="legacy-body">Harga awal pembuatan website</p>
            <p className="legacy-price">Rp600.000</p>
            <p className="legacy-body">Harga final mengikuti kebutuhan. Scope, biaya, jadwal, dan hasil yang akan diserahkan dikonfirmasi sebelum pengerjaan dimulai.</p>
            <p className="legacy-price-note">Ketentuan dan biaya hosting, pemeliharaan, serta perpanjangan disampaikan sebelum pesanan atau perpanjangan dikonfirmasi.</p>
          </div>
        </section>
        <section className="legacy-section">
          <h2 className="legacy-section-title">Website untuk kebutuhan bisnismu</h2>
          <div className="legacy-grid">
            {[
              ['Profil bisnis & jasa', 'Perkenalkan perusahaan, layanan, portofolio, dan jalur konsultasi untuk calon pelanggan.'],
              ['Katalog produk & kuliner', 'Tampilkan produk atau menu, informasi usaha, dan jalur pemesanan yang disepakati.'],
              ['Pendidikan & personal branding', 'Jelaskan program, tampilkan karya, dan bantu pengunjung menghubungi kamu.'],
            ].map(([title, body]) => (
              <article key={title} className="legacy-item">
                <h3 className="legacy-item-title">{title}</h3>
                <p className="legacy-body">{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="legacy-section legacy-columns">
          <div>
            <h2 className="legacy-section-title">Apa yang menentukan scope dan harga?</h2>
            <ul className="legacy-scope-list">
              {['Jumlah halaman dan kebutuhan desain.', 'Kesiapan teks, foto, logo, dan materi bisnis.', 'Fitur khusus, integrasi, atau kebutuhan Portal.', 'Hosting, pemeliharaan, dan dukungan yang disepakati.'].map(item => (
                <li key={item} className="legacy-scope-item"><Check size={20} className="legacy-contact-icon" aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <p className="legacy-body legacy-followup">Kami membantu memilih kebutuhan teknis yang sesuai. Kamu cukup menjelaskan bisnis dan menyiapkan materi yang dibutuhkan; rincian pengerjaan dibahas bersama.</p>
          </div>
          <div className="legacy-process">
            <h2 className="legacy-section-title">Alur pengerjaan</h2>
            <ol className="legacy-process-list">
              {[
                ['Konsultasi', 'Ceritakan bisnis, tujuan website, dan kebutuhan utama melalui WhatsApp.'],
                ['Konfirmasi penawaran', 'Sepakati scope, harga, jadwal, hasil yang diserahkan, dan ketentuan revisi sebelum mulai.'],
                ['Pembuatan & review', 'Kami membangun website dari materi yang tersedia, lalu kamu meninjau hasil sesuai kesepakatan.'],
                ['Peluncuran & dukungan', 'Website diluncurkan setelah review dan persiapan selesai. Dukungan mengikuti layanan yang disepakati.'],
              ].map(([title, body], index) => (
                <li key={title} className="legacy-process-step"><span className="legacy-step-number">{index + 1}</span><div><h3 className="legacy-item-title">{title}</h3><p className="legacy-body">{body}</p></div></li>
              ))}
            </ol>
            <p className="legacy-body legacy-followup">Waktu pengerjaan mengikuti kompleksitas, kesiapan materi, dan proses review. Jadwal dikonfirmasi sebelum pekerjaan dimulai.</p>
          </div>
        </section>
        <section className="legacy-section legacy-bundle">
          <h2 className="legacy-section-title">Butuh Website + Portal?</h2>
          <p className="legacy-body">Website membantu pelanggan mengenal bisnis. Portal SaaS membantu pekerjaan harian seperti stok, pesanan, atau pengelolaan tim. Keduanya dapat dibahas sebagai solusi gabungan sesuai kebutuhan dan kesiapan bisnismu.</p>
          <div className="legacy-actions">
            <a href={consultationUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>Diskusikan kebutuhanmu <ArrowRight size={18} aria-hidden="true" /></a>
            <Link href="/pricing/" className="text-link">Lihat paket Portal SaaS <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
        <nav aria-label="Informasi legal" className="legacy-links">
          <Link href="/privacy/" className="text-link">Kebijakan Privasi</Link>
          <Link href="/terms/" className="text-link">Syarat &amp; Ketentuan</Link>
        </nav>
      </main>
    </V43Shell>
  )
}
