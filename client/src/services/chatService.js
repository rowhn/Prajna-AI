import api from './axios';

export const chatService = {
  createConversation: async (title) => {
    const response = await api.post('/chat/conversation', { title });
    return response.data;
  },

  sendMessage: async (conversationId, message) => {
    const response = await api.post('/chat/send', { conversationId, message });
    return response.data;
  },

  getConversations: async () => {
    const response = await api.get('/chat/conversations');
    return response.data;
  },

  getMessages: async (conversationId) => {
    const response = await api.get(`/chat/conversation/${conversationId}`);
    return response.data;
  },

  deleteConversation: async (conversationId) => {
    const response = await api.delete(`/chat/conversation/${conversationId}`);
    return response.data;
  },
};