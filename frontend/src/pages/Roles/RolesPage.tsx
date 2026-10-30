import Navbar from '@/components/Navbar';
import RolesContent from './Components/RolesContent';

const RolesPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <RolesContent />
      </div>
    </>
  );
};

export default RolesPage;