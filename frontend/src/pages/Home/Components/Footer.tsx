import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import logoSvg from '../../../public/logo.svg';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Interview Roles', href: '#roles' },
      { label: 'Pricing', href: '#pricing' },
    ],
    resources: [
      { label: 'Interview Preparation', href: '/create-interview' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Sample Feedback', href: '#feedback-preview' },
      { label: 'Privacy & Security', href: '#privacy' },
    ],
    company: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Support', href: '#support' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:support@intelliprep.ai', label: 'Email' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <footer className={cn('bg-navy-900 text-slate-300', className)}>
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="IntelliPrep Home">
              <img src={logoSvg} alt="" width={38} height={32} />
              <span className="font-bold text-xl text-white">IntelliPrep</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              AI-powered interview preparation for developers. Practice real questions, get structured feedback, walk in with confidence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Product">
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-navy-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {currentYear} IntelliPrep. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-sm text-slate-500 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}