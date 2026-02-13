import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A0A0A] py-16">
      <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 text-center md:text-left">
              
              {/* Branding & Copyright */}
              <div>
                  <h4 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white mb-2 font-sans">
                      UZO.IO
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-neutral-500">
                      © {new Date().getFullYear()} ALL RIGHTS RESERVED.
                  </p>
              </div>

              {/* Status Dots */}
              <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-300 dark:bg-white/20"></div>
                  <div className="w-2 h-2 bg-slate-300 dark:bg-white/20"></div>
                  <div className="w-2 h-2 bg-blue-600"></div>
              </div>
          </div>
      </div>
    </footer>
  );
}