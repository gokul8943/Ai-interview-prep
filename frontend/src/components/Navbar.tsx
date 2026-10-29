import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoSvg from '../public/logo.svg';
import { User, LogOut, User2, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import useAuthStore from '@/store/AuthStrore';
import { logout as logoutApi } from '@/services/UserAPi/AuthApi';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { authState, logout } = useAuthStore();
  const user = authState.user;
  const userId = authState.user?._id;

  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    navigate(`/profile/${userId}`);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logoutApi()
      .catch(() => undefined)
      .finally(() => {
        logout();
        navigate('/sign-in');
      });
    setDropdownOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Interview Roles', href: '#roles' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2" aria-label="IntelliPrep Home">
              <img src={logoSvg} alt="" width={38} height={32} />
              <span className="font-bold text-xl text-slate-900">IntelliPrep</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href.replace('#', ''))}
                className={cn(
                  'nav-link',
                  location.hash === link.href && 'nav-link-active'
                )}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate('/sign-in')}
              >
                Log In
              </Button>
              <Button
                className="btn-primary"
                onClick={() => handleNavigate(user ? '/create-interview' : '/sign-in')}
              >
                {user ? 'Dashboard' : 'Start Free Interview'}
              </Button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleToggleDropdown}
                >
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden z-50 animate-slide-down">
                    <Button
                      onClick={handleViewProfile}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-100"
                    >
                      <User2 className="w-4 h-4" /> View Profile
                    </Button>
                    <Button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-slate-100"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate('/sign-in')}
              >
                Log In
              </Button>
            )}
            <Button
              className="btn-primary"
              onClick={() => handleNavigate(user ? '/create-interview' : '/sign-in')}
            >
              {user ? 'Dashboard' : 'Start Free Interview'}
            </Button>
            <button
              className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-slate-200 animate-slide-down">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href.replace('#', ''))}
                  className="text-left text-base font-medium text-slate-600 hover:text-slate-900 py-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleNavigate('/sign-in')}
                >
                  Log In
                </Button>
                <Button
                  className="btn-primary w-full justify-start"
                  onClick={() => handleNavigate(user ? '/create-interview' : '/sign-in')}
                >
                  {user ? 'Dashboard' : 'Start Free Interview'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;