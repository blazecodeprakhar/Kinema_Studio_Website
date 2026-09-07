import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, ShieldCheck, 
  Map, Clock, Users, Camera, ArrowRight, ChevronLeft, ChevronRight, Play, Box
} from 'lucide-react';
import { PanoramaViewer } from '../components/PanoramaViewer';
import { ThreeDModelViewer } from '../components/ThreeDModelViewer';
import { ReelsShowcase } from '../components/ReelsShowcase';
import { MediaGallery } from '../components/MediaGallery';
import { VideoModal } from '../components/VideoModal';
import { ScrollReveal } from '../components/ScrollReveal';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { animationVideos } from '../data/mediaRegistry';

import heroBg from '../assets/hero-bg.jpg';

export const Home: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [heroVideoModalOpen, setHeroVideoModalOpen] = useState<boolean>(false);
  const [activeProjectVideo, setActiveProjectVideo] = useState<{ src: string; title: string } | null>(null);

  const stats = [
    { value: "500+", label: "Properties Shot", desc: "Across Pune & suburbs", icon: Map },
    { value: "50+", label: "Developers Trust Us", icon: Users },
    { value: "10k+", label: "Acres Mapped", desc: "DGCA-compliant flights", icon: ShieldCheck },
    { value: "48hr", label: "Average Delivery", desc: "No timeline slips", icon: Clock }
  ];

  const testimonials = [
    {
      quote: "We needed launch assets for a 15-acre township. Kinema Studio delivered rendering, video, and drone connectivity maps on a tight timeline. The leads speak for themselves.",
      author: "Rajesh Shirke",
      role: "VP Marketing",
      company: "Horizon Developers"
    },
    {
      quote: "The 360° tour let out-of-town and NRI buyers walkthrough the apartment layout. It pre-qualified leads so well that our sales team saved weeks of useless visits.",
      author: "Meera Sen",
      role: "Leasing Director",
      company: "Onyx Commercial"
    },
    {
      quote: "Absolute professionals. They shot our showflat during active construction next door and managed to deliver a quiet, luxury visual sanctuary.",
      author: "Sameer Wakade",
      role: "Project Director",
      company: "Pride Group"
    }
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-canvas pt-20 pb-12 sm:pt-24 sm:pb-16 md:py-0">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 opacity-85 scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div className="absolute inset-0 z-0 bg-black/60" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-canvas via-transparent to-canvas/70" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-canvas/70 via-transparent to-canvas/70" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center gap-4 sm:gap-5 md:gap-6 mt-2 sm:mt-6 md:mt-10 animate-fade-up">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white bg-brand/20 border border-brand/50 px-3.5 py-1.5 rounded-full animate-float flex items-center gap-2 shadow-md shadow-brand/20 backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-brand shrink-0 animate-pulse" /> Real Estate Media Production Studio
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-tight tracking-tight text-white max-w-4xl animate-fade-up animation-delay-100">
            Make every property <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand">impossible to ignore</span><span className="text-brand">.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed px-2 animate-fade-up animation-delay-200">
            Cinematic films, aerial visuals, 3D walkthroughs, 3D renders, and 360° tours crafted specifically for premium real estate developers and luxury agents in Pune.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4 w-full sm:w-auto px-4 sm:px-0 animate-fade-up animation-delay-300">
            <Link
              to="/projects"
              className="w-full sm:w-auto px-7 py-3.5 bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-brand/30 flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button
              onClick={() => setHeroVideoModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 bg-canvas/90 border border-line text-white hover:border-brand hover:bg-raised text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-brand text-brand" /> Watch Launch Reel
            </button>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={heroVideoModalOpen}
        onClose={() => setHeroVideoModalOpen(false)}
        videoSrc={animationVideos[0].src}
        title="Kinema Studio 3D Architectural Launch Reel (4K)"
        category="Showreel"
      />

      {activeProjectVideo && (
        <VideoModal
          isOpen={!!activeProjectVideo}
          onClose={() => setActiveProjectVideo(null)}
          videoSrc={activeProjectVideo.src}
          title={activeProjectVideo.title}
          category="Case Study"
        />
      )}

      {/* 2. STATS STRIP SECTION */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-surface p-6 md:p-8 rounded-2xl border border-line">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1 p-2 sm:p-3 rounded-xl transition-all duration-300 hover:bg-raised/60 hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/5 border border-brand/10 flex items-center justify-center text-brand mb-1 sm:mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">{st.value}</span>
                <span className="text-[11px] sm:text-xs font-semibold text-white">{st.label}</span>
                {st.desc && <span className="text-[9px] sm:text-[10px] text-text-muted">{st.desc}</span>}
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* 3. INTERACTIVE 3D MODEL ARCHITECTURAL SANDBOX */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col gap-6">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display flex items-center justify-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-brand animate-pulse" /> Live 3D Architectural Viewer
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white">
            Explore 3D Building Models in Real Time.
          </h2>
          <p className="text-xs text-text-muted">
            Drag to rotate 360°, inspect wireframe geometry, and toggle lighting presets for architectural models.
          </p>
        </div>

        <ThreeDModelViewer />
      </ScrollReveal>

      {/* 4. SERVICES OVERVIEW GRID */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Services</span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white mt-1">One studio. Every visual your campaign needs.</h2>
          </div>
          <Link to="/services" className="text-xs text-brand hover:text-brand-hover font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0">
            Explore All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 perspective-container">
          {servicesData.map(srv => (
            <Link 
              key={srv.id} 
              to={`/services/${srv.slug}`}
              className="group bg-surface p-6 rounded-xl border border-line flex flex-col justify-between min-h-[220px] transition-all tilt-3d w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div>
                <span className="text-brand font-mono text-[10px] font-bold">0{servicesData.indexOf(srv) + 1}</span>
                <h3 className="text-sm font-bold font-display text-white mt-2 group-hover:text-brand transition-colors leading-snug">{srv.title}</h3>
                <p className="text-[11px] text-text-muted mt-2 leading-relaxed line-clamp-3">{srv.description}</p>
              </div>
              
              <span className="text-[10px] font-semibold text-brand group-hover:text-brand-hover mt-4 flex items-center gap-1 uppercase tracking-wider">
                Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* 5. VERTICAL REELS & GEN-AI SHOWCASE */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <ReelsShowcase />
      </ScrollReveal>

      {/* 6. INTERACTIVE 360 TOUR DEMO PLAYGROUND */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Virtual Sandbox</span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white mt-1">Step inside—from anywhere.</h2>
          <p className="text-xs text-text-muted mt-2">
            Try a 360° virtual tour live inside this container. Click and drag your cursor to pan, and click hotspots to jump rooms.
          </p>
        </div>

        <PanoramaViewer />
      </ScrollReveal>

      {/* 7. FEATURED PROJECTS PORTFOLIO */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Selected Work</span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white mt-1">Stories in space and motion.</h2>
          </div>
          <Link to="/projects" className="text-xs text-brand hover:text-brand-hover font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0">
            View Full Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsData.filter(p => p.featured).slice(0, 3).map(proj => (
            <div 
              key={proj.id}
              className="bg-surface rounded-2xl border border-line overflow-hidden group flex flex-col justify-between shadow-xl transition-all hover:border-brand/40"
            >
              <div className="relative aspect-[16/10] bg-canvas overflow-hidden flex items-center justify-center">
                <img 
                  src={proj.heroImage} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md border border-line text-white text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded font-mono">
                  {proj.location}
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link 
                    to={`/projects/${proj.slug}`}
                    className="p-3 bg-brand hover:bg-brand-hover text-white rounded-full transition-all hover:scale-110"
                    title="View Case Study"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  {proj.heroVideo && (
                    <button
                      onClick={() => setActiveProjectVideo({ src: proj.heroVideo!, title: proj.title })}
                      className="p-3 bg-white text-black hover:bg-brand hover:text-white rounded-full transition-all hover:scale-110 cursor-pointer"
                      title="Play Video Launch"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2">
                <span className="text-[10px] text-text-muted uppercase font-mono">{proj.propertyType}</span>
                <h3 className="text-sm font-bold font-display text-white leading-tight">{proj.title}</h3>
                <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">{proj.brief}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {proj.servicesUsed.slice(0, 2).map(su => (
                    <span key={su} className="text-[8px] bg-canvas text-text-muted px-2 py-0.5 rounded border border-line font-mono uppercase">
                      {su.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                to={`/projects/${proj.slug}`}
                className="mx-5 mb-5 mt-2 text-center py-2.5 border border-line hover:border-brand hover:bg-raised text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Read Case Study
              </Link>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 8. COMPLETE MEDIA ASSET LIGHTBOX GALLERY */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col gap-6">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-1">
          <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Media Library</span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">Full Media Production Showcase.</h2>
          <p className="text-xs text-text-muted">
            Explore our complete library of 3D renders, 3D walkthrough videos, aerial drone shots, video ads, vertical reels, and Gen AI visuals.
          </p>
        </div>

        <MediaGallery />
      </ScrollReveal>

      {/* 9. CLIENT TESTIMONIALS CAROUSEL */}
      <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="bg-surface p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-line text-center flex flex-col items-center gap-6 shadow-xl">
          <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Client Feedback</span>
          
          <div className="min-h-[140px] flex items-center justify-center animate-fade-in" key={activeTestimonial}>
            <p className="text-white text-sm sm:text-md md:text-lg italic leading-relaxed max-w-2xl font-light px-2">
              "{testimonials[activeTestimonial].quote}"
            </p>
          </div>

          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wider font-display">
              {testimonials[activeTestimonial].author}
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">
              {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-canvas border border-line hover:border-brand hover:bg-raised text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeTestimonial === idx ? 'bg-brand w-6' : 'bg-zinc-700 hover:bg-zinc-500 w-2'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-canvas border border-line hover:border-brand hover:bg-raised text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 10. BOTTOM CALL-TO-ACTION BAND */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full mb-12">
        <div className="bg-gradient-to-r from-[#0C0C0F] to-[#250308] border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="text-left max-w-xl">
            <h2 className="text-xl md:text-3xl font-extrabold font-display text-white leading-tight">
              Ready to showcase your property like never before?
            </h2>
            <p className="text-xs text-text-muted mt-2 max-w-md">
              Share the location, timeline, and required deliverables. We'll examine flight paths and render scales to recommend the right production plan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            <Link
              to="/book-a-project"
              className="px-6 py-3 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              Book Appointment
            </Link>
            
            <a
              href="https://wa.me/918600477848"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-canvas/60 border border-line text-white hover:bg-raised text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              Quick Quote (WhatsApp)
            </a>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};
