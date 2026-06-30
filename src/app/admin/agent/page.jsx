// src/app/admin/agent/page.jsx
"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, RefreshCw, CheckCircle, AlertTriangle, Copy, Check, MessageSquare, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function AdminAgentDashboard() {
  const [repos, setRepos] = useState([]);
  const [localDB, setLocalDB] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncingRepo, setSyncingRepo] = useState(null);
  
  // LinkedIn States
  const [selectedRepo, setSelectedRepo] = useState('');
  const [linkedinContext, setLinkedinContext] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [drafting, setDrafting] = useState(false);
  const [copied, setCopied] = useState(false);

  const GITHUB_USERNAME = 'Huzoma';

  // Load baseline data
  useEffect(() => {
    async function initData() {
      setLoading(true);
      try {
        // 1. Fetch from GitHub
        const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
        const reposData = await repoRes.json();
        
        // Filter out forks
        const nonForks = Array.isArray(reposData) ? reposData.filter(r => !r.fork) : [];
        setRepos(nonForks);

        // 2. Fetch local DB
        const dbRes = await fetch('/api/agent/generate');
        const dbData = await dbRes.json();
        setLocalDB(dbData || {});
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  const handleSync = async (repoName) => {
    setSyncingRepo(repoName);
    try {
      const response = await fetch('/api/agent/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoName })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setLocalDB(prev => ({
          ...prev,
          [repoName.toLowerCase()]: data.project
        }));
      } else {
        alert(data.error || 'Failed to sync narrative.');
      }
    } catch (err) {
      console.error(err);
      alert('Error during sync.');
    } finally {
      setSyncingRepo(null);
    }
  };

  const handleStatusChange = async (repoName, newStatus) => {
    try {
      const response = await fetch('/api/agent/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoName, status: newStatus })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setLocalDB(prev => ({
          ...prev,
          [repoName.toLowerCase()]: {
            ...prev[repoName.toLowerCase()],
            status: newStatus
          }
        }));
      } else {
        alert(data.error || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status.');
    }
  };

  const handleGenerateLinkedIn = async () => {
    if (!selectedRepo) return;
    setDrafting(true);
    setGeneratedPost('');
    
    const dbEntry = localDB[selectedRepo.toLowerCase()] || {};
    const projectDetails = {
      title: selectedRepo.replace(/-/g, ' '),
      role: dbEntry.role || "Lead Developer",
      challenge: dbEntry.challenge || "Building core modules.",
      solution: dbEntry.solution || "Implemented modern components."
    };

    try {
      const response = await fetch('/api/agent/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDetails,
          customContext: linkedinContext
        })
      });
      const data = await response.json();
      if (response.ok && data.postDraft) {
        setGeneratedPost(data.postDraft);
      } else {
        alert(data.error || 'Failed to generate post draft.');
      }
    } catch (err) {
      console.error(err);
      alert('Error generating post draft.');
    } finally {
      setDrafting(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-12">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>

      {/* Header */}
      <header className="border-b border-white/5 bg-[#0f0f12] px-6 lg:px-20 py-6 flex justify-between items-center sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white p-2 border border-white/10 hover:border-white/20 transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-500 animate-pulse" />
              <h1 className="text-lg font-black tracking-widest uppercase font-mono">UZOMA_AGENT.SYS</h1>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Self-Updating Portfolio Control Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">System Operational</span>
        </div>
      </header>

      <div className="px-6 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        
        {/* LEFT COLUMN: Repository narrative manager */}
        <section className="lg:col-span-7 bg-[#0f0f12] border border-white/10 p-6 md:p-8 relative flex flex-col h-fit">
          <div className="mb-6 flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight">Project Sync Manager</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Scan repositories to auto-generate case studies</p>
            </div>
            <span className="text-xs font-mono font-bold bg-blue-600/10 text-blue-400 px-3 py-1 border border-blue-500/20 uppercase">
              {repos.length} Repos
            </span>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <RefreshCw size={24} className="text-blue-500 animate-spin" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Querying GitHub API...</span>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/5">
              {repos.map((repo) => {
                const nameLower = repo.name.toLowerCase();
                const dbEntry = localDB[nameLower];
                const isSynced = !!dbEntry;

                return (
                  <div 
                    key={repo.id}
                    className="p-4 border border-white/5 bg-[#121216] flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-white/10 transition-colors"
                  >
                    <div>
                      <h3 className="text-sm font-bold font-mono text-white tracking-wide uppercase">{repo.name.replace(/-/g, ' ')}</h3>
                      <p className="text-[10px] font-mono text-slate-400 mt-1 line-clamp-1">{repo.description || "No GitHub description defined."}</p>
                      
                      <div className="flex gap-3 items-center mt-2 flex-wrap">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 border rounded-none uppercase ${
                          isSynced 
                            ? 'bg-green-500/5 text-green-400 border-green-500/20' 
                            : 'bg-amber-500/5 text-amber-400 border-amber-500/20'
                        }`}>
                          {isSynced ? 'Synced in DB' : 'Missing Narrative'}
                        </span>
                        
                        {repo.language && (
                          <span className="text-[9px] font-mono text-slate-500 uppercase">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isSynced ? (
                        <div className="flex flex-col items-end gap-1.5">
                          <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Status Indicator</label>
                          <select
                            value={dbEntry.status || "Completed"}
                            onChange={(e) => handleStatusChange(repo.name, e.target.value)}
                            className="bg-[#1a1a22] border border-white/10 px-3 py-1.5 text-xs text-white outline-none focus:border-blue-500 cursor-pointer font-mono"
                          >
                            <option value="Good">Featured / Good</option>
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Incomplete">Incomplete</option>
                          </select>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSync(repo.name)}
                          disabled={syncingRepo !== null}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-white/5 text-white px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {syncingRepo === repo.name ? (
                            <>
                              <RefreshCw size={12} className="animate-spin" />
                              Syncing...
                            </>
                          ) : (
                            <>
                              <Sparkles size={12} />
                              Generate Case Study
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: LinkedIn social generator */}
        <section className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Social Panel */}
          <div className="bg-[#0f0f12] border border-white/10 p-6 md:p-8 flex flex-col">
            <div className="mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Linkedin className="text-blue-500" size={20} />
                <h2 className="text-xl font-bold uppercase tracking-tight">Social Media Agent</h2>
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Draft LinkedIn posts matching your writing style</p>
            </div>

            <div className="space-y-4">
              {/* Project Select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Select Target Project</label>
                <select
                  value={selectedRepo}
                  onChange={(e) => setSelectedRepo(e.target.value)}
                  className="bg-[#121216] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 font-mono cursor-pointer"
                >
                  <option value="">-- Choose Synced Project --</option>
                  {repos
                    .filter(r => localDB[r.name.toLowerCase()])
                    .map((r) => (
                      <option key={r.id} value={r.name}>{r.name.replace(/-/g, ' ').toUpperCase()}</option>
                    ))}
                </select>
              </div>

              {/* Context Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Recent Updates & Context</label>
                <textarea
                  value={linkedinContext}
                  onChange={(e) => setLinkedinContext(e.target.value)}
                  placeholder="e.g., Just deployed checkout features or resolved a Vercel routing case-sensitivity bug. Add any details you want included."
                  rows={4}
                  className="bg-[#121216] border border-white/10 p-4 text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500 font-mono resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateLinkedIn}
                disabled={drafting || !selectedRepo}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-white/5 text-white py-4 font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {drafting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Analyzing Voice & Drafting...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Draft Post in My Style
                  </>
                )}
              </button>

              {/* Generated Output Preview */}
              {generatedPost && (
                <div className="mt-6 border-t border-white/5 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">LinkedIn Draft Preview</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-xs font-mono flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/20 px-3 py-1.5"
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Copy Draft
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-[#121216] border border-white/5 p-4 rounded-none text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                    {generatedPost}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Note Panel */}
          <div className="bg-[#0f0f12]/50 border border-white/5 p-6 font-mono text-[10px] leading-relaxed text-slate-500 space-y-2">
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase mb-2">
              <AlertTriangle size={12} />
              <span>Developer Reference</span>
            </div>
            <p>1. The LinkedIn Social Agent uses <span className="text-slate-300">src/lib/styleProfile.json</span> to align hooks, formatting, emojis, and hashtags with your historical writing voice.</p>
            <p>2. Direct posting is ready for integration via LinkedIn OAuth. Currently, use the <strong>Copy Draft</strong> button to review and post directly to LinkedIn.</p>
          </div>

        </section>

      </div>
    </main>
  );
}
