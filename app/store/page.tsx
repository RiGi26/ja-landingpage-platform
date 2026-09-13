import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Eye, MapPin, MessageCircle, ShoppingBag } from 'lucide-react'
import StoreShell from '@/components/store/StoreShell'
import { warmCommerceMetadata } from '@/data/warm-commerce'
import styles from './StoreLanding.module.css'

export default function StorePage() {
  return (
    <StoreShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>Webzoka Store V2 · Prototype</p>
              <h1>Pilih template yang terasa seperti bisnismu.</h1>
            </div>
            <div className={styles.heroCopy}>
              <p>
                Mulai dari bentuk visual dan alur pelanggan. Setelah cocok, Webzoka membantu
                menyesuaikan isi, warna, dan kebutuhan operasionalnya.
              </p>
              <span>1 template tersedia untuk evaluasi</span>
            </div>
          </div>
        </header>

        <section id="template" className={styles.templates} aria-labelledby="template-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Template perdana</p>
            <h2 id="template-title">Dibuat untuk cara pelanggan benar-benar membeli.</h2>
            <p>Warm Commerce menempatkan foto produk, menu, harga, dan jalur pesan di depan.</p>
          </div>

          <article className={styles.templateCard}>
            <Link
              href="/store/template/warm-commerce/preview"
              className={styles.visual}
              aria-label="Lihat preview Warm Commerce"
            >
              <div className={styles.browserBar} aria-hidden="true">
                <span><i /><i /><i /></span>
                <small>dapur-rona.demo</small>
              </div>
              <Image
                src="/images/store/warm-commerce/dapur-rona-spread.webp"
                alt="Hidangan pempek, pastel, dan es teh dalam tampilan Warm Commerce"
                fill
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 64vw, 720px"
              />
              <span className={styles.previewPrompt}><Eye size={16} aria-hidden="true" /> Lihat Preview</span>
            </Link>

            <div className={styles.cardCopy}>
              <div className={styles.cardMeta}>
                <span className={styles.status}><i aria-hidden="true" />{warmCommerceMetadata.status}</span>
                <span>Template {warmCommerceMetadata.category}</span>
              </div>
              <h3>{warmCommerceMetadata.name}</h3>
              <p>{warmCommerceMetadata.summary}</p>
              <ul aria-label="Kemampuan utama Warm Commerce">
                <li><ShoppingBag size={16} aria-hidden="true" /> Katalog</li>
                <li><MessageCircle size={16} aria-hidden="true" /> WhatsApp</li>
                <li><MapPin size={16} aria-hidden="true" /> Lokasi</li>
              </ul>
              <div className={styles.actions}>
                <Link href="/store/template/warm-commerce/preview" className={styles.primaryAction}>
                  Lihat Preview <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/store/template/warm-commerce" className={styles.secondaryAction}>
                  Lihat detail
                </Link>
              </div>
            </div>
          </article>
        </section>

        <footer className={styles.note}>
          <p><strong>Status Preview.</strong> Prototype ini belum menjadi katalog Store lengkap atau alur pembelian mandiri.</p>
          <Link href="/seluruh-layanan">Butuh paket yang sudah tersedia? Buka kalkulator lama <ArrowRight size={15} aria-hidden="true" /></Link>
        </footer>
      </div>
    </StoreShell>
  )
}
