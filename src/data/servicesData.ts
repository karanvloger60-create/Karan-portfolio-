import { ServiceTier } from '../types';

export const servicesData: ServiceTier[] = [
  {
    id: 'basic-website',
    name: 'Basic Website',
    price: '₹3,000',
    priceNote: 'Starting price',
    turnaround: '3 – 5 Days',
    bestFor: 'Personal portfolios, single-product landing pages, simple local shop landing pages.',
    description: 'A sleek, mobile-friendly single-page website that establishes an instant, trustworthy digital presence for your brand.',
    features: [
      'Single-page modern layout (Up to 5 sections)',
      '100% Mobile & tablet responsive design',
      'Contact form & direct WhatsApp click-to-chat',
      'Fast loading speed & clean code',
      'Basic SEO (Title, meta tags, Google indexing)',
      'Free hosting setup on Vercel / Netlify'
    ],
    ctaText: 'Get Started with Basic'
  },
  {
    id: 'business-website',
    name: 'Business Website',
    price: '₹5,000+',
    priceNote: 'Most Popular',
    popular: true,
    turnaround: '5 – 7 Days',
    bestFor: 'Restaurants, cafes, consulting firms, service professionals, local clinics & retail shops.',
    description: 'A multi-page business website designed to convert casual visitors into paying customers and direct WhatsApp inquiries.',
    features: [
      'Up to 4-5 custom designed pages (Home, About, Services/Menu, Gallery, Contact)',
      'Interactive elements (Filterable menu, booking form, FAQ accordion)',
      'Direct WhatsApp order/booking automation',
      'Google Maps & Local SEO optimization',
      'Smooth micro-animations & custom styling',
      'Social media integration & Google review showcase',
      '15 Days free post-launch support & tweaks'
    ],
    ctaText: 'Choose Business Website'
  },
  {
    id: 'advanced-website',
    name: 'Advanced Website',
    price: '₹8,000+',
    priceNote: 'High Conversion',
    turnaround: '7 – 10 Days',
    bestFor: 'Fashion brands, clothing boutiques, product catalog businesses, booking systems.',
    description: 'Feature-rich web application with dynamic product catalogs, database integration, custom filters, and fast user flows.',
    features: [
      'Full dynamic catalog or e-commerce storefront',
      'Firebase database integration for real-time inquiries/leads',
      'Interactive search, category filtering & product modals',
      'WhatsApp direct checkout with automated bill summary',
      'Ultra-optimized performance (95+ Google PageSpeed)',
      'Advanced SEO schema markup for rich snippets',
      '30 Days priority support & maintenance'
    ],
    ctaText: 'Build Advanced Website'
  },
  {
    id: 'custom-website',
    name: 'Custom Website / Web App',
    price: "Let's Discuss",
    priceNote: 'Tailored Solution',
    turnaround: 'Custom Timeline',
    bestFor: 'Startups, creators requiring unique web apps, custom portals, custom dashboards.',
    description: 'Fully custom end-to-end web engineering tailored strictly to your unique business model, workflow, or custom API needs.',
    features: [
      'Bespoke architecture built with React, Node.js & Cloud DB',
      'Custom user accounts, authentication or admin dashboard',
      'Payment gateway integration (Razorpay, Stripe, UPI)',
      'Custom API integrations & automated notifications',
      'Scalable database design & rigorous testing',
      'Dedicated project consultation & weekly sprint demos'
    ],
    ctaText: "Discuss Your Project"
  }
];

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const calculatorAddons: AddonOption[] = [
  { id: 'whatsapp-order', name: 'WhatsApp Order / Booking System', price: 800, description: 'Pre-formatted cart details sent straight to your phone' },
  { id: 'cms-catalog', name: 'Dynamic Product / Menu Catalog', price: 1500, description: 'Easily update items, prices and photos anytime' },
  { id: 'speed-seo', name: 'Advanced Local SEO & Google Profile', price: 1000, description: 'Rich structured data to rank on local Google search' },
  { id: 'express-delivery', name: 'Express 48-Hour Priority Delivery', price: 1200, description: 'Dedicated round-the-clock rush sprint' },
  { id: 'domain-setup', name: 'Domain (.com / .in) & DNS Setup Assistance', price: 500, description: 'Connecting your custom business domain name cleanly' }
];
