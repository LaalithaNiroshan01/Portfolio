import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  whileHover?: any;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  whileHover = { y: -5 } 
}) => {
  return (
    <motion.div 
      className={`glass-card bg-white dark:bg-pureBlack bg-opacity-20 dark:bg-opacity-20 shadow-lg p-6 ${className}`}
      whileHover={whileHover}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard; 