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
            className="bg-white hover:bg-[#2563EB] text-gray hover:text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-[#2563EB]/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            Get Started → For Free
          </button>
        </div>
      </div>
    </section>
  )
}
