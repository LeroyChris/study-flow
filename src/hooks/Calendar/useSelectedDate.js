export default function useSelectedDate() {
  const formatSelectedDateText = (dateStr) => {
    if (!dateStr) return ""
    // Pisahkan string secara manual agar aman dari bug perbedaan zona waktu local javascript
    const [year, month, day] = dateStr.split('-')
    const dateObj = new Date(year, parseInt(month) - 1, day)
    
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return { formatSelectedDateText }
}
