import { Project } from '../types';
import ashuImg from '../assets/images/project_ashu_collection_1790744731751.jpg';
import grillsImg from '../assets/images/project_grills_curry_1790744752651.jpg';
import paanImg from '../assets/images/project_paan_break_zone_1790744766241.jpg';

export const projectsData: Project[] = [
  {
    id: 'ashu-collection',
    number: '01',
    title: 'Ashu Collection',
    category: 'Fashion / Clothing Store',
    tagline: 'Modern Boutique E-Commerce & WhatsApp Order System',
    shortDescription: 'High-performance fashion storefront designed for an apparel brand, featuring curated seasonal collections, instant WhatsApp ordering, and a mobile-first catalog.',
    fullDescription: 'Ashu Collection needed a digital upgrade to transition from offline walk-ins to a direct-to-consumer online fashion catalog. Built with React and optimized for lightning-fast mobile shopping, the site allows customers to browse ethnic and modern wear collections, select sizes and colors, and place orders directly via pre-filled WhatsApp messages with zero checkout friction.',
    image: ashuImg,
    client: 'Ashu Collection Retailers',
    timeline: '7 Days Delivery',
    highlightColor: 'from-amber-500/20 to-orange-500/10',
    demoType: 'ecommerce',
    deliverables: [
      'Interactive Product Showcase',
      'Instant WhatsApp Checkout Flow',
      'Dynamic Category & Size Filters',
      'Mobile-First Responsive Layout',
      'SEO & Google Business Metadata'
    ],
    features: [
      '1-Click WhatsApp Direct Ordering',
      'Curated Seasonal Lookbooks',
      'Smart Category & Price Filtering',
      'High-Resolution Zoomable Imagery',
      'Ultra-Fast Loading (< 1.2s)'
    ],
    technologies: ['React 19', 'Tailwind CSS', 'TypeScript', 'Motion', 'Vite', 'Lucide Icons'],
    liveUrl: 'https://ashucollection.example.com',
    stats: [
      { label: 'Mobile Conversion', value: '+68%' },
      { label: 'Avg Page Load', value: '0.9s' },
      { label: 'Direct WhatsApp Leads', value: '180+/mo' }
    ],
    demoDetails: {
      heroTagline: 'Elevate Your Everyday Style',
      subtext: 'Handcrafted ethnic wear, modern festive ensembles & premium cotton daily wear.',
      sampleItems: [
        { name: 'Royal Silk Anarkali Set', price: '₹2,499', category: 'Ethnic Wear', badge: 'Bestseller', desc: 'Embroidered silk with soft dupatta' },
        { name: 'Embroidered Linen Kurta', price: '₹1,299', category: 'Daily Casuals', badge: 'New', desc: '100% breathable organic linen' },
        { name: 'Velvet Festive Sherwani', price: '₹3,899', category: 'Festive', badge: 'Premium', desc: 'Handcrafted zardozi detailing' },
        { name: 'Cotton Printed Co-ord Set', price: '₹1,599', category: 'Daily Casuals', desc: 'Lightweight summer comfort fit' }
      ],
      announcement: '✨ Festive Season Sale: Flat 15% off on WhatsApp Orders',
      actionLabel: 'Order via WhatsApp'
    }
  },
  {
    id: 'grills-and-curry',
    number: '02',
    title: 'Grills & Curry',
    category: 'Restaurant & Dining Website',
    tagline: 'Gourmet Barbecue & Authentic Curry Experience',
    shortDescription: 'Appetizing restaurant platform featuring an interactive visual menu, table reservation system, chef specials, and direct call/location routing.',
    fullDescription: 'Grills & Curry wanted an independent online presence to showcase their sizzling tandoori grills and aromatic North Indian curries without paying 25-30% aggregator commissions. The website features an interactive digital menu, instant table reservations, Google Maps integration for directions, and customer review highlights.',
    image: grillsImg,
    client: 'Grills & Curry Fine Dining',
    timeline: '5 Days Delivery',
    highlightColor: 'from-red-500/20 to-amber-500/10',
    demoType: 'restaurant',
    deliverables: [
      'Interactive Digital Menu with Dish Badges',
      'Table Reservation Booking Engine',
      'Google Maps Directions & Quick Call CTA',
      'Chef Highlights & Food Gallery',
      'Mobile-Optimized Fast Dining UI'
    ],
    features: [
      'Filterable Menu (Starters, Tandoor, Curries, Breads)',
      'Table Reservation Form with WhatsApp Confirmation',
      'Direct Phone & Location Deep Linking',
      'Customer Testimonials Carousel',
      'FSSAI & Hygiene Trust Badges'
    ],
    technologies: ['React 19', 'Tailwind CSS', 'Lucide Icons', 'Responsive Engine', 'SEO Ready'],
    liveUrl: 'https://grillsandcurry.example.com',
    stats: [
      { label: 'Direct Table Bookings', value: '45+/wk' },
      { label: 'Aggregator Fee Saved', value: '₹22,000/mo' },
      { label: 'Google Maps Clicks', value: '+120%' }
    ],
    demoDetails: {
      heroTagline: 'Smoky Charcoal Grills & Rich Royal Curries',
      subtext: 'Authentic flavors marinated for 24 hours and slow-cooked to culinary perfection.',
      sampleItems: [
        { name: 'Smoked Angara Paneer Tikka', price: '₹340', category: 'Tandoor & Grills', badge: "Chef's Special", desc: 'Cottage cheese cubes with crushed spices & mint chutney' },
        { name: 'Butter Chicken / Dal Makhani Platter', price: '₹420', category: 'Main Curries', badge: 'Signature', desc: 'Slow simmered for 16 hours in creamy rich tomato gravy' },
        { name: 'Bhatti Spiced Chicken Kebab', price: '₹390', category: 'Tandoor & Grills', desc: 'Charcoal charred with royal Awadhi spices' },
        { name: 'Garlic Butter Chur Chur Naan', price: '₹95', category: 'Breads & Accompaniments', desc: 'Crispy layered clay oven flatbread' }
      ],
      announcement: '🔥 Book your weekend dinner table early & get a complimentary dessert',
      actionLabel: 'Reserve Table / Order Now'
    }
  },
  {
    id: 'chaurasiya-paan',
    number: '03',
    title: "Chaurasiya's Paan & Break Zone",
    category: 'Local Business & Cafe Website',
    tagline: 'Artisanal Betel Delicacies, Shakes & Youth Hangout Spot',
    shortDescription: 'Modern, vibrant local business website for a popular paan & cafe destination, featuring an artisanal flavor showcase, catering orders, and instant store directions.',
    fullDescription: 'Chaurasiya’s Paan & Break Zone transformed their legacy street-side reputation into a trendy destination for foodies and young crowds. The website brings their premium fire paan, chocolate paan, rich milkshakes, and signature chai to life with playful visuals, catering inquiries for weddings/parties, and seamless store locator integration.',
    image: paanImg,
    client: "Chaurasiya's Family Enterprises",
    timeline: '4 Days Delivery',
    highlightColor: 'from-emerald-500/20 to-teal-500/10',
    demoType: 'local_business',
    deliverables: [
      'Artisanal Flavor Catalog & Descriptions',
      'Event & Wedding Bulk Catering Inquiry Form',
      'Live Google Maps Directions & Contact Card',
      'Cleanliness & 100% Tobacco-Free Family Certification',
      'Social Media Instagram Feeds'
    ],
    features: [
      'Signature Paan & Refreshment Showcase',
      'Bulk Catering Request Generator',
      'Interactive Store Directions & Timings',
      'Hygienic Preparation Guarantee',
      '1-Tap WhatsApp Chat'
    ],
    technologies: ['React 19', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'Mobile PWA Ready'],
    liveUrl: 'https://chaurasiyapaan.example.com',
    stats: [
      { label: 'Event Catering Leads', value: '14/mo' },
      { label: 'Store Footfall via Web', value: '+45%' },
      { label: 'Customer Rating', value: '4.9 ★' }
    ],
    demoDetails: {
      heroTagline: 'Royal Betel Flavors & Refreshing Chill-Out Sips',
      subtext: '100% Tobacco-Free, 100% Hygenic. Silver-foiled Magahi Paan, Belgian Chocolate treats & chilled mocktails.',
      sampleItems: [
        { name: 'Royal Silver Shahi Meetha Paan', price: '₹60', category: 'Signature Paan', badge: 'Must Try', desc: 'Gulkand, roasted saunf, dry fruits & pure edible silver vark' },
        { name: 'Belgian Dark Chocolate Paan', price: '₹90', category: 'Fusion Delights', badge: 'Youth Favorite', desc: 'Crisp chocolate shell with sweet aromatic gulkand center' },
        { name: 'Kesar Pista Badam Shake', price: '₹120', category: 'Break Zone Drinks', desc: 'Thick chilled milk with Kashmiri saffron and crushed pistachios' },
        { name: 'Smoky Fire Paan Experience', price: '₹100', category: 'Signature Paan', badge: 'Trending', desc: 'A thrilling safe sensory burst of chilled cloves and flames' }
      ],
      announcement: '🎉 Book our Premium Live Paan Counter for Weddings & Corporate Parties',
      actionLabel: 'Chat on WhatsApp / Order'
    }
  }
];
