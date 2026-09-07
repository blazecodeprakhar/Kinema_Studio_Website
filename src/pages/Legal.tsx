import React, { useState } from 'react';


export const Legal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pt-28 pb-16 flex flex-col gap-10 animate-fade-in text-left">
      
      {/* Header */}
      <div className="border-b border-line pb-6">
        <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Legal & Governance</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-white mt-1">Privacy Policy & Terms of Service</h1>
        <p className="text-xs text-text-muted mt-2">
          Effective Date: August 21, 2026. Kinema Studio, Nal Stop, Kothrud, Pune, Maharashtra.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-line">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-6 py-3 text-xs font-bold font-display uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'privacy' 
              ? 'border-brand text-brand' 
              : 'border-transparent text-text-muted hover:text-white'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-6 py-3 text-xs font-bold font-display uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'terms' 
              ? 'border-brand text-brand' 
              : 'border-transparent text-text-muted hover:text-white'
          }`}
        >
          Terms of Service & Licensing
        </button>
      </div>

      {activeTab === 'privacy' ? (
        <div className="flex flex-col gap-6 text-xs text-text-muted leading-relaxed">
          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">1. Data Collection</h2>
            <p>
              We collect information you directly provide when submitting project booking forms or contacting Kinema Studio. This includes your name, phone number, email address, company name, and property site details.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">2. How We Use Information</h2>
            <p>
              Your contact details are strictly used to respond to your production inquiries, evaluate aerial drone airspace feasibility, coordinate site shoots, and deliver project quotes. We do not sell or rent customer data to third-party brokers.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">3. Cookies & Analytics</h2>
            <p>
              Our website uses privacy-aware analytics to measure page load times and conversion paths. You can disable cookies in your web browser without affecting website navigation.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">4. Contact Rights</h2>
            <p>
              If you wish to update or delete your contact records from our inquiry database, please email kinemastudio@gmail.com with your request.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-xs text-text-muted leading-relaxed">
          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">1. Media Usage Rights</h2>
            <p>
              Upon receipt of full contract payment, Kinema Studio grants the client perpetual, non-exclusive digital marketing rights to use the delivered films, photos, 360° virtual tours, and renderings for listing portals, websites, brochures, and social media ads.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">2. DGCA Drone Operations</h2>
            <p>
              Aerial drone shoots are subject to Indian DGCA Digital Sky regulations and weather conditions. If an airspace zone is classified red or prohibited by air traffic authorities, Kinema Studio reserves the right to alter flight paths or restrict aerial sweeps to legal green/yellow boundaries for public safety.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">3. Shoot Rescheduling & Weather</h2>
            <p>
              In case of rain, severe wind, or poor visibility on the scheduled shoot day, Kinema Studio will reschedule the shoot at no additional rebooking fee. Client-initiated cancellations within 24 hours of shoot arrival may incur a nominal mobilization fee.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-2">4. Portfolio Demonstration</h2>
            <p>
              Kinema Studio retains the right to display completed visual work in our agency portfolio and showreel clips unless a specific non-disclosure agreement (NDA) is executed prior to the shoot.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
