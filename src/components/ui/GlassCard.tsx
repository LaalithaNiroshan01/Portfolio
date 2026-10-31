import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useMotionPreferences } from '../../context/MotionPreferencesContext';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  whileHover?: MotionProps['whileHover'];
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  whileHover
}) => {
  const { tier } = useMotionPreferences();

  return (
    <motion.div 
      className={`glass-card interactive-card bg-white dark:bg-pureBlack bg-opacity-20 dark:bg-opacity-20 shadow-lg p-6 ${className}`}
      whileHover={tier === 'minimal' ? undefined : whileHover ?? { y: -4 }}
      whileTap={tier === 'minimal' ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard; 