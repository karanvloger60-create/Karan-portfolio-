import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, Play, Check, Sparkles, MessageCircle, Globe, ExternalLink, Layers } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenProjectModal: (project: Project, mode: 'gallery' | 'casestudy') => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onOpenProjectModal
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = projects.filter((proj) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ecommerce') return proj.demoType === 'ecommerce';
    if (activeFilter === 'restaurant') return proj.demoType === 'restaurant';
    if (activeFilter === 'local') return proj.demoType === 'local_business';
    return true;
  });

  return (
    <section id="projects" className="py-20 relative border-t border-slate-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Client Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              Real websites crafted for real business growth.
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Every project includes live verified website links, multiple high-res screenshots, mobile-first design, and direct WhatsApp conversion.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-2xl self-start md:self-auto text-xs shadow-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('ecommerce')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'ecommerce'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Fashion & Retail
            </button>
            <button
              onClick={() => setActiveFilter('restaurant')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'restaurant'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Restaurant
            </button>
            <button
              onClick={() => setActiveFilter('local')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'local'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Local Business
            </button>
          </div>
        </div>

        {/* Projects Glass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              id={`project-card-${project.id}`}
              className="group flex flex-col bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Card Screenshot Preview */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                <LazyImage
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />

                {/* Top Number Indicator with Solid Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-xs font-mono font-black text-slate-950 dark:text-white shadow-sm">
                    {project.number}
                  </span>
                  {project.screenshots && project.screenshots.length > 1 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 text-white border border-white/20 text-[10px] font-bold backdrop-blur-xs">
                      <Layers className="w-3 h-3" />
                      <span>{project.screenshots.length} Photos</span>
                    </span>
                  )}
                </div>

                {/* Turnaround Badge */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold tracking-wide shadow-md">
                  {project.timeline}
                </div>

                {/* Interactive Demo Trigger on Hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs p-4 text-center">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl transition-transform hover:scale-105"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Visit Real Live Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => onOpenProjectModal(project, 'gallery')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 font-bold text-xs shadow-2xl transition-transform hover:scale-105"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Screenshots & Specs</span>
                  </button>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="text-xl font-extrabold tracking-tight">{project.title}</h3>
                  <p className="text-xs text-neutral-200 mt-0.5 font-medium">{project.category}</p>
                </div>
              </div>

              {/* Card Body with High Contrast */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed font-normal">
                  {project.shortDescription}
                </p>

                {/* Features */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                    Key Features
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-800 dark:text-neutral-200 font-medium">
                    {project.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-2 flex-wrap">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                      title="Open client website"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onOpenProjectModal(project, 'gallery')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Screenshots</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => onOpenProjectModal(project, 'casestudy')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-blue-600"
                  >
                    <span>Details</span>
                  </button>

                  <a
                    href={`https://wa.me/918506043149?text=Hi%20Karan,%20I%20love%20the%20website%20you%20built%20for%20${encodeURIComponent(
                      project.title
                    )}.%20Can%20we%20discuss%20a%20similar%20site?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
