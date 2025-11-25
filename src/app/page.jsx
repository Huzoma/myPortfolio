"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProjectDetail from '@/components/ProjectDetails';

// FIX: Correctly importing from your lib folder based on your file structure
import { PROJECTS } from '@/lib/Data';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // Toggle Logic
  const toggleTheme = () => setDarkMode(!darkMode);

  // Handle Dark Mode Class on <body>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Project Navigation Handlers
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleBack = () => setSelectedProject(null);

  const handleNextProject = (currentId) => {
    const currentIndex = PROJECTS.findIndex(p => p.id === currentId);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
    window.scrollTo(0, 0);
  };

  return (
    <main className={`min-h-screen transition-colors duration-200 ease-linear font-sans selection:bg-blue-600 selection:text-white ${darkMode ? 'dark bg-[#121212] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Grid - Global Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <Navbar 
        toggleTheme={toggleTheme} 
        darkMode={darkMode} 
        onBack={handleBack}
        selectedProject={selectedProject}
      />

      {/* Conditional Rendering for Detail View */}
      {selectedProject ? (
        <ProjectDetail 
          project={selectedProject} 
          onClose={handleBack} 
          onNext={handleNextProject} 
        />
      ) : (
        <>
          <Hero />
          <TechStack />
          {/* Pass the handler down to the Projects component */}
          <Projects projects={PROJECTS} onOpen={handleProjectSelect} />
          <Contact />
        </>
      )}

      <Footer />
    </main>
  );
}