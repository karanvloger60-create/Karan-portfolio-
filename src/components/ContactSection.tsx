import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, ArrowUpRight, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('karanyt267@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 relative border-t border-slate-200/80 dark:border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main High-Contrast Glass Card */}
        <div className="rounded-[40px] p-8 sm:p-14 text-center space-y-8 shadow-2xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 relative overflow-hidden">
          {/* Subtle Ambient Light Orb behind Card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-r from-blue-500/20 via-sky-400/20 to-emerald-500/20 blur-3xl pointer-events-none rounded-full" />

          {/* Header with High-Contrast Typography */}
          <div className="space-y-4 max-w-xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Let's Build Something Great</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
              Have a website idea?
            </h2>

            <p className="text-xl sm:text-2xl text-slate-800 dark:text-neutral-200 font-bold">
              Let's turn your idea into a website.
            </p>

            <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-md mx-auto font-medium">
              No complicated contact forms or waiting around. Reach out directly on WhatsApp or drop a quick DM on Instagram.
            </p>
          </div>

          {/* 3 Prominent Contact Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 relative z-10">
            {/* WhatsApp Card with Verified Number 8506043149 */}
            <a
              href="https://wa.me/918506043149?text=Hi%20Karan,%20I%20have%20a%20website%20idea%20and%20want%20to%20discuss%20it!"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-emerald-50/70 hover:bg-emerald-100/80 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700/80 transition-all duration-300 flex flex-col items-center justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950 dark:text-white">WhatsApp Me</h3>
                <p className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 mt-1">
                  8506043149
                </p>
                <p className="text-[11px] text-slate-600 dark:text-neutral-400 mt-0.5">
                  Instant chat · Quick reply
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline">
                <span>Start WhatsApp Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Instagram Card with Handle @digidukaan.in */}
            <a
              href="https://instagram.com/digidukaan.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-pink-50/70 hover:bg-pink-100/80 dark:bg-pink-950/30 dark:hover:bg-pink-950/50 border border-pink-300 dark:border-pink-700/80 transition-all duration-300 flex flex-col items-center justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-600/30 group-hover:scale-110 transition-transform">
                <Instagram className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950 dark:text-white">Instagram</h3>
                <p className="text-xs font-mono font-bold text-pink-700 dark:text-pink-400 mt-1">
                  @digidukaan.in
                </p>
                <p className="text-[11px] text-slate-600 dark:text-neutral-400 mt-0.5">
                  Direct DM · Portfolio updates
                </p>
              </div>
              <span className="text-xs font-bold text-pink-700 dark:text-pink-400 flex items-center gap-1 group-hover:underline">
                <span>Open Instagram Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-700/80 transition-all duration-300 flex flex-col items-center justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950 dark:text-white">Email</h3>
                <p className="text-xs font-mono font-bold text-slate-800 dark:text-neutral-200 mt-1">
                  karanyt267@gmail.com
                </p>
                <p className="text-[11px] text-slate-600 dark:text-neutral-400 mt-0.5">
                  Inquiries & quotations
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:karanyt267@gmail.com?subject=Website%20Project%20Discussion"
                  className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Compose</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <p className="text-xs text-slate-600 dark:text-neutral-400 pt-2 font-medium">
            Direct 1-on-1 contact. Fast response on WhatsApp: <strong className="text-slate-950 dark:text-white">+91 8506043149</strong>
          </p>
        </div>
      </div>
    </section>
  );
};
