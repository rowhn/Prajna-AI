import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        margin: 0,
        height: '100vh',
        width: '100vw',
        background: '#14161a',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Text block */}
      <div
        style={{
          padding: '6vh 6vw 0',
          color: '#f5f4f0',
          zIndex: 5,
        }}
      >
        <p style={{ margin: 0, fontSize: 'clamp(15px, 1.6vw, 19px)', lineHeight: 1.6 }}>
          Sorry, this page{' '}
          <span
            style={{
              textDecoration: 'underline',
              textDecorationColor: '#6366f1',
              textDecorationThickness: '2px',
              textUnderlineOffset: '3px',
            }}
          >
            doesn't exist...
          </span>
        </p>
        <p style={{ margin: 0, fontSize: 'clamp(15px, 1.6vw, 19px)', lineHeight: 1.6, color: 'rgba(245,244,240,0.6)' }}>
          But don't worry, there are many others!
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '22px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            background: '#2b3138',
            color: '#f5f4f0',
            padding: '11px 11px 11px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            border: '1px solid rgba(99,102,241,0.15)',
            fontFamily: 'inherit',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#343b44')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#2b3138')}
        >
          Go back to home
          <span
            style={{
              background: '#6366f1',
              color: '#14161a',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
            }}
          >
            &#8594;
          </span>
        </button>
      </div>

      {/* 404 glyph, fills remaining space and never overflows viewport */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '460px',
            height: '460px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <svg
          viewBox="0 0 1200 560"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
          style={{ width: '100%', maxWidth: '1400px', height: '100%' }}
        >
          {/* "4" */}
          <path
            d="M300 210 L145 430 L145 465 L305 465 L305 550 L370 550 L370 465 L410 465 L410 410 L370 410 L370 210 Z
               M305 280 L305 410 L215 410 Z"
            fill="#6366f1"
            fillRule="evenodd"
          />

          {/* "0" */}
          <path
            d="M600 200
               C 500 200 440 280 440 380
               C 440 480 500 560 600 560
               C 700 560 760 480 760 380
               C 760 280 700 200 600 200 Z
               M600 280
               C 650 280 680 325 680 380
               C 680 435 650 480 600 480
               C 550 480 520 435 520 380
               C 520 325 550 280 600 280 Z"
            fill="#6366f1"
            fillRule="evenodd"
          />

          {/* "4" (second, tilted) */}
          <g transform="rotate(-3 985 365)">
            <path
              d="M985 180 L820 430 L820 465 L985 465 L985 550 L1050 550 L1050 465 L1090 465 L1090 410 L1050 410 L1050 180 Z
                 M985 260 L985 410 L890 410 Z"
              fill="#6366f1"
              fillRule="evenodd"
            />
          </g>

          {/* Hand-drawn corner accents at stroke bends */}
          <g stroke="#6366f1" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85">
            <path d="M290 230 L300 210 L325 218" />
            <path d="M115 452 L145 452" />
            <path d="M355 550 L355 578" />
            <path d="M550 245 L525 275" />
            <path d="M527 420 L550 440" />
            <path d="M665 420 L688 400" />
            <path d="M975 200 L1005 182" />
            <path d="M1115 320 L1115 355" />
            <path d="M865 400 L888 420" />
            <path d="M1035 550 L1035 578" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default NotFound;