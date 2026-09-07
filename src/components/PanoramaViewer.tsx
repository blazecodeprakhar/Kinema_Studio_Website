import React, { useRef, useState, useEffect, useCallback } from 'react';
import { renderImages } from '../data/mediaRegistry';
import { ZoomIn, ZoomOut, Maximize, Minimize, Sparkles, Navigation } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage width 0-100
  y: number; // percentage height 0-100
  label: string;
  description: string;
  targetRoom?: string;
}

interface Room {
  id: string;
  name: string;
  imageSrc: string;
  hotspots: Hotspot[];
}

export const PanoramaViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rooms: Room[] = [
    {
      id: "living-room",
      name: "Luxury Living Lounge",
      imageSrc: renderImages[1].src, // aalo1: Interior living lounge
      hotspots: [
        { id: "hot-bedroom", x: 70, y: 50, label: "Master Bedroom Suite", description: "Explore double-height suite layout.", targetRoom: "bedroom" },
        { id: "hot-balcony", x: 28, y: 48, label: "Penthouse Balcony", description: "Walk out to sunset skyline views.", targetRoom: "balcony" }
      ]
    },
    {
      id: "bedroom",
      name: "Master Suite",
      imageSrc: renderImages[3].src, // aalo3: Master bedroom
      hotspots: [
        { id: "hot-living", x: 20, y: 52, label: "Living Lounge", description: "Return to central lounge.", targetRoom: "living-room" },
        { id: "hot-balc2", x: 80, y: 48, label: "Skyline Balcony", description: "View outdoor horizon.", targetRoom: "balcony" }
      ]
    },
    {
      id: "balcony",
      name: "Sunset Skyline Balcony",
      imageSrc: renderImages[12].src, // ink3: Penthouse balcony view
      hotspots: [
        { id: "hot-living-balc", x: 75, y: 55, label: "Return Indoors", description: "Return to living lounge.", targetRoom: "living-room" },
        { id: "hot-bed2", x: 25, y: 55, label: "Master Suite", description: "Go to master suite.", targetRoom: "bedroom" }
      ]
    }
  ];

  const [activeRoomId, setActiveRoomId] = useState<string>("living-room");
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string; desc: string } | null>(null);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];
  const loadedImagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const [, setImagesLoaded] = useState<boolean>(false);

  // Preload room images cleanly
  useEffect(() => {
    let loadedCount = 0;
    rooms.forEach((rm) => {
      const img = new Image();
      img.src = rm.imageSrc;
      img.onload = () => {
        loadedImagesRef.current[rm.id] = img;
        loadedCount++;
        if (loadedCount === rooms.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Smooth Canvas render without red lines or lag
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    const bgImg = loadedImagesRef.current[activeRoom.id];
    if (bgImg && bgImg.complete) {
      // Calculate cover dimensions
      const imgAspect = bgImg.width / bgImg.height;
      const canvasAspect = w / h;
      let drawW = w * zoom;
      let drawH = h * zoom;

      if (imgAspect > canvasAspect) {
        drawW = h * imgAspect * zoom;
      } else {
        drawH = (w / imgAspect) * zoom;
      }

      const imgW = drawW * 1.2;
      const offsetX = (dragOffset % imgW);
      const drawY = (h - drawH) / 2;

      ctx.drawImage(bgImg, offsetX - imgW, drawY, imgW, drawH);
      ctx.drawImage(bgImg, offsetX, drawY, imgW, drawH);
      ctx.drawImage(bgImg, offsetX + imgW, drawY, imgW, drawH);
    } else {
      ctx.fillStyle = '#0c0c0f';
      ctx.fillRect(0, 0, w, h);
    }
  }, [activeRoom.id, dragOffset, zoom]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - dragOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging) {
      const currentOffset = e.clientX - startX;
      setDragOffset(currentOffset);
      setTooltip(null);
      setHoveredHotspot(null);
    } else {
      let found = false;
      activeRoom.hotspots.forEach((hot) => {
        const rawX = (hot.x / 100) * w;
        const visualX = (rawX + dragOffset) % w;
        const finalX = visualX < 0 ? visualX + w : visualX;
        const finalY = (hot.y / 100) * h;

        const dx = mouseX - finalX;
        const dy = mouseY - finalY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 22) {
          found = true;
          setHoveredHotspot(hot);
          setTooltip({
            x: finalX,
            y: finalY - 14,
            text: hot.label,
            desc: hot.description
          });
        }
      });

      if (!found) {
        setTooltip(null);
        setHoveredHotspot(null);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = () => {
    if (hoveredHotspot) {
      if (hoveredHotspot.targetRoom) {
        setActiveRoomId(hoveredHotspot.targetRoom);
        setDragOffset(0);
      }
      setTooltip(null);
      setHoveredHotspot(null);
    }
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 1.0));

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden border border-line bg-canvas flex flex-col justify-end transition-all duration-300 shadow-2xl ${
        isFullscreen ? 'h-screen' : 'h-[380px] md:h-[520px] rounded-2xl'
      }`}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className={`w-full h-full block ${isDragging ? 'cursor-grabbing' : hoveredHotspot ? 'cursor-pointer' : 'cursor-grab'}`}
      />

      {/* Sleek, Professional Navigation Hotspots (Clean White/Gold Glassmorphism Pin - NO red dots) */}
      <div className="absolute inset-0 pointer-events-none">
        {canvasRef.current && activeRoom.hotspots.map((hot) => {
          const canvasWidth = canvasRef.current?.getBoundingClientRect().width || 1;
          const canvasHeight = canvasRef.current?.getBoundingClientRect().height || 1;
          const rawX = (hot.x / 100) * canvasWidth;
          const visualX = (rawX + dragOffset) % canvasWidth;
          const finalX = visualX < 0 ? visualX + canvasWidth : visualX;
          const finalY = (hot.y / 100) * canvasHeight;

          return (
            <div 
              key={hot.id}
              className="absolute pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
              style={{ left: finalX, top: finalY }}
            >
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg shadow-black/50">
                <Navigation className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip Popup */}
      {tooltip && (
        <div 
          className="absolute bg-surface/95 backdrop-blur-md border border-line px-3.5 py-2 rounded-xl shadow-2xl text-left -translate-x-1/2 -translate-y-full pointer-events-none max-w-[220px] z-30 animate-fade-in"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="text-white text-xs font-bold font-display mb-0.5">{tooltip.text}</p>
          <p className="text-[10px] text-text-muted leading-tight">{tooltip.desc}</p>
          <p className="text-[9px] text-brand font-bold uppercase tracking-wider mt-1">Click to enter room</p>
        </div>
      )}

      {/* Top Info Badge */}
      <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-line flex items-center gap-2 pointer-events-auto shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-brand" />
        <span className="text-white text-xs font-bold font-display tracking-wide">{activeRoom.name}</span>
      </div>

      {/* Control Bar Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-md px-4 py-2 rounded-full border border-line flex items-center gap-3 shadow-2xl pointer-events-auto">
        <div className="flex gap-1.5 border-r border-line pr-3">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomId(room.id);
                setDragOffset(0);
              }}
              className={`px-3 py-1 text-[10px] rounded-full font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeRoomId === room.id 
                  ? 'bg-brand text-white shadow-md shadow-brand/20' 
                  : 'bg-canvas/50 text-text-muted hover:text-white'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          <button onClick={zoomIn} title="Zoom In" className="p-1.5 rounded-full text-text-muted hover:text-white transition-colors cursor-pointer">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={zoomOut} title="Zoom Out" className="p-1.5 rounded-full text-text-muted hover:text-white transition-colors cursor-pointer">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={toggleFullscreen} title="Fullscreen" className="p-1.5 rounded-full text-text-muted hover:text-white transition-colors cursor-pointer">
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
