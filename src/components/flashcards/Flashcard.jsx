import React from 'react';

const Flashcard = ({ question, answer, flipped, onFlip }) => {
  return (
    <div
      className="w-full max-w-2xl h-80 mx-auto cursor-pointer select-none"
      style={{ perspective: '1500px' }}
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 bg-white border border-gray-100 rounded-2xl shadow-md flex items-center justify-center [backface-visibility:hidden]">
          <p className="text-2xl font-normal text-gray-800 tracking-tight leading-relaxed text-center px-12">
            {question}
          </p>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 bg-white border border-gray-100 rounded-2xl shadow-md flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-2xl font-normal text-gray-800 tracking-tight leading-relaxed text-center px-12">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
