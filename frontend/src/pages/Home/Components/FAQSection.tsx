import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  className?: string;
}

export default function FAQSection({ className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is IntelliPrep?',
      answer: 'IntelliPrep is an AI-powered interview preparation platform. You select your target role, domain, and experience level, then practice with AI-generated questions. After each session, you receive structured feedback with scores, strengths, improvement areas, and actionable recommendations.',
    },
    {
      question: 'Is IntelliPrep free to use?',
      answer: 'Yes, all core features are currently free. This includes access to all 10+ interview domains, 4 experience levels, unlimited practice sessions, voice and text input, and full AI feedback reports. There is no trial period, no credit card required, and no feature limits on the free tier. Premium features may be added in the future, but the current functionality will remain free.',
    },
    {
      question: 'Which interview roles are supported?',
      answer: 'IntelliPrep currently supports 10 technical domains: Frontend Development, Backend Development, Full Stack Development, Mobile Development, DevOps & Cloud, Data Science & Analytics, Machine Learning & AI, Cybersecurity, Blockchain, and Game Development. Each domain includes 5-8 specific topics you can select for targeted practice.',
    },
    {
      question: 'Can I practice technical and HR interviews?',
      answer: 'Yes. Technical interviews are fully supported across all domains. HR/behavioral interview practice is available as a domain option. System design interviews are supported for senior-level practice. Case studies and aptitude/logic sections are planned for future releases but not yet implemented.',
    },
    {
      question: 'Does IntelliPrep support voice-based interviews?',
      answer: 'Yes. You can answer questions using voice input with real-time speech-to-text transcription (using the Web Speech API). Text input is also available. Voice transcription runs in your browser — audio is not sent to our servers for transcription. The transcribed text is then sent to the AI for feedback generation.',
    },
    {
      question: 'How does the AI generate interview questions?',
      answer: 'When you create an interview, you select a domain, specific topics, experience level, and question count. The backend sends this context to Google\'s Gemini API, which generates relevant questions. Questions are not pulled from a static database — they\'re generated fresh for each session based on your exact configuration.',
    },
    {
      question: 'What kind of feedback will I receive?',
      answer: 'After completing an interview, you receive: (1) Communication score (0-100%) — clarity, articulation, structure; (2) Technical depth score — accuracy and completeness; (3) Answer structure score — organization and flow; (4) Specific strengths demonstrated; (5) Concrete areas for improvement; (6) Overall recommendation summary; (7) Prioritized next steps for your next session.',
    },
    {
      question: 'How accurate is the AI feedback?',
      answer: 'AI feedback is a preparation aid, not a definitive evaluation. It analyzes your response against the question intent and provides structured observations. It may occasionally miss nuance, misjudge depth, or suggest improvements that don\'t apply. Use it as a signal for areas to practice, not as an absolute measure of competence. We recommend combining AI feedback with peer reviews and real interview experience.',
    },
    {
      question: 'Is my interview data private?',
      answer: 'Yes. Your interview responses, transcripts, and feedback are stored in your account and are not shared publicly. We do not use your data for AI model training. Data is encrypted at rest. You can delete individual sessions or your entire account at any time. Third-party AI processing (Gemini API) receives only the minimum data needed for each request — review Google\'s data policy for their practices.',
    },
    {
      question: 'Can colleges and training institutes use IntelliPrep?',
      answer: 'Yes. IntelliPrep can be used by educational institutions for student interview preparation. There\'s no institutional licensing or admin dashboard currently — each student creates their own account. For bulk access or integration requests, please contact us. We\'re exploring institutional features for future releases.',
    },
  ];

  return (
    <section id="faq" className={cn('py-20 sm:py-28 bg-white', className)}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-6">Frequently Asked Questions</h2>
          <p className="section-subheading mx-auto">
            Honest answers about what IntelliPrep does, how it works, and what to expect.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ index, question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="card-base overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-medium text-slate-900 pr-4">{question}</span>
        <span className="flex-shrink-0" aria-hidden="true">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={cn('px-6 overflow-hidden transition-all duration-300', isOpen ? 'pb-5' : 'h-0 opacity-0')}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}