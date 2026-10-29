import { GraduationCap, Briefcase, ArrowRightLeft, Building2, Target, Code, Database, Cpu, Globe, Shield, Layers, Gamepad2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudienceSectionProps {
  className?: string;
}

export default function AudienceSection({ className }: AudienceSectionProps) {
  const audiences = [
    {
      icon: GraduationCap,
      title: 'Freshers & Recent Graduates',
      description: 'Build interview confidence from day one. Practice the fundamentals and learn how to articulate your academic projects effectively.',
      roles: ['Junior Developer', 'Graduate Trainee', 'Intern'],
    },
    {
      icon: Briefcase,
      title: 'Working Professionals',
      description: 'Level up for your next career move. Target senior-level questions and system design scenarios relevant to your experience.',
      roles: ['Mid-level Engineer', 'Senior Engineer', 'Tech Lead'],
    },
    {
      icon: ArrowRightLeft,
      title: 'Job Switchers',
      description: 'Prepare for a domain transition. Focus on the specific technical areas that hiring managers evaluate when you switch stacks.',
      roles: ['Backend → Full Stack', 'Frontend → Mobile', 'DevOps → Platform'],
    },
    {
      icon: Building2,
      title: 'Career Changers',
      description: 'Break into tech with structured practice. Learn the interview patterns and vocabulary that signal readiness to hiring teams.',
      roles: ['Bootcamp Graduates', 'Self-taught Developers', 'Non-CS Backgrounds'],
    },
    {
      icon: Users,
      title: 'Colleges & Training Institutes',
      description: 'Equip your students with realistic interview practice. Integrate IntelliPrep into your curriculum or placement preparation programs.',
      roles: ['CS Departments', 'Coding Bootcamps', 'Placement Cells'],
    },
  ];

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

  const interviewFormats = [
    { name: 'Technical Interviews', description: 'Domain-specific coding and architecture questions', available: true },
    { name: 'HR / Behavioral', description: 'Situational and competency-based questions', available: true },
    { name: 'System Design', description: 'Scalability, architecture, and trade-off discussions', available: true },
    { name: 'Case Studies', description: 'Real-world problem solving scenarios', available: false },
    { name: 'Aptitude & Logic', description: 'Quantitative and logical reasoning', available: false },
  ];

  const experienceLevels = [
    { id: 'beginner', name: 'Fresher / Entry', description: '0-1 years', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: 'Junior / Mid', description: '1-3 years', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: 'Senior', description: '3-6 years', color: 'bg-red-100 text-red-800' },
    { id: 'expert', name: 'Lead / Architect', description: '6+ years', color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <section id="roles" className={cn('py-20 sm:py-28 bg-slate-50', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-6">Prepare for the Role You're Working Toward</h2>
          <p className="section-subheading mx-auto">
            IntelliPrep covers 10+ technical domains across 4 experience levels. 
            Whether you're just starting out or targeting a staff engineer role, there's a practice path for you.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Who Is IntelliPrep For?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audiences.map((audience, index) => (
                <div key={index} className="card-base p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <audience.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{audience.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{audience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {audience.roles.map((role, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              Supported Interview Roles
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl">
              Each role includes curated topics and question banks. Select your domain, choose specific topics, 
              and set your experience level for targeted practice.
            </p>
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
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Interview Formats
            </h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl">
              {interviewFormats.map((format, index) => (
                <div
                  key={index}
                  className={cn(
                    'card-base p-5',
                    !format.available && 'opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900">{format.name}</h4>
                    {format.available ? (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-teal-50 text-teal-700 font-medium">Available</span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-500 font-medium">Planned</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{format.description}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              Formats marked "Planned" are on the roadmap but not yet implemented.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Experience Levels
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              {experienceLevels.map((level) => (
                <div key={level.id} className="card-base p-5 text-center">
                  <span className={cn('px-3 py-1 rounded-full text-xs font-medium', level.color)}>
                    {level.name}
                  </span>
                  <p className="text-sm text-slate-500 mt-2">{level.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}