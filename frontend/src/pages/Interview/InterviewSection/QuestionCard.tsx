import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  currentQuestion: {
    question: string;
  };
  currentIndex: number;
  total: number;
  answers: Record<number, string>;
}

console.log("question card rendered");

const QuestionCard: React.FC<Props> = ({ currentQuestion, currentIndex, total, answers }) => {
  if (!currentQuestion) {
    return <p className="text-gray-500">No question available</p>;
  }
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-600 to-indigo-400 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            Question {currentIndex + 1} of {total}
          </CardTitle>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-lg text-white leading-relaxed mb-6">
          {currentQuestion.question}
        </p>
        <div className="flex justify-center">
          <div className="flex gap-1">
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i === currentIndex
                  ? 'bg-blue-600'
                  : answers[i]
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

export default QuestionCard;
