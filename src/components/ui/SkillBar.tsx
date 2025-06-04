import React from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage }) => {
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
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default SkillBar; 