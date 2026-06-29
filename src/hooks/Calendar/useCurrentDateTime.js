export default function useCurrentDateTime() {
  const now = new Date()
  
  // Menghasilkan format YYYY-MM-DD sesuai zona waktu lokal
  const todayStr = now.toLocaleDateString('sv-SE') 
  
  // Menghasilkan format HH:MM
  const currentTimeStr = now.toTimeString().slice(0, 5)

  return {
    todayStr,
    currentTimeStr,
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth()
  }
}
