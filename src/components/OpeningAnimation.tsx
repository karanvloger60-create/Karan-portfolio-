import React, { useState, useEffect } from 'react';

export const OpeningAnimation: React.FC = () => {
  const [stage, setStage] = useState<'visible' | 'fading' | 'hidden'>('visible');

  useEffect(() => {
    // Stage 1: Visible for 650ms
    const timer1 = setTimeout(() => {
      setStage('fading');
    }, 650);

    // Stage 2: Completely hidden after fade out (450ms transition)
    const timer2 = setTimeout(() => {
      setStage('hidden');
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (stage === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-out pointer-events-none ${
        stage === 'fading'
          ? 'opacity-0 scale-105 backdrop-blur-none bg-transparent'
          : 'opacity-100 scale-100 backdrop-blur-2xl bg-white/95 dark:bg-neutral-950/95'
      }`}
    >
      {/* Ambient glowing radial backdrop */}
      <div className="absolute w-72 h-72 bg-gradient-to-tr from-blue-500/20 via-sky-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Central Apple-style Glass Badge */}
      <div className="relative flex flex-col items-center gap-4 text-center p-6 rounded-[32px] bg-white/80 dark:bg-neutral-900/80 border border-slate-200/90 dark:border-neutral-700/80 shadow-2xl backdrop-blur-xl">
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-blue-500/30 transform transition-transform duration-500 hover:scale-105">
            K
          </div>
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-2xl border-2 border-blue-500/30 animate-ping opacity-50" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h2 className="text-base font-extrabold text-slate-950 dark:text-white tracking-tight">
            Karan <span className="text-blue-600">.dev</span>
          </h2>
          <p className="text-xs font-semibold text-slate-600 dark:text-neutral-400">
            Web Developer Portfolio
          </p>
        </div>

        {/* Liquid iOS Loading Indicator */}
        <div className="w-32 h-1 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-1">
          <div className="w-full h-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};
