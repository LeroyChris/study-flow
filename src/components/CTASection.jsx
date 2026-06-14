export default function CTASection({ onNavigate }) {
  return (
    <section>
      <div>
        <h3 className="text-[30px] font-[family-name:var(--font-family-poppins)] font-bold text-center">
          Ready to boost your productivity?
        </h3>
        <p className="text-sm font-medium text-center">
          Join thousands of students who are transforming their study habits with
          StudyFlow.
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => onNavigate?.('flashcard')}
            className="bg-brand-teal hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md shadow-brand-dark/10 transition-colors duration-300 cursor-pointer"
          >
            Get Started →
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brand-teal hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md shadow-brand-dark/10 transition-colors duration-300 cursor-pointer ml-4"
          >
            See Features
          </button>
        </div>
      </div>
    </section>
  )
}
