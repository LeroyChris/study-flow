import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// June 2026 — June starts on a Monday
const MONTH = 5 // 0-indexed
const YEAR = 2026
const DAYS_IN_MONTH = new Date(YEAR, MONTH + 1, 0).getDate()
const START_DOW = new Date(YEAR, MONTH, 1).getDay() // 0=Sun, 1=Mon...
const PREV_MONTH_DAYS = new Date(YEAR, MONTH, 0).getDate()

export default function CalendarView({ onNavigate }) {
  const [viewMode, setViewMode] = useState('month')

  const days = []

  // Previous month's trailing days
  for (let i = 0; i < START_DOW; i++) {
    days.push({ day: PREV_MONTH_DAYS - START_DOW + 1 + i, currentMonth: false })
  }

  // Current month's days
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    days.push({ day: d, currentMonth: true })
  }

  // Next month's leading days to fill the last row
  const remaining = (7 - (days.length % 7)) % 7
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, currentMonth: false })
  }

  const today = new Date()
  const isToday = (d) =>
    today.getDate() === d.day &&
    today.getMonth() === MONTH &&
    today.getFullYear() === YEAR &&
    d.currentMonth

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  return (
    <div className="min-h-screen flex">
      <Sidebar currentView="calendar" onNavigate={onNavigate} />

      <main className="flex-1 p-8 bg-brand-warm">
        <div className="bg-white rounded-[32px] p-8 mx-auto shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#1f2340]">Calendar</h1>

            <div className="flex bg-gray-100 rounded-xl p-1">
              {['today', 'month', 'week'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-5 py-2 rounded-lg font-medium capitalize cursor-pointer transition ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="border rounded-[24px] overflow-hidden bg-white">
            <div className="flex justify-between items-center p-6 border-b">
              <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-50 cursor-pointer text-lg">
                ‹
              </button>
              <h2 className="text-3xl font-bold text-[#1f2340]">
                {monthNames[MONTH]} {YEAR}
              </h2>
              <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-50 cursor-pointer text-lg">
                ›
              </button>
            </div>

            {viewMode === 'month' && (
              <>
                <div className="grid grid-cols-7 border-b">
                  {DAYS_OF_WEEK.map((d) => (
                    <div key={d} className="text-center py-4 text-gray-500 font-medium">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-gray-700">
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`h-28 border flex items-start justify-end p-2 ${
                        !d.currentMonth ? 'bg-gray-50 text-gray-400' : ''
                      }`}
                    >
                      {isToday(d) ? (
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                          {d.day}
                        </div>
                      ) : (
                        <span className="text-sm">{d.day}</span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {viewMode !== 'month' && (
              <div className="p-16 text-center text-gray-400">
                {viewMode === 'today' ? 'Today' : 'Week'} view coming soon
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
