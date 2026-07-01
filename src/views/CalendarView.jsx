import { useState } from 'react'
import Sidebar from '../components/Sidebar'

import DAYS_OF_WEEK from '../hooks/Calendar/days'
import monthNames from '../hooks/Calendar/months'
import priorityStyles from '../hooks/Calendar/priorityStyles'
import priorityStats from '../hooks/Calendar/priorityStats'
import isToday from '../hooks/Calendar/isToday'

import useCalendarGrid from '../hooks/Calendar/useCalendarGrid'
import useOverdueTasks from '../hooks/Calendar/useOverdueTasks'
import useTasksForDay from '../hooks/Calendar/useTasksForDay'
import useTaskActions from '../hooks/Calendar/useTaskActions'
import useCurrentDateTime from '../hooks/Calendar/useCurrentDateTime'
import useSelectedDate from '../hooks/Calendar/useSelectedDate'

export default function CalendarView({ onNavigate }) {
  const { todayStr } = useCurrentDateTime()
  const { formatSelectedDateText } = useSelectedDate()
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 21))
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const {
    tasks,
    selectedDateStr,
    setSelectedDateStr,
    isModalOpen,
    setIsModalOpen,
    newTitle,
    setNewTitle,
    newDate,
    setNewDate,
    newTime,
    setNewTime,
    newPriority,
    setNewPriority,
    editingTaskId,
    toggleTaskCompletion,
    handleEditClick,
    handleDeleteTask,
    handleSaveTask,
    resetForm,
  } = useTaskActions()

  const days = useCalendarGrid(currentMonth, currentYear)
  const overdueTasks = useOverdueTasks(tasks)
  const getTasksForDay = useTasksForDay(tasks)

  const handlePrev = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  const handleNext = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Hitung jumlah tugas khusus untuk tanggal aktif yang sedang diklik pengguna
  const activeDayTasks = tasks.filter(t => t.date === selectedDateStr)

  return (
    <div className="min-h-screen flex bg-brand-warm dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
      <Sidebar currentView="calendar" onNavigate={onNavigate} />

      <main className="flex-1 p-5 overflow-y-auto">
        
        {/* 1. BANNER TUGAS TERLEWAT BERDENYUT & GRADASI EMAS/MERAH */}
        {overdueTasks.length > 0 && (
          <div className="mb-4 p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-red-100 flex items-center gap-3 text-red-700 font-semibold shadow-sm animate-pulse">
            <span className="text-lg select-none">⚠️</span>
            <div>
              <p className="font-bold">
                Anda memiliki {overdueTasks.length} tugas yang terlewat!
              </p>
              <p className="text-xs text-red-500 font-medium">
                Segera selesaikan agar tidak menumpuk.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-[1fr_280px] gap-5 items-start">
          
          {/* AREA KIRI: KALENDER & CARD GLOW BAWAH */}
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h1 className="text-2xl font-bold text-[#1f2340] dark:text-gray-100 font-poppins">Calendar</h1>
                  <p className="text-gray-400 text-xs mt-0.5">Manage deadlines and study schedules</p>
                </div>
              </div>

              {/* Statistik Prioritas Atas */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {priorityStats.map((stat) => (
                  <div key={stat.key} className={`border rounded-xl p-3 ${stat.styles}`}>
                    <p className="text-xs font-medium">{stat.label}</p>
                    <h3 className="text-xl font-bold mt-1 text-gray-900">
                      {tasks.filter((t) => t.priority === stat.key && !t.isCompleted).length}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Kontainer Kalender Utama */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <button onClick={handlePrev} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">‹</button>
                  <h2 className="text-sm font-bold text-[#1f2340] dark:text-gray-100 font-poppins">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <button onClick={handleNext} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">›</button>
                </div>

                <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                  {DAYS_OF_WEEK.map((d) => (
                    <div key={d} className="text-center py-2 text-gray-500 dark:text-gray-400 font-semibold text-xs">{d}</div>
                  ))}
                </div>

                {/* Grid Hari Kalender */}
                <div className="grid grid-cols-7 divide-x divide-y divide-gray-100 dark:divide-gray-700 border-t border-l border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  {days.map((d, i) => {
                    const dayTasks = getTasksForDay(d)
                    const currentDayIsToday = isToday(d)
                    
                    const currentGridStr = `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
                    const isSelected = selectedDateStr === currentGridStr

                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedDateStr(currentGridStr)}
                        className={`h-16 p-1 flex flex-col justify-between hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all cursor-pointer ${
                          isSelected ? 'bg-blue-50/60 dark:bg-blue-900/30 ring-1 ring-blue-400 ring-inset' : ''
                        } ${!d.currentMonth ? 'bg-gray-50/40 dark:bg-gray-800/40 text-gray-300 dark:text-gray-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                      >
                        <div className="flex justify-between items-center w-full p-0.5">
                          {currentDayIsToday ? (
                            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm shadow-blue-100">
                              {d.day}
                            </div>
                          ) : (
                            <span className={`text-[11px] font-medium pl-0.5 ${isSelected ? 'text-blue-600 font-bold' : ''}`}>{d.day}</span>
                          )}
                        </div>

                        {/* Titik Penanda Tugas Kecil */}
                        <div className="flex items-center justify-center gap-0.5 min-h-[8px] pb-1">
                          {dayTasks.slice(0, 3).map((task) => (
                            <div
                              key={task.id}
                              className={`w-1.5 h-1.5 rounded-full ${
                                task.isCompleted ? 'bg-gray-300' : priorityStyles[task.priority]?.dot || 'bg-yellow-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-2 relative overflow-hidden rounded-2xl border border-blue-100 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-800 p-5 flex justify-between items-center hover:shadow-xl hover:shadow-blue-100/70 dark:hover:shadow-blue-900/30 transition-all duration-500 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl shadow-3xs select-none">
                  🕒
                </div>
                <div>
                  <h3 className="font-bold text-[#1f2340] dark:text-gray-100 font-poppins">
                    {formatSelectedDateText(selectedDateStr)}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                    {activeDayTasks.length === 0
                      ? "No task scheduled. Add a task for this day."
                      : `You have ${activeDayTasks.length} task(s) scheduled.`}
                  </p>
                </div>
              </div>
              
              <div className="relative pr-2">
                <div className="sparkle" />
                <div className="text-5xl select-none calendar-float">
                  📅
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: UPCOMING TASKS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between min-h-[400px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div>
              <h2 className="text-md font-bold text-[#1f2340] dark:text-gray-100 mb-4 font-poppins">Upcoming Tasks</h2>
              <div className="space-y-3">
                {tasks.map((task) => {
                  const style = priorityStyles[task.priority] || priorityStyles.medium
                  return (
                    <div
                      key={task.id}
                      className={`p-3 border border-gray-100 dark:border-gray-700 rounded-xl flex flex-col justify-between transition group relative gap-2 ${
                        task.isCompleted ? 'bg-gray-50/50 dark:bg-gray-800/50 opacity-60' : 'bg-gray-50 dark:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1 w-3.5 h-3.5 rounded border-gray-300 text-blue-600 cursor-pointer shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className={`text-[10px] font-bold ${task.isCompleted ? 'text-gray-400' : style.text}`}>
                            {task.isCompleted ? '✓ Completed' : `🕒 ${task.time}`}
                          </span>
                          <h4 className={`text-xs font-bold text-gray-800 dark:text-gray-200 truncate mt-0.5 ${task.isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>{task.title}</h4>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200/60 dark:border-gray-700/60 pt-1.5 text-[10px] text-gray-400 dark:text-gray-500">
                        <span className="font-medium">📅 {task.date}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEditClick(task)} className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-500 dark:text-gray-400 hover:text-blue-600 text-[11px]">✏️</button>
                          <button onClick={() => handleDeleteTask(task.id)} className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-500 dark:text-gray-400 hover:text-red-600 text-[11px]">❌</button>
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-1 ${task.isCompleted ? 'bg-gray-300' : style.dot}`} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="mt-4 w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm hover:bg-blue-700 transition"
            >
              + Add New Task
            </button>
          </div>

        </div>
      </main>

      {/* Modal Input/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-md font-bold text-gray-900 dark:text-gray-100 mb-4">{editingTaskId ? 'Edit Task' : 'Create New Task'}</h3>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Task Name</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl p-2 text-sm"
                  placeholder="e.g. Finish Essay"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl p-2 text-sm bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Time</label>
                <input
                  type="time"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl p-2 text-sm bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl p-2 text-sm bg-white dark:bg-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={resetForm} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold py-2.5 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl">
                  {editingTaskId ? 'Update Task' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
