import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiEye, FiMaximize2, FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { Icon } from '../../utils/IconWrapper';
import { useMotionPreferences } from '../../context/MotionPreferencesContext';

const imageSource = '/images/graduation-confirmation.png';
const minimumZoom = 0.75;
const maximumZoom = 2.5;

const GraduationImageViewer: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const { tier } = useMotionPreferences();
  const reducedMotion = tier === 'minimal';
  const popupTransition = reducedMotion
    ? { duration: 0.12 }
    : tier === 'balanced'
      ? { duration: 0.28, ease: 'easeOut' as const }
      : { type: 'spring' as const, stiffness: 220, damping: 24 };

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const changeZoom = (change: number) => {
    setZoom((currentZoom) => Math.min(maximumZoom, Math.max(minimumZoom, currentZoom + change)));
  };

  const popup = (
    <AnimatePresence>
    {isFullscreen && (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 p-3 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Graduation confirmation full-screen viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.12 : 0.25 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsFullscreen(false);
      }}
      onContextMenu={(event) => event.preventDefault()}
    >
      <motion.div
        className="flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-gray-800 bg-white shadow-2xl dark:bg-darkBg"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.92, rotateX: 4 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
        transition={popupTransition}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">
              <Icon icon={FiEye} />
            </span>
            <div>
              <p className="font-semibold text-secondary dark:text-white">Graduation confirmation</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">View only</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeZoom(-0.25)}
              disabled={zoom <= minimumZoom}
              aria-label="Zoom out confirmation letter"
              className="viewer-control-button"
            >
              <Icon icon={FiMinus} />
            </button>
            <span className="min-w-14 text-center text-sm text-gray-600 dark:text-gray-300" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => changeZoom(0.25)}
              disabled={zoom >= maximumZoom}
              aria-label="Zoom in confirmation letter"
              className="viewer-control-button"
            >
              <Icon icon={FiPlus} />
            </button>
            <motion.button
              type="button"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close confirmation letter"
              className="viewer-control-button ml-1"
              whileHover={reducedMotion ? undefined : { rotate: 90, scale: 1.08 }}
              whileTap={reducedMotion ? undefined : { scale: 0.92 }}
            >
              <Icon icon={FiX} />
            </motion.button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-gray-100 p-4 dark:bg-gray-950">
          <img
            src={imageSource}
            alt="CINEC Campus confirmation of graduation letter for Laalitha Niroshan"
            draggable={false}
            className="max-h-full max-w-full select-none object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-darkBg p-5 md:p-6 shadow-lg">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-20 shrink-0 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-pureBlack p-1 overflow-hidden">
            <img
              src={imageSource}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <Icon icon={FiEye} />
              <span className="text-xs font-semibold uppercase tracking-wider">Official document</span>
            </div>
            <h3 className="text-lg font-bold text-secondary dark:text-white">Graduation confirmation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View the full letter securely in a popup.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setZoom(1);
            setIsFullscreen(true);
          }}
          aria-label="View confirmation letter full screen"
          className="btn-primary shrink-0 inline-flex items-center justify-center gap-2"
        >
          <Icon icon={FiMaximize2} />
          View full letter
        </button>
      </div>
      {createPortal(popup, document.body)}
    </>
  );
};

export default GraduationImageViewer;
