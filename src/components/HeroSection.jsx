import { useTypewriter } from '../hooks/useTypewriter'

const WORDS = ['focus', 'learn', 'grow', 'achieve']

export default function HeroSection({ onNavigate }) {
  const { display } = useTypewriter(WORDS)

  return (
    <section className="mx-auto justify-items-center text-center mt-80 max-w-4xl px-5">
      <h1 className="font-[family-name:var(--font-family-poppins)] font-bold text-[clamp(3.5rem,8vw,9.5rem)] leading-[1.1] mb-6 text-slate-900">
        Your Space to{' '}
        <span id="typewriter-text" className="text-blue-600">
          {display}
        </span>
        <span className="inline-block w-[3px] h-[1em] bg-blue-600 ml-1 animate-pulse align-middle" />
      </h1>
      <p className="text-sm font-medium pt-7 pb-8">
        StudyFlow combines task management, focus timers, and
        <br />
        flashcards into one elegant workspace — built for the
        <br />
        modern university student.
      </p>
      <button
        onClick={() => onNavigate?.('flashcard')}
        className="bg-white hover:bg-[#2563EB] text-gray hover:text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-[#2563EB]/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      >
        Enter App →
      </button>
      <button
        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        className="hover:border-2 hover:border-blue-400 text-black bg-transparent border-2 border-slate-400 font-semibold px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer ml-4"
      >
        See Features
      </button>
    </section>
  )
}
