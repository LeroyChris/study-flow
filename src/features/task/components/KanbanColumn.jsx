import TaskCard from './TaskCard'

export default function KanbanColumn({ title, icon, color, tasks, onComplete }) {
  return (
    <div className="w-[200px] shrink-0">
      <div className={`${color} text-white px-4 py-3 rounded-xl mb-4 shadow-sm`}>
        <h2 className="font-semibold flex items-center gap-2">
          <img src={icon} className="w-4 h-4" alt="" />
          {title}
        </h2>
      </div>
      <div className="space-y-4">
        {tasks.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-4 text-center text-sm text-gray-400 dark:text-gray-500">
            No tasks
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={onComplete} />
        ))}
      </div>
    </div>
  )
}
