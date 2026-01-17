import { FaReact, FaGitAlt } from "react-icons/fa"; // React, Git
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"; // Next.js, Tailwind
import { SiJavascript } from "react-icons/si"; // JavaScript
import { FiFigma } from "react-icons/fi"; // Figma (Outline version)

// ... (Keep your PROJECTS array exactly as is) ...
// src/lib/Data.js

export const projectsData = [
  {
    id: "01",
    title: "Vanguard E-Com",
    category: "Web Application",
    // Short description for the card
    summary: "A high-performance headless commerce platform designed for enterprise-level inventory management.",
    // Image for the card (Place these in your /public folder)
    coverImage: "/images/vanguard-preview.jpg", 
    techStack: ["Next.js", "TypeScript", "Shopify"],
    
    // External Links
    links: {
      live: "https://your-project.vercel.app",
      github: "https://github.com/yourusername/project",
    },

    // Detailed Case Study (For the Details View)
    details: {
      challenge: "Rendering 50,000+ inventory data points in real-time without blocking the main thread.",
      solution: "Implemented a virtualized rendering engine using Canvas API for heavy data sets.",
      year: "2024",
      role: "Lead Architect"
    }
  },
  // Copy and paste this object to add Project 02...
];
// UPDATED STACK WITH REACT ICONS
// We pass the component directly in the 'icon' property
export const STACK = [
  { 
    name: "REACT", 
    type: "LIBRARY",
    icon: <FaReact className="w-10 h-10 text-current" />
  },
  { 
    name: "NEXT.JS", 
    type: "FRAMEWORK",
    icon: <RiNextjsFill className="w-10 h-10 text-current" />
  },
  { 
    name: "JAVASCRIPT", 
    type: "ES6+",
    icon: <SiJavascript className="w-10 h-10 text-current" />
  },
  { 
    name: "TAILWIND", 
    type: "STYLING",
    icon: <RiTailwindCssFill className="w-10 h-10 text-current" />
  },
  { 
    name: "GIT", 
    type: "VCS",
    icon: <FaGitAlt className="w-10 h-10 text-current" />
  },
  { 
    name: "FIGMA", 
    type: "DESIGN",
    // Using FiFigma for the outline style you requested
    icon: <FiFigma className="w-10 h-10 text-current" />
  },
];