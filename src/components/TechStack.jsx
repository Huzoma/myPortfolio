import React from 'react';
// FIX: Changed alias '@/' to relative path '../../' to guarantee resolution
import { STACK } from '../lib/Data'; 

export default function TechStack() {
  return (
    <section id="stack" className="px-6 lg:px-20 pt-24 pb-12 bg-slate-50 dark:bg-[#121212]">
      
      {/* Header Section */}
      <div className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8 flex justify-between items-end">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white font-sans">
          <span className="text-blue-600">01.</span> Technologies
        </h2>
        <span className="hidden md:block text-xs font-mono font-bold text-slate-500 dark:text-slate-500 tracking-widest uppercase">
          Core Toolkit
        </span>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-slate-200 dark:border-white/10">
        {STACK.map((tech) => (
          <div 
            key={tech.name} 
            className="aspect-[4/5] flex flex-col justify-between p-8 border-r border-b border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-colors group relative overflow-hidden"
          >
             {/* Hover Glow Effect */}
             <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
             
             {/* SVG Icon - Centered vertically in top half */}
             <div className="flex-grow flex items-center justify-start text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
               {tech.icon}
             </div>
             
             {/* Text Info - Bottom Aligned */}
             <div className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-widest text-sm md:text-base text-slate-900 dark:text-white font-sans">
                  {tech.name}
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                  {tech.type}
                </span>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}