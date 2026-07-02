import { useTypewriter } from '../hooks/useTypewriter'
import HeroCards from './HeroCards'
import { useTilt } from '../hooks/useTilt'

const WORDS = ['focus', 'learn', 'grow', 'achieve']


export default function HeroSection({ onNavigate }) {
  const { display } = useTypewriter(WORDS)
  const { rotation, handleMouseMove, reset,} = useTilt(60)

  return (
    <section className="min-h-screen px-8 dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_600px] gap-12 items-center min-h-screen">

        {/* LEFT */}
        <div>
          <h3 className="font-poppins text-left text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-none text-gray-800 dark:text-gray-100">
            Study with more
            <br />
            <span className="text-brand-teal dark:text-teal-300">focus</span>,
            live a more
            <br />
            <span className="text-amber-500 dark:text-amber-400">
              organized life.
            </span>
          </h3>

          <h1 className="mt-12 font-bold text-[clamp(2rem,4vw,4rem)] leading-[1.1] text-slate-900 dark:text-white">
            Your Space to{' '}
            <span className="text-brand-primary">
              {display}
            </span>

            <span className="inline-block w-[3px] h-[1em] bg-brand-primary ml-1 animate-pulse align-middle" />
          </h1>

          <p className="text-lg text-left font-medium pt-8 pb-10 text-slate-700 dark:text-gray-300">
            StudyFlow combines task management,
            focus timers, and flashcards into
            one elegant workspace — built for
            the modern university student.
          </p>

          <div className="flex gap-4">
            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={reset}
              style={{
                transform: `
                  perspective(1000px)
                  rotateY(${rotation.x}deg)
                  rotateX(${-rotation.y}deg)
                `
              }}
              onClick={() => onNavigate?.('flashcard')}
              className="bg-white dark:bg-gray-800 hover:bg-brand-primary text-black dark:text-white hover:text-white transition-transform duration-100 will-change-transform font-semibold px-6 py-3 rounded-lg shadow-lg shadow-brand-primary/30 transition-all duration-300 hover:-translate-y-2"
            >
              Enter App →
            </button>

            <button
              onClick={() =>
                document
                  .getElementById('features')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  })
              }
              className="border-2 border-slate-300 dark:border-gray-600 hover:border-brand-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-gray-700 dark:text-gray-300"
            >
              See Features
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex justify-end scale-75 origin-right">
          <HeroCards />
        </div>

      </div>
    </section>
  )
}