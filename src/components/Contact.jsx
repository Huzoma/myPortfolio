import React from 'react';
import { Mail,MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="mb-40 px-6 lg:px-20 pt-20">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div>
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-8 font-sans"><span className="text-blue-600">03.</span> Let&apos;s Work Together</h2>
                    <p className="text-lg text-slate-600 dark:text-neutral-400 leading-relaxed font-light mb-12">Currently accepting new contracts. If you require precision engineering for your next project, send me a message.</p>
                    <div className="  p-6 flex items-center gap-6 group hover:border-blue-600 transition-colors">
                        <div className="border border-slate-200 dark:border-white/10 p-4 bg-slate-100 dark:bg-white/5 text-blue-600"><Mail size={24} /></div>
                        <div><span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500 block mb-1 font-mono">Email</span><span className="text-xl font-bold text-slate-900 dark:text-white font-sans">hello@uzo.io</span></div>
                    </div>
                    <div className="  p-6 flex items-center gap-6 group hover:border-blue-600 transition-colors">
                        <div className="border border-slate-200 dark:border-white/10 p-4 bg-slate-100 dark:bg-white/5 text-blue-600"><MapPin size={24} /></div>
                        <div><span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500 block mb-1 font-mono">Base</span><span className="text-xl font-bold text-slate-900 dark:text-white font-sans">Lagos, NG</span></div>
                    </div>
                </div>
            </div>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-mono">Name</label><input type="text" placeholder="NAME / ORG" className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-blue-600 transition-colors font-mono text-sm" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-mono">Mail</label><input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-blue-600 transition-colors font-mono text-sm" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-mono">Message</label><textarea rows={6} placeholder="ENTER MESSAGE PARAMETERS..." className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-blue-600 transition-colors font-mono text-sm resize-none"></textarea></div>
                <button type="submit" className="w-full md:w-auto bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest py-4 px-8 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all font-mono">Send Transmission</button>
            </form>
        </div>
    </section>
  );
}