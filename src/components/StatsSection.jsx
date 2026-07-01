import { useCountAnimation } from '../hooks/useCountAnimation'

const STATS = [
  { target: 10, label: 'Students Trusted', suffix: 'K+' },
  { target: 500, label: 'Task Completed', suffix: 'M+' },
  { target: 2000, label: 'Study Minutes', suffix: 'K+' },
]

function StatItem({ target, label }) {
  const { value, suffix } = useCountAnimation(target)

  return (
    <div>
      <h2 className="text-gray-500 dark:text-gray-400 text-xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
        <span>{value}</span>
        {suffix}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-brand-warm dark:bg-gray-900 border-black-100 text-black dark:text-gray-100 px-6 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-5 max-w-full mx-auto justify-items-center text-center">
      {STATS.map((s) => (
        <StatItem key={s.label} target={s.target} label={s.label} />
      ))}
    </section>
  )
}
