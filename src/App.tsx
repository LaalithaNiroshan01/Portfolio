import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import EducationSection from './components/sections/EducationSection';
import ResearchSection from './components/sections/ResearchSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import DesignsSection from './components/sections/DesignsSection';
import ContactSection from './components/sections/ContactSection';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionPreferencesProvider, useMotionPreferences } from './context/MotionPreferencesContext';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { tier, shouldReduceMotion } = useMotionPreferences();

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
      y: shouldReduceMotion ? 0 : 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: tier === 'minimal' ? 0 : tier === 'balanced' ? 0.45 : 0.8,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -20,
      transition: {
        duration: tier === 'minimal' ? 0 : tier === 'balanced' ? 0.25 : 0.5
      }
    }
  };

  // Loading screen with subtle animation
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-pureBlack">
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
          animate={shouldReduceMotion
            ? { opacity: 1 }
            : tier === 'balanced'
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: [0.8, 1.2, 1], rotate: [0, 180, 0] }}
          transition={{
            duration: tier === 'minimal' ? 0 : tier === 'balanced' ? 0.6 : 1.5,
            ease: "easeInOut",
            times: tier === 'full' ? [0, 0.6, 1] : undefined
          }}
          className="text-4xl font-bold text-primary"
        >
          <div className={`w-20 h-20 border-4 border-primary border-t-transparent rounded-full ${shouldReduceMotion ? '' : 'animate-spin'}`}></div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
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
              <EducationSection />
              <ResearchSection />
              <SkillsSection />
              <ProjectsSection />
              <DesignsSection />
              <ContactSection />
            </Layout>
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

const App: React.FC = () => (
  <BrowserRouter>
    <MotionPreferencesProvider>
      <AppContent />
    </MotionPreferencesProvider>
  </BrowserRouter>
);

export default App;
