import Navbar from '@/components/Navbar';
import PrivacyContent from './Components/PrivacyContent';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <PrivacyContent />
      </div>
    </>
  );
};

export default PrivacyPage;