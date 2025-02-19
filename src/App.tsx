import React, { useState, useEffect } from 'react';
import { Brain, Trophy } from 'lucide-react';
import { questions } from './data/questions';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizTimer } from './components/QuizTimer';
import { QuizHistory } from './components/QuizHistory';
import { saveQuizAttempt, getQuizAttempts, type QuizAttempt } from './lib/db';

const SECONDS_PER_QUESTION = 30;

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    loadAttempts();
  }, []);

  const loadAttempts = async () => {
    const loadedAttempts = await getQuizAttempts();
    setAttempts(loadedAttempts);
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    const timeSpent = (Date.now() - startTime) / 1000;
    setTimePerQuestion([...timePerQuestion, timeSpent]);

    if (index === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setStartTime(Date.now());
      } else {
        setQuizComplete(true);
        saveAttempt();
      }
    }, 1500);
  };

  const handleTimeUp = () => {
    if (!showFeedback) {
      handleAnswerSelect(-1);
    }
  };

  const saveAttempt = async () => {
    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      score,
      totalQuestions: questions.length,
      timePerQuestion,
    };
    await saveQuizAttempt(attempt);
    await loadAttempts();
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
    setTimePerQuestion([]);
    setStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Interactive Quiz Platform</h1>
          </div>
          
          {!quizComplete && (
            <div className="flex justify-center mb-4">
              <QuizTimer
                duration={SECONDS_PER_QUESTION}
                onTimeUp={handleTimeUp}
              />
            </div>
          )}
          
          <div className="bg-white rounded-lg py-2 px-4 inline-block">
            <p className="text-lg">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        {!quizComplete ? (
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswerSelect}
            showFeedback={showFeedback}
          />
        ) : (
          <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg mb-4">
              Your score: {score} out of {questions.length}
            </p>
            <button
              onClick={restartQuiz}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <QuizHistory attempts={attempts} />
      </div>
    </div>
  );
}

export default App;