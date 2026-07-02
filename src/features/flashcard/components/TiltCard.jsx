// components/TiltCard.jsx

import { useTilt } from '../../../hooks/useTilt'

export default function TiltCard({
  children,
  className = '',
  onClick,
}) {
  const {
    rotation,
    handleMouseMove,
    reset,
  } = useTilt(40)

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{
        transform: `
          perspective(1000px)
          rotateY(${rotation.x}deg)
          rotateX(${-rotation.y}deg)
        `,
      }}
      className={`
        transition-transform
        duration-150
        will-change-transform
        ${className}
      `}
    >
      {children}
    </div>
  )
}