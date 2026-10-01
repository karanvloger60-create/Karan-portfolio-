import React from 'react';
import { ArrowUp, MessageCircle, Instagram, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-neutral-800/80 py-12 text-xs text-slate-600 dark:text-neutral-400 bg-white/60 dark:bg-neutral-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base text-slate-950 dark:text-white">Karan</span>
            <span className="text-slate-300 dark:text-neutral-700">·</span>
            <span className="font-medium text-slate-700 dark:text-neutral-300">
              Web Developer for Businesses & Creators
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 font-bold text-slate-700 dark:text-neutral-300">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a href="#process" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Process
            </a>
            <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918506043149?text=Hi%20Karan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-neutral-700 transition-colors border border-slate-200 dark:border-neutral-700"
              title="WhatsApp: 8506043149"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            <a
              href="https://instagram.com/digidukaan.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-pink-600 hover:bg-pink-50 dark:hover:bg-neutral-700 transition-colors border border-slate-200 dark:border-neutral-700"
              title="Instagram: @digidukaan.in"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-blue-600 transition-colors border border-slate-200 dark:border-neutral-700"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} Karan. All rights reserved.</p>
          
          <div className="flex items-center gap-3">
            <span className="font-medium">
              Contact: +91 8506043149 · Instagram: @digidukaan.in
            </span>

            {/* Discreet Private Admin Entry Point */}
            <button
              onClick={onOpenAdmin}
              className="p-1 rounded text-slate-400 dark:text-neutral-600 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              title="Admin Panel"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
