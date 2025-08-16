import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Bookmark, 
  Copy, 
  MessageCircle, 
  ChevronLeft,
  ChevronRight,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Dummy blog post data (in a real app, this would come from an API or CMS)
const dummyBlogPosts = [
  {
    slug: 'future-of-web-development',
    title: 'The Future of Web Development: A Look Ahead',
    author: 'John Doe',
    date: 'October 26, 2023',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    readTime: '6 min read',
    tags: ['Web Development', 'Technology', 'Future Trends'],
    content: `
      <p>The landscape of web development is constantly evolving, with new technologies and paradigms emerging at a rapid pace. Staying ahead requires continuous learning and an eye on the horizon. In this post, we'll explore some of the most exciting trends that are set to redefine how we build for the web.</p>
      
      <h2>WebAssembly (Wasm)</h2>
      <p>WebAssembly is no longer just a buzzword; it's becoming a fundamental part of high-performance web applications. By allowing code written in languages like C++, Rust, and Go to run in the browser at near-native speeds, Wasm opens up new possibilities for complex applications, games, and even desktop-like experiences directly in the browser.</p>
      <p>Imagine running computationally intensive tasks, video editing software, or CAD tools directly in your browser without plugins. That's the promise of WebAssembly, and it's already being delivered by major players like Figma and Google Earth.</p>

      <h2>AI and Machine Learning in Development</h2>
      <p>Artificial intelligence is not just for data scientists anymore. AI-powered tools are increasingly assisting developers with code generation, bug detection, and even automated testing. Tools like GitHub Copilot are just the beginning, promising to significantly boost developer productivity and reduce repetitive tasks.</p>
      <p>Furthermore, integrating AI/ML models directly into web applications is becoming more accessible, enabling features like personalized content recommendations, intelligent search, and real-time data analysis directly on the client-side or via serverless functions.</p>

      <h2>Serverless Architectures</h2>
      <p>Serverless computing continues its ascent, abstracting away server management and allowing developers to focus purely on writing code. Services like AWS Lambda, Google Cloud Functions, and Azure Functions enable highly scalable and cost-effective backend solutions, ideal for microservices and event-driven architectures.</p>
      <p>This shift not only simplifies deployment and scaling but also encourages a more modular approach to application design, leading to more resilient and maintainable systems.</p>

      <h2>Edge Computing</h2>
      <p>As applications become more distributed and real-time, edge computing is gaining traction. By processing data closer to the user (at the "edge" of the network), latency is reduced, and performance is enhanced. This is particularly crucial for IoT devices, real-time analytics, and applications requiring instant responses.</p>
      <p>Content Delivery Networks (CDNs) are evolving into powerful edge platforms, offering compute capabilities that bring backend logic closer to the end-user, further blurring the lines between client and server.</p>

      <h2>Conclusion</h2>
      <p>The future of web development is exciting and dynamic. Embracing these trends—WebAssembly, AI integration, serverless, and edge computing—will be key for developers looking to build the next generation of innovative and performant web applications. The journey is continuous, and the possibilities are endless.</p>
    `,
  },
  {
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks: Tips and Tricks',
    author: 'Jane Smith',
    date: 'September 15, 2023',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    readTime: '8 min read',
    tags: ['React', 'JavaScript', 'Web Development'],
    content: `
      <p>React Hooks revolutionized how we write React components, bringing state and side effects to functional components. While basic usage is straightforward, mastering them involves understanding subtle nuances and advanced patterns.</p>

      <h2>Understanding the Rules of Hooks</h2>
      <p>Before diving into advanced usage, it's crucial to remember the two golden rules:</p>
      <ol>
        <li><strong>Only call Hooks at the top level:</strong> Don't call Hooks inside loops, conditions, or nested functions.</li>
        <li><strong>Only call Hooks from React functions:</strong> Call them from React functional components or from custom Hooks.</li>
      </ol>
      <p>These rules ensure that Hooks are called in the same order on every render, allowing React to correctly preserve the state of Hooks between multiple <code>useState</code> and <code>useEffect</code> calls.</p>

      <h2>Custom Hooks for Reusability</h2>
      <p>One of the most powerful features of Hooks is the ability to create custom Hooks. A custom Hook is a JavaScript function whose name starts with "use" and that may call other Hooks. They allow you to extract component logic into reusable functions.</p>
      <pre><code>import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}</code></pre>
      <p>This <code>useWindowWidth</code> Hook can now be used in any component to get the current window width, abstracting away the event listener logic.</p>

      <h2>Optimizing Performance with <code>useMemo</code> and <code>useCallback</code></h2>
      <p><code>useMemo</code> and <code>useCallback</code> are Hooks that help optimize performance by memoizing values and functions, preventing unnecessary re-renders of child components.</p>
      <ul>
        <li><code>useMemo</code>: Memoizes a value. It only recomputes the memoized value when one of the dependencies has changed.</li>
        <li><code>useCallback</code>: Memoizes a function. It returns a memoized version of the callback that only changes if one of the dependencies has changed. This is particularly useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.</li>
      </ul>
      <p>While powerful, use these Hooks judiciously. Overuse can sometimes lead to more overhead than benefit. Profile your application to identify performance bottlenecks before applying these optimizations.</p>

      <h2>Conclusion</h2>
      <p>React Hooks provide a flexible and powerful way to manage state and side effects in functional components. By understanding their rules, leveraging custom Hooks for reusability, and applying memoization techniques wisely, you can write cleaner, more performant, and more maintainable React applications.</p>
    `,
  },
  {
    slug: 'demystifying-css-grid',
    title: 'Demystifying CSS Grid: A Comprehensive Guide',
    author: 'Alice Wonderland',
    date: 'August 01, 2023',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    readTime: '7 min read',
    tags: ['CSS', 'Web Design', 'Layout'],
    content: `
      <p>CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay out content in rows and columns, making it incredibly powerful for designing complex, responsive web pages. If you've struggled with traditional CSS layouts, Grid is here to make your life easier.</p>

      <h2>Basic Concepts: Grid Container and Grid Items</h2>
      <p>To start using CSS Grid, you define a <strong>grid container</strong> by setting <code>display: grid;</code> on an element. Its direct children then become <strong>grid items</strong>.</p>
      <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
  grid-template-rows: auto auto; /* Two rows, height determined by content */
  gap: 20px; /* Spacing between grid items */
}</code></pre>
      <p>The <code>grid-template-columns</code> and <code>grid-template-rows</code> properties define the structure of your grid. The <code>fr</code> unit (fractional unit) is particularly useful as it distributes available space proportionally.</p>

      <h2>Placing Items on the Grid</h2>
      <p>Once your grid is defined, you can place items explicitly using line numbers or named grid areas.</p>
      <pre><code>.item-a {
  grid-column: 1 / 3; /* Spans from column line 1 to 3 */
  grid-row: 1;
}

.item-b {
  grid-area: header; /* If you've defined named areas */
}</code></pre>
      <p>Named grid areas, defined with <code>grid-template-areas</code>, offer a more visual way to structure your layout, especially for complex designs.</p>

      <h2>Responsiveness with Grid</h2>
      <p>CSS Grid shines when it comes to responsiveness. Media queries can easily redefine grid templates for different screen sizes.</p>
      <pre><code>.container {
  grid-template-columns: 1fr; /* Single column on small screens */
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr; /* Two columns on medium screens */
  }
}</code></pre>
      <p>Additionally, functions like <code>repeat()</code>, <code>minmax()</code>, and properties like <code>grid-auto-flow</code> provide powerful tools for creating flexible and dynamic grids that adapt automatically.</p>

      <h2>Conclusion</h2>
      <p>CSS Grid is a game-changer for web layout. Its two-dimensional capabilities, combined with powerful placement and responsiveness features, make it an indispensable tool for modern web development. Start experimenting with it, and you'll quickly discover its immense potential.</p>
    `,
  },
  {
    slug: 'building-restful-apis',
    title: 'Building RESTful APIs with Node.js and Express',
    author: 'Bob Builder',
    date: 'July 10, 2023',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    readTime: '9 min read',
    tags: ['Node.js', 'API', 'Backend', 'Express'],
    content: `
      <p>Building robust and scalable RESTful APIs is a core skill for any modern web developer. Node.js, combined with the Express.js framework, provides a fast and efficient way to create these APIs. This guide will walk you through the essentials.</p>

      <h2>What is a RESTful API?</h2>
      <p>REST (Representational State Transfer) is an architectural style for distributed hypermedia systems. A RESTful API adheres to a set of principles:</p>
      <ul>
        <li><strong>Client-Server:</strong> Separation of concerns.</li>
        <li><strong>Stateless:</strong> Each request from client to server must contain all the information needed to understand the request.</li>
        <li><strong>Cacheable:</strong> Responses must explicitly or implicitly define themselves as cacheable or non-cacheable.</li>
        <li><strong>Layered System:</strong> A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary.</li>
        <li><strong>Uniform Interface:</strong> Simplifies and decouples the architecture. This includes resource identification, resource manipulation through representations, self-descriptive messages, and HATEOAS (Hypermedia as the Engine of Application State).</li>
      </ul>
      <p>Common HTTP methods (GET, POST, PUT, DELETE) are used to perform CRUD (Create, Read, Update, Delete) operations on resources.</p>

      <h2>Setting up Your Node.js and Express Project</h2>
      <p>First, initialize your project and install Express:</p>
      <pre><code>mkdir my-api
cd my-api
npm init -y
npm install express mongoose dotenv</code></pre>
      <p>Then, create your main application file (e.g., <code>app.js</code>):</p>
      <pre><code>const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(&#96;Server running on port &#36;{PORT}&#96;);
});</code></pre>

      <h2>Defining Routes and Controllers</h2>
      <p>For a RESTful API, you'll typically define routes for each resource (e.g., <code>/api/products</code>, <code>/api/users</code>) and use controllers to handle the business logic.</p>
      <pre><code>// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming you have a Mongoose model

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;</code></pre>
      <p>Then, in your <code>app.js</code>, use these routes:</p>
      <pre><code>// ... (previous code)
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
// ... (rest of the code)</code></pre>

      <h2>Conclusion</h2>
      <p>Node.js and Express provide a powerful and flexible foundation for building RESTful APIs. By following REST principles and structuring your application with clear routes and controllers, you can create efficient, scalable, and maintainable backend services for your web applications.</p>
    `,
  },
  {
    slug: 'intro-to-typescript',
    title: 'Introduction to TypeScript for JavaScript Developers',
    author: 'Charlie Coder',
    date: 'June 20, 2023',
    image: 'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: `
      <p>TypeScript is a superset of JavaScript that adds static typing to the language. This means you can define the types of variables, function parameters, and return values, allowing for better code organization, readability, and error detection during development, rather than at runtime.</p>

      <h2>Why TypeScript?</h2>
      <p>JavaScript is dynamically typed, which offers flexibility but can lead to subtle bugs that are only discovered when the code runs. TypeScript addresses this by catching type-related errors during compilation. Benefits include:</p>
      <ul>
        <li><strong>Early Error Detection:</strong> Catch bugs before they reach production.</li>
        <li><strong>Improved Readability:</strong> Code becomes self-documenting with explicit types.</li>
        <li><strong>Better Tooling:</strong> Enhanced autocompletion, refactoring, and navigation in IDEs.</li>
        <li><strong>Scalability:</strong> Easier to manage large codebases and collaborate in teams.</li>
      </ul>

      <h2>Basic Types in TypeScript</h2>
      <p>TypeScript supports all standard JavaScript types and adds a few of its own:</p>
      <pre><code>// Basic types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";

// Arrays
let list: number[] = [1, 2, 3];
let anotherList: Array<number> = [1, 2, 3];

// Tuples (fixed number of elements of known types)
let x: [string, number];
x = ["hello", 10];

// Enums
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any (opt-out of type checking)
let notSure: any = 4;
notSure = "maybe a string instead";

// Void (for functions that don't return a value)
function warnUser(): void {
  console.log(&#96;This is my warning message&#96;);
}</code></pre>

      <h2>Interfaces and Type Aliases</h2>
      <p>Interfaces and type aliases are powerful ways to define custom types for objects and functions, promoting consistency and reusability.</p>
      <pre><code>// Interface for an object
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

function printUser(user: User) {
  console.log(&#96;ID: &#36;{user.id}, Name: &#36;{user.name}&#96;);
}

let newUser: User = { id: 1, name: "John Doe" };
printUser(newUser);

// Type alias for a union type
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 123;</code></pre>

      <h2>Compiling TypeScript</h2>
      <p>TypeScript code needs to be compiled into plain JavaScript to run in browsers or Node.js environments. You typically use the TypeScript compiler (<code>tsc</code>).</p>
      <pre><code># Install TypeScript globally
npm install -g typescript

# Compile a TypeScript file
tsc my-file.ts

# Initialize a tsconfig.json for a project
tsc --init</code></pre>
      <p>The <code>tsconfig.json</code> file allows you to configure compiler options for your entire project.</p>

      <h2>Conclusion</h2>
      <p>TypeScript offers significant advantages for building robust and maintainable JavaScript applications, especially as projects grow in complexity. By embracing static typing, you can catch errors earlier, improve code quality, and enhance the developer experience. It's a valuable addition to any modern web developer's toolkit.</p>
    `,
  },
  {
    slug: 'optimizing-web-performance',
    title: 'Optimizing Web Performance: A Practical Checklist',
    author: 'Diana Dev',
    date: 'May 05, 2023',
    image: 'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: `
      <p>Web performance is crucial for user experience, SEO, and conversion rates. A slow website can frustrate users and lead to higher bounce rates. This checklist provides practical steps to optimize your web application's performance.</p>

      <h2>1. Optimize Images</h2>
      <p>Images often account for a significant portion of page weight. Ensure your images are optimized:</p>
      <ul>
        <li><strong>Compress Images:</strong> Use tools like TinyPNG or ImageOptim, or integrate compression into your build process.</li>
        <li><strong>Choose Correct Format:</strong> Use WebP for modern browsers, JPEG for photos, and PNG for graphics with transparency.</li>
        <li><strong>Responsive Images:</strong> Use <code>srcset</code> and <code>sizes</code> attributes to serve different image sizes based on the user's device.</li>
        <li><strong>Lazy Loading:</strong> Defer loading offscreen images until they are needed using the <code>loading="lazy"</code> attribute or JavaScript.</li>
      </ul>

      <h2>2. Minify CSS and JavaScript</h2>
      <p>Minification removes unnecessary characters (whitespace, comments) from your code without changing its functionality, reducing file size.</p>
      <pre><code>// Before minification
function add(a, b) {
  // This adds two numbers
  return a + b;
}

// After minification
function add(a,b){return a+b}</code></pre>
      <p>Most modern build tools (Webpack, Rollup, Vite) include minification capabilities out of the box.</p>

      <h2>3. Leverage Browser Caching</h2>
      <p>Caching stores frequently accessed resources (images, CSS, JS) on the user's browser, so they don't have to be re-downloaded on subsequent visits. Configure HTTP caching headers (<code>Cache-Control</code>, <code>Expires</code>) on your server.</p>

      <h2>4. Reduce Render-Blocking Resources</h2>
      <p>CSS and JavaScript files can block the browser from rendering content until they are downloaded and parsed. To mitigate this:</p>
      <ul>
        <li><strong>Inline Critical CSS:</strong> Embed essential CSS directly in the HTML for the above-the-fold content.</li>
        <li><strong>Defer Non-Critical CSS/JS:</b> Use <code><link rel="preload"></code>, <code>async</code>, or <code>defer</code> attributes for scripts.</li>
      </ul>

      <h2>5. Optimize Font Loading</h2>
      <p>Web fonts can be large and cause FOUT (Flash of Unstyled Text) or FOIT (Flash of Invisible Text). Use <code>font-display: swap;</code> in your <code>@font-face</code> rules and preload critical fonts.</p>

      <h2>6. Use a Content Delivery Network (CDN)</h2>
      <p>CDNs distribute your static assets across multiple servers globally. When a user requests your site, assets are served from the server geographically closest to them, reducing latency.</p>

      <h2>7. Server-Side Rendering (SSR) or Static Site Generation (SSG)</h2>
      <p>For content-heavy sites, SSR or SSG can significantly improve initial load times and SEO by delivering fully rendered HTML to the browser, rather than relying on client-side JavaScript to build the page.</p>

      <h2>Conclusion</h2>
      <p>Web performance optimization is an ongoing process. Regularly audit your site using tools like Lighthouse, PageSpeed Insights, and WebPageTest to identify bottlenecks and continuously improve your user's experience. A fast website is a happy website!</p>
    `,
  },
];

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<(typeof dummyBlogPosts)[0] | null>(null);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentReadingPosition, setCurrentReadingPosition] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  // Find the current post and also get the next and previous posts
  useEffect(() => {
    const currentPostIndex = dummyBlogPosts.findIndex(post => post.slug === slug);
    
    if (currentPostIndex !== -1) {
      setPost(dummyBlogPosts[currentPostIndex]);
    } else {
      navigate('/blog', { replace: true });
    }
  }, [slug, navigate]);

  // Handle scroll position to show reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (document.getElementById('blog-content')) {
        const contentElement = document.getElementById('blog-content');
        const totalHeight = contentElement!.scrollHeight - contentElement!.clientHeight;
        const scrollPosition = window.scrollY - contentElement!.offsetTop;
        const readingPosition = (scrollPosition / totalHeight) * 100;
        setCurrentReadingPosition(Math.min(100, Math.max(0, readingPosition)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    setIsShareMenuOpen(false);
  };

  // Find adjacent blog posts for navigation
  const currentPostIndex = dummyBlogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentPostIndex > 0 ? dummyBlogPosts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < dummyBlogPosts.length - 1 ? dummyBlogPosts[currentPostIndex + 1] : null;

  if (!post) return null;

  return (
    <div className="bg-theme-bg min-h-screen py-8 md:py-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Reading progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-theme-border z-50">
          <motion.div 
            className="h-full bg-theme-primary-main"
            initial={{ width: "0%" }}
            animate={{ width: `${currentReadingPosition}%` }}
            transition={{ type: "tween" }}
          />
        </div>

        {/* Back to Blog button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild>
            <Link to="/blog" className="flex items-center gap-2 text-theme-text-secondary hover:text-theme-primary-main">
              <ArrowLeft size={18} />
              <span>Back to all articles</span>
            </Link>
          </Button>
        </motion.div>

        {/* Featured image */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {post.tags && post.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-theme-primary-main/10 text-theme-primary-main text-xs py-1 px-3 rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Post title */}
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {post.title}
        </motion.h1>

        {/* Post meta info */}
        <motion.div 
          className="flex flex-wrap items-center gap-4 text-theme-text-secondary text-sm mb-8 pb-6 border-b border-theme-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="ml-auto flex gap-3">
            <div className="relative">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </Button>
              
              {/* Share popup */}
              {isShareMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-theme-card-bg border border-theme-border shadow-lg rounded-md p-2 z-10"
                >
                  <div className="flex flex-col gap-2 min-w-[150px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2 justify-start"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                    >
                      <Facebook size={16} className="text-blue-600" />
                      <span>Facebook</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2 justify-start"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
                    >
                      <Twitter size={16} className="text-sky-500" />
                      <span>Twitter</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2 justify-start"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                    >
                      <Linkedin size={16} className="text-blue-700" />
                      <span>LinkedIn</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2 justify-start"
                      onClick={handleCopyLink}
                    >
                      <Copy size={16} />
                      <span>{copySuccess ? "Copied!" : "Copy link"}</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            <Button 
              variant={bookmarked ? "default" : "outline"}
              size="sm"
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 ${bookmarked ? 'bg-theme-primary-main text-white' : ''}`}
            >
              <Bookmark size={16} className={bookmarked ? 'fill-current' : ''} />
              <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Save'}</span>
            </Button>

            <Button 
              variant={liked ? "default" : "outline"}
              size="sm"
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 ${liked ? 'bg-theme-primary-main text-white' : ''}`}
            >
              <ThumbsUp size={16} className={liked ? 'fill-current' : ''} />
              <span className="hidden sm:inline">{liked ? 'Liked' : 'Like'}</span>
            </Button>
          </div>
        </motion.div>

        {/* Blog content */}
        <motion.div 
          id="blog-content"
          className="prose prose-lg max-w-none prose-theme dark:prose-invert mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-12 p-6 rounded-lg bg-theme-card-bg border border-theme-border"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-theme-primary-main/20 flex items-center justify-center text-theme-primary-main">
              <User size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-theme-text-primary">About {post.author}</h3>
              <p className="text-theme-text-secondary text-sm">
                {post.author} is a passionate writer and developer who specializes in frontend technologies and UI/UX design.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comments section placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle size={20} className="text-theme-primary-main" />
            <h3 className="text-xl font-bold text-theme-text-primary">Comments</h3>
          </div>
          <div className="bg-theme-card-bg border border-theme-border rounded-lg p-6 text-center text-theme-text-secondary">
            <p>Comments are currently disabled for this article.</p>
          </div>
        </motion.div>

        {/* Next/Previous post navigation */}
        <div className="border-t border-theme-border pt-8 mt-8">
          <h3 className="text-lg font-bold text-theme-text-primary mb-6 flex items-center">
            <span className="h-6 w-1 bg-theme-primary-main mr-3 rounded-full"></span>
            Continue Reading
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && (
              <Link to={`/blog/${prevPost.slug}`} className="group">
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-theme-text-secondary mb-2">
                      <ChevronLeft size={16} />
                      <span>Previous Article</span>
                    </div>
                    <h4 className="font-bold text-theme-text-primary group-hover:text-theme-primary-main transition-colors">
                      {prevPost.title}
                    </h4>
                  </div>
                </Card>
              </Link>
            )}
            
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="group">
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-end gap-2 text-sm text-theme-text-secondary mb-2">
                      <span>Next Article</span>
                      <ChevronRight size={16} />
                    </div>
                    <h4 className="font-bold text-theme-text-primary group-hover:text-theme-primary-main transition-colors text-right">
                      {nextPost.title}
                    </h4>
                  </div>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
