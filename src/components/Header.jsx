import logoSrc from '../assets/Logo_Selasar.png'

export default function Header({ onNavigate }) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/20 border-b border-white/10 px-8 py-4 flex justify-between items-center">
      <button onClick={() => onNavigate?.('landing')}>
        <img className="rounded-xl" src={logoSrc} alt="selasar" width={50} />
      </button>
      <nav className="flex space-x-4 font-[family-name:var(--font-family-poppins)] font-semibold">
        <button onClick={() => onNavigate?.('landing')} className="hover:text-brand-blue transition-colors">Home</button>
        <button onClick={() => onNavigate?.('landing')} className="hover:text-brand-blue transition-colors">About us</button>
        <button onClick={() => onNavigate?.('landing')} className="hover:text-brand-blue transition-colors">Contact</button>
      </nav>
    </header>
  )
}
