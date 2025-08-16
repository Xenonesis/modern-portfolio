import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const linkSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Services', path: '/services' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Development', path: '/services' },
        { name: 'UI/UX Design', path: '/services' },
        { name: 'Data Analytics', path: '/services' },
        { name: 'Mobile Development', path: '/services' },
        { name: 'SEO Optimization', path: '/services' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
        { name: 'Cookie Policy', path: '#' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="h-5 w-5" />, url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, url: 'https://twitter.com/yourusername' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, url: 'https://instagram.com/yourusername' },
  ];

  return (
    <motion.footer
      className="bg-theme-card-bg border-t border-theme-border shadow-inner mt-auto"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Footer top section */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-theme-text-primary">MyPortfolio</span>
            </Link>
            <p className="text-theme-text-secondary mb-6 text-sm">
              Creating clean, user-friendly digital experiences using modern technologies.
              Focused on building scalable, high-performance solutions to empower businesses.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-theme-primary-main/10 text-theme-primary-main hover:bg-theme-primary-main hover:text-theme-card-bg transition-all duration-300"
                  aria-label={social.name}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation links */}
          {linkSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-theme-text-primary font-semibold mb-4 text-lg flex items-center">
                <span className="h-5 w-0.5 bg-theme-primary-main mr-2 rounded-full"></span>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-theme-text-secondary hover:text-theme-primary-main hover:translate-x-1 flex items-center transition-all duration-200 text-sm"
                    >
                      <span className="mr-2">›</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter subscription (optional) */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 pt-8 border-t border-theme-border flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div className="mb-4 md:mb-0">
            <h3 className="text-theme-text-primary font-semibold mb-1">Stay Updated</h3>
            <p className="text-theme-text-secondary text-sm">
              Subscribe for the latest articles, projects and updates.
            </p>
          </div>
          <Button 
            onClick={scrollToTop} 
            variant="outline"
            className="flex items-center gap-2 border-theme-primary-main text-theme-primary-main hover:bg-theme-primary-main hover:text-theme-card-bg group"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            <span>Back to top</span>
          </Button>
        </motion.div>
      </div>

      {/* Footer Bottom / Copyright */}
      <div className="border-t border-theme-border py-6 bg-theme-bg/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-theme-text-secondary">
            <motion.p
              variants={itemVariants}
              className="mb-4 md:mb-0 flex items-center"
            >
              &copy; {currentYear} MyPortfolio. All rights reserved. Made with 
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 1], 
                }}
                transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
                className="inline-flex mx-1 text-red-500"
              >
                <Heart size={14} fill="currentColor" />
              </motion.span>
              and React.
            </motion.p>
            <motion.div variants={itemVariants} className="flex space-x-4">
              <Link to="#" className="hover:text-theme-primary-main transition-colors">
                Privacy
              </Link>
              <Link to="#" className="hover:text-theme-primary-main transition-colors">
                Terms
              </Link>
              <Link to="#" className="hover:text-theme-primary-main transition-colors">
                Sitemap
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
