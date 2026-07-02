export default function CTASection({ onNavigate }) {
  return (
    <section className="bg-brand-warm dark:bg-gray-900 pb-12">
      <div>
        <h3 className="text-[30px] font-[family-name:var(--font-family-poppins)] font-bold text-center text-gray-800 dark:text-gray-100">
          Ready to boost your productivity?
        </h3>
        <p className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          Join thousands of students who are transforming their study habits with
          StudyFlow.
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => onNavigate?.('flashcard')}
            className="bg-white dark:bg-gray-800 hover:bg-brand-primary text-gray-700 dark:text-gray-200 hover:text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-brand-primary/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            Get Started → For Free
          </button>
        </div>
      </div>
    </section>
  )
}
