import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    return <p className="text-slate-500">No question available</p>;
  }
  return (
    <Card className={cn('card-elevated')}>
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-slate-900">
            Question {currentIndex + 1} of {total}
          </CardTitle>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-lg text-slate-900 leading-relaxed mb-6">
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
                    ? 'bg-teal-500'
                    : 'bg-slate-200'
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
