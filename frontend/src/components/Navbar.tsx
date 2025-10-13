import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoSvg from '../public/logo.svg';
import { User, LogOut, User2 } from 'lucide-react';
import { Button } from './ui/button';
import useAuthStore from '@/store/AuthStrore';

const Navbar = () => {
  const { authState, logout } = useAuthStore(); 
  const user = authState.user;
  const userId = authState.user?._id;

  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    logout(); 
    navigate('/sign-in');
    setDropdownOpen(false);
  };

  const handleNavigate = () => {
    navigate('/sign-in');
  };

  return (
    <div className="bg-white/5 z-10 fixed top-0 left-0 w-full p-3">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logoSvg} alt="logo" width={38} height={32} />
            <h2 className="text-primary-100">IntelliPrep</h2>
          </Link>
        </div>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 mr-2 cursor-pointer"
              onClick={handleToggleDropdown}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <h1 className="text-white">{user?.name}</h1>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                <Button
                  onClick={handleViewProfile}
                  className="flex items-center gap-2 w-full px-4 py-2 bg-white/5 text-gray-700 hover:bg-gray-100"
                >
                  <User2 className="w-4 h-4" /> View Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 bg-white/5 text-red-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={handleNavigate}
            className="bg-gradient-to-r from-violet-400 to-slate-500 font-bold"
          >
            Login
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
