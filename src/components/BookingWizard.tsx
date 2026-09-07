import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, HelpCircle } from 'lucide-react';

interface WizardState {
  serviceId: string;
  propType: string;
  stage: string;
  location: string;
  shootDate: string;
  sizeSqft: string;
  budgetRange: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

export const BookingWizard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const services = [
    { id: '3d-walkthrough-animation', name: '360° Walkthrough Rendering' },
    { id: 'real-estate-video-advertising', name: 'Video Ad Production' },
    { id: 'drone-photography-videography', name: 'Aerial Drone Shoot' },
    { id: 'real-estate-videography', name: 'Property Videography' },
    { id: 'real-estate-photography', name: 'Listing Photography' },
    { id: 'video-editing', name: 'Video Post-Production' },
    { id: '360-virtual-tours', name: '360° Virtual Tour' },
    { id: 'real-estate-websites', name: 'microsite Development' },
    { id: 'help', name: 'Help me choose / Multiple Services' }
  ];

  const budgetBands = [
    'Under ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,50,000',
    'Above ₹1,50,000',
    'Need guidance / Custom Scoped Retainer'
  ];

  // Initial state
  const [formData, setFormData] = useState<WizardState>({
    serviceId: '3d-walkthrough-animation',
    propType: 'apartment',
    stage: 'under-construction',
    location: 'Pune City',
    shootDate: '',
    sizeSqft: '2000',
    budgetRange: '₹25,000 - ₹50,000',
    name: '',
    company: '',
    phone: '',
    email: '',
    message: ''
  });

  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  // Prefill state from PriceCalculator if available
  useEffect(() => {
    if (location.state) {
      const stateData = location.state as any;
      setFormData(prev => ({
        ...prev,
        propType: stateData.propType || prev.propType,
        sizeSqft: stateData.sizeSqft ? String(stateData.sizeSqft) : prev.sizeSqft,
        serviceId: stateData.selectedServices?.[0] || prev.serviceId,
        budgetRange: stateData.estimatedCost ? `Calculated Est: ${stateData.estimatedCost}` : prev.budgetRange
      }));
    }
  }, [location.state]);

  const updateField = (field: keyof WizardState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const handleNext = () => {
    if (step === 1 && !formData.serviceId) {
      setValidationError('Please select a service to proceed.');
      return;
    }
    if (step === 2) {
      if (!formData.location.trim()) {
        setValidationError('Please provide the property site location.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.shootDate) {
        setValidationError('Please select an approximate shoot or delivery date.');
        return;
      }
    }
    if (step === 4 && !formData.budgetRange) {
      setValidationError('Please choose a budget band.');
      return;
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setValidationError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validations
    if (!formData.name.trim()) {
      setValidationError('Name is required.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setValidationError('Please provide a valid 10-digit phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setIsSubmitted(true);
  };

  // Compile WhatsApp link message
  const getWhatsAppLink = () => {
    const textMsg = `Hello Kinema Studio! I just filled a project brief on your website. Here are my details:
*Name:* ${formData.name}
*Company:* ${formData.company || 'Not Specified'}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service Needed:* ${services.find(s => s.id === formData.serviceId)?.name || formData.serviceId}
*Property Details:* ${formData.propType.toUpperCase()} (${formData.stage.replace('-', ' ')})
*Site Location:* ${formData.location}
*Carpet Size:* ${formData.sizeSqft} Sqft
*Preferred Date:* ${formData.shootDate}
*Budget Range:* ${formData.budgetRange}
*Additional Info:* ${formData.message || 'None'}`;

    return `https://wa.me/918600477848?text=${encodeURIComponent(textMsg)}`;
  };

  const renderProgress = () => {
    const stepsCount = 5;
    return (
      <div className="w-full flex items-center gap-1.5 mb-8">
        {Array.from({ length: stepsCount }).map((_, i) => {
          const index = i + 1;
          const isDone = index < step;
          const isActive = index === step;
          return (
            <React.Fragment key={index}>
              <div 
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  isDone 
                    ? 'bg-brand' 
                    : isActive 
                      ? 'bg-brand animate-pulse' 
                      : 'bg-line'
                }`}
              />
              {index < stepsCount && <div className="text-[10px] text-text-muted select-none">/</div>}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-surface border border-line p-8 rounded-2xl text-center flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">Brief Submitted Successfully!</h2>
          <p className="text-text-muted text-sm mt-2 max-w-md mx-auto">
            Thank you, {formData.name}. We have saved your property details and are analyzing the flight paths/render overheads.
          </p>
        </div>

        {/* WhatsApp redirection card */}
        <div className="w-full bg-canvas p-6 rounded-xl border border-line text-left flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
          <div>
            <p className="text-xs font-semibold text-white">Instantly Connect on WhatsApp</p>
            <p className="text-[10px] text-text-muted mt-1 max-w-sm">
              Send your brief summary to our producer directly on WhatsApp to skip the queue and initiate a callback.
            </p>
          </div>
          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all group shrink-0"
          >
            Start WhatsApp Chat <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Structured summary info */}
        <div className="w-full text-left bg-canvas/40 p-5 rounded-lg border border-line text-xs">
          <p className="text-white font-semibold uppercase tracking-wider mb-2 font-display">Brief Summary</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-text-muted">
            <p><strong>Service:</strong> {services.find(s => s.id === formData.serviceId)?.name}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p><strong>Stage:</strong> {formData.stage.replace('-', ' ')}</p>
            <p><strong>Size:</strong> {formData.sizeSqft} sqft</p>
            <p><strong>Target Date:</strong> {formData.shootDate}</p>
            <p><strong>Est Budget:</strong> {formData.budgetRange}</p>
          </div>
        </div>

        <button 
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
            setFormData({
              serviceId: '3d-walkthrough-animation',
              propType: 'apartment',
              stage: 'under-construction',
              location: 'Pune City',
              shootDate: '',
              sizeSqft: '2000',
              budgetRange: '₹25,000 - ₹50,000',
              name: '',
              company: '',
              phone: '',
              email: '',
              message: ''
            });
            navigate('/');
          }}
          className="text-xs text-text-muted hover:text-white underline cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-surface border border-line p-6 md:p-8 rounded-2xl shadow-xl">
      {/* Head section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white">Project Booking Wizard</h2>
          <p className="text-text-muted text-xs mt-1">Step {step} of 5</p>
        </div>
        <HelpCircle className="w-5 h-5 text-brand" />
      </div>

      {renderProgress()}

      {validationError && (
        <div className="mb-4 bg-brand/10 border border-brand/30 text-white text-xs px-4 py-2.5 rounded-lg">
          {validationError}
        </div>
      )}

      {/* STEP 1: Choose Service */}
      {step === 1 && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <p className="text-white text-sm font-semibold uppercase tracking-wider">Select the main service you need:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map(s => (
              <div
                key={s.id}
                onClick={() => updateField('serviceId', s.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-200 ${
                  formData.serviceId === s.id
                    ? 'border-brand bg-brand/5'
                    : 'border-line bg-canvas hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{s.name}</span>
                  {formData.serviceId === s.id && (
                    <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Property Segment & Location */}
      {step === 2 && (
        <div className="flex flex-col gap-5 animate-fade-in">
          <p className="text-white text-sm font-semibold uppercase tracking-wider">Property Details:</p>
          
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs text-text-muted uppercase font-semibold">Segment Type</label>
            <select
              value={formData.propType}
              onChange={(e) => updateField('propType', e.target.value)}
              className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
            >
              <option value="apartment">Residential Apartment Complex</option>
              <option value="luxury-villa">Luxury Villa / Estate</option>
              <option value="commercial">Commercial Hub / Offices</option>
              <option value="resort">Hospitality Hotel / Resort</option>
              <option value="industrial">Plot / Infrastructure Layout</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs text-text-muted uppercase font-semibold">Construction Stage</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'pre-launch', label: 'Pre-launch' },
                { id: 'under-construction', label: 'Under Const.' },
                { id: 'completed', label: 'Completed' }
              ].map(stg => (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => updateField('stage', stg.id)}
                  className={`py-2 px-3 text-xs border rounded-lg transition-colors cursor-pointer ${
                    formData.stage === stg.id 
                      ? 'border-brand bg-brand/5 text-white' 
                      : 'border-line bg-canvas text-text-muted hover:text-white'
                  }`}
                >
                  {stg.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs text-text-muted uppercase font-semibold">Site Location / Address</label>
            <input
              type="text"
              placeholder="e.g. Nal Stop, Kothrud, Pune"
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
            />
          </div>
        </div>
      )}

      {/* STEP 3: Timeline & Scale */}
      {step === 3 && (
        <div className="flex flex-col gap-5 animate-fade-in">
          <p className="text-white text-sm font-semibold uppercase tracking-wider">Scale & Schedule:</p>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs text-text-muted uppercase font-semibold">Approximate Shoot / Delivery Date</label>
            <input
              type="date"
              value={formData.shootDate}
              onChange={(e) => updateField('shootDate', e.target.value)}
              className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs text-text-muted uppercase font-semibold">Approximate Area size (Sqft)</label>
            <input
              type="number"
              placeholder="e.g. 2500"
              value={formData.sizeSqft}
              onChange={(e) => updateField('sizeSqft', e.target.value)}
              className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
            />
          </div>
        </div>
      )}

      {/* STEP 4: Budget */}
      {step === 4 && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <p className="text-white text-sm font-semibold uppercase tracking-wider">Choose Target Budget Limit:</p>
          <div className="flex flex-col gap-2.5">
            {budgetBands.map(band => (
              <div
                key={band}
                onClick={() => updateField('budgetRange', band)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  formData.budgetRange === band
                    ? 'border-brand bg-brand/5'
                    : 'border-line bg-canvas hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white">{band}</span>
                  {formData.budgetRange === band && (
                    <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: Contact Details */}
      {step === 5 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in text-left">
          <p className="text-white text-sm font-semibold uppercase tracking-wider">Contact & Final Message:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-muted uppercase font-semibold">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Rajesh Kumar"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-muted uppercase font-semibold">Company / Brand Name</label>
              <input
                type="text"
                placeholder="e.g. Horizon Developers"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-muted uppercase font-semibold">Phone Number *</label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-muted uppercase font-semibold">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. rajesh@horizon.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-text-muted uppercase font-semibold">Brief details of property / specific shoots</label>
            <textarea
              rows={3}
              placeholder="e.g. We require twilight photos of a completed 3BHK show-flat and drone mapping of the site context."
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              className="bg-canvas border border-line text-white p-2.5 rounded-lg text-xs resize-none"
            />
          </div>

          <div className="text-[10px] text-text-muted mt-1 leading-relaxed">
            * By submitting this form you consent to our team reaching out via phone or email within 12-24 hours.
          </div>
        </form>
      )}

      {/* Button Controls */}
      <div className="mt-8 pt-4 border-t border-line flex justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-raised border border-line text-text-muted hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all group cursor-pointer"
          >
            Submit Brief <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
