import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import { Icon } from '../../utils/IconWrapper';

// Import project images
import project1 from '../../images/project1.png';
import project2 from '../../images/project2.png';
import project3 from '../../images/project3.png';
import project4 from '../../images/project4.png';
import project5 from '../../images/project5.png';
import project6 from '../../images/project6.png';
import project7 from '../../images/project7.png';
import project8 from '../../images/project8.png';
import project9 from '../../images/project9.png';
import project10 from '../../images/project10.png';

type ProjectCategory = 'all' | 'uiux' | 'software';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'uiux' | 'software';
  image: string;
  link: string;
}

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const projects: Project[] = [
    {
      id: 'project1',
      title: 'After Sales Management System',
      description: 'UI/UX design for a comprehensive after-sales management system.',
      category: 'uiux',
      image: project1,
      link: 'https://www.figma.com/design/xH0uihooVQNtLH0jYc5jdM/George-Stuart-Consumer-(PVT)-LTD?node-id=45-239&t=IjkCpXthy9EI62pm-1'
    },
    {
      id: 'project2',
      title: 'Tuition Class Management System',
      description: 'A modern UI/UX design for efficiently managing tuition classes.',
      category: 'uiux',
      image: project2,
      link: 'https://www.figma.com/design/vtKHdUN4m6FbYhh8r1374H/Tuition-Class-Management-System?node-id=2004-671&t=VrmX4waVUHvIgw6J-1'
    },
    {
      id: 'project3',
      title: 'HeritscopeLanka – Travel Planner',
      description: 'A travel planner focused on Sri Lanka\'s heritage sites with intuitive UX.',
      category: 'uiux',
      image: project3,
      link: 'https://www.figma.com/design/cpqEkZxh22MjnQGHVOeuJ9/HeritScope-Lanka---Sri-Lanka-Heritage-Guide-and--Travel-Planner?node-id=0-1&t=tbtqH5k4ejnqnUVz-1'
    },
    {
      id: 'project4',
      title: 'AI Base Fitness App',
      description: 'AI-powered fitness application with personalized workout plans.',
      category: 'uiux',
      image: project4,
      link: 'https://www.figma.com/design/P3zyHN53ZZ1W9QIF3EAIBU/AI-Fitness?node-id=2-605&t=jaJU5WBoWGkGePMz-1'
    },
    {
      id: 'project5',
      title: 'Train Tracking App',
      description: 'UI/UX design for a real-time train tracking application.',
      category: 'uiux',
      image: project5,
      link: 'https://www.figma.com/design/LMR5voob5OZRixhaLek2od/Train-Tracking?node-id=58-35&t=AtyFnvOYVXhRaaT5-1'
    },
    {
      id: 'project8',
      title: 'Veloce Motors',
      description: 'UI/UX design for a luxury car dealership website.',
      category: 'uiux',
      image: project8,
      link: 'https://www.figma.com/design/0c2mvrfTXeygPkW3m4AorO/Veloce-Motors?node-id=0-1&t=g5AFN1QETtj0hSTc-1'
    },
    {
      id: 'project9',
      title: 'BookNest',
      description: 'E-commerce platform for book lovers with user-friendly interface.',
      category: 'uiux',
      image: project9,
      link: 'https://www.figma.com/design/mrv138OexGzgvAiqONjKpM/BookNest?node-id=0-1&p=f&t=xms5qH9ffsde2Ehq-0'
    },
    {
      id: 'project6',
      title: 'Volunteer Website',
      description: 'A website for volunteer management and organization.',
      category: 'software',
      image: project6,
      link: 'https://github.com/LaalithaNiroshan01/Train-Tracking-App'
    },
    {
      id: 'project7',
      title: 'Instagram Automation',
      description: 'Automation tool using Selenium WebDriver for Instagram.',
      category: 'software',
      image: project7,
      link: 'https://github.com/LaalithaNiroshan01/Instagram-Automation-Selenium-WebDriver-'
    },
    {
      id: 'project10',
      title: 'The Book Haven',
      description: 'Online bookstore with integrated user management and ordering system.',
      category: 'software',
      image: project10,
      link: 'https://github.com/LaalithaNiroshan01/The-Book-Haven'
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'uiux', name: 'UI/UX Design' },
    { id: 'software', name: 'Software Projects' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-pureBlack">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">My Projects</h2>
          <div className="h-1 w-24 red-maroon-gradient mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-8">
            Here are some of my recent projects showcasing my skills in UI/UX design and software development.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'red-maroon-gradient text-white'
                    : 'bg-gray-200 dark:bg-pureBlack text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id as ProjectCategory)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="h-full flex flex-col overflow-hidden">
                  <div className="overflow-hidden h-48 mb-4 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-pureBlack">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-secondary dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="gradient-text flex items-center gap-2 font-medium hover:underline mt-auto"
                  >
                    View Project <Icon icon={FiExternalLink} />
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection; 