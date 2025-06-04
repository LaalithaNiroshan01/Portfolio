import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import { Icon } from '../../utils/IconWrapper';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Icon icon={FiMail} size={24} />,
      title: 'Email',
      details: 'laalithaniroshan@gmail.com',
      link: 'mailto:laalithaniroshan@gmail.com'
    },
    {
      icon: <Icon icon={FiPhone} size={24} />,
      title: 'Phone',
      details: '+94 777 178 775',
      link: 'tel:+94777178775'
    },
    {
      icon: <Icon icon={FiMapPin} size={24} />,
      title: 'Location',
      details: 'Malabe, Sri Lanka',
      link: 'https://maps.google.com/?q=Malabe,Sri+Lanka'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Feel free to contact me for any project or collaboration. I am always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {contactInfo.map((info, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-secondary dark:text-white">{info.title}</h3>
                <a 
                  href={info.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {info.details}
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard>
            <h3 className="text-2xl font-bold mb-6 text-secondary dark:text-white text-center">Send Me a Message</h3>
            {submitMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-pureBlack text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-pureBlack text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-pureBlack text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-pureBlack text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="text-center">
                <motion.button 
                  type="submit"
                  className="btn-primary inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Icon icon={FiSend} className="mr-2" /> Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </GlassCard>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ContactSection; 