import
  { House, ListTodo, CalendarDays, Timer, Book, Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'


const NAV_ITEMS = [
  { label: 'Home', view: 'landing', icon: House},
  { label: 'Task', view: 'task', icon: ListTodo},
  { label: 'Calendar', view: 'calendar', icon: CalendarDays},
  { label: 'Pomodoro', view: 'pomodoro', icon: Timer},
  { label: 'Flashcards', view: 'flashcard', icon: Book},
]

export default function Sidebar({ currentView, onNavigate }) {
  const { isDark, toggle } = useDarkMode()

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between p-4 h-screen sticky top-0">
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
                    ? 'bg-brand-primary-light dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={18}
                className={currentView === item.view
                  ? 'text-brand-primary dark:text-brand-primary'
                  : 'text-gray-400 dark:text-gray-500'
                  }/>
                <span>{item.label}</span>
              </button>
            </li>
          )})}
        </ul>
      </nav>

      <div className="mt-auto space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none">Scholar</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">University Student</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
