import React from 'react';
import { SUGGESTED_QUESTIONS } from '../../utils/constants';
import Logo from '../common/Logo';

const SuggestedQuestions = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 gap-8">
      {/* Logo */}
      <div className="text-center">
        <Logo size={44} className="mx-auto mb-4" />
        <p className="text-white/40 text-sm">What can I help you with today?</p>
      </div>

      {/* Suggested Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="glass p-4 rounded-xl text-left text-sm text-white/70 hover:text-white hover:border-primary-500/50 transition-all duration-200 hover:bg-primary-900/20"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;