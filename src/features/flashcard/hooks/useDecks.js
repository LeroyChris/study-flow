import { useState, useEffect, useId } from 'react'
import { BULLET_COLORS } from '../data/flashcards'
import { loadDecks, saveDecks, nowISO, nextCardId } from '../lib/flashcardStorage'

export function useDecks() {
  /* ─── Core data ─── */
  const [decks, setDecks] = useState(loadDecks)
  const [activeDeckId, setActiveDeckId] = useState(null)
  const [isStudying, setIsStudying] = useState(false)
  const [studyResult, setStudyResult] = useState(null)

  /* ─── UI toggles ─── */
  const [showNewDeckForm, setShowNewDeckForm] = useState(false)
  const [editingDeckId, setEditingDeckId] = useState(null)
  const [editingCardId, setEditingCardId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null) // { type: 'deck'|'card', id, title }

  /* ─── Form state (consolidated into objects — fewer useState calls) ─── */
  const initialForm = { title: '', description: '', category: '' }
  const initialCardForm = { question: '', answer: '' }

  const [newDeck, setNewDeck] = useState({ ...initialForm })
  const [editDeck, setEditDeck] = useState({ ...initialForm })
  const [newCard, setNewCard] = useState({ ...initialCardForm })
  const [editCard, setEditCard] = useState({ ...initialCardForm })

  /* ─── Validation ─── */
  const [errors, setErrors] = useState({})

  const idRef = useId()

  /* ─── Persist decks ─── */
  useEffect(() => { saveDecks(decks) }, [decks])

  /* ─── Derived state (computed from decks, not stored separately) ─── */
  const activeDeck = activeDeckId
    ? decks.find((d) => d.id === activeDeckId) || null
    : null

  const totalDecks = decks.length
  const totalCards = decks.reduce((sum, d) => sum + d.cards.length, 0)

  const { studiedCards, avgScore } = (() => {
    try {
      const progress = JSON.parse(localStorage.getItem('flashcard-progress') || '{}')
      if (progress.score) {
        const total = progress.score.total || 0
        const avg = total > 0 ? Math.round((progress.score.correct / total) * 100) : 0
        return { studiedCards: total, avgScore: avg }
      }
    } catch { /* ignore */ }
    return { studiedCards: 0, avgScore: 0 }
  })()

  /* ════════════════════════════════════════════════
     DECK CRUD
     ════════════════════════════════════════════════ */
  const createDeck = () => {
    const errs = {}
    if (!newDeck.title.trim()) errs.deckTitle = 'Deck title is required.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})

    const deck = {
      id: `${idRef}-${Date.now()}`,
      title: newDeck.title.trim(),
      description: newDeck.description.trim(),
      category: newDeck.category.trim(),
      colorIndex: decks.length % BULLET_COLORS.length,
      createdAt: nowISO(),
      updatedAt: nowISO(),
      cards: [
        { id: nextCardId(), question: 'New question?', answer: 'New answer.' },
      ],
    }
    setDecks((prev) => [...prev, deck])
    setNewDeck({ ...initialForm })
    setShowNewDeckForm(false)
  }

  const saveEditDeck = () => {
    const errs = {}
    if (!editDeck.title.trim()) errs.editDeckTitle = 'Deck title is required.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})

    setDecks((prev) =>
      prev.map((d) =>
        d.id === editingDeckId
          ? { ...d, title: editDeck.title.trim(), description: editDeck.description.trim(), category: editDeck.category.trim(), updatedAt: nowISO() }
          : d
      )
    )
    setEditingDeckId(null)
    setEditDeck({ ...initialForm })
  }

  const openEditDeck = (deck) => {
    setEditingDeckId(deck.id)
    setEditDeck({
      title: deck.title,
      description: deck.description || '',
      category: deck.category || '',
    })
  }

  const requestDeleteDeck = (deck) => {
    setConfirmDelete({ type: 'deck', id: deck.id, title: deck.title })
  }

  const confirmDeleteAction = () => {
    if (!confirmDelete) return
    if (confirmDelete.type === 'deck') {
      setDecks((prev) => prev.filter((d) => d.id !== confirmDelete.id))
      if (activeDeckId === confirmDelete.id) {
        setActiveDeckId(null)
        setIsStudying(false)
        setStudyResult(null)
      }
    } else if (confirmDelete.type === 'card') {
      setDecks((prev) =>
        prev.map((d) => ({
          ...d,
          cards: d.cards.filter((c) => c.id !== confirmDelete.id),
          updatedAt: nowISO(),
        }))
      )
    }
    setConfirmDelete(null)
  }

  /* ════════════════════════════════════════════════
     CARD CRUD
     ════════════════════════════════════════════════ */
  const addCardToDeck = () => {
    const errs = {}
    if (!newCard.question.trim()) errs.newQuestion = 'Question is required.'
    if (!newCard.answer.trim()) errs.newAnswer = 'Answer is required.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})

    setDecks((prev) =>
      prev.map((d) => {
        if (d.id !== activeDeckId) return d
        return {
          ...d,
          cards: [...d.cards, { id: nextCardId(), question: newCard.question.trim(), answer: newCard.answer.trim() }],
          updatedAt: nowISO(),
        }
      })
    )
    setNewCard({ ...initialCardForm })
  }

  const openEditCard = (card) => {
    setEditingCardId(card.id)
    setEditCard({ question: card.question, answer: card.answer })
  }

  const saveEditCard = () => {
    const errs = {}
    if (!editCard.question.trim()) errs.editQuestion = 'Question is required.'
    if (!editCard.answer.trim()) errs.editAnswer = 'Answer is required.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})

    setDecks((prev) =>
      prev.map((d) => {
        if (d.id !== activeDeckId) return d
        return {
          ...d,
          cards: d.cards.map((c) =>
            c.id === editingCardId
              ? { ...c, question: editCard.question.trim(), answer: editCard.answer.trim() }
              : c
          ),
          updatedAt: nowISO(),
        }
      })
    )
    setEditingCardId(null)
    setEditCard({ ...initialCardForm })
  }

  const requestDeleteCard = (card) => {
    setConfirmDelete({ type: 'card', id: card.id, title: card.question })
  }

  /* ════════════════════════════════════════════════
     STUDY MODE HANDLERS
     ════════════════════════════════════════════════ */
  const startStudy = () => {
    setIsStudying(true)
    setStudyResult(null)
  }

  const handleStudyComplete = (result) => {
    setStudyResult(result)
    setIsStudying(false)
  }

  const handleStudyAgain = () => {
    setIsStudying(true)
    setStudyResult(null)
  }

  const handleBackToDeck = () => {
    setIsStudying(false)
    setStudyResult(null)
  }

  const handleBackToDashboard = () => {
    setActiveDeckId(null)
    setIsStudying(false)
    setStudyResult(null)
  }

  /* ════════════════════════════════════════════════
     EXPORT
     ════════════════════════════════════════════════ */
  return {
    // Data
    decks, activeDeck, totalDecks, totalCards, studiedCards, avgScore,
    isStudying, studyResult,

    // UI state
    showNewDeckForm, editingDeckId, editingCardId, confirmDelete,

    // Form state
    newDeck, setNewDeck,
    editDeck, setEditDeck,
    newCard, setNewCard,
    editCard, setEditCard,
    errors,

    // Actions — UI toggles
    setShowNewDeckForm, setActiveDeckId, setErrors,

    // Actions — Deck CRUD
    createDeck, saveEditDeck, openEditDeck, requestDeleteDeck, confirmDeleteAction,

    // Actions — Card CRUD
    addCardToDeck, openEditCard, saveEditCard, requestDeleteCard,

    // Actions — Study
    startStudy, handleStudyComplete, handleStudyAgain,
    handleBackToDeck, handleBackToDashboard,
  }
}
