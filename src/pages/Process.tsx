import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Compass, Camera, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const Process: React.FC = () => {

  const steps = [
    {
      num: "01",
      title: "Consultation & Scope Finalization",
      icon: FileText,
      summary: "Understand campaign targets, key architectural selling points, and deliverable specs.",
      details: "We start by reviewing your blueprints, floor plans, or existing raw property photos. We establish key shoot deliverables (4K video ad, twilight stills, 360° virtual tours) and lock down fixed timelines."
    },
    {
      num: "02",
      title: "Site Recce & DGCA Clearances",
      icon: Compass,
      summary: "Digital Sky clearance checks, sun direction mapping, and show-flat staging instructions.",
      details: "Our drone team checks restricted airspace zones on Digital Sky and files legal flight permissions. We conduct a site recce in Pune to determine optimal golden-hour light angles and send a pre-shoot preparation checklist to your property manager."
    },
    {
      num: "03",
      title: "The Shoot Day (Ground & Aerial)",
      icon: Camera,
      summary: "High-precision Cinema FX3 tracking shots, FPV drone sweeps, and HDR twilight photography.",
      details: "Our crew arrives on set with cinema gimbals, specialized wide-angle glass, and dual-operator drone rigs. We capture smooth interior walkthroughs, window-view exposures, and dramatic aerial sweeps of the surrounding neighborhood."
    },
    {
      num: "04",
      title: "Post-Production Editing",
      icon: Sliders,
      summary: "DaVinci Resolve color grading, multi-exposure bracket window-pulls, and translation sound design.",
      details: "Our editors assemble the cuts. We use HDR window pulls to make exterior window views visible, color-grade log files to bring out texture details, and add localized language voiceovers (Marathi/Hindi/English) and licensed tracks."
    },
    {
      num: "05",
      title: "Digital Handoff & Launch",
      icon: CheckCircle2,
      summary: "High-speed cloud links delivery, embeddable codes, and hosting checks.",
      details: "We deliver full-res marketing files. For 360° virtual tours, we provide iframe embed links that load natively in portal listings. Landing page codes are hosted on fast CDNs. We archive raw clips safely for potential future revisions."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-14 animate-fade-in text-left">
      
      {/* Header */}
      <ScrollReveal className="border-b border-line pb-6">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Workflow Pipeline</span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1">Disciplined Production. Zero Timeline Slips.</h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl">
          We maintain a systematic process to coordinate creative output, legal airspace checks, and strict deadlines.
        </p>
      </ScrollReveal>

      {/* Timeline steps list */}
      <div className="flex flex-col gap-8">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <ScrollReveal 
              key={st.num}
              delay={idx * 60}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface p-6 rounded-2xl border border-line transition-all relative tilt-3d"
            >
              {/* Left timeline line representation */}
              <div className="lg:col-span-1 flex flex-row lg:flex-col items-center justify-between lg:justify-start gap-2 lg:border-r lg:border-line lg:pr-4">
                <span className="font-mono text-xs font-bold text-brand">{st.num}</span>
                <div className="w-8 h-8 rounded-lg bg-brand/5 border border-brand/15 flex items-center justify-center text-brand shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Middle core summary */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <h3 className="text-sm font-bold font-display text-white tracking-wide">{st.title}</h3>
                <p className="text-xs text-brand font-semibold leading-tight font-display">{st.summary}</p>
              </div>

              {/* Right detailed copy */}
              <div className="lg:col-span-7">
                <p className="text-xs text-text-muted leading-relaxed">{st.details}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Closing CTA */}
      <ScrollReveal className="bg-gradient-to-r from-[#0C0C0F] to-[#250308] border border-line rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">Ready to discuss your timeline?</h3>
          <p className="text-[10px] text-text-muted mt-1 max-w-sm">
            Contact our producer directly to discuss your property site launch schedules, weather, or coordinate recce tasks.
          </p>
        </div>
        <Link 
          to="/book-a-project"
          className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg inline-flex items-center gap-1.5 transition-colors shrink-0"
        >
          Book Appointment <ArrowRight className="w-4 h-4" />
        </Link>
      </ScrollReveal>

    </div>
  );
};
