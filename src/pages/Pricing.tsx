import React from 'react';
import { PriceCalculator } from '../components/PriceCalculator';


export const Pricing: React.FC = () => {

  const quoteFactors = [
    { title: "Property Area (Sq.Ft.)", desc: "Total carpet area impacts staging and shooting durations, as well as render complexities for 3D walkthroughs." },
    { title: "Flight Airspace Zone", desc: "Flight paths in Pune red/yellow zones require additional permissions and compliance logs, affecting pre-production overheads." },
    { title: "Revision Cycles", desc: "Our standard packages bundle 1-3 rounds of revisions. Extra color grading sweeps or model changes are scoped separately." },
    { title: "Licencing & Talent", desc: "Broadcast-ready ad campaigns requiring professional models, voiceover talent, or paid background tracks are quoted additionally." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-16 animate-fade-in text-left">
      
      {/* Header */}
      <div className="border-b border-line pb-6">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Rates & Estimates</span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1">Clear Scope. Honest Estimates.</h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl">
          Use our interactive budget planner below to generate a starting rate estimate for your property campaign.
        </p>
      </div>

      {/* Interactive Price Calculator */}
      <section className="flex flex-col gap-4">
        <div className="border-l-2 border-brand pl-3 mb-2">
          <h2 className="text-lg font-bold font-display text-white">Project Cost Calculator</h2>
          <p className="text-xs text-text-muted">Configure services and size dimensions below to see our starting pricing structures.</p>
        </div>
        <PriceCalculator />
      </section>

      {/* Quote Factors Grid */}
      <section className="flex flex-col gap-8">
        <div>
          <h2 className="text-lg font-bold font-display text-white border-b border-line pb-2 font-display">What Impacts Your Final Quote?</h2>
          <p className="text-xs text-text-muted mt-1">Real estate media pricing is dependent on flight safety, staging time, and editing scope.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
          {quoteFactors.map((q, idx) => (
            <div key={idx} className="bg-surface p-5 border border-line rounded-xl flex flex-col gap-2 transition-all tilt-3d">
              <span className="text-brand font-mono text-xs font-bold">0{idx + 1}</span>
              <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">{q.title}</h3>
              <p className="text-[10px] text-text-muted leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Retainers Section */}
      <section className="bg-surface border border-line p-6 md:p-8 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-brand uppercase font-bold tracking-widest font-display bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
              B2B Partner Plans
            </span>
          </div>
          <h3 className="text-md font-bold font-display text-white leading-tight">Developer & Agency Retainers</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Need monthly construction progress updates, recurring agent walk-throughs, or white-label capacity for your property marketing agency? We offer scheduled monthly and per-visit retainers with dedicated SLAs and volume pricing.
          </p>
        </div>
        
        <div className="shrink-0 flex items-center gap-3 w-full lg:w-auto">
          <a 
            href="mailto:kinemastudio@gmail.com?subject=Developer%20Retainer%20Inquiry%20-%20Kinema%20Studio"
            className="w-full lg:w-auto text-center px-6 py-2.5 bg-[#0C0C0F] hover:bg-raised border border-line text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            Inquire for Retainer
          </a>
        </div>
      </section>

    </div>
  );
};
