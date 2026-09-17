import React from 'react';
import { RiRobot2Line } from 'react-icons/ri';

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 px-4 py-3 message-enter">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20 mt-1">
        <RiRobot2Line size={15} className="text-white" />
      </div>
      <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;