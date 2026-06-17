import { useState } from 'react'

export function useTilt(multiplier = 12) {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (e) => {
    const rect =
      e.currentTarget.getBoundingClientRect()

    const x =
      (e.clientX - rect.left) / rect.width -
      0.5

    const y =
      (e.clientY - rect.top) / rect.height -
      0.5

    setRotation({
      x: x * multiplier,
      y: y * multiplier,
    })
  }

  const reset = () => {
    setRotation({
      x: 0,
      y: 0,
    })
  }

  return {
    rotation,
    handleMouseMove,
    reset,
  }
}