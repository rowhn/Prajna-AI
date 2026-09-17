import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ColorBends from './pages/ColorBends';

import store from './store/store';
import AppRoutes from './routes/AppRoutes';
import AppLayout from './pages/AppLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>

        {/* 🌈 GLOBAL LAYOUT WRAPPER */}
        <AppLayout>
          <AppRoutes />
        </AppLayout>

        {/* TOASTER */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e1e2e',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />

      </BrowserRouter>
    </Provider>
  );
}

export default App;