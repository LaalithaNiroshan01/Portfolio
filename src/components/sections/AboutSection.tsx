import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiCode, FiPenTool } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import { Icon } from '../../utils/IconWrapper';

const AboutSection: React.FC = () => {
  const services = [
    {
      icon: <Icon icon={FiMonitor} size={24} />,
      title: 'UI/UX Design',
      description: 'Designing intuitive and engaging user experiences',
      link: '#projects'
    },
    {
      icon: <Icon icon={FiCode} size={24} />,
      title: 'Software Development',
      description: 'Developing responsive applications using modern technologies',
      link: '#projects'
    },
    {
      icon: <Icon icon={FiPenTool} size={24} />,
      title: 'Illustration',
      description: 'Creating detailed illustrations and graphics',
      link: '#designs'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-pureBlack">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            I am a passionate software engineering undergraduate with expertise in UI/UX design and development. 
            I love creating user-friendly interfaces and developing innovative solutions.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-secondary dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.description}</p>
                <a 
                  href={service.link} 
                  className="text-primary font-medium hover:underline"
                >
                  {service.title === 'Illustration' ? 'Go to Designs' : 'Go to Projects'}
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 