import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { cn, getRandomInterviewCover } from '@/lib/utils';
import DisplayTechIcons from '@/components/DisplayIcons';
import { Button } from './ui/button';

interface InterviewCardProps {
  interviewId: string;
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: string;
}

interface Feedback {
  createdAt: string;
  finalAssessment: string;
  totalScore: number;
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}) => {
  const feedback = null as Feedback | null;

  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;

  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format(
    'MMM DD, YYYY'
  );

  const badgeColor =
    {
      Behavioral: 'bg-light-400',
      Mixed: 'bg-light-600',
      Technical: 'bg-light-800',
    }[normalizedType] || 'bg-light-600';

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview relative p-4">
        {/* Type Badge */}
        <div
          className={cn('absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg', badgeColor)}
        >
          <p className="badge-text">{normalizedType}</p>
        </div>

        {/* Cover Image */}
        <img
          src={getRandomInterviewCover()}
          alt="cover"
          width={90}
          height={90}
          className="rounded-full object-cover size-[90px]"
        />

        {/* Interview Role */}
        <h3 className="mt-5 capitalize">{role} Interview</h3>

        {/* Date & Score */}
        <div className="flex flex-row gap-5 mt-3">
          <div className="flex flex-row gap-2">
            <img src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>{formattedDate}</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <img src="/star.svg" width={22} height={22} alt="star" />
            <p>{feedback?.totalScore || '---'}/100</p>
          </div>
        </div>

        {/* Feedback or Placeholder Text */}
        <p className="line-clamp-2 mt-5">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* Footer */}
        <div className="flex flex-row justify-between mt-5">
          <DisplayTechIcons techStack={techstack} />

          <Link
            to={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}
          >
            <Button className="btn-primary">
              {feedback ? 'Check Feedback' : 'View Interview'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
