import { Quote, ExternalLink } from 'lucide-react'
import { TESTIMONIALS } from '@/constants/testimonials'

// Blok testimoni klien. Hanya merender entri yang punya kutipan ASLI (quote != '').
// Bila belum ada satu pun kutipan, section tidak ditampilkan sama sekali — mencegah
// testimoni palsu ter-publish (lihat catatan di constants/testimonials.ts).
export default function Testimonials() {
  const items = TESTIMONIALS.filter((t) => t.quote.trim().length > 0)
  if (items.length === 0) return null

  return (
    <section id="testimoni" className="bg-white py-24 lg:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-12">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">
            Kata Mereka
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight sf-display-heavy">
            Yang Sudah Jalan Bareng Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => {
            const meta = [t.name, t.city].filter(Boolean).join(' · ')
            return (
              <figure
                key={t.business}
                className="reveal flex flex-col rounded-[28px] bg-[#F5F5F7] border border-black/[0.03] p-7"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <Quote size={26} className="text-[#0071E3] mb-4 shrink-0" aria-hidden="true" />
                <blockquote className="flex-1 text-gray-800 leading-relaxed text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-[#0071E3] text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {t.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold text-gray-900 text-sm truncate">{t.business}</span>
                    {meta && <span className="block text-xs text-gray-500 truncate">{meta}</span>}
                  </span>
                  {t.siteUrl && (
                    <a
                      href={t.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto shrink-0 text-gray-400 hover:text-[#0071E3] transition-colors"
                      aria-label={`Buka situs ${t.business}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
