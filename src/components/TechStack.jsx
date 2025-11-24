import React from 'react';
import { STACK } from '@/lib/Data';

/* TECH STACK COMPONENT
  - Displays the grid of technologies using the custom SVGs from data.js.
*/

export default function TechStack() {
  return (
    <section id="stack" className="px-6 lg:px-20 pt-24 pb-12 bg-slate-50 dark:bg-[#121212]">
      <div className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white font-sans">
          <span className="text-blue-600">02.</span> Technologies
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-slate-200 dark:border-white/10">
        {STACK.map((tech) => (
          <div key={tech.name} className="aspect-square flex flex-col justify-between p-8 border-r border-b border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-colors group relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
             <div className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
               {tech.icon}
             </div>
             <span className="font-bold uppercase tracking-widest text-xs md:text-sm text-slate-900 dark:text-white font-mono">
               {tech.name}
             </span>
          </div>
        ))}
        <div className="hidden lg:block aspect-square border-r border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5"></div>
      </div>
    </section>
  );
}