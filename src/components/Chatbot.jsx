// src/components/Chatbot.jsx
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, RefreshCw, ChevronUp, FileText, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  "What is your core tech stack?",
  "Tell me about Synergy Hotels Suites",
  "Are you open to remote work?",
  "How can I contact you?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hi! I'm Uzoma's AI Agent representation. Feel free to ask me anything about my web development experience, projects, or how to contact me!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) setInput('');
    setIsLoading(true);

    // Add user message to state
    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: updatedMessages.slice(1, -1), // skip first greeting and last user message (which is passed as message)
          message: text
        })
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'model', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: "I'm experiencing a minor system disruption. Feel free to download my CV or check my contact section below!" }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: "Connection timed out. Please verify your internet connection or check the download CV button above." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      { role: 'model', content: "Hi! I'm Uzoma's AI Agent representation. Feel free to ask me anything about my web development experience, projects, or how to contact me!" }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 shadow-[0_8px_30px_rgb(37,99,235,0.4)] transition-all hover:scale-105 duration-300 border border-blue-500/30 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-green-400 rounded-full"></span>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Ask Uzoma AI</span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-slate-900/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-300 ease-out origin-bottom-right">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-blue-500">
                  <Sparkles size={16} className="animate-pulse" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wide text-white">Uzoma's Co-Pilot</h4>
                <p className="text-[10px] font-mono text-green-400 uppercase tracking-widest animate-pulse">Agent Active 24/7</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={resetChat} 
                title="Reset Chat"
                className="text-slate-400 hover:text-white p-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                title="Close Chat"
                className="text-slate-400 hover:text-white p-1.5 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Scrolling Body */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed break-words ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white font-medium shadow-[0_4px_12px_rgba(37,99,235,0.25)]' 
                      : 'bg-white/5 border border-white/10 text-slate-300 font-mono'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
                <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
                  {msg.role === 'user' ? 'Visitor' : 'AI Agent'}
                </span>
              </div>
            ))}

            {/* Loading / Typing indicator */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="bg-white/5 border border-white/10 text-slate-400 px-4 py-3 text-xs flex items-center gap-2 font-mono">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span>Drafting transmission...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Control Footer (Suggestions & Input) */}
          <div className="p-4 border-t border-white/10 bg-slate-900">
            
            {/* Quick Suggestions (Only show when not loading and input is empty) */}
            {!isLoading && messages.length === 1 && (
              <div className="mb-4">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Suggested Inquiries:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="text-[10px] bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500 text-slate-300 hover:text-blue-400 px-3 py-1.5 transition-all text-left font-mono cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, stack, or experience..."
                disabled={isLoading}
                className="flex-grow bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:bg-white/10 transition-colors font-mono disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-white/10 text-white p-3 transition-colors disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>

            <div className="mt-3 flex justify-between items-center">
              <a 
                href="https://docs.google.com/document/d/1eMO6fuHhQyfydQatEytBUDze3mh7RD4dovcYuBkvl3c/export?format=pdf" 
                target="_blank" 
                rel="noreferrer"
                className="text-[9px] font-mono text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-1.5 hover:underline"
              >
                <FileText size={10} />
                Download Uzoma CV
              </a>
              <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                Protected by Gemini API
              </span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
