import React from 'react';
import { History } from 'lucide-react';
import type { QuizAttempt } from '../lib/db';

interface QuizHistoryProps {
  attempts: QuizAttempt[];
}

export function QuizHistory({ attempts }: QuizHistoryProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-6 h-6" />
        <h2 className="text-xl font-bold">Quiz History</h2>
      </div>
      
      {attempts.length === 0 ? (
        <p className="text-gray-500">No attempts yet. Take the quiz to see your history!</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Score: {attempt.score}/{attempt.totalQuestions}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(attempt.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Average time per question:{' '}
                    {(
                      attempt.timePerQuestion.reduce((a, b) => a + b, 0) /
                      attempt.timePerQuestion.length
                    ).toFixed(1)}s
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}