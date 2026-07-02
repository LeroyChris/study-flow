import useCurrentDateTime from './useCurrentDateTime'

export default function useOverdueTasks(tasks) {
  const { todayStr } = useCurrentDateTime()

  return tasks.filter((task) => {
    
    return task.date < todayStr && !task.isCompleted
  })
}
