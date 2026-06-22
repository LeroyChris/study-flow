import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarView({ onNavigate }) {
  const [viewMode, setViewMode] = useState('month')
  
  // State melacak tanggal aktif saat ini
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 21)) // Default: 21 Juni 2026
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Master Data Tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Database Assignment', dueDate: 16, month: 5, year: 2026, priority: 'urgent', isCompleted: false },
    { id: 2, title: 'Calculus Homework', dueDate: 24, month: 5, year: 2026, priority: 'high', isCompleted: false },
    { id: 3, title: 'Machine Learning Quiz', dueDate: 18, month: 5, year: 2026, priority: 'medium', isCompleted: true },
    { id: 4, title: 'Physics Report', dueDate: 24, month: 5, year: 2026, priority: 'low', isCompleted: false },
  ])

  // State Modal & Form Input
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDueDate, setNewDueDate] = useState('1')
  const [newPriority, setNewPriority] = useState('medium')
  const [editingTaskId, setEditingTaskId] = useState(null)

  // Logika Matematika Kalender Bulanan
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()

  const priorityStyles = {
    urgent: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
    high: { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' },
    medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    low: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
  }

  // --- LOGIKA GENERATE HARI MINGGUAN (MODE WEEK) ---
  const getWeekDates = (baseDate) => {
    const currentDOW = baseDate.getDay()
    const startOfWeek = new Date(baseDate)
    startOfWeek.setDate(baseDate.getDate() - currentDOW) // Mundur ke hari Minggu
    
    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek)
      d.setDate(startOfWeek.getDate() + i)
      weekDays.push({
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        dayName: DAYS_OF_WEEK[i],
        fullDate: d
      })
    }
    return weekDays
  }
  const weekDays = getWeekDates(currentDate)

  // Navigasi Waktu Dinamis tergantung Mode aktif
  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
    } else if (viewMode === 'week') {
      const prevWeek = new Date(currentDate)
      prevWeek.setDate(currentDate.getDate() - 7)
      setCurrentDate(prevWeek)
    } else {
      const prevDay = new Date(currentDate)
      prevDay.setDate(currentDate.getDate() - 1)
      setCurrentDate(prevDay)
    }
  }

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
    } else if (viewMode === 'week') {
      const nextWeek = new Date(currentDate)
      nextWeek.setDate(currentDate.getDate() + 7)
      setCurrentDate(nextWeek)
    } else {
      const nextDay = new Date(currentDate)
      nextDay.setDate(currentDate.getDate() + 1)
      setCurrentDate(nextDay)
    }
  }

  // Handle Manajemen Tugas
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task))
  }

  const handleSaveTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    if (editingTaskId) {
      setTasks(tasks.map(t => t.id === editingTaskId ? { ...t, title: newTitle, dueDate: parseInt(newDueDate), priority: newPriority } : t))
    } else {
      setTasks([...tasks, { id: Date.now(), title: newTitle, dueDate: parseInt(newDueDate), month: currentMonth, year: currentYear, priority: newPriority, isCompleted: false }])
    }
    resetForm()
  }

  const handleEditClick = (task) => {
    setEditingTaskId(task.id)
    setNewTitle(task.title)
    setNewDueDate(task.dueDate.toString())
    setNewPriority(task.priority)
    setIsModalOpen(true)
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Hapus tugas ini?")) setTasks(tasks.filter(t => t.id !== taskId))
  }

  const resetForm = () => {
    setNewTitle('')
    setNewDueDate('1')
    setNewPriority('medium')
    setEditingTaskId(null)
    setIsModalOpen(false)
  }

  const getTasksForDay = (dayObj) =>
    tasks.filter(t => t.dueDate === dayObj.day && t.month === dayObj.month && t.year === dayObj.year)

  // Logika Grid Bulanan
  const days = []
  const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYearIdx = currentMonth === 0 ? currentYear - 1 : currentYear
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({ day: prevMonthDays - startDayOfWeek + 1 + i, currentMonth: false, month: prevMonthIdx, year: prevYearIdx })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, currentMonth: true, month: currentMonth, year: currentYear })
  }
  const remaining = (7 - (days.length % 7)) % 7
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, currentMonth: false, month: currentMonth === 11 ? 0 : currentMonth + 1, year: currentMonth === 11 ? currentYear + 1 : currentYear })
  }

  const today = new Date()
  const isToday = (d) => today.getDate() === d.day && today.getMonth() === d.month && today.getFullYear() === d.year

  const overdueTasks = tasks.filter(t => {
    const taskDate = new Date(t.year, t.month, t.dueDate)
    const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return taskDate < todayReset && !t.isCompleted
  })

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 relative">
      <Sidebar currentView="calendar" onNavigate={onNavigate} />

      <main className="flex-1 p-5 overflow-y-auto">
        {overdueTasks.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-pulse">
            <span>⚠️</span> Anda memiliki {overdueTasks.length} tugas yang terlewati!
          </div>
        )}

        <div className="grid grid-cols-[1fr_280px] gap-5 items-start">
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h1 className="text-2xl font-bold text-[#1f2340]">Calendar</h1>
                <p className="text-gray-400 text-xs mt-0.5">Manage deadlines and study schedules</p>
              </div>

              <div className="flex bg-gray-100 rounded-lg p-0.5">
                {['today', 'month', 'week'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode)
                      setCurrentDate(new Date(2026, 5, 21)) // Reset ke tanggal default gambar agar sinkron
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition ${
                      viewMode === mode ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Statistik Prioritas Atas */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: 'Urgent', color: 'red', key: 'urgent' },
                { label: 'High', color: 'orange', key: 'high' },
                { label: 'Medium', color: 'yellow', key: 'medium' },
                { label: 'Low', color: 'blue', key: 'low' },
              ].map((stat) => (
                <div key={stat.label} className={`bg-${stat.color}-50 border border-${stat.color}-100 rounded-xl p-3`}>
                  <p className={`text-${stat.color}-600 text-xs font-medium`}>{stat.label}</p>
                  <h3 className="text-xl font-bold mt-1 text-gray-900">
                    {tasks.filter((t) => t.priority === stat.key && !t.isCompleted).length}
                  </h3>
                </div>
              ))}
            </div>

            {/* Kontainer Kalender Utama */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="flex justify-between items-center p-3 border-b bg-gray-50">
                <button onClick={handlePrev} className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-100 transition">‹</button>
                <h2 className="text-sm font-bold text-[#1f2340]">
                  {viewMode === 'today' && `${currentDate.getDate()} ${monthNames[currentMonth]} ${currentYear}`}
                  {viewMode === 'week' && `Week of ${weekDays[0].day} ${monthNames[weekDays[0].month]} ${weekDays[0].year}`}
                  {viewMode === 'month' && `${monthNames[currentMonth]} ${currentYear}`}
                </h2>
                <button onClick={handleNext} className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-100 transition">›</button>
              </div>

              {/* RENDER VIEW: TODAY */}
              {viewMode === 'today' && (
                <div className="p-6 bg-white min-h-[300px]">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-blue-900">Today's Overview</h3>
                      <p className="text-xs text-blue-600 mt-0.5">
                        Anda memiliki {getTasksForDay({day: currentDate.getDate(), month: currentMonth, year: currentYear}).filter(t=>!t.isCompleted).length} tugas aktif hari ini.
                      </p>
                    </div>
                    <span className="text-2xl">📅</span>
                  </div>
                  <div className="space-y-2">
                    {getTasksForDay({day: currentDate.getDate(), month: currentMonth, year: currentYear}).length === 0 ? (
                      <p className="text-center text-xs text-gray-400 py-10">Tidak ada tugas terjadwal untuk hari ini.</p>
                    ) : (
                      getTasksForDay({day: currentDate.getDate(), month: currentMonth, year: currentYear}).map(task => (
                        <div key={task.id} className="p-3 border border-gray-100 rounded-xl flex items-center justify-between bg-gray-50/50">
                          <span className={`text-xs font-semibold ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${priorityStyles[task.priority].bg} ${priorityStyles[task.priority].text}`}>{task.priority}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* RENDER VIEW: WEEK */}
              {viewMode === 'week' && (
                <div className="grid grid-cols-7 divide-x divide-gray-100 min-h-[300px]">
                  {weekDays.map((wd, i) => {
                    const dayTasks = getTasksForDay(wd)
                    const activeToday = isToday(wd)
                    return (
                      <div key={i} className={`p-2 flex flex-col gap-2 min-h-[280px] ${activeToday ? 'bg-blue-50/20' : ''}`}>
                        <div className="text-center border-b pb-2">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{wd.dayName}</p>
                          <p className={`text-sm font-bold mt-0.5 inline-block px-1.5 py-0.5 rounded-full ${activeToday ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>{wd.day}</p>
                        </div>
                        <div className="space-y-1 flex-1 overflow-y-auto">
                          {dayTasks.map(task => (
                            <div key={task.id} className={`p-1.5 rounded text-[10px] font-medium truncate ${task.isCompleted ? 'bg-gray-100 text-gray-400 line-through' : `${priorityStyles[task.priority].bg} ${priorityStyles[task.priority].text}`}`}>
                              {task.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* RENDER VIEW: MONTH */}
              {viewMode === 'month' && (
                <>
                  <div className="grid grid-cols-7 border-b bg-gray-50/50">
                    {DAYS_OF_WEEK.map((d) => (
                      <div key={d} className="text-center py-2 text-gray-500 font-semibold text-xs">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 divide-x divide-y divide-gray-100 border-t border-l border-gray-100">
                    {days.map((d, i) => {
                      const dayTasks = getTasksForDay(d)
                      const uncompletedTasks = dayTasks.filter(t => !t.isCompleted)
                      return (
                        <div key={i} className={`h-24 p-1.5 flex flex-col justify-between hover:bg-blue-50/40 transition-all ${!d.currentMonth ? 'bg-gray-50/70 text-gray-300' : ''}`}>
                          <div className="flex justify-between items-center">
                            {isToday(d) ? (
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">{d.day}</div>
                            ) : (
                              <span className="text-xs font-medium">{d.day}</span>
                            )}
                            {uncompletedTasks.length > 0 && (
                              <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md text-[10px] font-bold">{uncompletedTasks.length}</span>
                            )}
                          </div>
                          <div className="space-y-0.5 mt-1 overflow-hidden flex-1 flex flex-col justify-end">
                            {dayTasks.slice(0, 2).map((task) => (
                              <div key={task.id} onClick={(e) => { e.stopPropagation(); toggleTaskCompletion(task.id); }} className={`rounded px-1 py-0.5 text-[9px] font-medium truncate flex items-center gap-1 cursor-pointer ${task.isCompleted ? 'bg-gray-100 text-gray-400 line-through' : `${priorityStyles[task.priority].bg} ${priorityStyles[task.priority].text}`}`}>
                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${task.isCompleted ? 'bg-gray-400' : priorityStyles[task.priority].dot}`} />
                                <span className="truncate">{task.isCompleted ? `✓ ${task.title}` : task.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Upcoming Tasks */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[400px]">
            <div>
              <h2 className="text-md font-bold text-[#1f2340] mb-4">Upcoming Tasks</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className={`p-3 border border-gray-100 rounded-xl flex items-center justify-between transition group relative ${task.isCompleted ? 'bg-gray-50/50 opacity-60' : 'bg-gray-50'}`}>
                    <div className="min-w-0 flex-1 pr-2 flex items-start gap-2.5">
                      <input type="checkbox" checked={task.isCompleted} onChange={() => toggleTaskCompletion(task.id)} className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-blue-600 cursor-pointer" />
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-xs font-bold text-gray-800 truncate ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>{task.title}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Due {monthNames[task.month]} {task.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2">
                      <button onClick={() => handleEditClick(task)} className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-blue-600 text-[11px]">✏️</button>
                      <button onClick={() => handleDeleteTask(task.id)} className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-red-600 text-[11px]">❌</button>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-1 ${task.isCompleted ? 'bg-gray-300' : priorityStyles[task.priority].dot}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="mt-4 w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm hover:bg-blue-700 transition">+ Add New Task</button>
          </div>

        </div>
      </main>

      {/* Modal Reusable */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-md font-bold text-gray-900 mb-4">{editingTaskId ? 'Edit Task' : 'Create New Task'}</h3>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Task Title</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border rounded-xl p-2 text-sm" placeholder="e.g. Finish Essay" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Due Date (Day)</label>
                  <input type="number" min="1" max={daysInMonth} value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} className="w-full border rounded-xl p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Priority</label>
                  <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className="w-full border rounded-xl p-2 text-sm bg-white">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={resetForm} className="flex-1 bg-gray-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl">{editingTaskId ? 'Update Task' : 'Save Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
