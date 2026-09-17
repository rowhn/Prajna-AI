import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '../../services/chatService';

export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatService.getConversations();
      return response.conversations;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createConversation = createAsyncThunk(
  'chat/createConversation',
  async (title, { rejectWithValue }) => {
    try {
      const response = await chatService.createConversation(title);
      return response.conversation;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await chatService.getMessages(conversationId);
      return { conversationId, messages: response.messages };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ conversationId, message }, { rejectWithValue }) => {
    try {
      const response = await chatService.sendMessage(conversationId, message);
      return { ...response, userMessage: message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteConversation = createAsyncThunk(
  'chat/deleteConversation',
  async (conversationId, { rejectWithValue }) => {
    try {
      await chatService.deleteConversation(conversationId);
      return conversationId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    activeConversation: null,
    messages: [],
    loading: false,
    sending: false,
    error: null,
  },
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
      state.messages = [];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        _id: `temp-${Date.now()}`,
        role: 'user',
        content: action.payload,
        createdAt: new Date().toISOString(),
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
        state.activeConversation = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;

        // Remove ALL temp messages
        state.messages = state.messages.filter(
          (m) => !String(m._id).startsWith('temp-')
        );

        // Add user message
        state.messages.push({
          _id: `user-${Date.now()}`,
          role: 'user',
          content: action.payload.userMessage,
          createdAt: new Date().toISOString(),
        });

        // Add AI response
        state.messages.push({
          _id: `ai-${Date.now()}`,
          role: 'model',
          content: action.payload.response,
          createdAt: new Date().toISOString(),
        });

        // Update sidebar conversation
        const conv = state.conversations.find(
          (c) => c._id === state.activeConversation?._id
        );
        if (conv) {
          conv.lastMessage = action.payload.userMessage?.substring(0, 60);
          conv.updatedAt = new Date().toISOString();
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
        // Remove temp message on error
        state.messages = state.messages.filter(
          (m) => !String(m._id).startsWith('temp-')
        );
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.conversations = state.conversations.filter(
          (c) => c._id !== action.payload
        );
        if (state.activeConversation?._id === action.payload) {
          state.activeConversation = null;
          state.messages = [];
        }
      });
  },
});

export const {
  setActiveConversation,
  clearMessages,
  addUserMessage,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;