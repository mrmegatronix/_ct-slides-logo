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
          src={data.imageUrl} 
          alt={data.title || 'Brand Background'} 
          className={`w-full h-full object-cover transition-transform duration-[30000ms] ease-linear transform scale-100 ${isLogoSlide ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
          style={{ animation: 'subtleZoom 35s linear infinite alternate' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      <style>{`
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(255,255,255,0.4);
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(245,158,11,0.4); }
          50% { box-shadow: 0 0 70px rgba(245,158,11,0.8); }
        }
        @keyframes pop-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Flame Flicker Animation */
        @keyframes flicker {
          0% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); filter: brightness(1); }
          15% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.05); filter: brightness(1.1); }
          30% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.95); filter: brightness(0.9); }
          45% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.02); filter: brightness(1.05); }
          60% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.08); filter: brightness(1.2); }
          75% { opacity: 0.75; transform: translate(-50%, -50%) scale(0.98); filter: brightness(0.95); }
          90% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.03); filter: brightness(1.1); }
          100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); filter: brightness(1); }
        }
      `}</style>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-8 md:p-16 max-w-[90%] mx-auto text-center space-y-12">
        
        {isLogoSlide ? (
          <div className="animate-pop-in flex flex-col items-center">
            {/* Logo Final Layer */}
            <div className="relative group w-auto h-[70vh]">
               {/* Ambient Back Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-500/10 blur-[100px] rounded-full"></div>
               
               <img 
                 src={data.imageUrl}
                 alt="Coasters Tavern Logo" 
                 className="relative w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                 onError={(e) => {
                   // Fallback logic
                   if (e.currentTarget.src.indexOf('Coasters%20Tavern%20Logo.png') !== -1) {
                     e.currentTarget.src = 'images/logo.png'; 
                   }
                 }}
               />

               {/* Lantern Flame Effect - Positioned relative to the container which matches the image size */}
               {/* Assuming the lantern is dead center in the image */}
               <div className="absolute top-[52%] left-[50%] w-[12vh] h-[16vh] pointer-events-none">
                  {/* Outer Glow (Orange) */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-full h-full bg-orange-600/40 blur-xl rounded-full mix-blend-screen"
                    style={{ animation: 'flicker 0.2s infinite alternate' }}
                  ></div>
                  
                  {/* Inner Flame (Yellow/White) */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-[60%] h-[70%] bg-gradient-to-t from-orange-400 via-yellow-200 to-white/80 blur-lg rounded-full mix-blend-screen"
                    style={{ animation: 'flicker 0.1s infinite alternate-reverse' }}
                  ></div>
                  
                   {/* Core Hotspot */}
                  <div 
                    className="absolute top-[60%] left-1/2 w-[40%] h-[40%] bg-white blur-md rounded-full mix-blend-overlay"
                    style={{ animation: 'flicker 0.15s infinite alternate' }}
                  ></div>
               </div>
            </div>

            {data.day === 'Welcome' && data.title && (
               <h1 className="mt-8 text-5xl font-serif font-black text-white text-glow">
                 {data.title}
               </h1>
            )}
          </div>
        ) : (
          <>
            {/* Day Tag */}
            <div className="animate-slide-down">
                <span 
                  className="px-10 py-4 rounded-full text-4xl font-black uppercase tracking-[0.2em] border-2 border-white/40 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  style={{ 
                    backgroundColor: `${data.highlightColor}40`,
                    borderColor: data.highlightColor,
                    color: '#fff',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    boxShadow: `0 0 30px ${data.highlightColor}60`
                  }}
                >
                  {data.day || 'Special Event'}
                </span>
            </div>

            {/* Main Text Content */}
            <div className="flex flex-col items-center space-y-8 animate-fade-in-up">
              <h1 className="text-6xl md:text-8xl font-serif font-black leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] text-glow tracking-wide">
                {data.title}
              </h1>
              
              <div className="h-2 w-48 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.8)]" style={{ backgroundColor: data.highlightColor || '#f59e0b' }}></div>

              <p className="text-4xl md:text-5xl text-gray-100 font-bold leading-relaxed max-w-7xl drop-shadow-lg opacity-90">
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
                     <div className="relative px-16 py-8 rounded-[21px] backdrop-blur-xl bg-black/50 border border-white/30 flex flex-col items-center justify-center shadow-inner">
                       <span 
                        className="text-6xl md:text-7xl font-black text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
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