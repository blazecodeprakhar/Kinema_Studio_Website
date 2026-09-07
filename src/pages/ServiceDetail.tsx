import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { 
  animationVideos, droneVideos, videoAds, renderImages 
} from '../data/mediaRegistry';
import { PanoramaViewer } from '../components/PanoramaViewer';
import { ThreeDModelViewer } from '../components/ThreeDModelViewer';
import { ImageSlider } from '../components/ImageSlider';
import { ReelsShowcase } from '../components/ReelsShowcase';
import { VideoModal } from '../components/VideoModal';
import { ArrowLeft, Check, Compass, ChevronDown, ChevronUp, Sparkles, Send, Play, Camera, Film } from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find(s => s.slug === slug);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ src: string; title: string } | null>(null);

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-36 text-center animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold font-display text-white">Service Not Found</h2>
        <p className="text-xs text-text-muted mt-2">The requested service link does not exist or has been modified.</p>
        <Link to="/services" className="mt-4 px-5 py-2 bg-brand text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Services Hub
        </Link>
      </div>
    );
  }

  const relatedProjects = projectsData.filter(p => p.servicesUsed.includes(service.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-16 animate-fade-in text-left">
      
      {/* Back button */}
      <div>
        <Link to="/services" className="text-text-muted hover:text-white text-xs font-semibold flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Services Hub
        </Link>
      </div>

      {/* Hero Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-line pb-12">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Service In Focus</span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1 leading-tight">{service.title}</h1>
          <p className="text-brand font-display text-sm font-semibold tracking-wide">{service.shortPromise}</p>
          <p className="text-xs text-text-muted leading-relaxed max-w-2xl">{service.description}</p>
        </div>

        <div className="lg:col-span-4 bg-surface p-6 border border-line rounded-2xl flex flex-col justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-white font-bold uppercase tracking-wider font-display mb-1">Starting Rates</p>
            <p className="text-lg font-extrabold font-display text-white">{service.priceRange}</p>
            <p className="text-[10px] text-text-muted mt-2 leading-relaxed">
              * GST excluded. Scope varies based on site scale, location range, and revision rounds.
            </p>
          </div>
          <Link
            to="/book-a-project"
            state={{ selectedServices: [service.id] }}
            className="w-full mt-6 py-2.5 text-center bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Get a Tailored Quote
          </Link>
        </div>
      </div>

      {/* ----------------- SERVICE-SPECIFIC MEDIA EMBEDS ----------------- */}
      
      {/* 1. 3D Walkthrough Animation Service */}
      {service.id === '3d-walkthrough-animation' && (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-1.5">
              <Film className="w-4 h-4 text-brand animate-pulse" /> 3D Walkthrough Films & Interactive BIM Sandbox
            </h3>
            <p className="text-xs text-text-muted">
              Explore 3D animation videos and rotate interactive architectural models in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3D Animation Video Showcase */}
            <div 
              onClick={() => setActiveVideoModal({ src: animationVideos[0].src, title: animationVideos[0].title })}
              className="relative aspect-video bg-canvas rounded-2xl overflow-hidden border border-line group cursor-pointer shadow-xl"
            >
              <img src={animationVideos[0].poster} alt={animationVideos[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/40 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ml-0.5 fill-white" />
                </div>
                <span className="text-white text-xs font-bold font-display">{animationVideos[0].title}</span>
              </div>
            </div>

            {/* 3D Animation Video 2 Showcase */}
            <div 
              onClick={() => setActiveVideoModal({ src: animationVideos[1].src, title: animationVideos[1].title })}
              className="relative aspect-video bg-canvas rounded-2xl overflow-hidden border border-line group cursor-pointer shadow-xl"
            >
              <img src={animationVideos[1].poster} alt={animationVideos[1].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/40 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ml-0.5 fill-white" />
                </div>
                <span className="text-white text-xs font-bold font-display">{animationVideos[1].title}</span>
              </div>
            </div>
          </div>

          <ThreeDModelViewer />
        </section>
      )}

      {/* 2. Drone Photography & Videography */}
      {service.id === 'drone-photography-videography' && (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand animate-pulse" /> 4K Aerial Drone Footage Showcase
            </h3>
            <p className="text-xs text-text-muted">
              DGCA-compliant aerial flights capturing project scale, landmark connectivity, and skyline view corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {droneVideos.map((drone) => (
              <div
                key={drone.id}
                onClick={() => setActiveVideoModal({ src: drone.src, title: drone.title })}
                className="relative aspect-video bg-canvas rounded-2xl overflow-hidden border border-line group cursor-pointer shadow-xl hover:border-brand/40 transition-colors"
              >
                <img src={drone.poster} alt={drone.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/40 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                  <span className="text-white text-xs font-bold font-display px-2 text-center">{drone.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Real Estate Video Advertising */}
      {service.id === 'real-estate-video-advertising' && (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-1.5">
              <Play className="w-4 h-4 text-brand fill-brand" /> Commercial Campaign Video Ads
            </h3>
            <p className="text-xs text-text-muted">
              Launch commercials, vertical ad edits, and promotional cuts tailored for property ad channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoAds.map((ad) => (
              <div
                key={ad.id}
                onClick={() => setActiveVideoModal({ src: ad.src, title: ad.title })}
                className="relative aspect-video bg-canvas rounded-2xl overflow-hidden border border-line group cursor-pointer shadow-xl"
              >
                <img src={ad.poster} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/40 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5 fill-white" />
                  </div>
                  <span className="text-white text-xs font-bold font-display">{ad.title}</span>
                </div>
              </div>
            ))}
          </div>

          <ReelsShowcase />
        </section>
      )}

      {/* 4. Real Estate Videography & Reels */}
      {service.id === 'real-estate-videography' && (
        <section className="flex flex-col gap-8">
          <ReelsShowcase />
        </section>
      )}

      {/* 5. 360 Virtual Tours */}
      {service.id === '360-virtual-tours' && (
        <section className="flex flex-col gap-4 bg-surface p-6 rounded-2xl border border-line shadow-xl">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand animate-pulse" /> Live 360° Tour Playground
            </h3>
            <p className="text-[10px] text-text-muted mt-1">
              Drag and pan around this custom interactive model room to test our web-ready virtual tour capabilities.
            </p>
          </div>
          <PanoramaViewer />
        </section>
      )}

      {/* 6. Real Estate Photography */}
      {service.id === 'real-estate-photography' && (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 bg-surface p-6 rounded-2xl border border-line shadow-xl">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-brand animate-pulse" /> Staging & Color Grade Comparison
              </h3>
              <p className="text-[10px] text-text-muted mt-1">
                Slide the vertical bar horizontally to compare raw exposure capture with twilight retouched grade.
              </p>
            </div>
            <ImageSlider />
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Architectural Photo & Render Stills</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {renderImages.slice(0, 8).map((img) => (
                <div key={img.id} className="aspect-video bg-canvas rounded-xl overflow-hidden border border-line shadow-md">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables & Benefits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-surface p-6 border border-line rounded-2xl flex flex-col gap-4 shadow-xl">
          <p className="text-white text-xs font-bold uppercase tracking-wider font-display">Inclusions / Deliverables</p>
          <ul className="space-y-3.5 text-xs text-text-muted">
            {service.deliverables.map(del => (
              <li key={del} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <p className="text-white text-xs font-bold uppercase tracking-wider font-display">Commercial Benefits</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((b, idx) => (
              <div key={idx} className="bg-surface/50 p-4 border border-line rounded-xl flex flex-col gap-1">
                <p className="text-xs font-bold text-white leading-tight font-display">{b.title}</p>
                <p className="text-[10px] text-text-muted leading-relaxed mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Lightbox */}
      {activeVideoModal && (
        <VideoModal
          isOpen={!!activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
          videoSrc={activeVideoModal.src}
          title={activeVideoModal.title}
          category="Service Showcase"
        />
      )}

      {/* Production Process Timeline */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2">Production Timeline Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {service.process.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold text-brand">STAGE 0{idx + 1}</span>
              <p className="text-xs font-semibold text-white leading-tight font-display">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Equipment tags */}
      <section className="bg-surface p-6 rounded-2xl border border-line flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-2 text-white">
          <Compass className="w-5 h-5 text-brand" />
          <div>
            <p className="text-xs font-bold font-display leading-none">Technology Stack / Gear</p>
            <p className="text-[9px] text-text-muted mt-0.5">Hardware & software specifications deployed for this service.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {service.equipment.map(eq => (
            <span key={eq} className="px-3 py-1 bg-canvas border border-line text-[10px] font-semibold text-white rounded-full">
              {eq}
            </span>
          ))}
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2">Related Project Proofs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map(proj => (
              <Link 
                key={proj.id}
                to={`/projects/${proj.slug}`}
                className="bg-surface p-4 border border-line rounded-xl hover:border-brand/40 transition-colors flex flex-col gap-2 group"
              >
                <span className="text-[9px] text-text-muted uppercase font-mono">{proj.location}</span>
                <h4 className="text-xs font-bold text-white group-hover:text-brand transition-colors">{proj.title}</h4>
                <p className="text-[10px] text-text-muted line-clamp-2 leading-relaxed">{proj.brief}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Accordion FAQ Block */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-2.5">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-surface border border-line rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-display font-semibold text-white text-xs hover:text-brand focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-brand" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-[10px] text-text-muted leading-relaxed animate-fade-in border-t border-line/30 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <div className="bg-gradient-to-r from-[#0C0C0F] to-[#250308] border border-line rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">Need a custom visual scope?</h3>
          <p className="text-[10px] text-text-muted mt-1 max-w-sm">
            Contact our producer directly to discuss your property layout dimensions, drone rules, or render timelines.
          </p>
        </div>
        <Link 
          to="/book-a-project"
          state={{ selectedServices: [service.id] }}
          className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl inline-flex items-center gap-1.5 transition-colors shrink-0"
        >
          Book Now <Send className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
