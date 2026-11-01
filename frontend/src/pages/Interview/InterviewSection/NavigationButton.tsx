import { Button } from '@/components/ui/button';
import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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
    <div className="flex justify-between pt-4 border-t border-slate-200">
      <Button
        onClick={onPrev}
        disabled={currentIndex === 0}
        variant="outline"
        className="px-4 py-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <Button
        onClick={isLastQuestion ? onFinish : onNext}
        className="btn-primary px-6 py-2 flex items-center gap-2"
      >
        {isLastQuestion ? (
          <>
            Finish
            <Check className="w-4 h-4" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;
