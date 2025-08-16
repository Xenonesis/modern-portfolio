import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Search, Tag, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  tags: string[];
  readTime?: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks: A Deep Dive',
    summary: 'Explore advanced patterns and best practices for using React Hooks to build scalable and maintainable applications.',
    date: '2023-10-26',
    image: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Hooks', 'Frontend', 'JavaScript'],
    readTime: '8 min read',
    featured: true
  },
  {
    slug: 'demystifying-microservices',
    title: 'Demystifying Microservices: A Practical Guide',
    summary: 'Understand the core concepts of microservices architecture and learn how to design and implement them effectively.',
    date: '2023-09-15',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Backend', 'Architecture', 'Cloud', 'DevOps'],
    readTime: '12 min read',
    featured: true
  },
  {
    slug: 'css-in-js-vs-tailwind',
    title: 'CSS-in-JS vs. Tailwind CSS: Which to Choose?',
    summary: 'A comprehensive comparison of two popular styling approaches for modern web development, helping you decide the best fit for your project.',
    date: '2023-08-01',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['CSS', 'Tailwind', 'Styling', 'Frontend'],
    readTime: '10 min read'
  },
  {
    slug: 'optimizing-database-performance',
    title: 'Optimizing Database Performance for Scale',
    summary: 'Tips and tricks for improving database query performance, indexing strategies, and scaling your data layer.',
    date: '2023-07-10',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Database', 'SQL', 'NoSQL', 'Performance'],
    readTime: '15 min read'
  },
  {
    slug: 'getting-started-with-typescript',
    title: 'Getting Started with TypeScript in 2023',
    summary: 'A beginner-friendly guide to setting up TypeScript in your projects and leveraging its powerful features for type safety.',
    date: '2023-06-20',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    readTime: '7 min read'
  },
  {
    slug: 'react-18-new-features',
    title: 'React 18: What\'s New and Exciting',
    summary: 'Explore the latest features in React 18 including concurrent rendering, automatic batching, and the new transition API.',
    date: '2023-05-15',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    readTime: '9 min read'
  },
  {
    slug: 'accessibility-best-practices',
    title: 'Web Accessibility: Best Practices for Inclusive Design',
    summary: 'Learn how to create websites that are accessible to everyone, including users with disabilities.',
    date: '2023-04-05',
    image: 'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Accessibility', 'UX', 'HTML', 'Design'],
    readTime: '11 min read'
  }
];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(blogPosts);

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter posts based on search term and selected tag
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
    
    setDisplayedPosts(filtered);
  }, [searchTerm, selectedTag]);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
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
              Blog & Articles
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-theme-primary-main"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.7 }}
              />
            </span>
          </h1>
          <p className="text-lg text-theme-text-secondary mb-8">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>

          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-secondary" size={18} />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-theme-card-bg border-theme-border"
              />
            </div>
          </div>

          {/* Tags filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={!selectedTag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="rounded-full text-sm"
            >
              All
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="rounded-full text-sm flex items-center gap-1"
              >
                <Tag size={14} /> {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured posts section */}
        {!searchTerm && !selectedTag && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-theme-text-primary mb-6 flex items-center">
              <span className="h-6 w-1 bg-theme-primary-main mr-3 rounded-full"></span>
              Featured Articles
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts.filter(post => post.featured).map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <Card className="overflow-hidden h-full border border-theme-border bg-theme-card-bg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                          <div className="flex gap-2 mb-2">
                            {post.tags.slice(0, 2).map((tag, i) => (
                              <span 
                                key={i}
                                className="bg-theme-primary-main/90 text-white text-xs py-1 px-2 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-white">{post.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-theme-text-secondary mb-4 line-clamp-3">{post.summary}</p>
                        <div className="flex justify-between items-center text-sm text-theme-text-secondary">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} /> 
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} /> 
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Display search results count if filtering */}
        {(searchTerm || selectedTag) && (
          <div className="mb-6 text-center">
            <p className="text-theme-text-secondary">
              {displayedPosts.length} {displayedPosts.length === 1 ? 'article' : 'articles'} found
              {selectedTag ? ` for tag "${selectedTag}"` : ''}
              {searchTerm ? ` matching "${searchTerm}"` : ''}
            </p>
          </div>
        )}

        {/* All blog posts / search results */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTag}-${searchTerm}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <Card className="overflow-hidden h-full border border-theme-border hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-theme-card-bg/80 backdrop-blur-sm text-theme-text-primary text-xs py-1 px-2 rounded-md flex items-center gap-1">
                            <Clock size={12} /> 
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex gap-2 flex-wrap mb-2">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span 
                              key={i}
                              className="bg-theme-primary-main/10 text-theme-primary-main text-xs py-1 px-2 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-bold text-theme-text-primary mb-2 group-hover:text-theme-primary-main transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-theme-text-secondary mb-3 line-clamp-2">
                          {post.summary}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-theme-text-secondary border-t border-theme-border/40 mt-auto">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} /> 
                          {post.date}
                        </div>
                        <span className="text-theme-primary-main flex items-center group-hover:translate-x-1 transition-transform duration-300">
                          Read more <ArrowRight size={12} className="ml-1" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center p-12"
              >
                <div className="text-theme-text-secondary">
                  <Search size={48} className="mx-auto mb-4 opacity-30" />
                  <h3 className="text-xl font-bold mb-2">No articles found</h3>
                  <p>Try adjusting your search or filter to find what you're looking for.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTag(null);
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Newsletter signup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="mt-20 bg-theme-card-bg border border-theme-border rounded-xl p-8 shadow-lg relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-theme-primary-main" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-theme-text-primary mb-4">
              Subscribe to My Newsletter
            </h2>
            <p className="text-theme-text-secondary mb-6">
              Get notified when I publish new articles and receive exclusive content straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-theme-bg border-theme-border" 
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Blog;
