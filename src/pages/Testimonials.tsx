import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  rating?: number;
  image?: string;
  company?: string;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Working with this developer was an exceptional experience. Their attention to detail and problem-solving skills are top-notch. They delivered our complex project ahead of schedule and exceeded our expectations in every way.",
    name: "Jane Doe",
    title: "CTO",
    company: "TechCorp",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    project: "E-commerce Platform"
  },
  {
    quote: "I was thoroughly impressed with the professionalism and skill demonstrated throughout our project. Communication was clear, deadlines were met, and the final product was exactly what we envisioned. I highly recommend them for any development project.",
    name: "John Smith",
    title: "Project Manager",
    company: "Innovate Solutions",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    project: "Mobile Banking App"
  },
  {
    quote: "Their expertise in full-stack development is truly remarkable. They built a robust and scalable application that perfectly met our needs. What sets them apart is their ability to understand business requirements and translate them into technical solutions.",
    name: "Sarah Lee",
    title: "Lead Engineer",
    company: "WebWorks",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    project: "Data Analytics Dashboard"
  },
  {
    quote: "An absolute pleasure to work with. They took our vague concept and transformed it into a beautiful, functional website that has received countless compliments from our clients. Their design sense and technical skills are exceptional.",
    name: "Michael Chen",
    title: "Marketing Director",
    company: "Bright Ideas Inc",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    project: "Corporate Website Redesign"
  },
  {
    quote: "Reliable, efficient, and incredibly talented. They quickly understood our requirements and delivered high-quality code that was well-structured and easy to maintain. I appreciate their commitment to best practices and clean code.",
    name: "Emily Rodriguez",
    title: "Product Owner",
    company: "Software Solutions",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    project: "CRM Integration"
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');

  // Auto-advance carousel
  useEffect(() => {
    if (viewMode === 'carousel') {
      const interval = setInterval(() => {
        if (!isPreviewing) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isPreviewing, viewMode]);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-theme-bg min-h-screen py-16 md:py-24">
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-6">
            <span className="relative">
              Client Testimonials
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-theme-primary-main"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.7 }}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-theme-text-secondary leading-relaxed">
            Don't just take my word for it. Here's what clients have to say about working with me on various projects.
          </p>
          
          {/* Toggle view mode */}
          <div className="flex justify-center mt-8 space-x-3">
            <Button
              variant={viewMode === 'carousel' ? "default" : "outline"}
              onClick={() => setViewMode('carousel')}
              className="px-4 rounded-full"
              size="sm"
            >
              Carousel View
            </Button>
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              onClick={() => setViewMode('grid')}
              className="px-4 rounded-full"
              size="sm"
            >
              Grid View
            </Button>
          </div>
        </motion.div>

        {/* Carousel View */}
        {viewMode === 'carousel' && (
          <div className="relative max-w-4xl mx-auto my-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${activeIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="relative p-8 bg-theme-card-bg border border-theme-border shadow-lg">
                  {/* Decorative quote icon */}
                  <Quote 
                    className="absolute top-8 left-8 h-16 w-16 text-theme-primary-main/10" 
                    strokeWidth={1}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                      {testimonials[activeIndex].image && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="w-24 h-24 rounded-full overflow-hidden border-4 border-theme-primary-main/20 shadow-lg mx-auto md:mx-0"
                        >
                          <img 
                            src={testimonials[activeIndex].image} 
                            alt={testimonials[activeIndex].name}
                            className="w-full h-full object-cover" 
                          />
                        </motion.div>
                      )}
                      
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-theme-text-primary">
                          {testimonials[activeIndex].name}
                        </h3>
                        <p className="text-theme-text-secondary font-medium">
                          {testimonials[activeIndex].title}
                          {testimonials[activeIndex].company && (
                            <span> at {testimonials[activeIndex].company}</span>
                          )}
                        </p>
                        {testimonials[activeIndex].project && (
                          <div className="mt-2">
                            <span className="inline-block bg-theme-primary-main/10 text-theme-primary-main px-3 py-1 rounded-full text-sm">
                              {testimonials[activeIndex].project}
                            </span>
                          </div>
                        )}
                        {testimonials[activeIndex].rating && (
                          <div className="flex items-center justify-center md:justify-start mt-2 space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < testimonials[activeIndex].rating!
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <blockquote className="mt-6">
                      <p className="text-lg md:text-xl italic text-theme-text-primary leading-relaxed">
                        "{testimonials[activeIndex].quote}"
                      </p>
                    </blockquote>
                  </div>
                </Card>
                
                {/* Navigation dots */}
                <div className="flex items-center justify-center space-x-3 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'bg-theme-primary-main scale-125'
                          : 'bg-theme-border hover:bg-theme-primary-main/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel controls */}
            <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between px-4 z-10">
              <Button
                onClick={prevTestimonial}
                onMouseEnter={() => setIsPreviewing(true)}
                onMouseLeave={() => setIsPreviewing(false)}
                variant="outline"
                size="icon"
                className="bg-theme-card-bg border border-theme-border shadow-md rounded-full h-12 w-12 -translate-x-1/2 opacity-80 hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={nextTestimonial}
                onMouseEnter={() => setIsPreviewing(true)}
                onMouseLeave={() => setIsPreviewing(false)}
                variant="outline"
                size="icon"
                className="bg-theme-card-bg border border-theme-border shadow-md rounded-full h-12 w-12 translate-x-1/2 opacity-80 hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <CardHeader className="pb-2 relative">
                    <Quote className="absolute top-2 right-2 h-8 w-8 text-theme-primary-main/20" />
                    
                    <div className="flex items-center space-x-4">
                      {testimonial.image && (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-theme-primary-main/20">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-theme-primary-main text-lg">
                          {testimonial.name}
                        </CardTitle>
                        <p className="text-theme-text-secondary text-sm">
                          {testimonial.title}
                          {testimonial.company && (
                            <span> at {testimonial.company}</span>
                          )}
                        </p>
                        
                        {testimonial.rating && (
                          <div className="flex items-center mt-1 space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating!
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {testimonial.project && (
                      <div className="mt-3">
                        <span className="inline-block bg-theme-primary-main/10 text-theme-primary-main px-2 py-0.5 rounded-full text-xs">
                          {testimonial.project}
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="flex-grow pt-3">
                    <p className="text-theme-text-primary italic text-sm md:text-base">
                      "{testimonial.quote.length > 150 
                        ? testimonial.quote.substring(0, 150) + '...' 
                        : testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center bg-theme-card-bg border border-theme-border rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-theme-text-primary mb-4">Ready to Work Together?</h2>
          <p className="text-theme-text-secondary mb-6 max-w-2xl mx-auto">
            I'm currently available for freelance projects. Let's discuss how I can help bring your vision to life.
          </p>
          <Button 
            size="lg" 
            className="bg-theme-primary-main hover:bg-theme-primary-hover text-white"
            asChild
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Testimonials;