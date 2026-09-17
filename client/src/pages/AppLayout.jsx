import React from 'react';
import { useLocation } from 'react-router-dom';
import ColorBends from "./ColorBends";

const AppLayout = ({ children }) => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  const isChatPage = location.pathname === '/chat';

  return (
    <div
      className={
        isChatPage
          ? 'fixed inset-0 w-screen h-screen overflow-hidden bg-[#0a0b10]'
          : 'relative w-full min-h-screen bg-[#0a0b10]'
      }
    >
      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: isAuthPage ? 1 : 0.3,
          transition: 'opacity 0.7s',
        }}
      >
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={77}
          speed={isAuthPage ? 0.25 : 0.12}
          scale={1.4}
          frequency={1}
          warpStrength={isAuthPage ? 1 : 0.6}
          mouseInfluence={1.15}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={isAuthPage ? 1.5 : 0.8}
          bandWidth={6}
          transparent
          autoRotate={-1}
          color="#4235ca"
        />
      </div>

      {/* Content */}
      <div
        className={
          isChatPage
            ? 'relative z-10 w-full h-full'
            : 'relative z-10 w-full'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AppLayout;