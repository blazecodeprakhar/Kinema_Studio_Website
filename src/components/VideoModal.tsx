import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  category?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  title,
  category
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setProgress(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, videoSrc]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-surface border border-line rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-canvas/80">
          <div className="flex items-center gap-2">
            {category && (
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-brand/20 text-brand px-2 py-0.5 rounded border border-brand/30">
                {category}
              </span>
            )}
            <h3 className="text-xs sm:text-sm font-bold font-display text-white truncate max-w-md">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-raised text-text-muted hover:text-white hover:bg-brand/20 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            playsInline
            preload="metadata"
            style={{ transform: 'translateZ(0)' }}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Center overlay play icon when paused */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity"
            >
              <div className="w-16 h-16 rounded-full bg-brand/90 text-white flex items-center justify-center shadow-lg shadow-brand/40 hover:scale-110 transition-transform">
                <Play className="w-7 h-7 ml-1 fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Custom Video Control Bar */}
        <div className="px-5 py-3 bg-canvas border-t border-line flex flex-col gap-2">
          {/* Progress bar slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-line rounded-lg appearance-none cursor-pointer accent-brand"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-brand transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                className="text-text-muted hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-brand" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-[10px] font-mono text-text-muted">
                {videoRef.current ? `${Math.floor(videoRef.current.currentTime || 0)}s` : '0s'}
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-text-muted hover:text-white transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
