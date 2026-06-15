import
  { House, CalendarDays, Timer, Book } from 'lucide-react'


const NAV_ITEMS = [
  { label: 'Home', view: 'landing', icon: House},
  { label: 'Task Calendar', view: 'calendar', icon: CalendarDays},
  { label: 'Pomodoro', view: 'pomodoro', icon: Timer},
  { label: 'Flashcards', view: 'flashcard', icon: Book},
]

export default function Sidebar({ currentView, onNavigate }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4 h-screen sticky top-0">
      <span></span>
      <nav>
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon

            return (
            <li key={item.view}>
              <button
                onClick={() => onNavigate(item.view)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                  currentView === item.view
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} 
                className={currentView === item.view
                  ? 'text-blue-600'
                  : 'text-gray-400'
                  }/>
                <span>{item.label}</span>
              </button>
            </li>
          )})}
        </ul>
      </nav>

      <div className="mt-auto space-y-4 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 rounded-lg transition">
          <span>🌙</span>
          <span className="font-medium">Dark Mode</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700 leading-none">Scholar</span>
            <span className="text-xs text-gray-400 mt-1">University Student</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
