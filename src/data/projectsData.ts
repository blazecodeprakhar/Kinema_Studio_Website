import { 
  renderImages, animationVideos, droneVideos, videoAds, reelVideos 
} from './mediaRegistry';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  year: string;
  propertyType: string;
  servicesUsed: string[];
  brief: string;
  challenge: string;
  approach: string[];
  deliverables: string[];
  results: string;
  quote: { text: string; author: string; role: string };
  featured: boolean;
  themeColor: string;
  heroImage: string;
  heroVideo?: string;
  galleryImages: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "blue-horizon-towers",
    slug: "blue-horizon-towers",
    title: "Blue Horizon Towers",
    client: "Horizon Developers",
    location: "Kharadi, Pune",
    year: "2026",
    propertyType: "Residential Township",
    servicesUsed: ["3d-walkthrough-animation", "real-estate-video-advertising", "drone-photography-videography"],
    brief: "Create pre-launch visual assets for a massive 4-tower residential township. The client needed to generate 500+ qualified leads prior to ground-breaking, requiring a premium launch film, high-fidelity interior renders, and aerial connectivity maps.",
    challenge: "The construction was in the pre-excavation stage. Buyers could not visit the location to understand the surrounding tech park accessibility or layout spacing. We had to build a complete 3D model of the project and stitch it with real drone shots to show actual skyline views.",
    approach: [
      "Stitched 3D architectural renders onto 4K drone plates taken at 200 feet.",
      "Produced a cinematic 90-second launch ad showcasing premium lifestyle amenities (infinity pool, smart gym).",
      "Created location mapping overlays showing travel times to EON IT Park."
    ],
    deliverables: [
      "90s Ultra HD Cinematic Launch Video",
      "12 Interior & Exterior Photorealistic Renders",
      "3 Social Media Bumper Ads (15s vertical)",
      "High-res Hoarding Graphic Renders"
    ],
    results: "Horizon Developers received over 650 lead submissions within the first 14 days of running the campaign, resulting in 40% of phase 1 units booked during the launch weekend.",
    quote: {
      text: "Kinema Studio delivered visuals that felt absolutely real. Buyers could look out of their virtual balconies and see the actual sunset view we mapped with drones. Truly world-class work.",
      author: "Rajesh Shirke",
      role: "VP Marketing, Horizon Group"
    },
    featured: true,
    themeColor: "#E50914",
    heroImage: renderImages[36].src, // tran5 (Township Masterplan)
    heroVideo: animationVideos[0].src, // animRiverVista
    galleryImages: [
      renderImages[36].src,
      renderImages[18].src,
      renderImages[6].src,
      renderImages[24].src,
      renderImages[15].src
    ]
  },
  {
    id: "kothrud-heritage",
    slug: "kothrud-heritage",
    title: "Heritage Residencia",
    client: "Vilas Builders",
    location: "Kothrud, Pune",
    year: "2025",
    propertyType: "Luxury Residential",
    servicesUsed: ["real-estate-videography", "real-estate-photography", "drone-photography-videography"],
    brief: "Produce listing assets for a newly completed premium apartment block in Kothrud. The goal was to target high-net-worth individuals in Pune looking for spacious 3 & 4 BHK residences.",
    challenge: "Kothrud is a dense, established neighborhood. We needed to highlight the residential tower's quiet enclave setting while showing its proximity to Nal Stop and Kothrud's premium schools.",
    approach: [
      "Scheduled a golden-hour shoot to capture warm sunset reflections on the building's glass facade.",
      "Used ultra-wide lenses to photograph spacious rooms without distorting ceiling heights.",
      "Captured aerial videos showing Kothrud's green canopy surrounding the property."
    ],
    deliverables: [
      "60s Luxury Walkthrough Reel",
      "35 Edited HDR High-Res Photos",
      "10 Twilight Facade Images",
      "Brochure Print Exports"
    ],
    results: "The project visual reel accumulated 80,000+ organic views on Instagram, bringing direct walk-in client inquiries that resulted in the final penthouse sale within 3 weeks.",
    quote: {
      text: "The photography was flawless, especially the twilight shots. It made our project stand out immediately on portals. Every local builder in Pune should shoot with Kinema.",
      author: "Anand Vilas",
      role: "Managing Director, Vilas Builders"
    },
    featured: true,
    themeColor: "#FF2D35",
    heroImage: renderImages[18].src, // mav1 (Twilight Facade)
    heroVideo: reelVideos[2].src, // reelImg6685
    galleryImages: [
      renderImages[18].src,
      renderImages[1].src,
      renderImages[3].src,
      renderImages[8].src,
      renderImages[20].src
    ]
  },
  {
    id: "onyx-commercial-hub",
    slug: "onyx-commercial-hub",
    title: "The Onyx Commercial Hub",
    client: "Onyx Infrastructure",
    location: "Baner, Pune",
    year: "2026",
    propertyType: "Commercial Spaces",
    servicesUsed: ["360-virtual-tours", "real-estate-photography", "real-estate-websites"],
    brief: "Build an interactive leasing portal and shoot visual assets for a modern commercial office complex in Baner. Corporate tenants needed to explore vacant floors remotely.",
    challenge: "Traditional photo listings could not explain how multi-tenant partitions work on a 15,000 sqft plate. Corporate HR and managers from other cities could not travel for initial site selection.",
    approach: [
      "Shot high-res 360° panoramas at 20 separate points on the office floor.",
      "Created an interactive floor plan overlay where users click to hop from cabin to server room.",
      "Developed a custom single-page React micro-website to host the virtual tour."
    ],
    deliverables: [
      "Custom 20-Point Interactive 360° Tour",
      "Bespoke High-Speed Project Landing Page",
      "15 Office Space Showcase Stills",
      "Lead collection form linked to sales CRM"
    ],
    results: "Two corporate leases (totaling 8,500 sqft) were signed by companies based out of Mumbai and Bangalore, who selected and negotiated space based entirely on the virtual tour.",
    quote: {
      text: "Kinema Studio built a seamless tour. It was like walking around the floor. Our Bangalore lease client signed before their leadership even landed in Pune.",
      author: "Meera Sen",
      role: "Leasing Director, Onyx Commercial"
    },
    featured: true,
    themeColor: "#E50914",
    heroImage: renderImages[19].src, // mav2 (Commercial Hub Plaza)
    heroVideo: videoAds[0].src, // copy_0D42BD6B
    galleryImages: [
      renderImages[19].src,
      renderImages[5].src,
      renderImages[14].src,
      renderImages[25].src,
      renderImages[39].src
    ]
  },
  {
    id: "virasat-eco-resort",
    slug: "virasat-eco-resort",
    title: "Virasat Eco-Resort",
    client: "Virasat Hospitality Group",
    location: "Mulshi, Pune",
    year: "2025",
    propertyType: "Hospitality & Leisure",
    servicesUsed: ["drone-photography-videography", "video-editing", "360-virtual-tours"],
    brief: "Capture the scenic beauty, lakeside access, and luxury cottages of a premium resort near Mulshi. Visuals were required for the resort's new booking website launch.",
    challenge: "The resort spans 12 acres of hilly terrain. Traditional cameras could not convey the private access lakefront, dense tree cover, and distance between private luxury villas.",
    approach: [
      "Utilized drone tracking shots to guide viewers from the resort reception down to the lake dock.",
      "Stitched 360° tours for five distinct cabin tiers.",
      "Compiled a cinematic 2-minute promotional resort reel synced to relaxing ambient audio."
    ],
    deliverables: [
      "2-Minute Cinematic Resort Promo Film",
      "5-Cabin Interactive 360° Virtual Tour",
      "50 Lakefront & Cottage Stills",
      "15 Social Media Story Cuts"
    ],
    results: "The resort's weekend occupancy rates increased from 60% to 95% within the first month of deploying the cinematic video and cottage tours on their booking pages.",
    quote: {
      text: "The drone footage captured the pure serenity of Mulshi lake beautifully. Guests mention that the virtual tour of our cottages made their booking decisions easy.",
      author: "Vikram Gaikwad",
      role: "General Manager, Virasat Resort"
    },
    featured: false,
    themeColor: "#FF2D35",
    heroImage: renderImages[6].src, // aalo6 (Lakeside Villa Exterior)
    heroVideo: droneVideos[2].src, // droneVid3
    galleryImages: [
      renderImages[6].src,
      renderImages[16].src,
      renderImages[29].src,
      renderImages[40].src
    ]
  },
  {
    id: "urban-spaces-co-working",
    slug: "urban-spaces-co-working",
    title: "Urban Spaces Co-Working",
    client: "Urban Offices Ltd",
    location: "Viman Nagar, Pune",
    year: "2026",
    propertyType: "Interior Design & Co-working",
    servicesUsed: ["real-estate-photography", "real-estate-videography", "video-editing"],
    brief: "Showcase the interior design, modular desk setups, and premium meeting rooms of a premium co-working space in Viman Nagar. Target clients were tech startups and freelancers.",
    challenge: "Co-working spaces can feel cramped. The videography needed to emphasize spatial breathing room, natural sunlight access, and modern community design features.",
    approach: [
      "Used specialized wide-angle probe lenses for close-ups of desk fittings and coffee bar details.",
      "Programmed motorized slider tracks to create slow, buttery-smooth cinematic pans of open desks.",
      "Edited a fast-paced, high-energy 45-second promo emphasizing community vibes."
    ],
    deliverables: [
      "45s Energetic Commercial Promo Reel",
      "25 Detail-oriented Interior Stills",
      "Google Business Profile Optimized Photo Pack"
    ],
    results: "Co-working desk subscriptions reached 90% capacity within 30 days of launch, with the promotional reel accumulating 15,000 targeted views from Pune-based tech professionals.",
    quote: {
      text: "The energy of the video was exactly what we needed. They managed to capture the modern aesthetics and warm community feel of our workspace perfectly.",
      author: "Preeti Rao",
      role: "Community Manager, Urban Spaces"
    },
    featured: false,
    themeColor: "#E50914",
    heroImage: renderImages[14].src, // ink5 (Co-Working Desk Pods)
    heroVideo: reelVideos[4].src, // reelImg3287
    galleryImages: [
      renderImages[14].src,
      renderImages[28].src,
      renderImages[4].src,
      renderImages[11].src
    ]
  },
  {
    id: "pride-signature-villas",
    slug: "pride-signature-villas",
    title: "Pride Signature Villas",
    client: "Pride Group",
    location: "Wakad, Pune",
    year: "2025",
    propertyType: "Luxury Villa Project",
    servicesUsed: ["3d-walkthrough-animation", "real-estate-videography", "real-estate-photography"],
    brief: "Provide visualization assets for 15 custom luxury villas. The developer wanted to showcase the ultra-premium materials, double-height living rooms, and private backyards.",
    challenge: "The model villa was completed, but the surrounding 14 units were under active construction. The shoot had to capture the model villa while hiding scaffolding, dust, and raw structures next door.",
    approach: [
      "Designed tight interior framing and low-angle shots to block out window views of construction gear.",
      "Captured twilight exterior photography where bright lights highlighted the villa facade, hiding surrounding shadows.",
      "Blended model villa photos with 3D renderings of the completed community park layout."
    ],
    deliverables: [
      "3D Render of Completed Villa Park",
      "3BHK Model Villa Walkthrough Video",
      "20 High-End Interior Editorial Photos",
      "10 Facade & Backyard Stills"
    ],
    results: "11 of the 15 luxury villas were pre-sold during construction, reducing developers' reliance on open-market broker agencies.",
    quote: {
      text: "Kinema was incredibly professional. They shot the model villa during active construction and delivered photos that looked like a quiet, completed luxury oasis.",
      author: "Sameer Wakade",
      role: "Project Director, Pride Group"
    },
    featured: false,
    themeColor: "#FF2D35",
    heroImage: renderImages[0].src, // villa55 (Villa 55 Facade)
    heroVideo: animationVideos[1].src, // animBeachVilla
    galleryImages: [
      renderImages[0].src,
      renderImages[26].src,
      renderImages[33].src,
      renderImages[10].src
    ]
  }
];
