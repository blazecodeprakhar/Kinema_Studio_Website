import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const About: React.FC = () => {

  const equipmentManifest = [
    { category: "Cinema & Land Cameras", items: ["Sony FX3 Cinema Camera", "Sony A7S III (Low-light master)", "Sony A7R V (61MP high-res photography)", "Laowa wide-angle and probe macro lenses"] },
    { category: "Aerial Drone Fleet", items: ["DJI Mavic 3 Pro (Tri-camera system)", "DJI Mini 4 Pro (Restricted area accessibility)", "DGCA-Certified flight rigs with registered UINs", "PolarPro ND polarization filters"] },
    { category: "Stabilizers & Grip Support", items: ["DJI Ronin RS3 Pro Gimbal", "Manfrotto fluid-head architectural tripods", "Motorized linear slider tracks", "Aputure LED lights & diffusers for interiors"] },
    { category: "Post-Production Engines", items: ["DaVinci Resolve Studio (Film grading panels)", "Adobe After Effects & Premiere Pro", "Unreal Engine 5 (3D real-time walkthrough rendering)", "High-speed cloud delivery servers"] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-16 animate-fade-in text-left">
      
      {/* Page Header */}
      <ScrollReveal className="border-b border-line pb-6">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">About Us</span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1">Cinematic Quality. Technical Discipline.</h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl">
          Based in Kothrud, Pune, we are a visual-first production studio dedicated to turning real estate listings into cinematic experiences.
        </p>
      </ScrollReveal>

      {/* Grid: Who We Are & Mission */}
      <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold font-display text-white">Our Founding Narrative</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            Kinema Studio was founded in Pune with a simple mission: to bridge the gap between architectural vision and film-grade visual storytelling. Traditional property photography often relies on flat, distorted wide-angle shots that fail to explain the true atmosphere or contextual scale of a development.
          </p>
          <p className="text-xs text-text-muted leading-relaxed">
            By combining licensed aerial drone flights, 3D render pipelines, color-graded walk-through films, and interactive web elements, we offer property developers and agents a unified media suite. From Nal Stop to outer Mumbai townships, we shot over 500 properties, helping developers build authority and drive pre-launch booking campaigns.
          </p>
        </div>

        <div className="bg-surface border border-line p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">Operating Standards</h3>
          </div>
          <ul className="space-y-3 text-xs text-text-muted">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <span><strong>True-to-Scale Accuracy:</strong> No distorted ultra-wide lenses that make small bedrooms look fake. We maintain natural room proportions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <span><strong>HDR Window Pulling:</strong> Exterior balcony views and sunlit windows stay crisp and clear, without over-exposed white glare.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <span><strong>Speed of Delivery:</strong> We know real estate campaigns move fast. We maintain a strict average 48-hour delivery timeline on shoots.</span>
            </li>
          </ul>
        </div>
      </ScrollReveal>

      {/* Section: DGCA Drone Compliance */}
      <ScrollReveal className="bg-gradient-to-r from-[#0C0C0F] to-[#220406] border border-line p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-bold font-display text-white">Certified DGCA Aerial Operations in Pune</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Drones are powerful, but security is non-negotiable. Kinema Studio operations are fully compliant with DGCA regulations in India. Our pilots hold valid flight licenses, our drone fleet is registered with UIN markings, and we obtain legal sky clearances on Digital Sky platforms prior to taking off in green or yellow zones. We handle all logistics permissions internally.
          </p>
        </div>
      </ScrollReveal>

      {/* Manifest Grid: Our Gear & Software */}
      <ScrollReveal className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Our Equipment Manifest</h2>
          <p className="text-xs text-text-muted">We use industry-leading cinema and rendering gear to capture spaces accurately.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
          {equipmentManifest.map((man, idx) => (
            <div key={idx} className="bg-surface p-5 border border-line rounded-xl flex flex-col gap-3 transition-all tilt-3d">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand font-display border-b border-line pb-2">
                {man.category}
              </h3>
              <ul className="space-y-1.5 text-[10px] text-text-muted">
                {man.items.map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* CTA Box */}
      <div className="text-center py-6">
        <Link
          to="/book-a-project"
          className="px-8 py-3.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-brand/25 inline-flex items-center gap-2 group transition-all"
        >
          Plan a Project with Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
};

// Quick ArrowRight icon definition helper locally since we did not import it
const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
  </svg>
);
