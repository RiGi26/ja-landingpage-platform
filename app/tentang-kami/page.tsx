import Navbar from '@/components/LmsNavbar'
import Link from 'next/link'
import { MapPin, Mail, Phone, ArrowRight, MessageCircle } from 'lucide-react'

const WA_NUMBER = '6281296917963'

export const metadata = {
  title: 'Tentang Kami — Japan Arena Corp',
  description: 'Japan Arena Corp adalah platform digital buatan Indonesia untuk UKM. Website builder, LMS, portal klinik, farmasi, dan travel — semuanya dalam satu ekosistem.',
}

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      <main className="max-w-4xl mx-auto pt-36 pb-24 px-4">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors mb-10"
        >
          <ArrowRight size={14} className="rotate-180" /> Kembali ke Beranda
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3">
            🇮🇩 Platform Digital Buatan Indonesia
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight sf-display-heavy mb-6">
            Tentang Japan Arena Corp
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Japan Arena Corp adalah perusahaan teknologi Indonesia yang membangun perangkat lunak bisnis (SaaS) untuk usaha kecil dan menengah — dari website profesional hingga sistem operasional lengkap.
          </p>
          <p className="text-base text-gray-500 leading-relaxed max-w-2xl mt-4">
            Nama "Japan Arena" mencerminkan visi kami: standar kualitas dan presisi ala Jepang, dibangun dengan hati untuk pelaku bisnis Indonesia.
          </p>
        </div>

        {/* Misi */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 apple-shadow border border-black/[0.03] mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Misi Kami</h2>
          <p className="text-gray-600 leading-relaxed">
            Membantu pemilik usaha kecil dan menengah di seluruh Indonesia untuk tampil profesional secara digital, mengotomasi operasional bisnis mereka, dan berkembang — tanpa harus jadi ahli teknologi.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { t: 'Jujur', d: 'Harga transparan sejak awal. Tidak ada biaya tersembunyi, tidak ada kontrak paksa.' },
              { t: 'Bisa Dibuktikan', d: 'Semua klaim bisa dicek — demo nyata, portofolio nyata, uptime nyata.' },
              { t: 'Untuk Indonesia', d: 'Bahasa Indonesia, metode bayar Indonesia, support WA dalam bahasa Indonesia.' },
            ].map(v => (
              <div key={v.t} className="bg-[#F5F5F7] rounded-[20px] p-5">
                <p className="font-black text-gray-900 mb-2">{v.t}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team placeholder */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 apple-shadow border border-dashed border-black/10 mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Tim Kami</h2>
          <p className="text-gray-400 text-sm italic">
            {/* TODO: Isi dengan profil tim — nama, foto, peran */}
            Halaman ini sedang dilengkapi. Hubungi kami via WhatsApp untuk tahu lebih lanjut tentang tim di balik Japan Arena Corp.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 apple-shadow border border-black/[0.03]">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Hubungi Kami</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-[#0071E3] shrink-0 mt-0.5" />
              <span>Jakarta Selatan, DKI Jakarta, Indonesia</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={20} className="text-[#0071E3] shrink-0 mt-0.5" />
              <a href="mailto:contact@japanarena.com" className="hover:text-[#0071E3] transition-colors">contact@japanarena.com</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={20} className="text-[#0071E3] shrink-0 mt-0.5" />
              <span>+62 812-9691-7963</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={20} className="text-[#0071E3] shrink-0 mt-0.5" />
              <span>Support WA: Senin–Sabtu, 08.00–17.00 WIB</span>
            </li>
          </ul>
          <div className="mt-8">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Halo%20Japan%20Arena%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20perusahaan.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0071E3] text-white font-bold rounded-full hover:bg-[#005BB5] transition-all"
            >
              <MessageCircle size={16} /> Chat Tim Kami
            </a>
          </div>
        </div>

      </main>
    </div>
  )
}
