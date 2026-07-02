export default function useCalendarGrid(currentMonth, currentYear) {
  const days = []
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()
  
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({
      day: prevMonthDays - startDayOfWeek + 1 + i,
      currentMonth: false,
      month: prevMonth,
      year: prevYear,
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      currentMonth: true,
      month: currentMonth,
      year: currentYear,
    })
  }

  const remaining = (7 - (days.length % 7)) % 7
  for (let day = 1; day <= remaining; day++) {
    days.push({
      day,
      currentMonth: false,
      month: currentMonth === 11 ? 0 : currentMonth + 1,
      year: currentMonth === 11 ? currentYear + 1 : currentYear,
    })
  }

  return days
}
