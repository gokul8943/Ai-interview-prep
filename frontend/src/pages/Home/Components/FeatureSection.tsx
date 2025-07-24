import { Card, CardContent } from '@/components/ui/card';
import { Brain, Target, Zap, Award } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Interviews",
      description: "Advanced AI conducts realistic interviews tailored to your role and experience level."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Questions",
      description: "Questions adapted to your resume, job description, and industry requirements."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Feedback",
      description: "Real-time analysis of your responses with actionable improvement suggestions."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Detailed reports tracking your progress and highlighting areas for improvement."
    }
  ];

  return (
    <section id="features" className="px-6 py-20 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose IntelliPrep?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our cutting-edge AI technology provides the most realistic interview experience, 
            helping you prepare better than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group shadow-2xl"
            >
              <CardContent className="p-6">
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
