import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import DesignsSection from './components/sections/DesignsSection';
import ContactSection from './components/sections/ContactSection';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Set initial theme based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.className = prefersDark ? 'dark' : 'light';
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5
      }
    }
  };

  // Loading screen with subtle animation
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-pureBlack">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [0.8, 1.2, 1],
            rotate: [0, 180, 0]
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.6, 1]
          }}
          className="text-4xl font-bold text-primary"
        >
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key="main-content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Layout>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <DesignsSection />
            <ContactSection />
          </Layout>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
