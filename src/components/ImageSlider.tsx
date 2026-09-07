import React, { useState, useRef, useEffect } from 'react';
import { renderImages } from '../data/mediaRegistry';
import { Eye, Sparkles } from 'lucide-react';

export const ImageSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  // High-res render image pair for before/after retouched comparison
  const rawImage = renderImages[18].src; // Twilight Facade
  const retouchedImage = renderImages[0].src; // Villa 55 Facade

  const handleSlide = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliding) return;
    handleSlide(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSliding) return;
    if (e.touches.length === 1) {
      handleSlide(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsSliding(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Slider Container */}
      <div 
        ref={containerRef}
        onMouseDown={(e) => {
          setIsSliding(true);
          handleSlide(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsSliding(true);
          if (e.touches.length === 1) {
            handleSlide(e.touches[0].clientX);
          }
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[340px] md:h-[450px] border border-line bg-canvas rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-2xl"
      >
        {/* Under layer: Retouched 3D Render / Twilight Grade */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img 
            src={retouchedImage} 
            alt="Final Retouched Render" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-brand/90 backdrop-blur-md border border-brand/50 text-white font-display text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-lg flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" /> Retouched 3D Twilight Render
          </div>
        </div>

        {/* Over layer: RAW architectural capture (Clipped by slider position) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div 
            className="absolute inset-0 h-full" 
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
          >
            <img 
              src={rawImage} 
              alt="Raw Frame Capture" 
              className="w-full h-full object-cover filter brightness-90 saturate-75"
            />
            <div className="absolute top-4 left-4 bg-canvas/90 backdrop-blur-md border border-line text-zinc-300 font-display text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-lg">
              Raw Wireframe / Unfinished Frame
            </div>
          </div>
        </div>

        {/* Sliding Handle Bar */}
        <div 
          className="absolute inset-y-0 w-[3px] bg-brand pointer-events-none shadow-lg shadow-brand"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle knob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand hover:bg-brand-hover text-white flex items-center justify-center border-2 border-white shadow-xl cursor-ew-resize transition-transform hover:scale-110">
            <span className="text-xs font-extrabold select-none">↔</span>
          </div>
        </div>
      </div>

      {/* Caption description */}
      <div className="flex justify-between items-center text-xs text-text-muted px-1 font-mono">
        <span>Raw Wireframe Capture</span>
        <span className="flex items-center gap-1 text-brand"><Eye className="w-3.5 h-3.5" /> Drag slider to compare 3D Retouching</span>
      </div>
    </div>
  );
};
