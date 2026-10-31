import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { useMotionPreferences } from '../../context/MotionPreferencesContext';
import { getRevealMotionProps } from '../../utils/motionPresets';

// Import design images
// GIFs
import gif1 from '../../designs/GIF/1.gif';
import gif2 from '../../designs/GIF/2.gif';
import gif3 from '../../designs/GIF/3.gif';

// Illustrator designs
import illustrator1 from '../../designs/Illustrator/illustrator1.png';
import illustrator2 from '../../designs/Illustrator/illustrator2.png';
import illustrator3 from '../../designs/Illustrator/illustrator3.jpg';
import illustrator4 from '../../designs/Illustrator/illustrator4.png';
import illustrator5 from '../../designs/Illustrator/illustrator5.png';

// Photoshop designs
import art1 from '../../designs/Photoshop/Art1.png';

type DesignCategory = 'all' | 'gif' | 'illustrator' | 'photoshop';

interface Design {
  id: string;
  title: string;
  category: 'gif' | 'illustrator' | 'photoshop';
  image: string;
  tag: string;
}

const DesignsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DesignCategory>('all');
  const { tier } = useMotionPreferences();
  const revealProps = getRevealMotionProps(tier);

  const designs: Design[] = [
    // GIFs
    {
      id: 'gif1',
      title: 'Animated Design 1',
      category: 'gif',
      image: gif1,
      tag: '#illustration #animation'
    },
    {
      id: 'gif2',
      title: 'Animated Design 2',
      category: 'gif',
      image: gif2,
      tag: '#illustration #animation'
    },
    {
      id: 'gif3',
      title: 'Animated Design 3',
      category: 'gif',
      image: gif3,
      tag: '#illustration #animation'
    },
    
    // Illustrator designs
    {
      id: 'illustrator1',
      title: 'Vector Illustration 1',
      category: 'illustrator',
      image: illustrator1,
      tag: '#illustration #vector'
    },
    {
      id: 'illustrator2',
      title: 'Vector Illustration 2',
      category: 'illustrator',
      image: illustrator2,
      tag: '#illustration #vector'
    },
    {
      id: 'illustrator3',
      title: 'Vector Illustration 3',
      category: 'illustrator',
      image: illustrator3,
      tag: '#illustration #vector'
    },
    {
      id: 'illustrator4',
      title: 'Vector Illustration 4',
      category: 'illustrator',
      image: illustrator4,
      tag: '#illustration #vector'
    },
    {
      id: 'illustrator5',
      title: 'Vector Illustration 5',
      category: 'illustrator',
      image: illustrator5,
      tag: '#illustration #vector'
    },
    
    // Photoshop designs
    {
      id: 'art1',
      title: 'Digital Art 1',
      category: 'photoshop',
      image: art1,
      tag: '#illustration #digital-art'
    }
  ];

  const filteredDesigns = activeCategory === 'all' 
    ? designs 
    : designs.filter(design => design.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Designs' },
    { id: 'gif', name: 'GIF Animations' },
    { id: 'illustrator', name: 'Illustrator' },
    { id: 'photoshop', name: 'Photoshop' }
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
    <section id="designs" className="py-20 bg-gray-50 dark:bg-pureBlack">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          {...revealProps}
        >
          <h2 className="section-title">My Designs</h2>
          <div className="h-1 w-24 red-maroon-gradient mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-8">
            Explore my creative works including illustrations, animations, and digital art.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id as DesignCategory)}
                className={`interactive-button px-6 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'red-maroon-gradient text-white'
                    : 'bg-gray-200 dark:bg-pureBlack text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={tier === 'minimal' ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          } : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredDesigns.map(design => (
              <motion.div 
                key={design.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: tier === 'full' ? 0.96 : 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: tier === 'full' ? 0.96 : 1 }}
                transition={{ duration: tier === 'full' ? 0.4 : tier === 'balanced' ? 0.25 : 0.12 }}
              >
                <GlassCard className="h-full flex flex-col overflow-hidden">
                  <div className="overflow-hidden h-64 mb-4 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-pureBlack">
                    <img 
                      src={design.image} 
                      alt={design.title} 
                      className="design-image max-w-full max-h-full object-contain transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-secondary dark:text-white">{design.title}</h3>
                  <div className="mt-auto">
                    <p className="text-sm gradient-text">{design.tag}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignsSection; 