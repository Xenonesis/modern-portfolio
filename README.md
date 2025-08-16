<div align="center">

# <img src="https://img.icons8.com/color/48/000000/react-native.png" width="40" height="40"/> Modern Portfolio Website

A beautiful, responsive, and modern portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases projects, skills, and services with a clean, professional design.

![Portfolio Screenshot](https://via.placeholder.com/1200x600?text=Modern+Portfolio+Website)

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

<p align="center">
  <a href="#features">✨ Features</a> •
  <a href="#tech-stack">🚀 Tech Stack</a> •
  <a href="#installation">🛠️ Installation</a> •
  <a href="#customization">🎨 Customization</a> •
  <a href="#deployment">🚀 Deployment</a>
</p>

</div>

---

## 🌟 Features

<div align="center">
  <table>
    <tr>
      <td width="50%" align="center">
        <h3>📱 Responsive Design</h3>
        <p>Fully responsive layout that works seamlessly on all devices</p>
      </td>
      <td width="50%" align="center">
        <h3>🌓 Dark/Light Mode</h3>
        <p>Toggle between beautiful light and dark themes</p>
      </td>
    </tr>
    <tr>
      <td width="50%" align="center">
        <h3>🎨 Modern UI</h3>
        <p>Clean and professional design using Tailwind CSS</p>
      </td>
      <td width="50%" align="center">
        <h3>⚡ Fast Performance</h3>
        <p>Optimized with Vite for lightning-fast build times</p>
      </td>
    </tr>
    <tr>
      <td width="50%" align="center">
        <h3>🔒 Type Safety</h3>
        <p>Type-safe development with TypeScript</p>
      </td>
      <td width="50%" align="center">
        <h3>🧩 Component-Based</h3>
        <p>Modular React components for easy maintenance</p>
      </td>
    </tr>
  </table>
</div>

---

## 🚀 Tech Stack

<div align="center">
  <table>
    <tr>
      <td colspan="2" align="center">
        <h3>Frontend</h3>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/react.png" width="24" height="24"/>
        <br>React 18
      </td>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/typescript.png" width="24" height="24"/>
        <br>TypeScript
      </td>
    </tr>
    <tr>
      <td colspan="2" align="center">
        <h3>Styling</h3>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/css3.png" width="24" height="24"/>
        <br>Tailwind CSS
      </td>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/post.png" width="24" height="24"/>
        <br>PostCSS
      </td>
    </tr>
    <tr>
      <td colspan="2" align="center">
        <h3>Build & Tools</h3>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/vite.png" width="24" height="24"/>
        <br>Vite
      </td>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/eslint.png" width="24" height="24"/>
        <br>ESLint
      </td>
    </tr>
  </table>
</div>

---

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/            # Base UI components
│   ├── skills/        # Skills section components
│   └── ...            # Other components
├── context/           # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── types/             # TypeScript type definitions
```

---

## 🛠️ Installation

<div align="center">
  <table>
    <tr>
      <td width="50%" align="left">
        <h3>1. Clone the repository</h3>
        <pre><code>git clone https://github.com/Xenonesis/modern-portfolio.git
cd modern-portfolio</code></pre>
      </td>
      <td width="50%" align="left">
        <h3>2. Install dependencies</h3>
        <pre><code>npm install</code></pre>
      </td>
    </tr>
    <tr>
      <td width="50%" align="left">
        <h3>3. Start development server</h3>
        <pre><code>npm run dev</code></pre>
      </td>
      <td width="50%" align="left">
        <h3>4. Open in browser</h3>
        <pre><code>http://localhost:5173</code></pre>
      </td>
    </tr>
  </table>
</div>

---

## 📝 Scripts

<div align="center">
  <table>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>npm run dev</code></td>
      <td>Start development server</td>
    </tr>
    <tr>
      <td><code>npm run build</code></td>
      <td>Build for production</td>
    </tr>
    <tr>
      <td><code>npm run preview</code></td>
      <td>Preview production build</td>
    </tr>
    <tr>
      <td><code>npm run lint</code></td>
      <td>Run ESLint</td>
    </tr>
    <tr>
      <td><code>npm run type-check</code></td>
      <td>Run TypeScript type checking</td>
    </tr>
  </table>
</div>

---

## 🎨 Customization

### Theme

The portfolio supports both light and dark themes. You can customize the theme colors in `tailwind.config.js`.

### Content

Update the content in the respective component files:
- `src/components/Header.tsx` - Navigation and header content
- `src/components/About.tsx` - About section
- `src/components/Projects.tsx` - Projects showcase
- `src/components/Services.tsx` - Services offered
- `src/components/Contact.tsx` - Contact information

### Styling

Modify the styles in:
- `src/index.css` - Global styles
- Individual component files for component-specific styles

---

## 📱 Responsive Design

The portfolio is fully responsive and includes:
- Mobile-first approach
- Breakpoints for all device sizes
- Touch-friendly navigation

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
VITE_API_URL=your_api_url
VITE_GA_ID=your_google_analytics_id
```

### TypeScript

TypeScript configuration is in `tsconfig.json`. Adjust compiler options as needed.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms

The build output is in the `dist` folder. You can deploy this to any static hosting service.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://reactjs.org/" target="_blank">
          <img src="https://img.icons8.com/color/48/000000/react.png" width="48" height="48"/>
          <br>React
        </a>
      </td>
      <td align="center">
        <a href="https://tailwindcss.com/" target="_blank">
          <img src="https://img.icons8.com/color/48/000000/css3.png" width="48" height="48"/>
          <br>Tailwind CSS
        </a>
      </td>
      <td align="center">
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="https://img.icons8.com/color/48/000000/typescript.png" width="48" height="48"/>
          <br>TypeScript
        </a>
      </td>
      <td align="center">
        <a href="https://vitejs.dev/" target="_blank">
          <img src="https://img.icons8.com/color/48/000000/vite.png" width="48" height="48"/>
          <br>Vite
        </a>
      </td>
    </tr>
  </table>
</div>

---

## 📞 Contact

Created by [Your Name](https://your-website.com) - feel free to reach out!

<div align="center">
  <a href="https://twitter.com/yourusername" target="_blank">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter">
  </a>
  <a href="https://linkedin.com/in/yourusername" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="mailto:your.email@example.com" target="_blank">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</div>

---

<div align="center">
  <p>Made with ❤️ using React and TypeScript</p>
  <p>
    <a href="#top">
      <img src="https://img.icons8.com/color/48/000000/circled-up.png" width="24" height="24"/>
      Back to top
    </a>
  </p>
</div>
