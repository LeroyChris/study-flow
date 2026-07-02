export default function ConfirmModal({ confirmDelete, onCancel, onConfirm }) {
  if (!confirmDelete) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Delete {confirmDelete.type === 'deck' ? 'Deck' : 'Card'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete &ldquo;
          <span className="font-medium text-gray-700 dark:text-gray-200">{confirmDelete.title}</span>
          &rdquo;? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={onCancel}
            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
