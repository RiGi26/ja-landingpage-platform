import {
  Users, MessageCircle, FileText, BookOpen, GraduationCap,
  Lock, Check, ArrowRight, Zap, Shield, Clock,
  X, Star, ChevronRight, Video, HardDrive, Globe2,
} from 'lucide-react'
import LmsNavbar from '@/components/LmsNavbar'
import LmsFaq    from '@/components/LmsFaq'

const LMS_URL    = process.env.NEXT_PUBLIC_LMS_URL    ?? 'https://app.japanarenacorp.com'
const WA_NUMBER  = process.env.NEXT_PUBLIC_WA_NUMBER  ?? '6281296917963'
const JASTIP_URL = process.env.NEXT_PUBLIC_JASTIP_URL ?? 'https://ja-jastip-platform.vercel.app'

const waLink = (msg?: string): string => {
  const base = `https://wa.me/${WA_NUMBER}`
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white pt-28 pb-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Sistem Manajemen Bisnis by Japan Arena Corp
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Stop Urus Administrasi.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                Fokus ke Bisnis Anda.
              </span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed">
              Sistem LMS siap pakai — portal, invoice otomatis, notifikasi WA,
              absensi, hingga laporan keuangan. Setup 1–3 hari, langsung jalan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all hover:scale-[1.02] text-base shadow-lg shadow-blue-200"
              >
                Konsultasi Gratis Sekarang <ArrowRight size={16} />
              </a>
              <a
                href={`${LMS_URL}/demo`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-base"
              >
                Lihat Demo Platform →
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400 pt-1">
              <span className="flex items-center gap-1.5"><Check size={13} className="text-green-500" /> Setup 1–3 hari kerja</span>
              <span className="flex items-center gap-1.5"><Check size={13} className="text-green-500" /> Tanpa coding</span>
              <span className="flex items-center gap-1.5"><Check size={13} className="text-green-500" /> Support via WA</span>
              <span className="flex items-center gap-1.5"><Check size={13} className="text-green-500" /> Tidak perlu server sendiri</span>
            </div>
          </div>

          {/* Right — dashboard mockup + floating cards */}
          <div className="relative">
            {/* Floating card top-right */}
            <div className="absolute -top-4 -right-2 bg-white rounded-xl shadow-xl border border-gray-100 px-3.5 py-2.5 z-10 animate-bounce">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white font-black text-[10px] flex-shrink-0">
                  87%
                </div>
                <p className="text-xs font-bold text-gray-700 leading-tight">Hemat Waktu<br />Administrasi</p>
              </div>
            </div>

            {/* Floating card bottom-left */}
            <div className="absolute -bottom-4 -left-2 bg-white rounded-xl shadow-xl border border-gray-100 px-3.5 py-2.5 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-[10px] flex-shrink-0">
                  3hr
                </div>
                <p className="text-xs font-bold text-gray-700 leading-tight">Setup<br />Selesai</p>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xl shadow-gray-100">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-3 bg-gray-50 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono border border-gray-100">
                  dashboard.bisnis-anda.com/admin
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Total User',      val: '127',   color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100'   },
                  { label: 'Aktif Bulan Ini', val: '89',    color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100'  },
                  { label: 'Pemasukan',        val: '42jt',  color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100'   },
                  { label: 'WA Terkirim',      val: '1.2rb', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
                ].map(s => (
                  <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3`}>
                    <p className={`text-xl font-black ${s.color} mb-0.5`}>{s.val}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Siswa Terbaru</p>
                  {['Budi Santoso · Kelas A · Aktif', 'Rina Wahyu · Kelas B · Aktif', 'Ahmad Fauzi · Kelas A · Lunas'].map(s => (
                    <div key={s} className="flex items-center gap-2.5 mb-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0" />
                      <span className="text-[11px] text-gray-500">{s}</span>
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <p className="text-[10px] text-blue-700 font-black">📲 WA Invoice Terkirim</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Budi Santoso · Rp 2.500.000 · Lunas</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <p className="text-[10px] text-green-700 font-black">✅ Absensi Otomatis Tercatat</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Kelas A · Pertemuan 12 · 23 hadir</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <p className="text-[10px] text-blue-700 font-black">📊 Laporan Keuangan Siap</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Mei 2026 · Pemasukan Rp 42jt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Social Proof Bar ─────────────────────────────────────────────────────────

function SocialProofBar() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dipercaya oleh</p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
            <GraduationCap size={13} className="text-blue-600" />
          </div>
          <span className="text-sm font-bold text-gray-700">Japan Arena Academy</span>
          <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-200">AKTIF</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-sm italic">
          <span>+ bisnis lainnya sedang onboarding...</span>
        </div>
      </div>
    </section>
  )
}

// ─── Problem Section ──────────────────────────────────────────────────────────

function ProblemSection() {
  const problems = [
    { icon: '😩', text: 'Absensi lewat grup WA — berantakan, susah direkap' },
    { icon: '🕐', text: 'Buat invoice manual satu per satu — buang waktu berjam-jam' },
    { icon: '📊', text: 'Data progress siswa di Excel — tidak real-time, sering salah' },
    { icon: '📁', text: 'Materi disebar via Google Drive — tidak terkontrol, link kadaluarsa' },
    { icon: '💬', text: 'Reminder kelas via WA manual — sering lupa, tidak konsisten' },
    { icon: '🤯', text: 'Tidak ada laporan keuangan otomatis — hitung manual tiap bulan' },
  ]

  return (
    <section className="bg-white py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-3">Masalah yang Sering Terjadi</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Apakah bisnis Anda masih begini?
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Kalau ya, Anda tidak sendirian. Dan ada solusinya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {problems.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4"
            >
              <span className="text-xl flex-shrink-0">{p.icon}</span>
              <p className="text-sm text-gray-500 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Transition */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-px h-10 bg-gradient-to-b from-red-200 to-blue-400" />
            <div className="inline-flex items-center gap-2 bg-blue-600 rounded-full px-5 py-2.5 shadow-lg shadow-blue-200">
              <Zap size={14} className="text-white" />
              <span className="text-sm font-black text-white">Ada cara yang jauh lebih baik</span>
            </div>
            <div className="w-px h-10 bg-gradient-to-b from-blue-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Fitur ────────────────────────────────────────────────────────────────────

function FiturSection() {
  const ITEMS = [
    {
      Icon: Users,
      title: 'Manajemen Siswa Lengkap',
      desc: 'Daftarkan siswa, pantau status aktif/alumni, lihat progress belajar real-time. Tidak ada lagi data yang tercecer.',
      badge: null,
      highlight: false,
    },
    {
      Icon: MessageCircle,
      title: 'Notifikasi WA Otomatis',
      desc: 'Invoice, link Zoom, reminder kelas, dan kredensial login — semuanya dikirim otomatis ke WhatsApp siswa tanpa campur tangan Anda.',
      badge: 'Favorit',
      highlight: true,
    },
    {
      Icon: FileText,
      title: 'Invoice & Laporan Keuangan',
      desc: 'Generate PDF invoice sekali klik, lacak pemasukan, pengeluaran, dan laporan bulanan otomatis. Tidak perlu hitung manual.',
      badge: null,
      highlight: false,
    },
    {
      Icon: BookOpen,
      title: 'Portal Belajar Siswa',
      desc: 'Materi, quiz, absensi, dan tugas tersedia di portal khusus siswa. Akses kapan saja, terpantau real-time oleh admin.',
      badge: null,
      highlight: false,
    },
    {
      Icon: Shield,
      title: 'Data Aman & Terpisah',
      desc: 'Setiap klien punya database sendiri dengan enkripsi penuh dan Row Level Security. Data siswa Anda tidak bercampur dengan siapapun.',
      badge: null,
      highlight: false,
    },
    {
      Icon: Clock,
      title: 'Setup Cepat, Langsung Jalan',
      desc: 'Tim kami handle semua setup teknis. Anda hanya perlu siapkan konten. Dalam 1–3 hari kerja, platform Anda sudah online.',
      badge: null,
      highlight: false,
    },
  ]

  return (
    <section id="fitur" className="bg-[#F8FAFF] py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">Fitur Platform</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Semua yang Anda butuhkan, sudah ada
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tidak perlu integrasi puluhan tools berbeda. Satu platform, semua beres.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map(item => (
            <div
              key={item.title}
              className={`group relative rounded-2xl p-6 transition-all duration-200 ${
                item.highlight
                  ? 'bg-blue-600 shadow-xl shadow-blue-200'
                  : 'bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300'
              }`}
              style={!item.highlight ? { boxShadow: '0 2px 12px rgba(0,0,0,0.04)' } : {}}
            >
              {item.badge && (
                <span className="absolute top-4 right-4 bg-white text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {item.badge}
                </span>
              )}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                item.highlight ? 'bg-white/20' : 'bg-blue-50'
              }`}>
                <item.Icon size={20} className={item.highlight ? 'text-white' : 'text-blue-600'} />
              </div>
              <h3 className={`font-black text-base mb-2 ${item.highlight ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${item.highlight ? 'text-white/75' : 'text-gray-400'}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Integrasi ────────────────────────────────────────────────────────────────

function IntegrasiSection() {
  const integrations = [
    {
      Icon: MessageCircle,
      name: 'WhatsApp (Fonnte)',
      desc: 'Invoice, reminder kelas, dan kredensial login dikirim otomatis ke WA siswa',
      color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100',
    },
    {
      Icon: Video,
      name: 'Zoom',
      desc: 'Link meeting Zoom otomatis disertakan di setiap notifikasi jadwal kelas',
      color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100',
    },
    {
      Icon: HardDrive,
      name: 'Google Drive',
      desc: 'Invoice PDF digenerate dan disimpan otomatis via Google Apps Script',
      color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100',
    },
    {
      Icon: Globe2,
      name: 'Custom Domain',
      desc: 'Platform berjalan di domain bisnis Anda sendiri — tanpa jejak platform lain',
      color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100',
    },
  ]

  const automationFeed = [
    { color: 'bg-green-500', label: 'WA Terkirim', detail: 'Invoice Rp 2.500.000 → Budi Santoso' },
    { color: 'bg-yellow-500', label: 'PDF Tersimpan', detail: 'Invoice-2026-001.pdf → Google Drive' },
    { color: 'bg-blue-500',   label: 'Zoom Dikirim', detail: 'Kelas A · Pertemuan 12 · Link aktif' },
    { color: 'bg-purple-500', label: 'Domain Aktif', detail: 'kursus-anda.com → Online 24/7' },
  ]

  return (
    <section className="bg-[#F8FAFF] py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy + integration list */}
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">Integrasi</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Terhubung dengan tools yang sudah Anda pakai
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Tidak perlu integrasi manual. Platform kami sudah terhubung langsung
              dengan WhatsApp, Zoom, dan Google Drive sejak hari pertama.
            </p>
            <div className="space-y-3">
              {integrations.map(item => (
                <div
                  key={item.name}
                  className={`flex items-center gap-4 bg-white rounded-2xl p-4 border ${item.border} hover:shadow-md transition-all`}
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.Icon size={18} className={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" title="Aktif" />
                </div>
              ))}
            </div>
          </div>

          {/* Right — automation feed visual */}
          <div className="relative">
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #0A2342 0%, #1A3A6B 100%)', boxShadow: '0 20px 60px rgba(10,35,66,0.25)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-black text-base">Automation Log</p>
                  <p className="text-white/40 text-xs mt-0.5">Berjalan otomatis 24/7</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/50 font-medium">Live</span>
                </div>
              </div>

              {/* Feed items */}
              <div className="space-y-3 mb-6">
                {automationFeed.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-white">{item.label}</p>
                      <p className="text-[11px] text-white/40 truncate mt-0.5">{item.detail}</p>
                    </div>
                    <Check size={13} className="text-green-400 flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* Bottom stat */}
              <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { val: '0', label: 'Setup manual' },
                  { val: '< 1 dtk', label: 'Response time' },
                  { val: '24/7', label: 'Berjalan otomatis' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-sm font-black text-white">{s.val}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Cara Kerja ───────────────────────────────────────────────────────────────

function CaraKerjaSection() {
  const steps = [
    {
      num: '01',
      icon: '💬',
      title: 'Konsultasi Gratis',
      desc: 'Ceritakan kebutuhan bisnis Anda via WhatsApp. Kami analisis dan rekomendasikan paket yang paling sesuai — tanpa paksaan.',
    },
    {
      num: '02',
      icon: '⚙️',
      title: 'Setup & Kustomisasi',
      desc: 'Tim kami setup platform, database, dan integrasi WA. Anda tinggal upload konten. Selesai dalam 1–3 hari kerja.',
    },
    {
      num: '03',
      icon: '🚀',
      title: 'Langsung Live & Pakai',
      desc: 'Platform online dengan nama domain Anda. Siswa bisa daftar, admin bisa pantau. Support kami selalu siap bila ada pertanyaan.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">Cara Kerja</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            3 langkah, platform Anda siap
          </h2>
          <p className="text-gray-400 text-lg">Tidak ada yang rumit. Kami yang handle teknisnya.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="relative inline-flex w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 items-center justify-center text-3xl mb-5 mx-auto">
                {step.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-black text-gray-900 text-lg mb-3">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all hover:scale-[1.02] text-base shadow-lg shadow-blue-200"
          >
            Mulai Konsultasi Gratis <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Segmen ───────────────────────────────────────────────────────────────────

function SegmenSection() {
  const PORTALS = [
    {
      emoji: '🎓',
      label: 'Portal LMS',
      comingSoon: false,
      segments: ['Kursus & Bimbel', 'Sekolah & LPK', 'Bisnis & Korporat (Training Internal)'],
      pain: 'Administrasi manual, data siswa/karyawan tersebar, laporan makan waktu',
      solve: 'Portal siswa/karyawan + absensi digital + invoice otomatis + laporan per kelas/departemen',
      cta: 'Coba Demo Gratis →',
      ctaHref: `${LMS_URL}/demo`,
      waMsg: '',
      accent: {
        light: 'bg-blue-50',
        border: 'border-blue-100',
        badgeLive: 'bg-blue-100 text-blue-700',
        bullet: 'bg-blue-400',
        btn: 'bg-blue-600 hover:bg-blue-700',
        heading: 'text-blue-700',
      },
    },
    {
      emoji: '🏥',
      label: 'Portal Klinik & Medis',
      comingSoon: true,
      segments: ['Klinik Umum', 'Klinik Spesialis', 'Praktik Dokter Mandiri'],
      pain: 'Reservasi manual, rekam medis tidak terpusat, reminder pasien sering lupa',
      solve: 'Jadwal reservasi digital + rekam medis + notifikasi WA otomatis ke pasien',
      cta: 'Tanya via WA →',
      ctaHref: '',
      waMsg: 'Halo, saya tertarik dengan Portal Klinik dari Japan Arena Platform. Bisa minta info lebih lanjut?',
      accent: {
        light: 'bg-emerald-50',
        border: 'border-emerald-100',
        badgeLive: 'bg-emerald-100 text-emerald-700',
        bullet: 'bg-emerald-400',
        btn: 'bg-emerald-600 hover:bg-emerald-700',
        heading: 'text-emerald-700',
      },
    },
    {
      emoji: '🇯🇵',
      label: 'Portal Jastip Jepang',
      comingSoon: false,
      segments: ['Smart Calculator Otomatis', 'Support Luxury & Branded', 'Estimasi 5–9 Hari'],
      pain: 'Biaya jastip tidak transparan, susah estimasi ongkir, takut kena biaya tak terduga',
      solve: 'Hitung biaya realtime — berat, dimensi, kategori, layanan — langsung dapat total estimasi akurat',
      cta: 'Coba Calculator →',
      ctaHref: JASTIP_URL,
      waMsg: '',
      accent: {
        light: 'bg-red-50',
        border: 'border-red-100',
        badgeLive: 'bg-green-100 text-green-700',
        bullet: 'bg-red-400',
        btn: 'bg-red-600 hover:bg-red-700',
        heading: 'text-red-700',
      },
    },
    // Portal Website & Landing Page — coming soon, uncomment when ready
    // {
    //   emoji: '🌐',
    //   label: 'Portal Website & Landing Page',
    //   comingSoon: true,
    //   segments: ['UMKM & Toko Online', 'Jasa Titip (Jastip)', 'Penulis & Blogger'],
    //   pain: 'Tidak punya kehadiran digital, promosi cuma lewat WA & IG, susah dipercaya pelanggan baru',
    //   solve: 'Website profesional + fitur sesuai bisnis + domain sendiri + setup 1–3 hari',
    //   cta: 'Tanya via WA →',
    //   ctaHref: '',
    //   waMsg: 'Halo, saya tertarik dengan Portal Website dari Japan Arena Platform. Bisa minta info lebih lanjut?',
    //   accent: {
    //     light: 'bg-violet-50',
    //     border: 'border-violet-100',
    //     badgeLive: 'bg-violet-100 text-violet-700',
    //     bullet: 'bg-violet-400',
    //     btn: 'bg-violet-600 hover:bg-violet-700',
    //     heading: 'text-violet-700',
    //   },
    // },
  ]

  return (
    <section id="segmen" className="bg-[#F8FAFF] py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">Untuk Siapa?</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Pilih portal sesuai bisnis Anda
          </h2>
          <p className="text-gray-400 text-lg">Satu platform, tiga solusi — dikustomisasi untuk kebutuhan spesifik Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTALS.map(portal => {
            const waHref = portal.waMsg
              ? waLink(portal.waMsg)
              : portal.ctaHref
            const href = portal.comingSoon ? waHref : portal.ctaHref

            return (
              <div
                key={portal.label}
                className={`bg-white rounded-2xl border ${portal.accent.border} p-6 flex flex-col hover:shadow-lg transition-all duration-300 relative`}
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                {/* Coming Soon ribbon */}
                {portal.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Segera Hadir
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${portal.accent.light} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {portal.emoji}
                  </div>
                  {!portal.comingSoon && (
                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${portal.accent.badgeLive}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Live Demo
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className={`font-black text-base mb-3 ${portal.accent.heading}`}>{portal.label}</h3>

                {/* Sub-segments */}
                <ul className="space-y-1.5 mb-4">
                  {portal.segments.map(seg => (
                    <li key={seg} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${portal.accent.bullet}`} />
                      {seg}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-4 mb-4 flex-1">
                  <div className="flex items-start gap-2 mb-3">
                    <X size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-400 leading-relaxed">{portal.pain}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">{portal.solve}</p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={href}
                  target={portal.comingSoon ? '_blank' : undefined}
                  rel={portal.comingSoon ? 'noopener noreferrer' : undefined}
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-bold transition-all ${portal.accent.btn}`}
                >
                  {portal.cta}
                </a>
              </div>
            )
          })}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Bisnis Anda tidak ada di sini?{' '}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-bold"
          >
            Konsultasikan kebutuhan spesifik Anda →
          </a>
        </p>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section id="harga" className="bg-white py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">Investasi</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Harga transparan, tanpa biaya tersembunyi
          </h2>
          <p className="text-gray-400 text-lg">Coba gratis 14 hari, lanjut sesuai kebutuhan bisnis Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">

          {/* Trial */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Coba Dulu</p>
            <p className="text-4xl font-black text-gray-900 mb-1">Gratis</p>
            <p className="text-sm text-gray-400 mb-2">14 hari · tidak perlu kartu kredit</p>
            <p className="text-xs text-gray-400 mb-6 pb-6 border-b border-gray-100">
              Akses semua fitur Premium selama 14 hari. Setelah itu upgrade atau akun terkunci.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Semua fitur Premium aktif',
                'Setup & onboarding dibantu',
                'Tidak perlu kartu kredit',
                'Bisa langsung pakai hari ini',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Check size={14} className="text-green-500 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Mulai Trial Gratis →
            </a>
          </div>

          {/* Premium */}
          <div className="bg-blue-600 rounded-2xl p-7 relative md:scale-[1.03] shadow-xl shadow-blue-200">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">
              ⭐ Paling Populer
            </span>
            <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-3">Premium</p>
            <p className="text-4xl font-black text-white mb-1">1,5jt</p>
            <p className="text-sm text-blue-200 mb-2">/bulan</p>
            <p className="text-xs text-blue-200/70 mb-6 pb-6 border-b border-white/15">
              Untuk bisnis yang ingin semua proses berjalan otomatis
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Semua fitur Basic (siswa unlimited)',
                'WA notifikasi & reminder otomatis',
                'Invoice PDF otomatis via WA',
                'Flashcard & bank kata',
                'Try Out / Mock test',
                'Laporan keuangan otomatis',
                'Onboarding & panduan setup',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                  <Check size={14} className="text-blue-200 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 rounded-xl bg-white text-blue-600 text-sm font-black hover:bg-blue-50 transition-all"
            >
              Pilih Premium →
            </a>
          </div>

          {/* Custom */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Custom / White-label</p>
            <div className="mb-1">
              <span className="text-4xl font-black text-gray-900">3jt</span>
              <span className="text-sm text-gray-400 ml-1">setup</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">+ 2jt/bulan maintenance</p>
            <p className="text-xs text-gray-400 mb-6 pb-6 border-b border-gray-100">
              Platform dengan identitas brand Anda sendiri, tanpa jejak Japan Arena Platform
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Semua fitur Premium',
                'Branding & logo sendiri',
                'Domain khusus bisnis Anda',
                'Hapus semua atribusi Japan Arena Platform',
                'Request fitur custom',
                'Prioritas support & maintenance',
                'SLA response 1×24 jam',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Check size={14} className="text-green-500 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all"
            >
              Diskusi Kebutuhan →
            </a>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Semua paket sudah termasuk onboarding & panduan penggunaan. Ada pertanyaan?{' '}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-bold"
          >
            Tanya via WA →
          </a>
        </p>
      </div>
    </section>
  )
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

function TestimonialSection() {
  const testimonials = [
    {
      quote: 'Dulu buat invoice untuk 30+ siswa N2 dan N3 bisa habiskan 2 jam lebih. Sekarang semua otomatis via WA. Saya bisa fokus ke kualitas pengajaran.',
      name: 'Dimas A.',
      role: 'Founder, Japan Arena Academy',
      initials: 'DA',
      tag: 'invoice 30+ siswa → otomatis',
    },
    {
      quote: 'Flashcard dan quiz JLPT-nya sangat membantu. Bisa latihan kapan saja, progress saya terpantau, dan akhirnya lulus N2 di ujian pertama.',
      name: 'Tabita D.',
      role: 'Alumni Japan Arena · Lulus JLPT N2',
      initials: 'TD',
      tag: 'lulus N2 ujian pertama',
    },
    {
      quote: 'Absensi 2 kelas N2 dan N3 sekaligus dulu berantakan lewat grup WA. Sekarang siswa langsung dapat notifikasi, rekap otomatis, saya tinggal export.',
      name: 'Dimas A.',
      role: 'Japan Arena Academy',
      initials: 'DA',
      tag: 'absensi 2 kelas → rapi otomatis',
    },
  ]

  const stats = [
    { val: '87%',    label: 'Hemat waktu administrasi'   },
    { val: '3 hari', label: 'Rata-rata waktu setup'       },
    { val: '0',      label: 'Keahlian coding dibutuhkan'  },
    { val: '24/7',   label: 'Akses portal belajar'        },
  ]

  return (
    <section className="bg-[#F8FAFF] py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">Testimoni</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Kata mereka yang sudah pakai
          </h2>
          <p className="text-gray-400 text-lg">Dari owner, instruktur, hingga siswa — semua merasakannya.</p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col"
              style={{ boxShadow: '0 4px 20px rgba(37,99,235,0.06)' }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-sm text-gray-600 italic leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-full px-3 py-1 inline-flex">
                  <p className="text-[10px] font-black text-green-600">✓ {t.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map(s => (
            <div
              key={s.label}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              <p className="text-3xl font-black text-gray-900 mb-1">{s.val}</p>
              <p className="text-xs text-gray-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA mini */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center shadow-xl shadow-blue-200">
          <p className="text-white font-black text-lg mb-2">Mau hasil yang sama untuk bisnis Anda?</p>
          <p className="text-blue-200 text-sm mb-6">Konsultasi gratis, kami bantu analisis kebutuhan spesifik bisnis Anda.</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-600 font-black rounded-xl transition-all text-sm"
          >
            Hubungi Kami via WA <ChevronRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FaqSection() {
  return (
    <section id="faq" className="bg-white py-20 lg:py-28 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">FAQ</p>
          <h2 className="text-3xl font-black text-gray-900">
            Pertanyaan yang sering diajukan
          </h2>
        </div>
        <LmsFaq />
        <p className="text-center mt-8 text-gray-400 text-sm">
          Pertanyaan lain?{' '}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-bold"
          >
            Chat langsung via WhatsApp →
          </a>
        </p>
      </div>
    </section>
  )
}

// ─── CTA Final ────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section id="demo" className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #1e3a8a 100%)' }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-xs font-black mb-8">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Slot onboarding tersedia bulan ini
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight tracking-tight">
            Bisnis Anda layak punya<br />sistem yang lebih baik.
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Jangan biarkan administrasi manual terus menguras waktu Anda.
            Satu percakapan singkat bisa mengubah cara Anda mengelola bisnis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-blue-50 text-blue-700 font-black text-base rounded-xl transition-all shadow-lg"
            >
              💬 Konsultasi Gratis via WA <ArrowRight size={16} />
            </a>
            <a
              href={`${LMS_URL}/demo`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 hover:bg-white/10 text-white font-bold text-base rounded-xl transition-all"
            >
              Lihat Demo Dulu →
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-blue-100">
            <span className="flex items-center gap-1.5"><Check size={12} className="text-blue-200" /> Konsultasi 100% gratis</span>
            <span className="flex items-center gap-1.5"><Check size={12} className="text-blue-200" /> Tanpa komitmen awal</span>
            <span className="flex items-center gap-1.5"><Check size={12} className="text-blue-200" /> Respons dalam 1 jam kerja</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gray-900 text-white/40 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="font-black text-white text-base mb-2">
              Japan Arena <span className="text-blue-400">Platform</span>
            </p>
            <p className="text-sm leading-relaxed max-w-xs">
              Sistem manajemen bisnis siap pakai by Japan Arena Corp. Setup cepat, fitur lengkap, harga transparan.
            </p>
          </div>

          <div>
            <p className="text-white/70 font-bold text-sm mb-4">Platform</p>
            <div className="space-y-2.5 text-sm">
              <a href="#fitur"  className="block hover:text-white/70 transition-colors">Fitur</a>
              <a href="#segmen" className="block hover:text-white/70 transition-colors">Untuk Siapa</a>
              <a href="#harga"  className="block hover:text-white/70 transition-colors">Harga</a>
              <a href="#faq"    className="block hover:text-white/70 transition-colors">FAQ</a>
            </div>
          </div>

          <div>
            <p className="text-white/70 font-bold text-sm mb-4">Kontak</p>
            <div className="space-y-2.5 text-sm">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white/70 transition-colors"
              >
                WhatsApp Kami
              </a>
              <a href={`${LMS_URL}/demo`} className="block hover:text-white/70 transition-colors">
                Lihat Demo
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Japan Arena Corp. Hak cipta dilindungi.</p>
          <p>Dibuat dengan ❤️ untuk bisnis Indonesia</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LmsLandingPage() {
  return (
    <>
      <LmsNavbar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <ProblemSection />
        <FiturSection />
        <IntegrasiSection />
        <CaraKerjaSection />
        <SegmenSection />
        <PricingSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
