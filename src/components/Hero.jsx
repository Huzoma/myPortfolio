"use client"

import React from 'react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image'; // 1. IMPORT THIS

/* HERO COMPONENT
  - Implements the split-screen layout.
  - Image is hidden on mobile (`hidden lg:flex`) to prevent content overlap.
*/

export default function Hero() {
  return (
    <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b border-slate-200 dark:border-white/10">
      
      {/* Left Text Column */}
      <div className="p-8 lg:p-20 flex flex-col justify-center border-r border-slate-200 dark:border-white/10 relative">
          <div className="inline-flex items-center border border-blue-600/30 bg-blue-600/10 px-3 py-2 w-fit mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-blue-500 mr-3 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
            <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-widest uppercase font-mono">Available for hire</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] mb-8 font-sans">
            UZO<br/>
            <span className="text-blue-600">DEVELOPER.</span>
          </h1>

          <div className="flex border-l-2 border-blue-600 pl-6 mb-12 max-w-lg">
            <p className="text-slate-600 dark:text-gray-400 text-lg lg:text-xl leading-relaxed font-light">
              Creating digital experiences & engineering for the web. Converting complex requirements into streamlined, high-performance executable code.            </p>
          </div>

          <a href="#work" className="group bg-blue-600 text-white px-8 py-5 font-bold tracking-widest text-xs uppercase w-fit hover:bg-blue-700 transition-all flex items-center gap-4 font-mono">
            View Projects 
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
      </div>

      {/* Right Image Column (Hidden on small screens) */}
      <div className="hidden lg:flex relative bg-slate-100 dark:bg-[#0f0f0f] p-12 lg:p-20 items-center justify-center border-t lg:border-t-0 border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
          
          <div className="relative w-full aspect-square max-w-lg border border-slate-300 dark:border-white/20 bg-slate-200 dark:bg-[#1a1a1a] shadow-2xl overflow-hidden group">
              <div className="absolute -top -left-px bg-blue-600 text-white text-[10px] font-bold px-3 py-1 tracking-widest z-10 font-mono">
                  SYS_ID: 001
              </div>
              
              {/* 2. IMAGE IMPLEMENTATION */}
              <div className="w-full h-full relative">
                  <Image 
                    src="/images/Profile.png" 
                    alt="Uzo Profile"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority // Loads this image immediately since it's above the fold
                  />

                  {/* Overlay Info (Optional - kept from previous design) */}
                  <div className="absolute bottom-6 right-6 text-right z-20 mix-blend-difference">
                      <div className="text-[10px] font-mono text-white tracking-widest">COORDS: 45.92, 12.01</div>
                      <div className="text-[10px] font-mono text-white tracking-widest">STATUS: ACTIVE</div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
}