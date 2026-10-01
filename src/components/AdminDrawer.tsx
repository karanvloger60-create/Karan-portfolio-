import React, { useState } from 'react';
import { Project } from '../types';
import { projectsData as defaultProjects } from '../data/projectsData';
import defaultAvatar from '../assets/images/karan_developer_avatar_1790744780059.jpg';
import { ImageCropperModal } from './ImageCropperModal';
import { compressImage } from '../utils/imageCompressor';
import {
  saveProjectToFirestore,
  deleteProjectFromFirestore,
  saveAvatarToFirestore
} from '../services/firebaseProjects';
import {
  Lock,
  X,
  Upload,
  Trash2,
  Plus,
  RefreshCcw,
  Check,
  Shield,
  Globe,
  Crop,
  Layers,
  Edit3,
  ExternalLink,
  Star,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  Eye,
  Sparkles
} from 'lucide-react';

interface PublishSuccessData {
  title: string;
  image: string;
  category: string;
  liveUrl?: string;
  isEdit: boolean;
  projectId: string;
  photoCount: number;
}

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl: string;
  onUpdateAvatar: (newUrl: string) => void;
  projects: Project[];
  onUpdateProjects: (updated: Project[]) => void;
  onViewProjectOnPortfolio?: (projectId: string) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  avatarUrl,
  onUpdateAvatar,
  projects,
  onUpdateProjects,
  onViewProjectOnPortfolio
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'photo'>('projects');

  // Project Form State (Add / Edit)
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Fashion & Retail');
  const [newTimeline, setNewTimeline] = useState('3–5 Days Delivery');
  const [newLiveUrl, setNewLiveUrl] = useState('');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newFeatures, setNewFeatures] = useState('WhatsApp Direct Orders, Fast Mobile UI, Google Search Ready');
  const [newTech, setNewTech] = useState('React, Tailwind CSS, TypeScript');
  const [projectScreenshots, setProjectScreenshots] = useState<string[]>([]);

  // Cropper Modal State
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<'avatar' | 'screenshot'>('screenshot');
  const [cropScreenshotIndex, setCropScreenshotIndex] = useState<number | null>(null);
  const [cropRatioHint, setCropRatioHint] = useState<'16:9' | '4:3' | '9:16' | '1:1'>('16:9');

  // Dedicated Celebration / Success Modal Popup
  const [publishSuccess, setPublishSuccess] = useState<PublishSuccessData | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  if (!isOpen) return null;

  // Handle PIN verification (Strict PIN: 1526)
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '1526') {
      setIsAuthenticated(true);
      setPinError(false);
      setPin('');
    } else {
      setPinError(true);
    }
  };

  // Avatar upload with cropper option & safe compression
  const handleAvatarFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('File size too large. Please select an image under 15MB.');
        return;
      }
      try {
        const compressed = await compressImage(file, 800, 800, 0.85);
        setImageToCrop(compressed);
        setCropTarget('avatar');
        setCropRatioHint('1:1');
        setCropperOpen(true);
      } catch (err) {
        console.warn('Avatar compression fallback:', err);
      }
    }
    e.target.value = '';
  };

  // Reset to default photo
  const handleResetPhoto = () => {
    if (confirm('Reset profile photo to original default?')) {
      onUpdateAvatar(defaultAvatar);
      saveAvatarToFirestore(defaultAvatar).catch((e) => console.warn('Firestore avatar note:', e));
      triggerNotification('Profile photo reset to default!');
    }
  };

  // Handle Multiple Screenshot Uploads with High-Efficiency Compression
  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - projectScreenshots.length;
    if (remainingSlots <= 0) {
      alert('Maximum 5 photos allowed per website. Please delete one first.');
      return;
    }

    const filesToRead = Array.from(files).slice(0, remainingSlots);
    try {
      const compressedList = await Promise.all(
        filesToRead.map((file) => compressImage(file, 1280, 1280, 0.82))
      );

      const updated = [...projectScreenshots, ...compressedList].slice(0, 5);
      setProjectScreenshots(updated);
      triggerNotification(`Added ${compressedList.length} photo(s). Compressed & ready to publish!`);
    } catch (err) {
      console.warn('Screenshot upload error:', err);
      alert('Unable to load some photos. Please try another image.');
    }

    e.target.value = '';
  };

  // Replace a specific photo at index with safe compression
  const handleReplacePhotoAtIndex = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 1280, 1280, 0.82);
        const copy = [...projectScreenshots];
        copy[index] = compressed;
        setProjectScreenshots(copy);
        triggerNotification(`Photo #${index + 1} replaced successfully!`);
      } catch (err) {
        console.warn('Replace photo error:', err);
      }
    }
    e.target.value = '';
  };

  // Open cropper for a specific screenshot
  const handleOpenCropForScreenshot = (index: number) => {
    setImageToCrop(projectScreenshots[index]);
    setCropTarget('screenshot');
    setCropScreenshotIndex(index);
    setCropRatioHint('16:9');
    setCropperOpen(true);
  };

  // Handle Crop Completion with safe compression
  const handleCropComplete = async (croppedBase64: string) => {
    try {
      const compressed = await compressImage(croppedBase64, 1280, 1280, 0.82);
      if (cropTarget === 'avatar') {
        onUpdateAvatar(compressed);
        saveAvatarToFirestore(compressed).catch((e) => console.warn('Firestore avatar note:', e));
        triggerNotification('Profile photo cropped & updated successfully!');
      } else if (cropTarget === 'screenshot' && cropScreenshotIndex !== null) {
        const copy = [...projectScreenshots];
        copy[cropScreenshotIndex] = compressed;
        setProjectScreenshots(copy);
        triggerNotification('Screenshot cropped and saved!');
      }
    } catch (err) {
      console.warn('Crop completion fallback:', err);
    }
  };

  // Remove single screenshot (Even photo 0 / main photo!)
  const handleRemoveScreenshot = (index: number) => {
    const isMain = index === 0;
    const confirmMsg = isMain
      ? 'Delete the Main Cover Photo? The next photo will automatically become the new main cover.'
      : `Delete photo #${index + 1}?`;

    if (confirm(confirmMsg)) {
      const copy = projectScreenshots.filter((_, i) => i !== index);
      setProjectScreenshots(copy);
      triggerNotification(isMain ? 'Main photo deleted. Next photo is now active.' : 'Photo deleted.');
    }
  };

  // Set screenshot as primary (cover)
  const handleSetPrimaryScreenshot = (index: number) => {
    if (index === 0) return;
    const copy = [...projectScreenshots];
    const [selected] = copy.splice(index, 1);
    copy.unshift(selected);
    setProjectScreenshots(copy);
    triggerNotification('Selected photo is now the Main Cover!');
  };

  // Pre-fill form to edit an existing project
  const handleStartEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setNewTitle(proj.title);
    setNewCategory(proj.category);
    setNewTimeline(proj.timeline);
    setNewLiveUrl(proj.liveUrl || '');
    setNewShortDesc(proj.shortDescription);
    setNewFeatures(proj.features.join(', '));
    setNewTech(proj.technologies.join(', '));

    // Combine existing screenshots or main image
    const initialScreenshots = proj.screenshots && proj.screenshots.length > 0
      ? [...proj.screenshots]
      : proj.image ? [proj.image] : [];
    setProjectScreenshots(initialScreenshots);

    setIsAddingProject(true);
    triggerNotification(`Editing "${proj.title}"`);
  };

  // Save Project (Add or Edit) with UNMISSABLE Success Popup
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Please enter a project title');
      return;
    }

    if (projectScreenshots.length === 0) {
      alert('Please upload at least 1 photo for this website before saving.');
      return;
    }

    const primaryImage = projectScreenshots[0];
    const allScreenshots = projectScreenshots;

    // Clean Live URL
    let formattedLiveUrl = newLiveUrl.trim();
    if (formattedLiveUrl && !formattedLiveUrl.startsWith('http://') && !formattedLiveUrl.startsWith('https://')) {
      formattedLiveUrl = `https://${formattedLiveUrl}`;
    }

    try {
      let finalProjectId = editingProjectId;

      if (editingProjectId) {
        // Update existing project
        let projectToSync: Project | null = null;
        const updatedList = projects.map((p) => {
          if (p.id === editingProjectId) {
            const updated: Project = {
              ...p,
              title: newTitle.trim(),
              category: newCategory.trim(),
              timeline: newTimeline.trim(),
              liveUrl: formattedLiveUrl || undefined,
              shortDescription: newShortDesc.trim() || p.shortDescription,
              image: primaryImage,
              screenshots: allScreenshots,
              features: newFeatures.split(',').map((f) => f.trim()).filter(Boolean),
              technologies: newTech.split(',').map((t) => t.trim()).filter(Boolean)
            };
            projectToSync = updated;
            return updated;
          }
          return p;
        });
        onUpdateProjects(updatedList);
        if (projectToSync) {
          saveProjectToFirestore(projectToSync).catch((e) => console.warn('Firestore update sync:', e));
        }
      } else {
        // Add new project
        const nextNumber = String(projects.length + 1).padStart(2, '0');
        const generatedId = `project-${Date.now()}`;
        finalProjectId = generatedId;

        const newProj: Project = {
          id: generatedId,
          number: nextNumber,
          title: newTitle.trim(),
          category: newCategory.trim(),
          tagline: `${newCategory} Website & WhatsApp Conversion`,
          shortDescription:
            newShortDesc.trim() || 'Modern, high-converting responsive website with real client results.',
          fullDescription: `${newTitle} is a modern, high-converting website engineered with fast load speed, direct WhatsApp communication, and tailored brand aesthetics.`,
          image: primaryImage,
          screenshots: allScreenshots,
          liveUrl: formattedLiveUrl || undefined,
          client: newTitle.trim(),
          timeline: newTimeline.trim(),
          highlightColor: 'from-blue-500/20 to-sky-500/10',
          demoType: 'ecommerce',
          deliverables: ['Custom Mobile UI', 'WhatsApp Integration', 'SEO & Speed Ready'],
          features: newFeatures.split(',').map((f) => f.trim()).filter(Boolean),
          technologies: newTech.split(',').map((t) => t.trim()).filter(Boolean),
          demoDetails: {
            heroTagline: `Welcome to ${newTitle}`,
            subtext: 'High-quality services and products delivered with care.',
            sampleItems: [
              { name: 'Featured Item 01', price: '₹499', category: 'Popular', badge: 'Bestseller' },
              { name: 'Featured Item 02', price: '₹899', category: 'Special' }
            ],
            actionLabel: 'Order via WhatsApp'
          }
        };

        const updatedList = [...projects, newProj];
        onUpdateProjects(updatedList);
        saveProjectToFirestore(newProj).catch((e) => console.warn('Firestore new project sync:', e));
      }

      // Trigger the UNMISSABLE Celebration / Success Popup Modal!
      setPublishSuccess({
        title: newTitle.trim(),
        image: primaryImage,
        category: newCategory.trim(),
        liveUrl: formattedLiveUrl || undefined,
        isEdit: !!editingProjectId,
        projectId: finalProjectId || `project-${Date.now()}`,
        photoCount: allScreenshots.length
      });

      // Reset Form fields
      setEditingProjectId(null);
      setNewTitle('');
      setNewShortDesc('');
      setNewLiveUrl('');
      setProjectScreenshots([]);
      setIsAddingProject(false);
    } catch (saveError) {
      console.error('Error publishing website:', saveError);
      alert('Error saving project. Please try again.');
    }
  };

  // Delete Entire Project
  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" completely?`)) {
      const filtered = projects.filter((p) => p.id !== id);
      onUpdateProjects(filtered);
      deleteProjectFromFirestore(id).catch((e) => console.warn('Firestore delete sync:', e));
      triggerNotification(`Project "${title}" deleted from portfolio.`);
    }
  };

  // Restore Default Projects
  const handleRestoreDefaultProjects = () => {
    if (confirm('Restore original 3 sample projects (Ashu Collection, Grills & Curry, Paan Zone)?')) {
      onUpdateProjects(defaultProjects);
      triggerNotification('Sample projects restored!');
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-[32px] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] border border-slate-300 dark:border-neutral-700">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-slate-950 dark:text-white">
                    Karan Private Dashboard
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                    ⚡ Firebase Cloud Synced
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Hidden Control Panel · Real-time Cloud Publishing Active
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notification Toast in Header */}
          {notification && (
            <div className="p-3 bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4" />
              <span>{notification}</span>
            </div>
          )}

          {/* Content */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1">
            {!isAuthenticated ? (
              /* PIN Protection Screen */
              <div className="py-10 max-w-sm mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border border-blue-200 dark:border-neutral-700">
                  <Lock className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">
                    Enter Security PIN
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">
                    This panel is strictly for you. Enter your PIN to continue.
                  </p>
                </div>

                <form onSubmit={handleVerifyPin} className="space-y-4">
                  <div className="space-y-1.5">
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="••••"
                      className="w-full text-center tracking-widest text-2xl font-mono font-bold py-3 px-4 rounded-2xl bg-slate-100 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600"
                      autoFocus
                    />
                    {pinError && (
                      <p className="text-xs font-bold text-red-600 dark:text-red-400">
                        Incorrect PIN. Please try again.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all hover:scale-102"
                  >
                    Unlock Admin Panel
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Admin Dashboard */
              <div className="space-y-6">
                {/* Tab Selector */}
                <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-neutral-800 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`flex-1 py-2.5 rounded-xl transition-all ${
                      activeTab === 'projects'
                        ? 'bg-white dark:bg-neutral-900 text-slate-950 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-neutral-400'
                    }`}
                  >
                    🚀 Manage Projects & Photos ({projects.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('photo')}
                    className={`flex-1 py-2.5 rounded-xl transition-all ${
                      activeTab === 'photo'
                        ? 'bg-white dark:bg-neutral-900 text-slate-950 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-neutral-400'
                    }`}
                  >
                    📸 Profile Photo & Crop
                  </button>
                </div>

                {/* Tab 1: Manage Projects */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-black text-slate-950 dark:text-white">
                          Your Portfolio Projects
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-neutral-400">
                          Add, replace, crop, or delete main photos & manage live demo links.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleRestoreDefaultProjects}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-neutral-300 hover:underline"
                          title="Restore original 3 sample projects"
                        >
                          Restore Defaults
                        </button>

                        <button
                          onClick={() => {
                            if (isAddingProject) {
                              setIsAddingProject(false);
                              setEditingProjectId(null);
                            } else {
                              setEditingProjectId(null);
                              setNewTitle('');
                              setNewLiveUrl('');
                              setNewShortDesc('');
                              setProjectScreenshots([]);
                              setIsAddingProject(true);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all hover:scale-105"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isAddingProject ? 'Cancel' : '+ Add New Website'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Add / Edit Project Form */}
                    {isAddingProject && (
                      <form
                        onSubmit={handleSaveProject}
                        className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-300 dark:border-neutral-700 space-y-5 shadow-inner"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-700 pb-3">
                          <h5 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                            <span>{editingProjectId ? '✏️ Edit Website & Photos' : '➕ Add New Client Website'}</span>
                          </h5>
                          {editingProjectId && (
                            <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                              Editing ID: {editingProjectId}
                            </span>
                          )}
                        </div>

                        {/* Title & Live URL (Crucial for client credibility) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                              Project / Business Title *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ashu Collection / Sharma Sweets"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-950 dark:text-white font-medium"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-neutral-300 flex items-center justify-between">
                              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                                <Globe className="w-3.5 h-3.5" />
                                <span>Real Website Live Demo URL</span>
                              </span>
                              <span className="text-[10px] text-slate-400">Opens real site</span>
                            </label>
                            <input
                              type="text"
                              placeholder="https://ashucollection.com or your Netlify link"
                              value={newLiveUrl}
                              onChange={(e) => setNewLiveUrl(e.target.value)}
                              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-emerald-500/50 dark:border-emerald-500/40 text-slate-950 dark:text-white font-mono font-bold focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        {/* Category & Delivery Timeline */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                              Category / Business Type
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Fashion & Clothing Store"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-950 dark:text-white font-medium"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                              Turnaround Timeline
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 3–5 Days Delivery"
                              value={newTimeline}
                              onChange={(e) => setNewTimeline(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-950 dark:text-white font-medium"
                            />
                          </div>
                        </div>

                        {/* Short Description */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                            Short Description (Shown on card)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Brief 1-2 sentence overview of what the website delivers for the business..."
                            value={newShortDesc}
                            onChange={(e) => setNewShortDesc(e.target.value)}
                            className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-950 dark:text-white font-medium"
                          />
                        </div>

                        {/* WEBSITE PHOTOS & MAIN COVER MANAGER */}
                        <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-neutral-700">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Layers className="w-4 h-4 text-blue-600" />
                                <span>Website Photos ({projectScreenshots.length}/5)</span>
                              </label>
                              <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                                Photo #1 is the <strong>Main Cover Photo</strong>. You can Crop, Replace, or Delete ANY photo!
                              </p>
                            </div>

                            {projectScreenshots.length < 5 && (
                              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all hover:scale-105">
                                <Upload className="w-3.5 h-3.5" />
                                <span>+ Upload Photos</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleScreenshotUpload}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>

                          {/* Photos List / Grid with explicit Crop, Replace, and Delete actions */}
                          {projectScreenshots.length === 0 ? (
                            <div className="p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 rounded-2xl text-center space-y-3">
                              <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                              <div>
                                <p className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                  No photo selected yet
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                                  Upload a screenshot of this website from your phone or PC
                                </p>
                              </div>
                              <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all hover:scale-105">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Select Main Cover Photo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleScreenshotUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                              {projectScreenshots.map((shot, idx) => (
                                <div
                                  key={idx}
                                  className={`rounded-2xl overflow-hidden border-2 bg-white dark:bg-neutral-900 shadow-md flex flex-col justify-between ${
                                    idx === 0
                                      ? 'border-blue-500 ring-2 ring-blue-500/20'
                                      : 'border-slate-300 dark:border-neutral-700'
                                  }`}
                                >
                                  {/* Photo Image Frame */}
                                  <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                                    <img
                                      src={shot}
                                      alt={`Photo ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2">
                                      {idx === 0 ? (
                                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-black shadow-md flex items-center gap-1">
                                          <Star className="w-2.5 h-2.5 fill-current" />
                                          <span>Main Cover</span>
                                        </span>
                                      ) : (
                                        <span className="px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                                          Photo #{idx + 1}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Explicit Action Buttons beneath photo */}
                                  <div className="p-2.5 bg-slate-50 dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-1 flex-wrap text-xs">
                                    {/* Crop button */}
                                    <button
                                      type="button"
                                      onClick={() => handleOpenCropForScreenshot(idx)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold text-[11px] border border-blue-200 dark:border-blue-900 transition-colors"
                                      title="Crop / Frame Photo"
                                    >
                                      <Crop className="w-3 h-3" />
                                      <span>Crop</span>
                                    </button>

                                    {/* Replace button with hidden file input */}
                                    <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 text-slate-700 dark:text-neutral-300 font-bold text-[11px] border border-slate-300 dark:border-neutral-700 transition-colors">
                                      <RefreshCcw className="w-3 h-3" />
                                      <span>Replace</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleReplacePhotoAtIndex(idx, e)}
                                        className="hidden"
                                      />
                                    </label>

                                    {/* Make Cover button (if not already cover) */}
                                    {idx !== 0 && (
                                      <button
                                        type="button"
                                        onClick={() => handleSetPrimaryScreenshot(idx)}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-amber-700 dark:text-amber-300 font-bold text-[11px] border border-amber-200 dark:border-amber-800 transition-colors"
                                        title="Make this photo the main cover"
                                      >
                                        <Star className="w-3 h-3 fill-current" />
                                        <span>Set Cover</span>
                                      </button>
                                    )}

                                    {/* Delete button (works on ANY photo including main photo) */}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveScreenshot(idx)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 text-red-600 dark:text-red-400 font-bold text-[11px] border border-red-200 dark:border-red-900 transition-colors ml-auto"
                                      title="Delete Photo"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Save / Cancel buttons */}
                        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-neutral-700">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingProject(false);
                              setEditingProjectId(null);
                            }}
                            className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all hover:scale-105"
                          >
                            <Check className="w-4 h-4" />
                            <span>{editingProjectId ? 'Save Changes & Update' : '🚀 Publish Website to Portfolio'}</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Existing Projects List */}
                    <div className="space-y-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-blue-500/50 transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-16 h-12 rounded-xl object-cover shrink-0 border border-slate-300 dark:border-neutral-700 shadow-sm"
                            />
                            <div className="min-w-0 space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                                  {proj.number}
                                </span>
                                <h5 className="text-sm font-black text-slate-950 dark:text-white truncate">
                                  {proj.title}
                                </h5>
                                {proj.screenshots && proj.screenshots.length > 1 && (
                                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                                    📸 {proj.screenshots.length} photos
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-slate-600 dark:text-neutral-400 truncate">
                                {proj.category} · {proj.timeline}
                              </p>

                              {proj.liveUrl ? (
                                <a
                                  href={proj.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                                >
                                  <Globe className="w-3.5 h-3.5" />
                                  <span className="truncate">{proj.liveUrl}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ) : (
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                                  ⚠️ No Live Link set (Click Edit to add)
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => handleStartEditProject(proj)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition-colors border border-blue-200 dark:border-blue-900"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Website & Photos</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                              title="Delete Website"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Change Profile Photo */}
                {activeTab === 'photo' && (
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative shrink-0">
                        <img
                          src={avatarUrl}
                          alt="Current profile photo"
                          className="w-28 h-28 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md"
                        />
                        <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                          Active
                        </span>
                      </div>

                      <div className="space-y-3 text-center sm:text-left flex-1">
                        <h4 className="text-base font-black text-slate-950 dark:text-white">
                          Change & Crop Profile Photo
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-neutral-400 font-medium">
                          Select any photo from your phone or PC. The interactive cropper lets you zoom and frame your face perfectly!
                        </p>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all hover:scale-105">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload & Crop Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarFileSelected}
                              className="hidden"
                            />
                          </label>

                          <button
                            onClick={handleResetPhoto}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-slate-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 border border-slate-300 dark:border-neutral-600 hover:bg-slate-100 transition-colors"
                          >
                            <RefreshCcw className="w-3 h-3" />
                            <span>Reset to Default</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Canvas Crop Modal */}
      <ImageCropperModal
        isOpen={cropperOpen}
        imageSrc={imageToCrop}
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
        aspectRatioHint={cropRatioHint}
      />

      {/* UNMISSABLE CELEBRATION / SUCCESS PUBLISH MODAL POPUP */}
      {publishSuccess && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 border-2 border-emerald-500/80 rounded-[32px] p-6 sm:p-7 shadow-2xl text-center space-y-5 animate-scaleUp">
            {/* Close Button top-right */}
            <button
              onClick={() => setPublishSuccess(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Success Badge */}
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px]">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>{publishSuccess.isEdit ? 'Website Updated!' : 'Published to Portfolio!'}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                {publishSuccess.isEdit ? 'Changes Saved Successfully!' : 'Website Live On Portfolio!'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-300">
                "{publishSuccess.title}" is now active in your portfolio and upper showcase.
              </p>
            </div>

            {/* Visual Card Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 flex items-center gap-3.5 text-left">
              <img
                src={publishSuccess.image}
                alt={publishSuccess.title}
                className="w-16 h-14 rounded-xl object-cover shrink-0 border border-slate-300 dark:border-neutral-600 shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-slate-950 dark:text-white truncate">
                  {publishSuccess.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 truncate">
                  {publishSuccess.category}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                    📸 {publishSuccess.photoCount} Photos
                  </span>
                  {publishSuccess.liveUrl && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      ✓ Live Link
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Button 1: View Live on Portfolio (Closes admin & scrolls to card) */}
              <button
                onClick={() => {
                  setPublishSuccess(null);
                  if (onViewProjectOnPortfolio) {
                    onViewProjectOnPortfolio(publishSuccess.projectId);
                  } else {
                    onClose();
                    setTimeout(() => {
                      const elem = document.querySelector('#projects');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <Eye className="w-4 h-4" />
                <span>View On Portfolio (See Card Live)</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              {/* Button 2: Open External Live URL if provided */}
              {publishSuccess.liveUrl && (
                <a
                  href={publishSuccess.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-2xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Client Website Link</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              )}

              {/* Button 3: Add Another Website or Done */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setPublishSuccess(null);
                    setEditingProjectId(null);
                    setNewTitle('');
                    setNewLiveUrl('');
                    setNewShortDesc('');
                    setProjectScreenshots([]);
                    setIsAddingProject(true);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 font-bold text-xs transition-colors"
                >
                  + Add Another
                </button>
                <button
                  onClick={() => setPublishSuccess(null)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-200 dark:bg-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-600 text-slate-900 dark:text-white font-bold text-xs transition-colors"
                >
                  Close Popup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
