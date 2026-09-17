import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { IoArrowForward, IoCodeSlash, IoChatbubbles, IoRocket } from 'react-icons/io5';
import ColorBends from './ColorBends';
import About from './About';
import Logo from '../components/common/Logo';

const Landing = () => {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="relative min-h-screen md:h-screen bg-[#0a0b10] flex flex-col md:overflow-hidden select-none">


      {/* 1. Background WebGL Shader Layer */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={77}
          speed={0.2}
          scale={1.4}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1.15}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
          autoRotate={-1}
          color="#4235ca"
        />
      </div>

      {/* 2. Interactive Foreground Layer */}
      <div className="relative z-10 flex flex-col flex-1 backdrop-blur-[1px]">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5 border-white/5 dynamic-float">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="text-xl font-bold text-white tracking-wide">प्रज्ञा AI</span>
          </div>
          <div className="flex items-center gap-3">

            <button
              onClick={() => setShowAbout(true)}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              About
            </button>

            <AnimatePresence>
              {showAbout && (
                <About onClose={() => setShowAbout(false)} />
              )}
            </AnimatePresence>

            <button
              onClick={() => navigate('/register')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all text-sm"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Area */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-8 my-auto">
          <div className="space-y-4 max-w-3xl transform hover:scale-[1.01] transition-transform duration-500">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-indigo-300 mb-4 backdrop-blur-md">
              <IoRocket size={14} className="animate-bounce" />
              Powered by Google Gemini AI
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
              Your AI
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400"> Developer</span>
              <br />Assistant
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Prajñā AI helps you write better code, understand concepts faster,
              and ace your technical knowledge.
            </p>
          </div>

          <div className="flex items-center gap-4 dynamic-float" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => navigate('/register')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300"
            >
              Start for Free <IoArrowForward />
            </button>
            {/* <button
              onClick={() => navigate('/login')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-base px-8 py-3.5 rounded-2xl backdrop-blur-md transition-all duration-300"
            >
              Sign In
            </button> */}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full mt-3 px-2">
            {[
              { icon: <IoChatbubbles size={24} />, title: 'Smart Conversations', desc: 'Context-aware AI that remembers your conversation history' },
              { icon: <IoCodeSlash size={24} />, title: 'Code Expert', desc: 'Get clean, production-ready code with explanations' },
              { icon: <IoRocket size={24} />, title: 'Interview Ready', desc: 'Practice DSA, system design, and technical concepts' },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-left hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 group cursor-pointer backdrop-blur-md"
                style={{ transform: `translateY(${Math.sin(i) * 4}px)` }}
              >
                <div className="text-indigo-400 mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 tracking-wide">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/50 transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;