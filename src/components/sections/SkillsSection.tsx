import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiHtml5, SiCss3, SiJavascript, SiPhp, SiPython, 
  SiCplusplus, SiDart, SiFigma, SiAdobephotoshop, 
  SiAdobeillustrator, SiAdobexd, SiWordpress, SiGithub,
  SiIntellijidea, SiReact
} from 'react-icons/si';
import { DiJava, DiEclipse, DiNetbeans } from 'react-icons/di';
import { VscCode } from 'react-icons/vsc';
import { FaAndroid, FaTerminal } from 'react-icons/fa';
import { Icon } from '../../utils/IconWrapper';
import SkillBar from '../ui/SkillBar';

const SkillsSection: React.FC = () => {
  const programmingSkills = [
    { name: 'HTML', percentage: 90, icon: <Icon icon={SiHtml5} className="text-orange-500" /> },
    { name: 'CSS', percentage: 85, icon: <Icon icon={SiCss3} className="text-blue-500" /> },
    { name: 'JavaScript (React.js)', percentage: 80, icon: <Icon icon={SiJavascript} className="text-yellow-400" /> },
    { name: 'PHP', percentage: 75, icon: <Icon icon={SiPhp} className="text-purple-500" /> },
    { name: 'Python', percentage: 70, icon: <Icon icon={SiPython} className="text-blue-500" /> },
    { name: 'Java', percentage: 70, icon: <Icon icon={DiJava} className="text-red-500" /> },
    { name: 'C/C++', percentage: 65, icon: <Icon icon={SiCplusplus} className="text-blue-700" /> },
    { name: 'Android', percentage: 75, icon: <Icon icon={FaAndroid} className="text-green-500" /> },
    { name: 'Dart', percentage: 60, icon: <Icon icon={SiDart} className="text-blue-400" /> },
    { name: 'React', percentage: 65, icon: <Icon icon={SiReact} className="text-blue-500" /> },
  ];

  const designTools = [
    { name: 'Figma', icon: <Icon icon={SiFigma} /> },
    { name: 'Photoshop', icon: <Icon icon={SiAdobephotoshop} /> },
    { name: 'Illustrator', icon: <Icon icon={SiAdobeillustrator} /> },
    { name: 'Adobe XD', icon: <Icon icon={SiAdobexd} /> },
    { name: 'WordPress', icon: <Icon icon={SiWordpress} /> },
    { name: 'GitHub', icon: <Icon icon={SiGithub} /> },
  ];

  const idesTools = [
    { name: 'VS Code', icon: <Icon icon={VscCode} /> },
    { name: 'Android Studio', icon: <Icon icon={FaAndroid} /> },
    { name: 'Eclipse', icon: <Icon icon={DiEclipse} /> },
    { name: 'IntelliJ IDEA', icon: <Icon icon={SiIntellijidea} /> },
    { name: 'Apache NetBeans', icon: <Icon icon={DiNetbeans} /> },
    { name: 'Cursor', icon: <Icon icon={FaTerminal} /> },
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
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">My Skills</h2>
          <div className="h-1 w-24 red-maroon-gradient mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Here are my skills and the technologies I work with to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Programming Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-secondary dark:text-white">Programming Skills</h3>
            {programmingSkills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <SkillBar name={skill.name} percentage={skill.percentage} />
              </motion.div>
            ))}
          </motion.div>

          {/* Tools & Software */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-secondary dark:text-white">Design Tools</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-12">
                {designTools.map((tool, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-pureBlack flex items-center justify-center text-2xl mb-2">
                      {tool.icon}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-secondary dark:text-white">IDEs/Compilers</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                {idesTools.map((tool, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-pureBlack flex items-center justify-center text-2xl mb-2">
                      {tool.icon}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 