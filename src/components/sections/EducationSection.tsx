import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import { Icon } from '../../utils/IconWrapper';
import GraduationImageViewer from '../ui/GraduationImageViewer';
import { useMotionPreferences } from '../../context/MotionPreferencesContext';
import { getRevealMotionProps } from '../../utils/motionPresets';

const EducationSection: React.FC = () => {
  const { tier } = useMotionPreferences();
  const reduceMotion = tier === 'minimal';
  const revealProps = getRevealMotionProps(tier);
  const cardReveal = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0.15 : tier === 'balanced' ? 0.45 : 0.7,
      delay: reduceMotion ? 0 : 0.12,
      ease: 'easeOut' as const
    }
  };

  return (
    <section id="education" className="py-20 bg-white dark:bg-darkBg">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" {...revealProps}>
          <motion.p
            className="text-primary font-semibold uppercase tracking-widest mb-3"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, letterSpacing: '0.08em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.18em' }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.12 : 0.55 }}
          >
            Education
          </motion.p>
          <motion.h2
            className="section-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.12 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
          >
            Graduation Confirmation
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-primary mx-auto mb-6 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.12 : 0.7, delay: reduceMotion ? 0 : 0.18 }}
          />
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            I am a Software Engineering Graduate. View my graduation confirmation below.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-pureBlack shadow-2xl"
          {...cardReveal}
          whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.25 } }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 md:p-8">
            <div className="flex items-center gap-4">
              <motion.span
                className="w-12 h-12 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary"
                whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 280, damping: 16 }}
              >
                <Icon icon={FiFileText} size={22} />
              </motion.span>
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0.12 : 0.45, delay: reduceMotion ? 0 : 0.25 }}
              >
                <h3 className="text-xl font-bold text-secondary dark:text-white">Official Confirmation</h3>
                <p className="text-gray-600 dark:text-gray-400">Graduation confirmation document</p>
              </motion.div>
            </div>
          </div>
          <div className="px-4 pb-4 md:px-8 md:pb-8">
            <GraduationImageViewer />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
