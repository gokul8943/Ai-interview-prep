import { Check, Star, Lock, Sparkles, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/AuthStrore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PricingSectionProps {
  className?: string;
}

export default function PricingSection({ className }: PricingSectionProps) {
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

  const freeFeatures = [
    'Access to all 10+ interview domains',
    '4 experience levels (Beginner to Expert)',
    'Customizable topics and question count',
    'Voice and text answer input',
    'AI-generated interview questions',
    'Structured AI feedback reports',
    'Communication, technical depth, and structure scores',
    'Strengths and improvement areas',
    'Personalized recommendations',
    'Session history and past feedback',
    'Unlimited practice sessions',
  ];

  const premiumFeatures = [
    'Advanced analytics dashboard',
    'Resume & JD-based question tailoring',
    'Company-specific interview patterns',
    'System design interview module',
    'Peer comparison benchmarks',
    'Exportable PDF reports',
    'Priority support',
  ];

  return (
    <section id="pricing" className={cn('py-20 sm:py-28 bg-white', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-6">Simple, Honest Access</h2>
          <p className="section-subheading mx-auto">
            IntelliPrep is currently free to use. All core interview practice and feedback features are available 
            without a subscription. Future premium features are listed below for transparency.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="card-elevated p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
                Currently Free
              </span>
            </div>
            
            <div className="text-center mb-8 pt-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-slate-900">$0</span>
                <span className="text-slate-500">/ month</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 text-center mb-6">Free Practice</h3>
            <p className="text-slate-600 text-center mb-8">
              Everything you need to practice interviews effectively. No trial, no credit card, no feature limits.
            </p>

            <div className="flex items-center gap-3 justify-center mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">All features included — no paywall</span>
            </div>

            <ul className="space-y-3 mb-8">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className="btn-primary w-full py-3" 
              onClick={handleCTAClick}
              size="lg"
            >
              {user ? 'Go to Dashboard' : 'Start Free Interview'}
            </Button>
          </div>

          <div className="card-base p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                Planned Premium
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-slate-900">TBD</span>
                <span className="text-slate-500">/ month</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 text-center mb-6">Premium Features (Planned)</h3>
            <p className="text-slate-600 text-center mb-8">
              Advanced capabilities under consideration. Not currently available. No payment required today.
            </p>

            <div className="flex items-center gap-3 justify-center mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <Lock className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Future features — not yet available</span>
            </div>

            <ul className="space-y-3 mb-8">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-500">
                  <Lock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant="outline" 
              className="w-full py-3" 
              disabled
            >
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <div className="card-base p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">Early Access Program</h4>
                <p className="text-sm text-slate-500">Join the waitlist for upcoming premium features</p>
              </div>
            </div>
            <p className="text-slate-600 mb-6">
              We're building premium features based on user feedback. If you'd like early access or want to 
              influence the roadmap, join the waitlist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleCTAClick}>
                Join Waitlist
              </Button>
              <Button variant="ghost" className="w-full sm:w-auto" onClick={handleCTAClick}>
                <Shield className="w-4 h-4 mr-2" />
                View Roadmap
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-slate-900 text-center mb-8">Who Uses IntelliPrep?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, label: 'Job Seekers', desc: 'Practice for real interviews' },
              { icon: GraduationCap, label: 'Students', desc: 'Prepare for placements' },
              { icon: Briefcase, label: 'Professionals', desc: 'Level up for career growth' },
              { icon: Building2, label: 'Institutions', desc: 'Training & placement prep' },
            ].map((item, i) => (
              <div key={i} className="card-base p-5 text-center hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-slate-900 mb-1">{item.label}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline icons to avoid extra imports
function GraduationCap() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    </svg>
  );
}

function Briefcase() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function Building2() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}