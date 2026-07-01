import { useState } from 'react'

export default function TimerSettingsModal({ isOpen, onClose, currentSettings, onSave }) {
  const [focusInput, setFocusInput] = useState(currentSettings[0]?.minutes || 25)
  const [shortInput, setShortInput] = useState(currentSettings[1]?.minutes || 5)
  const [longInput, setLongInput] = useState(currentSettings[2]?.minutes || 15)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const focusMinutes = Math.max(1, parseInt(focusInput) || 25)
    const shortMinutes = Math.max(1, parseInt(shortInput) || 5)
    const longMinutes = Math.max(1, parseInt(longInput) || 15)
    onSave([focusMinutes, shortMinutes, longMinutes])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-[32px] w-full max-w-md p-8 shadow-xl mx-4 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer text-xl">✕</button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">Timer Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-400 dark:text-gray-500 mb-2">Focus Duration (minutes)</label>
            <input type="number" value={focusInput} onChange={(e) => setFocusInput(e.target.value)} className="w-full bg-[#f0efe9]/60 dark:bg-gray-700 px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-100 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 dark:text-gray-500 mb-2">Short Break (minutes)</label>
            <input type="number" value={shortInput} onChange={(e) => setShortInput(e.target.value)} className="w-full bg-[#f0efe9]/60 dark:bg-gray-700 px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-100 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 dark:text-gray-500 mb-2">Long Break (minutes)</label>
            <input type="number" value={longInput} onChange={(e) => setLongInput(e.target.value)} className="w-full bg-[#f0efe9]/60 dark:bg-gray-700 px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-100 focus:outline-none" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-pointer">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-blue-600 text-white cursor-pointer shadow-md shadow-blue-200">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}