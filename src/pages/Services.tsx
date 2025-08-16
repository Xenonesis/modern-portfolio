import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Pen, 
  LineChart, 
  Smartphone, 
  Globe, 
  Database,
  ArrowRight,
  Check,
  ChevronRight
} from 'lucide-react';

const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Categories for filtering
  const categories = [
    'All', 
    'Development', 
    'Design', 
    'Analytics', 
    'Mobile'
  ];

  const services = [
    {
      title: 'Web Development',
      icon: <Code className="h-10 w-10" />,
      description: 'Custom websites built with modern frameworks like React, Next.js, and more. Fully responsive and optimized for performance.',
      features: [
        'Custom React applications',
        'E-commerce solutions',
        'Progressive Web Apps (PWA)',
        'API integrations',
        'Performance optimization'
      ],
      price: 'Starting at $1,500',
      color: 'from-blue-500 to-sky-700',
      category: 'Development'
    },
    {
      title: 'UI/UX Design',
      icon: <Pen className="h-10 w-10" />,
      description: 'Professional user interface and experience design that prioritizes usability, accessibility, and visual appeal.',
      features: [
        'Wireframing & prototyping',
        'User flow design',
        'Usability testing',
        'Design systems',
        'Brand identity'
      ],
      price: 'Starting at $1,000',
      color: 'from-purple-500 to-pink-600',
      category: 'Design'
    },
    {
      title: 'Data Analytics',
      icon: <LineChart className="h-10 w-10" />,
      description: 'Transform your raw data into actionable insights with custom reports, dashboards, and visualization solutions.',
      features: [
        'Data visualization',
        'Custom dashboards',
        'Reporting automation',
        'Predictive analytics',
        'Business intelligence'
      ],
      price: 'Starting at $1,200',
      color: 'from-green-500 to-emerald-700',
      category: 'Analytics'
    },
    {
      title: 'Mobile Development',
      icon: <Smartphone className="h-10 w-10" />,
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
      features: [
        'React Native apps',
        'iOS & Android development',
        'App Store submission',
        'In-app purchases',
        'Push notifications'
      ],
      price: 'Starting at $2,500',
      color: 'from-red-500 to-orange-600',
      category: 'Mobile'
    },
    {
      title: 'SEO Optimization',
      icon: <Globe className="h-10 w-10" />,
      description: 'Improve your website\'s visibility in search engines with technical SEO, content optimization, and link building.',
      features: [
        'Technical SEO audit',
        'Keyword research',
        'On-page optimization',
        'Content strategy',
        'Performance reporting'
      ],
      price: 'Starting at $800',
      color: 'from-yellow-500 to-amber-600',
      category: 'Analytics'
    },
    {
      title: 'Database Design',
      icon: <Database className="h-10 w-10" />,
      description: 'Efficient, secure database architecture and management solutions for your applications and websites.',
      features: [
        'Database architecture',
        'Data migration',
        'Performance optimization',
        'Security hardening',
        'Backup solutions'
      ],
      price: 'Starting at $1,200',
      color: 'from-cyan-500 to-blue-600',
      category: 'Development'
    }
  ];

  // Filter services based on selected category
  const filteredServices = selectedCategory && selectedCategory !== 'All' 
    ? services.filter(service => service.category === selectedCategory)
    : services;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const serviceCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-theme-bg min-h-screen">
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-6">
            <span className="relative">
              My Services
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-theme-primary-main"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.7 }}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-theme-text-secondary mb-12 leading-relaxed">
            I offer a wide range of professional services to help bring your digital projects to life.
            From concept to completion, I'm committed to delivering high-quality solutions tailored to your needs.
          </p>

          {/* Service category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 rounded-full transition-all duration-300"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Service cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || 'all'}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                variants={serviceCardVariants}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="flex flex-col h-full"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="relative overflow-hidden h-full border border-theme-border bg-theme-card-bg hover:shadow-xl transition-all duration-300">
                  <div 
                    className={`absolute inset-0 opacity-10 bg-gradient-to-br ${service.color} transition-opacity duration-300 ${hoveredService === index ? 'opacity-20' : 'opacity-5'}`}
                  />
                  
                  {/* Price badge - improved positioning */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className={`text-sm font-semibold text-white bg-gradient-to-r ${service.color} px-3 py-1 rounded-full shadow-md`}
                    >
                      {service.price}
                    </motion.div>
                  </div>
                  
                  <div className="p-6 flex flex-col h-full relative z-10">
                    <div className="mb-6">
                      <motion.div 
                        className={`p-3 inline-flex rounded-lg bg-gradient-to-br ${service.color} text-white shadow-lg`}
                        whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                      >
                        {service.icon}
                      </motion.div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-theme-text-primary mb-3">{service.title}</h3>
                    <p className="text-theme-text-secondary mb-6 flex-grow">{service.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-theme-text-primary mb-3 flex items-center">
                        <ChevronRight className="h-5 w-5 text-theme-primary-main mr-1" />
                        Key Features:
                      </h4>                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i}>
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * i, duration: 0.3 }}
                              className="flex items-start space-x-2"
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="mt-[2px] flex-shrink-0"
                              >
                                <Check className="h-5 w-5 text-theme-primary-main" />
                              </motion.div>
                              <span className="text-theme-text-secondary">{feature}</span>
                            </motion.div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant="default" 
                      className={`mt-auto w-full group bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300`}
                      asChild
                    >
                      <Link to="/contact" state={{ service: service.title }}>
                        <span>Request Service</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section - Improved visual appeal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="mt-20 text-center bg-theme-card-bg border border-theme-border rounded-xl p-8 md:p-10 shadow-lg relative overflow-hidden"
        >
          {/* Background gradient animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-theme-primary-main/20 to-theme-secondary-main/20 opacity-50"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-theme-text-primary mb-6">Need a Custom Solution?</h2>
            <p className="text-theme-text-secondary mb-8 max-w-2xl mx-auto">
              Don't see exactly what you need? Contact me for a custom quote tailored to your specific project requirements.
              I specialize in creating bespoke solutions that perfectly match your vision.
            </p>
            <Button size="lg" className="px-8 bg-theme-primary-main hover:bg-theme-primary-hover shadow-lg" asChild>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="relative group overflow-hidden rounded-md"
              >
                <motion.div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
                <Link to="/contact" className="flex items-center">
                  Get In Touch <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;