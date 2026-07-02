import { useState } from 'react'
import useTaskValidation from './useTaskValidation'
import useCurrentDateTime from './useCurrentDateTime'

export default function useTaskActions() {
  const { todayStr, currentTimeStr } = useCurrentDateTime()
  const { validateTask } = useTaskValidation()

  // 1. Struktur data tugas baru (Lebih sederhana & realistis)
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Database Assignment', date: '2026-06-16', time: '10:00', priority: 'urgent', isCompleted: false },
    { id: 2, title: 'Calculus Homework', date: '2026-06-24', time: '14:30', priority: 'high', isCompleted: false },
    { id: 3, title: 'Machine Learning Quiz', date: '2026-06-18', time: '19:00', priority: 'medium', isCompleted: true },
    { id: 4, title: 'Physics Report', date: '2026-06-24', time: '08:00', priority: 'low', isCompleted: false },
  ])

  // 2. State melacak tanggal yang sedang diklik pengguna (Default: Hari ini)
  const [selectedDateStr, setSelectedDateStr] = useState(todayStr)

  // State Form & Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState(todayStr)
  const [newTime, setNewTime] = useState(currentTimeStr)
  const [newPriority, setNewPriority] = useState('medium')
  const [editingTaskId, setEditingTaskId] = useState(null)

  const resetForm = () => {
    setNewTitle('')
    setNewDate(todayStr)
    setNewTime(currentTimeStr)
    setNewPriority('medium')
    setEditingTaskId(null)
    setIsModalOpen(false)
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task))
  }

  const handleEditClick = (task) => {
    setEditingTaskId(task.id)
    setNewTitle(task.title)
    setNewDate(task.date)
    setNewTime(task.time)
    setNewPriority(task.priority)
    setIsModalOpen(true)
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Hapus tugas ini?")) {
      setTasks(prev => prev.filter(t => t.id !== taskId))
    }
  }

  const handleSaveTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    // Eksekusi Satpam Validasi Waktu Lampau
    const validation = validateTask(newDate, newTime)
    if (!validation.isValid) {
      alert(validation.message)
      return
    }

    if (editingTaskId) {
      setTasks(prev => prev.map(t => t.id === editingTaskId ? { ...t, title: newTitle, date: newDate, time: newTime, priority: newPriority } : t))
    } else {
      setTasks(prev => [...prev, {
        id: Date.now(),
        title: newTitle,
        date: newDate,
        time: newTime,
        priority: newPriority,
        isCompleted: false
      }])
    }
    resetForm()
  }

  return {
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
    resetForm
  }
}
