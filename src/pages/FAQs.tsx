import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, MessageSquare, ArrowRight } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const FAQs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'drone', name: 'Drone & Airspace Compliance' },
    { id: 'tours', name: '360° Virtual Tours' },
    { id: 'rendering', name: '3D Rendering & CGI' },
    { id: 'photography', name: 'Photography & Staging' },
    { id: 'payments', name: 'Payments & Licensing' }
  ];

  const faqsData: FaqItem[] = [
    {
      category: 'drone',
      q: 'Do you handle local drone shooting permissions in Pune?',
      a: 'Yes! Kinema Studio coordinates flight path feasibility and digital sky permissions. Our drone pilots hold valid DGCA pilot licenses, and all our multi-rotor aircraft are registered with unique UIN numbers. If a property falls within a strict restricted military zone, we evaluate feasibility prior to finalizing your contract.'
    },
    {
      category: 'drone',
      q: 'What happens if there is bad weather or heavy rain on the shoot date?',
      a: 'Drone flights require stable wind velocities and high visibility. In case of unexpected heavy rain, fog, or thunderstorm warnings in Pune, we reschedule your aerial shoot to the next clear day at zero re-booking cost.'
    },
    {
      category: 'tours',
      q: 'Can the 360° virtual tour be embedded on property portals like 99acres and MagicBricks?',
      a: 'Yes. Our 360° virtual tours are generated as standard responsive iframe embed links. Major Indian property portals (99acres, MagicBricks, Housing.com) support these links natively inside listing dashboards.'
    },
    {
      category: 'tours',
      q: 'Do you host the 360° virtual tours on your servers or do we host them?',
      a: 'We include 1 year of complimentary high-speed secure cloud hosting with every virtual tour. After year 1, you can renew hosting for a nominal annual fee, or we can hand over the standalone offline export files for your IT team to self-host.'
    },
    {
      category: 'rendering',
      q: 'What architectural inputs are needed to start a 3D walkthrough animation?',
      a: 'We require 2D AutoCAD files (.dwg), elevation blueprints, structural floor plans, and your interior designer\'s material schedules (specifying wood finishes, wall shades, and lighting types).'
    },
    {
      category: 'rendering',
      q: 'How many iterations do we get during the 3D rendering process?',
      a: 'Our standard CGI agreement includes 3 feedback checkpoints: (1) 3D Clay Wireframe layout approval, (2) Material & Texture application check, and (3) Final color grading and camera path adjustments.'
    },
    {
      category: 'photography',
      q: 'How should our team prepare the show-flat before the photographer arrives?',
      a: 'We send a pre-shoot Staging Checklist. Key steps include cleaning glass windows, hiding exposed TV/lamp cords, switching on all ambient accent lights, and clearing personal clutter from countertops.'
    },
    {
      category: 'photography',
      q: 'What is Twilight / Blue-Hour exterior photography?',
      a: 'It is shooting the building facade during the brief 20-minute window right after sunset. It creates a stunning glow where warm interior lights contrast against deep blue night skies, dramatically elevating listing value.'
    },
    {
      category: 'payments',
      q: 'What are your payment terms and do you provide GST invoices?',
      a: 'Our standard terms are 50% advance to confirm shoot dates/CGI work, and 50% upon final delivery of reviewed files. Yes, we issue official tax invoices with GST breakdown for corporate developer accounts.'
    },
    {
      category: 'payments',
      q: 'Who owns the copyright and commercial usage rights of the footage?',
      a: 'Upon full payment clearance, your company receives full perpetual digital marketing rights to use the delivered videos, stills, and renderings across websites, social channels, brochures, and outdoor displays.'
    }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqsData
    : faqsData.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-10 animate-fade-in text-left">
      
      {/* Header */}
      <div className="border-b border-line pb-6 text-center md:text-left">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">FAQ Center</span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white mt-1">Frequently Asked Questions.</h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl">
          Everything you need to know about our drone clearances, file deliverables, staging tips, and commercial terms.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 border-b border-line/40 pb-4 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenIndex(null);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-brand text-white border-brand shadow-md shadow-brand/15'
                : 'bg-surface text-text-muted border-line hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Accordion list */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="bg-surface border border-line rounded-xl overflow-hidden transition-all duration-300 glow-hover"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left font-display font-semibold text-white text-xs md:text-sm hover:text-brand focus:outline-none cursor-pointer"
              >
                <span className="pr-4">{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-brand shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
              </button>
              
              {isOpen && (
                <div className="px-4 md:px-5 pb-5 text-xs text-text-muted leading-relaxed border-t border-line/30 pt-3 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="bg-surface border border-line rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">Have a unique site question?</h3>
            <p className="text-[10px] text-text-muted mt-0.5">Contact our production team directly via phone or WhatsApp.</p>
          </div>
        </div>

        <Link
          to="/contact"
          className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
        >
          Ask a Question <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
