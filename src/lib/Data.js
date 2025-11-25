import { FaReact, FaGitAlt } from "react-icons/fa"; // React, Git
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"; // Next.js, Tailwind
import { SiJavascript } from "react-icons/si"; // JavaScript
import { FiFigma } from "react-icons/fi"; // Figma (Outline version)

// ... (Keep your PROJECTS array exactly as is) ...
export const PROJECTS = [
  {
    id: 1,
    title: "Vanguard E-Com",
    category: "WEB APPLICATION",
    imageCard: "/VanGuard.png", 
    imageDetail: "/VanGuard.png",
    description: "A high-performance headless commerce platform designed for enterprise-level inventory management. Aggregates data from multiple endpoints to provide real-time stock visualization.",
    tags: ["Next.js", "TypeScript", "Shopify"],
    link: "#",
    year: "2024",
    details: {
      role: "Lead Architect",
      client: "Vanguard Fashion",
      challenge: "The primary constraint was performance. Rendering 50,000+ inventory data points in real-time without blocking the main thread required a complete re-architecture of the standard DOM manipulation strategy.",
      solution: "Implemented a virtualized rendering engine using Canvas API for heavy data sets, while reserving the DOM for interactive UI elements. This hybrid approach reduced memory overhead by 60% and maintained a steady 60fps during data ingestion.",
      results: ["0.8s FCP", "65% conv. increase", "100% uptime"]
    }
  },
  {
    id: 2,
    title: "TaskFlow Protocol",
    category: "SYSTEM ARCHITECTURE",
    imageCard: "/TaskFlow.png",
    imageDetail: "/TaskFlow.png",
    description: "Real-time collaborative project management tool using WebSockets for instant state synchronization across distributed teams.",
    tags: ["React", "Node.js", "Socket.io"],
    link: "#",
    year: "2023",
    details: {
      role: "Full Stack Engineer",
      client: "Internal Tool",
      challenge: "Distributed teams needed a way to visualize workflow states in real-time without refreshing their browsers. Existing tools were bloated and expensive.",
      solution: "Built a custom WebSocket protocol on top of Node.js to handle state synchronization. The frontend uses a custom conflict-resolution algorithm to handle simultaneous edits.",
      results: ["<50ms latency", "500+ daily users", "30% less meetings"]
    }
  },
  {
    id: 3,
    title: "Nexus Dashboard",
    category: "DATA VISUALIZATION",
    imageCard: "/Nexsus.png",
    imageDetail: "/Nexsus.png",
    description: "Analytics platform featuring real-time data visualization. Engineered for performance and high-throughput inventory management.",
    tags: ["D3.js", "Tailwind", "Python"],
    link: "#",
    year: "2023",
    details: {
      role: "Frontend Developer",
      client: "FinTech Global",
      challenge: "Financial analysts were drowning in CSV files and needed visual anomaly detection. Rendering large datasets was causing browser crashes.",
      solution: "Developed a bespoke visualization library wrapping D3.js. Created a highly performant rendering engine capable of plotting 50k+ data points without UI lag.",
      results: ["Automated reporting", "Awarded Best Tool 2023"]
    }
  },
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