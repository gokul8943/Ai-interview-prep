import { Sparkles, Shield, Zap, Users, ArrowRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthForm from '@/components/AuthForm';
import { cn } from '@/lib/utils';
import LogoSvg from '@/public/logo.svg';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-top bg-no-repeat opacity-30" />
      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="hidden lg:block animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-POWERED INTERVIEW PREPARATION
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6 text-balance">
                Start Your Practice Journey.{' '}
                <span className="text-blue-600">Free Forever.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Join 10,000+ developers practicing for real interviews. Get AI-generated questions,
                structured feedback, and track your improvement — all for free.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">10+ Technical Domains</p>
                    <p className="text-sm text-slate-600">Frontend, Backend, ML, DevOps, Data & more</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Instant AI Feedback</p>
                    <p className="text-sm text-slate-600">Communication, technical depth, structure scores</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Privacy First</p>
                    <p className="text-sm text-slate-600">Your data never used for training</p>
                  </div>
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
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm text-slate-500 font-mono">
                    app.intelliprep.ai/sign-up
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <img src={LogoSvg} alt="" width={38} height={32} />
                    <span className="font-bold text-xl text-slate-900">IntelliPrep</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Create Free Account</h2>
                  <p className="text-slate-600 text-center mb-8">Start practicing interviews in minutes</p>

                  <AuthForm type="sign-up" />
                </div>

                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;