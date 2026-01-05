"use client";

import { useEffect, useState } from 'react';

export default function CosmicDiscovery() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Kendi API Key'ini buraya yapıştır!
        const API_KEY = 'v7YksLUc1OKiquQiCZPQfvdJAZZbdwCbGPM796Id'; 
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        
        if (!res.ok) throw new Error('API Limit Reached');
        
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Cosmic Link Broken:", e);
        setError(true);
      }
    };
    fetchImage();
  }, []);

  if (error) return (
    <div className="h-64 flex items-center justify-center bg-slate-800/50 rounded-3xl border border-red-500/20">
      <p className="text-xs text-red-400 font-mono">Signal Lost: Rate Limit Reached</p>
    </div>
  );

  if (!data) return <div className="h-64 animate-pulse bg-slate-800/50 rounded-3xl" />;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl transition-all hover:border-cyan-500/50">
      <div className="aspect-video overflow-hidden bg-black">
        {data.media_type === "video" ? (
          <iframe 
            src={data.url} 
            className="h-full w-full"
            title="Cosmic Video"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <img 
            src={data.url} 
            alt={data.title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">{data.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-2">{data.explanation}</p>
      </div>
    </div>
  );
}