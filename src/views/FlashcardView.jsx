import Sidebar from '../components/Sidebar'
import FlashcardList from '../components/flashcards/FlashcardList'
import StudyComplete from '../components/flashcards/StudyComplete'
import TiltCard from '../components/TiltCard'
import { BULLET_COLORS } from '../data/flashcards'
import { useDecks } from '../hooks/useDecks'
import HeaderShell from '../components/HeaderShell'
import StatCard from '../components/StatCard'

/* ════════════════════════════════════════════════
   PAGE: FLASHCARD VIEW — pure UI, no state/logic
   ════════════════════════════════════════════════ */
export default function FlashcardView({ onNavigate }) {
  const {
    /* Data */
    decks, activeDeck, totalDecks, totalCards, studiedCards, avgScore,
    isStudying, studyResult,

    /* UI toggles */
    showNewDeckForm, editingDeckId, editingCardId, confirmDelete,

    /* Form state */
    newDeck, setNewDeck,
    editDeck, setEditDeck,
    newCard, setNewCard,
    editCard, setEditCard,
    errors,

    /* Actions — UI */
    setShowNewDeckForm, setActiveDeckId, setErrors,

    /* Actions — Deck CRUD */
    createDeck, saveEditDeck, openEditDeck, requestDeleteDeck, confirmDeleteAction,

    /* Actions — Card CRUD */
    addCardToDeck, openEditCard, saveEditCard, requestDeleteCard,

    /* Actions — Study */
    startStudy, handleStudyComplete, handleStudyAgain,
    handleBackToDeck, handleBackToDashboard,
  } = useDecks()

  /* ════════════════════════════════════════════════
     RENDER HELPERS
     ════════════════════════════════════════════════ */
  function renderError(key) {
    return errors[key] ? (
      <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
    ) : null
  }

  /* ─── Confirm Delete Modal ─── */
  function renderConfirmModal() {
    if (!confirmDelete) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Delete {confirmDelete.type === 'deck' ? 'Deck' : 'Card'}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete &ldquo;<span className="font-medium text-gray-700 dark:text-gray-200">{confirmDelete.title}</span>&rdquo;? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setConfirmDelete(null)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteAction}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ════════════════════════════════════════════════
     RENDER: DASHBOARD
     ════════════════════════════════════════════════ */
  if (!activeDeck) {
    return (
      <div className="min-h-screen flex">
        <Sidebar currentView="flashcard" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <HeaderShell title="Flashcards" />

          <main className="flex-1 bg-brand-warm dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header row */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-poppins">Flashcards</h1>
                <button
                  onClick={() => {
                    setShowNewDeckForm((v) => !v)
                    setErrors({})
                  }}
                  className="bg-brand-purple text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition cursor-pointer"
                >
                  + New Deck
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Decks" value={totalDecks} />
                <StatCard label="Total Cards" value={totalCards} />
                <StatCard label="Cards Studied" value={studiedCards} />
                <StatCard label="Average Score" value={`${avgScore}%`} />
              </div>

              {/* New Deck Form */}
              {showNewDeckForm && (
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-8 max-w-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Create New Deck</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Title *</label>
                      <input
                        type="text"
                        value={newDeck.title}
                        onChange={(e) => setNewDeck((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="My Awesome Deck"
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                      {renderError('deckTitle')}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                      <input
                        type="text"
                        value={newDeck.description}
                        onChange={(e) => setNewDeck((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="A deck about..."
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={newDeck.category}
                        onChange={(e) => setNewDeck((prev) => ({ ...prev, category: e.target.value }))}
                        placeholder="Web Development, Science, etc."
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={createDeck} className="bg-brand-purple text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition">Create</button>
                      <button onClick={() => { setShowNewDeckForm(false); setErrors({}) }} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Deck Form */}
              {editingDeckId && (
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-8 max-w-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Deck</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Title *</label>
                      <input
                        type="text"
                        value={editDeck.title}
                        onChange={(e) => setEditDeck((prev) => ({ ...prev, title: e.target.value }))}
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                      {renderError('editDeckTitle')}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                      <input
                        type="text"
                        value={editDeck.description}
                        onChange={(e) => setEditDeck((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={editDeck.category}
                        onChange={(e) => setEditDeck((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={saveEditDeck} className="bg-brand-purple text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition">Save</button>
                      <button onClick={() => { setEditingDeckId(null); setErrors({}) }} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {decks.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-16 flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No decks yet</h3>
                  <p className="text-gray-400 dark:text-gray-500 max-w-sm mb-6">Create your first flashcard deck to get started with studying.</p>
                  <button onClick={() => setShowNewDeckForm(true)} className="bg-brand-purple text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition">Create Your First Deck</button>
                </div>
              ) : (
                /* Deck grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {decks.map((deck) => {
                    const cardCount = deck.cards.length
                    const dueCount = Math.max(0, cardCount - 2)
                    return (
                      <TiltCard
                        key={deck.id}
                        onClick={() => setActiveDeckId(deck.id)}
                        className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 p-5 flex flex-col cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${BULLET_COLORS[deck.colorIndex] || 'bg-gray-300 dark:bg-gray-600'}`} />
                            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 truncate">{deck.title}</h3>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => openEditDeck(deck)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors" title="Edit deck">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                            </button>
                            <button onClick={() => requestDeleteDeck(deck)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-colors" title="Delete deck">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                            </button>
                          </div>
                        </div>

                        {deck.category && (
                          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{deck.category}</span>
                        )}
                        {deck.description && (
                          <p className="text-sm text-gray-400 dark:text-gray-500 mb-3 line-clamp-2">{deck.description}</p>
                        )}

                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          {cardCount} {cardCount === 1 ? 'card' : 'cards'} &middot; {dueCount} due
                        </div>

                        <hr className="border-gray-50 dark:border-gray-700 mb-4" />

                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveDeckId(deck.id) }}
                          className="w-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-brand-purple hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all mt-auto"
                        >
                          Open Deck →
                        </button>
                      </TiltCard>
                    )
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
        {renderConfirmModal()}
      </div>
    )
  }

  /* ════════════════════════════════════════════════
     RENDER: DECK DETAIL / STUDY / COMPLETE
     ════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen flex">
      <Sidebar currentView="flashcard" onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col">
        <HeaderShell title={isStudying || studyResult ? `${activeDeck.title} — Study` : activeDeck.title} />

        <main className="flex-1 bg-brand-warm dark:bg-gray-900 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* ← Back to Decks — always visible */}
            <div className="mb-6">
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                ← Back to Decks
              </button>
            </div>

            {studyResult ? (
              /* ── Study Complete ── */
              <StudyComplete
                result={studyResult}
                onStudyAgain={handleStudyAgain}
                onBackToDeck={handleBackToDeck}
                onBackToDashboard={handleBackToDashboard}
              />
            ) : isStudying ? (
              /* ── Study Mode ── */
              <FlashcardList
                cards={activeDeck.cards}
                onComplete={handleStudyComplete}
                key={activeDeck.id + '-study'}
              />
            ) : (
              /* ── Deck Detail ── */
              <div className="space-y-8">
                {/* Deck info header */}
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-poppins">{activeDeck.title}</h2>
                      {activeDeck.category && (
                        <span className="inline-block text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-gray-700 px-2.5 py-1 rounded-full">{activeDeck.category}</span>
                      )}
                      {activeDeck.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activeDeck.description}</p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        {activeDeck.cards.length} {activeDeck.cards.length === 1 ? 'card' : 'cards'}
                        {activeDeck.updatedAt && <> &middot; Last updated {new Date(activeDeck.updatedAt).toLocaleDateString()}</>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditDeck(activeDeck)} className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors" title="Edit deck">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={startStudy}
                      disabled={activeDeck.cards.length === 0}
                      className="w-full bg-brand-purple text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#5b00c2] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {activeDeck.cards.length === 0 ? 'No cards to study' : 'Start Studying →'}
                    </button>
                  </div>
                </div>

                {/* Edit Deck Form (inline in detail) */}
                {editingDeckId && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Deck</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Title *</label>
                        <input type="text" value={editDeck.title} onChange={(e) => setEditDeck((prev) => ({ ...prev, title: e.target.value }))} className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple" />
                        {renderError('editDeckTitle')}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                        <input type="text" value={editDeck.description} onChange={(e) => setEditDeck((prev) => ({ ...prev, description: e.target.value }))} className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
                        <input type="text" value={editDeck.category} onChange={(e) => setEditDeck((prev) => ({ ...prev, category: e.target.value }))} className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple" />
                      </div>
                      <div className="flex gap-3 pt-1">
                        <button onClick={saveEditDeck} className="bg-brand-purple text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#5b00c2] transition">Save</button>
                        <button onClick={() => { setEditingDeckId(null); setErrors({}) }} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add Card Form */}
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Add a Card</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newCard.question}
                        onChange={(e) => setNewCard((prev) => ({ ...prev, question: e.target.value }))}
                        placeholder="Question"
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                      {renderError('newQuestion')}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newCard.answer}
                        onChange={(e) => setNewCard((prev) => ({ ...prev, answer: e.target.value }))}
                        placeholder="Answer"
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                      />
                      {renderError('newAnswer')}
                    </div>
                    <button
                      onClick={addCardToDeck}
                      className="bg-brand-purple text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#5b00c2] transition whitespace-nowrap self-start"
                    >
                      + Add Card
                    </button>
                  </div>
                </div>

                {/* Card List */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Cards ({activeDeck.cards.length})</h3>
                  {activeDeck.cards.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
                      <div className="text-4xl mb-3">🃏</div>
                      <p className="text-gray-400 dark:text-gray-500">No cards yet. Add your first card above.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {activeDeck.cards.map((card) => (
                        <div key={card.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm p-4 flex items-center justify-between gap-4">
                          {editingCardId === card.id ? (
                            /* Edit card form */
                            <div className="flex-1 flex flex-col sm:flex-row gap-2">
                              <div className="flex-1">
                                <input type="text" value={editCard.question} onChange={(e) => setEditCard((prev) => ({ ...prev, question: e.target.value }))} className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple" />
                                {renderError('editQuestion')}
                              </div>
                              <div className="flex-1">
                                <input type="text" value={editCard.answer} onChange={(e) => setEditCard((prev) => ({ ...prev, answer: e.target.value }))} className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple" />
                                {renderError('editAnswer')}
                              </div>
                              <div className="flex gap-2">
                                <button onClick={saveEditCard} className="bg-brand-purple text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-[#5b00c2] transition">Save</button>
                                <button onClick={() => { setEditingCardId(null); setErrors({}) }} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{card.question}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{card.answer}</p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={() => openEditCard(card)} className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors" title="Edit card">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                                </button>
                                <button onClick={() => requestDeleteCard(card)} className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-colors" title="Delete card">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {renderConfirmModal()}
    </div>
  )
}
