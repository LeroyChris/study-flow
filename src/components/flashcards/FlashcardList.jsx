import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';

const STORAGE_KEY = 'flashcard-progress';

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return null;
}

const FlashcardList = ({ cards = [], onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [answered, setAnswered] = useState(new Set());
  const [score, setScore] = useState(() => {
    const progress = loadProgress();
    return progress ? progress.score : { correct: 0, total: 0 };
  });

  // Reset session when cards change
  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
    setKnownCount(0);
    setUnknownCount(0);
    setAnswered(new Set());
  }, [cards]);

  // Reset flip on nav
  useEffect(() => {
    setFlipped(false);
  }, [currentIndex]);

  // Persist score
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ score }));
  }, [score]);

  const goToCard = (index) => {
    if (index >= 0 && index < cards.length) {
      setCurrentIndex(index);
    }
  };

  const handleFeedback = (feedback) => {
    if (answered.has(currentIndex)) return; // already answered this card

    const newAnswered = new Set(answered);
    newAnswered.add(currentIndex);
    setAnswered(newAnswered);

    if (feedback === 'correct') {
      setKnownCount((prev) => prev + 1);
      setScore((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
      }));
    } else {
      setUnknownCount((prev) => prev + 1);
      setScore((prev) => ({
        correct: prev.correct,
        total: prev.total + 1,
      }));
    }

    // Auto-advance or complete
    if (newAnswered.size >= cards.length) {
      // All cards answered — completion
      if (onComplete) {
        setTimeout(() => {
          onComplete({
            total: cards.length,
            known: feedback === 'correct' ? knownCount + 1 : knownCount,
            unknown: feedback === 'review' ? unknownCount + 1 : unknownCount,
          });
        }, 400);
      }
    } else {
      // Find next unanswered card
      let next = currentIndex;
      let attempts = 0;
      while (attempts < cards.length) {
        next = (next + 1) % cards.length;
        if (!newAnswered.has(next)) {
          goToCard(next);
          return;
        }
        attempts++;
      }
    }
  };

  // Edge case: no cards
  if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-16 space-y-4">
        <div className="text-5xl">🃏</div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">No cards in this deck</h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
          Add some flashcards to start studying.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-8">
      {/* Progress */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-2">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>
            {knownCount + unknownCount > 0 && (
              <>Known: {knownCount} &middot; Unknown: {unknownCount}</>
            )}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-full transition-all duration-300"
            style={{ width: `${((answered.size) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <Flashcard
        question={cards[currentIndex].question}
        answer={cards[currentIndex].answer}
        flipped={flipped}
        onFlip={() => setFlipped((prev) => !prev)}
      />

      {/* Self-assessment — only visible when flipped and not yet answered */}
      {flipped && !answered.has(currentIndex) && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFeedback('correct');
            }}
            className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-200/60 dark:border-emerald-800/50 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
          >
            Easy / Got it Right
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFeedback('review');
            }}
            className="bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/30 border border-rose-200/60 dark:border-rose-800/50 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
          >
            Hard / Review Again
          </button>
        </div>
      )}

      {/* Already answered indicator */}
      {flipped && answered.has(currentIndex) && (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic">Card already answered — navigating...</p>
      )}

      {/* Navigation */}
      {cards.length > 1 && (
        <div className="flex items-center gap-6">
          <button
            onClick={() => goToCard(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed px-5 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => goToCard(currentIndex + 1)}
            disabled={currentIndex >= cards.length - 1}
            className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed px-5 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {/* Overall score */}
      <div className="text-xs font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
        {score.total > 0 && <>Session score: {Math.round((knownCount / Math.max(1, knownCount + unknownCount)) * 100)}% correct</>}
      </div>
    </div>
  );
};

export default FlashcardList;
