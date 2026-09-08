import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData, type ProjectItem } from '../data/projectsData';
import { Eye, ArrowRight, Play } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { VideoModal } from '../components/VideoModal';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<{ src: string; title: string } | null>(null);

  const filterCategories = [
    { id: 'all', name: 'All Formats' },
    { id: '3d-walkthrough-animation', name: '3D Rendering / Walkthrough' },
    { id: 'real-estate-video-advertising', name: 'Video Ads / Promos' },
    { id: 'drone-photography-videography', name: 'Drone Shoots' },
    { id: '360-virtual-tours', name: '360° Virtual Tours' },
    { id: 'real-estate-websites', name: 'Microsites & Web' }
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(proj => proj.servicesUsed.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-10 animate-fade-in text-left">
      
      {/* Header */}
      <ScrollReveal className="border-b border-line pb-6">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Portfolio Case Studies</span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1">Selected Stories in Space and Motion.</h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl">
          Explore real campaign outcomes, production challenges, and detailed deliverables behind each property launch.
        </p>
      </ScrollReveal>

      {/* Filter Horizontal Bar */}
      <div className="flex flex-wrap gap-2 border-b border-line/50 pb-6 overflow-x-auto">
        {filterCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 cursor-pointer ${
              filter === cat.id
                ? 'bg-brand text-white border-brand shadow-md shadow-brand/15'
                : 'bg-surface text-text-muted border-line hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      {filteredProjects.length > 0 ? (
        <ScrollReveal className="flex flex-wrap justify-center gap-8 perspective-container">
          {filteredProjects.map((proj: ProjectItem) => (
            <div 
              key={proj.id}
              className="bg-surface rounded-2xl border border-line overflow-hidden flex flex-col justify-between transition-all group hover:border-brand/40 shadow-xl w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
            >
              {/* Media Thumbnail Box */}
              <div className="relative aspect-[16/10] bg-canvas overflow-hidden flex items-center justify-center border-b border-line">
                <img 
                  src={proj.heroImage} 
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-4 left-4 bg-canvas/90 backdrop-blur-md border border-line text-brand text-[9px] font-mono uppercase px-2 py-0.5 rounded">
                  {proj.propertyType}
                </div>

                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="p-3.5 bg-brand hover:bg-brand-hover text-white rounded-full transition-transform hover:scale-110"
                    title="View Case Study"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  {proj.heroVideo && (
                    <button
                      onClick={() => setActiveVideoModal({ src: proj.heroVideo!, title: proj.title })}
                      className="p-3.5 bg-white text-black hover:bg-brand hover:text-white rounded-full transition-transform hover:scale-110 cursor-pointer"
                      title="Play Video Launch"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-text-muted mb-1 font-mono">
                    <span>{proj.client}</span>
                    <span>{proj.year}</span>
                  </div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-brand transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-2">
                    {proj.challenge}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.servicesUsed.map(su => (
                      <span key={su} className="text-[8px] bg-canvas text-text-muted px-2 py-0.5 rounded border border-line font-mono uppercase">
                        {su.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex justify-between items-center text-xs mt-4">
                  <span className="text-brand font-mono text-[10px] font-bold">{proj.deliverables[0]}</span>
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="text-[10px] text-white uppercase font-bold tracking-wider flex items-center gap-1 group-hover:text-brand transition-colors"
                  >
                    Case Study <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      ) : (
        <div className="py-16 text-center bg-surface rounded-2xl border border-line">
          <p className="text-xs text-white font-bold font-display">No projects found in this format.</p>
          <p className="text-[10px] text-text-muted mt-1">Please check other categories.</p>
        </div>
      )}

      {/* Video Modal Lightbox */}
      {activeVideoModal && (
        <VideoModal
          isOpen={!!activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
          videoSrc={activeVideoModal.src}
          title={activeVideoModal.title}
          category="Project Video"
        />
      )}

      {/* Closing CTA */}
      <ScrollReveal className="bg-gradient-to-r from-[#0C0C0F] to-[#250308] border border-line rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 mt-8 shadow-xl">
        <div>
          <h2 className="text-lg font-bold font-display text-white">Do you have a project in Pune?</h2>
          <p className="text-[10px] text-text-muted mt-1 max-w-sm">
            Let's structure a custom media campaign package aligned with your construction timelines and sales objectives.
          </p>
        </div>
        <Link 
          to="/book-a-project"
          className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Discuss Your Project <ArrowRight className="w-4 h-4" />
        </Link>
      </ScrollReveal>

    </div>
  );
};
