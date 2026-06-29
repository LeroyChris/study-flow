export default function isToday(dayObj) {
  const todayStr = new Date().toLocaleDateString('sv-SE')
  
  const gridDateStr = `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`
  
  return todayStr === gridDateStr
}
