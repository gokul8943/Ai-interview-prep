import React from 'react';
import { cn } from '@/lib/utils';
import aiAvatar from '../public/ai-avatar.png';

const CallStatus = {
  INACTIVE: "INACTIVE",
  CONNECTING: "CONNECTING",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
} as const;

type CallStatus = (typeof CallStatus)[keyof typeof CallStatus];


interface AgentProps {
  userName: string;
}

const Agent: React.FC<AgentProps> = ({ userName }) => {
  const isSpeaking = true;
  const callStatus = CallStatus.ACTIVE;
  const messages = [
    "Hello, how are you?",
    "I am good, how are you?",
  ];

  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view gap-6 p-[40px]">
        <div className="card-interviewer">
          <div className="avatar">
            <img src={aiAvatar} alt="AI Avatar" width={65} height={54} className="object-cover" />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <img src="/user-avatar.png" alt="User Avatar" width={120} height={120} className="rounded-full object-cover size-[120px]" />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center pt-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
