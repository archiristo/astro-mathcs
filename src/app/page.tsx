import React from 'react';

export default function AstroDashboard() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      {/* Header Section */}
      <header className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          ASTRO <span className="text-white">MATHCS</span>
        </h1>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Status Card */}
        <div className="p-6 rounded-2xl border border-blue-900/50 bg-slate-900/40 backdrop-blur-md shadow-2xl">
          <h3 className="text-blue-400 text-xs font-bold uppercase mb-4 tracking-widest">System Status</h3>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            <p className="text-sm font-mono text-slate-300">Pi 5: Connected (Railway Sync)</p>
          </div>
        </div>

        {/* Observation Data Placeholder */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md lg:col-span-2">
          <h3 className="text-blue-400 text-xs font-bold uppercase mb-4 tracking-widest">Real-time Light Curve ($f(t)$)</h3>
          <div className="h-48 flex items-end space-x-1">
            {/* Bu kısım ileride grafiklerle dolacak! */}
            {[40, 70, 45, 90, 65, 80, 30, 95, 50, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/20 border-t border-blue-400/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 font-mono text-center">Waiting for sensor input from Pico 2H...</p>
        </div>

      </div>
    </div>
  );
}