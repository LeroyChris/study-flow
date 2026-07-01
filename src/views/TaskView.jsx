import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import highIcon from '../assets/icons/circle-chevron-up.svg'
import urgentIcon from '../assets/icons/shield-alert (1).svg'
import mediumIcon from '../assets/icons/bookmark.svg'
import lowIcon from '../assets/icons/turtle.svg'
import completedIcon from '../assets/icons/circle-check-big.svg'

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Database Assignment',
    subject: 'Database',
    deadline: '2026-06-16',
    completed: false,
  },
  {
    id: 2,
    title: 'Machine Learning Quiz',
    subject: 'AI',
    deadline: '2026-06-18',
    completed: false,
  },
  {
    id: 3,
    title: 'Calculus Homework',
    subject: 'Math',
    deadline: '2026-06-24',
    completed: false,
  },
]

export default function TaskView({ onNavigate }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const [showModal, setShowModal] = useState(false)

  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    deadline: '',
  })

  const addTask = () => {
  if (
    !newTask.title.trim() ||
    !newTask.subject.trim() ||
    !newTask.deadline
  ) {
    return
  }

  setTasks((prev) => [
    ...prev,
    {
      id: Date.now(),
      title: newTask.title,
      subject: newTask.subject,
      deadline: newTask.deadline,
      completed: false,
    },
  ])

  setNewTask({
    title: '',
    subject: '',
    deadline: '',
  })

  setShowModal(false)
}

  const groupedTasks = useMemo(() => {
    const groups = {
      urgent: [],
      high: [],
      medium: [],
      low: [],
      completed: [],
    }

    tasks.forEach((task) => {
      if (task.completed) {
        groups.completed.push(task)
        return
      }

      const today = new Date()
      const deadline = new Date(task.deadline)

      const diffDays = Math.ceil(
        (deadline - today) / (1000 * 60 * 60 * 24)
      )

      if (diffDays <= 1) {
        groups.urgent.push(task)
      } else if (diffDays <= 3) {
        groups.high.push(task)
      } else if (diffDays <= 7) {
        groups.medium.push(task)
      } else {
        groups.low.push(task)
      }
    })

    return groups
  }, [tasks])

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    )
  }

  return (
    <div className="flex min-h-screen bg-brand-warm dark:bg-gray-900">

      <Sidebar
        currentView="task"
        onNavigate={onNavigate}
      />

      <main className="flex-1 overflow-hidden">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-5 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-poppins">
              Tasks Board
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Priorities are automatically calculated from deadlines.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="
              px-5 py-3
              rounded-xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition
            ">
              + New Task
          </button>
        </div>
      

        {/* Kanban */}
        <div className="p-8 overflow-x-auto h-[calc(90vh-80px)]">
          <div className="flex gap-6 min-w-max">

            <KanbanColumn
              title="Urgent"
              icon={urgentIcon}
              color="bg-red-500"
              tasks={groupedTasks.urgent}
              onComplete={toggleComplete}
            />

            <KanbanColumn
              title="High"
              icon={highIcon}
              color="bg-orange-500"
              tasks={groupedTasks.high}
              onComplete={toggleComplete}
            />

            <KanbanColumn
              title="Medium"
              icon={mediumIcon}
              color="bg-yellow-500"
              tasks={groupedTasks.medium}
              onComplete={toggleComplete}
            />

            <KanbanColumn
              title="Low"
              icon={lowIcon}
              color="bg-blue-500"
              tasks={groupedTasks.low}
              onComplete={toggleComplete}
            />

            <KanbanColumn
              title="Completed"
              icon={completedIcon}
              color="bg-emerald-500"
              tasks={groupedTasks.completed}
              onComplete={toggleComplete}
            />

          </div>
        </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
              New Task
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Subject"
                value={newTask.subject}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    subject: e.target.value,
                  })
                }
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3"
              />

              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    deadline: e.target.value,
                  })
                }
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="
                  px-4 py-2
                  rounded-xl
                  border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                "
              >
                Cancel
              </button>

              <button
                onClick={addTask}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-blue-600
                  text-white
                "
              >
                Add Task
              </button>

            </div>

          </div>

        </div>
      )}

      </main>

    </div>
        
  )
}


function KanbanColumn({
  title,
  icon,
  color,
  tasks,
  onComplete,
}) {
  return (
    <div className="w-[200px] shrink-0">

      <div
        className={`${color} text-white px-4 py-3 rounded-xl mb-4 shadow-sm`}
      >
        <h2 className="font-semibold flex items-center gap-2">
       <img
       src={icon}
       className="w-4 h-4"
       alt=""
       />
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
          <TaskCard
            key={task.id}
            task={task}
            onComplete={onComplete}
          />
        ))}

      </div>
    </div>
  )
}

function TaskCard({
  task,
  onComplete,
}) {
  const deadline = new Date(task.deadline)

  const diffDays = Math.ceil(
    (deadline - new Date()) /
      (1000 * 60 * 60 * 24)
  )

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
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {task.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {task.subject}
          </p>
        </div>

        <button
          onClick={() => onComplete(task.id)}
          className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
        >
          ✓
        </button>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
          {task.deadline}
        </span>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {getBadge()}
        </span>

      </div>

    </div>
  )
}

