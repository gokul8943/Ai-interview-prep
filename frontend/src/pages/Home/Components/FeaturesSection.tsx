import { Bot, FileText, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSection({ className }: FeaturesSectionProps) {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Mock Interviews',
      description: 'Practice with AI-generated questions tailored to your selected role, domain, and difficulty level. The system creates realistic interview scenarios that adapt to your responses.',
      capabilities: [
        '10+ technical domains (Frontend, Backend, Data, ML, DevOps, etc.)',
        '4 experience levels from Beginner to Expert',
        'Customizable question count (5-20 questions)',
        'Topic-specific question selection within each domain',
        'Voice or text-based answer input',
      ],
      preview: <FeaturePreviewMockInterview />,
    },
    {
      icon: FileText,
      title: 'Personalized Interview Questions',
      description: 'Questions are generated based on your chosen domain and topics. Each session focuses on the specific skills and knowledge areas relevant to your target role.',
      capabilities: [
        'Domain-specific question banks',
        'Topic-level granularity (e.g., React, TypeScript, Web Performance)',
        'Difficulty-appropriate question complexity',
        'Mix of theoretical and practical questions',
      ],
      preview: <FeaturePreviewQuestionSelection />,
    },
    {
      icon: BarChart3,
      title: 'Actionable AI Feedback',
      description: 'After completing an interview, receive structured feedback with measurable scores and specific guidance. Feedback is based on your actual responses, not generic templates.',
      capabilities: [
        'Communication score (0-100%)',
        'Strengths identified from your answers',
        'Specific areas for improvement',
        'Overall recommendation summary',
        'Suggested next steps for improvement',
      ],
      preview: <FeaturePreviewFeedback />,
    },
  ];

  return (
    <section id="features" className={cn('py-20 sm:py-24 bg-slate-50', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading mb-6">Features That Move the Needle</h2>
          <p className="section-subheading mx-auto">
            Every feature is designed to address a specific interview preparation challenge — no fluff, just practical tools that work.
          </p>
        </div>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'grid lg:grid-cols-2 gap-10 items-center',
                index % 2 === 1 && 'lg:[&>*:first-child]:order-2'
              )}
            >
              <div className="animate-slide-up">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">{feature.description}</p>

                <div className="space-y-3">
                  {feature.capabilities.map((capability, capIndex) => (
                    <div key={capIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="card-elevated p-4 md:p-6 bg-slate-50 border-slate-200">
                  {feature.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturePreviewMockInterview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Interview Session</span>
        <span className="font-medium text-slate-900">Question 3 of 10</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: '30%' }} />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">AI Interviewer</p>
            <p className="text-xs text-slate-400">Frontend Developer • Intermediate</p>
          </div>
        </div>
        <p className="text-slate-800 leading-relaxed">
          "Explain how React's virtual DOM works and why it improves performance compared to direct DOM manipulation."
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-primary text-sm py-2">Record Answer</button>
        <button className="btn-outline text-sm py-2">Type Answer</button>
      </div>
      <p className="text-xs text-slate-400 text-center">Sample UI — not a live session</p>
    </div>
  );
}

function FeaturePreviewQuestionSelection() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">Create Interview Setup</p>
      <div className="space-y-3">
        <SelectPreview label="Domain" value="Frontend Development" />
        <SelectPreview label="Topics" value="React, TypeScript, Web Performance" multi />
        <SelectPreview label="Level" value="Intermediate" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">Questions</span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center">−</button>
          <span className="font-medium text-slate-900 w-8 text-center">10</span>
          <button className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center">+</button>
        </div>
      </div>
      <button className="btn-primary w-full text-sm py-2 mt-2">Create Interview</button>
      <p className="text-xs text-slate-400 text-center">Sample UI — not a live form</p>
    </div>
  );
}

function SelectPreview({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-slate-500 mb-1 block">{label}</label>
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between">
        <span className="text-sm text-slate-900">{value}</span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function FeaturePreviewFeedback() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">AI Feedback Report</span>
        <span className="text-xs text-slate-400">Sample Data</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Communication" value="78%" color="blue" />
        <MetricCard label="Technical Depth" value="82%" color="teal" />
      </div>
      <div className="space-y-3">
        <FeedbackItem
          icon="CheckCircle"
          color="teal"
          title="Strengths"
          items={['Clear explanation of virtual DOM concept', 'Good practical example provided']}
        />
        <FeedbackItem
          icon="AlertCircle"
          color="amber"
          title="Areas for Improvement"
          items={['Add more detail on reconciliation process', 'Explain performance trade-offs']}
        />
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">Recommendation</p>
        <p className="text-sm text-blue-700">Practice explaining the reconciliation algorithm with a visual diagram approach.</p>
      </div>
      <p className="text-xs text-slate-400 text-center">Sample feedback — results vary by session</p>
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: string; color: 'blue' | 'teal' | 'amber' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <div className={cn('rounded-lg p-3 border text-center', colors[color])}>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}

function FeedbackItem({ icon: IconName, color, title, items }: { icon: string; color: 'teal' | 'amber'; title: string; items: string[] }) {
  const colors = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  const IconMap = { CheckCircle, AlertCircle };
  const Icon = IconMap[IconName as keyof typeof IconMap] || CheckCircle;

  return (
    <div className={cn('rounded-lg p-3 border', colors[color])}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <ul className="space-y-1 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}