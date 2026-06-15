import clockIcon from '../assets/icons/clock.svg'
import pomodoroIcon from '../assets/icons/Pomodoro.svg'
import flashcardIcon from '../assets/icons/flashcard.svg'

const FEATURES = [
  {
    icon: clockIcon,
    title: 'Time Management',
    description:
      'Smart task lists, calendar views, and reminders to keep you on track every day.',
  },
  {
    icon: pomodoroIcon,
    title: 'Pomodoro Timer',
    description:
      'Boost focus with timed work sessions, ambient audio, and weekly progress charts.',
  },
  {
    icon: flashcardIcon,
    title: 'Flashcards Systems',
    description:
      'Create decks, study with spaced repetition, and track your mastery over time.',
  },
]

function FeatureCard({ icon, title, description, onNavigate }) {
  const viewMap = {
    'Time Management': 'calendar',
    'Pomodoro Timer': 'pomodoro',
    'Flashcards Systems': 'flashcard',
  }
  return (
    <div
      onClick={() => onNavigate?.(viewMap[title] || 'landing')}
      className="max-w-xs bg-white order-2 border-black-400 rounded-2xl p-8 opacity-100 transform transition-all duration-300 hover:opacity-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/35 group cursor-pointer relative overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-full after:bg-blue-500 after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100">
      <img src={icon} className="w-8 h-8 ms-3 mb-4" alt={`Icon ${title}`} />
      <h4 className="text-xl font-[family-name:var(--font-family-poppins)] font-bold">
        {title}
      </h4>
      <p>{description}</p>
    </div>
  )
}

export default function FeaturesSection({ onNavigate }) {
  return (
    <>
      <section id="features">
        <div className="flex-col bg-mist-100 mt-50 py-20 text-center">
          <h3 className="text-[30px] font-[family-name:var(--font-family-poppins)] font-bold">
            Everything You need to excel
          </h3>
          <p className="text-sm font-medium">
            Four powerful tools designed to work together seamlessly in your
            academic journey.
          </p>
        </div>
      </section>
      <section className="flex bg-mist-100 py-5 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-5 max-w-full mx-auto px-5 justify-items-center">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} onNavigate={onNavigate} />
        ))}
      </section>
    </>
  )
}
