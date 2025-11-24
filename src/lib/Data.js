import React from 'react';

/* DATA STORE
  - Keeps your content separate from your UI code.
  - Edit this file to update project details without touching React components.
*/

export const PROJECTS = [
  {
    id: 1,
    title: "Vanguard E-Com",
    category: "WEB APPLICATION",
    description: "A high-performance headless commerce platform designed for enterprise-level inventory management. Aggregates data from multiple endpoints to provide real-time stock visualization.",
    tags: ["Next.js", "TypeScript", "Shopify"],
    link: "#",
    year: "2024",
    // 1. Image for the Grid (Aspect Ratio 4:3)
    imageCard: "/VanGuard.png", 
    // 2. Image for the Full View (Aspect Ratio 16:9 or similar)
    imageDetail: "/VanGuard.png",
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
    description: "Real-time collaborative project management tool using WebSockets for instant state synchronization across distributed teams.",
    tags: ["React", "Node.js", "Socket.io"],
    link: "#",
    year: "2023",
    imageCard: "/TaskFlow.png",
    imageDetail: "/TaskFlow.png",
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
    description: "Analytics platform featuring real-time data visualization. Engineered for performance and high-throughput inventory management.",
    tags: ["D3.js", "Tailwind", "Python"],
    link: "#",
    year: "2023",
    imageCard: "/Nexsus.png",
    imageDetail: "/Nexsus.png",
    details: {
      role: "Frontend Developer",
      client: "FinTech Global",
      challenge: "Financial analysts were drowning in CSV files and needed visual anomaly detection. Rendering large datasets was causing browser crashes.",
      solution: "Developed a bespoke visualization library wrapping D3.js. Created a highly performant rendering engine capable of plotting 50k+ data points without UI lag.",
      results: ["Automated reporting", "Awarded Best Tool 2023"]
    }
  },
  {
    id: 4,
    title: "Lumina Identity",
    category: "DESIGN SYSTEM",
    description: "Comprehensive brand system overhaul focusing on geometric simplicity, accessibility, and monochromatic typography.",
    tags: ["React", "A11y", "Storybook"],
    link: "#",
    year: "2022",
    imageCard: "/Nexsus.png",
    imageDetail: "/Nexsus.png",
    details: {
      role: "Maintainer",
      client: "Open Source",
      challenge: "Most UI kits prioritize aesthetics over accessibility. Developers needed a drop-in solution that was WCAG 2.1 AA compliant out of the box.",
      solution: "Built a headless component system with strict focus management and screen-reader optimizations. Includes high-contrast modes by default.",
      results: ["2k+ Stars", "100% A11y Score"]
    }
  }
];

// Official Brand SVGs with fill="currentColor" for hover effects
export const STACK = [
  { 
    name: "REACT", 
    icon: (
      <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-current">
        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
      </svg>
    ) 
  },
  { 
    name: "NEXT.JS", 
    icon: (
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-current">
        <mask id="mask0_408_134" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black"/>
        </mask>
        <g mask="url(#mask0_408_134)">
          <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="currentColor"/>
          <rect x="115" y="54" width="12" height="72" fill="currentColor"/>
        </g>
      </svg>
    ) 
  },
  { 
    name: "JAVASCRIPT", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-current">
        <path d="M0 0H24V24H0V0Z" fill="none"/>
        <path d="M22 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H22C23.1 24 24 23.1 24 22V2C24 0.9 23.1 0 22 0ZM13 11H15.5V18.25C15.5 18.66 15.16 19 14.75 19H13V21H16.5C17.88 21 19 19.88 19 18.5V11H19V9H13V11ZM7 11H9.5V18.25C9.5 18.66 9.16 19 8.75 19H7V21H10.5C11.88 21 13 19.88 13 18.5V11H13V9H7V11Z" fill="currentColor"/>
      </svg>
    ) 
  },
  { 
    name: "TAILWIND", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-current">
        <path d="M12.0001 6C12.0001 6 13.5 2.5 17.5 3C20.5 3.375 22.0001 6 22.0001 6C22.0001 6 20 8.5 17.5 9C14.5 9.5 13.5 7.5 12.0001 6ZM6.00012 14C6.00012 14 7.50012 10.5 11.5001 11C14.5001 11.375 16.0001 14 16.0001 14C16.0001 14 14.0001 16.5 11.5001 17C8.50012 17.5 7.50012 15.5 6.00012 14ZM12.0001 17C12.0001 17 13.5 13.5 17.5 14C20.5 14.375 22.0001 17 22.0001 17C22.0001 17 20 19.5 17.5 20C14.5 20.5 13.5 18.5 12.0001 17Z" fill="currentColor"/>
        <path d="M6 6C6 6 7.5 2.5 11.5 3C14.5 3.375 16 6 16 6C16 6 14 8.5 11.5 9C8.5 9.5 7.5 7.5 6 6Z" fill="currentColor"/>
      </svg>
    ) 
  },
];