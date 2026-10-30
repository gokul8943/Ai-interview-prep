import { Shield, Lock, Database, Eye, Trash2, Globe, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PrivacyContentProps {
  className?: string;
}

export default function PrivacyContent({ className }: PrivacyContentProps) {
  const privacyPoints = [
    {
      icon: Shield,
      title: 'Your Data Stays Yours',
      description: 'Interview responses, transcripts, and feedback reports are stored in your account. We don\'t sell, rent, or share your personal data with third parties.',
      verified: true,
    },
    {
      icon: Lock,
      title: 'No Training on Your Data',
      description: 'Your interview responses are never used to train or improve AI models. The AI provides feedback on your session only — your data doesn\'t contribute to model updates.',
      verified: true,
    },
    {
      icon: Database,
      title: 'Encrypted Storage',
      description: 'All data is stored with encryption at rest. Authentication uses JWT tokens with secure, httpOnly cookies. Passwords are hashed with bcrypt before storage.',
      verified: true,
    },
    {
      icon: Eye,
      title: 'You Control Visibility',
      description: 'Your sessions are private by default. You choose if and when to share feedback. No public profiles, no leaderboards, no social features unless you opt in.',
      verified: true,
    },
    {
      icon: Trash2,
      title: 'Delete Anytime',
      description: 'You can delete individual sessions or your entire account from settings. Deletion removes all associated data from our systems within 30 days.',
      verified: true,
    },
    {
      icon: Globe,
      title: 'Third-Party AI Processing',
      description: 'Interview responses are sent to Google\'s Gemini API for question generation and feedback. Review Google\'s data policy for their handling practices.',
      verified: false,
      note: 'We send only the minimum necessary data for each request.',
    },
  ];

  const dataTypes = [
    { type: 'Account Info', examples: 'Name, email, role, experience level', retention: 'Until account deletion' },
    { type: 'Interview Sessions', examples: 'Questions, your answers (text/voice), timestamps', retention: 'Until session deletion' },
    { type: 'Transcripts', examples: 'Speech-to-text output from your voice answers', retention: 'Until session deletion' },
    { type: 'AI Feedback', examples: 'Scores, strengths, improvements, recommendations', retention: 'Until session deletion' },
    { type: 'Auth Tokens', examples: 'JWT access/refresh tokens in secure cookies', retention: 'Session duration + refresh period' },
  ];

  return (
    <section id="privacy" className={cn('py-20 sm:py-28 bg-slate-50', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Your Preparation Is Personal. Your Privacy Should Be Too.</h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            We believe interview practice should be private by default. Here's exactly how we handle your data.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {privacyPoints.map((point, index) => (
            <div
              key={index}
              className={cn('card-base p-6 md:p-8 flex gap-4', !point.verified && 'border-amber-200 bg-amber-50/30')}
            >
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                point.verified ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
              )}>
                <point.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-slate-900">{point.title}</h2>
                  {point.verified ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-700 font-medium">
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                      See Note
                    </span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed">{point.description}</p>
                {point.note && (
                  <p className="text-sm text-amber-700 mt-2 font-medium">{point.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="card-base p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Data We Collect & Retention</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 font-medium text-slate-700">Data Type</th>
                  <th className="text-left py-3 font-medium text-slate-700">Examples</th>
                  <th className="text-left py-3 font-medium text-slate-700">Retention</th>
                </tr>
              </thead>
              <tbody>
                {dataTypes.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 font-medium text-slate-900">{row.type}</td>
                    <td className="py-3 text-slate-600">{row.examples}</td>
                    <td className="py-3 text-slate-600">{row.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-base p-6 mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="font-semibold text-blue-800">Legal Documents</h2>
          </div>
          <p className="text-blue-700 mb-4">
            For complete details, please review our legal documents:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-600 hover:underline font-medium">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-blue-600 hover:underline font-medium">
              Cookie Policy
            </Link>
          </div>
          <p className="text-xs text-blue-500 mt-4">
            Note: If these pages return 404, the documents are being finalized. Contact support for current versions.
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            <strong>Transparency note:</strong> We only claim privacy protections that are implemented in the current codebase.
            Encryption standards, compliance certifications, and specific regulatory adherence (GDPR, DPDP)
            should be verified against the actual implementation. This section will be updated as our security posture evolves.
          </p>
        </div>
      </div>
    </section>
  );
}