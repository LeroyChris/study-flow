
import { useState } from 'react'

export default function HeroCards() {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setRotation({
      x: x * 12,
      y: y * 12,
    })
  }

  const handleMouseLeave = () => {
    setRotation({
      x: 0,
      y: 0,
    })
  }

  return (
    <div
      className="relative h-[550px] w-full max-w-[600px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: `
            rotateY(${rotation.x}deg)
            rotateX(${-rotation.y}deg)
          `,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Pomodoro Card */}
        <div
          className="
            absolute
            left-8
            top-12
            w-[300px]
            rounded-[40px]
            bg-white
            p-8
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            transition-all
            duration-300
            hover:-translate-y-2
          "
          style={{
            transform: 'translateZ(60px)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-bold tracking-wide">
              FOKUS
            </span>

            <div className="h-4 w-4 rounded-full bg-amber-400"></div>
          </div>

          <h2 className="mt-4 text-7xl font-black text-slate-900">
            24:18
          </h2>

          <div className="mt-2 h-3 rounded-full bg-stone-200">
            <div className="h-full w-[60%] rounded-full bg-teal-600"></div>
          </div>

          <p className="mt-5 text-gray-500">
            🎵 Rainy Café — lo-fi
          </p>
        </div>

        {/* Flashcard */}
        <div
          className="
            absolute
            right-6
            top-10
            w-[280px]
            rounded-[42px]
            bg-teal-700
            p-8
            text-white
            shadow-[0_20px_60px_rgba(13,148,136,0.35)]
            transition-all
            duration-300
            hover:-translate-y-2
          "
          style={{
            transform:
              'translateZ(140px) rotate(10deg)',
          }}
        >
          <p className="font-bold uppercase tracking-wider opacity-80">
            Flash Card
          </p>

          <h3 className="mt-6 text-4xl font-bold leading-tight">
            Apa itu spaced repetition?
          </h3>

          <div className="mt-8">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              Tap untuk flip
            </span>
          </div>
        </div>

        {/* Task Card */}
        <div
          className="
            absolute
            left-5
            bottom-8
            w-[300px]
            rounded-[36px]
            bg-white
            p-8
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            transition-all
            duration-300
            hover:-translate-y-2
          "
          style={{
            transform: 'translateZ(100px)',
          }}
        >
          <h4 className="font-bold text-gray-500">
            HARI INI
          </h4>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-white">
                ✓
              </div>

              <span className="text-gray-500 line-through">
                Baca Bab 3
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full border-2 border-gray-300"></div>

              <span className="text-lg text-slate-700">
                Latihan soal
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full border-2 border-gray-300"></div>

              <span className="text-lg text-slate-700">
                Review flash card
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
