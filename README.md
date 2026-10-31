# 🎨 Laalitha Niroshan's Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

✨ A modern, responsive portfolio website showcasing my work and skills ✨

</div>

## 🚀 Features

- 🎯 Modern UI with glassmorphism elements
- 🌓 Dark/light theme mode
- 📱 Responsive design for all screen sizes
- ✨ Animated sections using Framer Motion
- 🖼️ Graduation confirmation image viewer with full-screen and zoom controls
- 📄 Custom CIRS research PDF viewer with full-screen and zoom controls
- 📖 Animated page navigation for the CIRS 2026 publication
- 🧭 Direct link to the Chrome Web Store extension

> Viewers hide download controls and discourage context-menu saving. Public images and the CIRS PDF still need to reach a visitor's browser to be displayed, so a static portfolio cannot technically prevent a determined visitor from saving them.
- 📊 Interactive skill bars and project filtering
- 🔍 SEO optimized
- ⚡ Fast loading and optimized performance
- 🌐 Cross-browser compatibility

## 🚀 Featured Projects

| Project | Description | Tech Stack |
|---------|-------------|------------|
| 📱 After Sales Service App | CRM & complaint tracker for George Stuart Ltd | Flutter + Firebase |
| 🌐 Volunteer Web Platform | Event site for volunteers | HTML, CSS, JS, PHP, SQL |
| 📊 Tuition Class Manager | Student + payment system | Flutter + Firebase |
| 📚 Chapter One Bookstore | Online bookstore | MERN Stack |
| 🚆 Real-Time Railway Tracker | Live train UI | Figma |
| 🚗 Veloce Motors | Car dealership UX | Figma |
| 🐶 Pet Care Platform | Pet health record system | HTML, CSS, JS |

## 🛠️ Tech Stack

- ⚛️ **Frontend**: React, TypeScript, TailwindCSS, Flutter
- 🎨 **Design**: Figma, UI/UX Design
- 🔥 **Backend**: Firebase, Node.js, Express.js
- 🗄️ **Database**: MongoDB, SQL
- 🛠️ **Tools**: Git, VS Code, Android Studio
- 📱 **Mobile**: Flutter, Android Development
- 🎭 **Animation**: Framer Motion
- 🎯 **Testing**: Selenium WebDriver

## 📚 Certifications

- 🐍 Python for Beginners – DP Education
- 📱 Android Studio – Simplilearn
- 🎨 UI/UX for Beginners – Great Learning
- 📊 Machine Learning using Python – Great Learning
- 💽 Database Management – Great Learning

## 🧠 Roles & Leadership

- 🖊️ Editor – TechStrike Club, CINEC (2024–Present)
- 🎨 Head of Graphic Design – TechStrike Club (2023–2024)
- 🙌 Volunteer – CINEC Expo 2023

## 📁 Project Structure

```
portfolio/
├── 📂 public/              # Static assets
├── 📂 src/
│   ├── 📂 components/      # Reusable components
│   ├── 📂 sections/        # Page sections
│   ├── 📂 styles/         # Global styles
│   ├── 📂 utils/          # Utility functions
│   ├── 📄 App.tsx         # Main App component
│   └── 📄 main.tsx        # Entry point
├── 📄 tailwind.config.js  # Tailwind configuration
├── 📄 tsconfig.json       # TypeScript configuration
└── 📄 package.json        # Project dependencies
```

## 📑 Sections

1. 🎯 **Hero Section** - Introduction with animated text and a profile image
2. 👤 **About Section** - Information about the developer and the services offered
3. 🎓 **Graduation Confirmation** - In-page, view-only confirmation document viewer
4. 📚 **Research & Publications** - CIRS 2026 paper viewer and Chrome Web Store link
5. 💪 **Skills Section** - Skills with percentage bars and tool icons
6. 🚀 **Projects Section** - Filterable portfolio projects with links
7. 🎨 **Designs Section** - Selected visual work
8. 📬 **Contact Section** - Contact form and contact information

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- 📦 Node.js (v14.0.0 or higher)
- 📦 npm (v6.0.0 or higher)
- 🔧 Git

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LaalithaNiroshan01/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` 🎉

### Production

Build for production:
```bash
npm run build
```
The build files will be in the `dist` directory 📦

Preview production build:
```bash
npm run preview
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables (if needed):
```env
VITE_EMAIL_SERVICE_ID=your_service_id
VITE_EMAIL_TEMPLATE_ID=your_template_id
VITE_EMAIL_PUBLIC_KEY=your_public_key
```

## 🎨 Customization

You can customize the portfolio by editing:

- 🎨 Colors and theme in `tailwind.config.js`
- 📂 Project information in `src/sections/ProjectsSection.tsx`
- 💪 Skills and tools in `src/sections/SkillsSection.tsx`
- 📬 Contact information in `src/sections/ContactSection.tsx` and `src/components/Footer.tsx`
- 👤 Profile information in `src/data/profile.ts`
- ✨ Animations in `src/utils/animations.ts`

### 🎯 Theme Customization
- 🎨 Modify the color scheme in `tailwind.config.js`
- 💫 Update the glassmorphism effects in `src/styles/globals.css`
- ⚡ Adjust animation timings in Framer Motion components

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

## ⚡ Performance Optimization

- 🖼️ Images are optimized using modern formats
- 📦 Code splitting for better load times
- 🚀 Lazy loading for images and components
- 📝 Minified production builds
- 💾 Efficient caching strategies

## 🌐 Browser Support

- 🌐 Chrome (latest)
- 🦊 Firefox (latest)
- 🍎 Safari (latest)
- 🌍 Edge (latest)
- 🎭 Opera (latest)

## 📄 License

MIT License - feel free to use this template for your own portfolio! 🎉

## 👩‍💻 Created By

**Laalitha Niroshan** - Software Engineering Graduate @ CINEC Campus, Sri Lanka
- 💡 UI/UX Designer
- 💻 Web & Mobile Developer
- 🌟 Futurist Dev
- 📍 Malabe, Sri Lanka
- 🎓 Graduation: 2026
- 🎯 Focus: React, Flutter, Firebase, Figma

## 📬 Contact

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://laalithaniroshan.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/laalitha-gunarathna-6a015b289/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LaalithaNiroshan01)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/laalithaniroshan2)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/__nir0__)

</div>

---

<div align="center">

Made with ❤️ by Laalitha Niroshan

</div>
