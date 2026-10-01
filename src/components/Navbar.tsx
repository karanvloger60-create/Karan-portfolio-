import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Floating iOS Glass Island Bar */}
        <div className="w-full glass-dock rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300 shadow-lg">
          {/* Brand */}
          <a
            href="#"
            className="flex items-center gap-2 group font-bold tracking-tight"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/25">
              K
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white">
                Karan
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-500/30">
                dev
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white rounded-full hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-800" />}
            </button>

            {/* Direct WhatsApp Pill with Verified Number */}
            <a
              href="https://wa.me/918506043149?text=Hi%20Karan,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20website%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-full shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-800 dark:text-slate-100 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="max-w-4xl mx-auto mt-2 pointer-events-auto md:hidden">
          <div className="glass-panel rounded-2xl p-4 shadow-2xl space-y-2 text-sm font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-2 rounded-xl text-slate-900 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 flex gap-2">
              <a
                href="https://wa.me/918506043149?text=Hi%20Karan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800"
              >
                WhatsApp (8506043149)
              </a>
              <a
                href="https://instagram.com/digidukaan.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 rounded-xl border border-pink-200 dark:border-pink-800"
              >
                Instagram (@digidukaan.in)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
