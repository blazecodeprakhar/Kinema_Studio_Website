import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Process } from './pages/Process';
import { Pricing } from './pages/Pricing';
import { FAQs } from './pages/FAQs';
import { Contact } from './pages/Contact';
import { BookingWizard } from './components/BookingWizard';
import { Legal } from './pages/Legal';

// Helper component to reset scroll window and update browser tab title on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const titleMap: Record<string, string> = {
      '/': "Kinema Studio | Real Estate Media & Cinematic Production Studio Pune",
      '/about': "About Us | Kinema Studio Pune",
      '/services': "Services & Packages | Kinema Studio Pune",
      '/projects': "Portfolio Case Studies | Kinema Studio Pune",
      '/process': "Production Process | Kinema Studio Pune",
      '/pricing': "Pricing & Estimator | Kinema Studio Pune",
      '/faqs': "Frequently Asked Questions | Kinema Studio Pune",
      '/contact': "Contact Studio | Kinema Studio Pune",
      '/book-a-project': "Book a Project | Kinema Studio Pune",
      '/privacy': "Privacy Policy | Kinema Studio",
      '/terms': "Terms of Service | Kinema Studio"
    };

    document.title = titleMap[pathname] || "Kinema Studio | Real Estate Visual Agency";
  }, [pathname]);

  return null;
};

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-canvas text-text-primary flex flex-col font-sans selection:bg-brand selection:text-white">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-a-project" element={<div className="pt-28 pb-16 px-4 md:px-8"><BookingWizard /></div>} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
