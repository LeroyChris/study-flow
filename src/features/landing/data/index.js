import clockIcon from '../../../assets/icons/clock.svg'
import pomodoroIcon from '../../../assets/icons/Pomodoro.svg'
import flashcardIcon from '../../../assets/icons/flashcard.svg'
import taskIcon from '../../../assets/icons/list-todo.svg'

export const FEATURES = [
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
  {
    icon: taskIcon,
    title: 'To Do List',
    description:
      'Helping you prioritize tasks—from the most important ones to those you can take it easy on',
  },
]

export const STATS = [
  { target: 10, label: 'Students Trusted', suffix: 'K+' },
  { target: 500, label: 'Task Completed', suffix: 'M+' },
  { target: 2000, label: 'Study Minutes', suffix: 'K+' },
]

export const WORDS = ['focus', 'learn', 'grow', 'achieve']
