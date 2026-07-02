import { useState, useEffect, useRef } from 'react'
import { DEFAULT_TIMERS } from '../data/pomodoro/timerData'
import { PLAYLIST } from '../data/pomodoro/lofiData'

export function usePomodoro() {
  const [timers, setTimers] = useState(DEFAULT_TIMERS)
  const [activeTab, setActiveTab] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMERS[0].minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [autoSwitch, setAutoSwitch] = useState(true)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0])

  const [currentTrack, setCurrentTrack] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [volume, setVolume] = useState(0.45)
  const [audioError, setAudioError] = useState(null)

  const intervalRef = useRef(null)
  const audioRef = useRef(null)
  const loadedTrackRef = useRef(null)

  const switchTab = (index) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setActiveTab(index)
    setTimeLeft(timers[index].minutes * 60)
  }

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

  useEffect(() => {
    let ignore = false
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
    }
    const audio = audioRef.current
    audio.volume = volume

    const syncAudio = async () => {
      try {
        const isNewTrack = loadedTrackRef.current !== currentTrack
        if (isNewTrack) {
          setAudioError(null)
          audio.pause()
          audio.src = PLAYLIST[currentTrack].url
          await new Promise((resolve, reject) => {
            const onCanPlay = () => { cleanup(); resolve() }
            const onError = () => { cleanup(); reject(new Error('load-failed')) }
            const cleanup = () => {
              audio.removeEventListener('canplay', onCanPlay)
              audio.removeEventListener('error', onError)
            }
            audio.addEventListener('canplay', onCanPlay)
            audio.addEventListener('error', onError)
            audio.load()
          })
          if (ignore) return
          loadedTrackRef.current = currentTrack
        }
        if (ignore) return
        if (isAudioPlaying) await audio.play()
        else audio.pause()
      } catch (err) {
        if (ignore) return
        setIsAudioPlaying(false)
        setAudioError(err?.message === 'load-failed' ? 'Failed to load audio, try another track.' : null)
      }
    }
    syncAudio()
    return () => { ignore = true }
  }, [currentTrack, isAudioPlaying, volume])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const handleSaveSettings = (arr) => {
    const updated = timers.map((t, idx) => ({ ...t, minutes: arr[idx] }))
    setTimers(updated)
    setIsModalOpen(false)
    setIsRunning(false)
    clearInterval(intervalRef.current)
    setTimeLeft(updated[activeTab].minutes * 60)
  }

  return {
    timers, activeTab, timeLeft, isRunning, autoSwitch,
    completedSessions, isModalOpen, weeklyData,
    currentTrack, isAudioPlaying, volume, audioError,
    setIsModalOpen, switchTab, setIsRunning, setAutoSwitch,
    setCurrentTrack, setIsAudioPlaying, setVolume,
    handleSaveSettings,
  }
}
