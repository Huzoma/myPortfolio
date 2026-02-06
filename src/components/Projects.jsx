"use client"

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

/* PROJECT COMPONENTS
  - Contains both the individual 'ProjectCard' and the main 'Projects' grid section.
*/

// 1. Individual Card
const ProjectCard = ({ project, onOpen }) => (
  <div onClick={() => onOpen(project)} className="group flex flex-col h-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#121212] hover:border-blue-600 transition-colors cursor-pointer">
    <div className="relative w-full aspect-4/3 bg-linear-to-br from-slate-200 to-slate-300 dark:from-[#1a1a1a] dark:to-[#222] overflow-hidden border-b border-slate-200 dark:border-white/10">
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 font-mono">{project.category}</div>

        {/* Render image from public/ via next/image when available */}
        {project.imageCard ? (
          <Image
            src={project.imageCard}
            alt={project.title}
            fill
            className="absolute inset-0 w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-neutral-700 font-mono text-xs uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">[ IMG_REF_{project.id} ]</div>
        )}

        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
    <div className="p-6 md:p-8 flex flex-col grow relative">
       <div className="flex justify-between items-start mb-4">
           <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors font-sans">{project.title}</h3>
           <ArrowUpRight size={20} className="text-slate-400 group-hover:text-blue-600 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
       </div>
       <p className="text-sm text-slate-600 dark:text-neutral-400 font-mono leading-relaxed line-clamp-3">{project.description}</p>
    </div>
  </div>
  
);

// 2. Main Section
export default function Projects({ projects, onOpen }) {
  return (
    <section id="work" className="mb-40 px-6 lg:px-20 pt-24">
      <div className="mb-16 border-b border-slate-200 dark:border-white/10 pb-8">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white font-sans">
          <span className="text-blue-600">02.</span> Selected Work
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}