import { Star, CheckCircle, AlertCircle, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackPreviewSectionProps {
  className?: string;
}

export default function FeedbackPreviewSection({ className }: FeedbackPreviewSectionProps) {
  const sampleFeedback = {
    candidate: {
      name: 'Alex Chen',
      role: 'Frontend Developer',
      date: 'January 15, 2025',
      duration: '42 minutes',
    },
    scores: {
      overall: 76,
      communication: 78,
      technicalDepth: 82,
      structure: 71,
    },
    strengths: [
      'Clearly explains the virtual DOM concept with accurate terminology',
      'Provides a relevant practical example (todo list reconciliation)',
      'Demonstrates understanding of React\'s batching behavior',
      'Uses appropriate technical vocabulary throughout',
    ],
    improvements: [
      'Add more detail about the fiber reconciliation algorithm',
      'Explain performance trade-offs between virtual DOM and direct manipulation',
      'Mention key optimizations (keyed reconciliation, bailout mechanisms)',
      'Structure answer with a clear framework (Concept → Mechanism → Example → Trade-offs)',
    ],
    recommendation: 'Good foundation on React fundamentals. For your next session, practice explaining the fiber reconciliation algorithm with a visual diagram approach. Focus on the diffing algorithm and how React minimizes actual DOM operations. Consider reviewing React Fiber architecture documentation.',
    nextSteps: [
      'Review React Fiber architecture documentation',
      'Practice explaining reconciliation with diagrams',
      'Schedule a follow-up session on "React Internals"',
      'Compare your answer with the model response in session history',
    ],
  };

  const scoreCards = [
    {
      label: 'Communication',
      value: sampleFeedback.scores.communication,
      color: 'blue' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      label: 'Technical Depth',
      value: sampleFeedback.scores.technicalDepth,
      color: 'teal' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 16l4-16M6 9a4 4 0 118 0 4 4 0 01-8 0z" />
        </svg>
      ),
    },
    {
      label: 'Answer Structure',
      value: sampleFeedback.scores.structure,
      color: 'amber' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
    },
    {
      label: 'Problem Solving',
      value: 74,
      color: 'blue' as const,
      icon: <Target className="w-5 h-5" />,
    },
  ];

  return (
    <section id="feedback-preview" className={cn('py-20 sm:py-28 bg-white', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading mb-6">Sample AI Feedback Report</h2>
          <p className="section-subheading mx-auto">
            This is what a real feedback report looks like after completing an interview session. 
            All data below is illustrative — your actual report will reflect your specific responses.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="card-elevated p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-2 block">
                  <Star className="w-3 h-3" />
                  Sample Report — Illustrative Data
                </span>
                <h3 className="text-xl font-bold text-slate-900">{sampleFeedback.candidate.name}</h3>
                <p className="text-slate-600">{sampleFeedback.candidate.role} • {sampleFeedback.candidate.date} • {sampleFeedback.candidate.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">{sampleFeedback.scores.overall}%</p>
                <p className="text-sm text-slate-500">Overall Score</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {scoreCards.map((card, index) => (
                <ScoreCard key={index} {...card} />
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="card-base p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <h4 className="font-semibold text-slate-900">Strengths Demonstrated</h4>
              </div>
              <ul className="space-y-3">
                {sampleFeedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-100">
                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-base p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h4 className="font-semibold text-slate-900">Areas for Improvement</h4>
              </div>
              <ul className="space-y-3">
                {sampleFeedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-base p-6 mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Overall Recommendation</h4>
            </div>
            <p className="text-blue-700 leading-relaxed">{sampleFeedback.recommendation}</p>
          </div>

          <div className="card-base p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">Suggested Next Steps</h4>
            </div>
            <ol className="space-y-3">
              {sampleFeedback.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{index + 1}</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              This sample uses illustrative data. Your actual feedback will be generated from your specific responses 
              and will vary based on the role, domain, and level you select.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreCard({ label, value, color, icon }: { label: string; value: number; color: 'blue' | 'teal' | 'amber'; icon: React.ReactNode }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <div className={cn('rounded-xl p-4 border text-center', colors[color])}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className={cn('text-lg', colors[color].replace('bg-', 'text-').replace('border-', ''))}>
          {icon}
        </span>
      </div>
      <p className="text-2xl font-bold">{value}%</p>
      <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
    </div>
  );
}