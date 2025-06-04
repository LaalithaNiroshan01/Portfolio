import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Icon } from '../../utils/IconWrapper';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary dark:bg-darkBg text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Laalitha Niroshan</h3>
            <p className="mb-4 text-gray-300">
              UI/UX Designer & Software Engineering Undergraduate passionate about creating engaging and user-friendly interfaces.
            </p>
            <motion.a 
              href="#contact" 
              className="btn-primary inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-primary transition-colors">About Me</a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-primary transition-colors">Skills</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-primary transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Icon icon={FiMail} className="text-primary mr-3" />
                <a href="mailto:laalithaniroshan@gmail.com" className="text-gray-300 hover:text-primary transition-colors">
                  laalithaniroshan@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Icon icon={FiPhone} className="text-primary mr-3" />
                <a href="tel:+94777178775" className="text-gray-300 hover:text-primary transition-colors">
                  +94 777 178 775
                </a>
              </li>
              <li className="flex items-center">
                <Icon icon={FiMapPin} className="text-primary mr-3" />
                <span className="text-gray-300">Malabe, Sri Lanka</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <motion.a 
                href="https://github.com/LaalithaNiroshan01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={FiGithub} />
              </motion.a>
              <motion.a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={FiLinkedin} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Laalitha Niroshan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 