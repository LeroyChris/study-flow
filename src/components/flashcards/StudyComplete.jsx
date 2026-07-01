import React from 'react';

const StudyComplete = ({ result, onStudyAgain, onBackToDeck, onBackToDashboard }) => {
  const total = result.total || 0;
  const known = result.known || 0;
  const unknown = result.unknown || 0;
  const percentage = total > 0 ? Math.round((known / total) * 100) : 0;

  const getGradeEmoji = () => {
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '💪';
    return '📖';
  };

  const getGradeText = () => {
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 60) return 'Good job!';
    if (percentage >= 40) return 'Keep practicing!';
    return 'Review recommended!';
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-12 space-y-8">
      {/* Emoji header */}
      <div className="text-6xl">{getGradeEmoji()}</div>

      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-poppins">Study Complete</h2>
        <p className="text-gray-500 dark:text-gray-400">{getGradeText()}</p>
      </div>

      {/* Stats card */}
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total}</p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">
              Total
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{known}</p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">
              Known
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{unknown}</p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">
              Unknown
            </p>
          </div>
        </div>

        {/* Progress ring area */}
        <div className="mt-6 pt-6 border-t border-gray-50 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Accuracy</span>
            <span className="text-gray-800 dark:text-gray-100 font-bold">{percentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${percentage}%`,
                backgroundColor:
                  percentage >= 60 ? '#6d00e7' : percentage >= 30 ? '#f59e0b' : '#9ca3af',
              }}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStudyAgain}
          className="flex-1 bg-brand-purple text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#5b00c2] transition-all"
        >
          Study Again
        </button>
        <button
          onClick={onBackToDeck}
          className="flex-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-5 py-3 rounded-xl text-sm font-medium transition-all"
        >
          Back to Deck
        </button>
      </div>
      <button
        onClick={onBackToDashboard}
        className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default StudyComplete;
