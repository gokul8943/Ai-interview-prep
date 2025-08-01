import { Link, useNavigate } from 'react-router-dom';
import logoSvg from '../public/logo.svg';
import { User } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate()
console.log(setIsLoggedIn);

const handleNavigate = () =>{
  navigate('/sign-in')
}

  return (
    <div className="bg-white/5 z-10 fixed top-0 left-0 w-full p-3">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logoSvg} alt="logo" width={38} height={32} />
            <h2 className="text-primary-100">IntelliPrep</h2>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        ) : (
          <div>
            <Button 
            onClick={handleNavigate}
            className='bg-gradient-to-r from-violet-400 to-slate-500 font-bold '>Login</Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
