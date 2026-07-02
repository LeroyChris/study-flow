export default function TaskCard({ task, onComplete }) {
  const deadline = new Date(task.deadline)
  const diffDays = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24))

  const getBadge = () => {
    if (task.completed) return 'Completed'
    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days left`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.subject}</p>
        </div>
        <button
          onClick={() => onComplete(task.id)}
          className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition"
        >
          ✓
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
          {task.deadline}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{getBadge()}</span>
      </div>
    </div>
  )
}
