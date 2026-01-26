import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Settings, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { SlideData, SLIDE_DURATION_MS } from './types';
import { INITIAL_SLIDES } from './constants';
import Slide from './components/Slide';
import AdminPanel from './components/AdminPanel';

const STORAGE_KEY = 'restaurant_slides_v5'; // Bumped version to force sync

const App: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize from LocalStorage with fallback and versioning
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
        } else {
          throw new Error('Emply slides array');
        }
      } catch (e) {
        setSlides(INITIAL_SLIDES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SLIDES));
      }
    } else {
      setSlides(INITIAL_SLIDES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SLIDES));
    }
  }, []);

  const playlist = useMemo(() => {
    return slides.length > 0 ? slides : INITIAL_SLIDES;
  }, [slides]);

  const currentSlide = playlist[currentIndex] || playlist[0];
  const startTimeRef = useRef<number>(Date.now());

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [playlist.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [playlist.length]);

  useEffect(() => {
    if (!isPlaying || isAdminOpen) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const newProgress = (elapsed / SLIDE_DURATION_MS) * 100;

      if (newProgress >= 100) {
        nextSlide();
      } else {
        setProgress(newProgress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, isAdminOpen, nextSlide]);

  const handleAdminSave = (newSlides: SlideData[]) => {
    setSlides([...newSlides]); // Force new reference
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlides));
    // Reset timer to allow user to see the changed slide immediately
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  if (!currentSlide) return null;

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans group">
      <div className="w-full h-full">
        <Slide key={currentSlide.id} data={currentSlide} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-3 bg-black/40 z-40 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Navigation Controls - Left Side */}
      <div className="absolute top-8 left-8 z-50 flex items-center gap-3 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <button 
          onClick={prevSlide} 
          className="p-3 bg-white/5 hover:bg-amber-600 rounded-xl text-white transition-all active:scale-95"
          title="Previous Slide"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => {
            const nextIsPlaying = !isPlaying;
            setIsPlaying(nextIsPlaying);
            if (nextIsPlaying) {
              startTimeRef.current = Date.now() - (progress / 100) * SLIDE_DURATION_MS;
            }
          }} 
          className="p-3 bg-white/5 hover:bg-amber-600 rounded-xl text-white transition-all active:scale-95"
          title={isPlaying ? "Pause" : "Resume"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button 
          onClick={nextSlide} 
          className="p-3 bg-white/5 hover:bg-amber-600 rounded-xl text-white transition-all active:scale-95"
          title="Next Slide"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      {/* Admin Settings - Right Side */}
      <div className="absolute top-8 right-8 z-50 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-white transition-all active:scale-95"
          title="Open Admin Overview"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {isAdminOpen && (
        <AdminPanel 
          slides={slides} 
          onSave={handleAdminSave} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;