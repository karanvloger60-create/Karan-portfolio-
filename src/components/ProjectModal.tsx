import React, { useState } from 'react';
import { Project } from '../types';
import {
  X,
  Check,
  MessageCircle,
  Clock,
  ExternalLink,
  Globe,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileText
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'gallery' | 'casestudy';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  initialTab = 'gallery'
}) => {
  if (!isOpen || !project) return null;

  const [activeTab, setActiveTab] = useState<'gallery' | 'casestudy'>(initialTab);

  // Gallery state for multiple screenshots with defensive fallback
  const rawScreenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.image];
  const allScreenshots = rawScreenshots.filter(Boolean).length > 0 ? rawScreenshots.filter(Boolean) : [project.image || ''];
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const safeIndex = activeGalleryIndex >= 0 && activeGalleryIndex < allScreenshots.length ? activeGalleryIndex : 0;

  const whatsappInquiryUrl = `https://wa.me/918506043149?text=Hi%20Karan,%20I%20am%20interested%20in%20a%20website%20like%20${encodeURIComponent(
    project.title
  )}!`;

  const nextScreenshot = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % allScreenshots.length);
  };

  const prevScreenshot = () => {
    setActiveGalleryIndex((prev) => (prev - 1 + allScreenshots.length) % allScreenshots.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-[32px] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] border border-slate-300 dark:border-neutral-700">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 flex-wrap gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 font-extrabold shrink-0">
              {project.number}
            </span>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white truncate">
                {project.title}
              </h2>
              <p className="text-[11px] font-medium text-slate-500 dark:text-neutral-400 truncate">
                {project.category} · {project.timeline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Real Live Website Direct Action Button */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all hover:scale-105"
                title="Open client website in new tab"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Live Website</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            ) : null}

            {/* Tab switch */}
            <div className="flex items-center p-1 rounded-full bg-slate-200 dark:bg-neutral-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 dark:text-neutral-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Screenshots ({allScreenshots.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('casestudy')}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === 'casestudy'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 dark:text-neutral-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Case Study & Specs</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white rounded-full hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* TAB 1: Real Screenshots Gallery */}
          {activeTab === 'gallery' && (
            <div className="space-y-5">
              {/* Live URL Link Notification Banner if present */}
              {project.liveUrl && (
                <div className="flex items-center justify-between p-3 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-semibold">
                    <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live Website: </span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold underline hover:text-emerald-600"
                    >
                      {project.liveUrl}
                    </a>
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-transform hover:scale-105"
                  >
                    <span>Open in Browser</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Main Screenshot Viewer with Prev/Next Controls */}
              <div className="relative rounded-3xl overflow-hidden bg-neutral-950 border border-slate-300 dark:border-neutral-700 shadow-2xl aspect-[16/10] max-h-[520px] flex items-center justify-center group">
                <img
                  src={allScreenshots[safeIndex] || project.image}
                  alt={`${project.title} screenshot ${safeIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* Left Arrow */}
                {allScreenshots.length > 1 && (
                  <button
                    onClick={prevScreenshot}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Right Arrow */}
                {allScreenshots.length > 1 && (
                  <button
                    onClick={nextScreenshot}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Screenshot counter pill */}
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-mono font-bold backdrop-blur-xs border border-white/20 flex items-center gap-2">
                  <span>Photo {activeGalleryIndex + 1} of {allScreenshots.length}</span>
                </div>

                {/* Direct visit button overlay */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold backdrop-blur-xs transition-transform hover:scale-105 shadow-md"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open Live Site</span>
                  </a>
                )}
              </div>

              {/* Thumbnails Strip (Up to 5 images) */}
              {allScreenshots.length > 1 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                    Click to switch screenshot:
                  </p>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {allScreenshots.map((shot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-[16/10] w-24 sm:w-28 shrink-0 border-2 transition-all ${
                          activeGalleryIndex === idx
                            ? 'border-blue-600 ring-2 ring-blue-500/40 scale-105'
                            : 'border-slate-300 dark:border-neutral-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={shot}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 rounded bg-black/70 text-white">
                          #{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Case Study & Technical Specs Tab */}
          {activeTab === 'casestudy' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-950 dark:text-white">
                  Project Overview & Problem Solved
                </h3>
                <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed font-normal">
                  {project.fullDescription}
                </p>
              </div>

              {/* Stats */}
              {project.stats && (
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
                        {stat.value}
                      </p>
                      <p className="text-xs font-semibold text-slate-600 dark:text-neutral-400 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Features & Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Delivered Features</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-800 dark:text-neutral-200 font-medium">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Turnaround & Timeline</span>
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 font-medium">
                    Completed and deployed in <strong>{project.timeline}</strong> with full mobile responsiveness, SEO optimization, and WhatsApp order routing.
                  </p>

                  <div className="pt-2">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">Tech Stack</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-[11px] font-mono font-bold text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct WhatsApp Action and Live Link */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 flex-wrap gap-3">
          <div className="text-xs text-slate-600 dark:text-neutral-400 font-medium">
            Client: <strong className="text-slate-950 dark:text-white">{project.client}</strong>
          </div>

          <div className="flex items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Discuss Similar Project</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
