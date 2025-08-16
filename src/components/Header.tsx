import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  User, 
  Code, 
  FileText, 
  Mail, 
  MessageSquare, 
  Briefcase,
  Home
} from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle,
  SheetDescription,
  SheetHeader 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position for enhanced header behavior
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', path: '/about', icon: <User size={18} /> },
    { name: 'Projects', path: '/projects', icon: <Code size={18} /> },
    { name: 'Blog', path: '/blog', icon: <FileText size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
    { name: 'Testimonials', path: '/testimonials', icon: <MessageSquare size={18} /> },
    { name: 'Services', path: '/services', icon: <Briefcase size={18} /> },
  ];

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full py-3 border-b border-theme-border 
        ${scrolled 
          ? 'bg-theme-card-bg/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-theme-card-bg/80 backdrop-blur-sm shadow-sm py-3'
        } transition-all duration-300 ease-in-out`}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold text-theme-text-primary hover:text-theme-primary-main transition-colors duration-300"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Home className="h-6 w-6" />
          </motion.div>
          <span>MyPortfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`
                    relative flex items-center space-x-2 px-3 py-2 rounded-md text-lg font-medium 
                    ${isActive 
                      ? 'text-theme-primary-main bg-accent/20 shadow-sm' 
                      : 'text-theme-text-primary'
                    } 
                    hover:text-theme-primary-main hover:bg-accent/10 
                    transition-all duration-300 group
                  `}
                >
                  <motion.span
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="text-theme-primary-main"
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.span
                      className="absolute bottom-[-2px] left-0 h-0.5 w-full bg-theme-primary-main rounded-full"
                      layoutId="underline"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      style={{ originX: 0 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
          <ThemeSwitcher />
        </motion.nav>

        {/* Mobile Navigation (Sheet) */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeSwitcher />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" aria-label="Open menu">
                <Menu className="h-5 w-5 text-theme-text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] sm:w-[320px] bg-theme-card-bg text-theme-text-primary p-0 border-l-2 border-l-primary/30"
            >
              <div className="flex flex-col h-full">
                <SheetHeader className="p-6 border-b border-theme-border bg-gradient-to-r from-theme-primary-main/10 to-transparent">
                  <SheetTitle className="text-xl font-semibold flex items-center">
                    <Home className="mr-2 h-5 w-5 text-theme-primary-main" />
                    Navigation Menu
                  </SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground mt-1">
                    Browse through the site sections
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1 overflow-auto py-6 px-4">
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {navItems.map((item, index) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to={item.path}
                            className={`
                              flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg text-lg font-medium
                              relative overflow-hidden
                              transition-all duration-200 ease-in-out
                              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-theme-card-bg
                              ${isActive
                                ? 'bg-primary/90 text-primary-foreground shadow-md'
                                : 'text-theme-text-primary hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                              }
                            `}
                            onClick={() => setIsSheetOpen(false)} // Close sheet on navigation
                          >
                            {isActive && (
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-primary to-theme-secondary-main opacity-20"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                              />
                            )}
                            <span className="bg-theme-card-bg/40 p-2 rounded-md">{item.icon}</span>
                            <span>{item.name}</span>
                            {isActive && (
                              <motion.span 
                                className="ml-auto h-2 w-2 rounded-full bg-primary-foreground"
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
                
                <div className="p-6 border-t border-theme-border mt-auto bg-gradient-to-r from-transparent to-theme-primary-main/10">
                  <p className="text-sm text-muted-foreground flex items-center justify-between">
                    <span>© 2025 MyPortfolio</span>
                    <motion.span 
                      className="inline-flex items-center text-theme-primary-main"
                      whileHover={{ x: 3 }}
                    >
                      Close Menu
                      <User className="h-4 w-4 ml-1" />
                    </motion.span>
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
