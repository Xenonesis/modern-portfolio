import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Heart, 
  Calendar, 
  MapPin, 
  Search, 
  X,
  LayoutGrid,
  List,
  BarChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DiReact, DiNodejs, DiMongodb, DiPostgresql, DiDocker, DiAws, DiGit } from 'react-icons/di';
import { SiTypescript, SiExpress, SiTailwindcss, SiGraphql, SiFigma, SiNextdotjs, SiJavascript } from 'react-icons/si';

// ViewModeSwitcher component for encapsulating view switching logic
interface ViewModeSwitcherProps {
  activeView: 'grid' | 'list' | 'chart';
  onChange: (view: 'grid' | 'list' | 'chart') => void;
}

const ViewModeSwitcher: React.FC<ViewModeSwitcherProps> = ({ activeView, onChange }) => {
  // Hard-coded view modes for direct access without relying on current state
  const setGrid = () => onChange('grid');
  const setList = () => onChange('list');
  const setChart = () => onChange('chart');
  
  return (
    <div className="bg-theme-card-bg rounded-lg flex p-1 shadow-sm view-mode-switcher">
      {/* Grid button - completely independent */}
      <Button
        type="button"
        onClick={setGrid}
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center gap-1.5 px-3 py-2",
          activeView === 'grid' ? "bg-theme-primary-main text-white" : "text-theme-text-primary"
        )}
        data-view="grid"
        data-active={activeView === 'grid'}
      >
        <LayoutGrid size={16} />
        <span>Grid</span>
      </Button>
      
      {/* List button - no dependencies on active view in handler */}
      <Button
        type="button"
        onClick={setList}
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center gap-1.5 px-3 py-2", 
          activeView === 'list' ? "bg-theme-primary-main text-white" : "text-theme-text-primary"
        )}
        data-view="list"
        data-active={activeView === 'list'}
      >
        <List size={16} />
        <span>List</span>
      </Button>
      
      {/* Chart button - using simple direct setter */}
      <Button
        type="button"
        onClick={setChart}
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center gap-1.5 px-3 py-2",
          activeView === 'chart' ? "bg-theme-primary-main text-white" : "text-theme-text-primary"
        )}
        data-view="chart"
        data-active={activeView === 'chart'}
      >
        <BarChart size={16} />
        <span>Chart</span>
      </Button>
    </div>
  );
};

// Define skill categories and levels
interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design';
  yearsOfExperience?: number;
  keyProjects?: string[];
  description?: string;
  relatedSkills?: string[];
  color?: string;
}

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  location?: string;
}

const About: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'chart'>('grid');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  // Simplified view mode tracking with forced refresh
  useEffect(() => {
    console.log('View mode changed to:', viewMode);
    
    // Add class to document body for global styling
    const body = document.body;
    body.classList.remove('view-mode-grid', 'view-mode-list', 'view-mode-chart');
    body.classList.add(`view-mode-${viewMode}`);
    body.setAttribute('data-view-mode', viewMode);
    
    // Force reflow to make sure the DOM updates properly
    const forceReflow = document.querySelector('.force-reflow');
    if (forceReflow) {
      // This triggers a reflow
      void forceReflow.getBoundingClientRect();
    }
    
    // Force a clean re-render on view mode change
    const timer = setTimeout(() => {
      console.log(`Re-rendering ${viewMode} view after delay`);
      // Setting a temporary state to force a re-render
      setExpandedSkill(null);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [viewMode]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Skill category tabs
  const categories = [
    { id: 'all', label: 'All Skills', icon: null },
    { id: 'frontend', label: 'Frontend', icon: null },
    { id: 'backend', label: 'Backend', icon: null },
    { id: 'database', label: 'Database', icon: null },
    { id: 'devops', label: 'DevOps', icon: null },
    { id: 'design', label: 'Design', icon: null }
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
  };
  
  const scaleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
  };

  // Skills data with proficiency levels
  const skills: Skill[] = [
    { 
      name: 'React', 
      level: 90, 
      icon: <DiReact className="w-8 h-8" />, 
      category: 'frontend',
      yearsOfExperience: 5,
      keyProjects: ['E-commerce Platform', 'Social Media Dashboard'],
      description: 'Expert in React, including hooks, context API, and advanced patterns. Experienced with Redux and state management.',
      relatedSkills: ['React Router', 'Redux', 'React Query'],
      color: '#61DAFB'
    },
    { 
      name: 'TypeScript', 
      level: 85, 
      icon: <SiTypescript className="w-8 h-8" />, 
      category: 'frontend',
      yearsOfExperience: 4,
      keyProjects: ['Enterprise CRM', 'Financial Dashboard'],
      description: 'Strong TypeScript skills with focus on type safety, interfaces, and advanced typing patterns.',
      relatedSkills: ['JavaScript', 'Angular', 'React'],
      color: '#3178C6'
    },
    { 
      name: 'JavaScript', 
      level: 92, 
      icon: <SiJavascript className="w-8 h-8" />, 
      category: 'frontend',
      yearsOfExperience: 7,
      keyProjects: ['Interactive Web Apps', 'Browser Extensions'],
      description: 'Extensive JavaScript knowledge including ES6+, async/await, and functional programming concepts.',
      relatedSkills: ['TypeScript', 'Node.js', 'jQuery'],
      color: '#F7DF1E'
    },
    { 
      name: 'Next.js', 
      level: 80, 
      icon: <SiNextdotjs className="w-8 h-8" />, 
      category: 'frontend',
      yearsOfExperience: 3,
      keyProjects: ['E-commerce Site', 'Blog Platform'],
      description: 'Experienced with server-side rendering, static generation, and Next.js API routes.',
      relatedSkills: ['React', 'Vercel', 'SSR'],
      color: '#000000'
    },
    { 
      name: 'Tailwind CSS', 
      level: 88, 
      icon: <SiTailwindcss className="w-8 h-8" />, 
      category: 'frontend',
      yearsOfExperience: 3,
      keyProjects: ['Component Library', 'Marketing Website'],
      description: 'Proficient in building responsive UIs with Tailwind, including custom theming and component design.',
      relatedSkills: ['CSS', 'UI Design', 'Responsive Design'],
      color: '#06B6D4'
    },
    { 
      name: 'Node.js', 
      level: 85, 
      icon: <DiNodejs className="w-8 h-8" />, 
      category: 'backend',
      yearsOfExperience: 5,
      keyProjects: ['RESTful APIs', 'Authentication Service'],
      description: 'Strong backend development skills with Node.js including performance optimization and microservice architecture.',
      relatedSkills: ['Express.js', 'REST APIs', 'WebSockets'],
      color: '#339933'
    },
    { 
      name: 'Express.js', 
      level: 82, 
      icon: <SiExpress className="w-8 h-8" />, 
      category: 'backend',
      yearsOfExperience: 5,
      keyProjects: ['API Gateway', 'Content Management System'],
      description: 'Experienced in building RESTful APIs and middleware using Express.js for various applications.',
      relatedSkills: ['Node.js', 'REST APIs', 'Middleware'],
      color: '#000000'
    },
    { 
      name: 'PostgreSQL', 
      level: 75, 
      icon: <DiPostgresql className="w-8 h-8" />, 
      category: 'database',
      yearsOfExperience: 4,
      keyProjects: ['Data Warehouse', 'Analytics Platform'],
      description: 'Skilled in database design, query optimization, and working with complex relational data models.',
      relatedSkills: ['SQL', 'Database Design', 'ORMs'],
      color: '#336791'
    },
    { 
      name: 'MongoDB', 
      level: 80, 
      icon: <DiMongodb className="w-8 h-8" />, 
      category: 'database',
      yearsOfExperience: 4,
      keyProjects: ['Real-time Analytics', 'Content Repository'],
      description: 'Experience with MongoDB schema design, aggregation pipelines, and performance optimization.',
      relatedSkills: ['NoSQL', 'Mongoose', 'Atlas'],
      color: '#47A248'
    },
    { 
      name: 'GraphQL', 
      level: 78, 
      icon: <SiGraphql className="w-8 h-8" />, 
      category: 'backend',
      yearsOfExperience: 3,
      keyProjects: ['API Gateway', 'Content Platform'],
      description: 'Proficient in designing GraphQL schemas, resolvers, and integrating with various data sources.',
      relatedSkills: ['Apollo', 'API Design', 'Node.js'],
      color: '#E535AB'
    },
    { 
      name: 'Docker', 
      level: 70, 
      icon: <DiDocker className="w-8 h-8" />, 
      category: 'devops',
      yearsOfExperience: 3,
      keyProjects: ['Microservice Architecture', 'CI/CD Pipeline'],
      description: 'Experience with containerization, Docker Compose, and container orchestration.',
      relatedSkills: ['Kubernetes', 'DevOps', 'CI/CD'],
      color: '#2496ED'
    },
    { 
      name: 'AWS', 
      level: 65, 
      icon: <DiAws className="w-8 h-8" />, 
      category: 'devops',
      yearsOfExperience: 3,
      keyProjects: ['Serverless API', 'Cloud Migration'],
      description: 'Experienced with various AWS services including EC2, S3, Lambda, and CloudFormation.',
      relatedSkills: ['Cloud Computing', 'Serverless', 'IaC'],
      color: '#FF9900'
    },
    { 
      name: 'Figma', 
      level: 75, 
      icon: <SiFigma className="w-8 h-8" />, 
      category: 'design',
      yearsOfExperience: 3,
      keyProjects: ['Design System', 'UI/UX Prototype'],
      description: 'Skilled in designing user interfaces, prototyping, and collaborating with design teams.',
      relatedSkills: ['UI/UX Design', 'Prototyping', 'Design Systems'],
      color: '#F24E1E'
    },
    { 
      name: 'Git', 
      level: 88, 
      icon: <DiGit className="w-8 h-8" />, 
      category: 'devops',
      yearsOfExperience: 6,
      keyProjects: ['Open Source Contributions', 'Version Control Strategy'],
      description: 'Advanced knowledge of Git workflows, branching strategies, and collaboration practices.',
      relatedSkills: ['GitHub', 'CI/CD', 'Version Control'],
      color: '#F05032'
    },
  ];

  // Filter skills based on active category and search term
  const filteredSkills = skills
    .filter(skill => {
      const categoryMatch = activeCategory === 'all' || skill.category === activeCategory;
      const searchMatch = !searchTerm || 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.keyProjects?.some(project => project.toLowerCase().includes(searchTerm.toLowerCase())) ||
        skill.relatedSkills?.some(related => related.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => viewMode === 'chart' ? b.level - a.level : 0);

  // Get aggregated stats by category
  const categoryStats = categories.reduce((acc, category) => {
    if (category.id !== 'all') {
      const categorySkills = skills.filter(skill => skill.category === category.id);
      const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
      acc[category.id] = {
        count: categorySkills.length,
        averageLevel: Math.round(avgLevel),
        topSkill: [...categorySkills].sort((a, b) => b.level - a.level)[0]?.name
      };
    }
    return acc;
  }, {} as Record<string, { count: number; averageLevel: number; topSkill?: string }>);

  // Education and experience timeline data
  const educationData: TimelineItem[] = [
    {
      id: 1,
      title: 'Master of Computer Science',
      organization: 'Stanford University',
      period: '2018 - 2020',
      description: 'Specialized in Human-Computer Interaction and Machine Learning with a focus on building intuitive user interfaces for AI applications.',
      icon: <GraduationCap />,
      location: 'California, USA'
    },
    {
      id: 2,
      title: 'Bachelor of Science in Software Engineering',
      organization: 'MIT',
      period: '2014 - 2018',
      description: 'Graduated with honors. Participated in multiple hackathons and led the university coding club for two years.',
      icon: <GraduationCap />,
      location: 'Massachusetts, USA'
    }
  ];

  const experienceData: TimelineItem[] = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      organization: 'Tech Innovations Inc.',
      period: '2021 - Present',
      description: 'Lead developer for enterprise SaaS applications serving over 10,000 users. Architected and implemented scalable solutions using React, Node.js, and AWS.',
      icon: <Briefcase />,
      location: 'Remote'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      organization: 'Creative Digital Agency',
      period: '2019 - 2021',
      description: 'Developed responsive web applications and interactive experiences for major brand clients. Implemented performant UI components and animations.',
      icon: <Briefcase />,
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      title: 'Software Engineer Intern',
      organization: 'Global Tech Solutions',
      period: '2018 - 2019',
      description: 'Contributed to the development of core features for a financial analytics platform. Worked on both frontend and backend components.',
      icon: <Briefcase />,
      location: 'New York, NY'
    },
  ];

  // Personal interests
  const interests = [
    { label: 'Photography', icon: '📷' },
    { label: 'Hiking', icon: '🥾' },
    { label: 'Reading', icon: '📚' },
    { label: 'Chess', icon: '♟️' },
    { label: 'Cooking', icon: '🍳' },
    { label: 'Travel', icon: '✈️' }
  ];

  // Awards and achievements
  const achievements = [
    { title: 'Best Web Application', event: 'International Dev Summit 2022', year: '2022' },
    { title: 'Innovation Award', event: 'Tech Conference', year: '2021' },
    { title: '1st Place Hackathon', event: 'Global Code Jam', year: '2020' }
  ];

  return (
    <section className="container py-16 md:py-24 space-y-20">
      {/* Hero Section with Improved Layout */}
      <motion.div
        className="grid md:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Text Content with Enhanced Typography */}
        <motion.div className="space-y-8">
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-6xl font-extrabold leading-tight text-theme-text-primary relative"
          >
            Hi, I'm <span className="text-theme-primary-main relative">
              Alex Johnson
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-theme-primary-main" 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="flex items-center text-sm space-x-2 text-theme-text-secondary">
            <MapPin size={14} />
            <span>San Francisco, California</span>
            <span className="w-1 h-1 rounded-full bg-theme-text-secondary inline-block"></span>
            <span>Available for freelance</span>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-lg text-theme-text-primary leading-relaxed">
            A <strong>passionate Full Stack Developer</strong> with <strong>7+ years of experience</strong> building beautiful 
            and functional web applications. I specialize in creating dynamic, responsive, and user-friendly 
            experiences from concept to deployment.
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-lg text-theme-text-primary leading-relaxed">
            With expertise in modern JavaScript frameworks like React, robust backend technologies, 
            and a keen eye for design, I transform complex ideas into elegant solutions. 
            I'm always eager to learn new technologies and tackle challenging projects.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild size="lg" className="px-6 py-3 text-lg">
              <Link to="/projects">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-6 py-3 text-lg border-theme-primary-main text-theme-primary-main hover:bg-theme-primary-main hover:text-theme-card-bg">
              Download CV <Download className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div 
            variants={fadeInVariants}
            className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-theme-border"
          >
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="text-3xl font-bold text-theme-primary-main">7+</div>
              <div className="text-sm text-theme-text-secondary">Years Experience</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="text-3xl font-bold text-theme-primary-main">50+</div>
              <div className="text-sm text-theme-text-secondary">Projects Completed</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="text-3xl font-bold text-theme-primary-main">30+</div>
              <div className="text-sm text-theme-text-secondary">Happy Clients</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column: Enhanced Profile Image */}
        <motion.div variants={itemVariants} className="flex justify-center md:justify-end">
          <div className="relative">
            <motion.div 
              className="absolute -inset-4 rounded-full bg-theme-primary-main/20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -inset-2 rounded-full bg-theme-primary-main/30"
              animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Alex Johnson"
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-theme-primary-main shadow-lg relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* About Me Section (Enhanced Bio) */}
      <motion.div
        className="py-16 bg-theme-card-bg rounded-2xl p-8 shadow-sm"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-theme-text-primary"
        >
          About <span className="text-theme-primary-main">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-theme-text-primary">My Story</h3>
            <p className="text-theme-text-primary leading-relaxed">
              My journey in web development began during my college years when I built my first website for a local business. 
              The ability to create something meaningful that helps solve real problems immediately captivated me.
            </p>
            <p className="text-theme-text-primary leading-relaxed">
              Over the years, I've had the opportunity to work with startups, agencies, and enterprise companies, 
              developing a versatile skill set that allows me to tackle a wide range of challenges. I'm particularly 
              passionate about creating accessible, performant web applications that deliver exceptional user experiences.
            </p>
            <p className="text-theme-text-primary leading-relaxed">
              Outside of coding, I enjoy contributing to open-source projects, writing technical articles, and mentoring 
              aspiring developers. I believe in continuous learning and staying ahead of industry trends and best practices.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-theme-text-primary">My Approach</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-theme-primary-main/10 p-3 rounded-full text-theme-primary-main">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-theme-text-primary">Quality-Focused</h4>
                  <p className="text-theme-text-secondary">I believe in writing clean, maintainable code that stands the test of time.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-theme-primary-main/10 p-3 rounded-full text-theme-primary-main">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-theme-text-primary">User-Centered</h4>
                  <p className="text-theme-text-secondary">Every design decision I make is guided by how it will impact the end user.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-theme-primary-main/10 p-3 rounded-full text-theme-primary-main">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-theme-text-primary">Deadline-Driven</h4>
                  <p className="text-theme-text-secondary">I take pride in delivering projects on time without compromising on quality.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Skills Section with Enhanced Interactive UI */}
      <motion.div
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary">
              My <span className="text-theme-primary-main">Skills</span>
            </h2>
            <p className="text-theme-text-secondary max-w-2xl mt-2">
              I've worked with a variety of technologies across the full stack development spectrum.
              Here's a breakdown of my technical expertise.
            </p>
          </div>

          {/* View mode switcher - Enhanced implementation */}
          <div className="mt-4 md:mt-0">
            <ViewModeSwitcher 
              activeView={viewMode} 
              onChange={(view) => {
                console.log('About component: changing view to:', view);
                
                // Use a callback to ensure state is updated properly
                setViewMode((prevMode) => {
                  console.log(`Updating view mode from ${prevMode} to ${view}`);
                  return view;
                });
                
                // Force re-evaluation of the conditional rendering
                setTimeout(() => {
                  console.log('Current view mode after state update:', view);
                  
                  // Add a dedicated class to the body to help with debugging
                  document.body.setAttribute('data-view-mode', view);
                }, 0);
              }} 
            />
            <div className="hidden md:block text-xs text-center mt-2 text-theme-text-secondary">
              {viewMode === 'grid' && 'Compact card view'}
              {viewMode === 'list' && 'Detailed list view'}
              {viewMode === 'chart' && 'Visual comparison'}
            </div>
          </div>
        </motion.div>

        {/* Search and filter bar */}
        <motion.div 
          variants={fadeInVariants}
          className="mb-8 bg-theme-card-bg rounded-lg p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center shadow-sm"
        >
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search skills, projects, tools..."
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-theme-border bg-theme-bg focus:outline-none focus:ring-2 focus:ring-theme-primary-main/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-secondary">
              {searchTerm ? (
                <button onClick={() => setSearchTerm('')} aria-label="Clear search">
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <Search className="w-4 h-4" />
              )}
            </div>
          </div>

          <div className="w-full md:w-auto overflow-x-auto flex-grow">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    activeCategory === category.id 
                      ? "bg-theme-primary-main text-theme-card-bg" 
                      : "bg-theme-bg text-theme-text-primary hover:bg-theme-primary-main/10"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* No results message */}
        {filteredSkills.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-theme-text-secondary mb-2">No skills found matching your search.</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="text-theme-primary-main hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Skill visualization modes - debug panel */}
        <div className="mb-4 p-2 bg-theme-card-bg rounded-lg text-xs text-theme-text-secondary flex items-center justify-between">
          <div>
            <span className="font-semibold">Active View:</span> 
            <span className="ml-1 text-theme-primary-main">{viewMode}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Showing {filteredSkills.length} skills</span>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`px-2 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-theme-bg text-theme-text-secondary'}`}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`px-2 py-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-theme-bg text-theme-text-secondary'}`}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('chart')} 
              className={`px-2 py-1 rounded ${viewMode === 'chart' ? 'bg-blue-600 text-white' : 'bg-theme-bg text-theme-text-secondary'}`}
            >
              Chart
            </button>
          </div>
        </div>

        {/* Simple mode selector without animation for reliability */}
        <div className="modes-container mb-8">
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={scaleVariants}
                  onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 15px 30px -10px rgba(0,0,0,0.15)",
                    scale: 1.02,
                  }}
                  className={cn(
                    "bg-theme-card-bg rounded-lg p-6 shadow-sm cursor-pointer border border-transparent transition-colors duration-300",
                    expandedSkill === skill.name ? "border-theme-primary-main/50" : "hover:border-theme-primary-main/20"
                  )}
                  style={{
                    backgroundImage: `radial-gradient(circle at top right, ${skill.color}10, transparent 70%)`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="p-3 rounded-lg shadow-sm" 
                      style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-theme-text-primary">{skill.name}</h4>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs bg-theme-primary-main/10 text-theme-primary-main px-2 py-0.5 rounded-full capitalize">
                          {skill.category}
                        </span>
                        <span className="text-xs text-theme-text-secondary">
                          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-theme-text-secondary">Proficiency</span>
                      <span className="font-medium" style={{ color: skill.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-theme-border rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedSkill === skill.name && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        <p className="text-sm text-theme-text-secondary mb-3">{skill.description}</p>
                        
                        {skill.keyProjects && skill.keyProjects.length > 0 && (
                          <div className="mb-3">
                            <h5 className="text-xs font-medium text-theme-text-primary mb-1">Key Projects:</h5>
                            <div className="flex flex-wrap gap-1">
                              {skill.keyProjects.map((project, i) => (
                                <span 
                                  key={i}
                                  className="text-xs bg-theme-bg px-2 py-0.5 rounded-full text-theme-text-secondary"
                                >
                                  {project}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {skill.relatedSkills && skill.relatedSkills.length > 0 && (
                          <div>
                            <h5 className="text-xs font-medium text-theme-text-primary mb-1">Related Technologies:</h5>
                            <div className="flex flex-wrap gap-1">
                              {skill.relatedSkills.map((related, i) => (
                                <span 
                                  key={i}
                                  className="text-xs bg-theme-primary-main/5 text-theme-primary-main px-2 py-0.5 rounded-full"
                                >
                                  {related}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeInVariants}
                  whileHover={{ 
                    backgroundColor: `${skill.color}05`, 
                    borderColor: `${skill.color}40`,
                    x: 5
                  }}
                  className="bg-theme-card-bg rounded-lg p-4 border border-theme-border shadow-sm flex flex-col md:flex-row md:items-center gap-4 transition-colors duration-300"
                  data-skill="list-item"
                >
                  <div 
                    className="p-3 rounded-lg shadow-sm flex-shrink-0"
                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                      <h4 className="font-semibold text-theme-text-primary text-lg">{skill.name}</h4>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs bg-theme-primary-main/10 text-theme-primary-main px-2 py-0.5 rounded-full capitalize">
                          {skill.category}
                        </span>
                        <span className="text-xs whitespace-nowrap">
                          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} experience
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-theme-text-secondary mb-3">{skill.description}</p>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-grow space-y-2 min-w-[200px]">
                        <div className="flex justify-between text-xs">
                          <span className="text-theme-text-secondary">Proficiency</span>
                          <span className="font-medium" style={{ color: skill.color }}>{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-theme-border rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {skill.relatedSkills && skill.relatedSkills.length > 0 && (
                        <div className="text-sm">
                          <span className="text-xs font-medium text-theme-text-primary">Related:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {skill.relatedSkills.map((related, i) => (
                              <span 
                                key={i}
                                className="text-xs bg-theme-primary-main/5 text-theme-primary-main px-2 py-0.5 rounded-full"
                              >
                                {related}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {skill.keyProjects && skill.keyProjects.length > 0 && (
                        <div className="text-sm ml-auto">
                          <span className="text-xs font-medium text-theme-text-primary">Projects:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {skill.keyProjects.map((project, i) => (
                              <span 
                                key={i}
                                className="text-xs bg-theme-bg px-2 py-0.5 rounded-full text-theme-text-secondary"
                              >
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === 'chart' && (
            <div className="space-y-10" data-view-mode="chart">
              {/* Skill bars chart */}
              <div className="bg-theme-card-bg rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-theme-text-primary mb-6">
                  Skill Proficiency Chart
                </h3>
                <div className="space-y-4">
                  {filteredSkills.map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group"
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-sm"
                            style={{ backgroundColor: skill.color }}
                          ></div>
                          <span className="font-medium text-theme-text-primary">{skill.name}</span>
                        </div>
                        <span className="font-medium" style={{ color: skill.color }}>{skill.level}%</span>
                      </div>
                      <div className="h-7 w-full bg-theme-border rounded-md overflow-hidden flex items-center relative">
                        <motion.div 
                          className="h-full absolute top-0 left-0"
                          style={{ backgroundColor: skill.color, width: `${skill.level}%` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.05 }}
                          viewport={{ once: true }}
                        />
                        <span className="text-xs font-medium text-white drop-shadow-sm relative z-10 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills by Category */}
              <div className="grid md:grid-cols-3 gap-6">
                {Object.keys(categoryStats).filter(cat => cat !== 'all').map((category) => (
                  <motion.div
                    key={category}
                    variants={fadeInVariants}
                    className="bg-theme-card-bg rounded-lg p-4 shadow-sm border border-theme-border"
                    style={{
                      backgroundImage: `radial-gradient(circle at top right, ${
                        skills.find(s => s.category === category)?.color || '#6366F1'
                      }08, transparent 70%)`
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-theme-text-primary capitalize">{category}</h4>
                      <span className="text-sm bg-theme-primary-main/10 text-theme-primary-main px-2 py-0.5 rounded-full">
                        {categoryStats[category].count} skills
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-theme-text-secondary">Average Proficiency</div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-grow bg-theme-border rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-theme-primary-main"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${categoryStats[category].averageLevel}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-sm font-medium text-theme-primary-main">
                          {categoryStats[category].averageLevel}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-theme-text-secondary">
                      Top Skill: <span className="font-medium text-theme-text-primary">{categoryStats[category].topSkill}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Experience & Education Section */}
      <motion.div
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <motion.div variants={fadeInVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-theme-text-primary">
              Work <span className="text-theme-primary-main">Experience</span>
            </h2>
            <div className="space-y-8 relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-theme-border"></div>
              
              {experienceData.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-10 h-10 bg-theme-primary-main/10 rounded-full flex items-center justify-center z-10">
                    <div className="w-6 h-6 bg-theme-primary-main rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-bold text-xl text-theme-text-primary">{item.title}</h3>
                      <span className="text-sm font-medium bg-theme-primary-main/10 text-theme-primary-main px-3 py-1 rounded-full">
                        {item.period}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-theme-text-secondary mb-4">
                      <span>{item.organization}</span>
                      {item.location && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {item.location}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-theme-text-secondary">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={fadeInVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-theme-text-primary">
              <span className="text-theme-primary-main">Education</span> & Achievements
            </h2>
            
            {/* Education */}
            <div className="space-y-8 relative mb-16">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-theme-border"></div>
              
              {educationData.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-10 h-10 bg-theme-primary-main/10 rounded-full flex items-center justify-center z-10">
                    <div className="w-6 h-6 bg-theme-primary-main rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-bold text-xl text-theme-text-primary">{item.title}</h3>
                      <span className="text-sm font-medium bg-theme-primary-main/10 text-theme-primary-main px-3 py-1 rounded-full">
                        {item.period}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-theme-text-secondary mb-4">
                      <span>{item.organization}</span>
                      {item.location && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {item.location}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-theme-text-secondary">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Achievements Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-theme-text-primary">Awards & Certifications</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 bg-theme-card-bg p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="bg-theme-primary-main/10 p-2 rounded-full text-theme-primary-main">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-theme-text-primary">{achievement.title}</h4>
                      <p className="text-sm text-theme-text-secondary">{achievement.event} • {achievement.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Personal Interests */}
      <motion.div
        className="py-12 bg-theme-card-bg rounded-2xl p-8 shadow-sm"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-8 text-theme-text-primary"
        >
          Personal <span className="text-theme-primary-main">Interests</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          variants={containerVariants}
        >
          {interests.map((interest, index) => (
            <motion.div 
              key={index}
              variants={scaleVariants}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-theme-bg rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 min-h-[120px]"
            >
              <div className="text-4xl">{interest.icon}</div>
              <div className="font-medium text-theme-text-primary">{interest.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center py-16"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-3xl md:text-4xl font-bold mb-6 text-theme-text-primary"
        >
          Let's Work <span className="text-theme-primary-main">Together</span>
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-theme-text-secondary max-w-2xl mx-auto mb-8"
        >
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button asChild size="lg" className="px-8 py-3 text-lg">
            <Link to="/contact">
              Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
