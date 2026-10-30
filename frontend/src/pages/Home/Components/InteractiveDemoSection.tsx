import { useState, useEffect, useRef } from 'react';
import { Mic, MessageSquare, BarChart3, CheckCircle, AlertCircle, Star, ArrowRight, Pause, Volume2, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useAuthStore from '@/store/AuthStrore';
import { useNavigate } from 'react-router-dom';

interface InteractiveDemoSectionProps {
  className?: string;
}

export default function InteractiveDemoSection({ className }: InteractiveDemoSectionProps) {
  const navigate = useNavigate();
  const { authState } = useAuthStore();
  const user = authState.user;

  const [activeTab, setActiveTab] = useState<'practice' | 'feedback' | 'report'>('practice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [answerProgress, setAnswerProgress] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCTAClick = () => {
    if (user) {
      navigate('/create-interview');
    } else {
      navigate('/sign-in');
    }
  };

  const tabs = [
    { id: 'practice', label: 'Interview Practice', icon: Mic, description: 'Answer questions in real-time' },
    { id: 'feedback', label: 'AI Feedback', icon: MessageSquare, description: 'Instant analysis of your response' },
    { id: 'report', label: 'Performance Report', icon: BarChart3, description: 'Comprehensive session summary' },
  ];

  const practiceSteps = [
    { label: 'AI asks question', icon: '🎤' },
    { label: 'You answer', icon: '🎙️' },
    { label: 'Get feedback', icon: '📊' },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setShowTranscript(true);
    setAnswerProgress(0);
    
    intervalRef.current = setInterval(() => {
      setRecordingTime(t => t + 1);
    }, 1000);
    
    progressIntervalRef.current = setInterval(() => {
      setAnswerProgress(p => {
        if (p >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 100;
        }
        return p + 5;
      });
    }, 800);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const handleSendAnswer = () => {
    if (typedAnswer.trim()) {
      setShowTranscript(true);
      setAnswerProgress(100);
      setTimeout(() => {
        setActiveTab('feedback');
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="demo" className={cn('py-20 sm:py-28 bg-white', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading mb-6">See What Better Interview Preparation Looks Like</h2>
          <p className="section-subheading mx-auto">
            Explore a sample interview session — from question to feedback to performance insights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-elevated overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-1">
                  {practiceSteps.map((step, i) => (
                    <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      currentStep >= i 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      <span>{step.icon}</span>
                      <span>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <nav className="flex" role="tablist" aria-label="Demo sections">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-tab`}
                    onClick={() => {
                      setActiveTab(tab.id as typeof activeTab);
                      if (tab.id === 'practice') setCurrentStep(0);
                      else if (tab.id === 'feedback') setCurrentStep(1);
                      else setCurrentStep(2);
                    }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200'
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 md:p-8">
              <div role="tabpanel" id="practice-panel" aria-labelledby="practice-tab" className={activeTab === 'practice' ? 'animate-fade-in' : 'hidden'}>
                <DemoPracticeTab 
                  isRecording={isRecording}
                  recordingTime={recordingTime}
                  answerProgress={answerProgress}
                  typedAnswer={typedAnswer}
                  showTranscript={showTranscript}
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                  onSendAnswer={handleSendAnswer}
                  setTypedAnswer={setTypedAnswer}
                  formatTime={formatTime}
                />
              </div>
              <div role="tabpanel" id="feedback-panel" aria-labelledby="feedback-tab" className={activeTab === 'feedback' ? 'animate-fade-in' : 'hidden'}>
                <DemoFeedbackTab />
              </div>
              <div role="tabpanel" id="report-panel" aria-labelledby="report-tab" className={activeTab === 'report' ? 'animate-fade-in' : 'hidden'}>
                <DemoReportTab />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 mb-4">
              This is a demonstration using sample data. Your actual sessions will generate personalized questions and feedback.
            </p>
            <Button className="btn-primary px-8 py-3" onClick={handleCTAClick}>
              Start Your Own Practice Session
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoPracticeTab({
  isRecording,
  recordingTime,
  answerProgress,
  typedAnswer,
  showTranscript,
  onStartRecording,
  onStopRecording,
  onSendAnswer,
  setTypedAnswer,
  formatTime,
}: {
  isRecording: boolean;
  recordingTime: number;
  answerProgress: number;
  typedAnswer: string;
  showTranscript: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSendAnswer: () => void;
  setTypedAnswer: (value: string) => void;
  formatTime: (seconds: number) => string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-2 block">
            Live Session
          </span>
          <h3 className="text-lg font-semibold text-slate-900">Frontend Developer Interview</h3>
          <p className="text-sm text-slate-500">Intermediate • Question 3 of 10</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Volume2 className="w-4 h-4" />
          <span>{formatTime(recordingTime)}</span>
        </div>
      </div>

      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '30%' }} />
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-slate-500">AI Interviewer</p>
            <p className="text-xs text-slate-400">Asking follow-up question</p>
          </div>
        </div>
        <p className="text-slate-800 leading-relaxed text-lg">
          "Can you explain how React's virtual DOM works and why it improves performance 
          compared to direct DOM manipulation? Please provide a practical example."
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Your Answer Progress</span>
          <span className="font-medium text-slate-900">{answerProgress}%</span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300" 
            style={{ width: `${answerProgress}%` }}
          />
        </div>

        {!showTranscript ? (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className={cn('btn-primary w-full justify-center gap-2', isRecording && 'bg-red-600 hover:bg-red-700')}
              onClick={isRecording ? onStopRecording : onStartRecording}
              disabled={answerProgress >= 100}
            >
              {isRecording ? (
                <>
                  <Pause className="w-4 h-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Start Recording
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2" onClick={() => setShowTranscript(true)}>
              <MessageSquare className="w-4 h-4" />
              Type Answer
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Type your answer here... Press Enter to send"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendAnswer();
                }
              }}
              className="w-full min-h-[120px] p-4 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowTranscript(false)}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button className="btn-primary gap-2" onClick={onSendAnswer} disabled={!typedAnswer.trim()}>
                <Send className="w-4 h-4" />
                Send Answer
              </Button>
            </div>
          </div>
        )}

        {showTranscript && typedAnswer && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-800">Your Answer (Transcript)</p>
              <span className="text-xs text-blue-600">Ready for AI analysis</span>
            </div>
            <p className="text-blue-700 text-sm leading-relaxed">{typedAnswer}</p>
          </div>
        )}

        {!showTranscript && answerProgress === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm font-medium text-blue-800 mb-2">💡 Try it yourself</p>
            <p className="text-sm text-blue-700">
              Click "Start Recording" to simulate a voice answer, or "Type Answer" to write your response. 
              The AI will analyze your answer and generate instant feedback.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DemoFeedbackTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">AI Feedback — Question 3</h3>
          <p className="text-sm text-slate-500">Generated instantly after your response</p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Complete
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCardDemo label="Communication" value="78%" color="blue" description="Clarity & articulation" />
        <MetricCardDemo label="Technical Depth" value="82%" color="teal" description="Accuracy & completeness" />
        <MetricCardDemo label="Structure" value="71%" color="amber" description="Organization & flow" />
      </div>

      <div className="space-y-4">
        <FeedbackCardDemo
          icon={CheckCircle}
          color="teal"
          title="Strengths"
          items={[
            'Clearly explained the virtual DOM concept',
            'Provided a relevant practical example',
            'Used appropriate technical terminology',
          ]}
        />
        <FeedbackCardDemo
          icon={AlertCircle}
          color="amber"
          title="Areas for Improvement"
          items={[
            'Add more detail about the reconciliation process',
            'Explain performance trade-offs explicitly',
            'Mention fiber architecture for depth',
          ]}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">Overall Recommendation</span>
        </div>
        <p className="text-blue-700 text-sm leading-relaxed">
          Good foundation on virtual DOM basics. For your next session, practice explaining the 
          reconciliation algorithm with a visual diagram approach. Focus on the diffing algorithm 
          and how React minimizes actual DOM operations.
        </p>
      </div>
    </div>
  );
}

function DemoReportTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Interview Performance Summary</h3>
        <p className="text-sm text-slate-500">Frontend Developer • Intermediate • Completed Jan 15, 2025</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryStat label="Overall Score" value="76%" color="blue" />
        <SummaryStat label="Communication" value="78%" color="blue" />
        <SummaryStat label="Technical Depth" value="82%" color="teal" />
        <SummaryStat label="Answer Structure" value="71%" color="amber" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-base p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-teal-500" />
            <h4 className="font-semibold text-slate-900">Key Strengths</h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              'Strong grasp of React fundamentals',
              'Clear communication of technical concepts',
              'Good use of practical examples',
              'Appropriate technical vocabulary',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-base p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h4 className="font-semibold text-slate-900">Focus Areas</h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              'Deepen knowledge of reconciliation internals',
              'Practice explaining performance trade-offs',
              'Structure answers with clear frameworks',
              'Include edge cases in explanations',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-base p-5 bg-slate-50 border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-slate-900">Recommended Next Steps</h4>
        </div>
        <ol className="space-y-2 text-sm text-slate-700">
          {[
            'Review React Fiber architecture documentation',
            'Practice explaining reconciliation with diagrams',
            'Schedule a follow-up session on "React Internals"',
            'Compare your answer with the model response in session history',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function MetricCardDemo({ label, value, color, description }: { label: string; value: string; color: 'blue' | 'teal' | 'amber'; description: string }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <div className={cn('rounded-xl p-4 border text-center', colors[color])}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  );
}

function FeedbackCardDemo({ icon: Icon, color, title, items }: { icon: typeof CheckCircle; color: 'teal' | 'amber'; title: string; items: string[] }) {
  const colors = {
    teal: 'bg-teal-50 border-teal-200',
    amber: 'bg-amber-50 border-amber-200',
  };
  const iconColors = {
    teal: 'text-teal-500',
    amber: 'text-amber-500',
  };
  return (
    <div className={cn('rounded-xl p-4 border', colors[color])}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn('w-5 h-5', iconColors[color])} />
        <h4 className="font-semibold text-slate-900">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
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

function SummaryStat({ label, value, color }: { label: string; value: string; color: 'blue' | 'teal' | 'amber' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <div className={cn('rounded-xl p-4 border text-center', colors[color])}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}