import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ArrowLeft, Calendar, User, MapPin, Building, Quote, CheckCircle2, Play, Maximize2 } from 'lucide-react';
import { VideoModal } from '../components/VideoModal';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find(p => p.slug === slug);

  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-36 text-center animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold font-display text-white">Project Not Found</h2>
        <p className="text-xs text-text-muted mt-2">The requested portfolio link does not exist or has been archived.</p>
        <Link to="/projects" className="mt-4 px-5 py-2 bg-brand text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const mappedServices = servicesData.filter(s => project.servicesUsed.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-14 animate-fade-in text-left">
      
      {/* Back button */}
      <div>
        <Link to="/projects" className="text-text-muted hover:text-white text-xs font-semibold flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>

      {/* Hero Block Header */}
      <div className="border-b border-line pb-8 flex flex-col gap-4">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Case Study In Focus</span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1 leading-tight">{project.title}</h1>
        <p className="text-sm text-text-muted max-w-2xl">{project.propertyType} Campaign in {project.location}</p>
      </div>

      {/* Meta Parameters Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface p-5 border border-line rounded-2xl">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">Client Brand</span>
          <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5"><User className="w-3.5 h-3.5 text-brand" /> {project.client}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">Project Location</span>
          <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5"><MapPin className="w-3.5 h-3.5 text-brand" /> {project.location}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">Property Segment</span>
          <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5"><Building className="w-3.5 h-3.5 text-brand" /> {project.propertyType}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">Campaign Year</span>
          <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5"><Calendar className="w-3.5 h-3.5 text-brand" /> {project.year}</span>
        </div>
      </div>

      {/* High-Res Hero Media Showcase Container */}
      <div className="relative w-full aspect-[21/9] bg-canvas border border-line rounded-2xl overflow-hidden shadow-2xl group flex items-center justify-center">
        <img 
          src={project.heroImage} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {project.heroVideo && (
          <button
            onClick={() => setVideoModalOpen(true)}
            className="absolute p-5 rounded-full bg-brand text-white hover:scale-110 transition-transform shadow-2xl cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </button>
        )}

        <span className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md border border-line px-3.5 py-1 rounded-lg text-white text-[10px] uppercase font-bold tracking-wider">
          {project.heroVideo ? 'Click to Play Launch Film (4K)' : 'High-Res Hero Render'}
        </span>
      </div>

      {/* Video Modal Lightbox */}
      {project.heroVideo && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoSrc={project.heroVideo}
          title={`${project.title} - Campaign Video Film`}
          category="Campaign Film"
        />
      )}

      {/* Brief vs Challenge Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2">The Campaign Brief</h2>
          <p className="text-xs text-text-muted leading-relaxed">{project.brief}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2">The Production Challenge</h2>
          <p className="text-xs text-text-muted leading-relaxed">{project.challenge}</p>
        </div>
      </div>

      {/* Project Media Gallery Grid */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2">Project Media Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.galleryImages.map((imgSrc, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedImage(imgSrc)}
              className="relative aspect-video bg-canvas rounded-xl overflow-hidden border border-line group cursor-pointer hover:border-brand/50 transition-colors shadow-lg"
            >
              <img src={imgSrc} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Approach Staggered Steps */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2">Our Production Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.approach.map((step, idx) => (
            <div key={idx} className="bg-surface p-5 border border-line rounded-xl flex flex-col gap-3">
              <span className="font-mono text-xs font-bold text-brand">STAGE 0{idx + 1}</span>
              <p className="text-xs text-white leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables checklist vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-surface p-6 border border-line rounded-2xl flex flex-col gap-4">
          <p className="text-white text-xs font-bold uppercase tracking-wider font-display">Exact Deliverables Delivered</p>
          <ul className="space-y-3.5 text-xs text-text-muted">
            {project.deliverables.map(del => (
              <li key={del} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 bg-gradient-to-r from-[#0C0C0F] to-[#250308] border border-brand/30 p-8 rounded-2xl flex flex-col justify-center gap-4 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-brand uppercase font-extrabold tracking-widest font-display bg-brand/10 border border-brand/20 px-2.5 py-1 rounded">
              Verified Outcome
            </span>
          </div>
          <p className="text-md font-bold font-display text-white leading-tight">
            {project.results}
          </p>
          <p className="text-[10px] text-text-muted">
            * Metric data gathered in collaboration with developer's marketing dashboard reports.
          </p>
        </div>
      </div>

      {/* Client Quote testimonial */}
      <div className="bg-surface p-6 border border-line rounded-2xl flex flex-col gap-4 relative shadow-xl">
        <div className="absolute top-4 right-6 text-brand/15">
          <Quote className="w-14 h-14 stroke-[3]" />
        </div>
        <p className="text-white text-xs md:text-sm italic leading-relaxed max-w-4xl relative z-10">
          "{project.quote.text}"
        </p>
        <div className="border-t border-line/50 pt-3 flex flex-col">
          <span className="text-xs font-bold text-white uppercase font-display">{project.quote.author}</span>
          <span className="text-[10px] text-text-muted">{project.quote.role}, {project.client}</span>
        </div>
      </div>

      {/* Related Services */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2 font-display">Services Deployed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mappedServices.map(srv => (
            <Link
              key={srv.id}
              to={`/services/${srv.slug}`}
              className="bg-surface p-4 border border-line rounded-xl hover:border-brand/40 transition-colors flex flex-col gap-1.5"
            >
              <h4 className="text-xs font-bold text-white font-display leading-tight">{srv.title}</h4>
              <p className="text-[10px] text-text-muted line-clamp-2 leading-relaxed">{srv.shortPromise}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="absolute inset-0" onClick={() => setSelectedImage(null)} />
          <div className="relative max-w-5xl max-h-[90vh] bg-surface border border-line rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-canvas">
              <h3 className="text-xs sm:text-sm font-bold font-display text-white">{project.title} Render</h3>
              <button onClick={() => setSelectedImage(null)} className="text-xs text-text-muted hover:text-white cursor-pointer">
                Close ✕
              </button>
            </div>
            <div className="p-2 bg-black flex items-center justify-center overflow-auto">
              <img src={selectedImage} alt={project.title} className="max-h-[80vh] w-auto object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom redirection project link */}
      <div className="bg-surface border border-line rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Want to build something similar?</h4>
          <p className="text-[10px] text-text-muted mt-0.5">Let's schedule a site assessment or feasibility check.</p>
        </div>
        <Link 
          to="/book-a-project"
          state={{ selectedServices: project.servicesUsed }}
          className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0"
        >
          Plan Similar Shoot
        </Link>
      </div>

    </div>
  );
};
