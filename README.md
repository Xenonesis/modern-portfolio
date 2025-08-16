# Modern Portfolio Website

A beautiful, responsive, and modern portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases projects, skills, and services with a clean, professional design.

![Portfolio Screenshot](https://via.placeholder.com/800x400?text=Portfolio+Screenshot)

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between light and dark themes
- **Modern UI**: Clean and professional design using Tailwind CSS
- **TypeScript**: Type-safe development with TypeScript
- **Component-Based Architecture**: Modular React components
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Fast Performance**: Optimized with Vite for quick build times

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui design system

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

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Xenonesis/modern-portfolio.git
cd modern-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

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

## 📱 Responsive Design

The portfolio is fully responsive and includes:
- Mobile-first approach
- Breakpoints for all device sizes
- Touch-friendly navigation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
VITE_API_URL=your_api_url
VITE_GA_ID=your_google_analytics_id
```

### TypeScript

TypeScript configuration is in `tsconfig.json`. Adjust compiler options as needed.

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

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing UI library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Vite](https://vitejs.dev/) for fast development and build

## 📞 Contact

Created by [Your Name](https://your-website.com) - feel free to reach out!

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

---

Made with ❤️ using React and TypeScript
