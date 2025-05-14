import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

import robotpng from '../public/robot.png'

const HomePage: React.FC = () => {
  return (
    <>
      {/* CTA Section */}
      <section className=" flex justify-between items-center  px-16 py-6 max-sm:px-4">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className='text-white drop-shadow-blue-700 drop-shadow-2xl text-4xl font-bold'>GET Interview-Ready with AI-powered Practice & Feedback</h2>
          <p className="text-lg">Practice on real interview questions & get instant feedback</p>
          <Link to="/interview">
            <Button className="btn-primary max-sm:w-full">Start an Interview</Button>
          </Link>
        </div>

        <img
          src={robotpng}
          alt="Robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Your Interview Section */}
      <section className="flex flex-col gap-6 mt-8 root-layout p-4">
        <h2 className='text-white font-bold '>Your Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard interviewId={''} {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      {/* Take an Interview Section */}
      <section className="flex flex-col gap-6 mt-8 p-4">
        <h2 className='text-white font-bold'>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard interviewId={''} {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
