import React from 'react';
import { cn } from '../lib/utils';
import type { Question } from '../data/questions';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showFeedback: boolean;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
}: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            disabled={showFeedback}
            className={cn(
              "w-full p-4 text-left rounded-lg transition-colors",
              "border hover:bg-gray-50 disabled:cursor-not-allowed",
              selectedAnswer === index && "border-blue-500",
              showFeedback && index === question.correctAnswer && "bg-green-100 border-green-500",
              showFeedback && selectedAnswer === index && index !== question.correctAnswer && "bg-red-100 border-red-500"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}