import { Check, Star, Lock } from 'lucide-react';
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
              <span className="text-5xl font-bold text-slate-900">$0</span>
              <span className="text-slate-500">/ month</span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 text-center mb-6">Free Practice</h3>
            <p className="text-slate-600 text-center mb-8">
              Everything you need to practice interviews effectively. No trial, no credit card, no feature limits.
            </p>

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

          <div className="card-base p-8 relative opacity-70">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                Planned Premium
              </span>
            </div>

            <div className="text-center mb-8">
              <span className="text-5xl font-bold text-slate-900">TBD</span>
              <span className="text-slate-500">/ month</span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 text-center mb-6">Premium Features (Planned)</h3>
            <p className="text-slate-600 text-center mb-8">
              Advanced capabilities under consideration. Not currently available. No payment required today.
            </p>

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

        <div className="mt-16 text-center">
          <div className="card-base p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-amber-500" />
              <h4 className="text-lg font-semibold text-slate-900">Early Access Program</h4>
            </div>
            <p className="text-slate-600 mb-6">
              We're building premium features based on user feedback. If you'd like early access or want to 
              influence the roadmap, join the waitlist.
            </p>
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleCTAClick}>
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}