import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock, ExternalLink, Sparkles, Navigation } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '3d-walkthrough-animation',
    location: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setSubmitted(true);
  };

  const whatsappMessage = `Hello Kinema Studio! I am contacting you from your website.
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service:* ${formData.service}
*Property Location:* ${formData.location || 'Pune'}
*Message:* ${formData.message || 'General Inquiry'}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20 flex flex-col gap-12 text-left animate-fade-in">
      
      {/* 1. FUTURISTIC HEADER */}
      <ScrollReveal className="border-b border-line/60 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] text-brand uppercase font-bold tracking-widest font-display">Direct Inquiry Terminal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Let's Frame Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-brand">Property.</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Whether you need a pre-launch 3D walkthrough, drone sky clearances, or a full cinematic film shoot in Pune, our studio production team is at your service.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface p-3 rounded-xl border border-line shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="flex flex-col">
            <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">Studio Active</span>
            <span className="text-[10px] text-white font-semibold">Nal Stop, Kothrud, Pune</span>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. MAIN CONTACT SECTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start perspective-container">
        
        {/* Left Column: Direct Contact Info & Map */}
        <ScrollReveal direction="left" className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Contact Details Card */}
          <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-line flex flex-col gap-6 tilt-3d shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-center border-b border-line pb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand" /> Direct Studio Channels
              </h2>
              <span className="text-[9px] font-mono bg-canvas border border-line text-text-muted px-2 py-0.5 rounded">
                HQ / PUNE
              </span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-bold text-white font-display">Studio Address</p>
                <a 
                  href="https://maps.app.goo.gl/mAQPNxYazi4smxrd6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-text-muted hover:text-brand transition-colors leading-relaxed group-hover:translate-x-0.5 transition-transform block"
                >
                  Kinema Studio, Nal Stop, Kothrud, Pune, Maharashtra, India ↗
                </a>
              </div>
            </div>

            {/* Phones */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-white font-display">Producer Desk</p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+918600477848" className="text-xs text-text-muted hover:text-brand transition-colors font-mono font-semibold">
                    +91 86004 77848
                  </a>
                  <span className="text-zinc-700">•</span>
                  <a href="tel:+917498360588" className="text-xs text-text-muted hover:text-brand transition-colors font-mono font-semibold">
                    +91 74983 60588
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-bold text-white font-display">Email Desk</p>
                <a href="mailto:kinemastudio@gmail.com" className="text-xs text-text-muted hover:text-brand transition-colors font-mono">
                  kinemastudio@gmail.com
                </a>
              </div>
            </div>

            {/* Response SLA Notice */}
            <div className="flex items-center gap-2.5 text-[10px] text-text-muted bg-canvas p-3.5 rounded-xl border border-line">
              <Clock className="w-4 h-4 text-brand shrink-0 animate-pulse" />
              <span>We evaluate all property briefs and respond within <strong>4 to 12 business hours</strong>.</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <a 
              href="tel:+918600477848"
              className="py-3.5 bg-surface hover:bg-raised border border-line hover:border-brand text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              <Phone className="w-4 h-4 text-brand" /> Call Desk
            </a>

            <a 
              href={`https://wa.me/918600477848?text=${encodeURIComponent('Hello Kinema Studio! I want to inquire about property media services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 bg-surface hover:bg-raised border border-line hover:border-emerald-500/50 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp
            </a>
          </div>

          {/* Google Map Location Card */}
          <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-line flex flex-col gap-4 tilt-3d shadow-xl">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white font-bold font-display uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-brand" /> Live Studio Locator
              </span>
              <span className="text-[9px] font-mono text-text-muted">18.5074° N, 73.8349° E</span>
            </div>

            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden relative border border-line bg-canvas group">
              <iframe
                title="Kinema Studio Google Maps Location"
                src="https://maps.google.com/maps?q=Nal%20Stop%20Kothrud%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-75 group-hover:opacity-95 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="absolute bottom-3 left-3 bg-canvas/90 border border-line px-3 py-1 rounded-lg text-[10px] text-white font-mono uppercase tracking-wider backdrop-blur-md">
                Nal Stop, Kothrud, Pune
              </span>
            </div>

            <a
              href="https://maps.app.goo.gl/mAQPNxYazi4smxrd6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-canvas hover:bg-raised border border-line hover:border-brand text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all group"
            >
              Open Google Maps <ExternalLink className="w-3.5 h-3.5 text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </ScrollReveal>

        {/* Right Column: High-Tech Contact Form */}
        <ScrollReveal direction="right" className="lg:col-span-7 h-fit bg-surface p-6 sm:p-8 md:p-10 rounded-2xl border border-line tilt-3d shadow-xl relative">
          
          {submitted ? (
            <div className="py-20 text-center flex flex-col items-center gap-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center text-brand shadow-lg shadow-brand/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-display text-white">Inquiry Transmitted!</h2>
              <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
                Thank you <strong>{formData.name}</strong>. Our production desk has logged your property brief and will connect with you within a few hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a 
                  href={`https://wa.me/918600477848?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Connect via WhatsApp Instant <Send className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-canvas border border-line text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  Send Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="border-b border-line pb-4">
                <h2 className="text-lg font-bold font-display text-white">Send Us a Project Brief</h2>
                <p className="text-xs text-text-muted mt-1">Fill in your property specs below to receive a custom estimate and timeline breakdown.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider font-mono">Your Full Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Anand Vilas"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-canvas border border-line text-white px-3.5 py-3 rounded-xl text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder:text-zinc-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider font-mono">Phone Number *</label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-canvas border border-line text-white px-3.5 py-3 rounded-xl text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder:text-zinc-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider font-mono">Email Address *</label>
                  <input 
                    type="email"
                    required
                    placeholder="e.g. anand@vilasbuilders.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-canvas border border-line text-white px-3.5 py-3 rounded-xl text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder:text-zinc-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider font-mono">Primary Service Required</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="bg-canvas border border-line text-white px-3.5 py-3 rounded-xl text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all cursor-pointer"
                  >
                    <option value="3d-walkthrough-animation">3D Walkthrough Animation</option>
                    <option value="real-estate-video-advertising">Real Estate Video Ads</option>
                    <option value="drone-photography-videography">Aerial Drone Shoot (DGCA)</option>
                    <option value="real-estate-videography">Property Film & Videography</option>
                    <option value="real-estate-photography">Twilight & Staging Photography</option>
                    <option value="video-editing">Video Editing & Color Grade</option>
                    <option value="360-virtual-tours">360° Interactive Virtual Tour</option>
                    <option value="real-estate-websites">Landing Page & Microsite</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider font-mono">Property Site Location</label>
                <input 
                  type="text"
                  placeholder="e.g. Kothrud / Baner / Kharadi / PCMC, Pune"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-canvas border border-line text-white px-3.5 py-3 rounded-xl text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder:text-zinc-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider font-mono">Project Details & Deliverable Checklist</label>
                <textarea 
                  rows={4}
                  placeholder="Share details about property size, total acres/units, target launch date, or specific formats needed."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-canvas border border-line text-white px-3.5 py-3 rounded-xl text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder:text-zinc-600 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:scale-[1.01] active:scale-[0.99]"
              >
                Transmit Project Inquiry <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </ScrollReveal>

      </div>

    </div>
  );
};
