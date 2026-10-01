export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  client: string;
  timeline: string;
  deliverables: string[];
  features: string[];
  technologies: string[];
  liveUrl?: string;
  screenshots?: string[];
  stats?: { label: string; value: string }[];
  highlightColor: string;
  demoType: 'ecommerce' | 'restaurant' | 'local_business';
  demoDetails: {
    heroTagline: string;
    subtext: string;
    sampleItems: {
      name: string;
      price: string;
      category: string;
      badge?: string;
      desc?: string;
    }[];
    announcement?: string;
    actionLabel: string;
  };
}

export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  turnaround: string;
  description: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
  ctaText: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  iconName: string;
  headline: string;
  description: string;
  deliverables: string[];
  clientRole: string;
  duration: string;
}

export interface InquiryFormState {
  name: string;
  businessName: string;
  serviceTier: string;
  projectDescription: string;
  contactMethod: 'whatsapp' | 'email';
  contactValue: string;
}
