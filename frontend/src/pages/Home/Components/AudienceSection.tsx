import { Code, Database, Layers, Globe, Cpu, Shield, Gamepad2, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudienceSectionProps {
  className?: string;
}

export default function AudienceSection({ className }: AudienceSectionProps) {
  const roles = [
    { id: 'frontend', name: 'Frontend Developer', icon: Code, domains: ['React', 'Vue', 'Angular', 'TypeScript', 'CSS/HTML'] },
    { id: 'backend', name: 'Backend Developer', icon: Database, domains: ['Node.js', 'Python', 'Java', 'Go', 'APIs', 'Databases'] },
    { id: 'fullstack', name: 'Full Stack Developer', icon: Layers, domains: ['MERN', 'MEAN', 'System Design', 'Architecture', 'Django', 'Laravel'] },
    { id: 'mobile', name: 'Mobile Developer', icon: Globe, domains: ['React Native', 'Flutter', 'iOS/Swift', 'Android/Kotlin', 'Mobile UI/UX'] },
    { id: 'devops', name: 'DevOps Engineer', icon: Cpu, domains: ['Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD', 'Linux', 'Monitoring'] },
    { id: 'data', name: 'Data Analyst / Scientist', icon: Database, domains: ['Python/R', 'SQL', 'Pandas', 'Visualization', 'Statistics', 'ETL'] },
    { id: 'ml', name: 'ML Engineer', icon: Cpu, domains: ['ML/DL', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'Algorithms'] },
    { id: 'cybersecurity', name: 'Cybersecurity Specialist', icon: Shield, domains: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Pen Testing', 'OWASP'] },
    { id: 'blockchain', name: 'Blockchain Developer', icon: Layers, domains: ['Ethereum', 'Solidity', 'Web3', 'DeFi', 'Smart Contracts', 'Consensus'] },
    { id: 'gamedev', name: 'Game Developer', icon: Gamepad2, domains: ['Unity', 'Unreal', 'C++', 'Game Design', '3D Graphics', 'Physics'] },
  ];

  return (
    <section id="roles" className={cn('py-16 sm:py-20 bg-slate-50', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading mb-4">Supported Interview Roles</h2>
          <p className="section-subheading mx-auto">
            10+ technical domains with curated topics and question banks. Select your domain, choose specific topics, and set your experience level for targeted practice.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map((role) => (
            <div key={role.id} className="card-base p-4 hover:border-blue-300 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                <role.icon className="w-5 h-5" />
              </div>
              <h4 className="font-medium text-slate-900 mb-2">{role.name}</h4>
              <div className="flex flex-wrap gap-1.5">
                {role.domains.slice(0, 3).map((domain, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-600">
                    {domain}
                  </span>
                ))}
                {role.domains.length > 3 && (
                  <span className="px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-500">
                    +{role.domains.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 mb-4">
            Explore all domains, topics, and experience levels in detail.
          </p>
          <a
            href="/roles"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all roles & topics
            <Target className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}