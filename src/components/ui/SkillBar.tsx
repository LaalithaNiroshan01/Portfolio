import React from 'react';
import { motion } from 'framer-motion';
import { useMotionPreferences } from '../../context/MotionPreferencesContext';

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage }) => {
  const { tier } = useMotionPreferences();

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <motion.div 
          className="red-maroon-gradient h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: tier === 'full' ? 1 : tier === 'balanced' ? 0.55 : 0.2,
            delay: tier === 'full' ? 0.2 : 0
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar; 