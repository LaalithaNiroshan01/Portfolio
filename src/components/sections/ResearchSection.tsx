import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { Icon } from '../../utils/IconWrapper';
import PdfBookViewer from '../ui/PdfBookViewer';
import CertificateImageViewer from '../ui/CertificateImageViewer';
import { useMotionPreferences } from '../../context/MotionPreferencesContext';
import { getRevealMotionProps } from '../../utils/motionPresets';

const proceedingsPdf = '/documents/cirs-2026-proceedings.pdf';
const chromeStoreUrl = 'https://chromewebstore.google.com/detail/aiclnkgbodafngkkjnjgkcnjmkfnhcaa?utm_source=item-share-cb';

const ResearchSection: React.FC = () => {
  const { tier } = useMotionPreferences();
  const revealProps = getRevealMotionProps(tier);
  const reduceMotion = tier === 'minimal';
  const cardReveal = {
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: tier === 'full' ? 42 : 26, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0.15 : tier === 'balanced' ? 0.45 : 0.7,
      ease: 'easeOut' as const
    }
  };

  return (
    <section id="research" className="py-20 bg-gray-50 dark:bg-pureBlack overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          {...revealProps}
        >
          <motion.p
            className="text-primary font-semibold uppercase tracking-widest mb-3"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, letterSpacing: '0.08em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.18em' }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.12 : 0.55 }}
          >
            Research &amp; Publications
          </motion.p>
          <motion.h2
            className="section-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.12 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
          >
            Research &amp; Publications
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-primary mx-auto mb-6 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.12 : 0.7, delay: reduceMotion ? 0 : 0.18 }}
          />
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Browse the CIRS 2026 proceedings and explore the companion Chrome extension.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)] gap-8 items-start">
          <motion.div
            className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-darkBg p-5 md:p-8 shadow-xl"
            {...cardReveal}
            whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.25 } }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider">CIRS 2026 Proceedings</p>
                <h3 className="text-lg md:text-xl font-bold text-secondary dark:text-white mt-1">
                  Emotion-Adaptive Focus Mode Browser Extension
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">BLN Gunarathna, H Rajasinghe &amp; H Koswatta</p>
              </div>
            </div>

            <PdfBookViewer source={proceedingsPdf} title="CIRS 2026 Proceedings" initialPage={133} />
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.aside
              className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white bg-gradient-to-br from-red-600 via-primary to-rose-900 shadow-xl"
              {...cardReveal}
              transition={{ ...cardReveal.transition, delay: reduceMotion ? 0 : 0.12 }}
              whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-white border-opacity-20"
                animate={tier === 'full' ? { rotate: 360 } : undefined}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -right-4 -top-4 w-32 h-32 rounded-full border border-white border-opacity-20"
                animate={tier === 'full' ? { rotate: -360 } : undefined}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative">
                <motion.p
                  className="text-sm font-semibold uppercase tracking-widest text-white text-opacity-80"
                  initial={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.45, delay: reduceMotion ? 0 : 0.2 }}
                >
                  Try the companion tool
                </motion.p>
                <motion.h3
                  className="text-3xl font-bold mt-4 mb-4"
                  initial={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.5, delay: reduceMotion ? 0 : 0.28 }}
                >
                  Emotion-Adaptive Focus Mode
                </motion.h3>
                <p className="text-white text-opacity-85 leading-relaxed mb-8">
                  Visit the Chrome Web Store to view and add the browser extension directly from this portfolio.
                </p>
                <a
                  href={chromeStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-link inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-red-700 hover:bg-gray-100 transition-colors"
                >
                  Get it on Chrome <Icon icon={FiExternalLink} />
                </a>
              </div>
            </motion.aside>

            <motion.aside
              aria-label="CIRS Research Certificate"
              className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-darkBg p-6 shadow-xl"
              {...cardReveal}
              transition={{ ...cardReveal.transition, delay: reduceMotion ? 0 : 0.22 }}
              whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.25 } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">
                  <Icon icon={FiAward} size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Achievement</p>
                  <h3 className="font-bold text-secondary dark:text-white">CIRS Research Certificate</h3>
                </div>
              </div>
              <CertificateImageViewer
                imageSource="/images/cirs-2026-certificate.png"
                imageAlt="CIRS 2026 certificate recognizing the Emotion-Adaptive Focus Mode Browser Extension research presentation by BLN Gunarathna"
                title="CIRS Research Certificate"
              />
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
