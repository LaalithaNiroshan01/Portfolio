import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { Icon } from '../../utils/IconWrapper';

// Import profile images
import profileImage1 from '../../images/DP1.png';
import profileImage2 from '../../images/DP2.png';
// Import CV pdf
import cvPdf from '../../assets/Laalitha_Niroshan.pdf';

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const profileImages = [profileImage1, profileImage2];

  // Change profile image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10 dark:opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-40 -right-20 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10 dark:opacity-5"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
      
      {/* Additional floating elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-5 dark:opacity-3"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-5 dark:opacity-3"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* Small floating particles */}
      {[...Array(5)].map((_, index) => {
        const colors = ['#E63946', '#4361EE', '#7209B7', '#4F46E5', '#EC4899'];
        return (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-6 h-6 rounded-full filter blur-md"
            style={{
              top: `${20 + index * 15}%`,
              left: `${15 + index * 18}%`,
              backgroundColor: colors[index],
            }}
            animate={{
              y: [0, -15, 0, 15, 0],
              x: [0, 10, 0, -10, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8
            }}
          />
        );
      })}
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image - Now on the left side */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <motion.div 
                className="absolute inset-0 bg-primary rounded-full opacity-10"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <div className="absolute inset-4 bg-gray-200 dark:bg-pureBlack rounded-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full h-full"
                  >
                    <img 
                      src={profileImages[currentImageIndex]} 
                      alt="Laalitha Niroshan" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
          
          {/* Content - Now on the right side */}
          <div>
            <motion.h2 
              className="text-lg md:text-xl text-primary font-semibold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I'm
            </motion.h2>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 text-secondary dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Laalitha Niroshan
            </motion.h1>
            
            <motion.div 
              className="text-xl md:text-2xl font-semibold mb-6 text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span>Software Engineering Undergraduate</span>
              <motion.div 
                className="h-0.5 w-24 bg-primary mt-2"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.div>
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              UI/UX Designer | Creative Innovator
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a 
                href={cvPdf} 
                download="Laalitha_Niroshan.pdf"
                className="btn-primary flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={FiDownload} className="mr-2" /> Download CV
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="btn-secondary flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 