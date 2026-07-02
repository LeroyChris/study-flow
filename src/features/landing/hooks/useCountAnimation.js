import { useEffect, useState } from 'react'

/**
 * Animates a counter from 0 to `target` over `duration` ms.
 * Automatically formats: >= 1000 displays as "M+" (thousands → millions).
 *
 * @param {number} target        - Final count value
 * @param {number} [duration=2500]
 * @returns {{ value: string, suffix: string }}  e.g. { value: "2.0", suffix: "M+" }
 */
export function useCountAnimation(target, duration = 2500) {
  const [value, setValue] = useState('0')
  const [suffix, setSuffix] = useState('K+')

  useEffect(() => {
    let rafId
    let startTime = null

    function update(currentTime) {
      if (startTime === null) startTime = currentTime

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentVal = Math.floor(progress * target)

      if (currentVal >= 1000) {
        const millions = currentVal / 1000
        setValue(millions % 1 === 0 ? String(millions) : millions.toFixed(1))
        setSuffix('M+')
      } else {
        setValue(String(currentVal))
        setSuffix('K+')
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(update)
      } else {
        // Ensure final value is exact
        if (target >= 1000) {
          const finalM = target / 1000
          setValue(finalM % 1 === 0 ? String(finalM) : finalM.toFixed(1))
          setSuffix('M+')
        } else {
          setValue(String(target))
          setSuffix('K+')
        }
      }
    }

    rafId = requestAnimationFrame(update)

    return () => cancelAnimationFrame(rafId)
  }, [target, duration])

  return { value, suffix }
}
