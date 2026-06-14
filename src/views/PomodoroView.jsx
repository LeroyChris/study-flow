import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from '../components/Sidebar'

const TABS = [
  { label: 'Focus', minutes: 25 },
  { label: 'Short Break', minutes: 5 },
  { label: 'Long Break', minutes: 15 },
]

export default function PomodoroView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TABS[0].minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setTimeLeft(TABS[activeTab].minutes * 60)
  }, [activeTab])

  const switchTab = (index) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setActiveTab(index)
    setTimeLeft(TABS[index].minutes * 60)
  }

  const togglePlay = () => {
    setIsRunning((prev) => !prev)
  }

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

  const circumference = 2 * Math.PI * 115
  const progress = timeLeft / (TABS[activeTab].minutes * 60)
  const offset = circumference * (1 - progress)

  return (
    <div className="min-h-screen flex">
      <Sidebar currentView="pomodoro" onNavigate={onNavigate} />

      <main className="flex-1 bg-brand-warm flex items-center justify-center p-10">
        <div className="bg-white rounded-[32px] mx-auto p-8 text-center max-w-md w-full">
          <div className="flex bg-gray-100 p-1 rounded-full justify-between items-center mb-8">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => switchTab(i)}
                className={`font-semibold py-2 px-6 rounded-full text-sm transition-all cursor-pointer ${
                  i === activeTab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-500 font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-60 h-60 mx-auto flex items-center justify-center mb-8">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 250 250">
              <circle
                cx="125"
                cy="125"
                r="115"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="125"
                cy="125"
                r="115"
                fill="none"
                stroke="#2563EB"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="z-10">
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                {minutes}:{seconds}
              </h1>
              <p className="text-xs text-gray-400 font-semibold mt-1 capitalize tracking-widest">
                {TABS[activeTab].label}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-8">
            <button
              onClick={resetTimer}
              className="w-14 h-14 bg-[#f0efe9] rounded-2xl flex items-center justify-center text-gray-500 text-2xl cursor-pointer hover:bg-gray-200 transition"
            >
              ↺
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-200 cursor-pointer hover:bg-blue-700 transition"
            >
              {isRunning ? (
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-10 h-10 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => {
                clearInterval(intervalRef.current)
                setIsRunning(false)
                setTimeLeft(TABS[activeTab].minutes * 60)
              }}
              className="w-14 h-14 bg-[#f0efe9] rounded-2xl flex items-center justify-center text-gray-500 text-2xl cursor-pointer hover:bg-gray-200 transition"
            >
              ⇥
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
