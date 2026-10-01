import React, { useState, useEffect, useRef } from 'react';
import { ImageOff } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (priority) return;

    // Use IntersectionObserver to start loading slightly before scrolling into viewport
    if ('IntersectionObserver' in window && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px 0px' } // Preload 200px before appearing
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      // Fallback for environments without IntersectionObserver
      setIsInView(true);
    }
  }, [priority]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Shimmer skeleton placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-neutral-800 dark:via-neutral-700/50 dark:to-neutral-800 animate-pulse" />
      )}

      {/* Actual image rendered when in view */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}

      {/* Styled fallback container in case image fails to load */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
          <ImageOff className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs font-medium text-center">{alt}</span>
        </div>
      )}
    </div>
  );
};
