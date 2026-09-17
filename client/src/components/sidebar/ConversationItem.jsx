import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IoChatbubbleOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import {
  setActiveConversation,
  fetchMessages,
  deleteConversation,
} from '../../store/chat/chatSlice';
import { truncate } from '../../utils/helpers';

const ConversationItem = ({ conversation }) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);

  const isActive = activeConversation?._id === conversation._id;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelect = () => {
    dispatch(setActiveConversation(conversation));
    dispatch(fetchMessages(conversation._id));
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteConversation(conversation._id));
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        onClick={handleSelect}
        className={`
          relative group flex items-center gap-3
          px-3 py-2.5 rounded-xl cursor-pointer
          transition-all duration-200
          ${
            isActive
              ? 'bg-indigo-600/15 border border-indigo-500/25'
              : 'hover:bg-white/[0.04] border border-transparent'
          }
        `}
      >
        {/* Chat Icon */}
        <IoChatbubbleOutline
          size={16}
          className={`flex-shrink-0 ${
            isActive ? 'text-indigo-400' : 'text-white/30'
          }`}
        />

        {/* Conversation */}
        <div className="flex-1 min-w-0 pr-8">
          <p
            className={`text-sm truncate ${
              isActive
                ? 'text-white'
                : 'text-white/70 group-hover:text-white'
            }`}
          >
            {truncate(conversation.title, 28)}
          </p>

          {conversation.lastMessage && (
            <p className="text-xs text-white/30 truncate mt-0.5">
              {truncate(conversation.lastMessage, 24)}
            </p>
          )}
        </div>

        {/* Delete Icon */}
        <button
          onClick={handleDeleteClick}
          title="Delete conversation"
          className="
            absolute right-3
            text-white/35
            hover:text-red-500
            transition-all duration-200

            opacity-100
            lg:opacity-0
            lg:group-hover:opacity-100
          "
        >
          <IoTrashOutline size={17} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#11131c] p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
          >
            <h2 className="text-xl font-semibold text-white">
              Delete Conversation
            </h2>

            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Are you sure you want to delete this conversation?
              <br />
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationItem;