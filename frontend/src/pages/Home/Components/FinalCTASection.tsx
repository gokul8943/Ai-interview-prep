import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import useAuthStore from '@/store/AuthStrore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FinalCTASectionProps {
  className?: string;
}

export default function FinalCTASection({ className }: FinalCTASectionProps) {
  const navigate = useNavigate();
  const { authState } = useAuthStore();
  const user = authState.user;

  const handlePrimaryCTA = () => {
    if (user) {
      navigate('/create-interview');
    } else {
      navigate('/sign-in');
    }
  };

  const handleSecondaryCTA = () => {
    navigate('/create-interview');
  };

  return (
    <section id="final-cta" className={cn('py-20 sm:py-28', className)}>
      <div className="section-container">
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-8 md:p-16 lg:p-24 text-center">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-top bg-no-repeat opacity-10" />
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Ready to Practice?
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 text-balance">
              Your Next Interview Shouldn't Be Your First Practice
            </h2>
            
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Build confidence through realistic practice, understand where you can improve, 
              and prepare for your next interview with IntelliPrep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="btn-primary text-lg px-8 py-3"
                onClick={handlePrimaryCTA}
                size="lg"
              >
                Start Free Interview
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="btn-outline text-lg px-8 py-3 border-slate-600 text-slate-200 hover:bg-slate-800"
                onClick={handleSecondaryCTA}
                size="lg"
              >
                Explore Features
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              No credit card required · Unlimited practice · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}