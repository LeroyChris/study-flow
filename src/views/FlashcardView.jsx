import Sidebar from '../components/Sidebar'

export default function FlashcardView({ onNavigate }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar currentView="flashcard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-gray-500">☰</span>
            <h2 className="font-semibold text-gray-700">Flashcards</h2>
          </div>

          <div>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition relative focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 bg-brand-warm p-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Flashcards</h1>
            <button className="bg-brand-purple text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition cursor-pointer">
              + New Deck
            </button>
          </div>

          <section className="bg-white border border-gray-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center max-w-5xl mx-auto min-h-[345px]">
            <div className="space-y-4">
              <div className="text-4xl">📚</div>
              <h3 className="text-lg font-semibold text-gray-900">No decks yet</h3>
              <p className="text-gray-500">Create your first flashcard deck to start studying.</p>
              <button className="bg-[#6d00e7] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition cursor-pointer">
                Create Deck
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
