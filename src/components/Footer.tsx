import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUp } from 'lucide-react';

import navLogo from '../assets/image_nav_bar.png';

export const Footer: React.FC = () => {

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work / Portfolio', path: '/projects' },
    { name: 'Services Hub', path: '/services' },
    { name: 'Process Workflow', path: '/process' },
    { name: 'Packages & Rates', path: '/pricing' },
    { name: 'About Studio', path: '/about' },
    { name: 'FAQs Accordion', path: '/faqs' },
    { name: 'Contact Form', path: '/contact' }
  ];

  const services = [
    { name: '3D Walkthrough Rendering', path: '/services/3d-walkthrough-animation' },
    { name: 'Real Estate Video Ads', path: '/services/real-estate-video-advertising' },
    { name: 'Aerial Drone Shoot', path: '/services/drone-photography-videography' },
    { name: '360° Virtual Tours', path: '/services/360-virtual-tours' },
    { name: 'microsite Development', path: '/services/real-estate-websites' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-canvas border-t border-line pt-16 pb-8 relative mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12 text-left">
        
        {/* Brand column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <img 
              src={navLogo} 
              alt="Kinema Studio - Make It Kinematic" 
              className="h-8 md:h-10 w-auto invert brightness-200 object-contain"
            />
          </Link>
          <p className="text-xs text-text-muted leading-relaxed max-w-sm">
            Pune's premier cinematic real estate visualization partner. Turning properties into aspirational visual stories with film, aerial compliance, CGI, and 360° tours.
          </p>
          <p className="text-[10px] text-zinc-600 italic">
            "Property, reimagined in motion."
          </p>
        </div>

        {/* Navigation column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <p className="text-white text-xs font-bold uppercase tracking-wider font-display">Navigation</p>
          <ul className="flex flex-col gap-2 text-xs">
            {quickLinks.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="text-text-muted hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services column */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <p className="text-white text-xs font-bold uppercase tracking-wider font-display">Core Offerings</p>
          <ul className="flex flex-col gap-2 text-xs">
            {services.map(srv => (
              <li key={srv.name}>
                <Link to={srv.path} className="text-text-muted hover:text-white transition-colors">
                  {srv.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <p className="text-white text-xs font-bold uppercase tracking-wider font-display">Pune Studio</p>
          
          <div className="flex flex-col gap-3 text-xs text-text-muted">
            <a 
              href="https://maps.app.goo.gl/mAQPNxYazi4smxrd6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 hover:text-white transition-colors"
            >
              <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <span>Nal Stop, Kothrud, Pune, Maharashtra, India ↗</span>
            </a>
            
            <div className="flex flex-col gap-1.5">
              <a href="tel:+918600477848" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <span>+91 86004 77848</span>
              </a>
              <a href="tel:+917498360588" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <span>+91 74983 60588</span>
              </a>
            </div>

            <a href="mailto:kinemastudio@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-brand shrink-0" />
              <span>kinemastudio@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-line max-w-7xl mx-auto px-4 md:px-8 mb-8" />

      {/* Legal and credits bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-text-muted">
        <p>© 2026 Kinema Studio. All rights reserved.</p>
        
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>

        <button 
          onClick={scrollToTop} 
          className="flex items-center gap-1 hover:text-white transition-colors"
          title="Scroll to top"
        >
          Back to Top <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Global Sticky Floating WhatsApp Button */}
      <a
        href="https://wa.me/918600477848?text=Hello%20Kinema%20Studio!%20I%20am%20interested%20in%20your%20real%20estate%20media%20services."
        target="_blank"
        rel="noopener noreferrer"
        title="Direct WhatsApp Chat"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand border border-white/10 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        
        {/* Glow pulsing ring around WhatsApp */}
        <span className="absolute inset-0 rounded-full border border-brand animate-ping opacity-60 pointer-events-none" />
      </a>
    </footer>
  );
};
