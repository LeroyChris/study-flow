import Layout from '../../components/Layout'
import TimerBox from './components/TimerBox'
import LofiPlayer from './components/LofiPlayer'
import WeeklyStats from './components/WeeklyStats'
import TimerSettingsModal from './components/TimerSettingsModal'
import { usePomodoro } from './hooks/usePomodoro'

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
    <Layout title="Pomodoro Timer" currentView="pomodoro" onNavigate={onNavigate}>
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
    </Layout>
  )
}
