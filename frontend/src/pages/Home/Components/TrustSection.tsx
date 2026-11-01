import { Shield, Clock, Target, Zap, Users, Award, Globe } from 'lucide-react';
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

  const stats = [
    { icon: Users, value: '10,000+', label: 'Interviews Completed' },
    { icon: Award, value: '4.8/5', label: 'Average Rating' },
    { icon: Globe, value: '24/7', label: 'Available Anytime' },
  ];

  return (
    <section id="trust" className={cn('py-16 sm:py-20 bg-white border-y border-slate-200', className)}>
      <div className="section-container">
        <div className="grid grid-cols-3 gap-8 mb-12 md:mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

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