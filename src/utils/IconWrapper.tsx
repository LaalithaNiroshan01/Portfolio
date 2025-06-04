import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ icon, className = '', size }) => {
  const IconComponent = icon as React.ComponentType<IconBaseProps>;
  return <IconComponent className={className} size={size} />;
}; 