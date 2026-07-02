import { useState } from 'react'
import useCalendarGrid from './useCalendarGrid'
import useOverdueTasks from './useOverdueTasks'
import useTaskActions from './useTaskActions'
import useCurrentDateTime from './useCurrentDateTime'
import { formatSelectedDateText, getTasksForDay } from '../calendarUtils'

export function useCalendar() {
  const { todayStr } = useCurrentDateTime()

  const {
    tasks,
    selectedDateStr, setSelectedDateStr,
    isModalOpen, setIsModalOpen,
    newTitle, setNewTitle,
    newDate, setNewDate,
    newTime, setNewTime,
    newPriority, setNewPriority,
    editingTaskId,
    toggleTaskCompletion,
    handleEditClick, handleDeleteTask, handleSaveTask,
    resetForm,
  } = useTaskActions()

  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 21))
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const days = useCalendarGrid(currentMonth, currentYear)
  const overdueTasks = useOverdueTasks(tasks)
  const getTasksForDayFn = getTasksForDay(tasks)

  const handlePrev = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  const handleNext = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const activeDayTasks = tasks.filter(t => t.date === selectedDateStr)

  return {
    /* Data */
    tasks, days, currentMonth, currentYear,
    selectedDateStr, overdueTasks, activeDayTasks,
    getTasksForDay: getTasksForDayFn,
    todayStr, daysInMonth,

    /* Navigation */
    handlePrev, handleNext, setCurrentDate,
    setSelectedDateStr,

    /* Modal */
    isModalOpen, setIsModalOpen,

    /* Form */
    newTitle, setNewTitle,
    newDate, setNewDate,
    newTime, setNewTime,
    newPriority, setNewPriority,
    editingTaskId,

    /* Actions */
    toggleTaskCompletion, handleEditClick, handleDeleteTask, handleSaveTask,
    resetForm,

    /* Utils (re-exported so view doesn't need separate imports) */
    formatSelectedDateText,
  }
}
