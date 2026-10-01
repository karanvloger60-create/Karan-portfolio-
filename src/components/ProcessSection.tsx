import React, { useState } from 'react';
import { processSteps } from '../data/processData';
import { Lightbulb, Palette, Code, Database, Rocket, CheckCircle2, Clock, UserCheck } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (name: string) => {
    switch (name) {
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const currentStep = processSteps[activeStepIndex];

  return (
    <section id="process" className="py-20 relative border-t border-slate-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold">
            <span>End-To-End Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            From Idea <span className="text-blue-600 dark:text-blue-400">→</span> Website
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            I don’t just write static HTML pages. I architect complete, production-ready website solutions with dynamic databases, WhatsApp automations, and rock-solid deployment.
          </p>
        </div>

        {/* 5-Step Process Pipeline Glass Dock */}
        <div className="relative mb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10">
            {processSteps.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex flex-col items-center text-center p-4 rounded-3xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white dark:bg-neutral-900 border-2 border-blue-600 shadow-xl scale-102'
                      : 'bg-white/80 dark:bg-neutral-900/80 border border-slate-300 dark:border-neutral-700 hover:scale-101'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors mb-2.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                    }`}
                  >
                    {getStepIcon(step.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-neutral-400">
                    Phase {step.stepNumber}
                  </span>
                  <span
                    className={`text-sm font-black mt-0.5 ${
                      isActive ? 'text-slate-950 dark:text-white' : 'text-slate-800 dark:text-neutral-200'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-neutral-400 mt-1">
                    {step.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Spotlight Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Step {currentStep.stepNumber} of 05
                </span>
                <span className="text-xs font-semibold text-slate-600 dark:text-neutral-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timeline: {currentStep.duration}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                {currentStep.headline}
              </h3>

              <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed font-normal">
                {currentStep.description}
              </p>

              {/* Client involvement block */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <UserCheck className="w-4 h-4" />
                  <span>Your Role in This Phase:</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-neutral-200 font-medium">
                  {currentStep.clientRole}
                </p>
              </div>
            </div>

            {/* Right Deliverables List */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700 p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Tangible Deliverables</span>
              </h4>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-neutral-200 font-medium">
                {currentStep.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-slate-200 dark:border-neutral-700 flex items-center justify-between">
                <button
                  onClick={() =>
                    setActiveStepIndex((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0))
                  }
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>{activeStepIndex === processSteps.length - 1 ? 'Start Over (Step 01)' : 'Next Phase →'}</span>
                </button>

                <a
                  href="https://wa.me/918506043149?text=Hi%20Karan,%20I%20have%20an%20idea%20for%20a%20website%20and%20want%20to%20start%20at%20Phase%2001!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all shadow-md shadow-blue-500/25"
                >
                  Start Phase 01
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
