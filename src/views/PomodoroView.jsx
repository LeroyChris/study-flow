import Sidebar from '../components/Sidebar'
import TimerBox from '../components/Pomodoro/TimerBox'
import LofiPlayer from '../components/Pomodoro/LofiPlayer'
import WeeklyStats from '../components/Pomodoro/WeeklyStats'
import TimerSettingsModal from '../components/Pomodoro/TimerSettingsModal'
import { usePomodoro } from '../hooks/usePomodoro'

export default function PomodoroView({ onNavigate }) {
  const {
    timers, activeTab, timeLeft, isRunning, autoSwitch,
    completedSessions, isModalOpen, weeklyData,
    currentTrack, isAudioPlaying, volume, audioError,
    setIsModalOpen, switchTab, setIsRunning, setAutoSwitch,
    setCurrentTrack, setIsAudioPlaying, setVolume,
    handleSaveSettings,
  } = usePomodoro()

  return (
    <div className="min-h-screen flex">
      <Sidebar currentView="pomodoro" onNavigate={onNavigate} />
      <main className="flex-1 bg-[#f4f3ef] dark:bg-gray-900 p-10">
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-6 px-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-poppins">Pomodoro Timer</h1>
          <button onClick={() => setIsModalOpen(true)} className="w-10 h-10 bg-[#e4e3dd]/60 dark:bg-gray-700 text-black dark:text-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-5xl mx-auto">
          <TimerBox
            tabs={timers} activeTab={activeTab} timeLeft={timeLeft}
            isRunning={isRunning} colors={timers[activeTab]?.colors}
            completedSessions={completedSessions} autoSwitch={autoSwitch}
            onSwitchTab={switchTab}
            onTogglePlay={() => setIsRunning(!isRunning)}
            onReset={() => switchTab(activeTab)}
            onToggleAutoSwitch={() => setAutoSwitch(!autoSwitch)}
          />
          <div className="w-full max-w-md space-y-6">
            <LofiPlayer
              colors={timers[activeTab]?.colors}
              currentTrack={currentTrack} isAudioPlaying={isAudioPlaying}
              volume={volume} audioError={audioError}
              onTrackChange={(i) => { setCurrentTrack(i); setIsAudioPlaying(true) }}
              onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
              onVolumeChange={setVolume}
            />
            <WeeklyStats weeklyData={weeklyData} colors={timers[activeTab]?.colors} />
          </div>
        </div>

        <TimerSettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentSettings={timers}
          onSave={handleSaveSettings}
        />
      </main>
    </div>
  )
}
