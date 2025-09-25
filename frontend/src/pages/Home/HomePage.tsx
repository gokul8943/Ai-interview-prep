import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import robotpng from '../../public/robot.png'
import InstructionModal from '@/components/modal/InstructionModa';
import FeaturesSection from './Components/FeatureSection';
import HowItWorks from './Components/HowItWorks';
import Footer from './Components/Footer';
import useAuthStore from '@/store/AuthStrore';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { authState } = useAuthStore()
  const user = authState.user
  const handleClose = () => setIsModalOpen(false); // ✅ Add this

  return (
    <>
      {/* CTA Section */}
      <section className=" flex justify-between items-center  px-16 py-4 max-sm:px-4">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className='text-white drop-shadow-blue-700 drop-shadow-2xl text-4xl font-bold'>GET Interview-Ready with AI-powered Practice & Feedback</h2>
          <p className="text-lg">Practice on real interview questions & get instant feedback</p>

          <Button
            className="btn-primary max-sm:w-full"
            onClick={() => {
              if (user) {
                navigate('/create-interview')
              } else {
                navigate('/sign-in')
              }
            }}
          >
            Start an Interview
          </Button>

        </div>
        <img
          src={robotpng}
          alt="Robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <FeaturesSection />

      <HowItWorks />

      <Footer />
      <InstructionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        type="create-interview"
      />

    </>
  );
};

export default HomePage;
