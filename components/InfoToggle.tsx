"use client";

import { useState } from 'react';

interface InfoProps {
  title: string;
  math: string;
  tech: string;
}

export default function InfoToggle({ title, math, tech }: InfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-6 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-[10px] font-bold hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
      >
        i
      </button>

      {isOpen && (
        <div className="absolute right-8 top-0 w-64 p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-right-2">
          <h4 className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-widest">{title}</h4>
          <p className="text-[10px] text-slate-300 font-mono mb-3 leading-relaxed">
            <span className="text-slate-500">Logic:</span> {math}
          </p>
          <p className="text-[10px] text-slate-300 font-mono">
            <span className="text-slate-500">Stack:</span> {tech}
          </p>
        </div>
      )}
    </div>
  );
}