import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../../utils/IconWrapper';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5,
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white bg-opacity-80 dark:bg-darkBg dark:bg-opacity-80 shadow-md py-4"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          variants={itemVariants}
        >
          <a href="#home" className="group relative flex items-center">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-2xl font-bold text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LN
                </motion.span>
              </div>
            </div>
            <motion.div 
              className="ml-2 text-xl font-medium text-secondary dark:text-white opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap"
              initial={{ width: 0 }}
              whileHover={{ width: "auto" }}
            >
              Laalitha Niroshan
            </motion.div>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center space-x-8"
          variants={itemVariants}
        >
          <a href="#home" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Home</a>
          <a href="#about" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">About Me</a>
          <a href="#skills" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Skills</a>
          <a href="#projects" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Projects</a>
          <a href="#designs" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Designs</a>
          <a href="#contact" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Contact</a>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-pureBlack"
          >
            {theme === 'dark' 
              ? <Icon icon={FiSun} className="text-yellow-400" /> 
              : <Icon icon={FiMoon} className="text-gray-700" />
            }
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-pureBlack"
          >
            {theme === 'dark' 
              ? <Icon icon={FiSun} className="text-yellow-400" /> 
              : <Icon icon={FiMoon} className="text-gray-700" />
            }
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="p-2 rounded-full bg-gray-100 dark:bg-pureBlack"
          >
            {isMenuOpen 
              ? <Icon icon={FiX} className="text-primary" /> 
              : <Icon icon={FiMenu} className="text-secondary dark:text-white" />
            }
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-darkBg shadow-lg rounded-b-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#home" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>Home</a>
            <a href="#about" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>About Me</a>
            <a href="#skills" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>Skills</a>
            <a href="#projects" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>Projects</a>
            <a href="#designs" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>Designs</a>
            <a href="#contact" className="text-secondary dark:text-white hover:text-primary dark:hover:text-primary px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>Contact</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 