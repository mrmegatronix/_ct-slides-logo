import React from 'react';
import { SlideData } from '../types';

interface Props {
  data: SlideData;
}

const Slide: React.FC<Props> = ({ data }) => {
  // Check if this is a "Blank" or Logo-only slide or explicitly the Welcome slide
  const isLogoSlide = (!data.title && !data.description) || data.day === 'Welcome';

  return (
    <div className="relative w-full h-full overflow-hidden font-sans bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={data.backgroundImageUrl || data.imageUrl} 
          alt={data.title || 'Brand Background'} 
          className={`w-full h-full object-cover transition-transform duration-[30000ms] ease-linear transform scale-100 ${isLogoSlide ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
          style={{ animation: 'subtleZoom 35s linear infinite alternate' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      <style>{`
        @keyframes slide-in-epic {
          0% { transform: scale(1.2); opacity: 0; filter: blur(20px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px); }
        }
        .animate-epic-in {
          animation: slide-in-epic 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(255,255,255,0.6);
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 50px rgba(245,158,11,0.5); }
          50% { box-shadow: 0 0 80px rgba(245,158,11,0.9); }
        }
        @keyframes pop-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Professional Flame Animations */
        @keyframes flame-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-60px) scale(0.4); opacity: 0; }
        }
        @keyframes flame-wobble {
          0%, 100% { transform: translateX(-50%) skewX(-2deg); }
          50% { transform: translateX(-50%) skewX(2deg); }
        }
        .flame-container {
          filter: url(#gooey);
          background: transparent;
        }
        .flame-particle {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: linear-gradient(to top, #ff6a00, #ffc400 80%);
          border-radius: 50% 50% 20% 20%;
          animation: flame-rise 1.2s infinite ease-in;
        }
      `}</style>

      {/* SVG Filter for Professional Gooey Flame - More robust for web hosts */}
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
          </filter>
          <filter id="flicker-distort">
             <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1">
               <animate attributeName="seed" from="1" to="100" dur="5s" repeatCount="indefinite" />
             </feTurbulence>
             <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
        </defs>
      </svg>

      {/* Content Container - Optimized for TV with 5% margins and Epic Animations */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-[5%] mx-auto text-center space-y-12 overflow-hidden animate-epic-in">
        
        {isLogoSlide ? (
          <div className="animate-pop-in flex flex-col items-center">
            {/* Logo Final Layer */}
            <div className="relative group w-auto h-full max-h-[80%] flex items-center justify-center">
               {/* Ambient Back Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[100px] rounded-full"></div>
               
                <img 
                  src={data.descriptionImageUrl || data.imageUrl}
                  alt="Coasters Tavern Logo" 
                  className="relative w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                  onError={(e) => {
                    // Fallback logic
                    if (e.currentTarget.src.indexOf('Coasters%20Tavern%20Logo.png') !== -1) {
                      e.currentTarget.src = 'images/logo.png'; 
                    }
                  }}
                />

               {/* Professional Lantern Flame - Adjusted for new JPG logo centering */}
               <div className="absolute top-[58%] left-[50.1%] w-[12vh] h-[16vh] -translate-x-1/2 -translate-y-full pointer-events-none flex items-center justify-center">
                  
                  {/* Outer Lantern Glow */}
                  <div className="absolute w-[300%] h-[300%] bg-orange-600/20 blur-[60px] rounded-full mix-blend-screen animate-pulse"></div>

                  {/* Core Flame Visuals */}
                  <div className="relative w-full h-full flame-container overflow-visible" style={{ filter: 'url(#gooey) url(#flicker-distort)' }}>
                    
                    {/* Multiple particles to create organic movement */}
                    <div className="flame-particle" style={{ animationDelay: '0s', width: '50px', height: '70px' }}></div>
                    <div className="flame-particle" style={{ animationDelay: '0.3s', width: '40px', height: '60px', left: '47%' }}></div>
                    <div className="flame-particle" style={{ animationDelay: '0.6s', width: '45px', height: '65px', left: '53%' }}></div>
                    <div className="flame-particle" style={{ animationDelay: '0.9s', width: '35px', height: '55px' }}></div>
                    <div className="flame-particle" style={{ animationDelay: '1.4s', width: '30px', height: '50px', left: '49%' }}></div>

                    {/* Blue/White Hot Core */}
                    <div 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-14 bg-white/90 blur-sm rounded-full mix-blend-overlay"
                      style={{ filter: 'blur(2px)' }}
                    ></div>
                  </div>

                  {/* Top Ember Sparks */}
                  <div className="absolute top-0 w-full h-full overflow-visible">
                      <div className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-ping" style={{ top: '-40%', left: '40%' }}></div>
                      <div className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ top: '-70%', left: '60%', animationDelay: '1s' }}></div>
                  </div>
               </div>
            </div>

            {data.day === 'Welcome' && data.title && (
               <h1 className="mt-12 text-7xl font-serif font-black text-white text-glow">
                 {data.title}
               </h1>
            )}
          </div>
        ) : (
          <>
            {/* Day Tag */}
             <div className="animate-slide-down">
                <span 
                  className="px-14 py-6 rounded-full text-5xl font-black uppercase tracking-[0.2em] border-2 border-white/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                  style={{ 
                    backgroundColor: `${data.highlightColor}40`,
                    borderColor: data.highlightColor,
                    color: '#fff',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    boxShadow: `0 0 40px ${data.highlightColor}60`
                  }}
                >
                  {data.day || 'Special Event'}
                </span>
            </div>

            {/* Main Text Content */}
            <div className="flex flex-col items-center space-y-12 animate-fade-in-up w-full overflow-hidden">
              <h1 className="text-7xl md:text-[9rem] font-serif font-black leading-[1.1] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-glow tracking-tight truncate w-full px-4">
                {data.title}
              </h1>
              
              <div className="h-3 w-80 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)]" style={{ backgroundColor: data.highlightColor || '#f59e0b' }}></div>

              <p className="text-5xl md:text-6.5xl text-gray-100 font-bold leading-tight max-w-[95%] drop-shadow-2xl opacity-95">
                {data.description}
              </p>

              {/* Price Box */}
              {data.price && (
                <div className="mt-12 animate-pop-in">
                  <div 
                    className="relative group rounded-3xl p-[3px] bg-gradient-to-br from-white/80 to-amber-500/50 overflow-hidden"
                    style={{ 
                       animation: 'pulse-glow 3s infinite',
                       boxShadow: `0 0 60px ${data.highlightColor || '#f59e0b'}80`
                    }}
                  >
                     <div className="absolute inset-0 bg-white/20 blur-xl"></div>
                     <div className="relative px-20 py-10 rounded-[21px] backdrop-blur-xl bg-black/50 border border-white/30 flex flex-col items-center justify-center shadow-inner">
                       <span 
                        className="text-7xl md:text-8xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                       >
                         {data.price}
                       </span>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Slide;