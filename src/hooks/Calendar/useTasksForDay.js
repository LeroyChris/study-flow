export default function useTasksForDay(tasks) {
  return (dayObj) => {
    const gridDateStr = `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`
    return tasks.filter((t) => t.date === gridDateStr)
  }
}
