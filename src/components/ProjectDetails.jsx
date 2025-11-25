"use client"

import React, { useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Github } from 'lucide-react';
import Image from 'next/image';

/* PROJECT DETAIL VIEW (Updated for Light/Dark Mode)
  - Fixed issue where background was hardcoded to black.
  - Now uses 'bg-slate-50 dark:bg-[#121212]' to respect the theme toggle.
*/

export default function ProjectDetail({ project, onClose, onNext }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-white selection:bg-blue-600 selection:text-white pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 absolute top-0 left-0 w-full z-100 font-sans transition-colors">
       
       {/* 1. Top Bar Navigation */}
       <div className="w-full px-6 lg:px-12 py-6 flex justify-between items-center border-b border-slate-200 dark:border-white/10 bg-slate-50/95 dark:bg-[#121212]/95 backdrop-blur-sm sticky top-0 z-50 transition-colors">
          <div className="font-mono text-[10px] md:text-xs tracking-widest text-slate-500 uppercase flex items-center gap-2">
             <span className="text-blue-600">SYSTEM</span> / PROJECTS / <span className="text-slate-900 dark:text-white">00{project.id}</span>
          </div>
          <button onClick={onClose} className="group flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:text-blue-600 dark:hover:text-white transition-colors text-slate-500 dark:text-slate-400 font-mono">
             &lt; RETURN <span className="hidden md:inline-block border border-slate-300 dark:border-white/20 px-1 py-0.5 text-[9px] text-slate-500 group-hover:border-blue-600 group-hover:text-blue-600 transition-colors">ESC</span>
          </button>
       </div>

       {/* 2. Hero Section */}
       {/* Gradient adapted for light mode (slate-200 to slate-50) and dark mode */}
       <div className="relative w-full h-[50vh] lg:h-[70vh] bg-linear-to-b from-slate-200 to-slate-50 dark:from-slate-800 dark:to-[#121212] flex flex-col justify-end transition-colors">
          <div className="w-full px-6 lg:px-20 pb-12 lg:pb-20">
             <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-3 py-1 mb-6 tracking-widest uppercase font-mono">
                {project.category}
             </span>
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-0 font-sans text-slate-900 dark:text-white">
                {project.title}
             </h1>
          </div>
       </div>

       {/* 3. Info Grid (Tech & Mission) */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 px-6 lg:px-20 py-20 border-b border-slate-200 dark:border-white/10 transition-colors">
          {/* Left: Specs */}
          <div className="lg:col-span-4 space-y-12">
             {/* Tech Stack */}
             <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 font-mono">Technologies</h3>
                <div className="flex flex-wrap gap-3">
                   {project.tags.map(tag => (
                      <span key={tag} className="border border-slate-300 dark:border-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-default font-mono">
                         {tag}
                      </span>
                   ))}
                </div>
             </div>
             {/* Role & Year */}
             <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 font-mono">Role & Year</h3>
                <div className="flex justify-between items-end border-b border-slate-300 dark:border-white/20 pb-3 font-mono text-slate-900 dark:text-white">
                   <span className="font-bold text-sm md:text-base">{project.details.role}</span>
                   <span className="font-bold text-sm md:text-base">{project.year}</span>
                </div>
             </div>
          </div>

          {/* Right: Mission */}
          <div className="lg:col-span-8">
             <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 font-sans text-slate-900 dark:text-white">Mission</h3>
             <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                {project.description}
             </p>
          </div>
       </div>

       {/* 4. Deep Dive Section */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 px-6 lg:px-20 py-20">
           {/* Sidebar Links */}
           <div className="lg:col-span-3">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 font-mono">Links</h3>
              <div className="flex flex-col gap-4 font-mono">
                 <a href="#" className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider text-xs hover:underline">
                    Live Preview <ArrowUpRight size={14} />
                 </a>
                 <a href="#" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-xs hover:text-blue-600 dark:hover:text-white transition-colors">
                    Source Code <Github size={14} />
                 </a>
              </div>
           </div>

           {/* Main Content */}
           <div className="lg:col-span-9 space-y-20">
              {/* Challenge & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                 <div>
                    <h3 className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-4 font-mono">The Challenge</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                       {project.details.challenge}
                    </p>
                 </div>
                 <div>
                    <h3 className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-4 font-mono">The Solution</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                       {project.details.solution}
                    </p>
                 </div>
              </div>

              {/* Figure Image */}
              <div className="w-full aspect-video bg-slate-200 dark:bg-[#1a1a1a] relative border border-slate-300 dark:border-white/10 group overflow-hidden transition-colors">
                 <div className="absolute top-4 left-4 bg-slate-900 dark:bg-black text-white text-[10px] font-mono px-2 py-1 uppercase border border-slate-500 dark:border-white/20 z-10">
                    FIG 2.0
                 </div>
                 
                 {/* Visual Logic: Use real image if available, else use placeholder */}
                 {project.imageDetail ? (
                    /* NOTE: In local code use <Image /> component here */
                    <Image
                       src={project.imageDetail} 
                       alt={project.title}
                         fill
                       className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                 ) : (
                    <div className="w-full h-full bg-linear-to-br from-slate-300 to-slate-100 dark:from-white/5 dark:to-transparent"></div>
                 )}

                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {!project.imageDetail && (
                        <span className="font-mono text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest">[ SYSTEM VISUALIZATION ]</span>
                    )}
                 </div>
              </div>
           </div>
       </div>

       {/* 5. Next Project Button */}
       <div className="px-6 lg:px-20 pt-10 pb-20 flex justify-center border-t border-slate-200 dark:border-white/5 mx-6 lg:mx-20 transition-colors">
          <button 
            onClick={() => onNext(project.id)}
            className="group mt-20 bg-blue-600 text-white font-bold uppercase tracking-widest py-5 px-12 hover:bg-blue-500 transition-all flex items-center gap-4 text-xs md:text-sm font-mono"
          >
             Initialize Next Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
       </div>
    </div>
  )
}