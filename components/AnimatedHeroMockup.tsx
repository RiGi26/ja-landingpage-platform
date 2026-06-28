'use client'

import { BarChart2, MessageCircle, MousePointer2, CheckCircle2, Loader2, Sparkles, Lock } from 'lucide-react'

export default function AnimatedHeroMockup() {
  return (
    <div className="relative animate-fade-up" style={{ animationDelay: '100ms' }}>
      
      {/* Custom Keyframes for this Mockup */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cursorMove {
          0%, 10% { transform: translate(150px, 150px); opacity: 0; }
          15% { transform: translate(150px, 150px); opacity: 1; }
          30%, 40% { transform: translate(24px, -18px); opacity: 1; }
          45%, 100% { transform: translate(24px, -18px); opacity: 0; }
        }
        @keyframes buttonPress {
          0%, 35% { transform: scale(1); }
          38% { transform: scale(0.9); background-color: #005BB5; }
          42%, 100% { transform: scale(1); }
        }
        @keyframes showLoading {
          0%, 40% { opacity: 0; transform: scale(0.8); }
          45%, 65% { opacity: 1; transform: scale(1); }
          70%, 100% { opacity: 0; transform: scale(0.8); }
        }
        @keyframes showSuccess {
          0%, 65% { opacity: 0; transform: scale(0.8); }
          70%, 90% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; transform: scale(0.8); }
        }
        @keyframes barGrow1 { 0%, 70% { height: 20%; } 80%, 100% { height: 60%; } }
        @keyframes barGrow2 { 0%, 70% { height: 30%; } 80%, 100% { height: 80%; } }
        @keyframes barGrow3 { 0%, 70% { height: 40%; } 80%, 100% { height: 100%; } }
        
        @keyframes slideNotification {
          0%, 75% { transform: translateX(100px); opacity: 0; }
          80%, 95% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 113, 227, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(0, 113, 227, 0); }
        }

        .anim-cursor { animation: cursorMove 6s infinite ease-in-out; }
        .anim-button { animation: buttonPress 6s infinite ease-in-out; }
        .anim-loading { animation: showLoading 6s infinite ease-in-out; }
        .anim-success { animation: showSuccess 6s infinite ease-in-out; }
        .anim-bar-1 { animation: barGrow1 6s infinite ease-out; }
        .anim-bar-2 { animation: barGrow2 6s infinite ease-out; }
        .anim-bar-3 { animation: barGrow3 6s infinite ease-out; }
        .anim-notif { animation: slideNotification 6s infinite cubic-bezier(0.16, 1, 0.3, 1); }
      `}} />

      <div className="bg-white rounded-[40px] border-[12px] border-black shadow-2xl overflow-hidden aspect-[4/3] relative">
          <div className="absolute inset-0 bg-[#F5F5F7] p-6 flex flex-col">
              
              {/* Header Mockup */}
              <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-white rounded-lg px-4 py-1 text-[10px] font-mono text-gray-400 border border-black/5 flex items-center gap-2">
                      <Lock size={10} className="text-gray-300" /> dashboard.webzoka.com
                  </div>
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-2xl apple-shadow border border-black/5">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="w-4 h-4 bg-gray-300 rounded-sm" />
                      </div>
                      <div>
                          <div className="w-20 h-2 bg-gray-200 rounded-full mb-1.5" />
                          <div className="w-12 h-1.5 bg-gray-100 rounded-full" />
                      </div>
                  </div>
                  
                  {/* The magic button */}
                  <div className="relative">
                      <button className="anim-button bg-[#0071E3] text-white px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1.5 shadow-md z-10 relative">
                          <Sparkles size={12} /> Auto-Generate
                      </button>
                      
                      {/* Animated Cursor */}
                      <div className="anim-cursor absolute right-2 top-4 z-50 pointer-events-none drop-shadow-xl text-gray-800">
                          <MousePointer2 size={24} fill="currentColor" />
                      </div>
                  </div>
              </div>

              {/* Content Area - Split Grid */}
              <div className="grid grid-cols-2 gap-4 flex-1">
                  
                  {/* Left: Stats */}
                  <div className="bg-white rounded-[24px] apple-shadow border border-black/5 p-5 flex flex-col relative overflow-hidden">
                      <div className="w-16 h-2 bg-gray-200 rounded-full mb-4" />
                      <div className="flex items-end gap-3 flex-1 px-4">
                          <div className="anim-bar-1 w-full bg-blue-100 rounded-t-md relative"></div>
                          <div className="anim-bar-2 w-full bg-blue-300 rounded-t-md relative"></div>
                          <div className="anim-bar-3 w-full bg-[#0071E3] rounded-t-md relative shadow-[0_0_15px_rgba(0,113,227,0.3)]"></div>
                      </div>
                  </div>

                  {/* Right: Status Board */}
                  <div className="bg-white rounded-[24px] apple-shadow border border-black/5 flex items-center justify-center relative">
                      
                      {/* Idle State */}
                      <div className="absolute flex flex-col items-center gap-2 text-gray-300">
                          <BarChart2 size={32} />
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full" />
                      </div>

                      {/* Loading State */}
                      <div className="anim-loading absolute flex flex-col items-center gap-3 text-[#0071E3] bg-white inset-0 justify-center rounded-[24px]">
                          <Loader2 size={28} className="animate-spin" />
                          <span className="text-[10px] font-bold tracking-widest uppercase">Processing...</span>
                      </div>

                      {/* Success State */}
                      <div className="anim-success absolute flex flex-col items-center gap-2 text-green-500 bg-green-50 inset-0 justify-center rounded-[24px]">
                          <CheckCircle2 size={36} />
                          <span className="text-[11px] font-bold">Semua Sistem Live!</span>
                      </div>
                  </div>
              </div>

          </div>
      </div>

      {/* Notifications overlay */}
      <div className="anim-notif absolute -right-8 top-1/3 bg-white p-4 rounded-2xl apple-shadow border border-black/5 flex items-center gap-3 z-50">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white"><MessageCircle size={16}/></div>
          <div>
              <p className="text-[10px] font-bold text-gray-900">WA Automation</p>
              <p className="text-[9px] text-gray-400">Pesan massal terkirim (1.204)</p>
          </div>
      </div>
    </div>
  )
}
