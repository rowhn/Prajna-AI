import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Brain, FileText, MessageSquare, Shield, Search, Sparkles, X } from "lucide-react";

function AboutModal({ onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(10,11,16,0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '200px', height: '200px',
          background: 'rgba(99,102,241,0.12)',
          borderRadius: '50%', filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px',
          width: '200px', height: '200px',
          background: 'rgba(236,72,153,0.07)',
          borderRadius: '50%', filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', right: '14px', top: '14px',
            zIndex: 20, padding: '6px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div style={{ padding: '24px 28px 26px', position: 'relative', zIndex: 10 }}>

          {/* Title */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '10px', marginBottom: '12px', paddingRight: '36px',
          }}>
            <Brain style={{ color: '#818cf8', flexShrink: 0 }} size={22} />
            <h1 style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: 0, color: 'white',
            }}>
              About{" "}
              <span style={{
                background: 'linear-gradient(135deg, #818cf8, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Prajñā AI
              </span>
            </h1>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.75rem, 1vw, 0.88rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 300,
            marginBottom: '16px',
            maxWidth: '660px',
          }}>
            <span style={{ color: '#a5b4fc', fontWeight: 600 }}>Prajñā AI</span> combines
            modern Large Language Models with Retrieval-Augmented Generation (RAG)
            to provide accurate, document-aware answers while functioning as a
            powerful general-purpose AI assistant.
          </p>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            marginBottom: '14px',
          }}>
            {[
              {
                icon: <MessageSquare size={16} />,
                title: "AI Conversations",
                desc: "Ask anything—from programming and interview prep to general knowledge.",
              },
              {
                icon: <FileText size={16} />,
                title: "Context-Aware Responses",
                desc: "Powered by intelligent context retrieval to deliver relevant and meaningful answers.",
              },
              {
                icon: <Search size={16} />,
                title: "Semantic Search",
                desc: "Uses embeddings and cosine similarity to find the most relevant info.",
              },
              {
                icon: <Shield size={16} />,
                title: "Secure & Private",
                desc: "Your conversations and files are securely linked to your account.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div style={{ color: '#818cf8', marginBottom: '6px' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontWeight: 600, color: 'white',
                  marginBottom: '4px', fontSize: '0.82rem',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '0.72rem',
                  lineHeight: 1.55, margin: 0,
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Why Prajña Banner */}
          <div style={{
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #4f46e5, rgba(236,72,153,0.85))',
            padding: '14px 18px',
            boxShadow: '0 6px 24px rgba(79,70,229,0.25)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '7px', marginBottom: '6px',
            }}>
              <Sparkles size={13} color="white" />
              <h2 style={{
                fontWeight: 700, fontSize: '0.85rem',
                margin: 0, color: 'white',
              }}>
                Why Prajñā AI?
              </h2>
            </div>
            <p style={{
              fontSize: '0.78rem', lineHeight: 1.65,
              color: 'rgba(255,255,255,0.88)', margin: 0,
            }}>
              Unlike traditional chatbots, Prajñā AI answers general questions,
              remembers your conversations, understands uploaded documents, and
              combines both to provide intelligent, context-aware responses.
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About({ onClose }) {
  return createPortal(<AboutModal onClose={onClose} />, document.body);
}