import { MessageSquare, HelpCircle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProblemSectionProps {
  className?: string;
}

export default function ProblemSection({ className }: ProblemSectionProps) {
  const problems = [
    {
      icon: MessageSquare,
      title: 'Difficulty Explaining Technical Concepts',
      description: 'You know the answer but struggle to articulate it clearly under pressure. Technical knowledge doesn\'t automatically translate to clear communication.',
      solution: 'Practice explaining concepts out loud with AI-generated follow-up questions that push you to go deeper.',
    },
    {
      icon: HelpCircle,
      title: 'Uncertainty About Interview Expectations',
      description: 'Different companies and roles expect different things. Without knowing what\'s coming, you waste time preparing for the wrong topics.',
      solution: 'Select your target role and domain to get questions matched to actual interview patterns for that position.',
    },
    {
      icon: Users,
      title: 'Limited Realistic Practice Opportunities',
      description: 'Mock interviews with peers are hard to schedule, inconsistent in quality, and don\'t provide structured feedback you can act on.',
      solution: 'Get instant, structured feedback on communication, technical depth, and answer structure — available 24/7.',
    },
  ];

  return (
    <section id="problems" className={cn('py-20 sm:py-28 bg-slate-50', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-6">
            Knowing the Answer Is Only Half the Interview
          </h2>
          <p className="section-subheading mx-auto">
            Interview performance also depends on how clearly you explain your thinking, structure your answers, 
            and respond under pressure. IntelliPrep helps you practice those skills before the real conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="card-elevated p-6 md:p-8 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{problem.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-5 flex-1">{problem.description}</p>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                  How IntelliPrep helps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </p>
                <p className="text-slate-700 mt-2 leading-relaxed">{problem.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}