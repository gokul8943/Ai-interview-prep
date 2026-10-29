import { Button } from '@/components/ui/button';
import { MousePointer, Mic, BarChart3, ArrowRight } from 'lucide-react';
import useAuthStore from '@/store/AuthStrore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HowItWorksSectionProps {
  className?: string;
}

export default function HowItWorksSection({ className }: HowItWorksSectionProps) {
  const navigate = useNavigate();
  const { authState } = useAuthStore();
  const user = authState.user;

  const steps = [
    {
      number: '01',
      icon: MousePointer,
      title: 'Choose Your Interview',
      description: 'Select your target role, interview domain, difficulty level, and preferred practice format. Choose from 10+ technical domains and 4 experience levels.',
      details: [
        'Frontend, Backend, Full Stack, Mobile, DevOps, Data, ML, Cybersecurity, Blockchain, Game Dev',
        'Beginner, Intermediate, Advanced, Expert levels',
        'Customizable question count and topic selection',
      ],
    },
    {
      number: '02',
      icon: Mic,
      title: 'Answer Realistic Questions',
      description: 'Practice with AI-generated interview questions tailored to your selections. Respond using voice or text input. The AI adapts follow-up questions based on your answers.',
      details: [
        'Voice-based answers with speech-to-text transcription',
        'Text input option for silent environments',
        'Timed responses with progress tracking',
        'Question navigation (previous/next)',
      ],
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Review Your Feedback',
      description: 'Receive structured AI feedback with communication scores, identified strengths, specific areas for improvement, and actionable recommendations for your next session.',
      details: [
        'Communication score (0-100%)',
        'Strengths you demonstrated',
        'Areas needing improvement',
        'Personalized next-step recommendations',
      ],
    },
  ];

  const handleCTAClick = () => {
    if (user) {
      navigate('/create-interview');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <section id="how-it-works" className={cn('py-20 sm:py-28 bg-white', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-6">From Practice to Progress in Three Steps</h2>
          <p className="section-subheading mx-auto">
            IntelliPrep guides you through a structured preparation workflow that mirrors real interview scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg z-10">
                {step.number}
              </div>
              
              <div className="pt-12 card-base p-6 md:p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  <step.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-5">{step.description}</p>
                
                <ul className="space-y-2 text-sm text-slate-700">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="btn-primary px-8 py-3" onClick={handleCTAClick}>
            Start Your First Practice Session
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}