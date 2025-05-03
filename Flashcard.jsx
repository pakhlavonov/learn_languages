import React, { useState } from 'react';

const flashcards = [
  {
    id: 1,
    english: "Hello",
    uzbek: "Salom",
    category: "Greetings"
  },
  {
    id: 2,
    english: "Goodbye",
    uzbek: "Xayr",
    category: "Greetings"
  },
  {
    id: 3,
    english: "Thank you",
    uzbek: "Rahmat",
    category: "Greetings"
  },
  {
    id: 4,
    english: "Please",
    uzbek: "Iltimos",
    category: "Greetings"
  },
  {
    id: 5,
    english: "Yes",
    uzbek: "Ha",
    category: "Common"
  }
];

const Flashcard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            English-Uzbek Flashcards
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Click the card to flip and see the translation
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Card {currentIndex + 1} of {flashcards.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {flashcards[currentIndex].category}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="relative h-64 perspective-1000">
          <div
            className={`w-full h-full transition-transform duration-300 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className={`absolute w-full h-full backface-hidden ${
              isFlipped ? 'hidden' : 'block'
            }`}>
              <div className="w-full h-full bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-gray-900">
                  {flashcards[currentIndex].english}
                </h2>
              </div>
            </div>

            {/* Back of card */}
            <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${
              isFlipped ? 'block' : 'hidden'
            }`}>
              <div className="w-full h-full bg-indigo-600 rounded-xl shadow-lg p-8 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">
                  {flashcards[currentIndex].uzbek}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handlePrevious}
            className="px-6 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors border border-gray-300"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Click the card to flip • Use arrow buttons to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard; 