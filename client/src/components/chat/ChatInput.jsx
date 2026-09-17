import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';

const ChatInput = ({ onSend, disabled, placeholder = 'Ask Prajñā AI anything...' }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [message]);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 pb-6 pt-3">
      <div className="max-w-3xl mx-auto">

        {/* Input Container */}
        <div
          className="flex items-end gap-3 rounded-2xl px-4 py-3 transition-all duration-200"
          style={{
            background: 'rgba(255, 255, 255, 0)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            style={{
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.73)',
              outline: 'none',
              resize: 'none',
              border: 'none',
              width: '100%',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              maxHeight: '200px',
              fontFamily: 'Inter, sans-serif',
              fontSize:'18px',
              height:'32px'
            }}
            className="placeholder-white/25 disabled:opacity-50"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: message.trim() && !disabled
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                : 'rgba(255,255,255,0.08)',
              border: 'none',
              cursor: message.trim() && !disabled ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              boxShadow: message.trim() && !disabled
                ? '0 4px 15px rgba(99,102,241,0.4)'
                : 'none',
            }}
          >
            <IoSend
              size={15}
              color={message.trim() && !disabled ? 'white' : 'rgba(255, 255, 255, 0.24)'}
            />
          </button>
        </div>

        {/* Hint */}
        <p
          className="text-center text-xs mt-2.5"
          style={{ color: 'rgba(255, 255, 255, 0.33)' }}
        >
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInput;