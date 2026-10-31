import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMaximize2, FiX } from 'react-icons/fi';
import { Icon } from '../../utils/IconWrapper';
import { useMotionPreferences } from '../../context/MotionPreferencesContext';

interface CertificateImageViewerProps {
  imageSource: string;
  imageAlt: string;
  title: string;
}

const CertificateImageViewer: React.FC<CertificateImageViewerProps> = ({
  imageSource,
  imageAlt,
  title
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tier } = useMotionPreferences();
  const reducedMotion = tier === 'minimal';
  const transition = reducedMotion
    ? { duration: 0.12 }
    : tier === 'balanced'
      ? { duration: 0.3, ease: 'easeOut' as const }
      : { type: 'spring' as const, stiffness: 220, damping: 24 };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`View ${title} full screen`}
        className="group relative block w-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        onContextMenu={(event) => event.preventDefault()}
        whileHover={reducedMotion ? undefined : { y: -3 }}
        whileTap={reducedMotion ? undefined : { scale: 0.99 }}
      >
        <img
          src={imageSource}
          alt={imageAlt}
          loading="lazy"
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md transition-transform duration-500 group-hover:scale-[1.025]"
        />
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-gray-900 shadow-lg">
            <Icon icon={FiMaximize2} />
            View full certificate
          </span>
        </span>
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gray-950/95 p-3 backdrop-blur-md md:p-8"
              role="dialog"
              aria-modal="true"
              aria-label={`${title} full-screen viewer`}
              onContextMenu={(event) => event.preventDefault()}
              onClick={(event) => {
                if (event.target === event.currentTarget) setIsOpen(false);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.28 }}
            >
              {!reducedMotion && (
                <>
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full border border-white/10"
                    animate={tier === 'full' ? { rotate: 360 } : undefined}
                    transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-36 -right-20 h-[28rem] w-[28rem] rounded-full border border-primary/20"
                    animate={tier === 'full' ? { rotate: -360 } : undefined}
                    transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
                  />
                </>
              )}
              <motion.div
                className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl dark:bg-darkBg md:rounded-3xl"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.92, rotateX: 5 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
                transition={transition}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 dark:border-gray-800 md:px-6">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Achievement</p>
                    <h3 className="truncate font-semibold text-secondary dark:text-white">{title}</h3>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close certificate"
                    className="viewer-control-button shrink-0"
                    whileHover={reducedMotion ? undefined : { rotate: 90, scale: 1.08 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.92 }}
                  >
                    <Icon icon={FiX} />
                  </motion.button>
                </div>
                <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-gray-100 p-3 dark:bg-gray-950 md:p-6">
                  <motion.img
                    src={imageSource}
                    alt={imageAlt}
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                    onDragStart={(event) => event.preventDefault()}
                    className="max-h-full max-w-full select-none object-contain"
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...transition, delay: reducedMotion ? 0 : 0.08 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default CertificateImageViewer;
