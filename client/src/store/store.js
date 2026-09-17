import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import chatReducer from './chat/chatSlice';
import uiReducer from './ui/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    ui: uiReducer,
  },
});

export default store;