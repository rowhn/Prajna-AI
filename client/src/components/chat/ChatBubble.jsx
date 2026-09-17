import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoCopyOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { RiRobot2Line } from 'react-icons/ri';
import MarkdownRenderer from './MarkdownRenderer';
import Avatar from '../common/Avatar';
import { formatTime } from '../../utils/formatDate';

const ChatBubble = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-2 sm:gap-3 px-2 sm:px-4 py-2.5 group message-enter ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <Avatar name={user?.name} size="sm" />
        ) : (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <RiRobot2Line size={14} className="text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[78%] md:max-w-[72%] min-w-0 ${isUser ? 'items-end' : 'items-start'}`}>

        {/* Name */}
        <span className="text-xs text-white/20 px-1">
          {isUser ? user?.name?.split(' ')[0] : 'Prajñā AI'}
        </span>

        {/* Bubble */}
        <div className={`
          px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-sm leading-relaxed
          max-w-full overflow-hidden
          ${isUser
            ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20'
            : 'bg-white/[0.04] border border-white/5 text-white/85 rounded-tl-none'
          }
        `}>
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        {/* Footer */}
        <div className={`
          flex items-center gap-2 px-1
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          ${isUser ? 'flex-row-reverse' : 'flex-row'}
        `}>
          <span className="text-white/20 text-xs">
            {message.createdAt ? formatTime(message.createdAt) : ''}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-white/20 hover:text-white/60 transition-colors text-xs"
            >
              {copied
                ? <><IoCheckmarkOutline size={12} /><span>Copied</span></>
                : <><IoCopyOutline size={12} /><span>Copy</span></>
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;