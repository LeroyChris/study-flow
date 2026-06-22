import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from '../components/Sidebar'

// KONFIGURASI DATA TAB & WARNA DINAMIS
const TABS = [
  { label: 'Focus', value: 'focus', minutes: 25 },
  { label: 'Short Break', value: 'short', minutes: 5 },
  { label: 'Long Break', value: 'long', minutes: 15 },
]

const MODE_COLORS = {
  focus: {
    primary: 'bg-blue-600',
    hover: 'hover:bg-blue-700', 
    text: 'text-blue-600',
    stroke: '#2563eb',
    bgLight: 'bg-blue-50',
    border: 'border-blue-400',
    shadow: 'shadow-blue-200',
  },
  short: {
    primary: 'bg-[#00bfa5]',
    hover: 'hover:bg-[#00a68f]', 
    text: 'text-[#00bfa5]',
    stroke: '#00bfa5',
    bgLight: 'bg-[#00bfa5]/10',
    border: 'border-[#00bfa5]/40',
    shadow: 'shadow-[#00bfa5]/20',
  },
  long: {
    primary: 'bg-[#9333ea]',
    hover: 'hover:bg-[#7c3aed]', 
    text: 'text-[#9333ea]',
    stroke: '#9333ea',
    bgLight: 'bg-[#9333ea]/10',
    border: 'border-[#9333ea]/40',
    shadow: 'shadow-[#9333ea]/20',
  },
}

export default function PomodoroView({ onNavigate }) {
  // STATE MANAGEMENT TIMERS
  const [activeTab, setActiveTab] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TABS[0].minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  // LOGIKA RESET
  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setTimeLeft(TABS[activeTab].minutes * 60)
  }, [activeTab])

  // LOGIKA SWITCH TAB DAN WARNA
  const switchTab = (index) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setActiveTab(index)
    setTimeLeft(TABS[index].minutes * 60)
  }

  const currentMode = TABS[activeTab].value
  const colors = MODE_COLORS[currentMode]

  // LOGIKA PLAY / PAUSE
  const togglePlay = () => {
    setIsRunning((prev) => !prev)
  }

  // INTERVAL EFFECT 1 DETIK
  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  // PROGRESS LINGKARAN SVG
  const circumference = 2 * Math.PI * 115
  const progress = timeLeft / (TABS[activeTab].minutes * 60)
  const offset = circumference * (1 - progress)

  return (
    <div className="min-h-screen flex">
      <Sidebar currentView="pomodoro" onNavigate={onNavigate} />

      <main className="flex-1 bg-[#f4f3ef] p-10">
        
        {/* HEADER ATAS (JUDUL & GEAR SETTINGS) */}
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-6 px-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Pomodoro Timer</h1>
          <button className="w-10 h-10 bg-[#e4e3dd]/60 hover:bg-gray-200 text-black rounded-lg flex items-center justify-center transition cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>

        {/* LAYOUT DUA KOLOM */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-5xl mx-auto">

         
          {/* KARTU 1: BOX POMODORO TIMER UTAMA */}
    
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 text-center shadow-sm">
            
            {/* CONTAINER TAB SELECTION (WAKTU & BG TOMBOL BERUBAH SEUAI MODE) */}
            <div className="flex bg-[#f0efe9]/60 p-1 rounded-full justify-between items-center mb-8">
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => switchTab(i)}
                  className={`font-semibold py-2.5 px-6 rounded-full text-base transition-all cursor-pointer ${
                    i === activeTab
                      ? `${colors.primary} text-white shadow-sm`
                      : 'text-gray-400 font-medium hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* PROGRESS LINGKARAN & ANGKA DIGITAL */}
            <div className="relative w-60 h-60 mx-auto flex items-center justify-center mb-6">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 250 250">
                <circle cx="125" cy="125" r="115" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                <circle
                  cx="125"
                  cy="125"
                  r="115"
                  fill="none"
                  stroke={colors.stroke}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="z-10">
                <h1 className="text-6xl font-bold text-gray-900 tracking-tight">
                  {minutes}:{seconds}
                </h1>
                <p className="text-sm text-gray-400 font-medium mt-1 capitalize tracking-widest">
                  {TABS[activeTab].label}
                </p>
              </div>
            </div>

            {/* ACTION BUTTON CONTROLS (POSISI DI BAWAH TIMEr) */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={resetTimer}
                className="w-12 h-12 bg-[#f0efe9]/80 text-gray-500 rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200 transition"
              >
                ↺
              </button>

              <button
                onClick={togglePlay}
                className={`w-16 h-16 text-white rounded-full flex items-center justify-center shadow-lg ${colors.shadow} ${colors.primary} ${colors.hover} cursor-pointer transition`}
              >
                {isRunning ? (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => {
                  const nextTab = (activeTab + 1) % TABS.length
                  switchTab(nextTab)
                }}
                className="w-12 h-12 bg-[#f0efe9]/80 text-gray-500 rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200 transition"
              >
                ⇥
              </button>
            </div>

            {/* STATUS INDIKATOR TOMAT & SESSIONS COMPLETED */}
            <div className="flex justify-center gap-1.5 mb-2 text-xl opacity-60">
              🍅 🍅 🍅 🍅
            </div>
            <p className="text-sm font-medium text-gray-500 mb-5">0 sessions completed</p>

            {/* AUTO SWITCH TOGGLE SAKLAR */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-9 h-5 bg-[#e4e3dd] rounded-full p-0.5 flex items-center cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
              <span className="text-sm font-semibold text-gray-400">Auto-switch</span>
            </div>

          </div>

          {/* LAYOUT STRUKTUR SEBELAH KANAN (LO-FI PLAYER & HISTORI) */}
          <div className="w-full max-w-md space-y-6">
            
          
            {/* KARTU 2: BOX LO-FI PLAYER UTAMA            */}
            
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Lo-Fi Player</h2>
              
              {/* TOMBOL PLAYLIST SELECTION (AKTIF BERUBAH WARNA SESUAI TEMA MODE) */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${colors.border} ${colors.bgLight} ${colors.text} text-sm font-semibold transition cursor-pointer`}>
                  <span>☕</span> Rainy Café
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 text-sm font-semibold transition cursor-pointer">
                  <span>🌙</span> Late Night Study
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 text-sm font-semibold transition cursor-pointer">
                  <span>🌲</span> Forest Focus
                </button>
              </div>

              <p className="text-sm font-medium text-gray-400 mb-5">Brown noise & rain</p>

              {/* CONTROLLER AUDIO CONTROLS WITH MATCHING TRACK TEMA COLOR */}
              <div className="flex items-center gap-3.5">
                <button className="w-12 h-12 bg-[#f0efe9]/80 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center transition shrink-0 cursor-pointer">
                  <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>

                <span className="text-xs text-gray-400">🔈</span>

                <div className="flex-1 relative flex items-center h-2 bg-gray-200 rounded-full cursor-pointer">
                  {/* Warna track volume di bawah ikut warna active mode theme */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[45%] ${colors.primary} rounded-full`}></div>
                  <div className={`absolute left-[45%] w-4 h-4 ${colors.primary} border-2 border-white rounded-full shadow-md -ml-2`}></div>
                </div>

                <span className="text-xs text-gray-400">🔊</span>
              </div>
            </div>

            {/* CONTAINER BROWSER UNTUK COMPONENT SESSIONS THIS WEEK DI BAWAHNYA */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Sessions this week</h2>
              <div className="h-28 flex items-end justify-between px-2 pt-4">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <span className="text-xs font-semibold text-gray-300">0</span>
                    <div className="w-1.5 h-10 bg-gray-100 rounded-full"></div>
                    <span className="text-xs font-bold text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  )
}
