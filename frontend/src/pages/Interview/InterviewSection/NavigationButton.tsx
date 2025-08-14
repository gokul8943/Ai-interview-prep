import { Button } from '@/components/ui/button';
import React from 'react';

interface NavigationButtonsProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  total,
  onNext,
  onPrev,
}) => {
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
        onClick={onNext}
        disabled={currentIndex === total - 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {currentIndex === total - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};

export default NavigationButtons;
