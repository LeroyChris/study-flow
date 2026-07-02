export default function StatCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm p-4 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">{label}</p>
    </div>
  )
}
