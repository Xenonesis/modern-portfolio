import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'A full-stack e-commerce application with user authentication, product listings, shopping cart, and checkout functionality.',
    image: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    githubLink: 'https://github.com/example/ecommerce-platform',
    liveLink: 'https://ecommerce.example.com',
  },
  {
    id: 2,
    name: 'AI Chatbot Integration',
    description: 'Integrated a custom AI chatbot into a customer support portal, improving response times and user satisfaction.',
    image: 'https://images.pexels.com/photos/7375/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Python', 'Flask', 'React', 'OpenAI API'],
    githubLink: 'https://github.com/example/ai-chatbot',
  },
  {
    id: 3,
    name: 'Real-time Collaboration Tool',
    description: 'A web-based tool enabling real-time document collaboration with rich text editing and presence indicators.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Vue.js', 'Socket.IO', 'Node.js', 'PostgreSQL'],
    githubLink: 'https://github.com/example/collaboration-tool',
    liveLink: 'https://collab.example.com',
  },
  {
    id: 4,
    name: 'Mobile Recipe App',
    description: 'A cross-platform mobile application for discovering, saving, and organizing recipes with offline capabilities.',
    image: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React Native', 'Firebase', 'Redux'],
    githubLink: 'https://github.com/example/recipe-app',
  },
  {
    id: 5,
    name: 'Personal Portfolio V1',
    description: 'The first iteration of my personal portfolio, showcasing early projects and design explorations.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    githubLink: 'https://github.com/example/portfolio-v1',
    liveLink: 'https://old-portfolio.example.com',
  },
  {
    id: 6,
    name: 'Task Management API',
    description: 'A robust RESTful API for managing tasks, users, and projects, with authentication and authorization.',
    image: 'https://images.pexels.com/photos/5926390/pexels-photo-5926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    githubLink: 'https://github.com/example/task-api',
  },
];

const Projects: React.FC = () => {
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
    <section className="container py-16 md:py-24">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <Card className="h-full flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-theme-text-primary">{project.name}</CardTitle>
                <CardDescription className="text-theme-text-primary">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-theme-primary-main/10 text-theme-primary-main px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-4">
                <Button asChild variant="outline" className="border-theme-primary-main text-theme-primary-main hover:bg-theme-primary-main hover:text-theme-card-bg">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
                {project.liveLink && (
                  <Button asChild className="bg-theme-secondary-main hover:bg-theme-secondary-hover text-theme-card-bg">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
