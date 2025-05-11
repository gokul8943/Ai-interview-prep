import { Link } from 'react-router-dom';
import logoSvg from '../public/logo.svg';

const Navbar = () => {
  return (
    <div className=" bg-white/5 z-10 fixed top-0 left-0 w-full p-3">
      <nav>
        <Link to="/" className="flex items-center gap-2">
          <img src={logoSvg} alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">IntelliPrep</h2>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
