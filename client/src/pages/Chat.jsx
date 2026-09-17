import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMenuOutline } from 'react-icons/io5';
import Sidebar from '../components/sidebar/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { toggleSidebar } from '../store/ui/uiSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);

  return (
    <div className="h-screen flex bg-[#0a0b10] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-white/[0.02]">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="md:hidden text-white/50 hover:text-white transition-colors"
          >
            <IoMenuOutline size={22} />
          </button>
          <h2 className="text-white/60 text-sm font-medium truncate tracking-wide">
            {activeConversation?.title || 'New Conversation'}
          </h2>
        </div>
        <ChatWindow />
      </main>
    </div>
  );
};

export default Chat;