/**
 * Pure utility functions for calendar operations.
 * These use NO React hooks — safe to import anywhere.
 */

export function isToday(dayObj) {
  const todayStr = new Date().toLocaleDateString('sv-SE')
  const gridDateStr = `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`
  return todayStr === gridDateStr
}

export function formatSelectedDateText(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  const dateObj = new Date(year, parseInt(month) - 1, day)
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getTasksForDay(tasks) {
  return (dayObj) => {
    const gridDateStr = `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`
    return tasks.filter((t) => t.date === gridDateStr)
  }
}
