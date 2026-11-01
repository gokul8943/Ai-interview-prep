import { Sparkles, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthForm from '@/components/AuthForm';
import { cn } from '@/lib/utils';
import LogoSvg from '@/public/logo.svg';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-top bg-no-repeat opacity-30" />
      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />

      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-8">
        <div className="relative z-10 w-full max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="hidden lg:block animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-POWERED INTERVIEW PREPARATION
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6 text-balance">
                Welcome Back.{' '}
                <span className="text-blue-600">Start Practicing.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Continue your interview preparation journey. Practice realistic questions,
                get structured AI feedback, and track your progress over time.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">10,000+</p>
                  <p className="text-xs text-slate-600 mt-1">Interviews Practiced</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">4.8/5</p>
                  <p className="text-xs text-slate-600 mt-1">Average Rating</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">24/7</p>
                  <p className="text-xs text-slate-600 mt-1">Available Anytime</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-slate-700">Private & Secure</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <Zap className="w-4 h-4 text-teal-600" />
                  <span className="font-medium text-slate-700">Instant AI Feedback</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-slate-700">No Credit Card</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative z-10 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm text-slate-500 font-mono">
                    app.intelliprep.ai/sign-in
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <img src={LogoSvg} alt="" width={38} height={32} />
                    <span className="font-bold text-xl text-slate-900">IntelliPrep</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Sign In</h2>
                  <p className="text-slate-600 text-center mb-8">Access your interview practice dashboard</p>

                  <AuthForm type="sign-in" />
                </div>

                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;