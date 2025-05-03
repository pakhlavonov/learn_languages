import React, { useState } from 'react';

const quizData = [
  {
    id: 1,
    question: "What is the capital of Uzbekistan?",
    options: ["Tashkent", "Samarkand", "Bukhara", "Andijan"],
    correctAnswer: "Tashkent"
  },
  {
    id: 2,
    question: "Which river flows through Uzbekistan?",
    options: ["Amu Darya", "Syr Darya", "Both A and B", "None of the above"],
    correctAnswer: "Both A and B"
  },
  {
    id: 3,
    question: "What is the official language of Uzbekistan?",
    options: ["Russian", "Uzbek", "Tajik", "Kazakh"],
    correctAnswer: "Uzbek"
  },
  {
    id: 4,
    question: "Which famous Silk Road city is in Uzbekistan?",
    options: ["Bishkek", "Samarkand", "Dushanbe", "Almaty"],
    correctAnswer: "Samarkand"
  },
  {
    id: 5,
    question: "What is the currency of Uzbekistan?",
    options: ["Som", "Tenge", "Manat", "Dinar"],
    correctAnswer: "Som"
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerClick = (answer) => {
    if (answered) return; // Prevent multiple answers

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowScore(false);
    setAnswered(false);
  };

  if (showScore) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quiz Completed!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Your score: {score} out of {quizData.length}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {quizData[currentQuestion].question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  answered
                    ? option === quizData[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : option === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-gray-50 border-gray-200 text-gray-500'
                    : 'bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {answered && (
              <p className="text-indigo-600">
                {selectedAnswer === quizData[currentQuestion].correctAnswer
                  ? "Correct! 🎉"
                  : `Incorrect. The correct answer is: ${quizData[currentQuestion].correctAnswer}`}
              </p>
            )}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={!answered}
            className={`px-6 py-2 rounded-lg shadow transition-colors ${
              answered
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 