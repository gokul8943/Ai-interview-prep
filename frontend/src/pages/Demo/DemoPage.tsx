import Navbar from '@/components/Navbar';
import DemoContent from './Components/DemoContent';

const DemoPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <DemoContent />
      </div>
    </>
  );
};

export default DemoPage;