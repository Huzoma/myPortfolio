"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProjectDetail from '@/components/ProjectDetails';

// IMPORT THE NEW FETCHER
import { fetchGitHubProjects } from '@/lib/github';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // NEW STATE VARIABLES
  const [projects, setProjects] = useState([]); // Holds the data
  const [loading, setLoading] = useState(true); // Tracks if we are waiting for data

  // Dark Mode Logic
  const toggleTheme = () => setDarkMode(!darkMode);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // NEW: LOAD DATA FROM GITHUB
  useEffect(() => {
    async function loadProjects() {
      // 1. Call the function
      const data = await fetchGitHubProjects();
      // 2. Save data to state
      setProjects(data);
      // 3. Stop loading
      setLoading(false);
    }
    loadProjects();
  }, []);

  // Handlers
  const handleProjectSelect = (project) => setSelectedProject(project);
  const handleBack = () => setSelectedProject(null);
  const handleNextProject = (currentId) => {
    const currentIndex = projects.findIndex(p => p.id === currentId);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
    window.scrollTo(0, 0);
  };

  return (
    <main className={`min-h-screen transition-colors duration-200 ease-linear font-sans selection:bg-blue-600 selection:text-white ${darkMode ? 'dark bg-[#121212] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <Navbar 
        toggleTheme={toggleTheme} 
        darkMode={darkMode} 
        onBack={handleBack}
        selectedProject={selectedProject}
      />

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
          
          {/* LOADING STATE - Shows while fetching from GitHub */}
          {loading ? (
             <div className="flex justify-center py-20">
               <span className="font-mono text-sm text-blue-600 animate-pulse uppercase tracking-widest">
                 Initializing System Data...
               </span>
             </div>
          ) : (
             /* PASS THE FETCHED PROJECTS HERE */
             <Projects projects={projects} onOpen={handleProjectSelect} />
          )}

          <Contact />
        </>
      )}

      <Footer />
    </main>
  );
}