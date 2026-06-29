export const DEFAULT_TIMERS = [
  {
    label: 'Focus',
    value: 'focus',
    minutes: 25,
    colors: {
      primary: 'bg-blue-600',
      hover: 'hover:bg-blue-700', 
      text: 'text-blue-600',
      stroke: '#2563eb',
      bgLight: 'bg-blue-50',
      border: 'border-blue-400',
      shadow: 'shadow-blue-200',
    }
  },
  {
    label: 'Short Break',
    value: 'short',
    minutes: 5,
    colors: {
      primary: 'bg-[#00bfa5]',
      hover: 'hover:bg-[#00a68f]', 
      text: 'text-[#00bfa5]',
      stroke: '#00bfa5',
      bgLight: 'bg-[#00bfa5]/10',
      border: 'border-[#00bfa5]/40',
      shadow: 'shadow-[#00bfa5]/20',
    }
  },
  {
    label: 'Long Break',
    value: 'long',
    minutes: 15,
    colors: {
      primary: 'bg-[#9333ea]',
      hover: 'hover:bg-[#7c3aed]', 
      text: 'text-[#9333ea]',
      stroke: '#9333ea',
      bgLight: 'bg-[#9333ea]/10',
      border: 'border-[#9333ea]/40',
      shadow: 'shadow-[#9333ea]/20',
    }
  }
]