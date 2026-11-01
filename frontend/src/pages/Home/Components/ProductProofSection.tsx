import { Shield, Zap, Target, BarChart3, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductProofSectionProps {
  className?: string;
}

export default function ProductProofSection({ className }: ProductProofSectionProps) {
  const proofPoints = [
    {
      icon: Target,
      title: 'Built Around Real Interview Patterns',
      description: 'Questions are generated from actual technical interview patterns across 10+ domains. Not generic trivia — the same topics senior engineers evaluate candidates on.',
      details: [
        'Domain-specific question banks curated from real interviews',
        'Difficulty calibrated to experience levels (Beginner → Expert)',
        'Topic granularity (e.g., "React Hooks" not just "React")',
      ],
      visual: 'target',
    },
    {
      icon: Zap,
      title: 'Feedback You Can Actually Use',
      description: 'No vague scores. Get specific strengths, concrete improvement areas, and a prioritized action plan for your next practice session.',
      details: [
        'Communication score with clarity criteria',
        'Technical depth assessment per question',
        'Answer structure evaluation',
        'Prioritized next-step recommendations',
      ],
      visual: 'zap',
    },
    {
      icon: Shield,
      title: 'Privacy-First by Design',
      description: 'Your interview responses, transcripts, and feedback reports are never used for model training. Data stays in your account unless you choose to share it.',
      details: [
        'No response data sent to third-party AI training',
        'Session data isolated per user account',
        'Delete your data anytime from settings',
        'Transparent data handling policy',
      ],
      visual: 'shield',
    },
    {
      icon: BarChart3,
      title: 'Progress You Can Measure',
      description: 'Track improvement across sessions with historical scores, recurring strength patterns, and persistent improvement areas.',
      details: [
        'Session history with scores and dates',
        'Trend visualization for communication scores',
        'Cross-session strength/weakness analysis',
        'Previous feedback accessible anytime',
      ],
      visual: 'chart',
    },
  ];

  const workflowProof = [
    {
      step: 1,
      title: 'Select Role & Topics',
      proof: 'Choose from 10 technical domains, 50+ specific topics, and 4 experience levels. Questions adapt to your exact selection.',
      icon: Target,
    },
    {
      step: 2,
      title: 'Answer Questions Naturally',
      proof: 'Speak or type your answers. Speech-to-text runs locally in the browser — your voice never leaves your device for transcription.',
      icon: MicIcon,
    },
    {
      step: 3,
      title: 'Get Structured Feedback',
      proof: 'AI analyzes your response against the question intent. You receive scores, strengths, improvements, and next steps — all in seconds.',
      icon: BarChart3,
    },
    {
      step: 4,
      title: 'Review & Improve',
      proof: 'Access every past session. Compare scores over time. Revisit feedback. Practice the same question again with new insights.',
      icon: TrendingUp,
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Interviews Practiced' },
    { value: '4.8/5', label: 'Average Rating' },
    { value: '10+', label: 'Technical Domains' },
    { value: '24/7', label: 'Availability' },
  ];

  return (
    <section id="proof" className={cn('py-20 sm:py-28 bg-slate-50', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-6">Built Around the Way Interviews Actually Work</h2>
          <p className="section-subheading mx-auto">
            No fake testimonials, no inflated metrics. Here's what the product actually does and how each part helps you prepare.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="card-base p-6 text-center animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-12 mb-16">
          {proofPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                'grid lg:grid-cols-2 gap-12 items-center p-6 md:p-8 card-base',
                index % 2 === 1 && 'lg:[&>*:first-child]:order-2'
              )}
            >
              <div className="animate-slide-up">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <point.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{point.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-5 text-lg">{point.description}</p>
                <ul className="space-y-2">
                  {point.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="card-elevated p-5 bg-slate-50 border-slate-200 min-h-[220px] flex items-center justify-center">
                  <ProofVisual point={point} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-12">The Complete Workflow</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowProof.map((step, index) => (
              <div key={index} className="relative card-base p-6 text-center group">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-5 border-4 border-white shadow-lg group-hover:bg-blue-100 transition-colors">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{step.proof}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MicIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}

function ProofVisual({ point }: { point: typeof proofPoints[0] }) {
  const visuals = {
    target: () => (
      <div className="text-center w-full max-w-md">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium mb-4">
          Frontend Developer • Intermediate
        </div>
        <div className="text-left space-y-3 max-w-xs mx-auto text-sm">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <p className="font-medium text-slate-900">Question 3/10</p>
            <p className="text-slate-600 mt-1">"Explain React's virtual DOM and reconciliation..."</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs">React</span>
            <span className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded text-xs">Virtual DOM</span>
            <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded text-xs">Performance</span>
          </div>
        </div>
      </div>
    ),
    zap: () => (
      <div className="text-center w-full max-w-md">
        <div className="grid grid-cols-3 gap-3 text-center mb-4">
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <p className="text-2xl font-bold text-teal-600">78%</p>
            <p className="text-xs text-slate-500">Communication</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <p className="text-2xl font-bold text-blue-600">82%</p>
            <p className="text-xs text-slate-500">Technical Depth</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <p className="text-2xl font-bold text-amber-600">71%</p>
            <p className="text-xs text-slate-500">Structure</p>
          </div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 text-left text-sm space-y-2">
          <div className="flex items-center gap-2 text-teal-700">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Strength: Clear virtual DOM explanation</span>
          </div>
          <div className="flex items-center gap-2 text-amber-700">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Improve: Add reconciliation details</span>
          </div>
          <div className="flex items-center gap-2 text-blue-700">
            <TrendingUp className="w-4 h-4" />
            <span>Practice fiber architecture explanation</span>
          </div>
        </div>
      </div>
    ),
    shield: () => (
      <div className="text-center space-y-3 max-w-md mx-auto w-full">
        <div className="p-4 bg-white rounded-lg border border-slate-200 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-slate-900">Your Data</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-teal-50 text-teal-700 font-medium">Private</span>
          </div>
          <p className="text-sm text-slate-600">Interview responses stored in your account only</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-slate-200 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-slate-900">AI Training</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-red-50 text-red-700 font-medium">Opted Out</span>
          </div>
          <p className="text-sm text-slate-600">Responses never used for model training</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-slate-200 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-slate-900">Data Deletion</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 font-medium">Available</span>
          </div>
          <p className="text-sm text-slate-600">Delete account and all data anytime</p>
        </div>
      </div>
    ),
    chart: () => (
      <div className="text-center w-full max-w-md">
        <div className="space-y-3 mb-4">
          {[
            { role: 'Frontend Developer', date: 'Jan 15', score: 78, trend: 'up' },
            { role: 'Full Stack', date: 'Jan 8', score: 72, trend: 'up' },
            { role: 'React Specialist', date: 'Jan 2', score: 68, trend: 'neutral' },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <div className="text-left">
                <p className="font-medium text-slate-900">{session.role}</p>
                <p className="text-xs text-slate-500">{session.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{session.score}%</span>
                <TrendingUp className={cn('w-4 h-4', session.trend === 'up' ? 'text-teal-500' : 'text-slate-400')} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Sample trend — actual data from your sessions</p>
      </div>
    ),
  };

  const Visual = visuals[point.visual as keyof typeof visuals] || visuals.target;
  return <Visual />;
}