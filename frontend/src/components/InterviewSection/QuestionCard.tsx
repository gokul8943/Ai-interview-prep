import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  currentQuestion: {
    text: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  currentIndex: number;
  total: number;
  answers: Record<number, string>;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const QuestionCard: React.FC<Props> = ({ currentQuestion, currentIndex, total, answers }) => (
  <Card className="shadow-lg">
    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl">
          Question {currentIndex + 1} of {total}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {currentQuestion.category}
          </Badge>
          <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
            {currentQuestion.difficulty}
          </Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6">
      <p className="text-lg text-gray-800 leading-relaxed mb-6">{currentQuestion.text}</p>
      <div className="flex justify-center">
        <div className="flex gap-1">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex
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
);

export default QuestionCard;
