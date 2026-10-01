/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { projectsData as defaultProjects } from './data/projectsData';
import defaultAvatar from './assets/images/karan_developer_avatar_1790744780059.jpg';
import { saveProjectsSafely, loadProjectsSafely } from './utils/projectStorage';
import {
  subscribeToFirestoreProjects,
  subscribeToFirestoreAvatar,
  seedInitialProjectsIfEmpty,
  saveAvatarToFirestore
} from './services/firebaseProjects';
import { testFirestoreConnection } from './firebase';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { OpeningAnimation } from './components/OpeningAnimation';
import { AdminDrawer } from './components/AdminDrawer';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalMode, setModalMode] = useState<'gallery' | 'casestudy'>('gallery');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  // Private Admin Console State (Projects & Profile Photo)
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('karan_custom_avatar') || defaultAvatar;
    } catch (e) {
      return defaultAvatar;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('karan_custom_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Initial localStorage read fallback:', e);
    }
    return defaultProjects;
  });

  // Hydrate & Subscribe to Cloud Firestore (Real-time sync across devices)
  useEffect(() => {
    // 1. Local offline cache fallback
    loadProjectsSafely(defaultProjects).then((loaded) => {
      if (loaded && loaded.length > 0) {
        setProjects(loaded);
      }
    });

    // 2. Health check connection
    testFirestoreConnection();

    // 3. Seed initial default projects if cloud database is empty
    seedInitialProjectsIfEmpty();

    // 4. Real-time Cloud listener for Projects (updates whenever Karan or any admin saves)
    const unsubProjects = subscribeToFirestoreProjects((cloudProjects) => {
      if (cloudProjects && cloudProjects.length > 0) {
        setProjects(cloudProjects);
        saveProjectsSafely(cloudProjects);
      }
    });

    // 5. Real-time Cloud listener for Profile Avatar
    const unsubAvatar = subscribeToFirestoreAvatar((cloudAvatar) => {
      if (cloudAvatar) {
        setAvatarUrl(cloudAvatar);
        try {
          localStorage.setItem('karan_custom_avatar', cloudAvatar);
        } catch (e) {
          // ignore
        }
      }
    });

    return () => {
      unsubProjects();
      unsubAvatar();
    };
  }, []);

  const handleUpdateAvatar = (newUrl: string) => {
    setAvatarUrl(newUrl);
    try {
      localStorage.setItem('karan_custom_avatar', newUrl);
    } catch (e) {
      console.warn('Avatar localStorage quota note:', e);
    }
    saveAvatarToFirestore(newUrl);
  };

  const handleUpdateProjects = (updated: Project[]) => {
    setProjects(updated);
    saveProjectsSafely(updated);
  };

  useEffect(() => {
    // Smooth reveal timing
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('karan_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Secret keyboard shortcut to open Admin: Alt + K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'k') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('karan_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('karan_theme', 'light');
      }
      return next;
    });
  };

  const handleOpenProjectModal = (project: Project, mode: 'gallery' | 'casestudy' = 'gallery') => {
    setSelectedProject(project);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleViewProjectOnPortfolio = (projectId: string) => {
    setIsAdminOpen(false);
    setTimeout(() => {
      const card = document.getElementById(`project-card-${projectId}`) || document.querySelector('#projects');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('ring-4', 'ring-emerald-500', 'scale-[1.02]', 'transition-all');
        setTimeout(() => {
          card.classList.remove('ring-4', 'ring-emerald-500', 'scale-[1.02]');
        }, 3500);
      }
    }, 250);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-600 selection:text-white ${
        isDarkMode ? 'dark bg-mesh-dark text-slate-100' : 'bg-mesh-light text-slate-900'
      }`}
    >
      {/* Apple-style Smooth Opening Splash Animation */}
      <OpeningAnimation />

      {/* Floating iPhone Glass Island Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Sections with Smooth Cascade Entrance */}
      <main
        className={`flex-1 transition-all duration-700 ease-out ${
          pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {/* 1. Fresh Hero Section with iPhone 16 Pro Mockup Displaying Real Projects */}
        <Hero
          avatarUrl={avatarUrl}
          projects={projects}
        />

        {/* 2. About Me Section - Placed UPPER right after Hero */}
        <AboutSection
          avatarUrl={avatarUrl}
        />

        {/* 3. Selected Client Works (With Dynamic Project Support) */}
        <ProjectsSection
          projects={projects}
          onOpenProjectModal={handleOpenProjectModal}
        />

        {/* 4. "From Idea → Website" Architecture Pipeline */}
        <ProcessSection />

        {/* 5. Transparent Pricing with Direct WhatsApp Action */}
        <ServicesSection />

        {/* 6. Minimalist Contact Section (WhatsApp, Instagram, Email - No Forms) */}
        <ContactSection />
      </main>

      {/* Clean Glass Footer with Discreet Admin Lock */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Interactive Project Live Demo Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseProjectModal}
        initialTab={modalMode}
      />

      {/* Secret Private Admin Drawer (PIN Protected: 1526) */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        avatarUrl={avatarUrl}
        onUpdateAvatar={handleUpdateAvatar}
        projects={projects}
        onUpdateProjects={handleUpdateProjects}
        onViewProjectOnPortfolio={handleViewProjectOnPortfolio}
      />

      {/* Connectivity & Offline Status Indicator */}
      <OfflineIndicator />
    </div>
  );
}
