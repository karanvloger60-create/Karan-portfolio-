import React, { useState } from 'react';
import { ArrowDown, MessageCircle, Instagram, Smartphone, CheckCircle, Zap, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { Project } from '../types';
import defaultAvatar from '../assets/images/karan_developer_avatar_1790744780059.jpg';
import { projectsData as defaultProjects } from '../data/projectsData';

interface HeroProps {
  avatarUrl?: string;
  projects?: Project[];
}

export const Hero: React.FC<HeroProps> = ({ avatarUrl = defaultAvatar, projects = [] }) => {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  // Safe fallback to default projects if array is empty
  const realProjects = projects && projects.length > 0 ? projects : defaultProjects;
  const safeIndex = activePreviewIndex >= 0 && activePreviewIndex < realProjects.length ? activePreviewIndex : 0;
  const currentProject = realProjects[safeIndex] || defaultProjects[0];

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.querySelector('#projects');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Dynamic Ambient Blur Glows */}
      <div className="absolute top-16 left-1/4 -translate-x-1/2 w-[500px] h-[350px] bg-sky-400/20 dark:bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-36 right-1/4 w-[450px] h-[350px] bg-indigo-400/20 dark:bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Clear & Fresh Headline with 100% Sharp Contrast */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill with Solid High-Contrast Styling */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-sm text-xs font-bold text-slate-900 dark:text-slate-100">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>Available for New Projects</span>
              <span className="text-slate-400">·</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">3–7 Days Delivery</span>
            </div>

            {/* Main Headline - Ultra Crisp */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
                Karan <span className="text-blue-600 font-light">—</span>{' '}
                <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  Web Developer
                </span>
              </h1>
              <p className="text-lg sm:text-2xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-xl">
                I design & build modern websites for businesses & creators.
              </p>
            </div>

            {/* Value Tags with Crisp Background and Dark Text */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-sm text-slate-900 dark:text-slate-100 font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>&lt; 1.0s Speed</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-sm text-slate-900 dark:text-slate-100 font-bold">
                <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                <span>100% Mobile Ready</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-sm text-slate-900 dark:text-slate-100 font-bold">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp Conversion Flow</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>View Real Client Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/918506043149?text=Hi%20Karan,%20I%20am%20looking%20to%20get%20a%20modern%20website%20developed."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-700 rounded-full transition-all hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp (8506043149)</span>
              </a>

              <a
                href="https://instagram.com/digidukaan.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-bold text-pink-700 dark:text-pink-300 bg-pink-100 hover:bg-pink-200 dark:bg-pink-950/60 dark:hover:bg-pink-900/80 border border-pink-300 dark:border-pink-700 rounded-full transition-all hover:scale-105 shadow-sm"
                title="Follow on Instagram @digidukaan.in"
              >
                <Instagram className="w-4 h-4" />
                <span>@digidukaan.in</span>
              </a>
            </div>

            {/* Quick Metrics Strip with Crisp Contrast */}
            <div className="pt-6 border-t border-slate-300 dark:border-neutral-800 flex items-center gap-6 sm:gap-8 text-slate-700 dark:text-neutral-300 text-xs sm:text-sm">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tabular-nums">
                  {realProjects.length > 0 ? realProjects.length : 3}+
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-neutral-400 mt-0.5">Live Client Sites</p>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-neutral-800" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tabular-nums">
                  ₹3,000
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-neutral-400 mt-0.5">Starting Price</p>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-neutral-800" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
                  100%
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-neutral-400 mt-0.5">Mobile-Ready Craft</p>
              </div>
            </div>
          </div>

          {/* Right Column: iPhone Frame Displaying REAL Client Websites */}
          {currentProject && (
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Ambient Backing Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/25 to-pink-500/20 blur-2xl rounded-full transform -rotate-6 scale-95" />

              {/* iPhone 16 Pro Glass Mockup Frame */}
              <div className="relative w-[320px] sm:w-[340px] rounded-[48px] p-3.5 bg-white/70 dark:bg-neutral-900/60 border-[6px] border-slate-300 dark:border-neutral-700 shadow-2xl backdrop-blur-2xl transition-all duration-300">
                {/* Dynamic Island */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-inner">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Screen Glass Surface */}
                <div className="relative rounded-[36px] overflow-hidden bg-neutral-950 aspect-[9/18] flex flex-col justify-between text-white border border-white/10">
                  {/* Top Status Bar inside phone */}
                  <div className="pt-3 px-6 flex justify-between items-center text-[10px] font-medium text-neutral-400 z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px]">5G</span>
                      <div className="w-4 h-2 border border-neutral-400 rounded-sm p-0.5">
                        <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* Real Browser Address Bar inside Phone */}
                  <div className="px-3 pt-2 z-20">
                    <div className="py-1 px-3 rounded-full bg-neutral-900/90 border border-neutral-700/80 flex items-center justify-between text-[11px] font-mono text-neutral-300 shadow-md">
                      <div className="flex items-center gap-1.5 truncate">
                        <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate text-white font-medium">
                          {currentProject.liveUrl ? currentProject.liveUrl.replace(/^https?:\/\//, '') : `${(currentProject.title || 'portfolio').toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
                        </span>
                      </div>
                      <span className="text-[9px] text-emerald-400 shrink-0 font-bold">SSL</span>
                    </div>
                  </div>

                  {/* Real Website Screenshot Viewport */}
                  <div className="relative flex-1 overflow-hidden mt-1.5 bg-neutral-900 flex items-center justify-center">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover object-top transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />

                    {/* Floating Info & Direct Live Website Button */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-neutral-950/95 border border-neutral-700/80 space-y-2 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-black text-white">{currentProject.title}</p>
                          <p className="text-[10px] text-neutral-400 font-medium">{currentProject.category}</p>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                          {currentProject.timeline}
                        </span>
                      </div>

                      {currentProject.liveUrl ? (
                        <a
                          href={currentProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-102"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Visit Real Website</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <a
                          href="#projects"
                          onClick={handleScrollToProjects}
                          className="w-full py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span>View Screenshots & Specs</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Switcher Tabs at bottom of Phone for Real Projects */}
                  {realProjects.length > 1 && (
                    <div className="p-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-1.5 z-20">
                      {realProjects.slice(0, 4).map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={() => setActivePreviewIndex(idx)}
                          className={`flex-1 py-1 px-1 rounded-xl text-[10px] font-bold transition-all truncate ${
                            activePreviewIndex === idx
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-neutral-400 hover:text-white bg-neutral-900'
                          }`}
                          title={p.title}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* iPhone Home Indicator */}
                  <div className="pb-2 pt-1 flex justify-center">
                    <div className="w-28 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>

                {/* Floating Verified Developer Glass Tag */}
                <div
                  className="absolute -bottom-4 -left-4 p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 flex items-center gap-3 shadow-xl hidden sm:flex"
                >
                  <img
                    src={avatarUrl}
                    alt="Karan avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/50"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold text-slate-950 dark:text-white">Karan</p>
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
                        ✓
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-neutral-400 font-medium">Front-End & Full-Stack</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
