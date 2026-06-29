export default function WeeklyStats({ weeklyData, colors }) {
  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const maxSessions = Math.max(...weeklyData, 1)

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-950 mb-6">Sessions this week</h2>
      <div className="flex items-end justify-between gap-2 px-1">
        {DAYS.map((day, i) => {
          const sessions = weeklyData[i] || 0
          const barHeightPercent = (sessions / maxSessions) * 100

          return (
            <div key={i} className="flex flex-col items-center flex-1 group">
              <span className={`text-xs font-bold mb-2 transition-colors ${sessions > 0 ? colors.text : 'text-gray-300'}`}>{sessions}</span>
              <div className="w-3 bg-gray-100 rounded-full h-24 relative overflow-hidden mb-2">
                <div className={`absolute bottom-0 left-0 right-0 rounded-full transition-all duration-500 ease-out ${colors.primary}`} style={{ height: `${barHeightPercent}%` }}></div>
              </div>
              <span className="text-xs font-bold text-gray-400">{day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}