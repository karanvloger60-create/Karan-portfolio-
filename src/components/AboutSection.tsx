import React from 'react';
import { Code2, Zap, Smartphone, HeartHandshake, Rocket, Sparkles, MessageCircle, Instagram } from 'lucide-react';
import defaultAvatar from '../assets/images/karan_developer_avatar_1790744780059.jpg';
import { LazyImage } from './LazyImage';

interface AboutSectionProps {
  avatarUrl?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ avatarUrl = defaultAvatar }) => {
  const skills = [
    'HTML5',
    'CSS3',
    'JavaScript (ES6+)',
    'React',
    'Tailwind CSS',
    'Firebase',
    'AI-assisted Rapid Development',
    'Vercel Deployment',
    'REST APIs',
    'SEO & Performance',
    'WhatsApp Order Flows',
    'Mobile Responsive UI'
  ];

  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: 'Ultra-Fast Performance',
      desc: 'No slow, heavy templates. Clean hand-written code that loads under 1 second on mobile networks.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
      title: '100% Mobile Optimized',
      desc: 'Over 80% of Indian consumers browse on phones. Every button, menu, and image is calibrated for thumbs.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      title: 'Direct 1-on-1 Contact',
      desc: 'You speak directly with me on WhatsApp. Zero agency confusion or delayed responses.'
    },
    {
      icon: <Rocket className="w-5 h-5 text-purple-600" />,
      title: 'Turnaround in 3–7 Days',
      desc: 'Rapid execution sprints that get your business live and welcoming customers without weeks of waiting.'
    }
  ];

  return (
    <section id="about" className="py-20 relative border-t border-slate-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic Portrait in Glass Frame */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Karan</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              Hey, I'm Karan.
            </h2>

            {/* Profile Glass Card */}
            <div
              className="relative rounded-3xl p-3 bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-xl"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <LazyImage
                  src={avatarUrl}
                  alt="Karan Web Developer"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white pointer-events-none">
                  <p className="text-base font-bold">Karan</p>
                  <p className="text-xs text-neutral-300 font-medium">Web Developer & UI Craftsman</p>
                </div>
              </div>
            </div>

            {/* Genuine Bio */}
            <div className="space-y-3 text-sm text-slate-800 dark:text-neutral-200 leading-relaxed font-normal">
              <p>
                I'm <strong className="text-slate-950 dark:text-white font-bold">Karan</strong>, a young web developer who builds modern, responsive and interactive websites for businesses and creators.
              </p>
              <p>
                I believe a website shouldn't just be an expensive online visiting card. It should load instantly, look stunning on every phone screen, and directly drive real WhatsApp inquiries and sales.
              </p>
            </div>

            {/* Quick Touchpoints */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/918506043149?text=Hi%20Karan,%20let's%20connect%20for%20a%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="https://instagram.com/digidukaan.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-100 hover:bg-pink-200 dark:bg-pink-950/60 border border-pink-300 dark:border-pink-800 transition-all hover:scale-105"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@digidukaan.in</span>
              </a>
            </div>
          </div>

          {/* Right Column: Skills & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            {/* Skills */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-950 dark:text-white">
                  Core Technologies & Skills
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-xs font-bold text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 transition-all hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Commitments 2x2 Grid with Crisp Contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-lg space-y-2 hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-2xl bg-blue-50 dark:bg-neutral-800 border border-blue-100 dark:border-neutral-700">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
