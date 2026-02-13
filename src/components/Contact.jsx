"use client"

import React, { useState } from 'react';
import { Mail, MapPin, Loader2, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.target);
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvnegrp";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset(); 
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="mb-40 px-6 lg:px-20 pt-20 overflow-hidden"> 
      {/* Added overflow-hidden to section just in case */}
      
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* LEFT COLUMN: Contact Info */}
            <div>
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-8 font-sans">
                      <span className="text-blue-600">03.</span> Let&apos;s Work Together
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-neutral-400 leading-relaxed font-light mb-12">
                      Currently accepting new contracts. If you require precision engineering for your next project, send me a message.
                    </p>
                    
                    {/* EMAIL CARD */}
                    <div className="p-6 flex items-center gap-6 group hover:border-blue-600 border border-transparent">
                        <div className="border border-slate-200 dark:border-white/10 p-4 bg-slate-100 dark:bg-white/5 text-blue-600">
                          <Mail size={24} />
                        </div>
                        {/* FIX 1: Added min-w-0 to allow text truncation/wrapping inside flex */}
                        <div className="min-w-0">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500 block mb-1 font-mono">Email</span>
                          {/* FIX 2: Added break-all to force email to wrap if screen is too small */}
                          <span className="text-xl font-bold text-slate-900 dark:text-white font-sans break-all">
                            uzomaiyke368@gmail.com
                          </span>
                        </div>
                    </div>
                    
                    {/* LOCATION CARD */}
                    <div className="p-6 flex items-center gap-6 group hover:border-blue-600 border border-transparent">
                        <div className="border border-slate-200 dark:border-white/10 p-4 bg-slate-100 dark:bg-white/5 text-blue-600">
                          <MapPin size={24} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500 block mb-1 font-mono">Base</span>
                          <span className="text-xl font-bold text-slate-900 dark:text-white font-sans">Lagos, NG | Warri, NG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: The Form */}
            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-mono">Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        placeholder="NAME / ORG" 
                        // FIX 3: Ensure w-full doesn't overflow by limiting max-width
                        className="w-full max-w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-blue-600 font-mono text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-mono">Mail</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        placeholder="EMAIL ADDRESS" 
                        className="w-full max-w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-blue-600 font-mono text-sm" 
                      />
                    </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-mono">Message</label>
                  <textarea 
                    rows={6} 
                    name="message" 
                    required
                    placeholder="ENTER MESSAGE PARAMETERS..." 
                    className="w-full max-w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-blue-600 font-mono text-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full md:w-auto font-bold uppercase tracking-widest py-4 px-8 transition-all font-mono flex items-center justify-center gap-3
                    ${status === 'success' 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white'
                    }`}
                >
                  {status === 'submitting' && <Loader2 className="animate-spin" size={18} />}
                  {status === 'success' && <CheckCircle size={18} />}
                  
                  {status === 'submitting' ? 'TRANSMITTING...' : 
                   status === 'success' ? 'TRANSMISSION RECEIVED' : 
                   status === 'error' ? 'ERROR - TRY AGAIN' : 
                   'SEND TRANSMISSION'}
                </button>
            </form>
        </div>
    </section>
  );
}