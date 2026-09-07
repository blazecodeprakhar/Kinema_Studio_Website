import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

import navLogo from '../assets/image_nav_bar.png';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,border-color,box-shadow] duration-300 border-b ${
          isScrolled 
            ? 'bg-[#050506]/95 border-zinc-800/80 py-3.5 backdrop-blur-md shadow-xl' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Logo Image (White Inverted) */}
          <Link to="/" className="flex items-center group shrink-0">
            <img 
              src={navLogo} 
              alt="Kinema Studio - Make It Kinematic" 
              className="h-6 sm:h-8 md:h-10 w-auto invert brightness-200 object-contain transition-opacity hover:opacity-90"
            />
          </Link>

          {/* Desktop Nav Center Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-xs font-semibold uppercase tracking-wider transition-colors hover:text-brand ${
                    isActive ? 'text-brand' : 'text-text-muted'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Action Right Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+918600477848" 
              title="Call Us"
              className="p-2 rounded-full border border-line text-text-muted hover:text-white hover:bg-raised transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>
            
            <a 
              href="https://wa.me/918600477848" 
              target="_blank" 
              rel="noopener noreferrer"
              title="WhatsApp Us"
              className="p-2 rounded-full border border-line text-text-muted hover:text-emerald-400 hover:bg-raised transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              to="/book-a-project"
              className="px-4 py-2 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Book a Project
            </Link>
          </div>

          {/* Hamburger Control for mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-text-muted hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6 text-brand" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile drawer menu */}
      <div 
        className={`fixed top-0 bottom-0 right-0 z-50 w-72 max-w-[85vw] bg-[#0C0C0F] border-l border-line p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Header row in mobile menu */}
          <div className="flex items-center justify-between border-b border-line pb-4 mt-2">
            <img 
              src={navLogo} 
              alt="Kinema Studio" 
              className="h-6 w-auto invert brightness-200 object-contain"
            />
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded bg-raised border border-line text-text-muted hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4 text-brand" />
            </button>
          </div>

          {/* Quick contact top links inside drawer */}
          <div className="grid grid-cols-2 gap-2">
            <a 
              href="tel:+918600477848" 
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-line text-xs font-semibold text-white hover:bg-raised"
            >
              <Phone className="w-3.5 h-3.5 text-brand" /> Call
            </a>
            <a 
              href="https://wa.me/918600477848"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-line text-xs font-semibold text-white hover:bg-raised"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp
            </a>
          </div>

          {/* Mobile links list */}
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-xs font-semibold uppercase tracking-wider py-2 transition-colors border-b border-white/[0.04] ${
                    isActive ? 'text-brand border-b-brand/40 font-bold' : 'text-text-muted'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* CTA in mobile menu */}
        <Link
          to="/book-a-project"
          className="w-full bg-brand hover:bg-brand-hover text-white text-center py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest mt-auto shadow-md"
        >
          Book a Project
        </Link>
      </div>
    </>
  );
};
