import { SEED_DECKS } from '../data/flashcards';

const STORAGE_KEY_DECKS = 'flashcard-decks';

export function loadDecks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_DECKS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // corrupted data — reset to seed
  }
  localStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(SEED_DECKS));
  return SEED_DECKS;
}

export function saveDecks(decks) {
  localStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(decks));
}

export function nowISO() {
  return new Date().toISOString();
}

let cardIdCounter = Date.now();
export function nextCardId() {
  return `card-${++cardIdCounter}`;
}