import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import Loader from '../common/Loader';
import DotField from './DotField';
import {
  sendMessage,
  createConversation,
  addUserMessage,
} from '../../store/chat/chatSlice';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { messages, activeConversation, sending, loading } = useSelector(
    (state) => state.chat
  );
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const handleSend = async (message) => {
    let conversationId = activeConversation?._id;

    dispatch(addUserMessage(message));

    if (!conversationId) {
      const result = await dispatch(
        createConversation(message.substring(0, 50))
      );
      if (result.payload) {
        conversationId = result.payload._id;
      }
    }

    if (conversationId) {
      dispatch(sendMessage({ conversationId, message }));
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader size="lg" text="Loading messages..." />
      </div>
    );
  }

  const isEmpty = messages.length === 0 && !sending;

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">

      {/* DotField Background — only show when chat is empty */}
      {isEmpty && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly
            gradientFrom="#A855F7"
            gradientTo="#B497CF"
            glowColor="#120F17"
          />
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-1 relative z-10">
        {isEmpty ? (
          <SuggestedQuestions onSelect={handleSend} />
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatBubble key={message._id || index} message={message} />
            ))}
            {sending && <TypingIndicator />}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="relative z-10">
        <ChatInput onSend={handleSend} disabled={sending} />
      </div>
    </div>
  );
};

export default ChatWindow;