export default function DeckForm({ mode, values, onChange, onSave, onCancel, errors, errorKeyPrefix = '' }) {
  const isEdit = mode === 'edit'
  const title = isEdit ? 'Edit Deck' : 'Create New Deck'

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-8 max-w-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Title *</label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => onChange({ ...values, title: e.target.value })}
            placeholder="My Awesome Deck"
            className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
          />
          {errors[`${errorKeyPrefix}DeckTitle`] && (
            <p className="text-xs text-red-500 mt-1">{errors[`${errorKeyPrefix}DeckTitle`]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
          <input
            type="text"
            value={values.description}
            onChange={(e) => onChange({ ...values, description: e.target.value })}
            placeholder="A deck about..."
            className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
          <input
            type="text"
            value={values.category}
            onChange={(e) => onChange({ ...values, category: e.target.value })}
            placeholder="Web Development, Science, etc."
            className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
          />
        </div>
        <div className="flex gap-3 pt-1">
          <button
            onClick={onSave}
            className="bg-brand-purple text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition"
          >
            {isEdit ? 'Save' : 'Create'}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
