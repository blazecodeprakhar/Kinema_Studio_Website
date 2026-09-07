import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { ScrollReveal } from '../components/ScrollReveal';

export const Services: React.FC = () => {

  const packages = [
    {
      name: "Essential Listing Package",
      bestFor: "Real Estate Agents / Completed Properties",
      description: "Standard, clean media assets optimized for property listing portals.",
      features: [
        "25 edited HDR interior & exterior photos",
        "3BHK show-flat video walkthrough (60s vertical cut)",
        "Portal-ready web sizing (99acres, MagicBricks, Housing.com)",
        "Revisions: 1 round included",
        "Delivery: 3 business days"
      ],
      cta: "Get Essential Quote",
      price: "Starting from ₹15,000",
      featured: false
    },
    {
      name: "Cinematic Launch Package",
      bestFor: "Developers / Pre-launch property marketing",
      description: "Fully scripted, high-impact cinematic ad campaign package.",
      features: [
        "Cinematic property film (2 minutes, 4K)",
        "DGCA-compliant aerial drone shoot & landmark mapping",
        "Scriptwriting, voiceover (Hindi/Marathi/English) & licensed music",
        "3 vertical social media cuts (Reels/Shorts)",
        "Revisions: 3 rounds included",
        "Delivery: 7 business days"
      ],
      cta: "Plan Launch Campaign",
      price: "Starting from ₹45,000",
      featured: true
    },
    {
      name: "Immersive Pre-Launch Package",
      bestFor: "Under construction / Pre-sales campaigns",
      description: "Virtual asset package for sales centers and remote NRI buyers.",
      features: [
        "3D exterior and interior architectural rendering",
        "60s rendered virtual walkthrough animation film",
        "20-point interactive 360° virtual tour",
        "Custom landing page with lead form integrations",
        "1 year secure hosting of tour links",
        "Revisions: 3 rounds (CGI review milestones)"
      ],
      cta: "Build Immersive Experience",
      price: "Custom Scoped Estimates",
      featured: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-16 animate-fade-in text-left">
      
      {/* Header */}
      <ScrollReveal className="border-b border-line pb-6">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Services Portfolio</span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1">One Studio. Every Angle.</h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl">
          We bundle film craft, drone licenses, high-fidelity CGI, and web interactive layers under one single production team.
        </p>
      </ScrollReveal>

      {/* Grid of 8 Services */}
      <ScrollReveal className="flex flex-col gap-6">
        <h2 className="text-xl font-bold font-display text-white">Our Signature Services</h2>
        <div className="flex flex-wrap justify-center gap-6 perspective-container">
          {servicesData.map((srv, idx) => (
            <div 
              key={srv.id} 
              className="bg-surface p-6 rounded-xl border border-line flex flex-col justify-between transition-all w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] tilt-3d"
            >
              <div>
                <div className="flex justify-between items-center border-b border-line pb-2.5 mb-4">
                  <span className="text-brand font-mono text-xs font-semibold">0{idx + 1}</span>
                  <span className="text-[9px] bg-canvas text-text-muted px-2 py-0.5 rounded uppercase font-mono tracking-wider border border-line">
                    {srv.priceRange.includes('₹') ? 'Fixed Starts' : 'Custom'}
                  </span>
                </div>
                <h3 className="text-sm font-bold font-display text-white leading-tight">{srv.title}</h3>
                <p className="text-[11px] text-text-muted mt-2 leading-relaxed line-clamp-3">{srv.description}</p>
                
                {/* Deliverables snippet */}
                <div className="mt-4 flex flex-col gap-1">
                  <p className="text-[9px] text-white uppercase tracking-wider font-semibold">Core Deliverables:</p>
                  <ul className="text-[10px] text-text-muted space-y-1">
                    {srv.deliverables.slice(0, 2).map(del => (
                      <li key={del} className="flex items-center gap-1.5 line-clamp-1">
                        <span className="w-1 h-1 rounded-full bg-brand shrink-0" /> {del}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex justify-between items-center">
                <span className="text-[10px] text-brand font-mono font-semibold">{srv.priceRange}</span>
                <Link 
                  to={`/services/${srv.slug}`}
                  className="text-[10px] font-bold text-white hover:text-brand uppercase tracking-wider flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Packages Teasers */}
      <ScrollReveal className="flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Campaign Bundle Packages</h2>
          <p className="text-xs text-text-muted mt-1">Select an integrated package matching your current sales or launch milestone.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-container">
          {packages.map((pkg, idx) => (
            <div 
              key={idx}
              className={`bg-surface p-6 rounded-2xl border flex flex-col justify-between relative transition-all tilt-3d ${
                pkg.featured 
                  ? 'border-brand shadow-lg shadow-brand/10' 
                  : 'border-line'
              }`}
            >
              {pkg.featured && (
                <span className="absolute top-0 right-6 -translate-y-1/2 bg-brand text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" /> Recommended
                </span>
              )}
              
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-bold font-display text-white leading-tight">{pkg.name}</h3>
                  <span className="text-[9px] text-brand font-semibold uppercase mt-0.5 block">{pkg.bestFor}</span>
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">{pkg.description}</p>
                <hr className="border-line" />
                
                <ul className="space-y-2.5 text-[11px] text-text-muted">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-line">
                <p className="text-xs text-white font-bold mb-3">{pkg.price}</p>
                <Link
                  to="/book-a-project"
                  state={{ selectedServices: [servicesData[idx]?.id || ''] }}
                  className={`w-full py-2.5 text-center block text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors ${
                    pkg.featured 
                      ? 'bg-brand hover:bg-brand-hover text-white' 
                      : 'bg-canvas border border-line text-text-muted hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

    </div>
  );
};
