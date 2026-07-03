export default function TimerBox({
  tabs,
  activeTab,
  timeLeft,
  isRunning,
  colors,
  completedSessions,
  autoSwitch,
  onSwitchTab,
  onTogglePlay,
  onReset,
  onToggleAutoSwitch
}) {
  // hitung sisa menit dan detik, jadi 2 digit pake padstart
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  // logic mtk buat bikin animasi lingkaran progress bar svg nya mengecil
  const circumference = 2 * Math.PI * 115
  const currentTabDuration = tabs[activeTab]?.minutes || 25
  const offset = circumference * (1 - timeLeft / (currentTabDuration * 60))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[32px] w-full max-w-md p-8 text-center shadow-sm relative">
      
      {/* tombol navigasi buat ganti jenis tab fokus atau istirahat */}
      <div className="flex bg-gray-100/60 dark:bg-gray-700/60 p-1 rounded-full justify-between items-center mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.label} onClick={() => onSwitchTab(i)}
            className={`font-semibold py-2.5 px-6 rounded-full text-base transition-all cursor-pointer ${
              i === activeTab ? `${colors.primary} text-white shadow-sm` : 'text-gray-400 font-medium'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* lingkaran progress bar utama dan angka waktu hitung mundur pomodoro */}
      <div className="relative w-60 h-60 mx-auto flex items-center justify-center mb-6">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 250 250">
          <circle cx="125" cy="125" r="115" fill="none" stroke="#f3f4f6" strokeWidth="12" />
          <circle
            cx="125" cy="125" r="115" fill="none" stroke={colors.stroke} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="z-10">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{minutes}:{seconds}</h1>
          <p className="text-sm text-gray-400 font-medium mt-1 capitalize tracking-widest">{tabs[activeTab]?.label}</p>
        </div>
      </div>

      {/* kontrol utama u/ ngatur tombol reset, play/pause, dan skip tab */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button onClick={onReset} className="w-12 h-12 bg-gray-100/80 dark:bg-gray-700/80 text-gray-500 rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200 transition">↺</button>
        <button onClick={onTogglePlay} className={`w-16 h-16 text-white rounded-full flex items-center justify-center shadow-lg ${colors.shadow} ${colors.primary} ${colors.hover} cursor-pointer transition`}>
          {isRunning ? (
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          ) : (
            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <button onClick={() => onSwitchTab((activeTab + 1) % tabs.length)} className="w-12 h-12 bg-gray-100/80 dark:bg-gray-700/80 text-gray-500 rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200 transition">⇥</button>
      </div>

      {/* tracker total tomat atau target session yang berhasil diselesaikan */}
      <div className="flex justify-center gap-1.5 mb-2 text-xl opacity-60">
        {Array.from({ length: 4 }).map((_, idx) => (
          <span key={idx} className={idx < completedSessions % 4 || (completedSessions > 0 && completedSessions % 4 === 0) ? 'opacity-100' : 'opacity-70'}>🍅</span>
        ))}
      </div>
      <p className="text-sm font-medium text-gray-500 mb-5">{completedSessions} sessions completed</p>

      {/* switch otomatis tombol buat pindah dari fokus ke break langsung tanpa klik */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div onClick={onToggleAutoSwitch} className={`w-9 h-5 rounded-full p-0.5 flex items-center cursor-pointer transition-colors ${autoSwitch ? colors.primary : 'bg-gray-200'}`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${autoSwitch ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </div>
        <span className="text-sm font-semibold text-gray-400">Auto-switch</span>
      </div>

    </div>
  )
}