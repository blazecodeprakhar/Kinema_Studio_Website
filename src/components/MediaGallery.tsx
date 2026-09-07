import React, { useState, useEffect } from 'react';
import { 
  renderImages, animationVideos, generativeAiVideos, reelVideos, droneVideos, videoAds, type RenderMediaItem 
} from '../data/mediaRegistry';
import { Play, Film, Camera, Sparkles, Filter, Maximize2, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const MediaGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [selectedVideo, setSelectedVideo] = useState<RenderMediaItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const allMedia: RenderMediaItem[] = [
    ...renderImages,
    ...animationVideos,
    ...droneVideos,
    ...videoAds,
    ...generativeAiVideos,
    ...reelVideos
  ];

  const categories = [
    { id: 'all', label: 'All Media', icon: Filter },
    { id: '3d-renders', label: '3D Renders (44)', icon: Camera },
    { id: '3d-animation', label: '3D Animations (6)', icon: Film },
    { id: 'drone', label: 'Drone Footage (3)', icon: Sparkles },
    { id: 'video-ads', label: 'Video Ads (2)', icon: Play },
    { id: 'reels-ai', label: 'Reels & Gen-AI (13)', icon: Sparkles }
  ];

  const filteredMedia = allMedia.filter((item) => {
    let categoryMatch = true;
    if (activeTab === '3d-renders') categoryMatch = item.category === 'Exterior' || item.category === 'Interior' || item.category === 'Commercial';
    else if (activeTab === '3d-animation') categoryMatch = item.category === '3D Animation';
    else if (activeTab === 'drone') categoryMatch = item.category === 'Drone';
    else if (activeTab === 'video-ads') categoryMatch = item.category === 'Video Ad';
    else if (activeTab === 'reels-ai') categoryMatch = item.category === 'Reels' || item.category === 'Generative AI';

    const searchMatch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && searchMatch;
  });

  // Reset pagination on category or search change
  useEffect(() => {
    setVisibleCount(12);
  }, [activeTab, searchQuery]);

  const visibleMedia = filteredMedia.slice(0, visibleCount);

  // Body scroll lock effect
  useEffect(() => {
    if (selectedImageIndex !== null || selectedVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex, selectedVideo]);

  // Keyboard navigation for image lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    const imageItems = filteredMedia.filter(m => m.type === 'image');
    setSelectedImageIndex((prev) => (prev! + 1) % imageItems.length);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    const imageItems = filteredMedia.filter(m => m.type === 'image');
    setSelectedImageIndex((prev) => (prev! - 1 + imageItems.length) % imageItems.length);
  };

  const imageItems = filteredMedia.filter(m => m.type === 'image');
  const currentLightBoxImage = selectedImageIndex !== null ? imageItems[selectedImageIndex] : null;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-line pb-6">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === cat.id
                    ? 'bg-brand text-white border-brand shadow-md shadow-brand/20'
                    : 'bg-surface text-text-muted border-line hover:text-white hover:border-zinc-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface border border-line rounded-xl text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      </div>

      {/* Media Grid */}
      {visibleMedia.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visibleMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'video') {
                  setSelectedVideo(item);
                } else {
                  const imgIdx = imageItems.findIndex(m => m.id === item.id);
                  if (imgIdx !== -1) setSelectedImageIndex(imgIdx);
                }
              }}
              className="group relative bg-surface border border-line rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-brand/60 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-[16/10] bg-canvas overflow-hidden flex items-center justify-center">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={item.poster || renderImages[0].src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/40 group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute top-2.5 left-2.5 bg-canvas/90 border border-line text-brand text-[8px] font-mono uppercase font-bold px-2 py-0.5 rounded backdrop-blur-md">
                  {item.category}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <div className="p-3 bg-brand text-white rounded-full transition-transform hover:scale-110">
                    {item.type === 'video' ? <Play className="w-4 h-4 fill-white" /> : <Maximize2 className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              <div className="p-3.5 flex flex-col gap-1.5">
                <h4 className="text-xs font-bold text-white font-display truncate leading-snug">{item.title}</h4>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tg) => (
                    <span key={tg} className="text-[8px] bg-canvas text-text-muted px-1.5 py-0.5 rounded border border-line font-mono uppercase">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-surface rounded-2xl border border-line">
          <p className="text-xs text-white font-bold font-display">No media files match your query.</p>
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredMedia.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-6 py-3 bg-surface border border-line hover:border-brand text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            Load More Media ({filteredMedia.length - visibleCount} Remaining)
          </button>
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoSrc={selectedVideo.src}
          title={selectedVideo.title}
          category={selectedVideo.category}
        />
      )}

      {/* Full-Screen Image Lightbox Modal with Next/Prev Controls */}
      {currentLightBoxImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
          <div className="absolute inset-0" onClick={() => setSelectedImageIndex(null)} />

          <div className="relative w-full max-w-6xl max-h-[92vh] bg-surface border border-line rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-canvas">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-brand/20 text-brand px-2 py-0.5 rounded border border-brand/30">
                  {currentLightBoxImage.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold font-display text-white truncate max-w-md">{currentLightBoxImage.title}</h3>
              </div>
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="p-1.5 rounded-full bg-raised text-text-muted hover:text-white hover:bg-brand/20 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Viewer Frame */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[400px] overflow-hidden">
              <img 
                src={currentLightBoxImage.src} 
                alt={currentLightBoxImage.title} 
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-brand transition-all cursor-pointer hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-brand transition-all cursor-pointer hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Bar */}
            <div className="px-5 py-3 bg-canvas border-t border-line flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {currentLightBoxImage.tags.map(tg => (
                  <span key={tg} className="text-[9px] bg-raised text-text-muted px-2 py-0.5 rounded border border-line font-mono uppercase">
                    #{tg}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-text-muted">
                {selectedImageIndex! + 1} of {imageItems.length} Images
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
