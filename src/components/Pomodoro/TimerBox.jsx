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
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  const circumference = 2 * Math.PI * 115
  const currentTabDuration = tabs[activeTab]?.minutes || 25
  const progress = timeLeft / (currentTabDuration * 60)
  const offset = circumference * (1 - progress)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[32px] w-full max-w-md p-8 text-center shadow-sm relative">
      <div className="flex bg-[#f0efe9]/60 dark:bg-gray-700/60 p-1 rounded-full justify-between items-center mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => onSwitchTab(i)}
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
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            {minutes}:{seconds}
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium mt-1 capitalize tracking-widest">
            {tabs[activeTab]?.label}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-6">
        <button onClick={onReset} className="w-12 h-12 bg-[#f0efe9]/80 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          ↺
        </button>
        <button onClick={onTogglePlay} className={`w-16 h-16 text-white rounded-full flex items-center justify-center shadow-lg ${colors.shadow} dark:shadow-black/40 ${colors.primary} ${colors.hover} cursor-pointer transition`}>
          {isRunning ? (
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          ) : (
            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <button onClick={() => onSwitchTab((activeTab + 1) % tabs.length)} className="w-12 h-12 bg-[#f0efe9]/80 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          ⇥
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mb-2 text-xl opacity-60">
        {Array.from({ length: 4 }).map((_, idx) => (
          <span key={idx} className={idx < completedSessions % 4 || (completedSessions > 0 && completedSessions % 4 === 0) ? 'opacity-100' : 'opacity-70'}>🍅</span>
        ))}
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-5">{completedSessions} sessions completed</p>

      <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div onClick={onToggleAutoSwitch} className={`w-9 h-5 rounded-full p-0.5 flex items-center cursor-pointer transition-colors ${autoSwitch ? colors.primary : 'bg-[#e4e3dd]'}`}>
          <div className={`w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow-sm transform transition-transform ${autoSwitch ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </div>
        <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">Auto-switch</span>
      </div>
    </div>
  )
}