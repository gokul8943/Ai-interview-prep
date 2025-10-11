import { Button } from '@/components/ui/button';
import React from 'react';

interface NavigationButtonsProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onFinish?: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  total,
  onNext,
  onPrev,
  onFinish
}) => {
  const isLastQuestion = currentIndex === total - 1;

  return (
    <div className="flex justify-between mt-6">
      <Button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </Button>

      <Button
        onClick={isLastQuestion ? onFinish : onNext} // ✅ key fix here
        className={`px-4 py-2 rounded text-white ${
          isLastQuestion ? 'bg-green-600' : 'bg-blue-500'
        }`}
      >
        {isLastQuestion ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};

export default NavigationButtons;
