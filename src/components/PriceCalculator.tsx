import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Check, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceOption {
  id: string;
  name: string;
  baseCost: number;
  perSqftCost?: number;
  timeDays: number;
}

export const PriceCalculator: React.FC = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    { id: 'apartment', name: 'Residential Apartment (Standard)', multiplier: 1.0 },
    { id: 'luxury-villa', name: 'Luxury Villa / Penthouse', multiplier: 1.25 },
    { id: 'commercial', name: 'Commercial Hub / Office Space', multiplier: 1.15 },
    { id: 'resort', name: 'Hospitality Resort / Township', multiplier: 1.4 }
  ];

  const serviceOptions: ServiceOption[] = [
    { id: 'photography', name: 'HDR Interior/Exterior Photography', baseCost: 15000, perSqftCost: 2, timeDays: 3 },
    { id: 'videography', name: 'Cinematic Property Walkthrough Video', baseCost: 25000, perSqftCost: 4, timeDays: 5 },
    { id: 'drone', name: 'DGCA-Compliant Aerial Drone Shoot (4K)', baseCost: 18000, timeDays: 2 },
    { id: 'walkthrough3d', name: '3D Walkthrough Rendering & Animation', baseCost: 65000, perSqftCost: 15, timeDays: 12 },
    { id: 'tour360', name: '360° Interactive Virtual Tour (Web Embed)', baseCost: 12000, perSqftCost: 1.5, timeDays: 4 },
    { id: 'website', name: 'Custom Project Landing Page & Lead Form', baseCost: 30000, timeDays: 7 }
  ];

  const locationOptions = [
    { id: 'city', name: 'Within Pune City Limits (Kothrud, Baner, Kharadi, etc.)', surcharge: 0 },
    { id: 'outskirts', name: 'Pune Outskirts / Suburbs (Mulshi, Hinjawadi, Chakan)', surcharge: 3000 },
    { id: 'outside', name: 'Outside Pune (Mumbai, Lonavala, Satara, etc.)', surcharge: 8000 }
  ];

  const [propType, setPropType] = useState<string>('apartment');
  const [sizeSqft, setSizeSqft] = useState<number>(2000);
  const [selectedServices, setSelectedServices] = useState<string[]>(['photography', 'videography']);
  const [location, setLocation] = useState<string>('city');

  const [costMin, setCostMin] = useState<number>(0);
  const [costMax, setCostMax] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);

  const handleToggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    let baseSum = 0;
    let maxDays = 0;
    const typeObj = propertyTypes.find(p => p.id === propType);
    const locObj = locationOptions.find(l => l.id === location);
    const multiplier = typeObj ? typeObj.multiplier : 1.0;
    const surcharge = locObj ? locObj.surcharge : 0;

    selectedServices.forEach(srvId => {
      const srv = serviceOptions.find(s => s.id === srvId);
      if (srv) {
        let serviceCost = srv.baseCost;
        if (srv.perSqftCost) {
          serviceCost += sizeSqft * srv.perSqftCost;
        }
        baseSum += serviceCost;
        maxDays = Math.max(maxDays, srv.timeDays);
      }
    });

    const finalBase = baseSum * multiplier + surcharge;
    
    // Create an estimate range
    setCostMin(Math.round(finalBase * 0.95));
    setCostMax(Math.round(finalBase * 1.15));
    // Approximate turnaround days (longest service + some processing buffer)
    setTotalDays(selectedServices.length > 0 ? maxDays + Math.round(selectedServices.length * 0.5) : 0);
  }, [propType, sizeSqft, selectedServices, location]);

  const handleBookWithPrefs = () => {
    // Navigate to appointment page and pass values via state or search query
    navigate('/book-a-project', { 
      state: { 
        propType, 
        sizeSqft, 
        selectedServices, 
        location,
        estimatedCost: `₹${costMin.toLocaleString('en-IN')} - ₹${costMax.toLocaleString('en-IN')}`
      } 
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-surface p-6 md:p-8 rounded-2xl border border-line">
      {/* Inputs side */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-bold font-display text-white mb-1.5 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand" /> Media Budget Planner
          </h3>
          <p className="text-text-muted text-xs">Configure your property parameters to generate a launch-cost estimation.</p>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-white uppercase tracking-wider">1. Property Segment</label>
          <select 
            value={propType}
            onChange={(e) => setPropType(e.target.value)}
            className="w-full bg-canvas text-white border border-line px-3 py-2.5 rounded-lg text-sm"
          >
            {propertyTypes.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Size Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-white uppercase tracking-wider">2. Carpet / Plot Area</label>
            <span className="text-brand font-mono text-sm font-semibold">{sizeSqft.toLocaleString()} Sq.Ft.</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="15000" 
            step="100"
            value={sizeSqft} 
            onChange={(e) => setSizeSqft(Number(e.target.value))}
            className="w-full accent-brand bg-canvas h-1.5 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>500 sqft (Studio/1BHK)</span>
            <span>15,000 sqft (Mega Township)</span>
          </div>
        </div>

        {/* Checkboxes Services */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-white uppercase tracking-wider">3. Services Required</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serviceOptions.map(srv => {
              const isSelected = selectedServices.includes(srv.id);
              return (
                <div 
                  key={srv.id}
                  onClick={() => handleToggleService(srv.id)}
                  className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-brand bg-brand/5' 
                      : 'border-line bg-canvas hover:border-zinc-700'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-all duration-150 ${
                    isSelected ? 'bg-brand border-brand text-white' : 'border-zinc-600'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-tight">{srv.name}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      Est. Turnaround: {srv.timeDays} days
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location Select */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-white uppercase tracking-wider">4. Site Location Range</label>
          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-canvas text-white border border-line px-3 py-2.5 rounded-lg text-sm"
          >
            {locationOptions.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Outputs side */}
      <div className="lg:col-span-5 bg-canvas p-6 rounded-xl border border-line flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest bg-brand/10 border border-brand/20 px-2.5 py-1 rounded self-start">
            Project Estimate
          </span>

          {/* Pricing range */}
          <div>
            <p className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Estimated Budget Range</p>
            {selectedServices.length > 0 ? (
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-extrabold font-display text-white">
                  ₹{costMin.toLocaleString('en-IN')}
                </span>
                <span className="text-text-muted text-sm">-</span>
                <span className="text-2xl md:text-3xl font-extrabold font-display text-white">
                  ₹{costMax.toLocaleString('en-IN')}
                </span>
              </div>
            ) : (
              <p className="text-brand text-sm mt-1 font-semibold">Select at least 1 service</p>
            )}
            <p className="text-[10px] text-text-muted mt-1.5 leading-relaxed">
              *GST is calculated additionally at checkout. Rates are indicative based on scope.
            </p>
          </div>

          <hr className="border-line" />

          {/* Timeline & Inclusions */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white text-xs">
              <Calendar className="w-4 h-4 text-brand" />
              <span>Project Delivery: <strong>~{totalDays} business days</strong> from shoot completion</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] text-white font-semibold uppercase tracking-wider">Inclusions:</p>
              <ul className="text-[11px] text-text-muted space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand" /> Fully edited HDR files with license rights
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand" /> Professional lighting, staging help
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand" /> High-speed cloud links & revisions
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking CTA */}
        <div className="mt-6 flex flex-col gap-3">
          <button 
            disabled={selectedServices.length === 0}
            onClick={handleBookWithPrefs}
            className="w-full bg-brand hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            Prefill & Book Appointment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-start gap-1.5 text-[9px] text-text-muted leading-relaxed">
            <AlertCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
            <span>
              This estimator is for planning purposes. We verify flight path airspace safety and site access before issuing a final quote.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
