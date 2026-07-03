import { Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'
import { NAV_ITEMS } from '../data/navigation'

export default function Sidebar({ currentView, onNavigate, isCollapsed, onToggleCollapse }) {
  const { isDark, toggle } = useDarkMode()

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between ${isCollapsed ? 'p-2' : 'p-4'} h-screen sticky top-0 transition-all duration-200`}>
      <div>
        <button
          onClick={onToggleCollapse}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-end'} px-2 py-3 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <nav className="mt-4">
          <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon

            return (
            <li key={item.view}>
              <button
                onClick={() => onNavigate(item.view)}
                className={`w-full text-left flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                  currentView === item.view
                    ? 'bg-brand-primary-light dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18}
                className={currentView === item.view
                  ? 'text-brand-primary dark:text-brand-primary'
                  : 'text-gray-400 dark:text-gray-500'
                  }/>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          )})}
        </ul>
      </nav>
      </div>

      <div className="mt-auto space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
        <button
          onClick={toggle}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition`}
          title={isCollapsed ? (isDark ? 'Light Mode' : 'Dark Mode') : undefined}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {!isCollapsed && <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </aside>
  )
}
