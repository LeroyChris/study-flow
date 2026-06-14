import { useState, useEffect, useCallback } from 'react'

/**
 * Cycles through an array of words with a typing/deleting animation.
 *
 * @param {string[]} words  - Array of words to cycle through
 * @param {object}   opts
 * @param {number}   [opts.typeSpeed=130]   - ms per character when typing
 * @param {number}   [opts.deleteSpeed=70]  - ms per character when deleting
 * @param {number}   [opts.pauseDelay=1800] - ms to pause after a word is fully typed
 * @returns {{ display: string, isTyping: boolean }}
 */
export function useTypewriter(words, opts = {}) {
  const { typeSpeed = 130, deleteSpeed = 70, pauseDelay = 1800 } = opts

  const [display, setDisplay] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const tick = useCallback(
    (state) => {
      const { wordIdx, display: currentDisplay, deleting } = state
      const currentWord = words[wordIdx]

      if (!deleting) {
        if (currentDisplay.length < currentWord.length) {
          const next = currentWord.slice(0, currentDisplay.length + 1)
          return { ...state, display: next }
        }
        // Word fully typed — pause, then start deleting
        return { ...state, pause: true, deleting: true }
      }

      if (currentDisplay.length > 0) {
        const next = currentDisplay.slice(0, -1)
        return { ...state, display: next }
      }

      // Fully deleted — move to next word, start typing
      const nextIdx = (wordIdx + 1) % words.length
      return { ...state, wordIdx: nextIdx, display: '', deleting: false }
    },
    [words],
  )

  useEffect(() => {
    let state = {
      wordIdx: 0,
      display: '',
      deleting: false,
      pause: false,
    }

    let rafId
    let pauseTimer

    function loop() {
      if (state.pause) {
        setIsTyping(false)
        pauseTimer = setTimeout(() => {
          state.pause = false
          setIsTyping(true)
          rafId = requestAnimationFrame(loop)
        }, pauseDelay)
        return
      }

      setIsTyping(true)
      state = tick(state)
      setDisplay(state.display)

      const delay = state.deleting ? deleteSpeed : typeSpeed
      rafId = setTimeout(loop, delay)
    }

    rafId = setTimeout(loop, typeSpeed)

    return () => {
      clearTimeout(rafId)
      clearTimeout(pauseTimer)
    }
  }, [tick, typeSpeed, deleteSpeed, pauseDelay])

  return { display, isTyping }
}
