import { Shield, Clock, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustSectionProps {
  className?: string;
}

export default function TrustSection({ className }: TrustSectionProps) {
  const trustItems = [
    {
      icon: Target,
      title: 'Role-Specific Practice',
      description: 'Questions tailored to your target role, domain, and experience level — from Frontend to DevOps.',
    },
    {
      icon: Zap,
      title: 'Actionable AI Feedback',
      description: 'Get communication scores, strengths, improvement areas, and specific recommendations after each session.',
    },
    {
      icon: Clock,
      title: 'Flexible Practice Schedule',
      description: 'Practice anytime, anywhere. No scheduling required — just pick a role and start your session.',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your interview data stays yours. We don\'t use your responses for training or share them with third parties.',
    },
  ];

  return (
    <section id="trust" className={cn('py-16 sm:py-20 bg-white border-y border-slate-200', className)}>
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-start p-6 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}