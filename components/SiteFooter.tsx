import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react'
import { WB_URL, waLink } from '@/constants/site'

const WA_TANYA_UMUM = 'Halo Webzoka, saya ingin tanya soal layanan dulu sebelum mulai.'

// Footer situs — dipakai di beranda dan /pricing. Padding bawah mobile menyisakan
// ruang untuk sticky CTA bar (fixed) supaya baris copyright tidak tertutup.
export default function SiteFooter() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-black/5 pt-20 pb-28 md:pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-full md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Image src="/images/logo-wide-clean.png" alt="Webzoka — Part of Japan Arena Corp" width={170} height={56} className="h-11 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Untuk bisnis yang sudah capek ngurus semuanya sendiri — dari website profesional sampai operasional yang berjalan otomatis. Tanpa ribet, tanpa drama.
            </p>
            <a
              href={waLink(WA_TANYA_UMUM)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0071E3] hover:text-[#005BB5] transition-colors"
            >
              <Phone size={16} /> Chat tim kami di WhatsApp
            </a>
          </div>

          {/* Product Links */}
          <div className="col-span-1 md:col-span-2 space-y-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Platform</p>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="https://lms.webzoka.com" className="hover:text-[#0071E3] transition-colors">LMS Portal</a></li>
              <li><a href="https://clinic.webzoka.com" className="hover:text-[#0071E3] transition-colors">Clinic Management</a></li>
              <li><a href="https://pharmacy.webzoka.com" className="hover:text-[#0071E3] transition-colors">Pharmacy System</a></li>
              <li><a href="https://laundry.webzoka.com" className="hover:text-[#0071E3] transition-colors">Laundry Kiloan</a></li>
              <li><a href="https://stock.webzoka.com" className="hover:text-[#0071E3] transition-colors">Stok &amp; Operasi</a></li>
              <li><Link href="/seluruh-layanan" className="hover:text-[#0071E3] transition-colors">Rakit Website Custom</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 md:col-span-2 space-y-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Perusahaan</p>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/tentang-kami" className="hover:text-[#0071E3] transition-colors">Tentang Kami</Link></li>
              <li><Link href="/pricing" className="hover:text-[#0071E3] transition-colors">Harga Sistem Bisnis</Link></li>
              <li><Link href="/kebijakan-privasi" className="hover:text-[#0071E3] transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/syarat-ketentuan" className="hover:text-[#0071E3] transition-colors">Syarat &amp; Ketentuan</Link></li>
              <li>
                <a href={`${WB_URL}/track`} className="hover:text-[#0071E3] transition-colors">
                  Lacak Pesanan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-full md:col-span-4 space-y-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Hubungi Kami</p>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex gap-3">
                <MapPin size={18} className="text-[#0071E3] shrink-0" />
                <span>Jakarta Selatan, DKI Jakarta, Indonesia</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-[#0071E3] shrink-0" />
                <span>contact@webzoka.com</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-[#0071E3] shrink-0" />
                <span>+62 812-9691-7963</span>
              </li>
              <li className="flex gap-3">
                <MessageCircle size={18} className="text-[#0071E3] shrink-0" />
                <span>Support WA: Senin–Sabtu, 08.00–17.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[12px] text-gray-600 font-medium">
              &copy; {new Date().getFullYear()} Webzoka. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Webzoka adalah nama usaha terdaftar yang beroperasi di bawah hukum Republik Indonesia.
            </p>
          </div>
          <div className="flex gap-8 text-[12px] text-gray-600 font-medium">
            <Link href="/kebijakan-privasi" className="hover:text-[#0071E3] transition-colors">Kebijakan Privasi</Link>
            <Link href="/syarat-ketentuan" className="hover:text-[#0071E3] transition-colors">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
