import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';
import NewChatButton from './NewChatButton';
import ConversationItem from './ConversationItem';
import UserCard from './UserCard';
import Loader from '../common/Loader';
import Logo from '../common/Logo';
import { fetchConversations } from '../../store/chat/chatSlice';
import { toggleSidebar } from '../../store/ui/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { conversations, loading } = useSelector((state) => state.chat);
  const { sidebarOpen } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-10 md:hidden backdrop-blur-sm"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <aside className={`
        fixed md:relative z-20 h-full flex flex-col
        w-64 border-r border-white/5
        bg-[#0d0e16]/95 backdrop-blur-xl
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="font-bold text-white tracking-wide">प्रज्ञा AI</span>
          </div>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="md:hidden text-white/40 hover:text-white transition-colors"
          >
            <IoCloseOutline size={20} />
          </button>
        </div>

        {/* New Chat */}
        <div className="px-3 pt-3 pb-1">
          <NewChatButton />
        </div>

        {/* Conversations Label */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest">
            Recent
          </p>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader size="sm" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-white/20 text-sm">No conversations yet</p>
              <p className="text-white/10 text-xs mt-1">Start a new chat above</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <ConversationItem key={conv._id} conversation={conv} />
            ))
          )}
        </div>

        {/* User Card */}
        <div className="p-3 border-t border-white/5">
          <UserCard />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;