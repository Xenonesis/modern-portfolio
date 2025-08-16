import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface FormState {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const selectedService = location.state?.service || '';
  
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: selectedService ? `Inquiry about ${selectedService}` : '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);

  // Update subject when selectedService changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about ${selectedService}`
      }));
    }
  }, [selectedService]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFocus = (fieldName: string) => {
    setIsFocused(fieldName);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="bg-theme-bg min-h-screen">
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-6">
            <span className="relative">
              Get in Touch
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-theme-primary-main"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.7 }}
              />
            </span>
          </h1>
          <p className="text-lg text-theme-text-secondary leading-relaxed">
            Have a project in mind or want to learn more about my services? 
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="overflow-hidden border border-theme-border bg-theme-card-bg shadow-sm">
              <div className="bg-theme-primary-main/10 p-6 border-b border-theme-border">
                <CardTitle className="text-2xl font-bold text-theme-text-primary">Contact Info</CardTitle>
              </div>
              <CardContent className="space-y-6 p-6">
                <motion.div 
                  className="flex items-center space-x-4 text-theme-text-primary group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 rounded-full bg-theme-primary-main/10 text-theme-primary-main group-hover:bg-theme-primary-main group-hover:text-white transition-colors duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-text-secondary">Email</p>
                    <a href="mailto:alex.johnson@example.com" className="text-theme-text-primary hover:text-theme-primary-main transition-colors">
                      alex.johnson@example.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-4 text-theme-text-primary group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 rounded-full bg-theme-primary-main/10 text-theme-primary-main group-hover:bg-theme-primary-main group-hover:text-white transition-colors duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-text-secondary">Phone</p>
                    <a href="tel:+15551234567" className="text-theme-text-primary hover:text-theme-primary-main transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-4 text-theme-text-primary group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 rounded-full bg-theme-primary-main/10 text-theme-primary-main group-hover:bg-theme-primary-main group-hover:text-white transition-colors duration-300">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-text-secondary">Location</p>
                    <p className="text-theme-text-primary">San Francisco, CA, USA</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border border-theme-border bg-theme-card-bg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4 text-theme-text-primary flex items-center">
                <span className="h-4 w-1 bg-theme-primary-main mr-2 rounded-full"></span>
                Connect with me
              </h3>
              <div className="flex space-x-4 mt-4">
                <motion.a
                  href="https://linkedin.com/in/alexjohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-theme-primary-main/10 text-theme-primary-main hover:bg-theme-primary-main hover:text-white transition-all duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://github.com/alexjohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-theme-primary-main/10 text-theme-primary-main hover:bg-theme-primary-main hover:text-white transition-all duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/alexjohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-theme-primary-main/10 text-theme-primary-main hover:bg-theme-primary-main hover:text-white transition-all duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="h-6 w-6" />
                </motion.a>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="border border-theme-border bg-theme-card-bg shadow-sm overflow-hidden">
              <div className="bg-theme-primary-main/10 p-6 border-b border-theme-border">
                <CardTitle className="text-2xl font-bold text-theme-text-primary">Send a Message</CardTitle>
                {selectedService && (
                  <p className="text-sm text-theme-text-secondary mt-2">
                    Regarding: {selectedService}
                  </p>
                )}
              </div>
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="text-green-500 mb-4"
                      >
                        <CheckCircle2 size={60} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-theme-text-primary mb-2">Message Sent!</h3>
                      <p className="text-theme-text-secondary text-center max-w-xs">
                        Thank you for your message. I'll get back to you as soon as possible!
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                    >
                      <div className="relative">
                        <Label 
                          htmlFor="name" 
                          className={`text-sm font-medium ${isFocused === 'name' ? 'text-theme-primary-main' : 'text-theme-text-primary'}`}
                        >
                          Full Name
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          placeholder="Your name"
                          className={`mt-1 bg-theme-bg border ${
                            errors.name 
                              ? 'border-red-500 focus:ring-red-500' 
                              : isFocused === 'name'
                                ? 'border-theme-primary-main focus:ring-theme-primary-main'
                                : 'border-theme-border focus:ring-theme-primary-main'
                          } text-theme-text-primary`}
                        />
                        {errors.name && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-500 flex items-center"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" /> {errors.name}
                          </motion.p>
                        )}
                      </div>
                      
                      <div className="relative">
                        <Label 
                          htmlFor="email" 
                          className={`text-sm font-medium ${isFocused === 'email' ? 'text-theme-primary-main' : 'text-theme-text-primary'}`}
                        >
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          placeholder="your.email@example.com"
                          className={`mt-1 bg-theme-bg border ${
                            errors.email 
                              ? 'border-red-500 focus:ring-red-500' 
                              : isFocused === 'email'
                                ? 'border-theme-primary-main focus:ring-theme-primary-main'
                                : 'border-theme-border focus:ring-theme-primary-main'
                          } text-theme-text-primary`}
                        />
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-500 flex items-center"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Subject field (optional or prefilled from services page) */}
                      <div className="relative">
                        <Label 
                          htmlFor="subject" 
                          className={`text-sm font-medium ${isFocused === 'subject' ? 'text-theme-primary-main' : 'text-theme-text-primary'}`}
                        >
                          Subject (optional)
                        </Label>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject || ''}
                          onChange={handleChange}
                          onFocus={() => handleFocus('subject')}
                          onBlur={handleBlur}
                          placeholder="What's this regarding?"
                          className={`mt-1 bg-theme-bg border ${
                            isFocused === 'subject'
                              ? 'border-theme-primary-main focus:ring-theme-primary-main'
                              : 'border-theme-border focus:ring-theme-primary-main'
                          } text-theme-text-primary`}
                        />
                      </div>
                      
                      <div className="relative">
                        <Label 
                          htmlFor="message" 
                          className={`text-sm font-medium ${isFocused === 'message' ? 'text-theme-primary-main' : 'text-theme-text-primary'}`}
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          placeholder="Your message here..."
                          rows={5}
                          className={`mt-1 bg-theme-bg border resize-none ${
                            errors.message 
                              ? 'border-red-500 focus:ring-red-500' 
                              : isFocused === 'message'
                                ? 'border-theme-primary-main focus:ring-theme-primary-main'
                                : 'border-theme-border focus:ring-theme-primary-main'
                          } text-theme-text-primary`}
                        />
                        {errors.message && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-500 flex items-center"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" /> {errors.message}
                          </motion.p>
                        )}
                        <div className="text-right text-theme-text-secondary text-xs mt-1">
                          {formData.message.length} characters
                        </div>
                      </div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full py-3 bg-theme-primary-main hover:bg-theme-primary-hover text-white flex items-center justify-center gap-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <span>Send Message</span>
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Map or additional info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-theme-card-bg border border-theme-border rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-theme-text-primary mb-4">Let's Build Something Amazing Together</h2>
            <p className="text-theme-text-secondary mx-auto max-w-2xl">
              Whether you have a specific project in mind or just want to explore possibilities,
              I'm ready to bring my expertise and creativity to your next digital venture.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
