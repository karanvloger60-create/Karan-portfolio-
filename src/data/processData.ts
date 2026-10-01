import { ProcessStep } from '../types';

export const processSteps: ProcessStep[] = [
  {
    id: 'idea',
    stepNumber: '01',
    title: 'Idea',
    iconName: 'Lightbulb',
    headline: 'Understanding your business & target customers',
    description: 'We sit down over a quick call or WhatsApp chat to define your business goals, target audience, brand aesthetic, and the exact problem your website needs to solve.',
    deliverables: [
      'Project scope & feature blueprint',
      'Competitor & reference site analysis',
      'Clear timeline & pricing quote'
    ],
    clientRole: 'Share your vision, color preferences & content/photos if ready.',
    duration: 'Day 1'
  },
  {
    id: 'design',
    stepNumber: '02',
    title: 'Design',
    iconName: 'Palette',
    headline: 'Crafting modern, conversion-focused UI/UX',
    description: 'I design a clean, responsive layout tailored to your brand. No clunky templates — each typography pairing, button hierarchy, and mobile view is sculpted for high conversion.',
    deliverables: [
      'Interactive visual wireframes',
      'Mobile-first responsive design check',
      'Typography, color palette & button styles'
    ],
    clientRole: 'Review visual preview and share instant feedback.',
    duration: 'Day 2 – 3'
  },
  {
    id: 'development',
    stepNumber: '03',
    title: 'Development',
    iconName: 'Code',
    headline: 'Writing clean, lightning-fast modern code',
    description: 'I turn the finalized design into real, responsive code using React, TypeScript, and modern Tailwind CSS. Built with clean structure, smooth micro-interactions, and fast load times.',
    deliverables: [
      'Production-grade React components',
      'Mobile touch gestures & smooth transitions',
      'Cross-browser and multi-screen testing'
    ],
    clientRole: 'Relax while the codebase is constructed.',
    duration: 'Day 3 – 5'
  },
  {
    id: 'database',
    stepNumber: '04',
    title: 'Database & Logic',
    iconName: 'Database',
    headline: 'Connecting forms, catalogs & business workflows',
    description: 'More than just static HTML. I integrate Firebase, custom forms, WhatsApp order routing, product catalog state, and lead notifications so your website works as an active sales engine.',
    deliverables: [
      'Direct WhatsApp order/inquiry links',
      'Firebase or real-time inquiry database',
      'Interactive search & filter mechanics'
    ],
    clientRole: 'Test sample inquiries and test orders.',
    duration: 'Day 5 – 6'
  },
  {
    id: 'deployment',
    stepNumber: '05',
    title: 'Deployment & Launch',
    iconName: 'Rocket',
    headline: 'Going live to the world with high speed & SEO',
    description: 'We connect your custom domain (.in / .com), optimize SSL encryption, audit Google search indexing meta tags, and hand over a rock-solid, live website ready to welcome visitors.',
    deliverables: [
      'Live website on lightning-fast global CDN',
      'SSL Security Certificate configured',
      'Google SEO & Social OpenGraph cards ready',
      'Handoff walkthrough & 15-30 days post-launch support'
    ],
    clientRole: 'Celebrate your launch and start sharing with clients!',
    duration: 'Day 7'
  }
];
