import { Button } from '@/components/ui/button';
import { CheckCircle, Mic, Volume2, ArrowRight, Sparkles, Users, Award, Clock } from 'lucide-react';
import useAuthStore from '@/store/AuthStrore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const navigate = useNavigate();
  const { authState } = useAuthStore();
  const user = authState.user;

  const handleCTAClick = () => {
    if (user) {
      navigate('/create-interview');
    } else {
      navigate('/sign-in');
    }
  };

  const handleSecondaryCTAClick = () => {
    navigate('/create-interview');
  };

  const trustIndicators = [
    { icon: Users, label: '10,000+ interviews practiced' },
    { icon: Award, label: '4.8/5 average rating' },
    { icon: Clock, label: 'Available 24/7' },
  ];

  return (
    <section id="hero" className={cn('relative overflow-hidden pt-6 sm:pt-10 lg:pt-16 pb-12 sm:pb-16 lg:pb-24', className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-top bg-no-repeat opacity-30" />
      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      
      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-POWERED INTERVIEW PREPARATION
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 text-balance">
              Practice Real Interviews. Get AI Feedback.{' '}
              <span className="text-blue-600">Walk In With Confidence.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              Prepare for technical, HR, and behavioral interviews with realistic AI-powered practice. 
              Answer questions, understand your strengths, identify gaps, and get actionable feedback 
              to improve before your next interview.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                className="btn-primary text-lg px-8 py-3"
                onClick={handleCTAClick}
                size="lg"
              >
                Start Free Interview
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="btn-outline text-lg px-8 py-3"
                onClick={handleSecondaryCTAClick}
                size="lg"
              >
                Explore a Sample Interview
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8">
              {trustIndicators.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★★★★★</span>
                <span>Rated 4.8/5 by 2,000+ users</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-teal-500" />
                <span>No credit card required</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-teal-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in" aria-hidden="true">
            <ProductPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl blur-2xl" />
      
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-sm text-slate-500 font-mono">
            app.intelliprep.ai/interview/abc123
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Live Session
              </span>
              <h3 className="text-lg font-semibold text-slate-900 mt-1">Frontend Developer Interview</h3>
              <p className="text-sm text-slate-500">Mid-level • 10 Questions • Question 3 of 10</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Volume2 className="w-4 h-4" />
              <span>12:34</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">AI Interviewer</p>
                <p className="text-xs text-slate-400">Asking follow-up question</p>
              </div>
            </div>
            <p className="text-slate-800 leading-relaxed">
              "Can you explain how React's virtual DOM works and why it improves performance 
              compared to direct DOM manipulation? Please provide a practical example."
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Your Answer Progress</span>
              <span className="font-medium text-slate-900">45%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: '45%' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full justify-center gap-2">
              <Mic className="w-4 h-4" />
              Record Answer
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2">
              <IconType />
              Type Answer
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">Live Feedback Preview</span>
              <span className="text-xs text-slate-400">AI Analysis</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <FeedbackMetric label="Communication" value="78%" color="blue" />
              <FeedbackMetric label="Technical Depth" value="82%" color="teal" />
              <FeedbackMetric label="Structure" value="71%" color="amber" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
    </div>
  );
}

function FeedbackMetric({ label, value, color }: { label: string; value: string; color: 'blue' | 'teal' | 'amber' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className={cn('rounded-xl p-3 border', colors[color])}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}

function IconType() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  );
}