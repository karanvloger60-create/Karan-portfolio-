import React from 'react';
import { servicesData } from '../data/servicesData';
import { Check, MessageCircle, ShieldCheck, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 relative border-t border-slate-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Honest & Transparent Investment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            Simple, honest pricing with zero agency bloat.
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            No middleman fees, no surprise monthly retainers. You pay once for high-performance, handcrafted code and launch in days.
          </p>
        </div>

        {/* 4 Clean High-Contrast Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {servicesData.map((tier) => {
            const encodedWhatsAppMsg = encodeURIComponent(
              `Hi Karan! I'm interested in the "${tier.name}" (${tier.price}) package for my website. Let's discuss!`
            );

            return (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 relative bg-white dark:bg-neutral-900 border ${
                  tier.popular
                    ? 'border-2 border-blue-600 shadow-2xl shadow-blue-500/15'
                    : 'border-slate-300 dark:border-neutral-700 shadow-lg hover:-translate-y-1'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[11px] font-black rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-950 dark:text-white">{tier.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1 line-clamp-2 font-medium">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tabular-nums">
                      {tier.price}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400 mt-1 font-semibold">
                      <span>{tier.priceNote}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{tier.turnaround}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700 text-[11px] text-slate-800 dark:text-neutral-200 font-medium">
                    <strong className="text-slate-950 dark:text-white">Best for: </strong>
                    {tier.bestFor}
                  </div>

                  {/* Included Features */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                      Deliverables:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-800 dark:text-neutral-200 font-medium">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 font-bold" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct 1-Click WhatsApp CTA with 8506043149 */}
                <div className="pt-6 mt-4 border-t border-slate-200 dark:border-neutral-800">
                  <a
                    href={`https://wa.me/918506043149?text=${encodedWhatsAppMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                      tier.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25 hover:scale-105'
                        : 'bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 hover:scale-105'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Guarantee Strip */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-slate-950 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Standard in every single website package:</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-neutral-300 font-medium">
              100% Mobile Responsive · Ultra-Fast &lt;1s Load Speed · Direct WhatsApp Integration · Free Hosting Setup
            </p>
          </div>

          <a
            href="https://wa.me/918506043149?text=Hi%20Karan,%20I'd%20like%20to%20get%20a%20custom%20quote%20for%20my%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-300 dark:border-neutral-700 transition-all shrink-0 hover:scale-105"
          >
            <span>Custom Requirements? Chat with Karan</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
