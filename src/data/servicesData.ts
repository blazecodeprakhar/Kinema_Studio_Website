export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortPromise: string;
  description: string;
  deliverables: string[];
  benefits: { title: string; desc: string }[];
  process: string[];
  equipment: string[];
  priceRange: string;
  faqs: { q: string; a: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "3d-walkthrough-animation",
    slug: "3d-walkthrough-animation",
    title: "360° Walkthrough Animation & Rendering",
    shortPromise: "Sell your vision before a single brick is laid.",
    description: "Turn technical architectural plans, blueprints, and concepts into cinematic 3D walkthrough journeys. Perfect for pre-launch developer marketing, helping buyers visualize scale, layout, and amenities clearly.",
    deliverables: [
      "30–120 second cinematic 3D walkthrough film (4K)",
      "High-resolution exterior and interior still renders",
      "Day/night and seasonal lighting variants",
      "Vertical social media cuts and landscape formats"
    ],
    benefits: [
      { title: "Boost Pre-launch Bookings", desc: "Showcase completed visual models in your sales gallery long before site completion." },
      { title: "Clarify Layout & Scale", desc: "Avoid spatial confusion with accurate 3D scale representations of layout, structural volume, and flow." },
      { title: "Consistent Marketing Collaterals", desc: "Create high-impact, uniform assets for websites, social channels, and outdoor displays." }
    ],
    process: [
      "CAD/Blueprint Intake & Review",
      "3D Modeling & Wireframing",
      "Texture, Lighting, & Material Application",
      "Draft Camera Path Review & Approvals",
      "High-Quality Rendering & Color Grading"
    ],
    equipment: ["Unreal Engine 5", "3ds Max & V-Ray", "Adobe Premiere Pro", "Dedicated Render Farm Infrastructure"],
    priceRange: "Custom Scope (Based on project area & details)",
    faqs: [
      { q: "What files do you need to start rendering?", a: "We require 2D AutoCAD files (.dwg), elevation blueprints, material schedules, and references for interior finishes." },
      { q: "How many iterations do we get?", a: "Our standard pricing includes 3 rounds of feedback (Layout review, texture/lighting check, and final minor adjustments)." }
    ]
  },
  {
    id: "real-estate-video-advertising",
    slug: "real-estate-video-advertising",
    title: "Real Estate Video Advertisements",
    shortPromise: "Campaign-ready ads tailored for social platforms and YouTube.",
    description: "Create premium property advertising campaigns built around your key demographic, project location, and unique selling points. We handle scriptwriting, professional voiceover, film shooting, and localized ad delivery cuts.",
    deliverables: [
      "Full cinematic property ad film (1-3 minutes)",
      "YouTube bumper ads (15s & 30s edits)",
      "Vertical Instagram Reels / Facebook Ads cuts",
      "Professional scriptwriting, voiceover licencing, and captioning"
    ],
    benefits: [
      { title: "Elevated Brand Image", desc: "Look like a tier-1 developer with cinematic visuals, smooth editing, and engaging storylines." },
      { title: "Optimized for Lead Generation", desc: "Ads are structured with clear hooks and call-to-actions to maximize sign-ups." },
      { title: "Multi-Channel Distribution", desc: "Get files formatted exactly for Instagram, YouTube, Facebook, and sales gallery screens." }
    ],
    process: [
      "Target Audience & Positioning Brief",
      "Concept Development & Scriptwriting",
      "On-Site Cinematic Shoot",
      "Voiceover Recording & Music Selection",
      "Editing, Graphics Overlay, & Deliveries"
    ],
    equipment: ["Sony FX3 / FX6 Cinema Cameras", "Gimbal Stabilizer Rigs", "Premium Wireless Lavalier Mics", "DaVinci Resolve Studio"],
    priceRange: "Packages starting from ₹45,000",
    faqs: [
      { q: "Is scriptwriting included in the package?", a: "Yes, we handle script drafting based on your buyer persona and project highlights before scheduling the shoot." },
      { q: "Can you provide local languages like Marathi for voiceover?", a: "Yes, we offer voiceover services in English, Hindi, and Marathi, with corresponding localized caption overlays." }
    ]
  },
  {
    id: "drone-photography-videography",
    slug: "drone-photography-videography",
    title: "Aerial Drone Photography & Videography",
    shortPromise: "DGCA-compliant aerial storytelling showing scale, connectivity, and landmarks.",
    description: "Capture the context of your development. Highlight key road networks, nearby schools, view corridors, and the absolute scale of the property from legal altitudes, operated by certified pilots.",
    deliverables: [
      "4K UHD stabilized aerial footage",
      "24MP high-dynamic-range aerial stills",
      "Location landmark graphic overlays (showing distance to hubs)",
      "Construction progress tracker series"
    ],
    benefits: [
      { title: "Contextual Accuracy", desc: "Highlight transport links, view horizons, and neighborhood perks from a single perspective." },
      { title: "Safe & Compliant Operations", desc: "Fully certified drone pilots, ensuring legal operations in Pune's yellow and green zones." },
      { title: "Dynamic Scale", desc: "Render large master-planned townships with absolute spatial overview." }
    ],
    process: [
      "No-Fly Zone Feasibility & Flight Clearances",
      "Flight Path Planning & Horizon Scouting",
      "Stabilized Aerial Capture (Golden Hour)",
      "RAW Photo processing & Video Stabilization",
      "Landmark Mapping Graphic Overlays"
    ],
    equipment: ["DJI Mavic 3 Pro", "DJI Inspire 3 (on demand)", "DGCA Certified Pilot Gear", "PolarPro ND filters"],
    priceRange: "Starting from ₹18,000 per shoot session",
    faqs: [
      { q: "Do you handle local drone shooting permissions?", a: "Yes, we coordinate flight paths and digital sky clearances. If the location falls within a strict restricted zone, we advise feasibility beforehand." },
      { q: "What happens in case of rain or bad weather?", a: "Drone flights require stable winds and clear visibility. In case of poor weather, we reschedule the flight at no additional cost." }
    ]
  },
  {
    id: "real-estate-videography",
    slug: "real-estate-videography",
    title: "Real Estate Videography",
    shortPromise: "Capture the flow, architectural details, and lifestyle of the space.",
    description: "Walk virtual buyers through show-flats, residential complexes, and luxury villas. We capture clean natural light, smooth gimbal movements, and detail shots that reveal layout fluidly and authentically.",
    deliverables: [
      "Show-flat visual tour walkthrough",
      "Common areas & amenity highlights video",
      "Client testimonial / Builder walk-along cuts",
      "Optimized vertical social reels for brokers and builders"
    ],
    benefits: [
      { title: "Immersive Realism", desc: "Allow NRI buyers and busy local families to experience the flow of the flat realistically." },
      { title: "Premium Listing Appeal", desc: "Increase property value perception with clean lighting, high frame rates, and professional grading." },
      { title: "One Shoot, Multiple Deliverables", desc: "Get full-length videos for website embeds and short-form cuts for WhatsApp/Social media." }
    ],
    process: [
      "Property Staging Consultation",
      "Shot Plan Design & Daylight Timing Selection",
      "Interior & Exterior Cinematic Capture",
      "Pacing Edit & Licensed Music Sync",
      "Final Review & Brand Logo Integration"
    ],
    equipment: ["Sony A7S III", "Laowa Ultra-wide Probe Lenses", "DJI Ronin RS3 Gimbal", "Aputure LED lights for dark areas"],
    priceRange: "Packages starting from ₹25,000",
    faqs: [
      { q: "How should we prepare the property before the videographer arrives?", a: "We provide a Staging Checklist which includes hiding exposed wires, cleaning glass panels, turning on all accent lights, and clearing clutter." },
      { q: "How long does a typical shoot take?", a: "A standard 2BHK/3BHK show-flat shoot takes between 4 to 6 hours on site to ensure perfect lighting and composition." }
    ]
  },
  {
    id: "real-estate-photography",
    slug: "real-estate-photography",
    title: "Real Estate Photography",
    shortPromise: "Architectural photography capturing space, texture, and light accurately.",
    description: "Ultra-wide, HDR architectural photography that showcases space and material details. We avoid unrealistic fisheye distortions to capture property layout, interior staging, and exterior facades precisely.",
    deliverables: [
      "25-50 edited HDR high-resolution photos",
      "Web, portal (99acres, MagicBricks), and print-ready formats",
      "Twilight / Blue-hour exterior hero image",
      "Full digital rights for marketing use"
    ],
    benefits: [
      { title: "Instant Click Rate", desc: "Generate up to 3x more clicks on property portals with gorgeous, high-contrast thumbnail images." },
      { title: "Accurate Color & Textures", desc: "Our advanced exposure-bracketed editing highlights wood grains, marble sheen, and outdoor view quality." },
      { title: "Premium Print Capability", desc: "Perfect resolution for large site hoarding boards, print brochures, and premium booklets." }
    ],
    process: [
      "Staging Review & Horizon Aligning",
      "Bracketed Exposure Shooting (Interior & Exterior)",
      "Twilight Facade Capture",
      "Advanced Post-Processing (Window Pulls, Color Balancing)",
      "Review Link Delivery"
    ],
    equipment: ["Sony A7R V (61 Megapixels)", "16-35mm G-Master Wide Lens", "Manfrotto Gear Head Tripod", "Multi-flash lighting setups"],
    priceRange: "Starting from ₹15,000",
    faqs: [
      { q: "What is Twilight / Blue-Hour photography?", a: "It is shooting the property exterior during the brief 20-minute window right after sunset. It gives buildings a warm, glowing, and high-value aesthetic." },
      { q: "Do you remove clutter or objects in photoshop?", a: "Minor corrections (hiding a plug or removing an exit sign) are included. Major object removals or virtual staging are charged separately." }
    ]
  },
  {
    id: "video-editing",
    slug: "video-editing",
    title: "Video Editing & Post-Production",
    shortPromise: "Turn raw footage into polished, marketing-ready visual stories.",
    description: "Already shot your own raw drone or walk-through footage? Send it to us. We edit, sync, color-grade, add sound effects, overlay location graphics, and deliver professional, ready-to-publish files.",
    deliverables: [
      "Coherent storyline assembly and pace-timing",
      "Cinematic color grading & exposure fixes",
      "Sound design & licensed background music",
      "Motion graphics overlays, titles, and text callouts"
    ],
    benefits: [
      { title: "Save Production Budgets", desc: "Leverage existing footage by polishing it into fresh campaigns without scheduling new shoots." },
      { title: "Speed up Delivery", desc: "Our editors deliver structured drafts quickly, allowing you to run ads immediately." },
      { title: "Consistent Aesthetic", desc: "Maintain uniform color tones, fonts, and logos across all your visual channels." }
    ],
    process: [
      "Footage Review & Selection Ingestion",
      "Storyboard & Pacing Draft Build",
      "Color Correction & Grading",
      "Sound Design & Motion Graphic Overlay",
      "Render Output & Client Revision Loop"
    ],
    equipment: ["DaVinci Resolve Studio", "Adobe Premiere & After Effects", "Soundly audio effects library"],
    priceRange: "Starting from ₹8,000 per video edit",
    faqs: [
      { q: "How do I send my raw files?", a: "You can share them via Google Drive, WeTransfer, or a secure Cloud link. We support all raw camera profiles (Log, RAW)." },
      { q: "What is your standard editing turnaround?", a: "For editing existing footage, the standard turnaround is 3 to 5 business days depending on complexity." }
    ]
  },
  {
    id: "360-virtual-tours",
    slug: "360-virtual-tours",
    title: "360° Virtual Tours",
    shortPromise: "Let buyers explore every room interactively from their browsers.",
    description: "Provide interactive, self-paced digital walkthroughs of apartments and commercial areas. Embed interactive text cards, pricing pop-ups, and floor plans. Works natively on mobile, tablets, and desktops.",
    deliverables: [
      "Full web-ready interactive 360° virtual tour link",
      "Easy HTML embed code for developer websites and property portals",
      "Custom navigation hotspots and floor-plan overlays",
      "Offline files backup (optional)"
    ],
    benefits: [
      { title: "Qualify Inbound Leads", desc: "Filter out casual site-visitors by letting prospects tour the flat digitally beforehand." },
      { title: "Perfect B2B Sales Tool", desc: "Enable channel partners and brokers to showcase properties during zoom calls effortlessly." },
      { title: "24/7 Virtual Showroom", desc: "Your properties are always open for virtual walks, accommodating out-of-town and NRI buyers." }
    ],
    process: [
      "Nodal Point Capture Mapping",
      "360° HDR Panorama Shooting",
      "Image Stitching & Exposure Retouching",
      "Tour Hotspot Construction (Adding floor plans & notes)",
      "Web Exporting & Integration Verification"
    ],
    equipment: ["Ricoh Theta X 360° Camera", "Insta360 Pro 2", "Heavy-duty panoramic carbon fiber stand", "Pannellum / Marzipano stitching software"],
    priceRange: "Starting from ₹12,000 per property tour",
    faqs: [
      { q: "Can this tour be embedded in listing portals like MagicBricks?", a: "Yes! The tour is delivered as an iframe link which is fully supported by all major real estate portals in India." },
      { q: "Do you host the tours or do we have to host them?", a: "We offer 1 year of free secure hosting. After that, we renew for a nominal annual hosting fee, or provide you the source files to host on your own server." }
    ]
  },
  {
    id: "real-estate-websites",
    slug: "real-estate-websites",
    title: "Website Development & Landing Pages",
    shortPromise: "Fast, custom project landing pages optimized for high conversion.",
    description: "We don't just shoot your property; we build the web platform that displays it. Get bespoke project landing pages that embed your 360° tours, drone films, pricing sheets, and high-converting contact forms directly.",
    deliverables: [
      "Custom React / Tailwind project landing page",
      "Secure hosting setup & custom domain linking",
      "Lead collection backend (auto-synced to Google Sheets / WhatsApp)",
      "Responsive layout optimized for mobile load times"
    ],
    benefits: [
      { title: "Maximized Return on Ad Spend", desc: "Convert ad traffic better with a landing page designed explicitly around media visuals and contact forms." },
      { title: "Ultra-fast Page Speeds", desc: "Avoid bulky templates. Our lightweight pages load instantly on 4G/5G mobile connections." },
      { title: "Lead Attribution tracking", desc: "Know exactly which ad campaign, banner, or Facebook link generated each lead." }
    ],
    process: [
      "Layout UX Planning & Lead Flow Mapping",
      "Content & Visual Asset Ingestion",
      "Development (React & Tailwind CSS)",
      "Lead capture & WhatsApp API Integrations",
      "Speed Optimization & Deployment Launch"
    ],
    equipment: ["Vite / React", "Tailwind CSS", "Resend Email API", "Vercel Hosting Cloud"],
    priceRange: "Starting from ₹30,000",
    faqs: [
      { q: "Is the site SEO friendly?", a: "Yes, we implement complete technical SEO, local structured schema data, meta tag configurations, and sitemaps at launch." },
      { q: "How are the leads delivered to us?", a: "We can route leads directly to your email, write them to a Google Sheet, or configure a WhatsApp notification bot that alerts your sales team instantly." }
    ]
  }
];
