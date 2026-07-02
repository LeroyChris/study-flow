import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './features/landing/components/HeroSection'
import FeaturesSection from './features/landing/components/FeaturesSection'
import StatsSection from './features/landing/components/StatsSection'
import CTASection from './features/landing/components/CTASection'
import FlashcardView from './features/flashcard/page'
import PomodoroView from './features/pomodoro/page'
import CalendarView from './features/calendar/page'
import TaskView from './features/task/page'
import { Marquee } from './features/landing/components/Marquee'
import { DarkModeProvider } from './hooks/useDarkMode'

function App() {
  const [view, setView] = useState('landing')

  const content = (() => {
    if (view === 'flashcard') return <FlashcardView onNavigate={setView} />
    if (view === 'pomodoro') return <PomodoroView onNavigate={setView} />
    if (view === 'calendar') return <CalendarView onNavigate={setView} />
    if (view === 'task') return <TaskView onNavigate={setView} />
    return (
      <>
        <Header onNavigate={setView} />
        <main className="bg-brand-warm dark:bg-gray-900">
          <HeroSection onNavigate={setView} />
          <Marquee />
          <FeaturesSection onNavigate={setView} />
          <StatsSection />
          <CTASection onNavigate={setView} />
        </main>
        <Footer />
      </>
    )
  })()

  return <DarkModeProvider>{content}</DarkModeProvider>
}

export default App