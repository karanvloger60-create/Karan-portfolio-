import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check, ZoomIn, ZoomOut, RotateCcw, Move, Smartphone, Monitor, Square } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedBase64: string) => void;
  aspectRatioHint?: '16:9' | '4:3' | '9:16' | '1:1';
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete,
  aspectRatioHint = '16:9'
}) => {
  if (!isOpen || !imageSrc) return null;

  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '9:16' | '1:1'>(aspectRatioHint);
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Aspect ratio calculations
  const getAspectRatioValue = () => {
    switch (aspectRatio) {
      case '16:9':
        return 16 / 9;
      case '4:3':
        return 4 / 3;
      case '9:16':
        return 9 / 16;
      case '1:1':
        return 1;
      default:
        return 16 / 9;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for mobile phones
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Export cropped canvas
  const handleApplyCrop = () => {
    if (!imageRef.current || !containerRef.current) return;

    const img = imageRef.current;
    const cropBox = containerRef.current.getBoundingClientRect();

    // Target dimensions
    let targetWidth = 1200;
    let targetHeight = Math.round(targetWidth / getAspectRatioValue());

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate source coordinates based on scale and pan
    const imgRect = img.getBoundingClientRect();

    // Scale ratio between actual image source and displayed image
    const scaleFactor = img.naturalWidth / imgRect.width;

    const cropBoxRelativeLeft = (cropBox.left - imgRect.left) * scaleFactor;
    const cropBoxRelativeTop = (cropBox.top - imgRect.top) * scaleFactor;
    const cropBoxRelativeWidth = cropBox.width * scaleFactor;
    const cropBoxRelativeHeight = cropBox.height * scaleFactor;

    ctx.drawImage(
      img,
      cropBoxRelativeLeft,
      cropBoxRelativeTop,
      cropBoxRelativeWidth,
      cropBoxRelativeHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCropComplete(croppedDataUrl);
    onClose();
  };

  const targetRatio = getAspectRatioValue();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-neutral-900 rounded-[28px] shadow-2xl border border-neutral-700 flex flex-col max-h-[95vh] text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
              <Move className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Crop & Adjust Screenshot</h3>
              <p className="text-[11px] text-neutral-400">Drag to reposition, zoom slider to scale</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Viewport */}
        <div className="p-4 flex-1 flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
          {/* Aspect Ratio Box Container */}
          <div
            ref={containerRef}
            style={{
              aspectRatio: `${targetRatio}`,
              maxHeight: '52vh',
              width: targetRatio < 1 ? 'auto' : '100%',
              height: targetRatio < 1 ? '52vh' : 'auto'
            }}
            className="relative overflow-hidden rounded-2xl border-2 border-dashed border-blue-500 shadow-2xl cursor-grab active:cursor-grabbing bg-neutral-900 flex items-center justify-center max-w-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop target"
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.08s ease-out'
              }}
              className="max-w-none pointer-events-none select-none min-w-full min-h-full object-cover"
            />

            {/* Grid overlay for rule-of-thirds */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20">
              <div className="border-r border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-b border-white/15" />
              <div className="border-r border-white/15" />
              <div className="border-r border-white/15" />
              <div />
            </div>

            {/* Drag hint overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/70 text-[10px] text-white/80 pointer-events-none backdrop-blur-xs flex items-center gap-1.5 font-medium">
              <Move className="w-3 h-3" />
              <span>Drag to Pan</span>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 space-y-4 bg-neutral-900/90">
          {/* Aspect Ratio Selector */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Ratio:
            </span>
            <div className="flex items-center gap-1.5 bg-neutral-800 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all ${
                  aspectRatio === '16:9' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>16:9 (Desktop)</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('4:3')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all ${
                  aspectRatio === '4:3' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Square className="w-3 h-3" />
                <span>4:3 (Card)</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all ${
                  aspectRatio === '9:16' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>9:16 (Phone)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
              title="Reset Position and Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-blue-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className="text-[11px] font-mono text-neutral-300 w-10 text-right">
              {zoom.toFixed(1)}x
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-bold text-neutral-300 bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyCrop}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all hover:scale-105"
            >
              <Check className="w-4 h-4" />
              <span>Apply & Save Crop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
