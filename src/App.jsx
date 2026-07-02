import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import StatsSection from './components/StatsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import FlashcardView from './features/flashcard/page'
import PomodoroView from './features/pomodoro/page'
import CalendarView from './features/calendar/page'
import TaskView from './views/TaskView'
import { Marquee } from './components/Marquee'
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