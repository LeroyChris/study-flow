import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import TimerBox from '../components/Pomodoro/TimerBox'
import LofiPlayer from '../components/Pomodoro/LofiPlayer'
import WeeklyStats from '../components/Pomodoro/WeeklyStats'
import TimerSettingsModal from '../components/Pomodoro/TimerSettingsModal'
import { DEFAULT_TIMERS } from '../data/pomodoro/timerData'
import { PLAYLIST } from '../data/pomodoro/lofiData'

export default function PomodoroView({ onNavigate }) {
  const [timers, setTimers] = useState(DEFAULT_TIMERS)
  const [activeTab, setActiveTab] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMERS[0].minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [autoSwitch, setAutoSwitch] = useState(true)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0])

  // State Audio
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [volume, setVolume] = useState(0.45)

  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  // Ganti tab & reset timer (Digabung)
  const switchTab = (index) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setActiveTab(index)
    setTimeLeft(timers[index].minutes * 60)
  }

  // TIMER EFFECT
  useEffect(() => {
    if (!isRunning) return clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1
        clearInterval(intervalRef.current)
        setIsRunning(false)
        if (timers[activeTab].value === 'focus') {
          setCompletedSessions((c) => c + 1)
          setWeeklyData((w) => {
            const n = [...w]; const d = new Date().getDay()
            n[d === 0 ? 6 : d - 1] += 1; return n
          })
        }
        if (autoSwitch) switchTab(activeTab === 0 ? ((completedSessions + 1) % 4 === 0 ? 2 : 1) : 0)
        return 0
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [isRunning, activeTab, autoSwitch, completedSessions, timers])

  // AUDIO EFFECT
  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio(PLAYLIST[currentTrack].url)
    if (audioRef.current.src !== PLAYLIST[currentTrack].url) {
      audioRef.current.src = PLAYLIST[currentTrack].url
      if (isAudioPlaying) audioRef.current.load()
    }
    audioRef.current.volume = volume
    audioRef.current.loop = true

    if (isAudioPlaying) audioRef.current.play().catch(() => setIsAudioPlaying(false))
    else audioRef.current.pause()

    return () => audioRef.current?.pause()
  }, [currentTrack, isAudioPlaying, volume])

  const handleSaveSettings = (arr) => {
    const updated = timers.map((t, idx) => ({ ...t, minutes: arr[idx] }))
    setTimers(updated); setIsModalOpen(false); setIsRunning(false)
    clearInterval(intervalRef.current); setTimeLeft(updated[activeTab].minutes * 60)
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar currentView="pomodoro" onNavigate={onNavigate} />
      <main className="flex-1 bg-[#f4f3ef] dark:bg-gray-900 p-10">
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-6 px-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Pomodoro Timer</h1>
          <button onClick={() => setIsModalOpen(true)} className="w-10 h-10 bg-[#e4e3dd]/60 hover:bg-gray-200 text-black rounded-lg flex items-center justify-center cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-5xl mx-auto">
          <TimerBox tabs={timers} activeTab={activeTab} timeLeft={timeLeft} isRunning={isRunning} colors={timers[activeTab]?.colors} completedSessions={completedSessions} autoSwitch={autoSwitch} onSwitchTab={switchTab} onTogglePlay={() => setIsRunning(!isRunning)} onReset={() => switchTab(activeTab)} onToggleAutoSwitch={() => setAutoSwitch(!autoSwitch)} />
          <div className="w-full max-w-md space-y-6">
            <LofiPlayer colors={timers[activeTab]?.colors} currentTrack={currentTrack} isAudioPlaying={isAudioPlaying} volume={volume} onTrackChange={(i) => { setCurrentTrack(i); setIsAudioPlaying(true) }} onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)} onVolumeChange={setVolume} />
            <WeeklyStats weeklyData={weeklyData} colors={timers[activeTab]?.colors} />
          </div>
        </div>
        <TimerSettingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} currentSettings={timers} onSave={handleSaveSettings} />
      </main>
    </div>
  )
}