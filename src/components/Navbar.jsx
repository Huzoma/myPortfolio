"use client"

import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

/* NAVBAR COMPONENT
  - Implements the "Grid Cell" layout for the header.
  - Handles mobile menu toggling and theme switching.
*/

export default function Navbar({ toggleTheme, darkMode, onBack, selectedProject }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    if (selectedProject) onBack();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50/90 dark:bg-[#121212]/95 border-b border-slate-200 dark:border-white/10 backdrop-blur-sm">
      <div className="flex h-20 items-stretch">
        
        {/* Logo */}
        <div className="flex-none px-6 md:px-8 flex items-center border-r border-slate-200 dark:border-white/10 w-auto md:w-64">
            <div className="w-3 h-3 bg-blue-600 mr-3"></div>
            <button onClick={onBack} className="font-black text-lg tracking-widest uppercase hover:text-blue-600 transition-colors font-sans">
              UZO.IO
            </button>
        </div>
        
        <div className="grow hidden md:block"></div> 

        {/* Desktop Links */}
        <div className="hidden md:flex items-stretch">
            {['About', 'Work', 'Stack'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="flex items-center px-8 border-l border-slate-200 dark:border-white/10 text-xs font-bold tracking-widest uppercase hover:bg-blue-600/5 hover:text-blue-600 transition-colors font-mono">
                  {item}
                </a>
            ))}
            <a href="#contact" className="flex items-center px-8 border-l border-slate-200 dark:border-white/10 text-xs font-bold tracking-widest uppercase text-blue-600 hover:bg-blue-600 hover:text-white transition-colors font-mono">
              Contact
            </a>
            <button onClick={toggleTheme} className="flex items-center px-6 border-l border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-stretch ml-auto">
          <button onClick={toggleTheme} className="flex items-center px-6 border-l border-slate-200 dark:border-white/10">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center px-6 border-l border-slate-200 dark:border-white/10">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-50 dark:bg-[#121212] border-b border-slate-200 dark:border-white/10 p-0 flex flex-col shadow-2xl">
          {['About', 'Work', 'Stack', 'Contact'].map((item) => (
            <a key={item} href={!selectedProject ? `#${item.toLowerCase()}` : '#'} onClick={handleNavClick} className="py-6 px-8 border-b border-slate-200 dark:border-white/10 text-xl font-bold uppercase tracking-tighter hover:text-blue-600 hover:pl-10 transition-all font-sans">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}