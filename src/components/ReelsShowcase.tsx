import React, { useState, useRef } from 'react';
import { reelVideos, generativeAiVideos, type RenderMediaItem } from '../data/mediaRegistry';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const ReelsShowcase: React.FC = () => {
  const allReels: RenderMediaItem[] = [...generativeAiVideos, ...reelVideos];
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [modalVideo, setModalVideo] = useState<RenderMediaItem | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentReel = allReels[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % allReels.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + allReels.length) % allReels.length);
    setIsPlaying(true);
  };

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

  return (
    <div className="w-full bg-surface border border-line rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
      <div className="flex flex-col gap-4 max-w-lg text-left">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display flex items-center gap-1.5 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full w-fit">
          <Sparkles className="w-3.5 h-3.5 text-brand animate-pulse" /> Vertical Social Reels & Gen-AI
        </span>

        <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white leading-tight">
          Built for Instagram Reels, YouTube Shorts & TikTok Ads.
        </h2>

        <p className="text-xs text-text-muted leading-relaxed">
          High-energy vertical property walkthroughs, Generative AI visual clips, and detail shots optimized to captivate modern homebuyers on mobile feeds.
        </p>

        <div className="bg-canvas p-4 rounded-xl border border-line flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand">
              Reel {activeIdx + 1} of {allReels.length} • {currentReel.category}
            </span>
            <span className="text-[9px] text-text-muted font-mono">{currentReel.type.toUpperCase()}</span>
          </div>

          <h4 className="text-sm font-bold text-white font-display leading-snug">{currentReel.title}</h4>

          <div className="flex flex-wrap gap-1.5 mt-1">
            {currentReel.tags.map((tg) => (
              <span key={tg} className="text-[8px] bg-raised text-text-muted px-2 py-0.5 rounded border border-line font-mono uppercase">
                #{tg}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handlePrev}
            className="p-3 bg-canvas border border-line hover:border-brand text-white rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-4 h-4 text-brand" />
          </button>
          
          <button
            onClick={handleNext}
            className="p-3 bg-canvas border border-line hover:border-brand text-white rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next reel"
          >
            <ChevronRight className="w-4 h-4 text-brand" />
          </button>

          <button
            onClick={() => setModalVideo(currentReel)}
            className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Expand View
          </button>
        </div>
      </div>

      <div className="relative w-[240px] sm:w-[280px] aspect-[9/16] bg-black rounded-[36px] border-[6px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col justify-between group shrink-0">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-center">
          <div className="w-8 h-1 bg-zinc-700 rounded-full" />
        </div>

        <video
          key={currentReel.id}
          ref={videoRef}
          src={currentReel.src}
          poster={currentReel.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer z-10"
        />

        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 pointer-events-auto">
          <button onClick={togglePlay} className="text-white hover:text-brand transition-colors cursor-pointer">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <span className="text-[9px] font-mono text-white truncate max-w-[120px]">{currentReel.title}</span>

          <button onClick={toggleMute} className="text-white hover:text-brand transition-colors cursor-pointer">
            {isMuted ? <VolumeX className="w-4 h-4 text-brand" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {modalVideo && (
        <VideoModal
          isOpen={!!modalVideo}
          onClose={() => setModalVideo(null)}
          videoSrc={modalVideo.src}
          title={modalVideo.title}
          category={modalVideo.category}
        />
      )}
    </div>
  );
};
