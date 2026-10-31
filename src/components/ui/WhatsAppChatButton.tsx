import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiArrowUp } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../../utils/IconWrapper';

const WhatsAppChatButton: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();
  const isSubpage = pathname !== '/';
  const message = "Hi Laalitha! I came across your portfolio and would like to discuss a design project. Are you available to chat?";
  const href = `https://wa.me/94771462090?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 420);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isSubpage && (
        <Link
          to="/"
          aria-label="Back to portfolio"
          title="Back to portfolio"
          className="fixed top-5 left-5 sm:top-7 sm:left-7 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-panelBg/90 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition-all hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darkBg"
        >
          <Icon icon={FiArrowLeft} />
          <span>Back to Portfolio</span>
        </Link>
      )}

      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
            aria-label="Scroll to top"
            title="Scroll to top"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white/95 text-secondary shadow-lg backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary dark:border-white/10 dark:bg-darkBg/90 dark:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-lightBg dark:focus-visible:ring-offset-darkBg"
          >
            <Icon icon={FiArrowUp} size={18} />
          </motion.button>
        )}

        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Laalitha on WhatsApp"
          title="Chat with me on WhatsApp"
          whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
          className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-[#25D366] px-4 py-3 text-sm font-bold text-[#062b16] shadow-[0_8px_30px_rgba(37,211,102,0.3)] transition-shadow hover:shadow-[0_10px_36px_rgba(37,211,102,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-darkBg"
        >
          <Icon icon={FaWhatsapp} size={22} />
          <span>Chat with me</span>
        </motion.a>
      </div>
    </>
  );
};

export default WhatsAppChatButton;
