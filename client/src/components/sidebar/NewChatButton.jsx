import React from 'react';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setActiveConversation, clearMessages } from '../../store/chat/chatSlice';

const NewChatButton = () => {
  const dispatch = useDispatch();

  const handleNewChat = () => {
    dispatch(setActiveConversation(null));
    dispatch(clearMessages());
  };

  return (
    <button
      onClick={handleNewChat}
      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-200 text-indigo-300 hover:text-indigo-200 text-sm font-medium group"
    >
      <div className="w-5 h-5 rounded-md bg-indigo-500/20 group-hover:bg-indigo-500/30 flex items-center justify-center transition-colors">
        <IoAdd size={14} />
      </div>
      New Chat
    </button>
  );
};

export default NewChatButton;